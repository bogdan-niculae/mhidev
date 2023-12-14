import React from "react";
import { ErrorMessage, Field } from "formik";

const HouseholdIncomeField = ({ name = "householdIncome" }) => {
  return (
    <div className="field-wrapper">
      <label htmlFor={name}>Annual Household Income</label>
      <Field type="number" name={name} placeholder="0" />
      <ErrorMessage name={name} component="div" className="field-error" />
      <small>
        This is the total income for your household. Include taxable income of
        all members of your household, even members that are not taking
        coverage. An estimate is fine at this time.
      </small>
    </div>
  );
};

export default HouseholdIncomeField;
