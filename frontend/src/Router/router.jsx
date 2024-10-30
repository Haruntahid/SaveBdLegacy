import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import DashboardLayout from "../layouts/DashboardLayout";
import CreatePost from "../pages/Dashboard/CreatePost";
import ProtectedRoute from "./ProtectedRoute";
import PrivateRoute from "./privateRoute";
import PendingPost from "../pages/Dashboard/PendingPost";
import PostDetailsPage from "../pages/Dashboard/PostDetailsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/create-post",
        element: (
          <PrivateRoute>
            <CreatePost />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["admin", "moderator"]}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <CreatePost />,
      },
      {
        path: "pending-post",
        element: <PendingPost />,
      },
      {
        path: "post-details/:id",
        element: <PostDetailsPage />,
        loader: ({ params }) =>
          fetch(`http://localhost:8000/posts/${params.id}`),
      },
    ],
  },
]);
