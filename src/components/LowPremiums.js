import React from "react";
import { Link } from "gatsby";
import Image from "../assets/images/low-premiums.jpeg";

const LowPremiums = () => {
  return (
    <div className="custom-container">
      <div className="low-premiums">
        <div className="image">
          <img src={Image} alt="Whole Family Coverage" />
        </div>
        <div className="text">
          <h6>Insurance With Lower Monthly Premiums</h6>
          <p>
            Short term health insurance can provide temporary and limited
            benefits for a lower premium if you qualify. STM is not a
            replacement for comprehensive major medical coverage.
          </p>
          <button>
            <Link to="/health-insurance-plans/short-term/">
              Get Short Term Insurance
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LowPremiums;
