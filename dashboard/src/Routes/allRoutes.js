import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
import DashboardEcommerce from "../pages/DashboardEcommerce";

import Logout from "../pages/Authentication/Logout";

// User Profile
import UserProfile from "../pages/Authentication/user-profile";
import Welcome from "../pages/Authentication/Welcome";

const authProtectedRoutes = [
  { path: "/dashboard", component: <DashboardEcommerce /> },
  { path: "/index", component: <DashboardEcommerce /> },

  //User Profile
  { path: "/profile", component: <UserProfile /> },

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
  { path: "/welcome", component: <Welcome /> },
  { path: "/logout", component: <Logout /> },
];

export { authProtectedRoutes, publicRoutes };
