import React from "react";
import { Navigate } from "react-router-dom";

// Dashboard
import { DashboardEcommerce } from "@workspace/dashboard";

// User Profile
import { Login, Logout, UserProfile, ForgetPassword } from "@workspace/login";

// Account
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

// Candidate
import { CreateCandidate } from "@workspace/candidate";

// Job
import { JobCreation, JobListing } from "@workspace/job";

// Settings
import {
  MainSettings,
  CustomisationSettings,
  AccessManagement,
  CreateNewRole,
  ViewRole,
  CreateUser,
  GroupDetails,
  UserDetails,
  CreateGroup,
  GroupUpdate,
  UpdateRole,
  UpdateUser,
} from "@workspace/settings";

const authProtectedRoutes = [
  { path: "/dashboard", component: <DashboardEcommerce /> },
  { path: "/index", component: <DashboardEcommerce /> },

  // User Profile
  { path: "/profile", component: <UserProfile /> },

  // Create Candidate
  { path: "/create-candidate", component: <CreateCandidate /> },

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

  // Job
  { path: "/job/job-creation", component: <JobCreation /> },
  { path: "/jobs", component: <JobListing /> },

  // Settings
  { path: "/settings", component: <MainSettings /> },
  { path: "/settings/customisation", component: <CustomisationSettings /> },
  { path: "/settings/access", component: <AccessManagement /> },
  { path: "/settings/access/role/role-creation", component: <CreateNewRole /> },
  { path: "/settings/access/role/:roleName", component: <ViewRole /> },
  {
    path: "/settings/access/role/update/:roleName",
    component: <UpdateRole />,
  },
  { path: "/settings/access/group/group-creation", component: <CreateGroup /> },
  { path: "/settings/access/group/:groupName", component: <GroupDetails /> },
  {
    path: "/settings/access/group/update/:groupName",
    component: <GroupUpdate />,
  },

  { path: "/settings/access/user/:username", component: <UserDetails /> },
  { path: "/settings/access/user/user-creation", component: <CreateUser /> },
  { path: "/settings/access/user/update/:username", component: <></> },

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
