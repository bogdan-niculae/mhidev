import React, { useState } from "react";
import Layout from "../components/Layout";
import AcaForm from "../components/AcaAffordabilityCalculator/AcaForm";
import MagiForm from "../components/AcaAffordabilityCalculator/MagiForm";
import { postToMarket, useProducts } from "../components/form/products";
import Spinner from "../assets/svg/spinner.svg";
import Seo from "../components/Seo";

const AcaAffordabilityCalculator = ({ location }) => {
  const [slideState, setSliderState] = useState(75000);
  const [eligible, setEligibleState] = useState("");
  const [sherpaResults, setSherpaResults] = useState("");
  const [subsidy, setSubsidy] = useState("");
  const [familyPercent, setFamilyPercent] = useState("");
  const [employeePercent, setEmployeePercent] = useState("");
  const [formValues, setFormValues] = useState("");
  const [submittingProduct, setSubmitting] = useState(false);
  const [acaRestForm, setResetForm] = useState(0);
  const {
    allWpProduct: { edges },
    allWpAgent,
    allWpAffinity,
  } = useProducts();

  const sendToInsx = async () => {
    setSubmitting(true);
    const valuesForMarket = {
      zip: formValues.zipCode,
      state: formValues.state,
      product: "ACA/OBAMACARE",
    };
    await postToMarket(
      valuesForMarket,
      edges,
      location,
      allWpAgent,
      allWpAffinity,
      setSubmitting
    );
  };
  const handleCalculation = (values) => {
    console.log(values);
    const paymentFrequency = parseInt(values.paymentFrequency);
    const costFamily =
      values.costFamily === ""
        ? 0
        : parseInt(values.costFamily.replace(/[^a-zA-Z0-9 ]/g, ""));
    const costEmployee = parseInt(
      values.costEmployee.replace(/[^a-zA-Z0-9 ]/g, "")
    );

    console.log(costFamily, costEmployee);
    const costEmployeePercent = (
      ((costEmployee * paymentFrequency) / slideState) *
      100
    ).toFixed(2);
    setEmployeePercent(costEmployeePercent);
    // const costFamilyPercent = ((costFamily / slideState) * 100).toFixed(2);

    const costEmployeeAndFamilyPercent = (
      ((paymentFrequency * (parseInt(costEmployee) + parseInt(costFamily))) /
        slideState) *
      100
    ).toFixed(2);
    setFamilyPercent(costEmployeeAndFamilyPercent);

    console.log(
      "costEmployeePercent",
      costEmployeePercent,
      costEmployeePercent > 9.12
    );
    console.log("costEmployeeAndFamilyPercent", costEmployeeAndFamilyPercent);
    if (costEmployeePercent > 9.12) {
      setEligibleState(2);
    }

    if (costEmployeeAndFamilyPercent < 9.12) {
      setEligibleState(1);
    }

    if (costEmployeeAndFamilyPercent > 9.12 && costEmployeePercent < 9.12) {
      setEligibleState(3);
    }
  };
  const handleSherpaResponse = (product, subsidy) => {
    if (product === "aca") {
      setSubsidy(subsidy);
      setSherpaResults("aca");
    }
    if (product === false) {
      setSherpaResults("no-product");
    }

    if (product === "medicaid") {
      setSherpaResults("medicaid");
    }

    if (product === "Minnesota") {
      setSherpaResults("Minnesota");
    }

    if (product === "New York") {
      setSherpaResults("New York");
    }
  };

  const [backdrop, setBackDrop] = useState(false);
  return (
    <Layout location={location}>
      <Seo
        title="ACA Affordability Calculator - myhealthinsurance.com"
        description="Use our 2023 ACA Affordability Calculator to see if you might be
                eligible for ACA premium subsidies – and your potential savings
                if you qualify."
        url="/circle-of-champions/"
      />
      <div className="aca-form-page-wrapper">
        <div className="container is-widescreen">
          <div className="aca-form-wrapper">
            <div className="aca-form-text-content">
              <div className="aca-form-text-headings">
                <h1>
                  If I cannot afford my employer coverage, can I apply for
                  premium subsidies through individual or family ACA plans?
                </h1>
                <h3>
                  Use our 2023 ACA Affordability Calculator to see if you might
                  be eligible for ACA premium subsidies – and your potential
                  savings if you qualify.
                </h3>
              </div>
              <p className="aca-form-disclaimer-desktop">
                You may be able to avoid the "family glitch" which used to
                prevent an employee's spouse and dependents from qualifying for
                premium subsidies even if the employer provided little or no
                contribution to premiums for family members. Now, if the total
                family premiums (including the employee, spouse, and/or
                dependents) are more than 9.12% of MAGI, the employee's family
                members may qualify for premium subsidies via an ACA Marketplace
                plan even if the employee's coverage is deemed affordable. If
                employee-only premiums are more than 9.12% of modified adjusted
                gross income (MAGI), then the employer coverage is deemed
                unaffordable, and the employee and any family members are
                eligible to pursue savings via an individual ACA plan during
                open enrollment. Depending on income, some families will find
                that some family members are eligible for Medicaid or CHIP,
                which is available regardless of an offer of coverage from an
                employer. <br />
                <span>
                  Source:{" "}
                  <a
                    target="_blank"
                    href="https://www.healthinsurance.org/obamacare/employer-health-plan-affordability-calculator/"
                    rel="noreferrer"
                  >
                    healthinsurance.org
                  </a>
                </span>
              </p>
            </div>
            <section className="aca-form-section">
              <div className="aca-affordability-calculator">
                <div className="aca-grid">
                  <div className="aca-header">
                    <h3>ACA Affordability Calculator</h3>
                  </div>
                  <div className="aca-content">
                    <MagiForm
                      familyPercent={familyPercent}
                      employeePercent={employeePercent}
                      setSliderState={setSliderState}
                      slideState={slideState}
                      handleCalculation={handleCalculation}
                      eligible={eligible}
                      setEligibleState={setEligibleState}
                      setResetForm={setResetForm}
                      resetAcaForm={acaRestForm}
                      setSherpaResults={setSherpaResults}
                    />
                    <AcaForm
                      setBackDrop={setBackDrop}
                      eligible={eligible}
                      slideState={slideState}
                      handleSherpaResponse={handleSherpaResponse}
                      setFormValues={setFormValues}
                      acaRestForm={acaRestForm}
                    />
                  </div>
                  {eligible === 1 && (
                    <div className="not-eligible">
                      <p>
                        Your employer plan is considered affordable based on the
                        information provided. You are not eligible for premium
                        subsidies through an individual ACA plan.
                      </p>
                    </div>
                  )}
                  {console.log(sherpaResults === "aca")}
                  {(eligible === 2 || eligible === 3) &&
                    sherpaResults === "aca" && (
                      <div className="results-aca-form">
                        <div className="results-aca-form-content">
                          <span>Estimated monthly subsidy</span>
                          <span className="results-aca-form-price">
                            ${parseInt(subsidy).toLocaleString("en-US")}
                          </span>
                        </div>
                        <div className="btn-wrapper">
                          <button
                            onClick={() => sendToInsx()}
                            className="btn btn-orange"
                            type="button"
                          >
                            {submittingProduct ? (
                              <img src={Spinner} alt="" className="spinner" />
                            ) : (
                              "Find plans"
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  {(eligible === 2 || eligible === 3) &&
                    sherpaResults === "no-product" && (
                      <div className="results-aca-form">
                        <p className="results-aca-form-heading">
                          Subsidy data not available for your state
                        </p>
                        <div className="results-aca-form-content">
                          <span>Estimated monthly subsidy</span>
                          <span className="results-aca-form-price">$0</span>
                        </div>
                        <div className="btn-wrapper">
                          <button
                            onClick={() => sendToInsx()}
                            className="btn btn-orange"
                            type="button"
                          >
                            {submittingProduct ? (
                              <img src={Spinner} alt="" className="spinner" />
                            ) : (
                              "Find plans"
                            )}
                          </button>
                        </div>
                        <p className="results-aca-form-paragraph">
                          Take a look at your premium and benefit options.
                        </p>
                      </div>
                    )}

                  {(eligible === 2 || eligible === 3) &&
                    sherpaResults === "medicaid" && (
                      <div className="results-aca-form medicaid">
                        <p className="results-aca-form-heading">
                          You may be eligible for Medicaid.
                        </p>
                        {/* <div className="results-aca-form-content">
                      <span>Estimated monthly subsidy</span>
                      <span className="results-aca-form-price">$0</span>
                    </div> */}
                        <div className="btn-wrapper">
                          <button
                            onClick={() => sendToInsx()}
                            className="btn btn-orange"
                            type="button"
                          >
                            {submittingProduct ? (
                              <img src={Spinner} alt="" className="spinner" />
                            ) : (
                              "Find Medicaid"
                            )}
                          </button>
                        </div>
                        <p className="results-aca-form-paragraph">
                          Click “Find Medicaid” for information on your state.
                        </p>
                      </div>
                    )}
                  {(eligible === 2 || eligible === 3) &&
                    sherpaResults === "Minnesota" && (
                      <div className="results-aca-form medicaid medicaid-orange">
                        <p className="results-aca-form-heading">
                          You may be eligible for MinnesotaCare.
                        </p>
                        {/* <div className="results-aca-form-content">
                      <span>Estimated monthly subsidy</span>
                      <span className="results-aca-form-price">$0</span>
                    </div> */}
                        <div className="btn-wrapper">
                          <button
                            onClick={() => sendToInsx()}
                            className="btn btn-orange"
                            type="button"
                          >
                            {submittingProduct ? (
                              <img src={Spinner} alt="" className="spinner" />
                            ) : (
                              "MinnesotaCare"
                            )}
                          </button>
                        </div>
                        <p className="results-aca-form-paragraph">
                          Click “MinnesotaCare” to learn more.
                        </p>
                      </div>
                    )}
                  {(eligible === 2 || eligible === 3) &&
                    sherpaResults === "New York" && (
                      <div className="results-aca-form medicaid medicaid-orange">
                        <p className="results-aca-form-heading">
                          You may be eligible for New York's Essential Plan.
                        </p>
                        {/* <div className="results-aca-form-content">
                      <span>Estimated monthly subsidy</span>
                      <span className="results-aca-form-price">$0</span>
                    </div> */}
                        <div className="btn-wrapper">
                          <button
                            onClick={() => sendToInsx()}
                            className="btn btn-orange"
                            type="button"
                          >
                            {submittingProduct ? (
                              <img src={Spinner} alt="" className="spinner" />
                            ) : (
                              "Essential Plan"
                            )}
                          </button>
                        </div>
                        <p className="results-aca-form-paragraph">
                          Click “Essential Plan” to learn more.
                        </p>
                      </div>
                    )}
                </div>
                {backdrop && <div id="cover-spin"></div>}
              </div>
            </section>
            <p className="aca-form-disclaimer-mobile">
              You may be able to avoid the "family glitch" which used to prevent
              an employee's spouse and dependents from qualifying for premium
              subsidies even if the employer provided little or no contribution
              to premiums for family members. Now, if the total family premiums
              (including the employee, spouse, and/or dependents) are more than
              9.12% of MAGI, the employee's family members may qualify for
              premium subsidies via an ACA Marketplace plan even if the
              employee's coverage is deemed affordable. If employee-only
              premiums are more than 9.12% of modified adjusted gross income
              (MAGI), then the employer coverage is deemed unaffordable, and the
              employee and any family members are eligible to pursue savings via
              an individual ACA plan during open enrollment. Depending on
              income, some families will find that some family members are
              eligible for Medicaid or CHIP, which is available regardless of an
              offer of coverage from an employer. <br />
              Source:{" "}
              <span>
                <a
                  target="_blank"
                  href="https://www.healthinsurance.org/obamacare/employer-health-plan-affordability-calculator/"
                  rel="noreferrer"
                >
                  healthinsurance.org
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AcaAffordabilityCalculator;
