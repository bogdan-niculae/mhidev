import React, { useState } from "react";
import arrowUp from "../../assets/svg/accordion-up.svg";
import arrowDown from "../../assets/svg/accordion-down.svg";
import { Wysiwyg } from "./Wysiwyg";

const Accordion = ({ title, content }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className={`accordion-wrapper ${isOpen ? "accordion-open" : ""}`}>
      <div
        className={`accordion-title ${isOpen ? "open" : ""}`}
        onClick={() => setOpen(!isOpen)}
      >
        {title} <img src={isOpen ? arrowUp : arrowDown} alt={`open ${title}`} />
      </div>
      <div className={`accordion-item ${!isOpen ? "collapsed" : ""}`}>
        <Wysiwyg className="accordion-content">{content}</Wysiwyg>
      </div>
    </div>
  );
};

export default Accordion;
