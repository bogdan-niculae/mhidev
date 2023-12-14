import React from "react";
// ******** Components ********
import { StaticImage } from "gatsby-plugin-image";
import PhoneNumber from "./PhoneNumber";

const SpeakWithAgent = ({ phoneNumber }) => {
  return (
    <div className="speak-with-agent">
      <StaticImage
        src="../assets/images/speak_with_agent.png"
        className="speak-with-agent-image-dekstop"
        alt="Speak With Agent"
      />
      <StaticImage
        src="../assets/images/speak-with-agent-mobile.png"
        className="speak-with-agent-image-mobile"
        alt="Speak With Agent"
      />
      <div className="speak-with-agent-wrapper">
        <div className="speak-with-agent-content">
          <h2>Have Questions? Speak to an Agent</h2>
          <p>
            Speak to a licensed health insurance agent during business hours for
            help understanding your options and enrolling in coverage.
          </p>
          <button>
            Call
            {/* <a href={`${phoneNumber ? phoneNumber : "tel:888-855-6837"}`}>
              {phoneNumber ? phoneNumber : "888-855-6837"}
            </a> */}
            <PhoneNumber phoneNumber={phoneNumber} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpeakWithAgent;
