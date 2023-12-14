import React from "react";
import FeaturedMedia from "./shared/FeaturedMedia";
import { Link, navigate } from "gatsby";
import Icon from "../assets/svg/news.svg";
import { StaticImage } from "gatsby-plugin-image";

const PostPreview = ({ post }) => {
  const { title, categories, uri } = post;
  const category = categories.nodes[0];
  return (
    <div onClick={() => navigate(uri)} className="post-preview-card">
      <div className="post-preview-img">
        {post.featuredImage ? (
          <FeaturedMedia image={post.featuredImage} />
        ) : (
          <StaticImage
            aspectRatio={2.6}
            src="../assets/images/PlaceHolder_image2.jpg"
            alt="blog post"
          />
        )}
        <div className="post-preview-category">
          <Link to={category.uri}>
            <img alt={`${category.name}`} src={Icon} />
            {category.name}
          </Link>
        </div>
      </div>
      <div
        className="post-preview-content"
        dangerouslySetInnerHTML={{ __html: title }}
      />
    </div>
  );
};

export default PostPreview;
