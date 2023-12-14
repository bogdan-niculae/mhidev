import React from "react";
import { graphql } from "gatsby";
import Seo from "gatsby-plugin-wpgraphql-seo";
// ******** Components ********
import Layout from "../components/Layout";
import HeroSection from "../components/heroSection";
import { customSchema } from "../components/shared/customSchema";

const PrivacyPage = ({ data, location }) => {
  const { privacyPage } = data;

  return (
    <Layout location={location}>
      <Seo
        post={privacyPage}
        postSchema={customSchema(privacyPage.seo.schema.raw)}
      />
      <HeroSection
        className="privacy-hero-image"
        image={privacyPage?.featuredImage}
        subtitle=""
        title={privacyPage?.title}
        overlay
      />
      <section className="page-content-section">
        <div className="custom-container">
          <div
            dangerouslySetInnerHTML={{
              __html: privacyPage.content,
            }}
          />
        </div>
      </section>
    </Layout>
  );
};

export const query = graphql`
  query privacyPage($id: String!) {
    privacyPage: wpPage(id: { eq: $id }) {
      title
      uri
      content
      databaseId
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              # gatsbyImageData(layout: FIXED, quality: 90, height: 360, width: 1920, transformOptions: { trim: 5.3, cropFocus: NORTHEAST, fit: COVER })
              gatsbyImageData(
                layout: FIXED
                quality: 90
                height: 210
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
      mobileFeaturedImage {
        mobileFeaturedImage {
          altText
          localFile {
            publicURL
            ...ProductHeroMobileImage
          }
        }
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
    }
  }
`;

export default PrivacyPage;
