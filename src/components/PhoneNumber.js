/* eslint-disable no-unused-vars */
import React from "react";
import { useWebsiteData } from "../context/AppContext";
import useLocalStorage from "../hooks/useLocalStorage";

const PhoneNumber = ({ dash, className, phoneNumber, children }) => {
  const { state, dispatch } = useWebsiteData();

  const renderPhoneNumber = () => {
    const { tempAgent, phoneNumber: contextPhoneNumber } = state;
    if (tempAgent) {
      const { agentBusinessPhoneNumber } = tempAgent;
      return (
        <a
          className={className ? className : ""}
          href={`tel:1${removedText(agentBusinessPhoneNumber)}`}
        >
          {children} {formatPhoneNumber(agentBusinessPhoneNumber)}
        </a>
      );
    }
    return (
      <a
        className={className ? className : ""}
        href={`tel:1${removedText(contextPhoneNumber)}`}
      >
        {children} {formatPhoneNumber(contextPhoneNumber)}
      </a>
    );
  };
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
  const removedText = (phoneNumber) => phoneNumber?.replace(/\D+/g, "");

  return phoneNumber ? (
    <a
      className={className ? className : ""}
      href={`tel:1${removedText(phoneNumber)}`}
    >
      {children} {formatPhoneNumber(phoneNumber)}
    </a>
  ) : (
    renderPhoneNumber()
  );
};

export default PhoneNumber;
