import React from "react";
import { Navigate } from "react-router-dom";

//Constant
import { AuthConstant } from "@workspace/common";


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
  EditAccount,
  CreateAccount,
} from "@workspace/account";

// import { CreateAccount } from "@workspace/account";

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
} from "@workspace/settings";

// Form Builder
import { FormbuilderMain } from "@workspace/formbuilder";

const { permissionConstant, moduleConstant } = AuthConstant;

const authProtectedRoutes = [
  { path: "/dashboard", component: <DashboardEcommerce /> },
  { path: "/index", component: <DashboardEcommerce /> },

  // User Profile
  { path: "/profile", component: <UserProfile /> },

  // Create Candidate
  { path: "/create-candidate", component: <CreateCandidate /> },

  // Account
  {
    path: "/accounts/create",
    component: <CreateAccount />,
    moduleName: moduleConstant.ACCOUNT,
    requiredPermissions: [permissionConstant.WRITE],
  },
  { path: "/accounts/:accountId/edit", component: <EditAccount /> },
  { path: "/accounts", component: <AccountListing /> },

  // Job
  { path: "/job/job-creation", component: <JobCreation /> },
  { path: "/jobs", component: <JobListing /> },

  // Settings
  { path: "/settings", component: <MainSettings /> },
  { path: "/settings/customisation", component: <CustomisationSettings /> },

  // Form Builder
  { path: "/form-builder", component: <FormbuilderMain /> },
  { path: "/form-builder/:templateId", component: <FormbuilderMain /> },

  // Access Management
  { path: "/settings/access", component: <AccessManagement /> },
  { path: "/settings/access/role/role-creation", component: <CreateNewRole /> },
  { path: "/settings/access/role/view-role", component: <ViewRole /> },

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
