import React from "react";
import { Field } from "formik";
import MaskedInput from "react-text-mask";
import axios from "axios";

const ZipAgent = ({ errors, touched }) => {
  const validate = (value) => {
    if (value.length === 5) {
      return axios
        .get(
          `https://p1mjhxx5fg.execute-api.us-east-1.amazonaws.com/dev/api/v1/counties/by/zip/${value}?apikey=W8ggW7iihNgn5sEIX330eDvfJW8ajBia`
        )
        .then((results) => {
          console.log("results", results);
        })
        .catch((error) => {
          console.log("zip_error", error);
        });
    }
  };

  return (
    <div
      className={
        errors.zip_code && touched.zip_code ? "field has-error" : "field"
      }
    >
      <label htmlFor="zip_code">Enter Your Zip Code</label>
      <Field
        id="zip_code"
        name="zip_code"
        validate={validate}
        className={errors.zip_code && touched.zip_code ? "has-error" : ""}
      >
        {({ field }) => (
          <MaskedInput
            {...field}
            id="zip_code"
            mask={[/[0-9]/, /\d/, /\d/, /\d/, /\d/]}
            placeholder="Enter Your Zip Code"
            type="text"
            guide={false}
          />
        )}
      </Field>
    </div>
  );
};

export default ZipAgent;
