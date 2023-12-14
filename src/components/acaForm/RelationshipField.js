import React from "react";
import { ErrorMessage, Field } from "formik";

const RelationshipField = ({ name = "relationship" }) => {
  return (
    <div className="field-wrapper">
      <label htmlFor={name}>Relationship</label>
      <Field name={name} as="select">
        <option value="">Choose</option>
        <option value="Spouse">Spouse</option>
        <option value="Dependent">Dependent Child</option>
      </Field>
      <ErrorMessage name={name} component="div" className="field-error" />
    </div>
  );
};

export default RelationshipField;
