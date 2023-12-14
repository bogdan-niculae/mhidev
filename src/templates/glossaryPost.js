import React from "react";
import { graphql, Link } from "gatsby";
import Seo from "gatsby-plugin-wpgraphql-seo";
import Layout from "../components/Layout";
import Next from "../assets/svg/next.svg";
import Prev from "../assets/svg/prev.svg";
import { customSchema } from "../components/shared/customSchema";

const GlossaryPost = ({ data, location, pageContext }) => {
  const { title, subtitle, content, termsCustomFieldsGeneral } = data.wpTerm;
  const { next, prev } = pageContext;

  return (
    <Layout location={location}>
      <Seo
        post={data.wpTerm}
        postSchema={customSchema(data.wpTerm.seo.schema.raw)}
      />
      <section className="glossary-hero-section">
        <div className="custom-container">
          <h1>{subtitle ? subtitle : "Glossary"}</h1>
        </div>
      </section>
      <section className="glossary-post">
        <h2>{title}</h2>
        <div
          className="intro-content"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
        {termsCustomFieldsGeneral.relatedTerms && (
          <section className="related-terms-section">
            <p>
              <strong>Related terms:</strong>
            </p>
            <p>
              {termsCustomFieldsGeneral.relatedTerms.map((terms, index) => (
                <>
                  <Link
                    data-tip={`<span class='header-tooltip'>${terms.title}</span><span class="tooltip-content">${terms.excerpt}</span>`}
                    className="related-terms-links"
                    to={terms.uri}
                  >
                    {terms.title}
                  </Link>
                  {index + 1 === termsCustomFieldsGeneral?.relatedTerms.length
                    ? ""
                    : ","}
                </>
              ))}
            </p>
          </section>
        )}
        <div>
          <p className="back-glossary">
            <Link to="/glossary/">Back to glossary</Link>
          </p>
          <div className="nav-links">
            <div className="prev">
              {prev && (
                <Link to={prev.uri}>
                  <span>
                    <img src={Prev} alt="prev" />
                    <img src={Prev} alt="prev" />
                  </span>
                  {prev.title}
                </Link>
              )}
            </div>
            <div className="next">
              {next && (
                <Link to={next.uri}>
                  {next.title}
                  <span>
                    <img src={Next} alt="next" />
                    <img src={Next} alt="next" />
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export const query = graphql`
  query glossaryPost($id: String!) {
    wpTerm(id: { eq: $id }) {
      id
      uri
      title
      content
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
      termsCustomFieldsGeneral {
        relatedTerms {
          ... on WpTerm {
            id
            title
            uri
            excerpt
          }
        }
      }
    }
  }
`;
export default GlossaryPost;
