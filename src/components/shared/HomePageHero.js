import React from "react";
import BodyImage from "./BodyImage";
import FeaturedMedia from "./FeaturedMedia";

const HomePageHero = ({ image, mobileImage, children, className }) => {
  return (
    <section className="home-page-hero-section">
      <div className="home-page-hero-content-wrapper">
        <div className="custom-container">
          <div className="home-page-hero-content">{children}</div>
        </div>
      </div>
      <FeaturedMedia
        className={`is-hidden-mobile ${className ? className : ""}`}
        image={image}
      />
      <BodyImage className="is-hidden-tablet" image={mobileImage} />
      <div className="overlay" />
    </section>
  );
};

export default HomePageHero;
