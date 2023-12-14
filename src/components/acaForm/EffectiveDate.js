import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EffectiveDate = ({ startDate, handleDateChange }) => {
  return (
    <div className="field-wrapper">
      <label htmlFor="effectiveDate">Effective Date</label>
      <ReactDatePicker
        name="effectiveDate"
        selected={startDate}
        onChange={handleDateChange}
        minDate={startDate}
        maxDate={new Date(2023, 1, 28)}
        showDisabledMonthNavigation
      />
    </div>
  );
};

export default EffectiveDate;
