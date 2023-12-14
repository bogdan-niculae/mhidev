import React from "react";
import { graphql } from "gatsby";
import Seo from "gatsby-plugin-wpgraphql-seo";
// ******** Components ********
import Layout from "../components/Layout";
import HeroSection from "../components/heroSection";
import SectionBox from "../components/shared/SectionBox";
import { customSchema } from "../components/shared/customSchema";

const AboutUsPage = ({ data, location }) => {
  const { aboutUsPage } = data;
  const { aboutUs } = aboutUsPage;

  return (
    <Layout location={location}>
      <Seo
        post={aboutUsPage}
        postSchema={customSchema(aboutUsPage.seo.schema.raw)}
      />
      <div className="about-us">
        <HeroSection
          image={aboutUsPage?.featuredImage}
          subtitle={aboutUs.headerContent}
          title={aboutUsPage?.title}
          overlay
        />

        <div className="intro-section">
          <h2>{aboutUs?.introTitle}</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: aboutUs?.introContent,
            }}
            className="intro-section-content"
          />
        </div>
        <div className="section-one-wrapper is-hidden-touch">
          <SectionBox image={aboutUs?.sectionOneImage} className="section-one">
            <div
              dangerouslySetInnerHTML={{
                __html: aboutUs?.sectionOneContent,
              }}
            />
            {/* <Wysiwyg>{aboutUs?.sectionOneContent}</Wysiwyg> */}
          </SectionBox>
        </div>

        <div className="section-one-wrapper is-hidden-desktop">
          <SectionBox
            image={aboutUs?.sectionOneMobileImage}
            className="section-one"
          >
            <div
              dangerouslySetInnerHTML={{
                __html: aboutUs?.sectionOneContent,
              }}
            />
            {/* <Wysiwyg>{aboutUs?.sectionOneContent}</Wysiwyg> */}
          </SectionBox>
        </div>

        <div className="section-two-wrapper is-hidden-touch">
          <SectionBox
            image={aboutUs?.sectionTwoImage}
            rightImg
            className="section-two"
          >
            <div
              dangerouslySetInnerHTML={{
                __html: aboutUs?.sectionTwoContent,
              }}
            />
          </SectionBox>
        </div>

        <div className="section-two-wrapper is-hidden-desktop">
          <SectionBox
            image={aboutUs?.sectionTwoMobileImage}
            rightImg
            className="section-two"
          >
            <div
              dangerouslySetInnerHTML={{
                __html: aboutUs?.sectionTwoContent,
              }}
            />
          </SectionBox>
        </div>
        {/* <div className="section-three">
          <div className="custom-container">
            <h2>{aboutUs?.sectionThreeTitle}</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: aboutUs?.sectionThreeContent,
              }}
              className="section-three-content"
            />
          </div>
        </div> */}
        {/* <div
          dangerouslySetInnerHTML={{
            __html: aboutUs?.howWeRateContent,
          }}
          className="custom-container how-we-rate"
        /> */}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query aboutUsPage($id: String!) {
    aboutUsPage: wpPage(id: { eq: $id }) {
      ...PageContent
      aboutUs {
        fieldGroupName
        headerContent
        howWeRateContent
        introContent
        introTitle
        sectionOneContent
        sectionThreeContent
        sectionThreeTitle
        sectionTwoContent
        sectionOneImage {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(width: 610, layout: CONSTRAINED)
            }
          }
        }
        sectionOneMobileImage {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(width: 610, layout: CONSTRAINED)
            }
          }
        }
        sectionTwoImage {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(width: 610, layout: CONSTRAINED)
            }
          }
        }
        sectionTwoMobileImage {
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

export default AboutUsPage;
