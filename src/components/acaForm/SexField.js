import { ErrorMessage } from "formik";
import React, { useState } from "react";

const SexField = ({
  name = "gender",
  handleChange,
  values,
  index,
  setFieldValue,
}) => {
  const [open, setOpen] = useState(false);

  const radioBtnClass = (value, fieldName) => {
    if (index || index === 0) {
      return `radio-btn ${
        values.relationships[index][fieldName] === value ? "active" : ""
      }`;
    }

    return `radio-btn ${values[fieldName] === value ? "active" : ""}`;
  };

  const setPregnantName = () => {
    if (index || index === 0) {
      return `relationships.${index}.pregnant`;
    }
    return "pregnant";
  };

  return (
    <div className="field-wrapper">
      <label htmlFor={name}>Sex</label>
      <div className="radio-btn-grid">
        <button
          className={radioBtnClass("Male", "gender")}
          onClick={(e) => {
            setFieldValue(setPregnantName(), "0");
            handleChange(e);
            setOpen(false);
          }}
          type="button"
          value="Male"
          id={name}
          name={name}
        >
          Male
        </button>
        <button
          className={radioBtnClass("Female", "gender")}
          onClick={(e) => {
            setFieldValue(setPregnantName(), "");
            handleChange(e);
            setOpen(true);
          }}
          type="button"
          value="Female"
          id={name}
          name={name}
        >
          Female
        </button>
      </div>
      <ErrorMessage name={name} component="div" className="field-error" />
      {open && (
        <div className="pregnant-row">
          <label htmlFor={name}>Are you pregnant?</label>
          <div className="radio-btn-grid">
            <button
              className={radioBtnClass("1", "pregnant")}
              onClick={handleChange}
              type="button"
              value="1"
              id={setPregnantName()}
              name={setPregnantName()}
            >
              Yes
            </button>
            <button
              className={radioBtnClass("0", "pregnant")}
              onClick={handleChange}
              type="button"
              value="0"
              id={setPregnantName()}
              name={setPregnantName()}
            >
              No
            </button>
          </div>
          <ErrorMessage
            name={setPregnantName()}
            component="div"
            className="field-error"
          />
        </div>
      )}
    </div>
  );
};

export default SexField;
