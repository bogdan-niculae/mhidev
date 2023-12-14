import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const BodyImage = ({ image, className }) => {
  const imageData = getImage(image?.localFile);

  if (!imageData) return null;

  return (
    <div className={`${className ? className : ""}`}>
      <GatsbyImage alt={image.altText} image={imageData} />
    </div>
  );
};

export default BodyImage;
