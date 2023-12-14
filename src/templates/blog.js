import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
// import FeaturedMedia from "../components/shared/FeaturedMedia";
import PostPreview from "../components/PostPreview";
import SeeMoreIcon from "../assets/svg/more.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import HeroSection from "../components/heroSection";
import SpeakWithAgent from "../components/speakWithAgent";
import Seo from "gatsby-plugin-wpgraphql-seo";
import { customSchema } from "../components/shared/customSchema";

import "swiper/css";
import "swiper/css/navigation";

const Blog = (props) => {
  SwiperCore.use([Navigation]);
  const {
    data: {
      allWpPost: { nodes },
      allWpCategory: { nodes: categoryNodes },
      wpPage: { featuredImage: desktopFeaturedImage },
    },
    location,
  } = props;
  const [filters, setFilters] = useState("news");
  const [loadMore, setLoadMore] = useState(8);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    setFilteredPosts([]);
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      filterPostsHandler(filters);
      setLoadMore(8);
    }, 750);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleLoadMore = () => {
    setShowLoader(true);
    setTimeout(() => {
      setLoadMore(loadMore + 9);
      setShowLoader(false);
    }, 750);
  };

  const filterPostsHandler = (categories) => {
    setFilteredPosts(
      nodes.filter((item) => categories.includes(item.categories.nodes[0].slug))
    );
  };

  const categories = categoryNodes.map((item) => item.slug);

  return (
    <Layout location={location}>
      <Seo
        post={props.data.wpPage}
        postSchema={customSchema(props.data.wpPage.seo.schema.raw)}
      />
      <HeroSection
        image={desktopFeaturedImage}
        title="Health insurance articles"
        overlay
      />
      <div className="blog-page">
        {/* <section className="blog-intro-text-section">
          <div className="container is-widescreen">
            <h2>Read more interesting news</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sem
              orci, viverra sed nibh aliquet, pharetra accumsan dui. Mauris
              gravida turpis turpis, eu egestas leo tempus vitae. Curabitur
              lorem felis, consectetur vel ultrices a, fringilla in erat.
            </p>
          </div>
        </section> */}

        <section className="posts-list-section">
          <div className="container is-widescreen">
            <Swiper
              slidesPerView={"auto"}
              spaceBetween={30}
              className="post-filter-sweeper"
              navigation={true}
            >
              <SwiperSlide>
                <div
                  className="filter-box"
                  onClick={() => setFilters(categories)}
                >
                  All Articles
                </div>
              </SwiperSlide>
              {categoryNodes.map((item) => (
                <SwiperSlide key={item.name}>
                  <div
                    className={`filter-box ${item.slug} ${
                      filters.indexOf(item.slug) !== -1 ? "active" : ""
                    }`}
                    onClick={() => setFilters(item.slug)}
                  >
                    {item.name}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="posts-wrapper">
              {filteredPosts.map(
                (post, index) =>
                  index < loadMore && (
                    <PostPreview
                      key={index}
                      post={post}
                      isLast={index === nodes.length - 1}
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
                loadMore > filteredPosts.length || showLoader ? "is-hidden" : ""
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
  query BlogPage {
    wpPage(isPostsPage: { eq: true }) {
      ...PageContent
    }
    mobileImage: wpPage(isPostsPage: { eq: true }) {
      featuredImage {
        node {
          altText
          localFile {
            ...HeroImagePageMobile
            publicURL
          }
          mediaDetails {
            width
            height
          }
        }
      }
    }
    allWpPost(
      sort: { fields: date, order: DESC }
      filter: { status: { eq: "publish" }, production: { ne: "hidden" } }
    ) {
      nodes {
        ...PostPreviewContent
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        currentPage
        pageCount
      }
      totalCount
    }
    allWpCategory {
      nodes {
        slug
        name
      }
    }
  }
`;

export default Blog;
