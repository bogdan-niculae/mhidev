import { Link, navigate } from "gatsby";
import React, { useState } from "react";
import MobileMenu from "../navigation/MobileMenu";
import Logo from "./Logo";
import CloseIcon from "../../assets/svg/close-mobile-menu.svg";
import MobileMenuIcon from "../../assets/svg/open-mobile-menu.svg";
import SearchIcon from "../../assets/svg/search.svg";
import PhoneNumber from "../PhoneNumber";
import { useWebsiteData } from "../../context/AppContext";

const Header = ({
  phoneNumber,
  hideNavigation,
  navigationTitle,
  hidePhoneHeader,
}) => {
  // eslint-disable-next-line no-unused-vars
  const { dispatch, state } = useWebsiteData();

  const resources = [
    {
      title: "Obamacare Calculator",
      content: "Calculate your estimated subsidy",
      uri: "/obamacare-calculator/",
    },
    {
      title: "Glossary",
      content: "Health insurance terms defined",
      uri: "/glossary/",
    },
    {
      title: "FAQ",
      content: "Frequently asked questions about health insurance",
      uri: "/frequently-asked-questions/",
    },
    {
      title: "Health Insurance Articles",
      content:
        "Additional fixed indemnity benefits to help when you’re hospitalized.",
      uri: "/blog/",
    },
    {
      title: "ACA Affordability Calculator",
      content:
        "Use our 2023 ACA Affordability Calculator to see if you might be eligible for ACA premium subsidies – and your potential savings if you qualify.",
      uri: "/aca-affordability/",
    },
  ];

  const agentResources = [
    {
      title: "Obamacare Calculator",
      content: "Calculate your estimated subsidy",
      uri: "/obamacare-calculator/",
    },
    {
      title: "Glossary",
      content: "Health insurance terms defined",
      uri: "/glossary/",
    },
    {
      title: "FAQ",
      content: "Frequently asked questions about health insurance",
      uri: "/frequently-asked-questions/",
    },
    {
      title: "ACA Affordability Calculator",
      content:
        "Use our 2023 ACA Affordability Calculator to see if you might be eligible for ACA premium subsidies – and your potential savings if you qualify.",
      uri: "/aca-affordability/",
    },
  ];

  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const toggleMobileMenu = () => setOpenMobileMenu(!openMobileMenu);

  // eslint-disable-next-line no-unused-vars
  const [resourcesMenu, setResourcesMenu] = useState(resources);

  const handleClickSearchIcon = () => {
    navigate("/search");
  };
  const renderResources = (resources) =>
    resources.map((resource) => (
      <div key={resource.title} className="navbar-column">
        <Link
          onClick={() => dispatch({ type: "tempAgent", value: "" })}
          className="navbar-item"
          to={resource.uri}
          activeClassName="active"
        >
          <div className="navbar-content">
            <div className="navbar-content-title">{resource.title}</div>
            <div className="navbar-content-info">{resource.content}</div>
          </div>
        </Link>
      </div>
    ));
  return (
    <>
      {hidePhoneHeader ? null : (
        <div className="phone-header">
          <div className="container is-widescreen">
            <p>
              Connect with a licensed insurance agent at{" "}
              <PhoneNumber phoneNumber={phoneNumber} />
            </p>
          </div>
        </div>
      )}
      {hideNavigation ? (
        <nav className="navbar navbar-with-title">
          <div className="navbar-brand">
            <Logo affinityData={state?.affinityData} />
            <div className="navigation-title">{navigationTitle}</div>
          </div>
        </nav>
      ) : (
        <>
          <nav className="navbar ">
            <div className="navbar-brand">
              <Logo affinityData={state?.affinityData} />
              <div className="mobile-menu-wrapper">
                <img
                  src={SearchIcon}
                  alt="mobile menu"
                  onClick={() => navigate("/search/")}
                />
                <img
                  src={openMobileMenu ? CloseIcon : MobileMenuIcon}
                  onClick={toggleMobileMenu}
                  alt="mobile menu"
                />
              </div>
            </div>

            <div id="navMenubd-example" className="navbar-menu desktop-menu">
              <div className="navbar-start">
                <div className="navbar-item has-dropdown is-hoverable is-mega">
                  <div className="navbar-link custom-navbar-link">
                    Health insurance plans
                  </div>
                  <div
                    id="blogDropdown"
                    className="navbar-dropdown navbar-mega-menu-wrapper-dropdown"
                    data-style="width: 18rem;"
                  >
                    <div className="navbar-mega-menu-wrapper">
                      <div className="navbar-columns">
                        {state?.availableProducts.map((product) => (
                          <div
                            key={product?.products?.productName}
                            className="navbar-column"
                          >
                            <Link
                              onClick={() =>
                                dispatch({ type: "tempAgent", value: "" })
                              }
                              className="navbar-item"
                              to={product.uri}
                              activeClassName="active"
                            >
                              <div className="navbar-content">
                                <div className="navbar-content-title">
                                  {product?.products?.productName}
                                </div>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      product?.products
                                        ?.shortProductDescription,
                                  }}
                                  className="navbar-content-info"
                                />
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
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
                <div className="navbar-item has-dropdown is-hoverable is-mega">
                  <div className="navbar-link custom-navbar-link">
                    Resources
                  </div>
                  <div
                    id="blogDropdown"
                    className="navbar-dropdown navbar-mega-menu-wrapper-dropdown"
                    data-style="width: 18rem;"
                  >
                    <div className="navbar-mega-menu-wrapper">
                      <div className="navbar-columns">
                        {state?.landingUrl.indexOf("/agent/") !== -1
                          ? renderResources(agentResources)
                          : renderResources(resources)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="navbar-end">
                <img
                  src={SearchIcon}
                  alt="mobile menu"
                  onClick={handleClickSearchIcon}
                />
              </div>
            </div>
          </nav>
          <MobileMenu
            open={openMobileMenu}
            menuProducts={state?.availableProducts}
            resources={resourcesMenu}
          />
        </>
      )}
    </>
  );
};

export default Header;
