import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="max-w-xl w-full">
          <div className="card bg-base-100 shadow-2xl min-w-xl">
            <form className="card-body min-w-xl">
              <h2 className="text-center font-bold text-3xl">Login</h2>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
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
                <button className="btn bg-green-500 text-white hover:bg-green-600">
                  Login
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
