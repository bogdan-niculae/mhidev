import React from "react";
import Helmet from "react-helmet";

const Seo = ({ description, title, image, url, canonical }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="og:type" content="article" />
      <meta name="og:url" content={`${process.env.GATSBY_SITE_URL}${url}`} />
      <meta
        name="og:image"
        content={`${process.env.GATSBY_SITE_URL}${image}`}
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@MyHealthInsurance" />
      <meta name="twitter:site" content="@MyHealthInsurance" />
      <meta name="twitter:title" content={title} />
      <meta
        name="twitter:image"
        content={`${process.env.GATSBY_SITE_URL}${image}`}
      />

      <link rel="canonical" href={canonical} />
    </Helmet>
  );
};
export default Seo;
