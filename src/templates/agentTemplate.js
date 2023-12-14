import React from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import Seo from "gatsby-plugin-wpgraphql-seo";
import { StaticImage } from "gatsby-plugin-image";
// ******** Components ********
import RelatedProducts from "../components/shared/RelatedProducts";
import Resources from "../components/shared/Resources";
// import SectionBox from "../components/shared/SectionBox";
import NeedHealthInsuranceForm from "../components/shared/NeedHealthInsuranceForm";
import BodyImage from "../components/shared/BodyImage";
import { states } from "../components/shared/listStates";
const Agent = ({ data, location }) => {
  const { agent, allWpPost } = data;
  const { newagent } = agent;
  const {
    addressLocality,
    addressRegion,
    postalCode,
    priceRange,
    streetAddress,
    agentBusinessName,
    agentBusinessPhoneNumber,
  } = newagent;
  const formatPhoneNumber = (phoneNumberString) => {
    if (phoneNumberString) {
      let cleaned = ("" + phoneNumberString).replace(/\D/g, "");
      let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        return "(" + match[1] + ") " + match[2] + "-" + match[3];
      }
      return null;
    }
  };
  const seoImage = newagent?.agentBusinessProfileImage?.localFile?.publicURL;
  const testSchema = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    name: agentBusinessName || "MyHealthInsurance",
    image: `${process.env.GATSBY_SITE_URL}${seoImage}`,
    "@id": `${process.env.GATSBY_SITE_URL}${seoImage}`,
    url: location.href,
    telephone: agentBusinessPhoneNumber || "18888556837",
    priceRange: priceRange || "$",
    address: {
      "@type": "PostalAddress",
      streetAddress: streetAddress || "",
      addressLocality: addressLocality || "",
      addressRegion: addressRegion || "",
      postalCode: postalCode || "",
      addressCountry: "US",
    },
  };

  const StateImg = (country) => {
    switch (country) {
      case "Alaska":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/Alaska.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "Arizona":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/Arizona.jpeg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "Arkansas":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/Arkansas.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "Alabama":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/Alabama.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "California":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/California.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "Colorado":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/Colorado.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "Connecticut":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/Connecticut.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "DC":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/DC.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "Delaware":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/Delaware.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "Florida":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/Florida.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "Georgia":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/Georgia.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "Hawaii":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/Hawaii.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "Idaho":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/Idaho.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "Illinois":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/Illinois.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "Indiana":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/Indiana.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "Iowa":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/Iowa.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "Kansas":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/Kansas.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "Kentucky":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/Kentucky.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "Louisiana":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/Louisiana.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "Maine":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/Maine.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "Maryland":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/Maryland.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "Massachusetts":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/Massachusetts.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "Michigan":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/Michigan.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "Minnesota":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/Minnesota.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "Mississippi":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/Mississippi.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "Missouri":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/Missouri.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "Montana":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/Montana.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "Nebraska":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/Nebraska.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "Nevada":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/Nevada.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "New Hampshire":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/New Hampshire.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "New Mexico":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/New Mexico.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "New York":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/New York.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "New Jersey":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/New Jersey.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "North Carolina":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/North Carolina.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "North Dakota":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/North Dakota.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "Ohio":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/Ohio.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "Oklahoma":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/Oklahoma.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "Oregon":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/Oregon.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "Pennsylvania":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/Pennsylvania.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "Rhode Island":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/Rhode Island.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "South Dakota":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/South Dakota.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "South Carolina":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/South-Carolina.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "Tennessee":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/Tennessee.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "Texas":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/Texas.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "Utah":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/Utah.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "Vermont":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/Vermont.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "Virginia":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/Virginia.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "Washington":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/Washington.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "West Virginia":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/West Virginia.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "Wisconsin":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/Wisconsin.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      case "Wyoming":
        return (
          <StaticImage
            src="../assets/images/agentBgStates/Wyoming.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
      default:
        return (
          <StaticImage
            src="../assets/images/agentBgStates/DC.jpg"
            className="hero-image"
            alt="State"
            layout="fixed"
            width={1920}
            height={560}
          />
        );
    }
  };

  return (
    <Layout
      phoneNumber={formatPhoneNumber(newagent.agentBusinessPhoneNumber)}
      location={location}
      agent
    >
      <Seo post={agent} postSchema={testSchema} />
      <div className="agent">
        <div className="agent-header">
          <div className="agent-featured-image-desktop">
            {/* <StaticImage
              alt="Agent background image"
              src="../assets/images/agent-background.png"
              layout="fixed"
              width={1920}
              height={560}
            /> */}
            {StateImg(newagent?.agentBusinessState)}
            <div className="overlay" />
          </div>
          <div className="agent-featured-image-mobile">
            {/* <StaticImage
              alt="Agent background image"
              src="../assets/images/agent-background.png"
              layout="fixed"
              width={1920}
              height={560}
            /> */}
            {StateImg(newagent?.agentBusinessState)}
            <div className="overlay" />
          </div>
          <div className="agent-header-content">
            <div className="agent-header-content-wrapper">
              <div className="agent-title-wrapper">
                <h1>{newagent?.agentBusinessName || "My Health Insurance"}</h1>
                <h3>{streetAddress ? `${streetAddress},` : ""}</h3>
                <h3>{`${newagent?.agentBusinessCity},`}</h3>
                <h3> {`${newagent?.agentBusinessState}`}</h3>
              </div>
              <div className="agent-info">
                <div className="agent-info-content">
                  <h3>
                    {newagent?.agentFirstName} {newagent?.agentLastName}
                  </h3>
                  {/* <ul>
                    <li>
                      <span>Email:</span>
                      {newagent?.agentEmail}
                    </li>
                    <li>
                      <span>State:</span>
                      {newagent?.agentBusinessState}
                    </li>
                    <li>
                      <span>Phone:</span>
                      <a href={`tel:${newagent?.agentBusinessPhoneNumber}`}>
                        {formatPhoneNumber(newagent.agentBusinessPhoneNumber)}
                      </a>
                    </li>
                    <li>
                      <span>Licenses:</span>
                      {newagent.agentBusinessListStates.map(
                        (item, index) =>
                          `${states[item]}${
                            newagent?.agentBusinessListStates.length ===
                            index + 1
                              ? ""
                              : ", "
                          }`
                      )}
                    </li>
                  </ul> */}
                  <table>
                    <tr>
                      <td>Email:</td>
                      <td>
                        <a href={`mailto:${newagent?.agentEmail}`}>
                          {newagent?.agentEmail}
                        </a>{" "}
                      </td>
                    </tr>
                    <tr>
                      <td>State:</td>
                      <td>{newagent?.agentBusinessState}</td>
                    </tr>
                    <tr>
                      <td>Phone:</td>
                      <td>
                        {" "}
                        <a href={`tel:1${agentBusinessPhoneNumber}`}>
                          {formatPhoneNumber(newagent.agentBusinessPhoneNumber)}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>Licensed:</td>
                      <td>
                        {newagent.agentBusinessListStates.map(
                          (item, index) =>
                            `${states[item]}${
                              newagent?.agentBusinessListStates.length ===
                              index + 1
                                ? ""
                                : ", "
                            }`
                        )}
                      </td>
                    </tr>
                  </table>
                </div>
                <div className="agent-info-image">
                  {newagent.agentBusinessProfileImage ? (
                    <BodyImage
                      image={newagent?.agentBusinessProfileImage}
                      className="agent-image"
                    />
                  ) : (
                    <StaticImage
                      alt="Agent background image"
                      src="../assets/images/Agent_Cover_Profile.png"
                      layout="fixed"
                      width={250}
                      height={250}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="agent-about-me-section">
          <h3>{newagent.agentBusinessDescriptionTitle}</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: newagent.agentBusinessDescription,
            }}
          />
        </section>
        <NeedHealthInsuranceForm
          hideList
          title="Add your ZIP code"
          subtitle="You will be connected to a secure online shopping experience"
          selectedProducts={newagent?.agentBusinessProducts}
          location={location}
        />
        <RelatedProducts
          agentData={newagent}
          relatedProducts={newagent?.agentBusinessProducts}
          title="Products and Plans"
          subtitle="Find a plan that fits your needs and budget from a broad range of premiums, deductibles, and levels of coverage."
        />
        {/* <div className="network-offering">
          <SectionBox
            image={newagent?.agentBusinessDescriptionImage}
            agent
            className="network-offering-content"
          >
            <h3>{newagent.agentBusinessDescriptionTitle}</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: newagent.agentBusinessDescription,
              }}
            />
          </SectionBox>
        </div> */}
        <Resources
          title={`My Health Insurance Articles`}
          resources={
            newagent?.agentBusinessResources
              ? newagent?.agentBusinessResources
              : allWpPost?.nodes
          }
        />
        <div className="contact-agent">
          <h2>
            Contact us to speak with {newagent.agentFirstName}{" "}
            {newagent.agentLastName}!
          </h2>
          <button>
            Call
            <a
              href={`tel:${formatPhoneNumber(
                newagent.agentBusinessPhoneNumber
              )}`}
            >
              {formatPhoneNumber(newagent.agentBusinessPhoneNumber)}
            </a>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Agent;

export const query = graphql`
  query singleAgent($id: String!) {
    agent: wpAgent(id: { eq: $id }) {
      id
      title
      seo {
        title
        metaDesc
        focuskw
        metaKeywords
        opengraphTitle
        opengraphDescription
        opengraphImage {
          altText
          sourceUrl
          srcSet
        }
        twitterTitle
        twitterDescription
        twitterImage {
          altText
          sourceUrl
          srcSet
        }
        canonical
        cornerstone
        schema {
          articleType
          pageType
          raw
        }
      }
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(
                layout: FIXED
                quality: 90
                height: 560
                width: 1920
              )
            }
            publicURL
          }
          mediaDetails {
            width
            height
          }
        }
      }
      newagent {
        streetAddress
        priceRange
        postalCode
        fieldGroupName
        agentLastName
        agentFirstName
        agentEmail
        agentBusinessState
        agentBusinessPhoneNumber
        agentBusinessNumber
        agentBusinessNpn
        agentBusinessName
        agentBusinessListStates
        agentBusinessInxUrl
        agentBusinessDescriptionTitle
        agentBusinessDescription
        agentBusinessCity
        addressRegion
        addressLocality
        agentBusinessDescriptionImage {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(width: 610, layout: CONSTRAINED)
            }
          }
        }
        agentBusinessResources {
          ...PostPreviewContent
        }
        agentBusinessProfileImage {
          altText
          localFile {
            publicURL
            childImageSharp {
              gatsbyImageData(aspectRatio: 1, width: 750, layout: CONSTRAINED)
            }
          }
        }
        agentBusinessProducts {
          ... on WpProduct {
            id
            uri
            products {
              shortProductDescription
              productName
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
    allWpPost(
      limit: 3
      filter: { status: { eq: "publish" }, production: { ne: "hidden" } }
    ) {
      nodes {
        ...PostPreviewContent
      }
    }
    placeholderImage: file(relativePath: { eq: "agent-hero.png" }) {
      id
      publicURL
      childImageSharp {
        gatsbyImageData(layout: FIXED, quality: 90, height: 360, width: 1920)
      }
    }
  }
`;
