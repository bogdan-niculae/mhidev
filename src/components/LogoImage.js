import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const LogoImage = ({ image, className }) => {
  const imageData = getImage(image?.localFile);
  console.log(imageData);
  if (!imageData) return null;

  return (
    <div className={`logo-image ${className ? className : ""}`}>
      <GatsbyImage alt={image.altText} image={imageData} />
    </div>
  );
};

export default LogoImage;
