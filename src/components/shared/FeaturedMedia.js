import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const FeaturedMedia = ({ image, className, placeholderImage }) => {
  const imageData = getImage(image?.node?.localFile);
  const placeholder = getImage(placeholderImage);
  // if (!imageData) return null

  return (
    <div className={`${className ? className : ""}`}>
      <GatsbyImage
        alt={image?.node?.altText || "placeholder"}
        image={imageData || placeholder}
      />
    </div>
  );
};

export default FeaturedMedia;
