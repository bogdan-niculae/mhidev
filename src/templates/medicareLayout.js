import React from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import SectionBox from "../components/shared/SectionBox";
import SpeakWithAgent from "../components/speakWithAgent";
import RelatedProducts from "../components/shared/RelatedProducts";
import Resources from "../components/shared/Resources";
import FaqSection from "../components/shared/FaqSection";
import Seo from "gatsby-plugin-wpgraphql-seo";
import { customSchema } from "../components/shared/customSchema";
import ProductHeroSectionCtaBtn from "../components/shared/ProductHeroSectionCtaBtn";
import { useWebsiteData } from "../context/AppContext";

const MedicareLayoutPage = ({ data, location }) => {
  const { state } = useWebsiteData();
  const { tempAgent } = state;

  const { productData } = data;
  const { medicareProducts: product } = productData;
  const {
    faq: {
      fAQs: { nodes: faqData },
    },
  } = product;
  const setMedicarePhoneNumber = () => {
    if (state.affinityData) {
      return state.phoneNumber;
    }

    if (tempAgent) {
      return tempAgent.agentBusinessPhoneNumber;
    }

    return "855-914-1497";
  };
  const medicarePhoneNumber = setMedicarePhoneNumber();
  console.log("medicarePhoneNumber", medicarePhoneNumber);
  return (
    <Layout
      phoneNumber={medicarePhoneNumber}
      location={location}
      productFootnotes
    >
      <Seo
        post={productData}
        postSchema={customSchema(productData.seo.schema.raw)}
      />
      <ProductHeroSectionCtaBtn
        image={productData?.featuredImage}
        subtitle={product.heroContent}
        title={productData?.title}
        mobileImage={productData?.mobileFeaturedImage?.mobileFeaturedImage}
        location={location}
        phoneNumber={medicarePhoneNumber}
      />
      <SectionBox
        image={product.whatProductCoversImage}
        className="what-is-medicare"
      >
        <h3>{product.productTitle}</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: product.productDescription,
          }}
        />
      </SectionBox>
      <section className="medicare-covers-section">
        <div className="container is-widescreen">
          <h3>{product.medicareCoversTitle}</h3>
          <p>{product.medicareCoversSubtitle}</p>
          <div className="medicare-covers-lists-row">
            <div className="medicare-covers-lists-col">
              <p>Medicare Part A</p>
              <div
                dangerouslySetInnerHTML={{
                  __html: product.medicarePartAList,
                }}
              />
            </div>
            <div className="medicare-covers-lists-col">
              <p>Medicare Part B</p>
              <div
                dangerouslySetInnerHTML={{
                  __html: product.medicarePartBList,
                }}
              />
            </div>
            <div className="medicare-covers-lists-col">
              <p>Medicare Part C</p>
              <div
                dangerouslySetInnerHTML={{
                  __html: product.medicarePartCList,
                }}
              />
            </div>
            <div className="medicare-covers-lists-col">
              <p>Medicare Part D</p>
              <div
                dangerouslySetInnerHTML={{
                  __html: product.medicarePartDList,
                }}
              />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div
          className="eligible-intro-text"
          dangerouslySetInnerHTML={{
            __html: product.areYouEligibleForMedicareIntroSectionText,
          }}
        />
      </section>
      <section className="eligible-for-medicare-section">
        <div className="container is-widescreen">
          <h3>{product.areYouEligibleForMedicareSectionTitle}</h3>
          <div
            className="eligible-for-medicare-subheader"
            dangerouslySetInnerHTML={{
              __html: product.areYouEligibleForMedicareSectionSubtitle,
            }}
          />
        </div>

        <SectionBox
          className="eligible-for-medicare-box"
          image={product.areYouEligibleForMedicareImage}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: product.areYouEligibleForMedicareBoxContent,
            }}
          />
        </SectionBox>
      </section>
      <FaqSection
        title={`Find Answers to Questions About Medicare`}
        faqData={faqData}
      />
      <section className="blue-section">
        <Resources
          title={`${productData.title} Resources`}
          resources={product.productResources}
        />
      </section>
      <RelatedProducts
        agentData={tempAgent}
        relatedProducts={
          tempAgent
            ? tempAgent.agentBusinessProducts.filter(
                (product, key) =>
                  product.products.productName !== productData.title && product
              )
            : state?.availableProducts
            ? state?.availableProducts.filter(
                (item) => item.title !== productData.title
              )
            : product.relatedProducts
        }
      />
      {/* <RelatedProducts relatedProducts={product.relatedProducts} /> */}

      {/* <section className="medicare-language">
        <div
          className="medicare-language-container"
          dangerouslySetInnerHTML={{
            __html: product.areYouEligibleForMedicareIntroSectionText,
          }}
        />
      </section> */}
      <SpeakWithAgent phoneNumber={medicarePhoneNumber} />
    </Layout>
  );
};

export const query = graphql`
  query medicareLayout($id: String!) {
    productData: wpProduct(id: { eq: $id }) {
      id
      uri
      title
      slug
      hideFormOnProductPage {
        showCtaForm
      }
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
            ...ProductHeroImage
            publicURL
          }
          mediaDetails {
            width
            height
          }
        }
      }
      mobileFeaturedImage {
        mobileFeaturedImage {
          altText
          localFile {
            publicURL
            ...ProductHeroMobileImage
          }
        }
      }
      medicareProducts {
        medicarePartDList
        medicarePartCList
        medicarePartBList
        medicarePartAList
        medicareCoversTitle
        medicareCoversSubtitle
        heroContent
        areYouEligibleForMedicareSectionTitle
        areYouEligibleForMedicareSectionSubtitle
        areYouEligibleForMedicareIntroSectionText
        areYouEligibleForMedicareBoxContent
        productName
        productTitle
        productDescription
        shortProductDescription
        faq {
          fAQs {
            nodes {
              content
              title
              uri
            }
          }
        }
        relatedProducts {
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
        productResources {
          ...PostPreviewContent
        }

        areYouEligibleForMedicareImage {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(width: 610, layout: CONSTRAINED)
            }
          }
        }
        whatProductCoversImage {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(width: 610, layout: CONSTRAINED)
            }
          }
        }
      }
    }
  }
`;

export default MedicareLayoutPage;
