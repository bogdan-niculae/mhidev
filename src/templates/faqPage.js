import React, { useState, useEffect } from "react";
import { graphql, Link, navigate } from "gatsby";
import { format } from "date-fns";
import Seo from "gatsby-plugin-wpgraphql-seo";
// ******** Components ********
import Layout from "../components/Layout";
import HeroSection from "../components/heroSection";
// ******** Images ********
import SeeMoreIcon from "../assets/svg/more.svg";
import { customSchema } from "../components/shared/customSchema";

const Faq = ({ data, location }) => {
  const [allData, setAllData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loadMore, setLoadMore] = useState(8);
  const [searchData, setSearchData] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const { faqPage, allWpFaq } = data;

  useEffect(() => {
    if (allWpFaq?.nodes.length > 0) {
      setAllData([...allWpFaq?.nodes]);
    }
  }, [allWpFaq]);

  useEffect(() => {
    if (allData?.length > 0) {
      setShowLoader(true);
      setSearchData([]);
      setTimeout(() => {
        setShowLoader(false);
        setLoadMore(8);
      }, 750);
      setSearchData([...allData]);
    }
  }, [allData]);

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const formatDate = (date) => date && format(new Date(date), "LLLL dd, yyyy");

  const renderSearchResults = () => {
    if (searchData?.length > 0) {
      return searchData.map(
        (data, index) =>
          index < loadMore && (
            <div className="result" key={data.id}>
              <div className="header">
                <div className="type">{data.nodeType}</div>
                <div className="date">{formatDate(data.date)}</div>
              </div>
              <h2 onClick={() => navigate(data.uri)}>{data.title}</h2>
              {data?.excerpt && (
                <p
                  dangerouslySetInnerHTML={{
                    __html: data?.excerpt,
                  }}
                ></p>
              )}
              <Link to={data.uri}>
                See More <img src={SeeMoreIcon} alt="See more" />
              </Link>
            </div>
          )
      );
    } else {
      return null;
    }
  };

  const handleLoadMore = () => {
    setShowLoader(true);
    setTimeout(() => {
      setLoadMore(loadMore + 9);
      setShowLoader(false);
    }, 750);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (searchValue) {
      setSearchLoading(true);
      setTimeout(() => {
        let data = [...allData];
        let results = data.filter((item) => {
          return (
            item.title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
          );
        });
        setSearchData(results);
        setSearchLoading(false);
      }, 750);
    } else {
      setSearchLoading(true);
      setTimeout(() => {
        setSearchData([...allData]);
        setSearchLoading(false);
      }, 750);
    }
  };

  return (
    <Layout location={location}>
      <Seo post={faqPage} postSchema={customSchema(faqPage.seo.schema.raw)} />
      <div className="search-page">
        <HeroSection
          image={faqPage?.featuredImage}
          title={faqPage?.title}
          overlay
        />
        <div className="search-section">
          <div className="custom-container">
            <div className="search-field-container">
              <div className="search-field">
                <label>Search</label>
                <input onChange={handleChange} onKeyDown={handleKeyDown} />
                <button onClick={handleSearch}>
                  {searchLoading ? "Searching..." : "Search"}
                </button>
              </div>
              <p>
                There {searchData && searchData?.length > 1 ? "are" : "is"}{" "}
                <span>
                  {searchData ? searchData?.length : 0}{" "}
                  {searchData && searchData?.length > 1 ? "results" : "result"}
                </span>{" "}
                in your search.
              </p>
            </div>
          </div>
        </div>
        <div className={searchData.length > 0 ? "search-results" : "is-hidden"}>
          {renderSearchResults()}
        </div>
        {showLoader && (
          <div className="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
        <div
          className={`see-more ${
            loadMore > searchData.length || showLoader ? "is-hidden" : ""
          } `}
          onClick={handleLoadMore}
        >
          <span>See More Results</span>
          <img src={SeeMoreIcon} alt="See all Articles" />
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query faq($id: String!) {
    faqPage: wpPage(id: { eq: $id }) {
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
    allWpFaq {
      nodes {
        id
        date
        uri
        title
        nodeType
      }
    }
  }
`;

export default Faq;
