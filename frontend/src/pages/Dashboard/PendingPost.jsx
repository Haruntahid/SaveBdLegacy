import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function PendingPost() {
  const { token } = useContext(AuthContext);
  const [pendingPosts, setPendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch pending posts
  useEffect(() => {
    const fetchPendingPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/pending-posts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPendingPosts(response.data);
      } catch (error) {
        console.error("Error fetching pending posts:", error);
        toast.error("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchPendingPosts();
    }
  }, [token]);

  // Delete post by ID with confirmation
  const deletePost = async (id) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmed.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8000/delete-post/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPendingPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== id)
        );
        toast.success("Post deleted successfully");
      } catch (error) {
        console.error("Error deleting post:", error);
        toast.error("Failed to delete post");
      }
    }
  };

  // Update post status to approved
  const updatePostStatus = async (id) => {
    try {
      await axios.patch(`http://localhost:8000/update-post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPendingPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== id)
      );
      toast.success("Post approved successfully");
    } catch (error) {
      console.error("Error updating post status:", error);
      toast.error("Failed to approve post");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-6xl my-8 font-bold text-center">Pending Posts</h1>

      {pendingPosts.length === 0 ? (
        <p>No pending posts.</p>
      ) : (
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="text-center">
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2 text-left">Title</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Posted By</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingPosts.map((post, index) => (
              <tr key={post._id} className="text-center">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2 text-left">{post.title}</td>
                <td className="border px-4 py-2">{post.category}</td>
                <td className="border px-4 py-2 capitalize">
                  {post.postedBy.userName}
                </td>
                <td className="border px-4 py-2">
                  <div className="flex gap-2 items-center justify-center">
                    <button
                      onClick={() => updatePostStatus(post._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => deletePost(post._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <Link
                      to={`/dashboard/post-details/${post._id}`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Details
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PendingPost;
