import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import Seo from "gatsby-plugin-wpgraphql-seo";
// ******** Components ********
import Layout from "../components/Layout";
import Resources from "../components/shared/Resources";
import SpeakWithAgent from "../components/speakWithAgent";
import FindYourAgentHero from "../components/shared/FindYourAgentHero";
import AllAgentsList from "../components/shared/allAgentsList";

const LocalHealthInsuranceOption = ({ data, location }) => {
  const [filters, setFilters] = useState({
    agentState: "",
    agentCity: "",
    agentAgencyName: "",
  });
  const [allAgents, setAllAgents] = useState([]);
  const { findYourAgentPage, allWpAgent } = data;

  useEffect(() => {
    if (allWpAgent?.nodes?.length > 0) {
      setAllAgents(allWpAgent?.nodes);
    }
  }, [allWpAgent]);

  return (
    <Layout location={location}>
      <Seo post={findYourAgentPage} />
      <div className="find-your-agent-page">
        <FindYourAgentHero
          image={findYourAgentPage?.featuredImage}
          subtitle={findYourAgentPage?.findYourAgent?.headerContent}
          title={findYourAgentPage?.title}
          mobileImage={
            findYourAgentPage?.mobileFeaturedImage?.mobileFeaturedImage
          }
          setFilters={setFilters}
        />
        <AllAgentsList filters={filters} allAgents={allAgents} />
        <Resources
          title="Learn More About Health Insurance"
          resources={findYourAgentPage?.findYourAgent?.selectedArticles}
        />
        <SpeakWithAgent />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query localHealthInsurance($id: String!) {
    findYourAgentPage: wpPage(id: { eq: $id }) {
      title
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
      findYourAgent {
        headerContent
        selectedArticles {
          ...PostPreviewContent
        }
      }
    }
    allWpAgent {
      nodes {
        title
        uri
        newagent {
          agentBusinessCity
          agentBusinessDescription
          agentBusinessListStates
          agentBusinessName
          agentBusinessPhoneNumber
          agentBusinessNumber
          agentBusinessState
          agentEmail
          agentFirstName
          agentLastName
          fieldGroupName
          agentBusinessDescription
          agentBusinessProfileImage {
            altText
            link
            localFile {
              childImageSharp {
                gatsbyImageData(
                  layout: FULL_WIDTH
                  quality: 90
                  aspectRatio: 1.0
                )
              }
            }
          }
        }
      }
    }
  }
`;

export default LocalHealthInsuranceOption;
