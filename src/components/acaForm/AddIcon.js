import React from "react";

const AddIcon = ({ fill = "#f78030", stroke = "#FFFFFF" }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="10" fill={fill} />
      <path d="M10 5L10 15" stroke={stroke} stroke-width="2" />
      <path d="M15 10L5 10" stroke={stroke} stroke-width="2" />
    </svg>
  );
};

export default AddIcon;
