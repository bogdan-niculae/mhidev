import React, { useState } from "react";
// ******** Components ********
import { Form, Formik, Field } from "formik";
import BodyImage from "./BodyImage";
import FeaturedMedia from "./FeaturedMedia";
// ******** Data ********
import { states } from "../../config/states";

const FindYourAgentHero = ({
  image,
  mobileImage,
  title,
  subtitle,
  setFilters,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const renderStates = () =>
    states.map((state) => (
      <option key={state.value} value={state.label}>
        {state.label}
      </option>
    ));

  const handleSubmitForm = (values) => {
    setIsLoading(true);
    setTimeout(() => {
      setFilters(values);
      setIsLoading(false);
    }, 750);
  };

  return (
    <>
      <section className="find-your-agent-hero-section">
        <div className="find-your-agent-hero-content-wrapper">
          <div className="custom-container">
            <div className="find-your-agent-hero-content-columns">
              <div className="find-your-agent-hero-content">
                <h1>{title}</h1>
                <div
                  className="find-your-agent-hero-subtitle is"
                  dangerouslySetInnerHTML={{
                    __html: subtitle,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <FeaturedMedia className="is-hidden-mobile" image={image} />
        <BodyImage className="is-hidden-tablet" image={mobileImage} />
        <div className="overlay" />
      </section>
      <div className="zip-form-hero-subtitle find-your-agent-form">
        <div className="zip-form">
          <span>Find an agent licensed in your area</span>
          <Formik
            initialValues={{
              agentStates: "",
              agentBusinessCity: "",
              //   agentBusinessName: "",
              agentBussines: "",
            }}
            onSubmit={handleSubmitForm}
          >
            {({ values }) => (
              <Form className="find-your-agent-form">
                <div className="form-field">
                  <label>State</label>
                  <Field
                    as="select"
                    name="agentStates"
                    className={
                      values.agentStates === "" ? "select-placeholder" : ""
                    }
                  >
                    <option value="">Choose</option>
                    {renderStates()}
                  </Field>
                </div>
                <div className="form-field">
                  <label>City</label>
                  <Field
                    name="agentBusinessCity"
                    id="agentBusinessCity"
                    placeholder="Enter Your City"
                  />
                </div>
                <div className="form-field">
                  <label>Agent Business Name</label>
                  <Field
                    name="agentBussines"
                    id="agentBussines"
                    placeholder="Agent Business Name"
                  />
                </div>
                <button className="find-agent-submit" type="submit">
                  {isLoading ? "Searching..." : "Submit"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default FindYourAgentHero;
