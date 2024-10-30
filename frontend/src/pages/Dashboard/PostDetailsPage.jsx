import { useLoaderData } from "react-router-dom";

function PostDetailsPage() {
  const post = useLoaderData();
  console.log(post);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-2">
        Category: <span className="text-gray-700">{post.category}</span>
      </p>
      <p className="text-gray-500 mb-4">
        Posted by:{" "}
        <span className="text-gray-700">{post.postedBy.userName}</span> on{" "}
        <span className="text-gray-700">{post.postedOn}</span>
      </p>

      <h2 className="text-xl font-semibold mb-2">Description</h2>
      <p className="mb-6">{post.description}</p>

      <h2 className="text-xl font-semibold mb-4">Media</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {post.media && post.media.length > 0 ? (
          post.media.map((mediaPath, index) => (
            <img
              key={index}
              src={`http://localhost:8000/${mediaPath}`}
              alt={`Media ${index + 1}`}
              className="w-full h-auto rounded-lg shadow"
            />
          ))
        ) : (
          <p>No media available</p>
        )}
      </div>

      <h2 className="text-xl font-semibold mb-2">Status</h2>
      <p className="text-gray-600 mb-4">{post.status}</p>
    </div>
  );
}

export default PostDetailsPage;
