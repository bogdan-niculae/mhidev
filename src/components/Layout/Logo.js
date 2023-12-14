import React from "react";
import { Link } from "gatsby";
// import useLocalStorage from "../../hooks/useLocalStorage";
// import LogoImage from "../LogoImage";
// import MhiLogo from "../../assets/images/logo.png";
// import BradsDeals_logo from "../../assets/images/BradsDeals_logo.png";

import LogoImage from "../LogoImage";
import MhiLogo from "../../assets/images/MHI_logo_246x70_v1.png";
import { useWebsiteData } from "../../context/AppContext";

const Logo = ({ affinityData }) => {
  // eslint-disable-next-line no-unused-vars
  const { dispatch, state } = useWebsiteData();

  return state.loading ? (
    <div className="logo-placeholder" />
  ) : (
    <Link
      className="navbar-item logo-wrapper"
      to={
        state.landingUrl.indexOf("/agent/") !== -1 ||
        state.landingUrl.indexOf("/affinity/") !== -1
          ? state.landingUrl
          : "/"
      }
    >
      {affinityData ? (
        <LogoImage image={affinityData?.affinity?.logo} />
      ) : (
        <img width="154" height="50" src={MhiLogo} alt="logo" />
      )}
    </Link>
  );
};

export default Logo;
