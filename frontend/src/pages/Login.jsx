import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    const { email, password } = formData;

    try {
      // Make API call to login endpoint
      const res = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });

      if (res.status === 200) {
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again."); // Set error
      toast.error(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <div className="hero bg-base-200 min-h-screen flex items-center justify-center">
        <div className="max-w-xl w-full">
          <div className="card bg-base-100 shadow-2xl min-w-xl">
            <form onSubmit={handleSubmit} className="card-body min-w-xl">
              <h2 className="text-center font-bold text-3xl">Login</h2>

              {/* Email Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>

              {/* Display error message */}
              {error && <span className="text-rose-600 mt-4">{error}</span>}

              {/* Submit Button */}
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn bg-green-500 text-white hover:bg-green-600 flex justify-center items-center"
                  disabled={loading} // Disable button while loading
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"
                      ></path>
                    </svg>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>

              {/* Link to Registration */}
              <div className="py-5">
                <p className="text-center">
                  New Here?{" "}
                  <Link
                    className="text-green-500 underline"
                    to={"/registration"}
                  >
                    Registration
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
