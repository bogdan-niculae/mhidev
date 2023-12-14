import React from "react";
// import BoxIcon from "../../assets/svg/box-icon.svg";

const Box = ({ icon, title, children }) => {
  return (
    <div className="box-card">
      <div className="box-icon">
        <img src={icon} alt="icon" />
      </div>
      <div className="box-heading">
        <h2>{title}</h2>
      </div>
      <div className="box-content">{children}</div>
    </div>
  );
};

export default Box;
