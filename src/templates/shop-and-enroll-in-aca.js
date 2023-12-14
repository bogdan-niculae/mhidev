import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { StaticImage } from "gatsby-plugin-image";
import * as Yup from "yup";
import { format, isAfter, isValid, parse } from "date-fns";
import { useWebsiteData } from "../context/AppContext";
import Seo from "gatsby-plugin-wpgraphql-seo";

// components
import Layout from "../components/Layout";
import BirthDateField from "../components/acaForm/BirthDateField";
import HouseholdIncomeField from "../components/acaForm/HouseholdIncomeField";
import HouseholdSizeField from "../components/acaForm/HouseholdSizeField";
import RelationshipGroupFields from "../components/acaForm/RelationshipGroupFields";
import TobaccoField from "../components/acaForm/TobaccoField";
import ZipCodeField from "../components/acaForm/ZipCodeField";
import EffectiveDate from "../components/acaForm/EffectiveDate";
import SexField from "../components/acaForm/SexField";
import RemoveFamilyMemberBtn from "../components/acaForm/RemoveFamilyMemberBtn";
import { postToMarket, useProducts } from "../components/form/products";
// assets
import IHC_logo from "../assets/images/IHCSpecialtyNew.svg";
import BlueSealLogo from "../assets/svg/bbb.svg";
import GreyCloseIcon from "../assets/svg/grey-close.svg";
import AddIcon from "../assets/svg/add-icon.svg";
import Spinner from "../assets/svg/spinner.svg";
import LockIcon from "../assets/svg/lock.svg";
import AmericanRescueIcon from "../assets/images/AmericanRescue_icon.png";
import BeterCoverageIcon from "../assets/images/BeterCoverage_icon.png";
import CoverageIcon from "../assets/images/Coverage_icon.png";
import SituatuinoIcon from "../assets/images/Situatuino_icon.png";

