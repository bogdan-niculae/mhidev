import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import BodyImage from "./BodyImage";

const SectionBox = ({
  image,
  children,
  rightImg,
  className,
  sectionTitle,
  agent,
}) => {
  const renderImage = () => {
    if (image) {
      return <BodyImage image={image} />;
    } else if (agent) {
      return (
        <StaticImage
          alt="section image"
          src="../../assets/images/about-us-image.jpg"
          // width={610}
          // aspectRatio={16 / 7}
        />
      );
    } else {
      return null;
    }
  };
  return (
    <section className={`section-with-image ${className ? className : ""}`}>
      {sectionTitle && (
        <h3 className="section-with-image-title">{sectionTitle}</h3>
      )}
      <div
        className={`section-with-image-container ${
          rightImg ? "right-img-container" : ""
        }`}
      >
        {!rightImg && (
          <div className="section-with-image-wrapper">{renderImage()}</div>
        )}
        <div
          className={`section-with-image-content-wrapper ${
            rightImg ? "right-img-content-wrapper" : ""
          } `}
        >
          {children}
        </div>
        {rightImg && (
          <div className="section-with-image-wrapper">
            <BodyImage image={image} />
          </div>
        )}
      </div>
    </section>
  );
};

export default SectionBox;
