import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import SectionBox from "../components/shared/SectionBox";
// import SpeakWithAgent from "../components/speakWithAgent";
// import CoversSection from "../components/shared/CoversSection";
// import ProsAndCons from "../components/shared/ProsAndCons";

// import RelatedProducts from "../components/shared/RelatedProducts";
// import Resources from "../components/shared/Resources";
import FaqSection from "../components/shared/FaqSection";
import Seo from "gatsby-plugin-wpgraphql-seo";
import { customSchema } from "../components/shared/customSchema";
// import ProductHeroSectionCtaBtn from "../components/shared/ProductHeroSectionCtaBtn";
import { useWebsiteData } from "../context/AppContext";
import PetInsuranceHero from "../components/shared/PetInsuranceHero";
import { StaticImage } from "gatsby-plugin-image";
import PhoneNumber from "../components/PhoneNumber";

const PetInsurancePage = ({ data, location }) => {
  const { dispatch } = useWebsiteData();
  const { productData, wpAffinity } = data;
  const { products: product } = productData;
  const {
    petInsurance: { petFaq, footerDisclaimer },
  } = productData;

  useEffect(() => {
    dispatch({
      type: "landingUrl",
      value: "/affinity/intouch-credit-union/",
    });
    dispatch({ type: "affinityData", value: wpAffinity });
    dispatch({
      type: "colorTheme",
      value: wpAffinity.affinity?.colorSchema,
    });
    dispatch({
      type: "phoneNumber",
      value: wpAffinity.affinity.affinityPhoneNumber,
    });
    dispatch({
      type: "availableProducts",
      value: wpAffinity.affinity.linesOfBusiness,
    });
  }, []);

  return (
    <Layout
      location={location}
      disclaimer={footerDisclaimer}
      productFootnotes
      phoneNumber="8552429970"
      hidePhoneHeader
    >
      <Seo
        post={productData}
        postSchema={customSchema(productData.seo.schema.raw)}
      />

      <PetInsuranceHero
        image={productData?.featuredImage}
        subtitle={product.heroContent}
        title={productData?.title}
        mobileImage={productData?.mobileFeaturedImage?.mobileFeaturedImage}
        location={location}
      />

      <SectionBox image={product.whatProductCoversImage}>
        <div
          dangerouslySetInnerHTML={{
            __html: product.productDescription,
          }}
        />
        <div
          className="small"
          dangerouslySetInnerHTML={{
            __html: product.disclaimer,
          }}
        />
      </SectionBox>
      <FaqSection
        title={`Find Answers to ${productData.title} Questions`}
        faqData={petFaq}
      />
      {/* <div className="blue-section">
        <Resources
          title={`${productData.title} Resources`}
          resources={product.productResources}
        />
      </div> */}
      {/* <RelatedProducts
        relatedProducts={
          state?.availableProducts
            ? state?.availableProducts.filter(
                (item) => item.title !== productData.title
              )
            : product.relatedProducts
        }
      /> */}
      <div className="speak-with-agent">
        <StaticImage
          src="../assets/images/speak_with_agent.png"
          className="speak-with-agent-image-dekstop"
          alt="Speak With Agent"
        />
        <StaticImage
          src="../assets/images/speak-with-agent-mobile.png"
          className="speak-with-agent-image-mobile"
          alt="Speak With Agent"
        />
        <div className="speak-with-agent-wrapper">
          <div className="speak-with-agent-content">
            <h2>Have Questions? Speak to an Agent</h2>
            <p>
              Speak to a licensed agent during business hours for help
              understanding your options and enrolling in coverage.
            </p>
            <button>
              Call
              {/* <a href={`${phoneNumber ? phoneNumber : "tel:888-855-6837"}`}>
                {phoneNumber ? phoneNumber : "888-855-6837"}
              </a> */}
              <PhoneNumber phoneNumber={"855-242-9970"} />
            </button>
          </div>
        </div>
      </div>
      {/* <SpeakWithAgent phoneNumber="8552429970" /> */}
    </Layout>
  );
};

export const query = graphql`
  query petInsurancePage($id: String!, $faqCat: String!) {
    productData: wpProduct(id: { eq: $id }) {
      ...ProductContent
      petInsurance {
        petFaq {
          content
          title
        }
        footerDisclaimer
      }
    }
    faqProducts: allWpFaq(
      sort: { fields: date, order: ASC }
      filter: {
        fAQCategories: { nodes: { elemMatch: { slug: { eq: $faqCat } } } }
      }
    ) {
      nodes {
        id
        title
        content
      }
    }
    wpAffinity(uri: { eq: "/affinity/intouch-credit-union/" }) {
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
              gatsbyImageData(width: 173)
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
`;

export default PetInsurancePage;
