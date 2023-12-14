import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import { format } from "date-fns";
import Seo from "gatsby-plugin-wpgraphql-seo";
// ******** Components ********
import { Link } from "gatsby";
import Layout from "../components/Layout";
import FeaturedMedia from "../components/shared/FeaturedMedia";
import SpeakWithAgent from "../components/speakWithAgent";
// ******** Images ********
import CategorySaveIcon from "../assets/images/save-category.svg";
import { Wysiwyg } from "../components/shared/Wysiwyg";
import { customSchema } from "../components/shared/customSchema";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const Post = ({ data, location }) => {
  const [blogProductionMentioned, setBlogProductionMentioned] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [footnotesState, setFootnotesState] = useState(false);
  // Post data
  const { post, imagePost, placeholderImage } = data;

  const blogProduct = post?.postsProductSelector?.blogProducts;
  const categoryName = post?.categories?.nodes[0].name;
  const categoryLink = post?.categories?.nodes[0].uri;
  // const authorImage = post?.author?.node?.avatar?.url;
  // const authorName = post?.author?.node?.name;
  const postDate = post?.date && format(new Date(post?.date), "LLLL do, yyyy");
  const authorName = post?.author?.node?.name;
  const authorImage = getImage(post?.author?.node?.avatar?.imageFile);

  // const authorImage = post?.author?.node?.avatar?.imageFile;
  const authorVisibility = post?.showauthor === "visible" ? true : false;
  console.log(authorVisibility);
  useEffect(() => {
    if (blogProduct?.length > 0) {
      let allProducts = [];
      blogProduct.forEach((product) => {
        let data = {
          ...product,
          isActive: false,
        };
        allProducts.push(data);
      });
      setBlogProductionMentioned(allProducts);
    }
  }, [blogProduct]);

  useEffect(() => {
    const postHeadings = Array.from(
      document.querySelectorAll(".post-content h2")
    );

    const setHeadingId = (headerContent) => {
      //Strip and prepare for URL
      console.log(headerContent);
      headerContent = headerContent
        .replace(/\W/g, "-")
        .toLowerCase()
        .replace("_", "-")
        .replace("--", "-");
      headerContent = headerContent.replace("------", "-");
      headerContent = headerContent.replace("-----", "-");
      headerContent = headerContent.replace("----", "-");
      headerContent = headerContent.replace("---", "-");
      headerContent = headerContent.replace("--", "-");

      if (headerContent.substring(headerContent.length - 1) == "-") {
        headerContent = headerContent.substring(0, headerContent.length - 1);
      }
      return headerContent;
    };

    postHeadings.map((item) => {
      item.setAttribute("id", setHeadingId(item.textContent));
    });
  }, []);

  // useEffect(() => {
  //   const footnoteLink = document.getElementsByClassName("footnoteLink");
  //   const toggleBtn = document.getElementById("toggle-footnotes");

  //   const myFunction = function () {
  //     setFootnotesState(true);
  //   };

  //   toggleBtn.onclick = function () {
  //     setFootnotesState(!footnotesState);
  //   };

  //   Array.from(footnoteLink).map((item) =>
  //     item.addEventListener("click", myFunction, false)
  //   );
  // });

  const handleClickBlogProduct = (id) => () => {
    let allBlogProducts = [...blogProduct];
    allBlogProducts.forEach((product) => {
      if (product.id === id) {
        product.isActive = !product.isActive;
      } else {
        product.isActive = false;
      }
    });
    setBlogProductionMentioned(allBlogProducts);
  };

  const renderBlogProducts = () => {
    if (blogProductionMentioned?.length > 0) {
      return blogProductionMentioned.map((product) => (
        <span
          onClick={handleClickBlogProduct(product.id)}
          key={product.id}
          className={product.isActive ? "btn is-active" : "btn"}
        >
          {product.title}
        </span>
      ));
    }
  };

  const renderBlogProductsDescription = () => {
    if (blogProductionMentioned?.length > 0) {
      return blogProductionMentioned.map((product) => {
        if (product.isActive) {
          return (
            <div className="text-section" key={product.uri}>
              <div
                dangerouslySetInnerHTML={{
                  __html: product?.products?.shortProductDescription,
                }}
              ></div>
              <Link to={product.uri}>Get a {product.title} Quote</Link>
            </div>
          );
        } else {
          return null;
        }
      });
    } else {
      return null;
    }
  };

  // const customSchema = post.seo.schema.raw
  //   .replace(/18.214.164.211/g, "www.myhealthinsurance.com")
  //   .replace(/"item":"\/"/gi, `"item":"https://www.myhealthinsurance.com/"`);

  return (
    <>
      <Seo post={post} postSchema={customSchema(post.seo.schema.raw)} />
      <Layout location={location} productFootnotes>
        <div
          className={`single-post ${
            footnotesState ? "show-footnotes" : "hide-footnotes"
          }`}
        >
          <div className="post-header">
            <FeaturedMedia
              placeholderImage={placeholderImage}
              image={imagePost?.featuredImage}
              className="post-featured-image-mobile"
            />
            <FeaturedMedia
              placeholderImage={placeholderImage}
              image={post?.featuredImage}
              className="post-featured-image-desktop"
            />
            <div className="post-header-content">
              <div className="content">
                <div className="post-category">
                  <Link to={categoryLink}>
                    <img src={CategorySaveIcon} alt="Category Icon" />
                    <span>{categoryName}</span>
                  </Link>
                </div>
                <h1>{post.title}</h1>
                <div className="post-author">
                  {authorVisibility && (
                    <div className="author-image">
                      <GatsbyImage image={authorImage} alt="author" />
                      {/* <img src={authorImage} alt="Category Icon" /> */}
                    </div>
                  )}
                  <div>
                    <span>
                      {postDate} {authorVisibility && `| ${authorName}`}
                    </span>
                    <span>Read time: {post?.seo?.readingTime} minutes</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="overlay" />
          </div>
          {blogProduct?.length > 0 && (
            <div className="products-mentioned-section">
              <div className="custom-container">
                <p>Products mentioned in this blog post:</p>
                <div className="links">{renderBlogProducts()}</div>
                {renderBlogProductsDescription()}
              </div>
            </div>
          )}
          <Wysiwyg
            className="post-content-wrapper"
            location={location}
            banner={post?.banner}
          >
            {post?.content}
          </Wysiwyg>
        </div>
        <SpeakWithAgent />
      </Layout>
    </>
  );
};

export const query = graphql`
  query singlePost($id: String!) {
    post: wpPost(id: { eq: $id }) {
      ...PostContent
      banner {
        bannerUrl
        bannerImage {
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 100)
            }
          }
        }
      }
      id
      postsProductSelector {
        blogProducts {
          ... on WpProduct {
            id
            products {
              shortProductDescription
            }
            title
            uri
          }
        }
      }
    }
    imagePost: wpPost(id: { eq: $id }) {
      featuredImage {
        node {
          altText
          localFile {
            ...HeroImageMobile
            publicURL
          }
          mediaDetails {
            width
            height
          }
        }
      }
    }
    placeholderImage: file(relativePath: { eq: "PlaceHolder_image2.jpg" }) {
      id
      publicURL
      childImageSharp {
        gatsbyImageData(layout: FIXED, quality: 90, height: 360, width: 1920)
      }
    }
  }
`;

export default Post;
