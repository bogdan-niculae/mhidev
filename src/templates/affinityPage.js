/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import HomePageHero from "../components/shared/HomePageHero";
import RelatedProducts from "../components/shared/RelatedProducts";
import SectionBox from "../components/shared/SectionBox";
import { Wysiwyg } from "../components/shared/Wysiwyg";
import Resources from "../components/shared/Resources";
import PhoneNumber from "../components/PhoneNumber";
import FeaturedMedia from "../components/shared/FeaturedMedia";
import { StaticImage } from "gatsby-plugin-image";
import Seo from "gatsby-plugin-wpgraphql-seo";
import { customSchema } from "../components/shared/customSchema";
import { useWebsiteData } from "../context/AppContext";
import { asyncLocalStorage } from "../hooks/helpers";

const AffinityPage = ({ data, location }) => {
  const { affinityPage, affinityImage } = data;
  const { affinity } = affinityPage;
  const { state, dispatch } = useWebsiteData();
  console.log(affinityPage);
  // // eslint-disable-next-line no-unused-vars
  // const [name, setName] = useLocalStorage("affinity", "");
  useEffect(() => {
    asyncLocalStorage
      .setItem("landingPageUrl", location.pathname)
      .then((res) => {
        dispatch({ type: "landingUrl", value: location.pathname });
        dispatch({ type: "affinityData", value: affinityPage });
        dispatch({
          type: "colorTheme",
          value: affinity?.colorSchema,
        });
        dispatch({
          type: "phoneNumber",
          value: affinity.affinityPhoneNumber || "8888556837",
        });
        dispatch({
          type: "availableProducts",
          value: affinity.linesOfBusiness,
        });
      });
  }, []);

  return (
    <Layout
      hidePhoneHeader={!affinity?.affinityPhoneNumber}
      location={location}
      affinityFooter
    >
      <Seo
        post={affinityPage}
        postSchema={customSchema(affinityPage.seo.schema.raw)}
      />
      <div className="affinity-page">
        <section className="home-page-hero-section">
          <div className="home-page-hero-content-wrapper">
            <div className="custom-container">
              <div className="home-page-hero-content">
                <h1>Need Individual Health Insurance Now?</h1>
              </div>
            </div>
          </div>
          <StaticImage
            className={`is-hidden-mobile`}
            src="../assets/images/affnity.jpg"
          />
          <StaticImage
            layout="fullWidth"
            className={`is-hidden-tablet`}
            src="../assets/images/affnity-mobile.jpg"
          />
          <div className="overlay" />
        </section>
        {/* <HomePageHero image={affinityPage?.featuredImage}></HomePageHero> */}
        <RelatedProducts
          relatedProducts={affinity?.linesOfBusiness}
          title="Products and Plans"
          subtitle="Find a plan that fits your needs and budget from a broad range of premiums, deductibles, and levels of coverage."
        />
        {/* <section className="blue-section-gradient">
          <SectionBox image={affinity.affinityDescriptionImage}>
            <h3>{affinity.affinityDescriptionTitle}</h3>
            <Wysiwyg>{affinity.affinityDescriptionContent}</Wysiwyg>
          </SectionBox>
        </section> */}
        <Resources
          title="Learn More About Health Insurance"
          resources={affinity.affinityArticleResources}
        />
        {affinity?.affinityPhoneNumber && (
          <div className="contact-agent">
            <h2>{affinity?.affinityCtaButton}</h2>
            {/* <button> */}

            <PhoneNumber className="cta-btn-phone">Call</PhoneNumber>
            {/* </button> */}
          </div>
        )}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query affinityPage($id: String!) {
    affinityPage: wpAffinity(id: { eq: $id }) {
      id
      databaseId
      uri
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
        cornerstone
        schema {
          raw
        }
      }
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH, quality: 90, height: 360)
            }
            publicURL
          }
          mediaDetails {
            width
            height
          }
        }
      }
      affinity {
        affinityDescriptionContent
        affinityDescriptionTitle
        affinityPhoneNumber
        colorSchema
        affinityCtaButton
        affinityDescriptionImage {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 90, width: 610, layout: CONSTRAINED)
            }
          }
        }
        linesOfBusiness {
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
        affinityArticleResources {
          ...PostPreviewContent
        }
      }
    }
  }
`;

export default AffinityPage;
