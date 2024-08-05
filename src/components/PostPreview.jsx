import React, { forwardRef } from "react";
import twitterLogo from "../assets/twitterLogo.jpg";
import instagramLogo from "../assets/instagramLogo.jpg";
import redditLogo from "../assets/redditLogo.jpg";
import facebookLogo from "../assets/facebookLogo.jpg";
import "./PostPreview.css";

const platformStyles = {
  twitter: {
    backgroundColor: "#2b5974",
    color: "#ffffff",
    logo: twitterLogo,
  },
  instagram: {
    backgroundColor: "#ffffff",
    color: "#000000",
    logo: instagramLogo,
  },
  reddit: {
    backgroundColor: "#ffffff",
    color: "#000000",
    logo: redditLogo,
  },
  facebook: {
    backgroundColor: "#ffffff",
    color: "#000000",
    logo: facebookLogo,
  },
};

const PostPreview = forwardRef(
  (
    { title, content, imagePreviewUrl, platform, authorName, authorDp },
    ref
  ) => {
    const style = platformStyles[platform] || platformStyles.twitter;
    const contentClass =
      platform === "twitter" ? "white-content" : "black-content";

    return (
      <div
        ref={ref}
        className="post-preview"
        style={{ backgroundColor: style.backgroundColor, color: style.color }}
      >
        <div className="post-preview-header">
          <div className="post-preview-author">
            <img
              src={authorDp}
              alt="Author"
              className="post-preview-author-dp"
            />
            <span className="post-preview-author-name">{authorName}</span>
          </div>
          <img
            src={style.logo}
            alt={`${platform} logo`}
            className="post-preview-logo"
          />
        </div>
        <div className="post-preview-content">
          <div className={`post-preview-text ${contentClass}`}>
            <h2 className="post-preview-title">{title}</h2>
            <p className="post-preview-content-text">{content}</p>
          </div>
          <div className="post-preview-img-wrap">
            {imagePreviewUrl && (
              <img
                src={imagePreviewUrl}
                alt="Post Preview"
                className="post-preview-image"
              />
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default PostPreview;
