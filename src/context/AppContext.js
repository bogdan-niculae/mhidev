import React, { createContext, useReducer, useContext, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { asyncLocalStorage } from "../hooks/helpers";

const AppContext = createContext();

function webSiteReducer(state, action) {
  switch (action.type) {
    case "phoneNumber": {
      return { ...state, phoneNumber: action.value };
    }
    case "colorTheme": {
      return { ...state, colorTheme: action.value };
    }
    case "availableProducts": {
      return { ...state, availableProducts: action.value };
    }
    case "landingUrl": {
      return { ...state, landingUrl: action.value };
    }
    case "affinityData": {
      return { ...state, affinityData: action.value };
    }
    case "utmResources": {
      return { ...state, utmResources: action.value };
    }
    case "loading": {
      return { ...state, loading: action.value };
    }
    case "tempAgent": {
      return { ...state, tempAgent: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function CountProvider(props) {
  const data = useStaticQuery(graphql`
    query allData {
      allWpProduct(
        filter: { hideFormOnProductPage: { showCtaForm: { ne: true } } }
      ) {
        nodes {
          id
          uri
          title
          order {
            order
          }
          products {
            productName
            shortProductDescription
            productIcon {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(height: 45, layout: CONSTRAINED)
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
            agentBusinessProducts {
              ... on WpProduct {
                id
                uri
                title
                products {
                  productName
                  shortProductDescription
                  productIcon {
                    altText
                    localFile {
                      childImageSharp {
                        gatsbyImageData(height: 45, layout: CONSTRAINED)
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      allWpAffinity {
        nodes {
          id
          uri
          affinity {
            colorSchema
            affinityDisclaimer
            affinityPhoneNumber
            logo {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(height: 60)
                }
              }
            }
            linesOfBusiness {
              ... on WpProduct {
                id
                uri
                title
                products {
                  productName
                  shortProductDescription
                  productIcon {
                    altText
                    localFile {
                      childImageSharp {
                        gatsbyImageData(height: 45, layout: CONSTRAINED)
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  const [state, dispatch] = useReducer(webSiteReducer, {
    loading: true,
    phoneNumber: "8888556837",
    colorTheme: "",
    availableProducts: [...data.allWpProduct.nodes],
    landingUrl: "/",
    affinityData: null,
    utmResources: "",
    tempAgent: "",
  });
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch };

  const setUtmParams = (utmParams) => {
    const urlParams = new URLSearchParams(utmParams);
    const leadvendorsource = urlParams.get("leadvendorsource");
    const leadvendorsubsource = urlParams.get("leadvendorsubsource");
    const utm_source = urlParams.get("utm_source");
    const utm_campaign = urlParams.get("utm_campaign");
    const utm_medium = urlParams.get("utm_medium");
    const utm_content = urlParams.get("utm_content");
    const gclid = urlParams.get("gclid");

    const utm = {
      leadvendorsource,
      leadvendorsubsource,
      utm_source,
      utm_campaign,
      utm_medium,
      utm_content,
      gclid,
    };

    return utm;
  };
  const setLocalStorageData = async () => {
    const affinityParams = new URLSearchParams(props.location.search);
    const affinityPartner = affinityParams.get("affinity");
    if (affinityPartner) {
      asyncLocalStorage
        .setItem("landingPageUrl", `/affinity/${affinityPartner}/`)
        .then((res) => {
          const getAffinityData = data.allWpAffinity.nodes.filter(
            (affinity) => affinity.uri === `/affinity/${affinityPartner}/`
          )[0];
          console.log("getAffinityData", getAffinityData);
          dispatch({ type: "landingUrl", value: getAffinityData.uri });
          dispatch({ type: "affinityData", value: getAffinityData });
          dispatch({
            type: "colorTheme",
            value: getAffinityData.affinity?.colorSchema,
          });
          dispatch({
            type: "phoneNumber",
            value: getAffinityData.affinity.affinityPhoneNumber || "8888556837",
          });
          dispatch({
            type: "availableProducts",
            value: getAffinityData.affinity.linesOfBusiness,
          });
        });
    } else {
      await asyncLocalStorage.getItem("landingPageUrl").then((res) => {
        if (res) {
          if (res.indexOf("/agent/") !== -1) {
            dispatch({ type: "landingUrl", value: res });
            data.allWpAgent.nodes.map((item) => {
              if (item.uri === res) {
                dispatch({
                  type: "availableProducts",
                  value: item.newagent.agentBusinessProducts,
                });
                dispatch({
                  type: "phoneNumber",
                  value: item.newagent.agentBusinessPhoneNumber,
                });
              }
            });
          }

          if (res.indexOf("/affinity/") !== -1) {
            const getAffinityData = data.allWpAffinity.nodes.filter(
              (affinity) => affinity.uri === res
            )[0];
            dispatch({ type: "landingUrl", value: res });
            dispatch({ type: "affinityData", value: getAffinityData });
            dispatch({
              type: "phoneNumber",
              value:
                getAffinityData.affinity.affinityPhoneNumber || "8888556837",
            });
            dispatch({
              type: "colorTheme",
              value: getAffinityData.affinity?.colorSchema,
            });
            dispatch({
              type: "availableProducts",
              value: getAffinityData.affinity.linesOfBusiness,
            });
          }
        } else {
          asyncLocalStorage
            .setItem("landingPageUrl", props.path)
            .then((res) => {
              dispatch({ type: "landingUrl", value: res });
              if (res.indexOf("/agent/") !== -1) {
                data.allWpAgent.nodes.map((item) => {
                  if (item.uri === res) {
                    dispatch({
                      type: "availableProducts",
                      value: item.newagent.agentBusinessProducts,
                    });
                    dispatch({
                      type: "phoneNumber",
                      value: item.newagent.agentBusinessPhoneNumber,
                    });
                  }
                });
              }

              if (res.indexOf("/affinity/") !== -1) {
                const getAffinityData = data.allWpAffinity.nodes.filter(
                  (affinity) => affinity.uri === res
                )[0];
                dispatch({ type: "landingUrl", value: res });
                dispatch({ type: "affinityData", value: getAffinityData });
                dispatch({
                  type: "colorTheme",
                  value: getAffinityData.affinity?.colorSchema,
                });
                dispatch({
                  type: "phoneNumber",
                  value:
                    getAffinityData.affinity.affinityPhoneNumber ||
                    "8888556837",
                });
                dispatch({
                  type: "availableProducts",
                  value: getAffinityData.affinity.linesOfBusiness,
                });
              }
            });
        }
      });
      await asyncLocalStorage.getItem("utmResources").then((res) => {
        if (res && !props.location.search) {
          dispatch({
            type: "utmResources",
            value: setUtmParams(res),
          });
        } else {
          // asyncLocalStorage.setItem("utmResources", JSON.stringify(utm));
          asyncLocalStorage
            .setItem("utmResources", props.location.search)
            .then((res) => {
              dispatch({
                type: "utmResources",
                value: setUtmParams(res),
              });
            });
        }
      });
    }
  };
  useEffect(() => {
    // Using an IIFE
    (async function anyNameFunction() {
      await setLocalStorageData();
      dispatch({
        type: "loading",
        value: false,
      });
    })();
  }, []);
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}

function useWebsiteData() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useWebsiteData must be used within a CountProvider");
  }
  return context;
}

export { CountProvider, useWebsiteData };
