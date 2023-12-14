import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Seo from "gatsby-plugin-wpgraphql-seo";
import HomePageHero from "../components/shared/HomePageHero";
import { customSchema } from "../components/shared/customSchema";

const GlossaryPage = ({ data, location }) => {
  const { allWpTerm, wpPage } = data;
  const { title, featuredImage, mobileFeaturedImage } = wpPage;
  const { edges } = allWpTerm;
  const sortAlphabetically = (a, b) => {
    let titleA = a.node.title.toUpperCase();
    let titleB = b.node.title.toUpperCase();
    return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
  };
  const letters = [...Array(26)].map((val, i) => String.fromCharCode(i + 65));
  const checkLetters = (letter) => {
    return edges.filter((edge) => {
      return edge.node.title.charAt(0).toUpperCase() === letter;
    });
  };
  return (
    <Layout location={location}>
      <Seo post={wpPage} postSchema={customSchema(wpPage.seo.schema.raw)} />
      <HomePageHero
        image={featuredImage}
        mobileImage={mobileFeaturedImage?.mobileFeaturedImage}
      >
        <h1>{title}</h1>
      </HomePageHero>
      <section className="glossary">
        <div className="alphabet">
          {letters.map((letter) => {
            let glossaries = checkLetters(letter);
            console.log(glossaries);
            if (Object.keys(glossaries).length === 0) {
              return (
                <a key={letter} className="no-active">
                  <h3 className="no-active">{letter}</h3>
                </a>
              );
            } else {
              return (
                <a key={`${letter}`} href={`#${letter}`}>
                  <h3>{letter}</h3>
                </a>
              );
            }
          })}
        </div>
        <div className="letters-list">
          {letters.map((letter) => {
            let glossaries = checkLetters(letter);
            if (Object.keys(glossaries).length === 0) return null;
            return (
              <div key={letter} className="glossaries-div">
                <div>
                  <a name={letter}>
                    <h2>{letter}</h2>
                  </a>
                </div>
                <div className="glossaries-wrapper">
                  {glossaries.sort(sortAlphabetically).map((glossary) => (
                    <p key={glossary.node.title}>
                      <a href={glossary.node.uri}>{glossary.node.title}</a>
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
};

export const query = graphql`
  query glossaryPage($id: String!) {
    wpPage(id: { eq: $id }) {
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
                height: 200
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
            childImageSharp {
              # gatsbyImageData(layout: FIXED, quality: 90, height: 360, width: 1920, transformOptions: { trim: 5.3, cropFocus: NORTHEAST, fit: COVER })
              gatsbyImageData(height: 200, layout: FULL_WIDTH)
            }
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
    allWpTerm {
      edges {
        node {
          title
          uri
        }
      }
    }
  }
`;
export default GlossaryPage;
