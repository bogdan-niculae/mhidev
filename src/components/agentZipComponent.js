import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
// ******** Components ********
import Zip from "./form/zipAgent";

const AgentZipComponent = () => {
  const validationSchema = Yup.object().shape({
    zip_code: Yup.string()
      .required("Required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(5, "Must be exactly 5 digits")
      .max(5, "Must be exactly 5 digits"),
  });
  return (
    <div className="agent-zip-component">
      <Formik
        initialValues={{
          zip_code: "",
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={(values) => {
          console.log("values", values);
        }}
      >
        {(props) => (
          <Form>
            <h2>Add your ZIP code</h2>
            <h6>
              You will be connected to a secure online shopping experience
            </h6>
            <div className="zip-content">
              <Zip
                {...props}
                placeholder="Enter your ZIP code:"
                labelText="Enter your ZIP code:"
              />
              <div className="submit-button">
                <button type="submit">Begin Your Quote</button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AgentZipComponent;
