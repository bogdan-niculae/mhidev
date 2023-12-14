import React from "react";
import { ErrorMessage, Field } from "formik";
import MaskedInput from "react-text-mask";
import { createAutoCorrectedDatePipe } from "text-mask-addons";

const dob = [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/];
const autoCorrectedDatePipe = createAutoCorrectedDatePipe("mm/dd/yyyy", {
  minYear: 1910,
  maxYear: new Date().getFullYear() + 1,
});

const BirthDateField = ({ name = "birthDate", handleBlur, handleChange }) => {
  return (
    <div className="field-wrapper">
      <label htmlFor={name}>Date of Birth</label>
      <Field name={name} placeholder="mm/dd/yyyy">
        {({ field }) => (
          <MaskedInput
            {...field}
            mask={dob}
            placeholder={"MM/DD/YYYY"}
            type="text"
            guide={false}
            pipe={autoCorrectedDatePipe}
            // pipe={autoCorrectedDatePipe}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        )}
      </Field>

      <ErrorMessage name={name} component="div" className="field-error" />
    </div>
  );
};

export default BirthDateField;
