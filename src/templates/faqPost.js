import React, { useEffect } from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Seo from "gatsby-plugin-wpgraphql-seo";
import { Wysiwyg } from "../components/shared/Wysiwyg";
import { customSchema } from "../components/shared/customSchema";

const FaqPost = ({ data, location }) => {
  const { title, subtitle, content } = data.wpFaq;
  console.log(content);
  useEffect(() => {
    const footnoteLink = document.getElementsByClassName("footnoteLink");
    const footnotes = document.querySelector(".footnotes-list");
    const toggleBtn = document.getElementById("toggle-footnotes");

    const myFunction = function () {
      footnotes.classList.remove("is-hidden");
    };

    toggleBtn.onclick = function () {
      if (footnotes.classList.contains("is-hidden")) {
        footnotes.classList.remove("is-hidden");
      } else {
        footnotes.classList.add("is-hidden");
      }
    };

    Array.from(footnoteLink).map((item) =>
      item.addEventListener("click", myFunction, false)
    );
  });

  return (
    <Layout location={location}>
      <Seo
        post={data.wpFaq}
        postSchema={customSchema(data.wpFaq.seo.schema.raw)}
      />
      <section className="glossary-hero-section">
        <div className="custom-container">
          <h1>{subtitle ? subtitle : "FAQ"}</h1>
        </div>
      </section>
      <section className="glossary-post">
        <h2>{title}</h2>
        <Wysiwyg className="intro-content">{content}</Wysiwyg>
        {/* <div
          className="intro-content"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        /> */}
      </section>
    </Layout>
  );
};
export const query = graphql`
  query faqPost($id: String!) {
    wpFaq(id: { eq: $id }) {
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
    }
  }
`;
export default FaqPost;
