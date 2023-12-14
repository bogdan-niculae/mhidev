import React, { useState } from "react";
import BodyImage from "./BodyImage";
import FeaturedMedia from "./FeaturedMedia";
import { Form, Formik, Field } from "formik";
import {
  checkZip,
  findProduct,
  postToMarket,
  useProducts,
} from "../form/products";
import * as Yup from "yup";
import Spinner from "../../assets/svg/spinner.svg";
import { useWebsiteData } from "../../context/AppContext";
import { navigate } from "gatsby";

const ProductHeroSection = ({
  image,
  mobileImage,
  title,
  subtitle,
  location,
  redirect,
}) => {
  const {
    allWpProduct: { edges },
    allWpAgent,
    allWpAffinity,
  } = useProducts();
  const {
    state: { tempAgent },
  } = useWebsiteData();
  console.log("state", tempAgent);
  const [country, setCountry] = useState("");
  const zipValidationSchema = Yup.object().shape({
    zip: Yup.string()
      .required("Required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(5, "Must be exactly 5 digits")
      .max(5, "Must be exactly 5 digits")
      .test("checkZip", "Must be valid USA zip code", async (val) => {
        const tempCountry = await checkZip(val);
        if (tempCountry) {
          setCountry(tempCountry);
          return true;
        }
        return false;
      }),
  });
  const handleSubmit = async (values, setSubmitting) => {
    values.state = country;
    values.product = title;

    // TODO: products file and functions need refactoring
    // TODO: after refactoring we might have better solution for landing page redirect
    const selectedProduct = findProduct(title, edges);
    const vendors = selectedProduct.vendors.vendorsContainer;

    // Flatten all vendors in one dimension array
    const allVendors = vendors.reduce(function (accumulator, currentValue) {
      return [...accumulator, ...currentValue.vendors];
    }, []);

    // Check to see if landing page is selected in wordpress
    const checkLandingPageRedirect = allVendors.filter(
      (vendor) => vendor.state === country && vendor.landingPage
    );

    // if we have landing page navigate to url and pass zipCode in gatsby router state
    if (checkLandingPageRedirect.length > 0) {
      navigate(checkLandingPageRedirect[0].landingPage.uri, {
        state: {
          zipCode: values.zip,
        },
      });
    } else {
      await postToMarket(
        values,
        edges,
        location,
        allWpAgent,
        allWpAffinity,
        setSubmitting,
        tempAgent
      );
    }
  };
  return (
    <>
      <section className="product-hero-section">
        <div className="product-hero-content-wrapper">
          <div className="custom-container">
            <div className="product-hero-content-columns">
              <div className="product-hero-content">
                <h1>{title}</h1>
                <div
                  className="product-hero-subtitle is-hidden-mobile"
                  dangerouslySetInnerHTML={{
                    __html: subtitle,
                  }}
                />
              </div>
              <div className="zip-form is-hidden-touch">
                <span>Get a Free {title} Quote in Minutes!</span>
                <Formik
                  validationSchema={zipValidationSchema}
                  enableReinitialize={true}
                  initialValues={{
                    zip: "",
                  }}
                  onSubmit={async (values, actions) => {
                    // setSubmitting(true);
                    await handleSubmit(values, actions.setSubmitting);
                    // setTimeout(() => {
                    //   setSubmitting(false);
                    // }, 1500);
                  }}
                >
                  {({ errors, touched, handleChange, isSubmitting }) => (
                    <Form>
                      <Field
                        className={errors.zip && touched.zip ? "has-error" : ""}
                        name="zip"
                        id="zip"
                        placeholder="Enter Your ZIP Code"
                        onChange={handleChange}
                      />
                      <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <img src={Spinner} alt="" className="spinner" />
                        ) : (
                          "Get a Free Instant Quote"
                        )}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
        <FeaturedMedia className="is-hidden-mobile" image={image} />
        <BodyImage className="is-hidden-tablet" image={mobileImage} />
        <div className="overlay" />
      </section>
      <section className="zip-form-hero-subtitle is-hidden-desktop">
        <div className="zip-form ">
          <span>Get a Free {title} Quote in Minutes!</span>
          <Formik
            validationSchema={zipValidationSchema}
            enableReinitialize={true}
            initialValues={{
              zip: "",
            }}
            onSubmit={async (values, actions) => {
              // setSubmitting(true);
              await handleSubmit(values, actions.setSubmitting);
            }}
          >
            {({ errors, touched, handleChange, isSubmitting }) => (
              <Form>
                <Field
                  name="zip"
                  id="zip"
                  placeholder="Enter Your ZIP Code"
                  onChange={handleChange}
                />
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <img src={Spinner} alt="" className="spinner" />
                  ) : (
                    "Get a Free Instant Quote"
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <div
          className="is-hidden-tablet subtitle-paragraph"
          dangerouslySetInnerHTML={{
            __html: subtitle,
          }}
        />
      </section>
    </>
  );
};

export default ProductHeroSection;
