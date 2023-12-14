import React from "react";
import { Field } from "formik";
import axios from "axios";
import MaskedInput from "react-text-mask";

const ZipAcaField = ({
  values,
  setFieldValue,
  handleChange,
  zipState,
  setZipState,
  submitForm,
  errors,
  touched,
}) => {
  const renderSelectCounties = (counties) =>
    counties &&
    counties.map((county) => (
      <option key={county.name} value={county.fips}>
        {county.name}
      </option>
    ));

  const validate = async (value) => {
    let error;
    if (!value) {
      error = "Required";
    }
    if (value.length < 5) {
      error = "Invalid Zip Code.";
    }
    if (value.length === 5) {
      if (
        (zipState.error && zipState.value !== value) ||
        (!zipState.error && zipState.value !== value)
      ) {
        error = await axios
          .get(
            `https://p1mjhxx5fg.execute-api.us-east-1.amazonaws.com/dev/api/v1/counties/by/zip/${value}?apikey=W8ggW7iihNgn5sEIX330eDvfJW8ajBia`
          )
          .then(async ({ data: { counties } }) => {
            if (counties.length === 1) {
              await setZipState({
                error: false,
                value: value,
                counties: counties,
                selectedZip: counties[0],
              });

              await setFieldValue("countyFips", counties[0].fips);
              submitForm();
              return "";
            } else if (counties.length > 1) {
              await setZipState({
                error: false,
                value: value,
                counties: counties,
                selectedZip: "",
              });
            } else {
              await setZipState({
                error: true,
                value: value,
                counties: [],
                selectedZip: "",
              });
              return "Invalid Zip Code.";
            }
          })
          .catch((err) => {
            setZipState({
              error: true,
              value: value,
              counties: [],
            });
          });
      }
    }
    return error;
  };
  return (
    <>
      <div className="aca-form-field-grid">
        <div className="aca-field-number">1</div>
        <label htmlFor="zipCode">ZIP Code</label>
        <div
          className={`aca-field ${
            errors.zipCode && touched.zipCode ? "has-error" : ""
          }`}
        >
          <Field validate={validate} name="zipCode" placeholder="00000">
            {({ field }) => (
              <MaskedInput
                {...field}
                id="zipCode"
                mask={[/[0-9]/, /\d/, /\d/, /\d/, /\d/]}
                placeholder="00000"
                type="text"
                guide={false}
                onChange={async (e) => {
                  await handleChange(e);
                }}
              />
            )}
          </Field>
        </div>
      </div>
      {zipState?.counties.length > 1 && (
        <div className="aca-form-field-grid">
          <div />
          <label htmlFor="countyFips">County</label>
          <div
            className={`aca-field ${
              errors.countyFips && touched.countyFips ? "has-error" : ""
            }`}
          >
            <Field
              as="select"
              name="countyFips"
              validate={(value) => {
                let error;
                if (!value) {
                  error = "Required";
                }
                return error;
              }}
              className={values.countyFips === "" ? "select-placeholder" : ""}
              onChange={async (e) => {
                setZipState({
                  ...zipState,
                  selectedZip: zipState?.counties.filter(
                    (item) => item.fips === e.target.value
                  )[0],
                });
                await handleChange(e);
                if (values.applicants[0].age !== "") {
                  submitForm();
                }
              }}
            >
              <option value="">Choose</option>
              {renderSelectCounties(zipState?.counties)}
            </Field>
          </div>
        </div>
      )}
    </>
  );
};

export default ZipAcaField;
