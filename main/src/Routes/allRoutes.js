import React from "react";
import { Navigate } from "react-router-dom";

// Dashboard
import { DashboardEcommerce } from "@workspace/dashboard";

// User Profile
import { Login, Logout, UserProfile, ForgetPassword } from "@workspace/login";

// Account
import { AccountListing, EditAccount, CreateAccount } from "@workspace/account";

// Candidate
import { CreateCandidate, CandidateListing } from "@workspace/candidate";

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

// Form Builder
import { FormbuilderMain } from "@workspace/formbuilder";

// Import constants for permission and module (Route guard)
import { Permission } from "@workspace/login";

const authProtectedRoutes = [
  { path: "/dashboard", component: <DashboardEcommerce /> },
  { path: "/index", component: <DashboardEcommerce /> },

  // User Profile
  { path: "/profile", component: <UserProfile /> },

  // Candidate
  {
    path: "/candidates/create",
    component: <CreateCandidate />,
    requiredPermissions: [Permission.CANDIDATE_WRITE],
  },
  { path: "/candidates", component: <CandidateListing /> },

  // Account
  {
    path: "/accounts/create",
    component: <CreateAccount />,
    requiredPermissions: [Permission.ACCOUNT_WRITE],
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

  { path: "/settings/access/role/:roleId", component: <ViewRole /> },
  {
    path: "/settings/access/role/update/:roleId",
    component: <UpdateRole />,
  },
  { path: "/settings/access/group/group-creation", component: <CreateGroup /> },
  { path: "/settings/access/group/:id", component: <GroupDetails /> },
  {
    path: "/settings/access/group/update/:id",
    component: <GroupUpdate />,
  },

  { path: "/settings/access/user/:userId", component: <UserDetails /> },
  { path: "/settings/access/user/user-creation", component: <CreateUser /> },
  { path: "/settings/access/user/update/:userId", component: <UpdateUser /> },

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
