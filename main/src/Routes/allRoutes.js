import React from "react";
import { Navigate } from "react-router-dom";

// Dashboard
import { DashboardEcommerce } from "@workspace/dashboard";

// User Profile
import { Login, Logout, UserProfile, ForgetPassword } from "@workspace/login";

// Account
import { AccountListing, EditAccount, CreateAccount } from "@workspace/account";

// Candidate
import {
  CreateCandidate,
  CandidateListing,
  EditCandidate,
  CandidateManage,
} from "@workspace/candidate";

// Job
import { JobCreation, JobListing, JobManage, JobCreate } from "@workspace/job";

// Settings
import {
  MainSettings,
  CustomisationSettings,
  DynamicFormListingSettings,
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
  CustomisationNew,
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
    path: "/candidates",
    component: <CandidateListing />,
    requiredPermissions: [Permission.CANDIDATE_READ],
  },
  {
    path: "/candidates/create",
    component: <CreateCandidate />,
    requiredPermissions: [Permission.CANDIDATE_WRITE],
  },
  {
    path: "/candidates/:candidateId/:slug",
    component: <CandidateManage />,
    requiredPermissions: [Permission.CANDIDATE_READ],
  },

  // Account
  {
    path: "/accounts/create",
    component: <CreateAccount />,
    requiredPermissions: [Permission.ACCOUNT_WRITE],
  },
  {
    path: "/accounts/:accountId/edit",
    component: <EditAccount />,
    requiredPermissions: [Permission.ACCOUNT_READ],
  },
  {
    path: "/accounts",
    component: <AccountListing />,
    requiredPermissions: [Permission.ACCOUNT_READ],
  },

  // Job
  // { path: "/jobs/job-creation", component: <JobCreation /> },
  {
    path: "/jobs/job-creation",
    component: <JobCreate />,
    requiredPermissions: [Permission.JOB_WRITE],
  },
  // { path: "/jobs/:jobId/:type", component: <JobCreation /> },
  {
    path: "/jobs",
    component: <JobListing />,
    requiredPermissions: [Permission.JOB_READ],
  },
  {
    path: "/jobs/:jobId/:slug",
    component: <JobManage />,
    requiredPermissions: [Permission.JOB_READ],
  },

  // Settings
  { path: "/settings/general", component: <MainSettings /> },
  {
    path: "/settings/customisation",
    component: <DynamicFormListingSettings />,
  },

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
