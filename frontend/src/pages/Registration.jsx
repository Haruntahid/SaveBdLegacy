import { Link } from "react-router-dom";

function Registration() {
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="max-w-xl w-full">
          <div className="card bg-base-100 shadow-2xl min-w-xl">
            <form className="card-body min-w-xl">
              <h2 className="text-center font-bold text-3xl">Registration</h2>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
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
                  type="password"
                  placeholder="Confirm Password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-green-500 text-white hover:bg-green-600">
                  Register
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
