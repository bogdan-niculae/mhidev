import React from "react";

const CoversSection = ({
  coversTitle,
  covers,
  doesNotCoversTitle,
  doesNotCover,
}) => {
  return (
    <section className="covers-section">
      <div className="rows covers-container">
        <div className="column">
          <h3>{coversTitle}</h3>
          <div
            className="covers-list-wrapper"
            dangerouslySetInnerHTML={{
              __html: covers,
            }}
          />
          {/* <ul className="covered">
            <li>Injuries sustained at work, while under the influence of drugs or alcohol or while participating in a high-risk activity like bungee jumping</li>
            <li>Injuries sustained at work, while under the influence of drugs or alcohol or while participating in a high-risk activity like bungee jumping</li>
            <li>Injuries sustained at work, while under the influence of drugs or alcohol or while participating in a high-risk activity like bungee jumping</li>
            <li>Injuries sustained at work, while under the influence of drugs or alcohol or while participating in a high-risk activity like bungee jumping</li>
            <li>Injuries sustained at work, while under the influence of drugs or alcohol or while participating in a high-risk activity like bungee jumping</li>
          </ul> */}
        </div>
        <div className="column">
          <h3>{doesNotCoversTitle}</h3>
          {/* <ul className="not-covered">
            <li>Injuries sustained at work, while under the influence of drugs or alcohol or while participating in a high-risk activity like bungee jumping</li>
            <li>Injuries sustained at work, while under the influence of drugs or alcohol or while participating in a high-risk activity like bungee jumping</li>
            <li>Injuries sustained at work, while under the influence of drugs or alcohol or while participating in a high-risk activity like bungee jumping</li>
            <li>Injuries sustained at work, while under the influence of drugs or alcohol or while participating in a high-risk activity like bungee jumping</li>
            <li>Injuries sustained at work, while under the influence of drugs or alcohol or while participating in a high-risk activity like bungee jumping</li>
          </ul> */}
          <div
            className="does-not-covers-list-wrapper"
            dangerouslySetInnerHTML={{
              __html: doesNotCover,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default CoversSection;
