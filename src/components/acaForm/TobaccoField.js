import { ErrorMessage } from "formik";
import React from "react";
import ReactTooltip from "react-tooltip";
import ToolTipIcon from "../../assets/svg/tool-tip.svg";
const TobaccoField = ({
  name = "isTobaccoUser",
  handleChange,
  values,
  index,
}) => {
  // console.log(values);
  // console.log(name.replace(/\.(.+?)(?=\.|$)/g, (m, s) => `[${s}]`));
  const radioBtnClass = (value) => {
    if (index || index === 0) {
      return `radio-btn ${
        values.relationships[index].isTobaccoUser === value ? "active" : ""
      }`;
    }

    return `radio-btn ${values.isTobaccoUser === value ? "active" : ""}`;
  };

  return (
    <div className="field-wrapper">
      <label htmlFor={name}>
        Tobacco Use?{" "}
        <img
          data-tip
          data-for="tobaccoTip"
          width="20"
          src={ToolTipIcon}
          alt="tool tip"
        />
        <ReactTooltip
          backgroundColor="#fff"
          multiline={true}
          className="custom-tooltip"
          delayHide={0}
          border={true}
          borderColor="#a0a0a0"
          html={true}
          id="tobaccoTip"
          place="top"
          effect="solid"
        >
          Select yes if you have used tobacco products 4 or more times per week,
          on average, in the last 6 months. Tobacco use may impact your monthly
          premium.
        </ReactTooltip>
      </label>
      <div className="radio-btn-grid">
        <button
          className={radioBtnClass("1")}
          // className={`radio-btn ${values[name] === "1" ? "active" : ""}`}
          onClick={handleChange}
          type="button"
          value="1"
          id={name}
          name={name}
        >
          Yes
        </button>
        <button
          className={radioBtnClass("0")}
          // className={`radio-btn ${values[name] === "0" ? "active" : ""}`}
          onClick={handleChange}
          type="button"
          value="0"
          id={name}
          name={name}
        >
          No
        </button>
      </div>
      <ErrorMessage name={name} component="div" className="field-error" />
    </div>
  );
};

export default TobaccoField;
