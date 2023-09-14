import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
import { DashboardEcommerce } from "@workspace/dashboard";

// // User Profile
import { Login, Logout, UserProfile, ForgetPassword } from "@workspace/login";

//Account
import {
  Access,
  AccountCreation,
  ClientInstructions,
  Commercial,
  Contacts,
  Documents,
  AccountListing,
  Stepper,
} from "@workspace/account";

//Job
import { JobCreation, JobListing } from "@workspace/job";

const authProtectedRoutes = [
  { path: "/dashboard", component: <DashboardEcommerce /> },
  { path: "/index", component: <DashboardEcommerce /> },

  //User Profile
  { path: "/profile", component: <UserProfile /> },

  // Account
  {
    path: null,
    component: <Stepper />,
    nested: true,
    subroutes: [
      { path: "/account/account-creation", component: <AccountCreation /> },
      { path: "/account/contact-creation", component: <Contacts /> },
      { path: "/account/document-creation", component: <Documents /> },
      {
        path: "/account/client-instructions-creation",
        component: <ClientInstructions />,
      },
      { path: "/account/access-creation", component: <Access /> },
      { path: "/account/commercial-creation", component: <Commercial /> },
      { path: "/account/account-listing", component: <AccountListing /> },
    ],
  },
  { path: "/accounts", component: <AccountListing /> },

  //Job
  { path: "/jobs", component: <JobListing /> },
  { path: "/job/job-creation", component: <JobCreation /> },

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
