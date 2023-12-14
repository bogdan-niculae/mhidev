import React, { useState } from "react";
import SectionBox from "./SectionBox";

const ProsAndCons = ({
  prosAndConsTitle,
  pros,
  cons,
  prosImage,
  consImage,
}) => {
  const [active, setActive] = useState(true);
  return (
    <section className="pros-and-cons-section">
      <h2>{prosAndConsTitle}</h2>
      <div className="pros-and-cons-buttons">
        <button
          onClick={() => setActive(true)}
          className={`btn-outlined ${active ? "active" : ""}`}
        >
          Pros
        </button>
        <button
          onClick={() => setActive(false)}
          className={`btn-outlined ${!active ? "active" : ""}`}
        >
          Cons
        </button>
      </div>
      <div className="blue-section-gradient">
        <div className="pros-and-cons-wrapper">
          <div className="container is-widescreen">
            <SectionBox
              className={`${active ? "" : "is-hidden"}`}
              image={prosImage}
            >
              <div
                className="section-list pros-list"
                dangerouslySetInnerHTML={{
                  __html: pros,
                }}
              />
            </SectionBox>
            <SectionBox
              className={`${!active ? "" : "is-hidden"}`}
              image={consImage}
            >
              <div
                className="section-list cons-list"
                dangerouslySetInnerHTML={{
                  __html: cons,
                }}
              />
            </SectionBox>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProsAndCons;
