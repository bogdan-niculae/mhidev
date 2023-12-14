import React, { useRef } from "react";
import Seo from "gatsby-plugin-wpgraphql-seo";
import Layout from "../components/Layout";
import HomeCalculator from "../components/homeCalculator";
import { graphql, navigate, Link } from "gatsby";
import NeedHealthInsuranceForm from "../components/shared/NeedHealthInsuranceForm";
import SpeakWithAgent from "../components/speakWithAgent";
import Resources from "../components/shared/Resources";
import SectionBox from "../components/shared/SectionBox";
import HomePageHero from "../components/shared/HomePageHero";
import { customSchema } from "../components/shared/customSchema";

const FrontPage = ({ data, location }) => {
  const calculatorRef = useRef(null);
  const { page } = data;

  const { featuredImage, homepage } = page;
  const {
    selectedArticles,
    featuredInsuranceImage,
    featuredInsuranceBoxTitle,
    featuredInsuranceBoxContent,
    featuredInsuranceSubTitle,
    featuredInsuranceTitle,
    featuredInsuranceDisclaimer,
    featuredInsuranceBoxButtonLink,
    introText,
    introTitle,
  } = homepage;

  const handleClickACAPlans = () => {
    navigate("/health-insurance-plans/aca/");
  };

  const scrollToTheForm = () => {
    calculatorRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // useEffect(() => {
  //   const checkLandingUrl = localStorage.getItem("landingPageUrl");
  //   if (checkLandingUrl.indexOf("/agent/") !== -1) {
  //     navigate(checkLandingUrl);
  //   }
  // }, []);

  return (
    <Layout location={location}>
      <Seo post={page} postSchema={customSchema(page.seo.schema.raw)} />
      <HomePageHero
        image={featuredImage}
        mobileImage={page?.mobileFeaturedImage?.mobileFeaturedImage}
        className="home-hero-image-tablet"
      >
        <h1>Get Individual Health Insurance</h1>
        <p>
          You may qualify for a $0 Premium Bronze or Silver ACA plan as part of
          expanded subsidies under the 2021 American Rescue Plan Act.
        </p>
        <div className="btn-wrapper">
          <button className="btn-gradient" onClick={handleClickACAPlans}>
            Shop ACA Plans
          </button>
          <button className="btn-outlined" onClick={scrollToTheForm}>
            Get Your Subsidy
          </button>
        </div>
      </HomePageHero>
      <section className="home-page-intro-section">
        <div className="container is-widescreen">
          <h2>{introTitle}</h2>
          <div
            className="intro-content"
            dangerouslySetInnerHTML={{
              __html: introText,
            }}
          />
        </div>
      </section>
      <HomeCalculator calculatorRef={calculatorRef} location={location} />
      <section className="blue-section-gradient featured-insurance-section">
        <h2>{featuredInsuranceTitle}</h2>
        <p className="featured-insurance-subheader">
          {featuredInsuranceSubTitle}
        </p>
        <SectionBox
          className="featured-insurance-content"
          image={featuredInsuranceImage}
        >
          <h3>{featuredInsuranceBoxTitle}</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: featuredInsuranceBoxContent,
            }}
          />
          <Link
            className="custom-btn featured-insurance-cta"
            to={featuredInsuranceBoxButtonLink.url}
          >
            {featuredInsuranceBoxButtonLink.title}
          </Link>
        </SectionBox>
      </section>
      <section className="featured-insurance-disclaimer-section">
        <div className="container is-widescreen">
          <p>{featuredInsuranceDisclaimer}</p>
        </div>
      </section>
      <NeedHealthInsuranceForm location={location} />
      <Resources
        title="Learn More About Health Insurance"
        resources={selectedArticles}
      />
      <SpeakWithAgent />
    </Layout>
  );
};

export const query = graphql`
  query frontPage($id: String!) {
    page: wpPage(id: { eq: $id }) {
      title
      uri
      content
      databaseId
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              # gatsbyImageData(layout: FIXED, quality: 90, height: 360, width: 1920, transformOptions: { trim: 5.3, cropFocus: NORTHEAST, fit: COVER })
              fixed(cropFocus: NORTHWEST) {
                base64
                tracedSVG
                aspectRatio
                srcWebp
                srcSetWebp
                originalName
              }
              gatsbyImageData(
                layout: FIXED
                quality: 90
                height: 360
                width: 1920
              )
            }
            publicURL
          }
          mediaDetails {
            width
            height
          }
        }
      }
      mobileFeaturedImage {
        mobileFeaturedImage {
          altText
          localFile {
            publicURL
            ...ProductHeroMobileImage
          }
        }
      }
      seo {
        title
        metaDesc
        focuskw
        metaKeywords
        opengraphTitle
        opengraphDescription
        opengraphImage {
          altText
          sourceUrl
          srcSet
        }
        twitterTitle
        twitterDescription
        twitterImage {
          altText
          sourceUrl
          srcSet
        }
        canonical
        cornerstone
        schema {
          articleType
          pageType
          raw
        }
      }
      homepage {
        articleSectionTitle
        featuredInsuranceBoxTitle
        featuredInsuranceBoxContent
        featuredInsuranceSubTitle
        featuredInsuranceTitle
        featuredInsuranceDisclaimer
        featuredInsuranceBoxButtonLink {
          title
          url
        }
        featuredInsuranceImage {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(width: 610, layout: CONSTRAINED)
            }
          }
        }
        heroImageTitle
        introText
        introTitle
        speakToAnAgentContent
        speakToAnAgentTitle
        firstHeroImageButton {
          target
          title
          url
        }
        selectedArticles {
          ...PostPreviewContent
        }
      }
    }
  }
`;

export default FrontPage;
