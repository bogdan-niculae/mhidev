import React from "react";
import PostPreview from "../PostPreview";

const Resources = ({ title, resources }) => {
  return (
    <section className="resources-section">
      <div className="container is-widescreen">
        <h3>{title}</h3>
        <div className="resources-columns">
          {resources.map((post, index) => {
            return <PostPreview key={index} post={post} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Resources;
