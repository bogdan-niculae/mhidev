import { graphql, useStaticQuery } from "gatsby";
import axios from "axios";
import { addDays, format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { asyncLocalStorage } from "../../hooks/helpers";

const getLang = () => {
  const lang = window.Weglot.getCurrentLang();

  if (lang === "es") {
    return `lang=esp`;
  }
  return "";
};

export const useProducts = () => {
  const { allWpProduct, allWpAgent, allWpAffinity } = useStaticQuery(
    graphql`
      query {
        allWpAffinity {
          edges {
            node {
              title
              uri
              affinity {
                affinityInxUrl
              }
            }
          }
        }
        allWpProduct(
          filter: { hideFormOnProductPage: { showCtaForm: { ne: true } } }
        ) {
          edges {
            node {
              title
              id
              uri
              slug
              vendors {
                fieldGroupName
                vendorsContainer {
                  vendors {
                    zip
                    vendorName
                    directUrl
                    redirectionUrl
                    state
                    landingPage {
                      ... on WpPage {
                        id
                        uri
                      }
                    }
                  }
                }
              }
            }
          }
        }
        allWpAgent {
          nodes {
            id
            uri
            newagent {
              agentBusinessPhoneNumber
              agentBusinessInxUrl
              agentBusinessListStates
              addressRegion
              addressLocality
              agentBusinessState
              agentBusinessNumber
              agentBusinessProducts {
                ... on WpProduct {
                  id
                  uri
                  title
                  order {
                    order
                  }
                  products {
                    productName
                    shortProductDescription
                  }
                }
              }
            }
          }
        }
      }
    `
  );
  return {
    allWpProduct,
    allWpAgent,
    allWpAffinity,
  };
};

// check is zip valid
export const checkZip = async (val) => {
  if (typeof val === "string" && val.length === 5) {
    return await axios
      .get(
        `https://p1mjhxx5fg.execute-api.us-east-1.amazonaws.com/dev/api/v1/counties/by/zip/${val}?apikey=${process.env.GATSBY_MARKET_ZIP}`
      )
      .then((results) => {
        if (
          results.data.counties[0].zipcode &&
          results.data.counties[0].state
        ) {
          return results.data.counties[0].state;
        }
      })
      .catch((error) => {
        return false;
      });
  }
  return false;
};

// return product
export const findProduct = (productTitle, allProducts) => {
  const product = allProducts.filter(
    ({ node }) => node.title.toLowerCase() === productTitle.toLowerCase()
  );
  return product[0].node;
};

const postAffinity = (allWpAffinity, affinityPartner) => {
  return allWpAffinity.edges.filter((item) =>
    item.node.uri.includes(affinityPartner[2])
  )[0].node.affinity.affinityInxUrl;
};

export const postToMarket = async (
  values,
  allProducts,
  location,
  allWpAgent,
  allWpAffinity,
  setSubmitting,
  tempAgent,
  formState
) => {
  const selectedProduct = findProduct(values.product, allProducts);
  const vendors = selectedProduct.vendors.vendorsContainer;

  let market = {
    marketPlace: "",
    directUrl: "",
  };
  let tempZip = values.zip.substring(0, 3);
  let state = "";
  // find marketplace based on zip and state
  vendors.forEach((vendor) => {
    return vendor.vendors.find((v) => {
      if (values.state === v.state && v.zip === +tempZip) {
        market.marketPlace = v.vendorName;
        market.directUrl = v.directUrl;
        state = values.state;
      }
    });
  });

  // find default marketplace based on state
  if (!market.marketPlace && !market.directUrl) {
    vendors.forEach((vendor) => {
      return vendor.vendors.find((v) => {
        if (values.state === v.state && v.zip === 0) {
          market.marketPlace = v.vendorName;
          market.directUrl = v.directUrl;
          state = values.state;
        }
      });
    });
  }
  // getting source
  let source = "";
  source =
    (typeof window !== "undefined" && localStorage.getItem("source")) ||
    location.pathname;
  let landingPageUrl =
    typeof window !== "undefined" && localStorage.getItem("landingPageUrl");
  if (location.pathname.includes("/agent/")) {
    source = location.pathname;
  }

  // Agent state setter
  const setAllAgentStates = (agent) => {
    return {
      newagent: {
        ...agent,
        agentAllStates: [
          ...agent.agentBusinessListStates,
          agent.agentBusinessState,
        ],
      },
    };
  };

  const setAgentState = (agent) => {
    console.log(agent, "agent");
    return agent.newagent.agentAllStates.find((a) => a === states[state]);
  };

  // setting agent values if client land first on agent page or we have tempAgent in Context
  let agent = tempAgent ? setAllAgentStates(tempAgent) : "";
  let agentState = tempAgent ? setAgentState(agent) : "";

  if (source.indexOf("/agent/") !== -1) {
    agent = allWpAgent.nodes.find((a) => a.uri === source);
    agent.newagent.agentAllStates = [
      ...agent.newagent.agentBusinessListStates,
      agent.newagent.agentBusinessState,
    ];
    let productState = states[state];
    agentState = agent.newagent.agentAllStates.find((a) => a === productState);
  }

  if (source.includes("/affinity/") || landingPageUrl.includes("/affinity/")) {
    let affinityPartner = landingPageUrl.split("/");
    market.marketPlace = "INSXCloud";
    market.directUrl = postAffinity(allWpAffinity, affinityPartner);
    console.log(market);
    // return true;
  }

  if (market.marketPlace) {
    // insert data in database
    await routerLog(values, market, location, source, landingPageUrl).then(
      async (r) => {
        if (r.status === 200) {
          // console.log(values);
          // send data to market based on zip and state
          switch (market.marketPlace) {
            case "INSXCloud":
              console.log("SENDING TO INSXCloud");
              if (agent && agentState) {
                setSubmitting(false);
                window.location.assign(
                  await urlInsxcloud(agent, values, formState)
                );
              } else if (agent && !agentState) {
                setSubmitting(false);
                window.location.assign(
                  `${market.directUrl.replace(
                    /\s/g,
                    ""
                  )}?source=mhi&q=${await sendData(
                    values,
                    true,
                    formState
                  )}&lead=${
                    agent.newagent.agentBusinessNumber
                  }&${await setUtmParams()}${getLang()}`
                );
              } else {
                // For testing
                // console.log("Send Data", await sendData(values, true));
                // console.log(
                //   `${market.directUrl.replace(
                //     /\s/g,
                //     ""
                //   )}?source=mhi&q=${await sendData(values, true)}`
                // );
                // return true;
                setSubmitting(false);
                window.location.assign(
                  `${market.directUrl.replace(
                    /\s/g,
                    ""
                  )}?source=mhi&q=${await sendData(
                    values,
                    true,
                    formState
                  )}&${await setUtmParams()}${getLang()}`
                );
              }
              clearStorage();
              break;
            case "marketplace":
              console.log("SENDING TO marketplace");
              setSubmitting(false);
              window.location.assign(
                agent && agentState
                  ? `${urlMarket(
                      agent,
                      market.directUrl.replace(/\s/g, "")
                    )}&zipcode=${values.zip}`
                  : `${market.directUrl.replace(/\s/g, "")}&zipcode=${
                      values.zip
                    }`
              );
              clearStorage();
              // https://quote.ihcmarketplace.com/Agent/3500091/GetQuote?product=Dental
              break;
            case "media-alpha":
              console.log("SENDING TO media-alpha");
              setSubmitting(false);
              window.location.assign(
                agent && agentState
                  ? `/media-alpha/?${values.zip}&agent=${agent.newagent.agentBusinessNumber}`
                  : `/media-alpha/?${values.zip}`
              );
              clearStorage();
              // navigate("/media-alpha/", {
              //   state: {
              //     zip: `${values.zip}`,
              //   },
              // });
              // window.open(`${market.directUrl}`, "_blank");
              break;
            default:
              console.log("OTHER");
          }
          return true;
        }
      }
    );
  }
};

const setEffectiveDate = async (product) => {
  if (product === "ACA/OBAMACARE") {
    const effectiveDate = await axios({
      method: "get",
      url: `${process.env.GATSBY_ROUTER_LOG}/time`,
      headers: {
        "content-type": "application/json",
        "x-api-key": process.env.GATSBY_ROUTER_LOG_KEY,
      },
    })
      .then(function ({ data }) {
        console.log("effectiveDate", data);
        return data;
      })
      .catch(function (error) {
        console.log(error);
        return error;
      });
    return effectiveDate;
  }

  return format(addDays(new Date(), 1), "yyyy-MM-dd");
};
export const setUtmParams = async () => {
  const utms = await asyncLocalStorage.getItem("utmResources").then((res) => {
    return res;
  });
  if (!utms) {
    return "";
  } else {
    const urlParams = new URLSearchParams(utms);
    const leadvendorsource =
      urlParams.get("leadvendorsource") ||
      urlParams.get("LeadVendorSource") ||
      "";
    const leadvendorsubsource =
      urlParams.get("leadvendorsubsource") ||
      urlParams.get("LeadVendorSubsource") ||
      "";
    const utm_source = urlParams.get("utm_source") || "";
    const utm_campaign = urlParams.get("utm_campaign") || "";
    const utm_medium = urlParams.get("utm_medium") || "";
    const utm_content = urlParams.get("utm_content") || "";
    const utm_term = urlParams.get("utm_term") || "";
    const gclid = urlParams.get("gclid") || "";
    const email = urlParams.get("email") || "";

    const utmObject = {
      leadvendorsource,
      leadvendorsubsource,
      utm_term,
      utm_source,
      utm_campaign,
      utm_medium,
      utm_content,
      gclid,
      email,
    };
    Object.keys(utmObject).forEach((key) => {
      if (utmObject[key] === "") {
        delete utmObject[key];
      }
    });
    const utm = new URLSearchParams(utmObject).toString();
    return utm;
  }
};
// preparing data for INSXCloud
const sendData = async (values, hash, formState) => {
  if (formState) {
    return formState;
  }
  if (hash && !formState) {
    let data = {};
    data.zipCode = values.zip;
    data.effectiveDate = await setEffectiveDate(values.product);
    data.demographics = [];
    data.applyForSubsidy =
      getProductInx[values.product] === "Medical" ? true : false;
    if (getProductInx[values.product] !== "Medical") {
      data.hideAptcQuestions = true;
    }
    const stringData = JSON.stringify(data);
    return btoa(stringData);
  }
  return values.zip;
};
// getting links if agent and state exists in agent values, returning link
const urlInsxcloud = async (agent, values, formState) => {
  if (agent.newagent.agentBusinessInxUrl.includes("get-a-quote")) {
    return `${agent.newagent.agentBusinessInxUrl}?q=${await sendData(
      values,
      true,
      formState
    )}&lead=${
      agent.newagent.agentBusinessNumber
    }&${await setUtmParams()}${getLang()}`;
  }
  if (
    agent.newagent.agentBusinessInxUrl.includes("individual-info") &&
    agent.newagent.agentBusinessInxUrl.includes("individual-info/index")
  ) {
    return `${agent.newagent.agentBusinessInxUrl}&zipcode=${await sendData(
      values,
      false,
      formState
    )}&lead=${
      agent.newagent.agentBusinessNumber
    }&${await setUtmParams()}${getLang()}`;
  }
  if (agent.newagent.agentBusinessInxUrl.includes("individual-info")) {
    return `${agent.newagent.agentBusinessInxUrl}?zipcode=${await sendData(
      values,
      false,
      formState
    )}&lead=${
      agent.newagent.agentBusinessNumber
    }&${await setUtmParams()}${getLang()}`;
  }
  return `${
    agent.newagent.agentBusinessInxUrl
  }?${await setUtmParams()}${getLang()}`;
  // Option 1: (a link to their own subdomain with INSXCLoud 2.0)
  // https://usaa.insxcloud.us/get-a-quote
  //   if the link is in this format, then you append the “?q=XXXXXX” in the URL, so we pass over the zipcode to INSXCloud.
  //   Option 2: (a producer account within an existing insxcloud subdomain – an Advisor for example on 2.0)
  // https://usaa.insxcloud.us/newguy/get-a-quote
  //   if the link is in this format, then you append the “?q=XXXXXX” in the URL, so we pass over the zipcode to INSXCloud.
  //   Option 3: (a link to their current INSXCloud site)
  // https://fiorella.insxcloud.com/my-quote/individual-info
  //   if the link is in this format, then you append “?zipcode=XXXX” to the URL
  // Option 4: (a link to a producer account under an existing INSXCloud subdomain)
  // https://fiorella.insxcloud.com/my-quote/individual-info/index?ref=OUhyd3N1SDZhWXhGQVVYVEplMzNsZz09&lang=en
  //   if the link is in this format, then you append “&zipcode=XXXX” to the URL
};
// preparing link for marketplace if agent exists
const urlMarket = (agent, market) => {
  let marketUrl = market.split("/");
  marketUrl[4] = agent.newagent.agentBusinessNumber;
  return marketUrl.join("/");
};

const getProductInx = {
  "Gap Health Insurance": "Gap",
  "ACA/OBAMACARE": "Medical",
  "Discount Program": "",
  "Accident Insurance": "",
  "Critical Illness Insurance": "",
  "Dental Insurance": "Dental",
  "Hospital Insurance": "",
  "Short Term Health Insurance": "Short Term Medical",
};

const clearStorage = () => {
  // clear session storage
  typeof window !== "undefined" && localStorage.removeItem("source");
};
// getting states
const states = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DC: "District of Columbia",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};

