import React, { useState, useEffect } from "react";
import { graphql, Link, navigate } from "gatsby";
import { format } from "date-fns";
import Seo from "gatsby-plugin-wpgraphql-seo";
// ******** Components ********
import Layout from "../components/Layout";
import HeroSection from "../components/heroSection";
import { customSchema } from "../components/shared/customSchema";
// ******** Images ********
import SeeMoreIcon from "../assets/svg/more.svg";

const Search = ({ data, location }) => {
  const [allData, setAllData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loadMore, setLoadMore] = useState(8);
  const [searchData, setSearchData] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const { searchPage, allWpFaq, allWpPage, allWpPost, allWpTerm } = data;

  useEffect(() => {
    if (
      allWpFaq?.nodes.length > 0 &&
      allWpPage?.nodes.length > 0 &&
      allWpPost?.nodes.length > 0 &&
      allWpTerm?.nodes.length > 0
    ) {
      setAllData([
        ...allWpPost?.nodes,
        ...allWpFaq?.nodes,
        ...allWpPage?.nodes,
        ...allWpTerm?.nodes,
      ]);
    }
  }, [allWpFaq, allWpPage, allWpPost, allWpTerm]);

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
              {/* {console.log(data)}
              {data?.seo && (
                <p
                  dangerouslySetInnerHTML={{
                    __html: data?.seo.metaDesc,
                  }}
                ></p>
              )} */}
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
      <Seo
        post={searchPage}
        postSchema={customSchema(searchPage.seo.schema.raw)}
      />
      <div className="search-page">
        <HeroSection
          image={searchPage?.featuredImage}
          title={searchPage?.title}
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
  query search($id: String!) {
    searchPage: wpPage(id: { eq: $id }) {
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
    allWpPost(
      filter: { status: { eq: "publish" }, production: { ne: "hidden" } }
    ) {
      nodes {
        id
        date
        title
        uri
        nodeType
        excerpt
        seo {
          metaDesc
        }
      }
    }
    allWpTerm {
      nodes {
        id
        date
        title
        uri
        nodeType
        excerpt
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
    allWpPage {
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

export default Search;
