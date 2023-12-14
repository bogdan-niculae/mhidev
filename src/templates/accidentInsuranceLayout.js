import React from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import SectionBox from "../components/shared/SectionBox";
import SpeakWithAgent from "../components/speakWithAgent";
import CoversSection from "../components/shared/CoversSection";
import ProsAndCons from "../components/shared/ProsAndCons";
import ProductHeroSection from "../components/shared/ProductHeroSection";
import WhyProduct from "../components/shared/WhyProduct";
import RelatedProducts from "../components/shared/RelatedProducts";
import Resources from "../components/shared/Resources";
import Seo from "gatsby-plugin-wpgraphql-seo";
import { customSchema } from "../components/shared/customSchema";
import { Wysiwyg } from "../components/shared/Wysiwyg";
import { useWebsiteData } from "../context/AppContext";

const AccidentInsuranceLayout = ({ data, location }) => {
  const { state } = useWebsiteData();
  const { tempAgent } = state;

  const { productData } = data;
  const { accidentProducts: product } = productData;

  return (
    <Layout location={location}>
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
      />
      {product.hideWhyThisProductSection ? null : (
        <WhyProduct product={product} />
      )}
      <SectionBox image={product.whatProductCoversImage}>
        <h3>{product.productTitle}</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: product.productDescription,
          }}
        />
      </SectionBox>
      <CoversSection
        coversTitle={product.coversTitle}
        covers={product.covers}
        doesNotCoversTitle={product.doesNotCoversTitle}
        doesNotCover={product.doesNotCover}
      />
      <ProsAndCons
        pros={product.pros}
        cons={product.cons}
        prosImage={product.prosImage}
        consImage={product.consImage}
        prosAndConsTitle={product.prosAndConsTitle}
      />
      <SectionBox rightImg={true} image={product.combineWithOtherPlansImage}>
        <h3>{product.combineWithOtherPlansTitle}</h3>
        <Wysiwyg>{product.combineWithOtherPlansContent}</Wysiwyg>
      </SectionBox>
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
      <SpeakWithAgent />
    </Layout>
  );
};

export const query = graphql`
  query accidentInsuranceLayout($id: String!) {
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
      accidentProducts {
        hideWhyThisProductSection
        combineWithOtherPlansContent
        combineWithOtherPlansTitle
        cons
        covers
        coversTitle
        disclaimer
        doesNotCover
        doesNotCoversTitle
        fieldGroupName
        heroContent
        productDescription
        productName
        productTitle
        pros
        prosAndConsText
        prosAndConsTitle
        shortProductDescription
        whyThisProductBoxOneContent
        whyThisProductBoxOneTitle
        whyThisProductBoxThreeContent
        whyThisProductBoxThreeTitle
        whyThisProductBoxTwoContent
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
        combineWithOtherPlansImage {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 90, width: 610, layout: CONSTRAINED)
            }
          }
        }
        consImage {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 90, width: 610, layout: CONSTRAINED)
            }
          }
        }
        prosImage {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 90, width: 610, layout: CONSTRAINED)
            }
          }
        }
        whatProductCoversImage {
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

export default AccidentInsuranceLayout;
