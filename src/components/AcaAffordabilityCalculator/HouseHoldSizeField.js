import { Field } from "formik";
import React from "react";

const HouseHoldSizeField = ({
  values,
  handleChange,
  submitForm,
  isValid,
  setFieldValue,
}) => {
  return (
    <div className="aca-field">
      <Field
        as="select"
        name="houseHoldSize"
        placeholder="00000"
        onChange={async (e) => {
          await handleChange(e);
          const { zipCode, applicants } = values;
          if (zipCode !== "" && applicants[0].age !== "") {
            submitForm();
          }
        }}
      >
        <option value="1">1 member</option>
        <option value="2">2 members</option>
        <option value="3">3 members</option>
        <option value="4">4 members</option>
        <option value="5">5 members</option>
        <option value="6">6 members</option>
        <option value="7">7 members</option>
        <option value="8">8 members</option>
        <option value="9">9 members</option>
        <option value="10">10 members</option>
        <option value="11">11 members</option>
        <option value="12">12 members</option>
        <option value="13">13 members</option>
        <option value="14">14 members</option>
        <option value="15">15 members</option>
      </Field>
    </div>
  );
};

export default HouseHoldSizeField;
