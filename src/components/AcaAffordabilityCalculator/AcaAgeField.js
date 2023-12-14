import { Field } from "formik";
import React from "react";
import PlusIcon from "../../assets/svg/plus-aca.svg";

const validateAge = (value) => {
  let error;
  if (!value) {
    error = "Required";
  }
  return error;
};

const AcaAgeField = ({
  values,
  setFieldValue,
  arrayHelpers,
  handleChange,
  submitForm,
  isValid,
}) => {
  return (
    <>
      <div className="aca-form-field-grid age-field">
        <div className="aca-field-number">2</div>
        <label htmlFor="age" as="select">
          Your Age
        </label>
        <div className="aca-field">
          <Field
            validate={validateAge}
            as="select"
            name="applicants.0.age"
            placeholder="00000"
            onChange={async (e) => {
              // handleChange(e);
              await handleChange(e);
              const { zipCode } = values;
              if (zipCode !== "") {
                submitForm();
              }
            }}
          >
            <option value="">Age</option>
            <option value="18">18 years</option>
            <option value="19">19 years</option>
            <option value="20">20 years</option>
            <option value="21">21 years</option>
            <option value="22">22 years</option>
            <option value="23">23 years</option>
            <option value="24">24 years</option>
            <option value="25">25 years</option>
            <option value="26">26 years</option>
            <option value="27">27 years</option>
            <option value="28">28 years</option>
            <option value="29">29 years</option>
            <option value="30">30 years</option>
            <option value="31">31 years</option>
            <option value="32">32 years</option>
            <option value="33">33 years</option>
            <option value="34">34 years</option>
            <option value="35">35 years</option>
            <option value="36">36 years</option>
            <option value="37">37 years</option>
            <option value="38">38 years</option>
            <option value="39">39 years</option>
            <option value="40">40 years</option>
            <option value="41">41 years</option>
            <option value="42">42 years</option>
            <option value="43">43 years</option>
            <option value="44">44 years</option>
            <option value="45">45 years</option>
            <option value="46">46 years</option>
            <option value="47">47 years</option>
            <option value="48">48 years</option>
            <option value="49">49 years</option>
            <option value="50">50 years</option>
            <option value="51">51 years</option>
            <option value="52">52 years</option>
            <option value="53">53 years</option>
            <option value="54">54 years</option>
            <option value="55">55 years</option>
            <option value="56">56 years</option>
            <option value="57">57 years</option>
            <option value="58">58 years</option>
            <option value="59">59 years</option>
            <option value="60">60 years</option>
            <option value="61">61 years</option>
            <option value="62">62 years</option>
            <option value="63">63 years</option>
            <option value="64">64 years</option>
          </Field>
        </div>
        <div>
          <img
            className="add-age-img"
            width="20"
            src={PlusIcon}
            alt="add year"
            onClick={() => {
              arrayHelpers.push("");
              console.log("values.houseHoldSize", values.houseHoldSize);
              if (
                values.applicants.length + 1 >=
                parseInt(values.houseHoldSize)
              ) {
                console.log(
                  "values.applicants.length",
                  values.applicants.length
                );
                setFieldValue("houseHoldSize", values.applicants.length + 1);
              }
            }}
          />
        </div>
        <div className="field-description is-hidden-mobile">
          <span>Add ages of other family members to be insured.</span>
        </div>
      </div>
      <div className="field-description is-hidden-tablet">
        <span>Add ages of other family members to be insured.</span>
      </div>
    </>
  );
};

export default AcaAgeField;
