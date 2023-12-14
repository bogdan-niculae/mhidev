import React from "react";
import { ErrorMessage, Field } from "formik";
import axios from "axios";
import MaskedInput from "react-text-mask";

const ZipCodeField = ({
  values,
  setFieldValue,
  handleChange,
  zipState,
  setZipState,
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
      error = "Zip code is required";
    }
    if (value.length < 5) {
      error = "Please enter a valid zip code";
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
          .then(({ data: { counties } }) => {
            if (counties.length === 1) {
              setZipState({
                error: false,
                value: value,
                counties: counties,
                selectedZip: counties[0],
              });

              setFieldValue("countyFips", counties[0].fips);
              return "";
            } else if (counties.length > 1) {
              setZipState({
                error: false,
                value: value,
                counties: counties,
                selectedZip: "",
              });
            } else {
              setZipState({
                error: true,
                value: value,
                counties: [],
                selectedZip: "",
              });
              return "Please enter a valid zip code";
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
    <div className="field-wrapper">
      <label htmlFor="zipCode">Zip Code</label>
      <Field validate={validate} name="zipCode" placeholder="00000">
        {({ field }) => (
          <MaskedInput
            {...field}
            id="zipCode"
            mask={[/[0-9]/, /\d/, /\d/, /\d/, /\d/]}
            placeholder="00000"
            type="text"
            guide={false}
          />
        )}
      </Field>
      <ErrorMessage name="zipCode" component="div" className="field-error" />
      {zipState?.counties.length > 1 && (
        <div className="county-wrapper">
          <label htmlFor="countyFips">County</label>
          <Field
            as="select"
            name="countyFips"
            className={values.countyFips === "" ? "select-placeholder" : ""}
            onChange={(e) => {
              setZipState({
                ...zipState,
                selectedZip: zipState?.counties.filter(
                  (item) => item.fips === e.target.value
                )[0],
              });
              handleChange(e);
            }}
          >
            <option value="">Choose</option>
            {renderSelectCounties(zipState?.counties)}
          </Field>
          <ErrorMessage
            name="countyFips"
            component="div"
            className="field-error"
          />
        </div>
      )}
    </div>
  );
};

export default ZipCodeField;
