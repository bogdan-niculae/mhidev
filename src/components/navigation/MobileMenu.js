import React from "react";
import { Link } from "gatsby";
import SubMenu from "./SubMenu";
import { useWebsiteData } from "../../context/AppContext";

const MobileMenu = ({ open, menuProducts, resources }) => {
  // eslint-disable-next-line no-unused-vars
  const { dispatch, state } = useWebsiteData();

  return (
    <div
      className={`mobile-navigation-wrapper ${open ? "open-mobile-menu" : ""}`}
    >
      <SubMenu item={menuProducts} menuTitle="Health Insurance Plans" />
      {/* <div className="mobile-nav-item">
        <Link>Medicare</Link>
      </div> */}
      <div className="mobile-nav-item">
        <Link
          onClick={() => dispatch({ type: "tempAgent", value: "" })}
          to={
            state.landingUrl.indexOf("/agent/") !== -1 ||
            state.landingUrl.indexOf("/affinity/") !== -1
              ? "/blog/"
              : "/local-health-insurance-option/"
          }
          className="navbar-item custom-navbar-item"
          activeClassName="active"
        >
          {state.landingUrl.indexOf("/agent/") !== -1 ||
          state.landingUrl.indexOf("/affinity/") !== -1
            ? "Health Insurance Articles"
            : "Local Health Insurance Option"}
        </Link>
      </div>
      <SubMenu item={resources} menuTitle="RESOURCES" />
    </div>
  );
};

export default MobileMenu;