import Box from "../components/acaForm/Box";
import { graphql } from "gatsby";
import { customSchema } from "../components/shared/customSchema";
const setEffectiveDate = () => {
  if (isAfter(new Date(), new Date(2022, 11, 15))) {
    return new Date(2023, 1, 1);
  }
  return new Date(2023, 0, 1);
};
const acaFormValidationSchema = Yup.object().shape({
  // zipCode: Yup.string()
  //   .required("Zip Code is required")
  //   .matches(/^[0-9]+$/, "Must be only digits")
  //   .min(5, "Must be exactly 5 digits")
  //   .max(5, "Must be exactly 5 digits"),
  //   .test("checkZip", "Must be valid USA zip code", async (val) => {
  //     const tempCountry = await checkZip(val);
  //     if (tempCountry) {
  //       return true;
  //     }
  //     return false;
  //   }),
  countyFips: Yup.string().required("County is required"),
  birthDate: Yup.string()
    .required("Date of Birth is required")
    .min(10, "Please enter a valid date")
    .test({
      message: "Please enter a valid date",
      test: (value) => {
        const parsedDate = parse(value, "MM/dd/yyyy", new Date(), {
          locale: "en-029",
        });
        return isValid(parsedDate);
      },
    }),
  gender: Yup.string().required("Please select an option"),
  pregnant: Yup.string().required("Please select an option"),
  isTobaccoUser: Yup.string().required("Please select an option"),
  applyForSubsidy: Yup.boolean(),
  householdSize: Yup.string().when("applyForSubsidy", {
    is: true,
    then: Yup.string().required("Family Size is required"),
  }),
  householdIncome: Yup.string().when("applyForSubsidy", {
    is: true,
    then: Yup.string().required("Annual Household is required"),
  }),
  relationships: Yup.array().of(
    Yup.object().shape({
      birthDate: Yup.string()
        .required("Date of Birth is required")
        .min(10, "Please enter a valid date")
        .test({
          message: "Please enter a valid date",
          test: (value) => {
            const parsedDate = parse(value, "MM/dd/yyyy", new Date(), {
              locale: "en-029",
            });
            return isValid(parsedDate);
          },
        }),
      relationship: Yup.string().required("Please select an option"),
      gender: Yup.string().required("Please select an option"),
      pregnant: Yup.string().required("Please select an option"),
      isTobaccoUser: Yup.string().required("Please select an option"),
    })
  ),
});
const formatDate = (date) => {
  return format(parse(date, "MM/dd/yyyy", new Date()), "yyyy-MM-dd");
};
const ShopAndEnrollInAca = ({ location, data }) => {
  const zipCode = location.state?.zipCode ? location.state?.zipCode : "";
  const {
    allWpProduct: { edges },
    allWpAgent,
    allWpAffinity,
  } = useProducts();

  const {
    state: { tempAgent },
  } = useWebsiteData();
  const [zipState, setZipState] = useState({
    error: true,
    value: "",
    counties: [],
    selectedZip: "",
  });
  const [startDate, setStartDate] = useState(setEffectiveDate());
  const handleDateChange = (date) => {
    setStartDate(date);
  };

  const { shopAcaPage } = data;
  return (
    <Layout
      location={location}
      hideNavigation={true}
      navigationTitle="Enroll in ACA-compliant health coverage with our trusted partners – now through Jan. 15 in most states."
    >
      <Seo
        post={shopAcaPage}
        postSchema={customSchema(shopAcaPage.seo.schema.raw)}
      />
      <section className="home-page-hero-section shop-aca-hero-section">
        <div className="home-page-hero-content-wrapper">
          <div className="custom-container">
            <div className="home-page-hero-content">
              <h1>
                All the plans, all the subsidies. Find the coverage you need in
                minutes!
              </h1>
            </div>
          </div>
        </div>
        <StaticImage
          className="is-hidden-mobile"
          src="../assets/images/shop-aca-hero-desktop.png"
          alt="shop aca plans"
          layout="fixed"
          height={300}
        />
        <StaticImage
          className="is-hidden-tablet"
          src="../assets/images/shop-aca-hero-mobile.png"
          alt="shop aca plans"
          layout="fullWidth"
          aspectRatio={768 / 950}
          // height={400}
        />
        <div className="overlay" />
      </section>
      <section className="shop-aca-section blue-section-gradient">
        <div className="custom-container shop-aca-form-container">
          <div className="shop-aca-page-grid">
            <div className="form-wrapper">
              <Formik
                enableReinitialize={true}
                validationSchema={acaFormValidationSchema}
                initialValues={{
                  applyForSubsidy: true,
                  householdIncome: "",
                  householdSize: 1,
                  showPlans: true,
                  zipCode: zipCode,
                  countyFips: "",
                  product: "Medical",
                  relationship: "Self",
                  birthDate: "",
                  gender: "",
                  isTobaccoUser: "",
                  relationships: [],
                  pregnant: "",
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  // const effectiveDate = await setEffectiveDate();
                  // console.log(effectiveDate);
                  // const effectiveDate = await setEffectiveDate();
                  const {
                    applyForSubsidy,
                    householdIncome,
                    householdSize,
                    showPlans,
                    zipCode,
                    countyFips,
                    product,
                    // relationship,
                    // birthDate,
                    // gender,
                    // isTobaccoUser,
                    // relationships,
                    // pregnant,
                  } = values;
                  const demographics = (formValues) => {
                    const { relationships } = formValues;
                    if (relationships.length > 0) {
                      return [
                        {
                          relationship: formValues.relationship,
                          isTobaccoUser: parseInt(formValues.isTobaccoUser),
                          person: {
                            birthDate: formatDate(formValues.birthDate),
                            gender: formValues.gender,
                            pregnant: formValues.pregnant,
                          },
                        },
                        ...relationships.map((relationshipItem) => {
                          return {
                            relationship: relationshipItem.relationship,
                            isTobaccoUser: parseInt(
                              relationshipItem.isTobaccoUser
                            ),
                            person: {
                              birthDate: formatDate(relationshipItem.birthDate),
                              gender: relationshipItem.gender,
                              pregnant: relationshipItem.pregnant,
                            },
                          };
                        }),
                      ];
                    }
                    return [
                      {
                        relationship: formValues.relationship,
                        isTobaccoUser: parseInt(formValues.isTobaccoUser),
                        person: {
                          birthDate: formatDate(formValues.birthDate),
                          gender: formValues.gender,
                          pregnant: formValues.pregnant,
                        },
                      },
                    ];
                  };

                  const payload = {
                    applyForSubsidy,
                    householdIncome,
                    householdSize,
                    showPlans,
                    zipCode,
                    countyFips,
                    product,
                    effectiveDate: format(startDate, "yyyy-MM-dd"),
                    isTobaccoUser: parseInt(values.isTobaccoUser),
                    demographics: demographics(values),
                  };
                  const formState = btoa(JSON.stringify(payload));
                  // TODO fix inconsistency for naming zipCode
                  // TODO Inconsistency for ACA/OBAMACARE product naming (ACA/OBAMACARE === Medical) on INSX
                  // setting up values for post to market
                  const valuesForPostToMarket = {
                    zip: values.zipCode,
                    state: zipState.selectedZip.state,
                    product: "ACA/OBAMACARE",
                  };
                  await postToMarket(
                    valuesForPostToMarket,
                    edges,
                    location,
                    allWpAgent,
                    allWpAffinity,
                    setSubmitting,
                    tempAgent,
                    formState
                  );
                }}
              >
                {({
                  values,
                  handleChange,
                  handleBlur,
                  setFieldValue,
                  setFieldError,
                  setFieldTouched,
                  isSubmitting,
                }) => (
                  <Form className="shop-aca-form-grid">
                    <div className="grid-col-span-2">
                      <h3>Tell us about who needs coverage.</h3>
                      <EffectiveDate
                        startDate={startDate}
                        handleDateChange={handleDateChange}
                      />
                      <h4>Your Info</h4>
                    </div>
                    <ZipCodeField
                      values={values}
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
                      zipState={zipState}
                      setZipState={setZipState}
                    />
                    <BirthDateField
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                    />
                    <SexField
                      handleChange={handleChange}
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                    <TobaccoField handleChange={handleChange} values={values} />

                    <FieldArray name="relationships">
                      {({ insert, remove, push }) => (
                        <>
                          {values.relationships.length > 0 &&
                            values.relationships.map((relationship, index) => (
                              <>
                                <div className="grid-col-span-2">
                                  {index === 0 ? (
                                    <div className="remove-field-heading-wrapper">
                                      <h3 className="remove-field-heading">
                                        Family information{" "}
                                      </h3>
                                      <div className="remove-field-btn">
                                        <span>Remove</span>
                                        <img
                                          onClick={() => remove(index)}
                                          src={GreyCloseIcon}
                                          alt="close"
                                        />
                                      </div>
                                    </div>
                                  ) : (
                                    <>
                                      <hr />
                                      <RemoveFamilyMemberBtn
                                        handleClick={() => remove(index)}
                                      />
                                    </>
                                  )}
                                </div>
                                <RelationshipGroupFields
                                  handleBlur={handleBlur}
                                  handleChange={handleChange}
                                  index={index}
                                  values={values}
                                  setFieldValue={setFieldValue}
                                />
                              </>
                            ))}
                          <div className="grid-col-span-2">
                            <button
                              onClick={() => {
                                push({
                                  relationship: "",
                                  birthDate: "",
                                  gender: "",
                                  pregnant: "",
                                  isTobaccoUser: "",
                                });
                              }}
                              className="add-btn"
                              type="button"
                            >
                              <img src={AddIcon} alt="Add family member" /> Add
                              family member
                            </button>
                          </div>
                        </>
                      )}
                    </FieldArray>
                    <div className="grid-col-span-2">
                      <p>
                        Help estimate your subsidy savings by providing the
                        following information.
                      </p>
                      <div
                        className="field-checkbox"
                        role="group"
                        aria-labelledby="checkbox-group"
                      >
                        <label>
                          <Field type="checkbox" name="applyForSubsidy" />I want
                          to know if I qualify for savings (premium tax
                          credits).
                        </label>
                      </div>
                    </div>
                    <HouseholdIncomeField />
                    <HouseholdSizeField />
                    <div className="grid-col-span-2 submit-btn-col">
                      <button
                        disabled={isSubmitting}
                        className="submit-btn"
                        type="submit"
                      >
                        {isSubmitting ? (
                          <img src={Spinner} alt="" className="spinner" />
                        ) : (
                          "See plan results"
                        )}
                      </button>
                      <p className="secure">
                        <img src={LockIcon} alt="lock" />
                        Secure Online Enrollment
                      </p>
                    </div>
                    <div className="grid-col-span-2 form-icons-row">
                      <img width="250" src={IHC_logo} alt="IHCSB" />
                      <img
                        width="130"
                        src={BlueSealLogo}
                        alt="Accredited business"
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="check-marks-wrapper">
              <div className="list-wrapper">
                <ul>
                  <li>
                    Compare individual and family plans - and benefits - from
                    major health insurance companies.
                  </li>
                  <li>
                    Learn whether you're eligible for money saving subsidies.
                  </li>
                  <li>Enroll in subsidized coverage during open enrollment!</li>
                  <li>
                    Having trouble finding an affordable plan for your needs?
                    Just call the toll-free number above to discuss your
                    coverage needs with a licensed insurance agent.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="info-section">
        <div className="custom-container">
          <div className="info-box">
            <p>
              Millions of people buy insurance online every year. Online
              insurance enrollments started more than 15 years ago and now
              represent one of the most popular shopping and enrollment methods.
              When you enroll online with IHC Specialty Benefits, you can always
              call IHC for assistance. The phone number will be on the top of
              every page. Proceed with confidence.
            </p>
          </div>
        </div>
      </section>
      <section className="boxes-section">
        <div className="custom-container">
          <h1>Can I shop for an ACA-compliant health plan now?</h1>
          <div className="boxes-grid">
            <Box
              title="I've heard the Inflation Reduction Act can help me."
              icon={AmericanRescueIcon}
            >
              <p>
                If you’re uninsured — or already insured — it’s worth checking
                now to see how marketplace subsidies could deliver coverage that
                is a better match for you and lower premiums. The Inflation
                Reduction Act ensures that enhanced affordability will continue
                to be available.
              </p>
            </Box>
            <Box
              title="I want better coverage for 2023."
              icon={BeterCoverageIcon}
            >
              <p>
                Even if you’re already enrolled in an ACA-compliant health plan,
                you may be able to switch to coverage with better benefits or
                lower plan costs. Learn about picking a health plan to fit your
                needs.
              </p>
            </Box>
            <Box title="Coverage seems unaffordable." icon={CoverageIcon}>
              <p>
                Find out how the American Rescue Plan’s enhanced premium
                subsidies, which have been extended by the Inflation Reduction
                Act, could make your ACA coverage much more affordable than you
                might expect. Some people even qualify for $0 premium plans.
              </p>
            </Box>
            <Box title="My situation is complicated." icon={SituatuinoIcon}>
              <p>
                Discuss your benefit needs, your budget or your changing
                circumstances with an agent licensed in your state. Learn how to
                get health coverage if you’ve recently lost your job.
              </p>
            </Box>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export const query = graphql`
  query shopAcaPage($id: String!) {
    shopAcaPage: wpPage(id: { eq: $id }) {
      ...PageContent
    }
  }
`;

export default ShopAndEnrollInAca;
