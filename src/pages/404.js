import React from "react";
// ******** Components ********
import { navigate } from "gatsby";
import Layout from "../components/Layout";

const NotFoundPage = ({ location }) => {
  const handleClickBack = () => {
    navigate("/");
  };

  return (
    <Layout location={location}>
      <div className="not-found">
        <section className="blue">
          <h2>404</h2>
          <h1>Page Not Found</h1>
          <p>
            The page you are looking for does not exist; it may have been moved,
            or removed altogether. You might want to try the search function.
            Alternatively, return to the front page.
          </p>
          <button className="custom-btn" onClick={handleClickBack}>
            Go Back
          </button>
        </section>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
