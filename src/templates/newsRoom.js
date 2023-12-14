import React, { useState, useEffect } from "react";
import { graphql, navigate } from "gatsby";
import { format } from "date-fns";
import { Formik, Field, Form } from "formik";
import axios from "axios";
// ******** Components ********
import Layout from "../components/Layout";
import HomePageHero from "../components/shared/HomePageHero";
import Seo from "gatsby-plugin-wpgraphql-seo";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import MaskedInput from "react-text-mask";
// ******** Icons ********
import CloseWarningIcon from "../assets/images/home-calculator-warning-close.svg";
import CloseSuccessIcon from "../assets/images/success-close.svg";
import SeeMoreIcon from "../assets/svg/more.svg";
import LockIcon from "../assets/images/lock-icon.svg";
import { customSchema } from "../components/shared/customSchema";

const NewsRoom = ({ data, location }) => {
  SwiperCore.use([Navigation]);
  const { newsroom, allWpNewsLink, allWpNewsCategory } = data;

  const [filters, setFilters] = useState(["press-releases"]);
  const [loadMore, setLoadMore] = useState(5);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    setFilteredPosts([]);
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      filterPostsHandler(filters);
      setLoadMore(5);
    }, 750);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const filterPostsHandler = (categories) => {
    setFilteredPosts(
      allWpNewsLink?.nodes?.filter((item) =>
        categories.includes(item?.newsCategories?.nodes[0]?.slug)
      )
    );
  };

  const handleLoadMore = () => {
    setShowLoader(true);
    setTimeout(() => {
      setLoadMore(loadMore + 3);
      setShowLoader(false);
    }, 750);
  };

  const formatDate = (date) => date && format(new Date(date), "LLLL dd, yyyy.");

  const filterHandler = (categoryName) => {
    const categories = allWpNewsCategory?.nodes?.map((item) => item.slug);
    if (filters.indexOf(categoryName) < 0) {
      setFilters([...filters, categoryName]);
    } else {
      setFilters(filters.filter((item) => item !== categoryName));
    }

    if (categoryName === "all") {
      setFilters([...categories]);
    }
  };

  const handleCloseError = () => {
    setShowSuccessMessage(false);
    setShowErrorMessage(false);
  };

  const validate = (values) => {
    const errors = {};

    if (!values.full_name) {
      errors.full_name = "Required";
    }
    if (!values.media_organization) {
      errors.media_organization = "Required";
    }
    if (!values.email) {
      errors.email = "Required";
    }
    if (!values.zip_code) {
      errors.zip_code = "Required";
    }
    return errors;
  };

  const handleSubmit = (values, resetForm) => {
    setIsLoading(true);
    setShowErrorMessage(false);
    setShowSuccessMessage(false);
    const data = {
      full_name: values.full_name,
      media_organization: values.media_organization,
      email: values.email,
      phone: values.phone,
      zip_code: values.zip_code,
      message: values.message,
    };

    axios({
      method: "post",
      url: `${process.env.GATSBY_ROUTER_LOG}/newsroom`,
      data: data,
      headers: {
        "content-type": "application/json",
        "x-api-key": process.env.GATSBY_ROUTER_LOG_KEY,
      },
    })
      .then(function (response) {
        resetForm();
        setShowSuccessMessage(true);
        setIsLoading(false);
        console.log(response);
      })
      .catch(function (error) {
        resetForm();
        setShowErrorMessage(true);
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <Layout location={location}>
      <Seo post={newsroom} postSchema={customSchema(newsroom.seo.schema.raw)} />
      <div className="newsroom">
        <HomePageHero
          image={newsroom?.featuredImage}
          mobileImage={newsroom?.mobileFeaturedImage?.mobileFeaturedImage}
        >
          <h1>{newsroom?.title}</h1>
          <p
            dangerouslySetInnerHTML={{
              __html: newsroom?.content,
            }}
          />
        </HomePageHero>
        <div className="newsroom-content">
          <div className="custom-container">
            <div className="news-section">
              <Swiper
                slidesPerView={"auto"}
                spaceBetween={30}
                className="newsroom-filter-sweeper"
                navigation={true}
              >
                <SwiperSlide>
                  <div
                    className="news-filter-box"
                    onClick={() => filterHandler("all")}
                  >
                    All Articles
                  </div>
                </SwiperSlide>
                {allWpNewsCategory?.nodes?.map((item) => (
                  <SwiperSlide key={item.name}>
                    <div
                      className={`news-filter-box ${item.slug} ${
                        filters.indexOf(item.slug) !== -1 ? "active" : ""
                      }`}
                      onClick={() => filterHandler(item.slug)}
                    >
                      {item.name}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <h2 className="main-title">News and Press releases</h2>
              <div className="articles-wrapper">
                {filteredPosts.map(
                  (post, index) =>
                    index < loadMore && (
                      <div
                        key={post.id}
                        className="article"
                        onClick={() => navigate(post?.newsPress?.newsUrl)}
                      >
                        <div className="article-header">
                          <span className="category">
                            {post?.newsCategories?.nodes[0]?.name}
                          </span>
                          <span className="date">{formatDate(post?.date)}</span>
                        </div>
                        <h2>{post.title}</h2>
                        <div
                          className="post-preview-content"
                          dangerouslySetInnerHTML={{
                            __html: post?.newsPress?.shortDescription,
                          }}
                        />
                      </div>
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
                  loadMore > filteredPosts.length || showLoader
                    ? "is-hidden"
                    : ""
                } `}
                onClick={() => handleLoadMore()}
              >
                See More Articles <img src={SeeMoreIcon} alt="See more posts" />
              </div>
            </div>
            <div className="media-form">
              <div className="newsroom-form">
                <Formik
                  initialValues={{
                    full_name: "",
                    media_organization: "",
                    email: "",
                    phone: "",
                    zip_code: "",
                    message: "",
                  }}
                  validate={validate}
                  onSubmit={(values, { resetForm }) => {
                    handleSubmit(values, resetForm);
                  }}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <h3>Media inquiries</h3>
                      <p>
                        Please fill all fields so we can respond to you quickly.
                      </p>
                      <div
                        className={
                          errors.full_name && touched.full_name
                            ? "field has-error"
                            : "field"
                        }
                      >
                        <label htmlFor="full_name">Full Name</label>
                        <Field placeholder="Full Name" name="full_name" />
                      </div>
                      <div
                        className={
                          errors.media_organization &&
                          touched.media_organization
                            ? "field has-error"
                            : "field"
                        }
                      >
                        <label htmlFor="media_organization">
                          Media ogranization
                        </label>
                        <Field
                          placeholder="Media ogranization"
                          name="media_organization"
                        />
                      </div>
                      <div
                        className={
                          errors.email && touched.email
                            ? "field has-error"
                            : "field"
                        }
                      >
                        <label htmlFor="email">Email address</label>
                        <Field placeholder="Email address" name="email" />
                      </div>

                      <div className="form-box">
                        <div
                          className={
                            errors.phone && touched.phone
                              ? "field has-error"
                              : "field"
                          }
                        >
                          <label htmlFor="phone">Phone number - Optional</label>
                          <Field id="phone" name="phone">
                            {({ field }) => (
                              <MaskedInput
                                {...field}
                                id="zip_code"
                                mask={[
                                  "(",
                                  /[1-9]/,
                                  /\d/,
                                  /\d/,
                                  ")",
                                  " ",
                                  /\d/,
                                  /\d/,
                                  /\d/,
                                  "-",
                                  /\d/,
                                  /\d/,
                                  /\d/,
                                  /\d/,
                                ]}
                                placeholder="(___) ___-____"
                                type="text"
                                guide={false}
                              />
                            )}
                          </Field>
                        </div>
                        <div
                          className={
                            errors.zip_code && touched.zip_code
                              ? "field has-error"
                              : "field"
                          }
                        >
                          <label htmlFor="zip_code">Enter Your Zip Code</label>
                          <Field id="zip_code" name="zip_code">
                            {({ field }) => (
                              <MaskedInput
                                {...field}
                                id="zip_code"
                                mask={[/[0-9]/, /\d/, /\d/, /\d/, /\d/]}
                                placeholder="Enter Your Zip Code"
                                type="text"
                                guide={false}
                              />
                            )}
                          </Field>
                        </div>
                      </div>
                      <div
                        className={
                          errors.message && touched.message
                            ? "field has-error"
                            : "field"
                        }
                      >
                        <label htmlFor="message">Message - Optional</label>
                        <Field as="textarea" name="message" />
                      </div>
                      <button
                        className={isLoading ? "button is-loading" : "button"}
                        disabled={isLoading}
                        type="submit"
                      >
                        Send Message
                      </button>
                      {showSuccessMessage && !showErrorMessage && (
                        <div className="success-message">
                          <p>Your message was successfully sent! Thank you.</p>
                          <img
                            src={CloseSuccessIcon}
                            alt="close icon"
                            onClick={handleCloseError}
                          />
                        </div>
                      )}

                      {showErrorMessage && !showSuccessMessage && (
                        <div className="warning-message">
                          <p>
                            Something went wrong, your message is not send
                            please try again.
                          </p>
                          <img
                            src={CloseWarningIcon}
                            alt="close icon"
                            onClick={handleCloseError}
                          />
                        </div>
                      )}
                      <div className="disclaimer">
                        <div>
                          <img src={LockIcon} alt="lock icon" />
                          <small>This is a secure form.</small>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query newsRoomPage($id: String!) {
    newsroom: wpPage(id: { eq: $id }) {
      ...PageContent
    }
    allWpNewsLink {
      nodes {
        date
        id
        link
        uri
        title
        newsCategories {
          nodes {
            id
            name
            slug
          }
        }
        newsPress {
          newsUrl
          shortDescription
        }
      }
    }
    allWpNewsCategory {
      nodes {
        name
        id
        slug
      }
    }
  }
`;

export default NewsRoom;
