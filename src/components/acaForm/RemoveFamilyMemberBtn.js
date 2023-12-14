import React from "react";
import CloseIcon from "../../assets/svg/x-icon-list.svg";

const RemoveFamilyMemberBtn = ({ handleClick }) => {
  return (
    <div className="remove-row">
      <span onClick={handleClick}>
        Remove <img src={CloseIcon} alt="remove" />
      </span>
    </div>
  );
};

export default RemoveFamilyMemberBtn;
