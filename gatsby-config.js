require("dotenv").config({
  path: `.env`,
});

// require .env.development or .env.production
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `My health Insurance`,
    description: `Get Individual Health Insurance You may qualify for a $0 Premium Bronze or Silver ACA plan as part of expanded subsidies under the 2021 American Rescue Plan Act. Shop ACA Plans Get Your Subsidy 2022 ACA Subsidy Calculator The calculator below reflects expanded premium tax credit eligibility as defined by the 2021 American Rescue Plan`,
    author: `@myhealthinsurance`,
    siteUrl: process.env.SITE_URL,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: process.env.WPGRAPHQL_URL,
        verbose: true,
        production: {
          allow404Images: true,
        },
        develop: {
          hardCacheMediaFiles: true,
        },
        debug: {
          graphql: {
            writeQueriesToDisk: true,
          },
        },
        html: {
          fallbackImageMaxWidth: 800,
          // useGatsbyImage: true,
          // createStaticFiles: true,
        },
        // fields can be excluded globally.
        // this example is for wp-graphql-gutenberg.
        // since we can get block data on the `block` field
        // we don't need these fields
        excludeFieldNames: [`blocksJSON`, `saveContent`],
        type: {
          Post: {
            limit: process.env.NODE_ENV === `development` ? 40 : null,
          },
          // this shows how to exclude entire types from the schema
          // this example is for wp-graphql-gutenberg
          CoreParagraphBlockAttributesV2: {
            exclude: true,
          },
        },
        schema: {
          timeout: 120000,
          perPage: 50,
        },
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/, // See below to configure properly
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-42510328-1",
        // this option places the tracking script into the head of the DOM
        head: true,
        // other options
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-WTL67WR",

        // Include GTM in development.
        //
        // Defaults to false meaning GTM will only be loaded in production.
        // includeInDevelopment: false,

        // datalayer to be set before GTM is loaded
        // should be an object or a function that is executed in the browser
        //
        // Defaults to null
        // defaultDataLayer: { platform: "gatsby" },

        // Specify optional GTM environment details.
        // gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING",
        // gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME",
        // dataLayerName: "YOUR_DATA_LAYER_NAME",

        // Name of the event that is triggered
        // on every Gatsby route change.
        //
        // Defaults to gatsby-route-change
        // routeChangeEventName: "YOUR_ROUTE_CHANGE_EVENT_NAME",
        // Defaults to false
        // enableWebVitalsTracking: true,
        // Defaults to https://www.googletagmanager.com
        // selfHostedOrigin: "YOUR_SELF_HOSTED_ORIGIN",
      },
    },
    {
      // See https://www.gatsbyjs.com/plugins/gatsby-plugin-manifest/?=gatsby-plugin-manifest
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `IHC Specialty Benefits - My Health Insurance`,
        short_name: `My Health Insurance`,
        description: `Get Individual Health Insurance You may qualify for a $0 Premium Bronze or Silver ACA plan as part of expanded subsidies under the 2021 American Rescue Plan Act. Shop ACA Plans Get Your Subsidy 2021 ACA Subsidy Calculator The calculator below reflects expanded premium tax credit eligibility as defined by the 2021 American Rescue Plan `,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#0074c9`,
        lang: `en`,
        display: `standalone`,
        icon: `${__dirname}/src/assets/images/logo-favicon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://www.myhealthinsurance.com",
        sitemap: "https://www.myhealthinsurance.com/sitemap/sitemap-index.xml",
        env: {
          development: {
            policy: [{ userAgent: "*", disallow: ["/"] }],
          },
          production: {
            policy:
              process.env.GATSBY_STAGE === "staging"
                ? [{ userAgent: "*", disallow: ["/"] }]
                : [{ userAgent: "*", allow: "/" }],
          },
        },
      },
    },
    `gatsby-plugin-sitemap`,
  ],
};
