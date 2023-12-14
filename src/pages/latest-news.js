import React from "react";
import Footer from "../components/Layout/Footer";
import MhiLogo from "../assets/images/MHI_logo_246x70_v1.png";
import { StaticImage } from "gatsby-plugin-image";
import PhoneNumber from "../components/PhoneNumber";
import { Link, navigate } from "gatsby";
import Seo from "../components/Seo";
// import States from "../assets/images/States.png";
// import LogoImage from "../components/LogoImage";

const LatestNews = ({ location }) => {
  return (
    <div className="website-wrapper">
      <Seo
        title="Advertorial - myhealthinsurance.com"
        description="Thanks to the American Rescue Plan (ARP), an unprecedented number of Americans currently qualify for premium tax credits – health insurance subsidies that substantially lower the cost of individual health insurance."
        image="/images/advertorial.png"
        url="/latest-news/"
      />
      <>
        <div className="phone-header">
          <div className="container is-widescreen">
            <p>Advertorial</p>
          </div>
        </div>
        <nav className="navbar ">
          <div className="navbar-brand">
            {/* <a className="navbar-item" href="http://bulma.io">
          <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28" />
        </a> */}
            <img width="154" height="50" src={MhiLogo} alt="logo" />
          </div>
        </nav>
      </>
      <section className="home-page-hero-section advertorial-hero-section">
        <div className="home-page-hero-content-wrapper">
          <div className="custom-container">
            <div className="home-page-hero-content">
              <h1>
                Millions of Americans qualify for low-cost individual health
                insurance
              </h1>
            </div>
          </div>
        </div>
        <StaticImage
          className="is-hidden-mobile"
          src="../assets/images/advertorial.png"
          alt="advertorial hero"
          layout="fullWidth"
        />
        <StaticImage
          className="is-hidden-tablet"
          src="../assets/images/advertorial-mobile.png"
          alt="advertorial hero"
          layout="fullWidth"
        />
        <div className="overlay" />
      </section>
      <section className="advertorial-page">
        <h3>Health plans are more affordable for many</h3>
        <p>
          Thanks to the American Rescue Plan (ARP), an unprecedented number of
          Americans currently qualify for premium tax credits – health insurance
          subsidies that substantially{" "}
          <Link to="/">lower the cost of individual health insurance.</Link>{" "}
        </p>
        <p>Under the ARP, consumers are finding:</p>
        <ul>
          <li>There’s no income cap for subsidy eligibility</li>
          <li>A lower plan cost for those receiving subsidies</li>
        </ul>
        <p>
          That means that millions of Americans who buy their own health
          insurance – including the self-employed and others who don’t have
          employer-sponsored health benefits – have been finding comprehensive
          individual health insurance with lower premiums. In many cases,
          consumers are eligible for tax credits that mean they pay zero
          premiums for Affordable Care Act-compliant plans.{" "}
        </p>
        <h3>See whether you’re eligible for a subsidy</h3>
        <p>
          Use our health insurance subsidy calculator to see whether you’re
          eligible for a subsidy – and to see the amount of your your subsidy.
        </p>
        <div className="advertorial-btn">
          <PhoneNumber>Click to call </PhoneNumber>
        </div>
        <h3>Affordable plans with comprehensive coverage</h3>
        <p>
          Health plans considered ACA-compliant plans are required to include a
          list of essential health benefits. These include:
        </p>
        <ul>
          <li>hospitalization</li>
          <li>ambulatory services</li>
          <li>emergency services</li>
          <li>maternity and newborn care</li>
          <li>mental health and substance abuse treatment</li>
          <li>prescription drugs</li>
          <li>lab tests</li>
          <li>chronic disease management</li>
        </ul>
        <h3>Many can buy coverage right now</h3>
        <p>
          Consumers generally enroll in ACA-compliant individual health plans
          during the annual open enrollment period (which starts Nov. 1).
          However, <Link to="/">you may still be eligible</Link> for
          income-based premium subsidies and possibly cost-sharing subsidies –
          if you experience a qualifying life event.
        </p>
        <p>
          There are 13 qualifying events that trigger ACA special enrollment:
        </p>
        <ul>
          <li>Involuntary loss of coverage</li>
          <li>
            Individual plan renewing outside of the regular open enrollment
          </li>
          <li>Becoming a dependent or gaining a dependent?</li>
          <li>Marriage</li>
          <li>Divorce</li>
          <li>Becoming a United States citizen or lawfully present resident</li>
          <li>A permanent move</li>
          <li>An error or problem with enrollment</li>
          <li>
            Employer-sponsored plan becomes unaffordable or stops providing
            minimum value
          </li>
          <li>An income increase that moves you out of the coverage gap</li>
          <li>Gaining access to a QSEHRA or Individual Coverage HRA</li>
          <li>
            An income or circumstance change that makes you newly eligible (or
            ineligible) for subsidies or CSR
          </li>
          <li>Various exceptional circumstances</li>
        </ul>
        <h2>
          Not sure whether you’re eligible for special enrollment? Here’s how to
          find out:
        </h2>
        <p>
          You can call <PhoneNumber /> now or click on your state to find out
          online
        </p>
        <div onClick={() => navigate("/")}>
          <StaticImage
            className="states-image"
            src="../assets/images/States.png"
            alt="usa states"
            layout="fullWidth"
          />
        </div>

        {/* <img src={States} alt="usa-map" /> */}
        <div className="advertorial-btn">
          <PhoneNumber>Click to call </PhoneNumber>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LatestNews;
