import React from "react";
import parse from "html-react-parser";
import PhoneNumber from "../PhoneNumber";
import NeedHealthInsuranceForm from "./NeedHealthInsuranceForm";
import WholeFamilyCoverage from "../WholeFamilyCoverage";
import CombinationCoverage from "../CombinationCoverage";
import LowPremiums from "../LowPremiums";
import Banner from "./Banner";
export const Wysiwyg = ({ children, location, className, banner }) => {
  console.log(banner);
  const options = {
    replace: (domNode) => {
      // console.log(domNode);
      if (domNode.type && domNode.type === "tag") {
        // If this tag has children, and it is the first child.
        // This may cause issues, but I have not had issues with it.
        // The first array is usually a shortcode is the first and
        // only child of a tag node.
        const shortcode = domNode.children[0]?.data;

        // If we find the shortcode string, replace it with
        // our component
        if (domNode.attribs.class === "post-banner" && banner?.bannerUrl) {
          return (
            <div className="post-sidebar-banner-wrapper">
              <Banner banner={banner} />
            </div>
          );
        }
        if (shortcode === "[phone_number]") {
          return <PhoneNumber />;
        }

        if (shortcode === "[elementor-template id=”6353″]") {
          return <NeedHealthInsuranceForm location={location} />;
        }

        if (shortcode === `[elementor-template id=”16398″]`) {
          return <WholeFamilyCoverage />;
        }

        if (shortcode === `[elementor-template id=”16242″]`) {
          return <CombinationCoverage />;
        }

        if (shortcode === `[elementor-template id=”16382″]`) {
          return <LowPremiums />;
        }
      }
      return domNode;
    },
  };
  const reactElements = parse(children || "", options);

  return (
    <div className={`${className ? className : " "}`}>{reactElements}</div>
  );
};
