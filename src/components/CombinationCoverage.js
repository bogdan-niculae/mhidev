import React from "react";
import Image from "../assets/images/combination-coverage-image.jpeg";
import PhoneNumber from "./PhoneNumber";

const CombinationCoverage = () => {
  return (
    <div className="custom-container">
      <div className="combination-coverage">
        <div className="text">
          <h6>Combination Coverage Customized For You</h6>
          <p>
            Missing coverage for some healthcare services or have high
            out-of-pocket costs on your major medical plan? Increase coverage or
            benefits with additional health insurance products and add-ons.
          </p>
          <p className="bold">Speak to a licensed agent today to learn more.</p>
          <button>
            <PhoneNumber />
            {/* <a href="tel:888-855-6837">888-855-6837</a> */}
          </button>
        </div>
        <div className="image">
          <img src={Image} alt="Combination Coverage" />
        </div>
      </div>
    </div>
  );
};

export default CombinationCoverage;
