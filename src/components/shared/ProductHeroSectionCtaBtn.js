import React from "react";
import BodyImage from "./BodyImage";
import FeaturedMedia from "./FeaturedMedia";
import PhoneNumber from "../PhoneNumber";

const ProductHeroSectionCtaBtn = ({
  image,
  mobileImage,
  title,
  subtitle,
  location,
  phoneNumber,
}) => {
  return (
    <>
      <section className="product-hero-section">
        <div className="product-hero-content-wrapper">
          <div className="custom-container">
            <div className="product-hero-content-columns">
              <div className="product-hero-content">
                <h1>{title}</h1>
                <div
                  className="product-hero-subtitle is-hidden-mobile"
                  dangerouslySetInnerHTML={{
                    __html: subtitle,
                  }}
                />
              </div>
              <div className="zip-form cta-box-product is-hidden-touch">
                <span className="cta-box-title">
                  Learn more about {title} coverage options.
                </span>
                <span className="cta-box-subtitle">
                  Contact us to speak with a licensed insurance agent now.
                </span>
                {/* <button type="button"> */}
                <></>
                <PhoneNumber
                  phoneNumber={phoneNumber}
                  className="cta-btn-phone"
                >
                  Call
                </PhoneNumber>
                {/* </button> */}
              </div>
            </div>
          </div>
        </div>
        <FeaturedMedia className="is-hidden-mobile" image={image} />
        <BodyImage className="is-hidden-tablet" image={mobileImage} />
        <div className="overlay" />
      </section>
      <section className="zip-form-hero-subtitle is-hidden-desktop">
        <div className="zip-form cta-box-product">
          <span className="cta-box-title">
            Learn more about {title} coverage options.
          </span>
          <span className="cta-box-subtitle">
            Contact us to speak with a licensed insurance agent now.
          </span>
          {/* <button type="button"> */}
          <PhoneNumber phoneNumber={phoneNumber} className="cta-btn-phone">
            Call
          </PhoneNumber>
          {/* </button> */}
        </div>
        <div
          className="is-hidden-tablet subtitle-paragraph"
          dangerouslySetInnerHTML={{
            __html: subtitle,
          }}
        />
      </section>
    </>
  );
};

export default ProductHeroSectionCtaBtn;
