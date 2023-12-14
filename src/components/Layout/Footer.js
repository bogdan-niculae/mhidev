import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
// ******** Images ********
import IHCLogo from "../../assets/images/IHCSpecialty_Logo_white-01.svg";
import BlueSealLogo from "../../assets/images/blue_seal_footer_logo.svg";
// import BradsDeals_logo from "../../assets/images/BradsDeals_logo.png";
import IHC_logo from "../../assets/images/IHCSpecialtyNew.svg";
import LogoImage from "../LogoImage";
import { useWebsiteData } from "../../context/AppContext";

const Footer = ({ disclaimer }) => {
  // const [affinityFooter, setAffinityFooter] = useState(null);
  // const [affinityData, setAffinityData] = useState();
  // eslint-disable-next-line no-unused-vars
  const { dispatch, state } = useWebsiteData();
  const { wpMenu } = useStaticQuery(graphql`
    {
      wpMenu(slug: { eq: "footer-menu" }) {
        id
        menuItems {
          nodes {
            label
            url
            databaseId
            connectedNode {
              node {
                uri
              }
            }
          }
        }
      }
    }
  `);

  const renderMenuItems = () => {
    if (wpMenu?.menuItems?.nodes) {
      return wpMenu.menuItems.nodes.map((menuItem, i) => {
        const path = menuItem?.connectedNode?.node?.uri ?? menuItem.url;

        const itemId = "menu-item-" + menuItem.databaseId;

        return (
          <div id={itemId} key={i + menuItem.url} className="footer-link">
            <Link to={path}>{menuItem.label}</Link>
          </div>
        );
      });
    }
  };

  return state?.affinityData ? (
    <footer className="affinity-footer">
      <div className="affinity-footer-menu">
        <div className="footer-links">
          <div className="footer-link">
            <Link to="/about-us/">About Us</Link>
          </div>
          <div className="footer-link">
            <Link to="/terms/">Terms of Use</Link>
          </div>
          <div className="footer-link">
            <Link to="/privacy/">Privacy Policy</Link>
          </div>
          <div className="footer-link">
            <Link to="/site-map/">Sitemap</Link>
          </div>
        </div>
      </div>
      <div className="affinity-footer-logos">
        <div className="custom-container">
          <div className="footer-logo-wrapper">
            <div className="footer-logo">
              <LogoImage
                className="affinity-logo-footer"
                image={state?.affinityData?.affinity?.logo}
              />
            </div>
            <div className="footer-logo">
              <img width="263px" src={IHC_logo} alt="Ihc" />
            </div>
          </div>
        </div>
      </div>
      <div className="affinity-footer-disclaimer">
        {state?.affinityData?.affinity?.affinityDisclaimer ? (
          <>
            <div
              className="custom-container"
              dangerouslySetInnerHTML={{
                __html: disclaimer
                  ? disclaimer
                  : state?.affinityData?.affinity?.affinityDisclaimer,
              }}
            />
            <div className="footer-copyright">
              © Copyright {new Date().getFullYear()} IHC Specialty Benefits,
              Inc. All rights reserved.
            </div>
          </>
        ) : (
          <div className="custom-container">
            <p>
              IHC Specialty Benefits, Inc., 5353 Wayzata Blvd, Ste. 300, St.
              Louis Park, MN, 55416 (IHCSB), is an independent licensed
              insurance agency. THIS IS A SOLICITATION OFINSURANCE BY IHCSB.
              Contact may be made by an insurance agent/producer or insurance
              company. Product availability may vary based on state. Neither
              IHCSB are affiliated with, connected to, or endorsed by Centers
              for Medicare and Medicaid Services, including the federal Medicare
              program. For complete listing of products, contact 1-800-MEDICARE
              or visit medicare.gov.
            </p>
            <div className="footer-copyright">
              © Copyright {new Date().getFullYear()} My Health Insurance, All
              Rights Reserved
            </div>
          </div>
        )}
      </div>
    </footer>
  ) : (
    <footer>
      <div className="footer-container">
        <div className="footer-links">{renderMenuItems()}</div>
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
        <div className="footer-text">
          <p>
            IHC Specialty Benefits, Inc., 5353 Wayzata Blvd, Ste. 300, St. Louis
            Park, MN, 55416 (IHCSB), is an independent licensed insurance
            agency. THIS IS A SOLICITATION OF INSURANCE BY IHCSB. Contact may be
            made by an insurance agent/producer or insurance company. Product
            availability may vary based on state. Neither IHCSB are affiliated
            with, connected to, or endorsed by Centers for Medicare and Medicaid
            Services, including the federal Medicare program. For complete
            listing of products, contact 1-800-MEDICARE or visit{" "}
            <a
              href="https://www.medicare.gov/"
              target="_blank"
              rel="noreferrer"
            >
              medicare.gov
            </a>
            . This website is operated by IHCSB and is not the Health Insurance
            Marketplace (
            <a
              href="https://www.healthcare.gov/"
              target="_blank"
              rel="noreferrer"
            >
              healthcare.gov
            </a>
            ). In offering this website, IHCSB is required to comply with all
            applicable federal law.
          </p>
        </div>
        <div className="footer-copyright">
          © Copyright {new Date().getFullYear()} IHC Specialty Benefits, Inc.
          All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
