import React from "react";
// ******** Components ********
import FeaturedMedia from "./shared/FeaturedMedia";

const HeroSection = ({ image, title, subtitle, overlay, className }) => {
  return (
    <div className={`hero-section ${className ? className : ""}`}>
      <FeaturedMedia image={image} className="hero-image" />
      {overlay && <div className="overlay" />}
      <div className="hero-content">
        <div className="custom-container hero">
          <h1>{title}</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: subtitle,
            }}
            className="subtitle"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
