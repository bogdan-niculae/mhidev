import { Field, Form, Formik } from "formik";
import React from "react";
import ReactSlider from "react-slider";
import ToolTipIcon from "../../assets/svg/question-icon.svg";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
const defaultMaskOptions = {
  prefix: "$",
  suffix: "",
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ",",
  allowDecimal: true,
  decimalSymbol: ".",
  decimalLimit: 2, // how many digits allowed after the decimal
  integerLimit: 7, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
};

const CurrencyInput = ({ maskOptions, ...inputProps }) => {
  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
    ...maskOptions,
  });

  return <MaskedInput mask={currencyMask} {...inputProps} />;
};
const MagiForm = ({
  slideState,
  setSliderState,
  eligible,
  handleCalculation,
  familyPercent,
  employeePercent,
  setEligibleState,
  setSherpaResults,
}) => {
  return (
    <Formik
      initialValues={{
        costFamily: "",
        costEmployee: "",
        paymentFrequency: "",
      }}
    >
      {({ values, errors, touched, resetForm, handleChange }) => (
        <Form>
          <div className="aca-slider-container">
            <div className="magi-grid">
              <div className="aca-field-number">1</div>
              <p className="magi-heading-mobile is-hidden-tablet">
                Modified Adjusted Gross Income (
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://laborcenter.berkeley.edu/pdf/2013/MAGI_summary13.pdf"
                >
                  MAGI
                </a>
                )
              </p>
              <div className="magi-content">
                <p className="magi-heading is-hidden-mobile">
                  Modified Adjusted Gross Income (
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://laborcenter.berkeley.edu/pdf/2013/MAGI_summary13.pdf"
                  >
                    MAGI
                  </a>
                  )
                </p>
                <p>
                  For most taxpayers, your MAGI is close to AGI (Line 11 of your
                  Form 1040 in 2021 and 2022)
                </p>
                {/* TODO: submit on slider check if zip code exists */}
                <div className="magi-slider-container">
                  <ReactSlider
                    min={0}
                    max={150000}
                    step={1000}
                    defaultValue={slideState}
                    className="horizontal-slider"
                    thumbClassName="example-thumb"
                    trackClassName="example-track"
                    onChange={(value) => {
                      if (eligible !== "") {
                        resetForm();
                        setEligibleState("");
                        setSliderState(value);
                        setSherpaResults("");
                      }
                      setSliderState(value);
                    }}
                  />
                </div>
                <div className="magi-result">
                  <span className="magi-min">$0</span>
                  <span className="magi-current-value">
                    ${slideState.toLocaleString()}
                  </span>
                  <span className="magi-max is-hidden-tablet">$150K</span>
                  <span className="magi-max is-hidden-mobile">$150,000</span>
                </div>
              </div>
            </div>
          </div>
          <div className="aca-filed-grid">
            <div className="aca-field-number">2</div>
            <label htmlFor="costEmployee">Cost of employee only coverage</label>
            <div className="field-tool-tip is-hidden-tablet">
              <Tippy
                content="This information is typically available through your employers
                HR department or workplace portal, and should be based on the
                lowest-cost plan your employer offers."
              >
                <img width="20" src={ToolTipIcon} alt="tool tip" />
              </Tippy>
            </div>
            <div
              className={`magi-field cost-employee ${
                errors.costEmployee && touched.costEmployee ? "has-error" : ""
              }`}
            >
              <Field
                validate={(value) => {
                  let error;
                  if (!value) {
                    error = "Required";
                  }
                  return error;
                }}
                className="price-field"
                name="costEmployee"
                placeholder="00000"
              >
                {({ field }) => (
                  <CurrencyInput
                    {...field}
                    onChange={(e) => {
                      if (eligible !== "") {
                        console.log(e);
                        resetForm();
                        setEligibleState("");
                        setSherpaResults("");
                        handleChange(e);
                      }
                      handleChange(e);
                    }}
                    placeholder="$0.00"
                    type="text"
                  />
                )}
              </Field>
              {eligible !== "" && (
                <p>
                  {employeePercent}%{" "}
                  <Tippy content="Equals cost of employee only coverage divided by modified adjusted gross income.">
                    <img width="16" src={ToolTipIcon} alt="tool tip" />
                  </Tippy>
                </p>
              )}
            </div>
            <div className="field-tool-tip is-hidden-mobile">
              <Tippy
                content="This information is typically available through your employers
                HR department or workplace portal, and should be based on the
                lowest-cost plan your employer offers."
              >
                <img width="20" src={ToolTipIcon} alt="tool tip" />
              </Tippy>
            </div>
            <div
              className={`is-hidden-mobile payment-frequency ${
                errors.paymentFrequency && touched.paymentFrequency
                  ? "has-error"
                  : ""
              }`}
            >
              <Field
                validate={(value) => {
                  let error;
                  if (!value) {
                    error = "Required";
                  }
                  return error;
                }}
                as="select"
                name="paymentFrequency"
                onChange={(e) => {
                  if (eligible !== "") {
                    console.log(e);
                    resetForm();
                    setEligibleState("");
                    setSherpaResults("");
                    handleChange(e);
                  }
                  handleChange(e);
                }}
              >
                <option value="">Payment frequency</option>
                <option value={26}>Bi-weekly</option>
                <option value={12}>Monthly</option>
              </Field>
            </div>
          </div>

          <div className="aca-filed-grid">
            <div className="aca-field-number">3</div>
            <label htmlFor="costFamily">Cost of family member coverage</label>
            <div className="field-tool-tip is-hidden-tablet">
              <Tippy
                content="This information is typically available through your employers
                HR department or workplace portal, and should be based on the
                lowest-cost plan your employer offers."
              >
                <img width="20" src={ToolTipIcon} alt="tool tip" />
              </Tippy>
            </div>
            <div
              className={`magi-field ${
                errors.costFamily && touched.costFamily ? "has-error" : ""
              }`}
            >
              <Field name="costFamily" placeholder="00000">
                {({ field }) => (
                  <CurrencyInput
                    {...field}
                    onChange={(e) => {
                      if (eligible !== "") {
                        console.log(e);
                        resetForm();
                        setEligibleState("");
                        setSherpaResults("");
                        handleChange(e);
                      }
                      handleChange(e);
                    }}
                    placeholder="$0.00"
                    type="text"
                  />
                )}
              </Field>

              {eligible !== "" && (
                <p>
                  {familyPercent}%{" "}
                  <Tippy content="Equals cost of employee only coverage plus cost of family member coverage divided by modified adjusted gross income.">
                    <img width="16" src={ToolTipIcon} alt="tool tip" />
                  </Tippy>
                </p>
              )}
            </div>
            <div className="field-tool-tip is-hidden-mobile">
              <Tippy
                content="This information is typically available through your employers
                HR department or workplace portal, and should be based on the
                lowest-cost plan your employer offers."
              >
                <img width="20" src={ToolTipIcon} alt="tool tip" />
              </Tippy>
            </div>
            <div className="field-description">
              <span>
                Includes your spouse, and children claimed as dependents on your
                taxes. To calculate this value subtract the cost of employee
                coverage from the cost of family coverage.
              </span>
            </div>
          </div>
          <div
            className={`is-hidden-tablet payment-frequency ${
              errors.paymentFrequency && touched.paymentFrequency
                ? "has-error"
                : ""
            }`}
          >
            <Field
              validate={(value) => {
                let error;
                if (!value) {
                  error = "Required";
                }
                return error;
              }}
              as="select"
              name="paymentFrequency"
              onChange={(e) => {
                if (eligible !== "") {
                  console.log(e);
                  resetForm();
                  setEligibleState("");
                  setSherpaResults("");
                  handleChange(e);
                }
                handleChange(e);
              }}
            >
              <option value="">Payment frequency</option>
              <option value={26}>Bi-weekly</option>
              <option value={12}>Monthly</option>
            </Field>
          </div>

          <div className="eligible-info">
            {eligible === 2 && (
              <p>
                You and your family may qualify for a premium subsidy through
                individual ACA plans! Please provide the following information
                for a premium subsidy estimate.
              </p>
            )}
            {eligible === 3 && (
              <p>
                Your family members may qualify for a premium subsidy and could
                save you premiums through individual ACA plans! Your “employee
                only” coverage is considered affordable thus you will need to
                retain your employer plan for self-coverage. Please provide the
                following information for a premium subsidy estimate for your
                spouse and/or dependents.
              </p>
            )}
          </div>

          {eligible === "" && (
            <div className="aca-submit">
              <button
                type="submit"
                onClick={() => handleCalculation(values)}
                className="btn btn-orange "
              >
                Calculate
              </button>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default MagiForm;
