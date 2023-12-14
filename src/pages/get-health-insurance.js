import React, { useRef } from "react";
import LogoImg from "../assets/images/MHI_logo_246x70_v1.png";
import IconOne from "../assets/images/lincesed-agent-icon.png";
import IconTwo from "../assets/images/wide-selectio-incon.png";
import IconThree from "../assets/images/premium-subsidies-icon.png";
import IconFour from "../assets/images/no-fees-icon.png";
import IHCLogo from "../assets/images/IHCSpecialty_Logo_white-01.svg";
import BlueSealLogo from "../assets/images/blue_seal_footer_logo.svg";
import HealthInsuranceCard from "../components/HealthInsuranceCard";
import CompanyOneLogo from "../assets/images/logos/aetna.png";
import CompanyTwoLogo from "../assets/images/logos/ambetter.png";
import CompanyThreeLogo from "../assets/images/logos/cigna.png";
import CompanyFourLogo from "../assets/images/logos/united.png";
import Seo from "../components/Seo";
import { setUtmParams } from "../components/form/products";
// import CloseIcon from "../assets/svg/Close_icon.svg";
// import { isAfter } from "date-fns";
const GetHealthInsurancePage = ({ location }) => {
  const myRef = useRef(null);
  const footerRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();
  const executeScrollFooter = () => footerRef.current.scrollIntoView();
  const handleLink = async () => {
    window.location.assign(
      `https://www.healthsherpa.com/?_agent_id=myhealthinsurance&${await setUtmParams()}`
    );
  };
  // const setEnrolBannerState = () => {
  //   if (isAfter(new Date(), new Date(2022, 11, 16))) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };
  // const [banner, setBanner] = useState(setEnrolBannerState());
  return (
    <>
      {/* {banner && (
        <div className={`health-insurance-banner`}>
          <span className="banner-content">
            Enroll by Dec. 15 for coverage effective Jan. 1
          </span>

          <img
            onClick={() => setBanner(false)}
            className="close"
            src={CloseIcon}
            alt="close"
          />
        </div>
      )} */}

      <div className={`health-insurance-page`}>
        <Seo
          url="/get-health-insurance/"
          title="See your health insurance coverage options now."
          description="Compare ACA - Obamacare plans in one place. Whether you're searching for coverage for yourself or your family, We can help you pick the most affordable plan."
        />
        <nav className="health-insurance-nav">
          <div className="custom-container">
            <div className="">
              <img width="154" height="50" src={LogoImg} alt="logo" />
            </div>
          </div>
        </nav>
        <section className="health-insurance-banner-section">
          <div className="custom-container">
            <div className="health-insurance-banner-content">
              <h1>See your health insurance coverage options now.</h1>
              <p>Find affordable individual and family plans</p>
              <span
                className="health-insurance-banner-cta"
                onClick={handleLink}
              >
                Explore health insurance options
              </span>
            </div>
          </div>
        </section>
        <section className="health-insurance-main-section">
          <div className="custom-container">
            <h2>
              Affordable Care Act individual and family health insurance plans.
            </h2>
            <div className="health-insurance-main-grid">
              <div className="health-insurance-main-grid-col">
                <h3>Compare ACA/Obamacare plans in one place</h3>
                <p>
                  We offer hundreds of plans from highly rated insurance
                  carriers.
                </p>
                <p>
                  Whether you’re searching for coverage for yourself or your
                  family, we can help you pick the most affordable plan that
                  best fits your needs.
                </p>
                <span onClick={handleLink}>Get a quote</span>
              </div>
              <div className="health-insurance-main-grid-col video-col">
                <iframe
                  src="https://www.youtube.com/embed/bxDoitNmnd8?rel=0"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen=""
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="companies-section">
          <div className="custom-container">
            <h3>
              Plans are available from top health insurance companies and may
              include:
            </h3>
            <div className="companies-grid">
              <img src={CompanyFourLogo} alt="" />
              <img src={CompanyTwoLogo} alt="" />
              <img src={CompanyThreeLogo} alt="" />
              <img src={CompanyOneLogo} alt="" />
            </div>
          </div>
        </section>
        <section className="health-insurance-cards-section">
          <div className="custom-container">
            <h3>What we offer</h3>
            <div className="health-insurance-cards-grid">
              <HealthInsuranceCard title="Licensed agents" icon={IconOne}>
                <p className="health-insurance-card-content">
                  Talk with experienced licensed agents to help you pick the
                  most affordable plan that best fits your needs.
                </p>
              </HealthInsuranceCard>
              <HealthInsuranceCard title="Wide selection" icon={IconTwo}>
                <p className="health-insurance-card-content">
                  We offer hundreds of plans from highly rated insurance
                  carriers.
                  <span
                    style={{ fontSize: "12px", cursor: "pointer" }}
                    ref={myRef}
                    onClick={executeScrollFooter}
                  >
                    1
                  </span>
                </p>
              </HealthInsuranceCard>
              <HealthInsuranceCard title="Premium subsidies" icon={IconThree}>
                <p className="health-insurance-card-content">
                  Easily find out whether you qualify for immediate tax credits
                  to lower your premiums.
                </p>
              </HealthInsuranceCard>
              <HealthInsuranceCard title="No fees" icon={IconFour}>
                <p className="health-insurance-card-content">
                  Our services are provided at no cost to you. Contact us to
                  speak with an experienced, licensed insurance agent to find
                  the plans that meet your needs.
                </p>
              </HealthInsuranceCard>
            </div>
          </div>
        </section>
        <footer className="health-insurance-footer">
          <div className="custom-container">
            <div className="health-insurance-footer-content">
              <p>
                <span
                  ref={footerRef}
                  style={{ fontSize: "12px", cursor: "pointer" }}
                  onClick={executeScroll}
                >
                  [1]
                </span>
                Best's Credit RatingsTM are under continuous review and subject
                to change and/or affirmation. For the latest Best's Credit
                RatingsTM and Best's Credit Reports (which include Best's Credit
                RatingsTM), visit the A.M. Best website at{" "}
                <a href="https://web.ambest.com/home">ambest.com</a>. See Guide
                to Best's Credit RatingsTM for explanation of use and charges. A
                Best's Financial Strength Rating opinion addresses the relative
                ability of an insurer to meet its ongoing insurance obligations.
                It is not a warranty of a company's financial strength and
                ability to meet its obligations to policyholders.
              </p>
              <div className="footer-logos">
                <div className="footer-logo">
                  <img
                    width="263px"
                    src={IHCLogo}
                    alt="IHC Specialty Benefits, Inc."
                  />
                </div>
                <div className="footer-logo">
                  <img src={BlueSealLogo} alt="BBB Accredited Business" />
                </div>
              </div>

              <p>
                IHC Specialty Benefits, Inc., 5353 Wayzata Blvd, Ste. 300, St.
                Louis Park, MN, 55416 (IHCSB), is an independent licensed
                insurance agency. THIS IS A SOLICITATION OF INSURANCE BY IHCSB.
                Contact may be made by an insurance agent/producer or insurance
                company. Product availability may vary based on state. Neither
                IHCSB are affiliated with, connected to, or endorsed by Centers
                for Medicare and Medicaid Services, including the federal
                Medicare program. For complete listing of products, contact
                1-800-MEDICARE or visit{" "}
                <a
                  href="https://www.medicare.gov/"
                  target="_blank"
                  rel="noreferrer"
                >
                  medicare.gov
                </a>
                . This website is operated by IHCSB and is not the Health
                Insurance Marketplace (
                <a
                  href="https://www.healthcare.gov/"
                  target="_blank"
                  rel="noreferrer"
                >
                  healthcare.gov
                </a>
                ). In offering this website, IHCSB is required to comply with
                all applicable federal law.
              </p>
              <div className="footer-copyright">
                © Copyright {new Date().getFullYear()} IHC Specialty Benefits,
                Inc. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default GetHealthInsurancePage;
