import React, { useState } from "react";
import { graphql } from "gatsby";
import Seo from "gatsby-plugin-wpgraphql-seo";
// ******** Components ********
import Layout from "../components/Layout";
import HeroSection from "../components/heroSection";
import { customSchema } from "../components/shared/customSchema";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import MaskedInput from "react-text-mask";
import axios from "axios";
import { states } from "../config/states";
import lock from "../assets/svg/lock.svg";

const ContactUsPage = ({ data, location }) => {
  const { contactPage } = data;
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    iam: Yup.string().required("Required"),
    full_name: Yup.string().required("Required"),
    email: Yup.string().email().required("Required"),
    phone: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    message: Yup.string().required("Required"),
  });

  const handleSubmit = async (values, actions) => {
    console.log("values", values);
    setIsLoading(true);
    const preparedData = {
      iam: values.iam,
      email: values.email,
      full_name: values.full_name,
      message: values.message,
      phone: values.phone,
      country: values.country,
    };
    // send a POST request
    await axios({
      method: "post",
      url: `${process.env.GATSBY_ROUTER_LOG}/contact`,
      data: preparedData,
      headers: {
        "content-type": "application/json",
        "x-api-key": process.env.GATSBY_ROUTER_LOG_KEY,
      },
    })
      .then(function (response) {
        console.log("RESPONSE", response);
        setIsLoading(false);
        actions.resetForm({
          values: {
            iam: "",
            email: "",
            full_name: "",
            message: "",
            phone: "",
            country: "",
          },
        });
        return response;
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
        return error;
      });
  };

  return (
    <Layout location={location}>
      <Seo
        post={contactPage}
        postSchema={customSchema(contactPage.seo.schema.raw)}
      />
      <div className="contact-us">
        <HeroSection
          image={contactPage?.featuredImage}
          title={contactPage?.title}
          subtitle={contactPage?.contactUs?.headerContent}
          overlay
        />
        <section className="page-content-section contact-us">
          <div className="custom-container">
            <div className="form-field">
              <Formik
                initialValues={{
                  iam: "",
                  full_name: "",
                  email: "",
                  phone: "",
                  country: "",
                  message: "",
                }}
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={(values, actions) => {
                  handleSubmit(values, actions);
                }}
              >
                {({
                  errors,
                  touched,
                  values,
                  handleChange,
                  setValues,
                  setFieldValue,
                  resetForm,
                }) => (
                  <Form>
                    <h3>Get in touch with us!</h3>
                    <div className="form">
                      <div
                        className={
                          errors.iam && touched.iam
                            ? "field has-error"
                            : "field"
                        }
                      >
                        <label htmlFor="iam">I am a:</label>
                        <Field
                          as="select"
                          name="iam"
                          className="select-placeholder"
                        >
                          <option value="">Choose</option>
                          <option value="customer">Customer</option>
                          <option value="agent">Agent</option>
                        </Field>
                      </div>

                      <div
                        className={
                          errors.full_name && touched.full_name
                            ? "field has-error"
                            : "field"
                        }
                      >
                        <label htmlFor="full_name">First and Last Name</label>
                        <Field
                          placeholder="First and Last Name"
                          name="full_name"
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

                      <div
                        className={
                          errors.phone && touched.phone
                            ? "field has-error"
                            : "field"
                        }
                      >
                        <label htmlFor="phone">Phone number</label>
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
                          errors.country && touched.country
                            ? "field has-error"
                            : "field"
                        }
                      >
                        <label htmlFor="country">State:</label>
                        <Field
                          as="select"
                          name="country"
                          className="select-placeholder"
                        >
                          <option value="">State</option>
                          {states.map((st) => (
                            <option value={st.value} key={st.value}>
                              {st.label}
                            </option>
                          ))}
                        </Field>
                      </div>

                      <div
                        className={
                          errors.message && touched.message
                            ? "field has-error"
                            : "field"
                        }
                      >
                        <label htmlFor="message">Message</label>
                        <Field
                          className="textarea"
                          placeholder="What are your comments?"
                          name="message"
                          as="textarea"
                        />
                      </div>

                      <div className="form-buttons">
                        <button
                          type="submit"
                          className={
                            isLoading ? "submit button is-loading" : "submit"
                          }
                        >
                          Send Message
                        </button>
                      </div>
                      <div className="field">
                        <p className="secure">
                          <img src={lock} alt="lock" />
                          This is a secure form.
                        </p>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query contactPage($id: String!) {
    contactPage: wpPage(id: { eq: $id }) {
      title
      uri
      content
      databaseId
      contactUs {
        fieldGroupName
        headerContent
        hoursOfOperationContent
      }
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              # gatsbyImageData(layout: FIXED, quality: 90, height: 360, width: 1920, transformOptions: { trim: 5.3, cropFocus: NORTHEAST, fit: COVER })
              gatsbyImageData(
                layout: FIXED
                quality: 90
                height: 210
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
            ...ProductHeroMobileImage
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
  }
`;

export default ContactUsPage;
