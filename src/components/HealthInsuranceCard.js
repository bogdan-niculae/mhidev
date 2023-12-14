import React from "react";

const HealthInsuranceCard = ({ icon, title, children }) => {
  return (
    <div className="health-insurance-card">
      {/* <div className="health-insurance-card-icon"> */}
      <img src={icon} alt="icon" />
      {/* </div> */}
      <div className="health-insurance-card-title">{title}</div>
      {children}
    </div>
  );
};

export default HealthInsuranceCard;
