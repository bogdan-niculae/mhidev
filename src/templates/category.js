import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
// import FeaturedMedia from "../components/shared/FeaturedMedia";
import PostPreview from "../components/PostPreview";
import SeeMoreIcon from "../assets/svg/more.svg";
import HeroSection from "../components/heroSection";
import SpeakWithAgent from "../components/speakWithAgent";
import Seo from "gatsby-plugin-wpgraphql-seo";
import { customSchema } from "../components/shared/customSchema";

// import { customSchema } from "../components/shared/customSchema";

const Category = (props) => {
  const {
    data: {
      wpCategory: { posts, name },
      wpPage: { featuredImage: desktopFeaturedImage },
    },
    location,
  } = props;
  console.log(posts);
  const [loadMore, setLoadMore] = useState(8);
  // const [filteredPosts, setFilteredPosts] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    // setFilteredPosts([]);
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      // filterPostsHandler(filters);
      setLoadMore(8);
    }, 750);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMore = () => {
    setShowLoader(true);
    setTimeout(() => {
      setLoadMore(loadMore + 9);
      setShowLoader(false);
    }, 750);
  };

  return (
    <Layout location={location}>
      <Seo
        post={props.data.wpCategory}
        postSchema={customSchema(props.data.wpCategory.seo.schema.raw)}
      />
      <HeroSection image={desktopFeaturedImage} title={name || ""} overlay />
      <div className="blog-page">
        <section className="posts-list-section">
          <div className="container is-widescreen">
            <div className="posts-wrapper">
              {posts.nodes.map(
                (post, index) =>
                  index < loadMore && (
                    <PostPreview
                      key={index}
                      post={post}
                      // isLast={index === nodes.length - 1}
                    />
                  )
              )}
            </div>
            {showLoader && (
              <div className="lds-facebook">
                <div></div>
                <div></div>
                <div></div>
              </div>
            )}

            <div
              className={`see-more-btn ${
                loadMore > posts.nodes.length || showLoader ? "is-hidden" : ""
              } `}
              onClick={() => handleLoadMore()}
            >
              See More Articles <img src={SeeMoreIcon} alt="See more posts" />
            </div>
          </div>
        </section>
      </div>
      <SpeakWithAgent />
    </Layout>
  );
};

export const query = graphql`
  query CategoryPage($id: String!) {
    wpCategory(id: { eq: $id }) {
      id
      name
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
          raw
        }
      }
      posts {
        nodes {
          ...PostPreviewContent
        }
      }
    }
    wpPage(isPostsPage: { eq: true }) {
      ...PageContent
    }
  }
`;

export default Category;
