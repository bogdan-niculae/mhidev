import { Field } from "formik";
import React from "react";

const validateAge = (value) => {
  let error;
  if (!value) {
    error = "Required";
  }
  return error;
};

const ApplicantAgeField = ({ index, values, handleChange, submitForm }) => {
  return (
    <Field
      as="select"
      validate={validateAge}
      name={`applicants.${index}.age`}
      placeholder="00000"
      onChange={async (e) => {
        await handleChange(e);
        const { zipCode, applicants } = values;
        if (zipCode !== "" && applicants[0].age !== "") {
          submitForm();
        }
      }}
    >
      <option value="">Age</option>
      <option value="0">&lt; 12 months</option>
      <option value="1">1 year</option>
      <option value="2">2 years</option>
      <option value="3">3 years</option>
      <option value="4">4 years</option>
      <option value="5">5 years</option>
      <option value="6">6 years</option>
      <option value="7">7 years</option>
      <option value="8">8 years</option>
      <option value="9">9 years</option>
      <option value="10">10 years</option>
      <option value="11">11 years</option>
      <option value="12">12 years</option>
      <option value="13">13 years</option>
      <option value="14">14 years</option>
      <option value="15">15 years</option>
      <option value="16">16 years</option>
      <option value="17">17 years</option>
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
  );
};

export default ApplicantAgeField;
