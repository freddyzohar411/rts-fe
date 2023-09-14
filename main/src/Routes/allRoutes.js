import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
import { DashboardEcommerce } from "@workspace/dashboard";

// // User Profile
import { Login, Logout, UserProfile, ForgetPassword } from "@workspace/login";

//Dashboard
import { CreateCandidate } from "@workspace/candidate";

const authProtectedRoutes = [
  { path: "/dashboard", component: <DashboardEcommerce /> },
  { path: "/index", component: <DashboardEcommerce /> },

  // User Profile
  { path: "/profile", component: <UserProfile /> },

  // Create Candidate
  { path: "/create-candidate", component: <CreateCandidate /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
  { path: "*", component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  // Authentication Page
  { path: "/login", component: <Login /> },
  { path: "/logout", component: <Logout /> },
  { path: "/forget-password", component: <ForgetPassword /> },
];

export { authProtectedRoutes, publicRoutes };
