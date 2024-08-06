import { useState, useRef } from "react";
import { toPng } from "html-to-image";
import { Helmet, HelmetProvider } from "react-helmet-async";
import toast, { Toaster } from "react-hot-toast";
import PostPreview from "../components/PostPreview";
import PostForm from "../components/PostForm";
import authorDp from "../assets/authordp.jpg";
import "./PostPage.css";

const PostPage = () => {
  const [postTitle, updatePostTitle] = useState("");
  const [postContent, updatePostContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [ogImageUrl, setOgImageUrl] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("twitter");
  const [authorName, setAuthorName] = useState("Name");
  const postPreviewRef = useRef(null);

  const handleTitleInputChange = (e) => updatePostTitle(e.target.value);
  const handleContentInputChange = (e) => updatePostContent(e.target.value);
  const handlePlatformChange = (e) => setSelectedPlatform(e.target.value);

  const handleImageSelection = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(file);
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const createOgImage = async () => {
    if (postPreviewRef.current) {
      try {
        const dataUrl = await toPng(postPreviewRef.current, {
          cacheBust: true,
          skipAutoScale: true,
          width: 1200,
          height: 630,
        });
        setOgImageUrl(dataUrl);
        toast.success("OG Image generated successfully!");
        console.log("OG Image generated:", dataUrl);
      } catch (error) {
        toast.error("Failed to generate OG image.");
        console.error("Error generating OG image:", error);
      }
    }
  };

  const downloadOgImage = () => {
    if (ogImageUrl) {
      const link = document.createElement("a");
      link.href = ogImageUrl;
      link.download = "image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Image downloaded successfully!");
    }
  };

  const copyImageUrlToClipboard = () => {
    if (ogImageUrl) {
      navigator.clipboard.writeText(ogImageUrl).then(
        () => {
          toast.success("URL copied successfully!");
        },
        (err) => {
          toast.error("Failed to copy URL");
          console.error("Could not copy text: ", err);
        }
      );
    }
  };

  return (
    <HelmetProvider>
      <div className="post-page">
        <Helmet>
          <title>{postTitle || "Create a Post"}</title>
          <meta property="og:title" content={postTitle} />
          <meta
            property="og:description"
            content={postContent.substring(0, 100)}
          />
          <meta property="og:image" content={ogImageUrl} />
        </Helmet>
        <Toaster position="top-center" reverseOrder={false} />
        <h1 className="post-page-title">Create a Post</h1>
        <div className="post-form">
          <label htmlFor="platform-select">Select Platform:</label>
          <select
            id="platform-select"
            value={selectedPlatform}
            onChange={handlePlatformChange}
          >
            <option value="twitter">Twitter</option>
            <option value="instagram">Instagram</option>
            <option value="reddit">Reddit</option>
            <option value="facebook">Facebook</option>
          </select>
        </div>
        <PostPreview
          ref={postPreviewRef}
          title={postTitle}
          content={postContent}
          imagePreviewUrl={imagePreviewUrl}
          platform={selectedPlatform}
          authorName={authorName}
          authorDp={authorDp}
        />
        <PostForm
          title={postTitle}
          content={postContent}
          handleTitleChange={handleTitleInputChange}
          handleContentChange={handleContentInputChange}
          handleImageChange={handleImageSelection}
          generateOgImage={createOgImage}
          ogImageUrl={ogImageUrl}
          downloadImage={downloadOgImage}
          copyToClipboard={copyImageUrlToClipboard}
        />
      </div>
    </HelmetProvider>
  );
};

export default PostPage;
