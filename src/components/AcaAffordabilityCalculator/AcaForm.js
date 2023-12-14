import axios from "axios";
import { FieldArray, Form, Formik, useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import AcaAgeField from "./AcaAgeField";
import ApplicantAgeField from "./ApplicantAgeField";
import HouseHoldSizeField from "./HouseHoldSizeField";
import ZipAcaField from "./ZipAcaField";
import RemoveIcon from "../../assets/svg/delete-icon.png";
const AcaForm = ({
  slideState,
  eligible,
  handleSherpaResponse,
  setFormValues,
  setBackDrop,
}) => {
  const ResetFormHandler = ({ test }) => {
    // Grab values and submitForm from context
    const { resetForm } = useFormikContext();
    console.log(test);
    useEffect(() => {
      if (eligible === "") {
        resetForm();
      }
    }, [test, resetForm]);
    return null;
  };

  const [zipState, setZipState] = useState({
    error: true,
    value: "",
    counties: [],
    selectedZip: "",
  });

  if (eligible === 2 || eligible === 3) {
    return (
      <Formik
        initialValues={{
          zipCode: "",
          age: "",
          applicants: [{ age: "", relationship: "dependent" }],
          houseHoldSize: "1",
          countyFips: "",
        }}
        validateOnMount={true}
        onSubmit={async (values, { setFieldValue }) => {
          const checkHouseHoldSize = (values) => {
            if (values.houseHoldSize < values.applicants.length) {
              setFieldValue("houseHoldSize", values.applicants.length);
              return values.applicants.length;
            } else {
              return values.houseHoldSize;
            }
          };

          let body = {
            zipCode: values.zipCode,
            countyFips: values.countyFips,
            householdIncome: slideState,
            houseHoldSize: checkHouseHoldSize(values),
            applicants: values.applicants,
          };
          setFormValues({
            zipCode: values.zipCode,
            state: zipState.selectedZip.state,
          });
          try {
            setBackDrop(true);
            const res = await axios
              .post(
                "https://haxmsir84c.execute-api.us-east-1.amazonaws.com/dev/eligibility",
                body
              )
              .then((resData) => resData.data.data.eligibility);

            setBackDrop(false);
            const noSubsidyStates = [
              "Arkansas",
              "Nevada",
              "New York",
              "Oregon",
              "Pennsylvania",
              "Rhode Island",
              "Vermont",
              "Colorado",
              "New Mexico",
            ];
            const { subsidy, applicants, state } = res;
            console.log(subsidy, applicants);

            if (subsidy === 0) {
              const medicaidEligible = applicants.every(
                (applicant) => applicant.medicaid
              );
              if (medicaidEligible) {
                console.log(state.pretty_name);
                if (state.pretty_name === "Minnesota") {
                  handleSherpaResponse("Minnesota");
                } else if (state.pretty_name === "New York") {
                  handleSherpaResponse("New York");
                } else {
                  handleSherpaResponse("medicaid");
                }
              } else {
                if (noSubsidyStates.includes(state.pretty_name)) {
                  console.log("zeko");
                  handleSherpaResponse(false);
                } else {
                  handleSherpaResponse("aca", 0);
                }
              }
            } else {
              if (noSubsidyStates.includes(state.pretty_name)) {
                console.log("zeko");
                handleSherpaResponse(false);
              } else {
                handleSherpaResponse("aca", subsidy);
              }
            }
          } catch (err) {
            setBackDrop(false);
            handleSherpaResponse(false);
          }
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
          submitForm,
          isValid,
        }) => (
          <Form>
            <div className="aca-form">
              <ZipAcaField
                values={values}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
                zipState={zipState}
                setZipState={setZipState}
                submitForm={submitForm}
                errors={errors}
                touched={touched}
              />
              <FieldArray
                name="applicants"
                render={(arrayHelpers) => (
                  <>
                    <AcaAgeField
                      values={values}
                      arrayHelpers={arrayHelpers}
                      setFieldValue={setFieldValue}
                      submitForm={submitForm}
                      handleChange={handleChange}
                      isValid={isValid}
                    />
                    <div className="aca-field-age-grid">
                      {values.applicants && values.applicants.length > 1
                        ? values.applicants.map(
                            (ageValue, index) =>
                              index !== 0 && (
                                <div
                                  key={`age-fields-${index}`}
                                  className="aca-field-age"
                                >
                                  <ApplicantAgeField
                                    values={values}
                                    arrayHelpers={arrayHelpers}
                                    setFieldValue={setFieldValue}
                                    submitForm={submitForm}
                                    handleChange={handleChange}
                                    isValid={isValid}
                                    index={index}
                                  />
                                  <img
                                    className="add-age-img"
                                    width="20"
                                    src={RemoveIcon}
                                    alt="add year"
                                    onClick={() =>
                                      arrayHelpers.remove(index, "")
                                    }
                                  />
                                </div>
                              )
                          )
                        : null}
                    </div>
                  </>
                )}
              />
              <div className="aca-form-field-grid house-hold-field ">
                <div className="aca-field-number">3</div>
                <label htmlFor="houseHoldSize">Household Size</label>
                <HouseHoldSizeField
                  values={values}
                  setFieldValue={setFieldValue}
                  submitForm={submitForm}
                  handleChange={handleChange}
                  isValid={isValid}
                />
                <div></div>
                <div className="field-description is-hidden-mobile">
                  <span>
                    Include yourself, your spouse, and children claimed as
                    dependents on your taxes.
                  </span>
                </div>
              </div>
              <div className="field-description is-hidden-tablet">
                <span>
                  Include yourself, your spouse, and children claimed as
                  dependents on your taxes.
                </span>
              </div>
            </div>
            <ResetFormHandler test={eligible} />
          </Form>
        )}
      </Formik>
    );
  }
  return null;
};

export default AcaForm;
