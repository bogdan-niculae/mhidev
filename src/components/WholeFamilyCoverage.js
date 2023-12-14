import React from "react";
import { Link } from "gatsby";
import Image from "../assets/images/whole-gamily-coverage.jpeg";

const WholeFamilyCoverage = () => {
  return (
    <div className="custom-container">
      <div className="whole-family-coverage">
        <div className="text">
          <h6>Do You Qualify for an Affordable Care Act Subsidy?</h6>
          <p>
            Use the ACA Subsidy Calculator to find out if you can get financial
            help if you enroll in ACA-qualifying major medical insurance.{" "}
            <Link to="/">Learn more about subsidies.</Link>
          </p>
          <button>
            <Link to="/obamacare-calculator/">Get Your Subsidy Amount!</Link>
          </button>
        </div>
        <div className="image">
          <img src={Image} alt="Whole Family Coverage" />
        </div>
      </div>
    </div>
  );
};

export default WholeFamilyCoverage;
