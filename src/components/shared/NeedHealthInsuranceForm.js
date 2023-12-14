import React, { useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import Icon from "../../assets/svg/cover.svg";
import * as Yup from "yup";
import { checkZip, postToMarket, useProducts } from "../form/products";
import Spinner from "../../assets/svg/spinner.svg";
import { useWebsiteData } from "../../context/AppContext";
import { navigate } from "gatsby";

const NeedHealthInsuranceForm = ({
  title,
  subtitle,
  selectedProducts,
  hideList,
  location,
}) => {
  const {
    allWpProduct: { edges },
    allWpAgent,
    allWpAffinity,
  } = useProducts();
  // eslint-disable-next-line no-unused-vars
  const { dispatch, state } = useWebsiteData();
  const [country, setCountry] = useState("");
  const [products, setProducts] = useState([]);
  const [disable, setDisable] = useState(true);

  const getProducts = () => {
    if (country) {
      edges.forEach((data) => {
        data.node.vendors.vendorsContainer.map((vendor) => {
          vendor.vendors.forEach((ven) => {
            if (ven.state === country && !products.includes(data.node.title)) {
              setProducts([...products, data.node.title]);
            }
          });
        });
      });
    }
  };

  // yup validation
  const productValidationSchema = Yup.object().shape({
    zipCode: Yup.string()
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
    prodSelect: Yup.string().required("Required"),
  });
  // reset formik product field
  const validateZip = (setFieldValue, values) => {
    if (values.zipCode?.length !== 5 && values.prodSelect) {
      setFieldValue("prodSelect", "");
    }
  };

  const getClassName = (errors, values, touched) => {
    if (values.prodSelect) {
      return "";
    } else {
      if (errors.prodSelect && touched.prodSelect) {
        return "select-placeholder has-error";
      } else {
        return "select-placeholder";
      }
    }
  };

  const handleSubmit = async (values, setSubmitting) => {
    const { prodSelect } = values;

    if (prodSelect === "Medicare") {
      navigate("/health-insurance-plans/medicare/");
    }

    if (prodSelect === "Vision Insurance") {
      navigate("/health-insurance-plans/vision-insurance/");
    }
    let val = {};
    val.state = country;
    val.zip = values.zipCode;
    val.product = values.prodSelect;
    await postToMarket(
      val,
      edges,
      location,
      allWpAgent,
      allWpAffinity,
      setSubmitting
    ).then((r) => !!r);
  };

  useEffect(() => {
    country && getProducts();
    products.length > 0 && country ? setDisable(false) : setDisable(true);
  }, [products, getProducts]);

  return (
    <section className="need-health-insurance-section">
      <div className="container is-widescreen">
        <div className="need-health-insurance-wrapper">
          <h2>{title ? title : "Need Health Insurance?"}</h2>
          <span className="need-health-insurance-subheading">
            {subtitle ? subtitle : "Shop + Compare in 3 Easy Steps"}
          </span>
          <div
            className={`need-health-insurance-list ${
              hideList ? "is-hidden" : ""
            }`}
          >
            <div className="need-health-insurance-list-item">
              <img src={Icon} alt="Find Available Products" /> Find Available
              Products
            </div>
            <div className="need-health-insurance-list-item">
              <img src={Icon} alt="Quote + Compare Plans" /> Quote + Compare
              Plans
            </div>
            <div className="need-health-insurance-list-item">
              <img src={Icon} alt="Apply Online if You Qualify" /> Apply Online
              if You Qualify
            </div>
          </div>
          <Formik
            validationSchema={productValidationSchema}
            enableReinitialize={true}
            initialValues={{
              zipCode: "",
              prodSelect: "",
            }}
            onSubmit={async (values, actions) => {
              // setSubmitting(true);
              await handleSubmit(values, actions.setSubmitting);
              // setTimeout(() => {
              //   setSubmitting(false);
              // }, 1500);
            }}
          >
            {({
              errors,
              touched,
              handleChange,
              values,
              setFieldValue,
              isSubmitting,
            }) => (
              <Form className="need-health-insurance-form">
                <div className="field-wrapper">
                  <label htmlFor="zipCode">Enter Your Zip Code</label>
                  <Field
                    className={
                      errors.zipCode && touched.zipCode ? "has-error" : ""
                    }
                    id="zipCode"
                    name="zipCode"
                    placeholder="Enter Your ZIP Code"
                    onChange={handleChange}
                    validate={validateZip(setFieldValue, values)}
                  />
                </div>
                <div className="field-wrapper">
                  <label htmlFor="prodSelect">Select a Product</label>
                  <Field
                    className={getClassName(errors, values, touched)}
                    as="select"
                    id="prodSelect"
                    name="prodSelect"
                    disabled={disable && "disabled"}
                  >
                    <option value="" hidden="">
                      Select a Product...
                    </option>

                    {selectedProducts
                      ? selectedProducts.map((item) => (
                          <option
                            key={item.products.productName}
                            value={item.products.productName}
                          >
                            {item.products.productName}
                          </option>
                        ))
                      : state?.availableProducts.map((item) => (
                          <option
                            key={item.products.productName}
                            value={item.products.productName}
                          >
                            {item.products.productName}
                          </option>
                        ))}
                  </Field>
                </div>
                <div className="field-wrapper">
                  <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <img src={Spinner} alt="" className="spinner" />
                    ) : (
                      "Begin Your Quote"
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default NeedHealthInsuranceForm;
