import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import Layout from "../components/Layout";
import mhiOurTake from "../assets/images/mhi-logo.png";
import { Link } from "gatsby";
const MediaAlpha = ({ location }) => {
  const [country, setCountry] = useState(null);
  useEffect(() => {
    axios
      .get(
        `https://p1mjhxx5fg.execute-api.us-east-1.amazonaws.com/dev/api/v1/counties/by/zip/${location?.search.replace(
          "?",
          ""
        )}?apikey=${process.env.GATSBY_MARKET_ZIP}`
      )
      .then((results) => {
        setCountry(results.data.counties[0]);
      })
      .catch((error) => {
        return setCountry("");
      });
  });
  useEffect(() => {
    console.log("location", location);
    if (typeof window !== "undefined") {
      window.MediaAlphaExchange = {
        placement_id: "hxmlRbjKMKCELgxARI_e--nI51GTNg",
        version: "17",
        type: "ad_unit",
        ua_class: "auto",
        data: {
          zip: location?.search.replace("?", ""),
        },
      };
      window?.MediaAlphaExchange__load("target");
    }
  }, []);
  return (
    <Layout location={location}>
      <Helmet>
        <script src="//insurance.mediaalpha.com/js/serve.js"></script>
      </Helmet>
      <section className="media-alpha-hero-section">
        <div className="custom-container">
          <h2>
            Health insurance in {country && country.name},{" "}
            {country && country.state}
          </h2>
          <p>
            If you click on the following listings, you are leaving{" "}
            <Link to="/">myhealthinsurance.com*</Link>.
          </p>
        </div>
      </section>
      <section className="home-page-intro-section">
        <div className="container is-widescreen">
          <div id="target" />
        </div>
      </section>
      <section className="disclaimer-section">
        <div className="disclaimer-wrapper">
          <div className="custom-container">
            <div className="disclaimer-row">
              <div className="disclaimer-col">
                <img src={mhiOurTake} alt="mhi logo" />
              </div>
              <div className="disclaimer-col">
                <p>
                  *DISCLAIMER: These are paid advertisements. If you click on
                  one, you will leave <Link to="/">myhealthinsurance.com</Link>{" "}
                  Be a smart consumer and check the advertiser’s privacy policy
                  before providing your personal information.
                </p>
                <p>
                  An outside agency, MediaAlpha, manages these advertisements.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MediaAlpha;
