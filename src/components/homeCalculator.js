import React, { useState, useEffect, useRef } from "react";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { format, addYears } from "date-fns";
import axios from "axios";
// ******** Components ********
import { Formik, Field, Form, ErrorMessage } from "formik";
import ZipField from "../components/form/zip";
// ******** Images ********
import CloseWarningIcon from "../assets/images/home-calculator-warning-close.svg";
import { postToMarket, useProducts } from "./form/products";
import { Link } from "gatsby";

const API =
  "https://p1mjhxx5fg.execute-api.us-east-1.amazonaws.com/dev/api/v1/households/eligibility/estimates";

const HomeCalculator = ({ calculatorRef, location }) => {
  const {
    allWpProduct: { edges },
    allWpAgent,
    allWpAffinity,
  } = useProducts();
  const resultsRef = useRef(null);
  const [currentYear, setCurrentYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    year: "",
    zip_code: "",
    county: "",
    income: "",
    household: "",
    people_coverage: "",
    applicants: [],
  });
  const [results, setResults] = useState(null);
  const [zipData, setZipData] = useState(null);
  const [counties, setCounties] = useState(null);
  const [error, setError] = useState("");
  const [household] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
  const [peopleCoverage, setPeopleCoverage] = useState([]);
  const age = Array.from(Array(65).keys());

  useEffect(() => {
    let month = format(new Date(), "MMMM");
    if (month === "November") {
      let year = format(addYears(new Date(), 1), "yyyy");
      setCurrentYear(year);
      setData({
        ...data,
        year,
      });
    } else {
      setCurrentYear(new Date().getFullYear());
      setData({
        ...data,
        year: new Date().getFullYear(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validationSchema = Yup.object().shape({
    year: Yup.string().required("Required"),
    zip_code: Yup.string()
      .required("Required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(5, "Must be exactly 5 digits")
      .max(5, "Must be exactly 5 digits"),
    county: Yup.string().required("Required"),
    income: Yup.string()
      .required("Required")
      .matches(/^[0-9]+$/, "Must be only digits"),
    household: Yup.string().required("Required"),
    people_coverage: Yup.string().required("Required"),
    applicants: Yup.array().of(
      Yup.object().shape({
        relationship: Yup.string().required("Required"),
        age: Yup.number()
          .required("Required")
          .when("relationship", {
            is: "Spouse",
            then: Yup.number().min(17, "Must be bigger than 16"),
          }),
      })
    ),
  });

  const validatePeopleCovarage = (totalNumber, values, setValues) => {
    if (
      values.people_coverage !== "" &&
      totalNumber < +values.people_coverage
    ) {
      setValues({
        ...values,
        people_coverage: "",
        applicants: [],
      });
    }
  };

  const handleChangeHousehold = (event, values, setValues) => {
    let avaliablePeopleCoverageOption;
    if (event?.target?.value) {
      let totalNumber = event?.target?.value;
      validatePeopleCovarage(+totalNumber, values, setValues);
      avaliablePeopleCoverageOption = Array.from(
        { length: +totalNumber },
        (_, i) => i + 1
      );
      setPeopleCoverage(avaliablePeopleCoverageOption);
    } else {
      setPeopleCoverage([]);
    }
  };

  const generateEmptyApplicant = (applicants, numberOfApplicants, isNew) => {
    for (let i = 0; i < numberOfApplicants; i++) {
      if (numberOfApplicants > 1) {
        if (i === 0) {
          applicants.push({ age: "", relationship: "Applicant" });
        }
        if (i === 1) {
          applicants.push({ age: "", relationship: "Spouse" });
        }
        if (i > 1) {
          applicants.push({ age: "", relationship: "Dependent" });
        }
      } else {
        applicants.push({ age: "", relationship: "" });
      }
    }
  };

  const handleChangePeopleCoverage = (
    event,
    values,
    setValues,
    handleChange
  ) => {
    let applicants = [];
    const numberOfApplicants = event.target.value || 0;

    let previousNumber = 0;
    if (values?.applicants?.length > 0) {
      previousNumber = +values?.applicants?.length;
    }
    if (previousNumber === 0) {
      generateEmptyApplicant(applicants, numberOfApplicants, false);
    } else if (previousNumber < numberOfApplicants) {
      let allAplicants = [...values.applicants];
      let newApplicantNumber = +numberOfApplicants - +previousNumber;
      let newApplicants = [];

      for (let i = 0; i < newApplicantNumber; i++) {
        if (allAplicants?.length > 1) {
          newApplicants.push({ age: "", relationship: "Dependent" });
        } else if (allAplicants?.length === 1) {
          newApplicants.push({ age: "", relationship: "Spouse" });
        }
      }

      applicants = [...allAplicants, ...newApplicants];
    } else if (previousNumber > numberOfApplicants) {
      let allAplicants = [...values.applicants];
      let reducedNumber = +previousNumber - +numberOfApplicants;
      let newArray = allAplicants.slice(0, -Math.abs(reducedNumber));
      applicants = [...newArray];
    }
    setValues({ ...values, applicants });
    handleChange(event);
  };

  const renderSelectHousehold = () =>
    household.map((opt) => (
      <option key={uuidv4()} value={opt}>
        {opt}
      </option>
    ));

  const renderSelectCounties = () =>
    counties &&
    counties.map((county) => (
      <option key={uuidv4()} value={county.value}>
        {county.value}
      </option>
    ));

  const renderSelectPeopleCoverage = () =>
    peopleCoverage.map((opt) => (
      <option key={uuidv4()} value={opt}>
        {opt}
      </option>
    ));

  const renderApplicantOption = (index, values, setFieldValue) => {
    let applicants = +values.people_coverage;
    if (applicants === 1) {
      return (
        <>
          <option value="Applicant">Applicant</option>
          <option value="Spouse">Spouse</option>
          <option value="Dependent">Dependent</option>
        </>
      );
    } else {
      if (index === 0) {
        return <option value="Applicant">Applicant</option>;
      }
      if (index === 1) {
        return (
          <>
            <option value="Spouse">Spouse</option>
            <option value="Dependent">Dependent</option>
          </>
        );
      }
      if (index > 1) {
        return <option value="Dependent">Dependent</option>;
      }
    }
  };

  const renderApplicants = (values, errors, touched, setFieldValue) => {
    if (values?.applicants?.length > 0) {
      return values.applicants.map((applicant, index) => {
        const applicantErrors =
          (errors.applicants?.length && errors.applicants[index]) || {};
        const applicantTouched =
          (touched.applicants?.length && touched.applicants[index]) || {};
        return (
          <div className="form-box" key={index}>
            <div
              className={
                applicantErrors.age && applicantTouched.age
                  ? "field has-error"
                  : "field"
              }
            >
              <label htmlFor={`applicants.${index}.age`}>Age</label>
              <Field
                as="select"
                name={`applicants.${index}.age`}
                className={applicant.age === "" ? "select-placeholder" : ""}
              >
                <option value="">Choose</option>
                {age &&
                  age.map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
              </Field>
              <ErrorMessage
                name={`applicants.${index}.age`}
                component="div"
                className="error-message"
              />
            </div>
            <div
              className={
                applicantErrors.relationship && applicantTouched.relationship
                  ? "field has-error"
                  : "field"
              }
            >
              <label htmlFor={`applicants.${index}.relationship`}>
                Applicant
              </label>
              <Field
                as="select"
                name={`applicants.${index}.relationship`}
                className={
                  applicant.relationship === "" ? "select-placeholder" : ""
                }
              >
                <option value="">Choose</option>
                {renderApplicantOption(index, values, setFieldValue)}
              </Field>
              <ErrorMessage
                name={`applicants.${index}.relationship`}
                component="div"
                className="error-message"
              />
            </div>
          </div>
        );
      });
    }
  };

  const handleCloseError = () => {
    setError("");
  };

  const renderResultMessage = (result) => {
    if (result.is_medicaid_chip) {
      return "May be eligible for Medicaid and/or CHIP in their state.";
    }
    if (!result.is_medicaid_chip && result.aptc === null) {
      return "Likely not eligible for Premium Subsidy. May still be eligible to purchase a plan on the Federal Marketplace";
    }
    if (!result.is_medicaid_chip && result.aptc) {
      return "May be eligible for a Premium Subsidy";
    }
  };

  const renderResults = (resetForm, values, setSubmitting) => {
    if (results?.length > 0) {
      let totalEstimation = results[0]?.aptc;
      return (
        <div className="form-results">
          <h3>Estimated results:</h3>
          {results.map((result) => (
            <div className="result" key={uuidv4()}>
              <p>Applicant age {result?.age}:</p>
              <span>{renderResultMessage(result)}</span>
            </div>
          ))}
          <div className="result">
            <p>Total Estimated Premium Subsidy:</p>
            <span>${totalEstimation}</span>
          </div>
          <div className="result-buttons">
            <button
              type="reset"
              className="is-outlined recalculate-btn"
              onClick={() => {
                if (calculatorRef?.current) {
                  calculatorRef?.current?.scrollIntoView({
                    behavior: "smooth",
                  });
                }
                setResults(null);
                setZipData(null);
                setCounties(null);
                setPeopleCoverage([]);
                resetForm();
              }}
            >
              Recalculate
            </button>
            <button
              className="shop-aca-plan-btn"
              onClick={() => {
                console.log("CLICK SHOP ACA", values.zip_code);
                postToMarket(
                  values,
                  edges,
                  location,
                  allWpAgent,
                  allWpAffinity,
                  setSubmitting
                );
              }}
            >
              Shop ACA Plans
            </button>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  const handleSubmit = (values) => {
    setIsLoading(true);
    let people = values.applicants;
    let fullNameCounty = `${values.county} County`;

    let zipInformation = zipData?.counties?.find(
      (data) => data.name === fullNameCounty
    );

    let totalPeople = people?.length;
    let missingPeople = +values.household - +totalPeople;

    let hasSpouse = false;
    if (totalPeople > 0) {
      let person = people.find((person) => person.name === "Spouse");
      hasSpouse = person ? true : false;
    }

    let allAplicants = [];
    values.applicants?.forEach((person) => {
      allAplicants.push({
        age: +person.age,
        relationship: person.relationship,
      });
    });

    if (missingPeople > 0) {
      Array.from(Array(missingPeople).keys()).forEach((person) => {
        allAplicants.push({
          age: 21,
          relationship: "Dependent",
        });
      });
    }

    let body = {
      household: {
        has_married_couple: hasSpouse,
        income: +values?.income,
        people: [...allAplicants],
      },
      place: {
        countyfips: zipInformation.fips,
        state: zipInformation.state,
        zipcode: zipInformation.zipcode,
      },
      year: values.year,
    };

    values.product = "ACA/OBAMACARE";
    values.state = zipInformation.state;
    values.zip = zipInformation.zipcode;

    axios
      .post(
        `${API}?apikey=W8ggW7iihNgn5sEIX330eDvfJW8ajBia&year=${values.year}`,
        body
      )
      .then((response) => {
        setError("");
        let data = response?.data?.estimates;
        data.forEach((item, index) => {
          allAplicants.forEach((value, i) => {
            if (index === i) {
              item.age = value.age;
            }
          });
        });
        resultsRef?.current?.scrollIntoView({ behavior: "smooth" });
        setResults(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response.status === 404) {
          resultsRef?.current?.scrollIntoView({ behavior: "smooth" });
          setError(
            "The information you entered is for a state not included in the FFM. No APTC estimate is available."
          );
        } else {
          resultsRef?.current?.scrollIntoView({ behavior: "smooth" });
          if (
            error.response.data.message ===
            "state is not a valid marketplace state"
          ) {
            setError("Subsidy data not available for your state.");
          } else {
            setError(error.response.data.message);
          }
        }
      });
  };

  return (
    <div className={results ? "home-calculator results" : "home-calculator"}>
      <div className="custom-container home-page">
        <div className="home-calculator-content">
          <div className="home-calculator-text">
            <h3>Premium Subsidy Estimator</h3>
            <p>
              The Affordable Care Act created Premium Subsidies effective
              January 1, 2014 in an effort to reduce the cost of health
              insurance for individuals purchasing coverage on the new Health
              Insurance Marketplaces (also known as health care exchanges).
            </p>
            <p>
              The subsidy cliff was eliminated in 2021 by the American Rescue
              Plan. This means that even if you didn’t qualify in the past, you
              may now be eligible for premium savings. Persons who have
              affordable health plan coverage available through an employer are
              not eligible for premium savings. To test your employer plan’s
              affordability, please visit our{" "}
              <Link to="/aca-affordability/"> affordability calculator</Link>.
            </p>
          </div>
        </div>
        <div className="form" ref={calculatorRef ? calculatorRef : null}>
          <Formik
            initialValues={data}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={(values) => {
              handleSubmit(values);
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
              setSubmitting,
            }) => (
              <Form>
                <h3>Subsidy Calculator</h3>
                <div className="form-box-four">
                  <div
                    className={
                      errors.year && touched.year ? "field has-error" : "field"
                    }
                  >
                    <label htmlFor="year">Year</label>
                    <Field
                      as="select"
                      name="year"
                      disabled
                      className={values.year === "" ? "select-placeholder" : ""}
                    >
                      <option value="">Select</option>
                      <option value={currentYear}>{currentYear}</option>
                    </Field>
                    <ErrorMessage
                      name="year"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <ZipField
                    errors={errors}
                    touched={touched}
                    setCounties={setCounties}
                    setZipData={setZipData}
                    setFieldValue={setFieldValue}
                    values={values}
                    zipData={zipData}
                    counties={counties}
                    handleChange={handleChange}
                  />
                  <div
                    className={
                      errors.county && touched.county
                        ? "field has-error"
                        : "field"
                    }
                  >
                    <label htmlFor="county">County</label>
                    <Field
                      as="select"
                      name="county"
                      className={
                        values.county === "" ? "select-placeholder" : ""
                      }
                    >
                      <option value="">Choose</option>
                      {renderSelectCounties()}
                    </Field>
                    <ErrorMessage
                      name="county"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div
                    className={
                      errors.income && touched.income
                        ? "field income has-error"
                        : "field income"
                    }
                  >
                    <label htmlFor="income">Annual Household Income</label>
                    <div className="placeholder">$</div>
                    <Field id="income" name="income" placeholder="---" />
                    <ErrorMessage
                      name="income"
                      component="div"
                      className="error-message"
                    />
                  </div>
                </div>

                <div className="form-box">
                  <div
                    className={
                      errors.household && touched.household
                        ? "field has-error"
                        : "field"
                    }
                  >
                    <label htmlFor="household">
                      Number of People in Your Household
                    </label>
                    <Field
                      as="select"
                      name="household"
                      className={
                        values.household === "" ? "select-placeholder" : ""
                      }
                      onChange={(e) => {
                        handleChangeHousehold(e, values, setValues);
                        handleChange(e);
                      }}
                    >
                      <option value="">Choose</option>
                      {renderSelectHousehold()}
                    </Field>
                    <ErrorMessage
                      name="household"
                      component="div"
                      className="error-message"
                    />
                  </div>

                  <div
                    className={
                      errors.people_coverage && touched.people_coverage
                        ? "field has-error"
                        : "field"
                    }
                  >
                    <label htmlFor="people_coverage">
                      Number of People Taking Coverage
                    </label>
                    <Field
                      as="select"
                      name="people_coverage"
                      type="number"
                      className={
                        values.people_coverage === ""
                          ? "select-placeholder"
                          : ""
                      }
                      onChange={(e) => {
                        handleChangePeopleCoverage(
                          e,
                          values,
                          setValues,
                          handleChange
                        );
                      }}
                    >
                      <option value="">Choose</option>
                      {renderSelectPeopleCoverage()}
                    </Field>
                    <ErrorMessage
                      name="people_coverage"
                      component="div"
                      className="error-message"
                    />
                  </div>
                </div>

                {renderApplicants(values, errors, touched, setFieldValue)}
                {/* <div
                  className={
                    errors.employer_coverage && touched.employer_coverage
                      ? "field has-error"
                      : "field"
                  }
                >
                  <label htmlFor="employer-coverage">
                    Affordable Employer Medical Coverage Available?
                    <img
                      src={TooltipIcon}
                      alt="tooltip"
                      data-tip
                      data-for="form-tooltip"
                    />
                    <ReactTooltip id="form-tooltip" type="light" place="top">
                      <span className="tooltip">
                        Employer coverage is considered affordable - as it
                        relates to the premium tax credit - if the employee's
                        share of the annual premium for the lowest priced
                        self-only plan is no greater than 9.5% of annual
                        household income. People offered employer-sponsored
                        coverage that's affordable and provides minimum value
                        aren't eligible for a premium tax credit.
                      </span>
                    </ReactTooltip>
                  </label>
                  <Field
                    as="select"
                    name="employer_coverage"
                    className={
                      values.employer_coverage === ""
                        ? "select-placeholder"
                        : ""
                    }
                  >
                    <option value="">Choose</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </Field>
                  <ErrorMessage
                    name="employer_coverage"
                    component="div"
                    className="error-message"
                  />
                </div> */}
                <div className="form-buttons">
                  <button
                    type="submit"
                    className={
                      isLoading ? "submit button is-loading" : "submit"
                    }
                  >
                    Calculate
                  </button>
                </div>
                {error && (
                  <div className="warning-message">
                    <p>{error}</p>
                    <img
                      src={CloseWarningIcon}
                      alt="close icon"
                      onClick={handleCloseError}
                    />
                  </div>
                )}
                <div ref={resultsRef}>
                  {renderResults(resetForm, values, setSubmitting)}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default HomeCalculator;
