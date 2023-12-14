import React from "react";
import { Link } from "gatsby";
// ******** Images ********
import CallIcon from "../../assets/svg/call_icon.svg";
import LocationIcon from "../../assets/svg/location_icon.svg";
import AgentPlaceholder from "../../assets/images/agent-placeholder.png";
import BodyImage from "./BodyImage";
// ******** Data ********
import { states } from "../../config/states";

const Agent = ({ agent }) => {
  const formatPhoneNumber = (phoneNumberString) => {
    if (phoneNumberString) {
      let cleaned = ("" + phoneNumberString).replace(/\D/g, "");
      let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        return "(" + match[1] + ") " + match[2] + "-" + match[3];
      }
      return null;
    }
  };

  const getAgentImage = (agentImage) => {
    if (agentImage) {
      return <BodyImage image={agentImage} />;
    } else {
      return <img src={AgentPlaceholder} alt="agent" />;
    }
  };
  const getStateAbbreviation = (fullStateName) => {
    if (fullStateName) {
      let state = states.find((state) => state.label === fullStateName);
      if (state) {
        return state.value;
      }
    }
  };
  return (
    <div className="agent">
      <div className="agent-image">
        {getAgentImage(agent?.agentBusinessProfileImage)}
      </div>
      <div className="agent-info">
        <p className="name">
          {agent?.agentFirstName} {agent?.agentLastName}
        </p>
        <span className="location">
          <img src={LocationIcon} alt="Agent Location" />{" "}
          {`${agent?.agentBusinessCity}, ${getStateAbbreviation(
            agent?.agentBusinessState
          )}`}
        </span>
        <span className="phone">
          <img src={CallIcon} alt="Agent Phone number" />
          {formatPhoneNumber(agent?.agentBusinessPhoneNumber)}
        </span>
        <span className="business-name">{agent?.agentBusinessName}</span>
        <Link to={agent.uri} className="consultation-link">
          Free Consultation
        </Link>
      </div>
    </div>
  );
};

export default Agent;
