import React from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import SectionBox from "../components/shared/SectionBox";
import SpeakWithAgent from "../components/speakWithAgent";
import CoversSection from "../components/shared/CoversSection";
import ProsAndCons from "../components/shared/ProsAndCons";
import ProductHeroSection from "../components/shared/ProductHeroSection";

import RelatedProducts from "../components/shared/RelatedProducts";
import Resources from "../components/shared/Resources";
import FaqSection from "../components/shared/FaqSection";
import Seo from "gatsby-plugin-wpgraphql-seo";
import { customSchema } from "../components/shared/customSchema";
import ProductHeroSectionCtaBtn from "../components/shared/ProductHeroSectionCtaBtn";
import { useWebsiteData } from "../context/AppContext";
import Banner from "../components/shared/Banner";

const ProductPage = ({ data, location }) => {
  const { state } = useWebsiteData();
  const { tempAgent } = state;

  const {
    productData,
    faqProducts: { nodes: faqProductsData },
  } = data;
  const { products: product, banner } = productData;
  return (
    <Layout location={location} productFootnotes>
      <Seo
        post={productData}
        postSchema={customSchema(productData.seo.schema.raw)}
      />
      {productData?.hideFormOnProductPage?.showCtaForm ? (
        <ProductHeroSectionCtaBtn
          image={productData?.featuredImage}
          subtitle={product.heroContent}
          title={productData?.title}
          mobileImage={productData?.mobileFeaturedImage?.mobileFeaturedImage}
          location={location}
        />
      ) : (
        <ProductHeroSection
          image={productData?.featuredImage}
          subtitle={product.heroContent}
          title={productData?.title}
          mobileImage={productData?.mobileFeaturedImage?.mobileFeaturedImage}
          location={location}
        />
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
      {banner?.bannerUrl && (
        <div className="product-banner-section">
          <Banner banner={banner} />
        </div>
      )}
      <ProsAndCons
        pros={product.pros}
        cons={product.cons}
        prosImage={product.prosImage}
        consImage={product.consImage}
        prosAndConsTitle={product.prosAndConsTitle}
      />
      <FaqSection
        title={`Find Answers to ${productData.title} Questions`}
        faqData={faqProductsData}
      />
      <div className="blue-section">
        <Resources
          title={`${productData.title} Resources`}
          resources={product.productResources}
        />
      </div>
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
  query productPage($id: String!, $faqCat: String!) {
    productData: wpProduct(id: { eq: $id }) {
      ...ProductContent
      banner {
        bannerUrl
        bannerImage {
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 100)
            }
          }
        }
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
  }
`;

export default ProductPage;
