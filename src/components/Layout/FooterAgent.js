import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
// ******** Images ********
import MHILogo from "../../assets/images/logo.png";

const Footer = ({ disclaimer }) => {
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

  return (
    <div className="agent">
      <div className="footer-container">
        <div className="footer-links">{renderMenuItems()}</div>
        <div className="footer-logos">
          <div className="footer-logo">
            <img src={MHILogo} alt="IHC Specialty Benefits, Inc." />
          </div>
        </div>
        <div className="footer-text">
          <div className="footer-text-container">
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
          </div>
        </div>
        <div className="footer-copyright">
          © Copyright {new Date().getFullYear()} IHC Specialty Benfits, Inc. All
          Right Res
        </div>
      </div>
    </div>
  );
};

export default Footer;
