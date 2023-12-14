import React, { useRef } from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import SectionBox from "../components/shared/SectionBox";
import SpeakWithAgent from "../components/speakWithAgent";
import ProductHeroSection from "../components/shared/ProductHeroSection";
import WhyProduct from "../components/shared/WhyProduct";
import RelatedProducts from "../components/shared/RelatedProducts";
import Resources from "../components/shared/Resources";
import Seo from "gatsby-plugin-wpgraphql-seo";
import { customSchema } from "../components/shared/customSchema";
import { useWebsiteData } from "../context/AppContext";

const DiscountLayout = ({ data, location }) => {
  const { state } = useWebsiteData();
  const { tempAgent } = state;

  const { productData } = data;
  const { discountProducts: product } = productData;
  const topPageRef = useRef();

  const scrollToTheTop = () => {
    topPageRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Layout location={location}>
      <Seo
        post={productData}
        postSchema={customSchema(productData.seo.schema.raw)}
      />
      <div ref={topPageRef} />
      <ProductHeroSection
        image={productData?.featuredImage}
        subtitle={product.heroContent}
        title={productData?.title}
        mobileImage={productData?.mobileFeaturedImage?.mobileFeaturedImage}
        location={location}
      />
      <WhyProduct product={product} />
      <section className="blue-section-gradient">
        <SectionBox
          image={product.typesOfMedicalDiscountsImage}
          sectionTitle={product.typesOfMedicalDiscountsSectionTitle}
        >
          <h3>{product.typesOfMedicalDiscountsBoxTitle}</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: product.typesOfMedicalDiscountsBoxContent,
            }}
          />
        </SectionBox>
      </section>
      <SectionBox
        rightImg={true}
        image={product.prescriptionDrugDiscountsImage}
      >
        <h3>{product.prescriptionDrugDiscountsBoxTitle}</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: product.prescriptionDrugDiscountsBoxContent,
          }}
        />
      </SectionBox>
      <section className="cta-section">
        <h3>{product.ctaSectionTitle}</h3>
        <p
          dangerouslySetInnerHTML={{
            __html: product.ctaSectionContent,
          }}
        />
        <button onClick={scrollToTheTop}>{product.ctaSectionButtonText}</button>
      </section>
      <SectionBox image={product.discountsOnHomeUseImage}>
        <h3>{product.discountsOnHomeUseTitle}</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: product.discountsOnHomeUseContent,
          }}
        />
      </SectionBox>
      <section className="blue-section-gradient">
        <SectionBox
          rightImg={true}
          image={product.discountsOnHealthcareSpecialistsImage}
        >
          <h3>{product.discountsOnHealthcareSpecialistsTitle}</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: product.discountsOnHealthcareSpecialistsContent,
            }}
          />
        </SectionBox>
      </section>
      <SectionBox
        image={product.discountsOnComplementaryAndAlternativeHealthcareImage}
      >
        <h3>{product.discountsOnComplementaryAndAlternativeHealthcareTitle}</h3>
        <div
          dangerouslySetInnerHTML={{
            __html:
              product.discountsOnComplementaryAndAlternativeHealthcareContent,
          }}
        />
      </SectionBox>
      <section className="blue-section-gradient">
        <SectionBox rightImg={true} image={product.expertAdministrationImage}>
          <h3>{product.expertAdministrationTitle}</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: product.expertAdministrationContent,
            }}
          />
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
  query discountLayout($id: String!) {
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
      discountProducts {
        ctaSectionButtonText
        ctaSectionContent
        ctaSectionTitle
        disclaimer
        discountsOnComplementaryAndAlternativeHealthcareContent
        discountsOnComplementaryAndAlternativeHealthcareTitle
        discountsOnHealthcareSpecialistsContent
        discountsOnHealthcareSpecialistsTitle
        discountsOnHomeUseContent
        discountsOnHomeUseTitle
        expertAdministrationContent
        expertAdministrationTitle
        heroContent
        prescriptionDrugDiscountsBoxContent
        prescriptionDrugDiscountsBoxTitle
        productName
        shortProductDescription
        typesOfMedicalDiscountsBoxContent
        typesOfMedicalDiscountsBoxTitle
        typesOfMedicalDiscountsSectionTitle
        whyThisProductBoxTwoContent
        whyThisProductBoxOneContent
        whyThisProductBoxOneTitle
        whyThisProductBoxThreeContent
        whyThisProductBoxThreeTitle
        whyThisProductBoxTwoTitle
        whyThisProductSectionTitle
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
        discountsOnComplementaryAndAlternativeHealthcareImage {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 90, width: 610, layout: CONSTRAINED)
            }
          }
        }

        discountsOnHealthcareSpecialistsImage {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 90, width: 610, layout: CONSTRAINED)
            }
          }
        }
        discountsOnHomeUseImage {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 90, width: 610, layout: CONSTRAINED)
            }
          }
        }
        expertAdministrationImage {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 90, width: 610, layout: CONSTRAINED)
            }
          }
        }
        prescriptionDrugDiscountsImage {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 90, width: 610, layout: CONSTRAINED)
            }
          }
        }
        typesOfMedicalDiscountsImage {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 90, width: 610, layout: CONSTRAINED)
            }
          }
        }
        whyThisProductBoxOneIcon {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(height: 45, layout: CONSTRAINED)
            }
          }
        }
        whyThisProductBoxTwoIcon {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(height: 45, layout: CONSTRAINED)
            }
          }
        }
        whyThisProductBoxThreeIcon {
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
`;

export default DiscountLayout;
