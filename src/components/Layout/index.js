import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FooterAgent from "./FooterAgent";
import "../../assets/scss/main.scss";
import ReactTooltip from "react-tooltip";
import ScrollToTop from "react-scroll-to-top";
import { useWebsiteData } from "../../context/AppContext";

const Layout = ({
  children,
  agent,
  disclaimer,
  location,
  phoneNumber,
  product,
  productFootnotes,
  affinityFooter,
  navigationTitle,
  hideNavigation,
  hidePhoneHeader,
}) => {
  const [footnotesState, setFootnotesState] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const { dispatch, state } = useWebsiteData();
  const setSource = () => {
    if (typeof window !== `undefined` && !localStorage.getItem("source")) {
      localStorage.setItem("source", location.pathname);
    }
  };

  useEffect(() => {
    setSource();
    const dataContent = document.querySelectorAll(".footnoteLink");
    const myFunction = function (event) {
      setFootnotesState(false);
      document.getElementById(event.target.hash).scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    };
    [...dataContent].map((el, index) => {
      el.hash = `#FootnoteDetailsNo_${index + 1}`;
      el.id = `x${index + 1}`;
      el.innerText = `[${index + 1}]`;
      el.addEventListener("click", myFunction, false);
    });
    [...dataContent].map((e) => {
      // console.log(e.hash);
      // console.log(e.id);
      const listEl = document.createElement("li");
      const el = document.createElement("a");
      el.setAttribute("id", e.hash);
      el.setAttribute("href", `#${e.id}`);
      el.innerHTML = e.innerHTML;
      // el.outerText = e.dataset.content;
      // console.log(e.dataset.content);
      listEl.appendChild(el);
      listEl.insertAdjacentHTML("beforeend", e.dataset.content);
      // listEl.insertAdjacentText("beforeend", ` ${e.dataset.content}`);
      document.getElementById("product-footnotes-list").appendChild(listEl);
      // console.log(e);
    });
  }, []);

  return (
    <div className={`website-wrapper ${state?.colorTheme}`}>
      <ReactTooltip
        backgroundColor="#fff"
        multiline={true}
        className="custom-tooltip"
        delayHide={0}
        border={true}
        borderColor="#a0a0a0"
        html={true}
      />
      <Header
        hidePhoneHeader={hidePhoneHeader}
        phoneNumber={phoneNumber}
        navigationTitle={navigationTitle}
        hideNavigation={hideNavigation}
      />
      {children}
      <div
        className={`container is-widescreen footnotes-section ${
          productFootnotes ? "" : "is-hidden"
        } `}
      >
        <div className="product-footnotes">
          <button
            onClick={() => setFootnotesState(!footnotesState)}
            id="toggle-footnotes"
          >
            Footnotes
          </button>
          <ul
            id="product-footnotes-list"
            className={`product-footnotes ${footnotesState ? "is-hidden" : ""}`}
          ></ul>
        </div>
      </div>
      <ScrollToTop smooth className="scroll-to-top" top={100} />
      {agent ? (
        <FooterAgent disclaimer={disclaimer} />
      ) : (
        <Footer disclaimer={disclaimer} />
      )}
    </div>
  );
};

export default Layout;
