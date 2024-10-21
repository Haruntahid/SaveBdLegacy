import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const { logIn, loading } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    logIn(email, password)
      .then((res) => {
        console.log(res);
        toast.success("Login successful!");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <div className="hero bg-base-200 min-h-screen flex items-center justify-center">
        <div className="max-w-xl w-full">
          <div className="card bg-base-100 shadow-2xl min-w-xl">
            <form onSubmit={handleSubmit} className="card-body min-w-xl">
              <h2 className="text-center font-bold text-3xl">Login</h2>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="email"
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
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
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
                    "Login"
                  )}
                </button>
              </div>
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
