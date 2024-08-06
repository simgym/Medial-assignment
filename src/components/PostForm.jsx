import { useState } from "react";
import imgPre from "../assets/imgPre.jpg";
import "./PostForm.css";

const PostForm = ({
  title,
  content,
  handleTitleChange,
  handleContentChange,
  handleImageChange,
  generateOgImage,
  ogImageUrl,
  downloadImage,
  copyToClipboard,
}) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        handleImageChange(event);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="post-form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
        className="form-input"
      />
      <textarea
        placeholder="Description"
        value={content}
        onChange={handleContentChange}
        className="form-input"
      />
      <div className="input-btn-wrap">
        <div className="image-upload-wrap">
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="image-preview" />
          )}
          {!imagePreview && (
            <img src={imgPre} alt="Preview" className="image-preview" />
          )}
          <input
            type="file"
            onChange={handleImageUpload}
            className="file-input"
          />
        </div>
        <div className="btn-wrap">
          <div className="generate-btn">
            <button onClick={generateOgImage} className="btn btn-generate">
              Create post
            </button>
          </div>
          {ogImageUrl && (
            <div className="btn-group">
              <button onClick={downloadImage} className="btn btn-download">
                Download image
              </button>
              <button onClick={copyToClipboard} className="btn btn-copy">
                Copy URL
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostForm;
