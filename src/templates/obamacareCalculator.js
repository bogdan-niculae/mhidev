import React from "react";
import { graphql } from "gatsby";
// ******** Components ********
import Layout from "../components/Layout";
import HomePageHero from "../components/shared/HomePageHero";
import Resources from "../components/shared/Resources";
import SpeakWithAgent from "../components/speakWithAgent";
import HomeCalculator from "../components/homeCalculator";
import Seo from "gatsby-plugin-wpgraphql-seo";
import { customSchema } from "../components/shared/customSchema";

const ObamacareCalculator = ({ data, location }) => {
  const { obamacareCalc } = data;

  return (
    <Layout location={location}>
      <Seo
        post={obamacareCalc}
        postSchema={customSchema(obamacareCalc.seo.schema.raw)}
      />
      <div className="obamacare-calculator">
        <HomePageHero
          image={obamacareCalc?.featuredImage}
          mobileImage={obamacareCalc?.mobileFeaturedImage?.mobileFeaturedImage}
        >
          <h1>{obamacareCalc?.title}</h1>
          <p
            dangerouslySetInnerHTML={{
              __html: obamacareCalc?.obamacareCalculator?.headerContent,
            }}
          />
        </HomePageHero>
        <section className="obamacare-calculator-intro-section">
          <div className="container is-widescreen">
            <h2>{obamacareCalc?.obamacareCalculator?.introTitle}</h2>
            <div
              className="intro-content"
              dangerouslySetInnerHTML={{
                __html: obamacareCalc?.obamacareCalculator?.introText,
              }}
            />
          </div>
        </section>
        <HomeCalculator location={location} />
        <Resources
          title="Learn More About Health Insurance"
          resources={obamacareCalc?.obamacareCalculator?.selectedArticles}
        />
        <SpeakWithAgent />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query obamacareCalculatorPage($id: String!) {
    obamacareCalc: wpPage(id: { eq: $id }) {
      ...PageContent
      obamacareCalculator {
        articleSectionTitle
        fieldGroupName
        headerContent
        introText
        introTitle
        selectedArticles {
          ...PostPreviewContent
        }
      }
    }
  }
`;

export default ObamacareCalculator;
