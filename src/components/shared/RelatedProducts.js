import { Link } from "gatsby";
import React from "react";
import { useWebsiteData } from "../../context/AppContext";
import BodyImage from "./BodyImage";

const RelatedProducts = ({ relatedProducts, title, subtitle, agentData }) => {
  const { dispatch } = useWebsiteData();
  return (
    <section className="related-products-section">
      <div className="container is-widescreen">
        <h3>{title || "Related Products"}</h3>
        {subtitle && <p className="related-product-subtitle">{subtitle}</p>}
        <div className="related-products-columns">
          {relatedProducts.map((item, key) => (
            <Link
              onClick={(e) => dispatch({ type: "tempAgent", value: agentData })}
              to={item.uri}
              key={key}
              className="related-product-card"
            >
              <div>
                <div className="related-product-card-icon">
                  <BodyImage image={item.products.productIcon} />
                </div>
                <h4 className="related-product-card-title">
                  {item.products.productName}
                </h4>
                <div
                  className="related-product-card-content"
                  dangerouslySetInnerHTML={{
                    __html: item.products.shortProductDescription,
                  }}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
