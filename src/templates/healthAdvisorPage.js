import React, { useState } from "react";
import { graphql } from "gatsby";
import Seo from "gatsby-plugin-wpgraphql-seo";
import axios from "axios";
// ******** Components ********
import Layout from "../components/Layout";
import { Formik, Field, Form } from "formik";
import MaskedInput from "react-text-mask";
import HomePageHero from "../components/shared/HomePageHero";
// ******** Icons ********
import LockIcon from "../assets/images/lock-icon.svg";
import CloseWarningIcon from "../assets/images/home-calculator-warning-close.svg";
import CloseSuccessIcon from "../assets/images/success-close.svg";
import { customSchema } from "../components/shared/customSchema";

const HealthAdvisorPage = ({ data, location }) => {
  const { healthAdvisorPage } = data;
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const validate = (values) => {
    const errors = {};

    if (!values.first_name) {
      errors.first_name = "Required";
    }
    if (!values.last_name) {
      errors.last_name = "Required";
    }
    if (!values.email) {
      errors.email = "Required";
    }
    if (!values.zip_code) {
      errors.zip_code = "Required";
    }
    if (!values.message) {
      errors.message = "Required";
    }
    return errors;
  };

  const handleCloseError = () => {
    setShowSuccessMessage(false);
    setShowErrorMessage(false);
  };

  const handleSubmit = (values, resetForm) => {
    setIsLoading(true);
    setShowErrorMessage(false);
    setShowSuccessMessage(false);
    const data = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      phone: values.phone,
      zip_code: values.zip_code,
      message: values.message,
    };

    axios({
      method: "post",
      url: `${process.env.GATSBY_ROUTER_LOG}/contact`,
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
      <Seo
        post={healthAdvisorPage}
        postSchema={customSchema(healthAdvisorPage.seo.schema.raw)}
      />
      <div className="health-advisor">
        <HomePageHero
          image={healthAdvisorPage?.featuredImage}
          mobileImage={
            healthAdvisorPage?.mobileFeaturedImage?.mobileFeaturedImage
          }
        >
          <h1>{healthAdvisorPage?.title}</h1>
        </HomePageHero>
        <div className="health-advisor-form">
          <Formik
            initialValues={{
              first_name: "",
              last_name: "",
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
                <h3>Speak to a Licensed Agent</h3>
                <div
                  className={
                    errors.first_name && touched.first_name
                      ? "field has-error"
                      : "field"
                  }
                >
                  <label htmlFor="first_name">First Name</label>
                  <Field placeholder="First Name" name="first_name" />
                </div>
                <div
                  className={
                    errors.last_name && touched.last_name
                      ? "field has-error"
                      : "field"
                  }
                >
                  <label htmlFor="last_name">Last Name</label>
                  <Field placeholder="Last Name" name="last_name" />
                </div>
                <div
                  className={
                    errors.email && touched.email ? "field has-error" : "field"
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
                  <label htmlFor="message">Message</label>
                  <Field as="textarea" name="message" />
                </div>
                <button
                  type="submit"
                  className={isLoading ? "button is-loading" : "button"}
                  disabled={isLoading}
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
                      Something went wrong, your message is not send please try
                      again.
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
    </Layout>
  );
};

export const query = graphql`
  query healthAdvisorPage($id: String!) {
    healthAdvisorPage: wpPage(id: { eq: $id }) {
      ...PageContent
    }
  }
`;

export default HealthAdvisorPage;
