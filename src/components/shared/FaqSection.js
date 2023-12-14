import React from "react";
import Accordion from "./Accordion";

const FaqSection = ({ title, faqData }) => {
  // const faqAsc = [...faqData.reverse()];
  return (
    <section className="faq-section">
      <div className="container is-widescreen">
        <h2>{title}</h2>
        {faqData.map((item, key) => (
          <Accordion title={item.title} content={item.content} key={key} />
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
