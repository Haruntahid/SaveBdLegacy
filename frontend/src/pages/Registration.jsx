import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirm_password } = formData;

    // Validate password length
    if (password.length < 8) {
      return setError("Password must be at least 8 characters long");
    }

    // Validate password and confirm password match
    if (password !== confirm_password) {
      return setError("Password and Confirm Password must be the same");
    }

    // Clear error if validation passes
    setError("");

    const newUser = { name, email, password, role: "user" };
    console.log(newUser);

    // API call
    axios
      .post("http://localhost:8000/registration", newUser)
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          toast.success("Registration Successful!");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error(err);
        // Handle error (e.g., show error message)
      });
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
                  value={formData.name}
                  onChange={handleChange}
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
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"} // Toggling password visibility
                  placeholder="Password"
                  className="input input-bordered"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                {formData.password && (
                  <span
                    className="absolute right-3 bottom-4 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </span>
                )}
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
                  value={formData.confirm_password}
                  onChange={handleChange}
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
                >
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
