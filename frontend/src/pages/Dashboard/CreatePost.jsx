import { useState, useRef } from "react";
import axios from "axios";
import useUser from "../../hooks/useUser";

function CreatePost() {
  const { userData } = useUser();
  const [mediaPreviews, setMediaPreviews] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const fileInputRef = useRef(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Function to handle multiple file uploads and previews
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      const fileData = {
        id: URL.createObjectURL(file), // unique identifier for each file
        type: file.type.startsWith("image") ? "image" : "video",
        file,
        name: file.name, // store file name for display
      };

      reader.onloadend = () => {
        fileData.preview = reader.result;
        setMediaPreviews((prev) => [...prev, fileData]);
        setFileNames((prev) => [...prev, file.name]); // store file name for display
      };
      reader.readAsDataURL(file);
    });
  };

  // Function to remove individual media file
  const handleRemoveMedia = (id) => {
    setMediaPreviews((prev) => prev.filter((media) => media.id !== id));
    setFileNames((prev) =>
      prev.filter((name, index) => mediaPreviews[index].id !== id)
    );

    // Reset the file input field if no files are left
    if (mediaPreviews.length === 1) {
      fileInputRef.current.value = "";
      setFileNames([]);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    if (userData) {
      formData.append("userEmail", userData.email);
      formData.append("userRole", userData.role);
      formData.append("userName", userData.name);
    }

    // Append each file to the FormData object
    mediaPreviews.forEach((media) => {
      formData.append("media", media.file);
    });

    console.log(formData);

    try {
      const response = await axios.post(
        "http://localhost:8000/create-post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      alert("Post created successfully!");
      // Reset form fields after successful submission
      setTitle("");
      setDescription("");
      setMediaPreviews([]);
      setFileNames([]);
      fileInputRef.current.value = "";
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post.");
    }
  };

  return (
    <div className="mt-5 flex flex-col items-center justify-center">
      <h2 className="text-6xl mb-6 font-bold">Create Post</h2>
      <form
        className="w-full max-w-7xl bg-white p-8 shadow-2xl rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="mb-6">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="fileUpload"
          >
            Upload Photos/Videos
          </label>
          <div className="flex items-center">
            <input
              type="file"
              id="fileUpload"
              accept="image/*, video/*"
              multiple
              ref={fileInputRef}
              onChange={handleFileChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {/* Display file names */}
            <div className="ml-4 text-gray-500 text-sm">
              {fileNames.length > 0
                ? fileNames.join(", ")
                : "No files selected"}
            </div>
          </div>
        </div>

        {/* Preview Section */}
        {mediaPreviews.length > 0 && (
          <div className="flex flex-wrap mb-6 gap-4">
            {mediaPreviews.map((media) => (
              <div
                key={media.id}
                className="relative flex-shrink-0 w-40 h-40 overflow-hidden rounded-lg shadow-md bg-gray-100"
              >
                {media.type === "image" ? (
                  <img
                    src={media.preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={media.preview}
                    controls
                    className="w-full h-full object-cover"
                  />
                )}
                {/* Close button to remove the media */}
                <button
                  type="button"
                  onClick={() => handleRemoveMedia(media.id)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mb-6">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            placeholder="Enter post description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded h-96 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
        >
          Submit Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
