import React from "react";
import { format } from "date-fns";
import Seo from "gatsby-plugin-wpgraphql-seo";
// ******** Components ********
import Layout from "../components/Layout";
import HomePageHero from "../components/shared/HomePageHero";
import { customSchema } from "../components/shared/customSchema";
import { graphql, Link } from "gatsby";

const SiteMap = ({ data, location }) => {
  const { wpPage } = data;
  const { title, featuredImage, mobileFeaturedImage } = wpPage;
  const pages = data?.allWpPage?.nodes;
  const terms = data?.allWpTerm?.nodes;
  const faqs = data?.allWpFaq?.nodes;
  const posts = data?.allWpPost?.nodes;
  const products = data?.allWpProduct?.nodes;
  const categories = data?.allWpCategory?.nodes;

  const formatDate = (date) => format(new Date(date), "LLLL do, yyyy");

  const renderList = (list) =>
    list?.length > 0 &&
    list.map((item) => (
      <li key={item.id}>
        <Link to={item.uri}>{item.title || item.name}</Link>
        <span>{item.date && formatDate(item.date)}</span>
      </li>
    ));

  return (
    <Layout location={location}>
      <Seo post={wpPage} postSchema={customSchema(wpPage.seo.schema.raw)} />
      <div className="site-map">
        <HomePageHero
          image={featuredImage}
          mobileImage={mobileFeaturedImage?.mobileFeaturedImage}
        >
          <h1>{title}</h1>
        </HomePageHero>
        <div className="custom-container">
          <section>
            <h3>Pages</h3>
            <ul className="links">{renderList(pages)}</ul>
          </section>
          <section>
            <h3>Terms</h3>
            <ul className="links">{renderList(terms)}</ul>
          </section>
          <section>
            <h3>FAQ</h3>
            <ul className="links">{renderList(faqs)}</ul>
          </section>
          <section>
            <h3>Posts</h3>
            <ul className="links">{renderList(posts)}</ul>
          </section>
          <section>
            <h3>Products</h3>
            <ul className="links">{renderList(products)}</ul>
          </section>
          <section>
            <h3>Categories</h3>
            <ul className="links">{renderList(categories)}</ul>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default SiteMap;

export const query = graphql`
  query SiteMap($id: String!) {
    wpPage(id: { eq: $id }) {
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
    }
    allWpPost {
      nodes {
        id
        date
        title
        uri
      }
    }
    allWpTerm {
      nodes {
        id
        date
        title
        uri
      }
    }
    allWpFaq {
      nodes {
        id
        date
        uri
        title
      }
    }
    allWpPage {
      nodes {
        id
        date
        uri
        title
      }
    }
    allWpCategory {
      nodes {
        id
        name
        uri
      }
    }
    allWpProduct {
      nodes {
        date
        id
        title
        uri
      }
    }
  }
`;
