import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { FiLogOut } from "react-icons/fi";
import useUser from "../hooks/useUser";

function Navbar() {
  const { user, logOut } = useContext(AuthContext);
  const { userData, role } = useUser();
  console.log(userData);
  console.log(role);
  console.log(user);

  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log("User logged out successfully");
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  return (
    <>
      <div className="navbar bg-gray-400 px-10">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <Link to={"/"} className="btn btn-ghost text-xl">
            SaveBDLegacy
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-3 text-xl">
            <li>
              <a>মিশন</a>
            </li>
            <li>
              <a>বাংলাদেশের স্থাপনা</a>
            </li>
            <li>
              <Link to={"/create-post"}>Create Post</Link>
            </li>
            <li>
              <a>স্থাপনার কাল ভিত্তিক পরিবর্তন</a>
            </li>
            {user && (role === "admin" || role === "moderator") ? (
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            ) : null}
          </ul>
        </div>
        <div className="navbar-end flex items-center space-x-4">
          {user ? (
            <>
              <p className="capitalize text-white text-xl">{userData?.name}</p>
              {/* Logout button with an icon */}
              <button
                onClick={handleLogout}
                className="px-3 py-1 text-xs bg-red-500  text-white hover:bg-red-600 border-none flex items-center"
              >
                <FiLogOut className="mr-2" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to={"/login"}
                className="btn bg-green-500 text-white hover:bg-green-600 border-none"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
