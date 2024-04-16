export const routeData = [
  // Dashboard

  // Candidates
  { path: "/candidates", name: "Candidates" },
  { path: "/candidates/create", name: "Create New Candidates" },
  { path: "/candidates/:id/snapshot", name: "Snapshot" },
  { path: "/candidates/new", name: "Create New Candidates" },
  { path: "/candidates/custom-view", name: "Create Candidates Custom View" },

  // Accounts
  { path: "/accounts/create", name: "Create New Account" },
  { path: "/accounts/:id/edit", name: "Snapshot" },
  { path: "/accounts/custom-view", name: "Create Accounts Custom View" },

  // Jobs
  { path: "/jobs/job-creation", name: "Create New Jobs" },
  { path: "/jobs/:id/snapshot", name: "Overview" },
  { path: "/jobs/custom-view", name: "Create Jobs Custom View" },

  // Settings
  { path: "/settings/access", name: "Access Management" },
  { path: "/settings/access/user/user-creation", name: "Create New User" },
  { path: "/settings/access/user/update/:id", name: "Edit User" },
  { path: "/settings/access/user/:id", name: "User" },
  { path: "/settings/access/group/group-creation", name: "Create New Group" },
  { path: "/settings/access/group/update/:id", name: "Edit Group" },
  { path: "/settings/access/group/:id", name: "Group" },
  { path: "/settings/access/role/role-creation", name: "Create New Role" },
  { path: "/settings/access/role/update/:id", name: "Edit Role" },
  { path: "/settings/access/role/:id", name: "Role" },
  { path: "/settings/access/import-users", name: "Import Users" },

  { path: "/settings/customisation", name: "Form Customisation" },
  { path: "/form-builder", name: "Form Builder" },
  { path: "/form-builder/:id", name: "Form Builder Update" },
  { path: "/settings/templates", name: "Templates" },
  { path: "/settings/templates/create", name: "Create New Template" },
  { path: "/settings/templates/demo", name: "Template Demo" },
];

export const moduleRouteData = [
  { path: "/dashboard", name: "Dashboard" },
  { path: "/candidates", name: "Candidates" },
  { path: "/accounts", name: "Accounts" },
  { path: "/jobs", name: "Jobs" },
  { path: "/settings/general", name: "Settings" },
];
