import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";

function Registration() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { registerUser, loading } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirm_password = event.target.confirm_password.value;

    if (password !== confirm_password) {
      return setError("Password and Confirm Password must be the same");
    }

    try {
      const res = await registerUser(email, password);
      const user = res.user;

      // Update user profile with displayName
      await updateProfile(user, {
        displayName: name,
      });

      toast.success("Registration Successful!");
      navigate("/");
    } catch (error) {
      console.error("Error during registration:", error);
      setError(error.message);
    }
  };

  return (
    <>
      <div className="hero bg-base-200 min-h-screen flex items-center justify-center">
        <div className="max-w-xl w-full">
          <div className="card bg-base-100 shadow-2xl min-w-xl">
            <form onSubmit={handleSubmit} className="card-body min-w-xl">
              <h2 className="text-center font-bold text-3xl">Registration</h2>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  name="confirm_password"
                  type="password"
                  placeholder="Confirm Password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div>
                {error && <span className="text-rose-600 mt-4">{error}</span>}
              </div>
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
                    "Register"
                  )}
                </button>
              </div>
              <div className="py-5">
                <p className="text-center">
                  Already have an account?{" "}
                  <Link className="text-green-500 underline" to={"/login"}>
                    Login
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

export default Registration;
