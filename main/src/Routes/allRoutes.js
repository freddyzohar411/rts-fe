import React from "react";
import { Navigate } from "react-router-dom";

// Dashboard
import { Dashboard } from "@workspace/dashboard";

import { CustomView } from "@workspace/common";

// User Profile
import {
  Login,
  Logout,
  UserProfile,
  ForgetPassword,
  ResetPassword,
  ForgetResetPassword,
  LoginOTP
} from "@workspace/login";

// Account
import {
  AccountListing,
  EditAccount,
  CreateAccount,
  AccountCustomView,
} from "@workspace/account";

// Candidate
import {
  CreateCandidate,
  CandidateListing,
  CandidateManage,
  CreateCandidateOptions,
  CandidateResumeParse,
  CandidateCustomView,
} from "@workspace/candidate";

// Job
import {
  JobListing,
  JobManage,
  JobCreate,
  FOD,
  PreOfferVerification,
  JobCustomView,
} from "@workspace/job";

// Settings
import {
  MainSettings,
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
  MassImportUsers,
  ImportUsers,
} from "@workspace/settings";


// Form Builder
import { FormbuilderMain } from "@workspace/formbuilder";

// Template Builder
import {
  TemplateBuilderPage,
  TemplateListingPage,
  TemplateDemoPage,
} from "@workspace/template";

// Import constants for permission and module (Route guard)
import { Permission } from "@workspace/login";

const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/index", component: <Dashboard /> },

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
    path: "/candidates/parse-resume",
    component: <CandidateResumeParse />,
    requiredPermissions: [Permission.CANDIDATE_WRITE],
  },
  {
    path: "/candidates/:candidateId/:slug",
    component: <CandidateManage />,
    requiredPermissions: [Permission.CANDIDATE_READ],
  },
  {
    path: "/candidates/new",
    component: <CreateCandidateOptions />,
    requiredPermissions: [Permission.CANDIDATE_WRITE],
  },
  { path: "/candidates/custom-view", component: <CandidateCustomView /> },

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
  {
    path: "/accounts/custom-view",
    component: <AccountCustomView />,
    requiredPermissions: [Permission.ACCOUNT_READ],
  },

  // Job
  {
    path: "/jobs/job-creation",
    component: <JobCreate />,
    requiredPermissions: [Permission.JOB_WRITE],
  },
  { path: "/jobs/custom-view", component: <JobCustomView /> },
  {
    path: "/jobs",
    component: <JobListing />,
    requiredPermissions: [Permission.JOB_READ],
  },
  {
    path: "/jobs/filter/:jobType",
    component: <JobListing />,
    requiredPermissions: [Permission.JOB_READ],
  },
  {
    path: "/jobs/:jobId/:slug",
    component: <JobManage />,
    requiredPermissions: [Permission.JOB_READ],
  },
  {
    path: "/jobs/fodtest",
    component: <FOD />,
    requiredPermissions: [Permission.JOB_READ],
  },

  { path: "/jobs/fod", component: <FOD /> },

  { path: "/jobs/pre-offer-verification", component: <PreOfferVerification /> },

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
  { path: "/settings/access/import-users", component: <MassImportUsers />},

  // Template in Settings
  { path: "/settings/templates", component: <TemplateListingPage /> },
  { path: "/settings/templates/create", component: <TemplateBuilderPage /> },
  { path: "/settings/templates/demo", component: <TemplateDemoPage /> },
  {
    path: "/settings/templates/:templateId/edit",
    component: <TemplateBuilderPage />,
  },

  { path: "/custom-view", component: <CustomView /> },

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
  { path: "/reset-password", component: <ResetPassword /> },
  { path: "/forget-reset-password", component: <ForgetResetPassword /> },
  { path: "/logout", component: <Logout /> },
  { path: "/forget-password", component: <ForgetPassword /> },
  { path: "/login-otp", component: <LoginOTP /> },
];

export { authProtectedRoutes, publicRoutes };
