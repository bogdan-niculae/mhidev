import React from "react";
import Layout from "../components/Layout";
import { graphql, navigate } from "gatsby";
import SectionBox from "../components/shared/SectionBox";
import SpeakWithAgent from "../components/speakWithAgent";
import ProductHeroSection from "../components/shared/ProductHeroSection";
import RelatedProducts from "../components/shared/RelatedProducts";
import Resources from "../components/shared/Resources";
import FaqSection from "../components/shared/FaqSection";
import Seo from "gatsby-plugin-wpgraphql-seo";
import PhoneNumber from "../components/PhoneNumber";
import { customSchema } from "../components/shared/customSchema";
import { Wysiwyg } from "../components/shared/Wysiwyg";
import { useWebsiteData } from "../context/AppContext";

const ObamacareLayout = ({ data, location }) => {
  const { state } = useWebsiteData();
  const { tempAgent } = state;
  const {
    productData,
    faqProducts: { nodes: faqProductsData },
  } = data;

  const { obamacareProducts: product } = productData;

  return (
    <Layout location={location} productFootnotes>
      <Seo
        post={productData}
        postSchema={customSchema(productData.seo.schema.raw)}
      />
      <ProductHeroSection
        image={productData?.featuredImage}
        subtitle={product.heroContent}
        title={productData?.title}
        mobileImage={productData?.mobileFeaturedImage?.mobileFeaturedImage}
        location={location}
        redirect={false}
      />
      <SectionBox image={product.whatIsObamacareInsuranceImage}>
        <h3>{product.whatIsObamacareInsuranceTitle}</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: product.whatIsObamacareInsuranceContent,
          }}
        />
      </SectionBox>
      <section className="what-insurance-covers-section">
        <div className="container is-widescreen">
          <h3>{product.whatDoesObamacareCoversSectionTitle}</h3>
          <p>{product.whatDoesObamacareCoversSubtitle}</p>
          <div
            className="what-insurance-covers-list"
            dangerouslySetInnerHTML={{
              __html: product.whatDoesObamacareCoversList,
            }}
          />
        </div>
      </section>
      <section className="learn-more-section">
        <p
          className="paragraph-link"
          onClick={() =>
            navigate(
              `/blog/aca/what-are-aca-required-essential-health-benefits/`
            )
          }
        >
          Learn more about the 10 Essential Health Benefits required by ACA
          health plans.
        </p>
      </section>
      <section className="cta-section">
        <h3>{product.ctaSectionTitle}</h3>
        <p>{product.ctaSectionContent}</p>
        <button className="phone-number-btn">
          Call <PhoneNumber dash={true} />
        </button>
      </section>
      <SectionBox rightImg={true} image={product.guaranteedIssueImage}>
        <h3>{product.guaranteedIssueTitle}</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: product.guaranteedIssueContent,
          }}
        />
      </SectionBox>
      <section className="do-you-need-insurance-section">
        <div className="container is-widescreen">
          <h3>{product.doYouNeedInsuranceSectionTitle}</h3>
          <div
            className="do-you-need-insurance-content"
            dangerouslySetInnerHTML={{
              __html: product.doYouNeedInsuranceContent,
            }}
          />
        </div>

        <SectionBox
          className="do-you-need-insurance-box"
          image={product.doYouNeedInsuranceImage}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: product.doYouNeedInsuranceBoxContent,
            }}
          />
        </SectionBox>
      </section>
      <FaqSection
        title="Find Answers to ACA/Obamacare Medical Insurance Questions"
        faqData={faqProductsData}
      />
      <section className="blue-section-gradient">
        <SectionBox image={product.whenCanYouGetInsuranceImage}>
          <h3>{product.whenCanYouGetInsuranceTitle}</h3>
          <Wysiwyg>{product.whenCanYouGetInsuranceContent}</Wysiwyg>
        </SectionBox>
      </section>
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
      <SpeakWithAgent />
    </Layout>
  );
};

export const query = graphql`
  query obamacareLayout($id: String!, $faqCat: String!) {
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
    productData: wpProduct(id: { eq: $id }) {
      id
      uri
      title
      slug
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
      obamacareProducts {
        ctaSectionContent
        ctaSectionTitle
        disclaimer
        doYouNeedInsuranceBoxContent
        doYouNeedInsuranceContent
        doYouNeedInsuranceSectionTitle
        guaranteedIssueContent
        guaranteedIssueTitle
        heroContent
        productName
        shortProductDescription
        whatDoesObamacareCoversList
        whatDoesObamacareCoversSectionTitle
        whatDoesObamacareCoversSubtitle
        whatIsObamacareInsuranceContent
        whatIsObamacareInsuranceTitle
        whenCanYouGetInsuranceContent
        whenCanYouGetInsuranceTitle
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

        doYouNeedInsuranceImage {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 90, width: 610, layout: CONSTRAINED)
            }
          }
        }
        guaranteedIssueImage {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 90, width: 610, layout: CONSTRAINED)
            }
          }
        }
        whatIsObamacareInsuranceImage {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 90, width: 610, layout: CONSTRAINED)
            }
          }
        }
        whenCanYouGetInsuranceImage {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 90, width: 610, layout: CONSTRAINED)
            }
          }
        }
      }
    }
  }
`;

export default ObamacareLayout;
