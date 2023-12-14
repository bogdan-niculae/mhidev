import React from "react";
import { ErrorMessage, Field } from "formik";

const HouseholdSizeField = ({ name = "householdSize" }) => {
  return (
    <div className="field-wrapper">
      <label htmlFor={name}>Family Size</label>
      <Field type="number" name={name} placeholder="1" />
      <ErrorMessage name={name} component="div" className="field-error" />
      <small>
        The number of people you include on your taxes. Must be a minimum of 1.
      </small>
    </div>
  );
};

export default HouseholdSizeField;
