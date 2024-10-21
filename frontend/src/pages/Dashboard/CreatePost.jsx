import { useState } from "react";

function CreatePost() {
  const [imagePreview, setImagePreview] = useState(null);

  // Function to handle file upload and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file); // Convert image to base64 string
    } else {
      setImagePreview(null); // Reset if no file
    }
  };

  // Function to remove the uploaded image
  const handleRemoveImage = () => {
    setImagePreview(null);
  };

  return (
    <div className="mt-48 flex flex-col items-center justify-center">
      <h2 className="text-6xl mb-6 font-bold">Create Post</h2>
      <form className="w-full max-w-7xl bg-white p-8 shadow-2xl rounded-lg">
        <div className="mb-6">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="fileUpload"
          >
            Upload Photo
          </label>
          <input
            type="file"
            id="fileUpload"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Preview Section */}
        {imagePreview && (
          <div className="mb-6 relative">
            <p className="text-gray-700 text-xl font-bold mb-2">
              Image Preview:
            </p>
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
            {/* Close button to remove the image */}
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-2 -mt-3 -mr-3 hover:bg-red-600 transition"
            >
              &times;
            </button>
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
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
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
            className="w-full border border-gray-300 p-2 rounded h-96 focus:outline-none focus:ring-2 focus:ring-green-500"
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
