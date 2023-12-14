import React from "react";
import MhiLogo from "../assets/images/MHI_logo_246x70_v1.png";
import { StaticImage } from "gatsby-plugin-image";
import Footer from "../components/Layout/Footer";
import Seo from "../components/Seo";
const CircleOfChampionsPage = ({ location }) => {
  return (
    <div className="circle-of-champions-page">
      <Seo
        title="Marketplace Circle of Champions - myhealthinsurance.com"
        description="IHC Specialty Benefits, Inc. achieves Elite Plus status in the Marketplace Circle of Champions"
        image="/images/Champions-Badge.png"
        url="/circle-of-champions/"
      />
      <section className="nav-section">
        <img width="154" height="50" src={MhiLogo} alt="mhi logo" />
      </section>
      <section className="heading-banner-section">
        <div className="heading-banner-wrapper">
          <h1>
            IHC Specialty Benefits, Inc. achieves Elite Plus status in the
            Marketplace Circle of Champions
          </h1>
          <StaticImage
            // aspectRatio={2.6}
            width={210}
            height={210}
            src="../assets/images/Champions-Badge.png"
            alt="Champions-Badge"
          />
        </div>
      </section>
      <section className="circle-of-champions-content-section">
        <div className="circle-of-champions-content-wrapper">
          <p>
            St. Louis Park, MN — IHC Specialty Benefits, Inc., an agency whose
            principal agent is Brian Dow, has been recognized by the Health
            Insurance Marketplace® for enrolling over 500 consumers in qualified
            health plans during this Open Enrollment Period.
          </p>
          <p>
            This recognition from the Centers for Medicare & Medicaid Services
            (CMS) as an Elite Plus member of the 2023 Marketplace Circle of
            Champions underscores IHC Specialty Benefits, Inc.’s achievement as
            one of the highest performing agents. Elite Plus is the highest
            designation in the Marketplace Circle of Champions program.
          </p>
          <p>
            “Agents and brokers are key partners to CMS in our shared goals of
            helping expand access to coverage for Americans,” said Ellen Montz,
            Director of the Center for Consumer Information & Insurance
            Oversight within CMS, which oversees the Marketplace. “We thank IHC
            Specialty Benefits, Inc. for their dedication to providing
            exceptional service and helping access coverage.”
          </p>
          <p>
            This year’s Open Enrollment Period for applying for Marketplace
            coverage runs from Nov. 1, 2022, to Jan. 15, 2023. Consumers with
            questions about their coverage or who would like help enrolling can
            contact IHC Specialty Benefits, Inc. at{" "}
            <a href="tel:18882802588">888-280-2588</a>.
          </p>
          <h3>What is the Marketplace Circle of Champions?</h3>
          <p>
            CMS created the Marketplace Circle of Champions program to
            commemorate the hard work and commitment of Marketplace-registered
            agents and brokers throughout America. This award recognizes agents
            and brokers who have actively enrolled 20 or more consumers. Each
            year, thousands of agents and brokers reach the Marketplace Circle
            of Champions, highlighting their hard work, expertise, and service.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CircleOfChampionsPage;
