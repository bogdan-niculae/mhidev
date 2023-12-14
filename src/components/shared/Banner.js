import React from "react";
import BodyImage from "./BodyImage";

const Banner = ({ banner }) => {
  return (
    <a target="_blank" rel="noreferrer" href={banner?.bannerUrl} alt="banner">
      <BodyImage image={banner?.bannerImage} />
    </a>
  );
};

export default Banner;
