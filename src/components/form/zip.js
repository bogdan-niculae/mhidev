import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import MaskedInput from "react-text-mask";
import axios from "axios";

const ZipField = ({
  errors,
  touched,
  setCounties,
  setZipData,
  setFieldValue,
  values,
  counties,
  zipData,
  handleChange,
}) => {
  const [validateFlag, setValidateFlag] = useState(false);

  const validate = (value) => {
    if (value.length < 5 && values.county !== "") {
      setCounties(null);
      setZipData(null);
      setFieldValue("county", "");
    }

    if (value.length === 5 && validateFlag) {
      return axios
        .get(
          `https://p1mjhxx5fg.execute-api.us-east-1.amazonaws.com/dev/api/v1/counties/by/zip/${value}?apikey=W8ggW7iihNgn5sEIX330eDvfJW8ajBia`
        )
        .then((results) => {
          let counties = results?.data?.counties;
          if (counties?.length > 0) {
            setZipData(results?.data);
            let allCounties = [];
            counties.forEach((county) => {
              allCounties.push({
                label: county?.name.replace(` County`, ""),
                value: county?.name.replace(` County`, ""),
              });
            });

            setCounties(allCounties);
            if (counties.length === 1) {
              setFieldValue("county", counties[0].name.replace(` County`, ""));
            } else {
              setFieldValue("county", "");
            }
          }
          setValidateFlag(false);
        })
        .catch((error) => {
          console.log("zip_error", error);
          setValidateFlag(false);
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
      <Field id="zip_code" name="zip_code" validate={validate}>
        {({ field }) => (
          <MaskedInput
            {...field}
            id="zip_code"
            mask={[/[0-9]/, /\d/, /\d/, /\d/, /\d/]}
            placeholder="Enter Your Zip Code"
            type="text"
            guide={false}
            onChange={(event) => {
              setValidateFlag(true);
              handleChange(event);
            }}
          />
        )}
      </Field>
      <ErrorMessage name="zip_code" component="div" className="error-message" />
    </div>
  );
};

export default ZipField;