const setPartnerUrl = (source, landingPageUrl) => {
  if (source.includes("agent")) {
    return source;
  } else {
    return landingPageUrl;
  }
};

export const routerLog = async (
  values,
  market,
  location,
  source,
  landingPageUrl
) => {
  const data = {
    web_id: "mhi",
    id: uuidv4(),
    zip: values.zip,
    state: values.state,
    vendor_id: market.marketPlace,
    type: values.product,
    source: typeof window !== "undefined" && localStorage.getItem("source"),
    url: location.href,
    url_directory: location.href,
    ip: await axios
      .get("https://ipapi.co/json/")
      .then(function (response) {
        if (response.status !== 200) {
          return "127.0.0.1";
        }
        return response.data.ip;
      })
      .catch(function (error) {
        return "127.0.0.1";
      }),
    browser: navigator.userAgent,
    date_time: format(new Date(), "yyyy-MM-dd"),
    created: new Date().getTime(),
    partner_url: setPartnerUrl(source, landingPageUrl),
  };
  // send a POST request
  const test = await axios({
    method: "post",
    url: process.env.GATSBY_ROUTER_LOG,
    data: data,
    headers: {
      "content-type": "application/json",
      "x-api-key": process.env.GATSBY_ROUTER_LOG_KEY,
    },
  })
    .then(function (response) {
      console.log("RESPONSE", response);
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
  return test;
};
