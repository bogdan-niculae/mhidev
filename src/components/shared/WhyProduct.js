import React from "react";
import BodyImage from "./BodyImage";

const WhyProduct = ({ product }) => {
  const {
    whyThisProductBoxOneContent,
    whyThisProductBoxOneTitle,
    whyThisProductBoxThreeContent,
    whyThisProductBoxThreeTitle,
    whyThisProductBoxTwoContent,
    whyThisProductBoxTwoTitle,
    whyThisProductSectionTitle,
    whyThisProductBoxOneIcon,
    whyThisProductBoxTwoIcon,
    whyThisProductBoxThreeIcon,
  } = product;

  return (
    <div className="why-product-section">
      <div className="container is-widescreen">
        {whyThisProductSectionTitle && <h3>{whyThisProductSectionTitle}</h3>}
        <div className="why-product-columns">
          <div className="why-product-column">
            <div className="why-product-icon">
              <BodyImage image={whyThisProductBoxOneIcon} />
            </div>
            <span className="why-product-title">
              {whyThisProductBoxOneTitle}
            </span>
            <p className="why-product-content">{whyThisProductBoxOneContent}</p>
          </div>
          <div className="why-product-column">
            <div className="why-product-icon">
              <BodyImage image={whyThisProductBoxTwoIcon} />
            </div>
            <span className="why-product-title">
              {whyThisProductBoxTwoTitle}
            </span>
            <p className="why-product-content">{whyThisProductBoxTwoContent}</p>
          </div>
          <div className="why-product-column">
            <div className="why-product-icon">
              <BodyImage image={whyThisProductBoxThreeIcon} />
            </div>
            <span className="why-product-title">
              {whyThisProductBoxThreeTitle}
            </span>
            <p className="why-product-content">
              {whyThisProductBoxThreeContent}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyProduct;
