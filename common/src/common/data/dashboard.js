const recruiterDashboard = [
  {
    id: 1,
    cardColor: "primary",
    label: "Focus of",
    subLabel: "the Day",
    badge: "",
    badgeClass: "",
    percentage: "",
    counter: "10",
    link: "/jobs/filter/fod",
    bgcolor: "success",
    icon: "bx bx-sun",
    decimals: 0,
    prefix: "",
    suffix: "",
    key: "fod",
  },
  {
    id: 2,
    cardColor: "primary",
    label: "All Active",
    subLabel: "Jobs",
    badge: "",
    badgeClass: "",
    percentage: " ",
    counter: "350897",
    link: "/jobs/filter/all_jobs",
    bgcolor: "primary",
    icon: "bx bxs-select-multiple",
    decimals: 0,
    prefix: "",
    suffix: "",
    key: "all_jobs",
  },
  {
    id: 3,
    cardColor: "primary",
    label: "Assigned Jobs",
    subLabel: "",
    badge: "",
    badgeClass: "",
    percentage: "",
    counter: "350897",
    link: "/jobs/filter/total_assigned_jobs",
    bgcolor: "info",
    icon: "bx bxs-group",
    decimals: 0,
    prefix: "",
    suffix: "",
    key: "total_assigned_jobs",
  },
  {
    id: 4,
    cardColor: "primary",
    label: "All Jobs",
    subLabel: "",
    badge: "",
    badgeClass: "",
    percentage: "",
    counter: "350897",
    link: "/jobs/filter/all_jobs",
    bgcolor: "warning",
    icon: "bx bxs-collection",
    decimals: 0,
    prefix: "",
    suffix: "",
    key: "all_job_status",
  },
  {
    id: 5,
    cardColor: "primary",
    label: "To Do",
    subLabel: "",
    badge: "",
    badgeClass: "",
    percentage: "",
    counter: "300",
    link: "/jobs/filter/total_fod",
    bgcolor: "success",
    icon: "bx bxs-sun",
    decimals: 0,
    prefix: "",
    suffix: "",
    key: "total_fod",
  },
  {
    id: 6,
    cardColor: "primary",
    label: "KPI",
    subLabel: "",
    data: "30/40",
    badge: "",
    badgeClass: "",
    percentage: "",
    counter: "30/40",
    link: "",
    bgcolor: "primary",
    icon: "bx bx-target-lock",
    decimals: 0,
    prefix: "",
    suffix: "",
    key: "kpi",
  },
  {
    id: 7,
    cardColor: "primary",
    label: "Update Candidate",
    subLabel: "Status",
    badge: "",
    badgeClass: "",
    percentage: "",
    counter: "300",
    link: "",
    bgcolor: "info",
    icon: "bx bx-user-check",
    decimals: 0,
    prefix: "",
    suffix: "",
    key: "update_candidate_status",
  },
  {
    id: 8,
    cardColor: "primary",
    label: "Offer Status",
    subLabel: "",
    statusArray: [
      { status: "Accepted", count: 100 },
      { status: "Declined", count: 90 },
      { status: "Renegotiated", count: 5 },
    ],
    badge: "",
    badgeClass: "",
    percentage: "",
    counter: "",
    link: "",
    bgcolor: "warning",
    icon: "bx bx-receipt",
    decimals: 0,
    prefix: "",
    suffix: "",
    key: "offer_status",
  },
  {
    id: 9,
    cardColor: "primary",
    label: "Offer Review",
    subLabel: "by Recruiter",
    badge: "",
    badgeClass: "",
    percentage: "",
    counter: "3",
    link: "",
    bgcolor: "success",
    icon: "bx bx-folder-open",
    decimals: 0,
    prefix: "",
    suffix: "",
    key: "offer_review_by_recruiter",
  },
  ,{
    id: 10,
    cardColor: "primary",
    label: "Reminders",
    subLabel: "",
    badge: "",
    badgeClass: "",
    percentage: "",
    counter: "3",
    link: "",
    bgcolor: "primary",
    icon: "mdi mdi-bell-badge-outline",
    decimals: 0,
    prefix: "",
    suffix: "",
    key: "offer_review_by_recruiter",
  }
];

const salesDashboard = [
  {
    id: 1,
    cardColor: "primary",
    label: "New Job",
    subLabel: "Openings",
    badge: "",
    badgeClass: "",
    percentage: "",
    counter: "5",
    link: "/jobs/filter/new_job",
    bgcolor: "success",
    icon: "bx bx-mail-send",
    decimals: 0,
    prefix: "",
    suffix: "",
    key: "new_job",
  },
  {
    id: 2,
    cardColor: "primary",
    label: "Active Job",
    subLabel: "Openings",
    badge: "",
    badgeClass: "",
    percentage: "",
    counter: "10",
    link: "/jobs/filter/active_jobs",
    bgcolor: "primary",
    icon: "bx bx-run",
    decimals: 0,
    prefix: "",
    suffix: "",
    key: "active_jobs",
  },
  {
    id: 3,
    cardColor: "primary",
    label: "Inactive Job",
    subLabel: "Openings",
    badge: "",
    badgeClass: "",
    percentage: "",
    counter: "9",
    link: "/jobs/filter/inactive_jobs",
    bgcolor: "info",
    icon: "bx bx-accessibility",
    decimals: 0,
    prefix: "",
    suffix: "",
    key: "inactive_jobs",
  },
  {
    id: 4,
    cardColor: "primary",
    label: "Closed Job",
    subLabel: "Openings",
    badge: "",
    badgeClass: "",
    percentage: "",
    counter: "100",
    link: "/jobs/filter/closed_jobs",
    bgcolor: "warning",
    icon: "bx bx-user-x",
    decimals: 0,
    prefix: "",
    suffix: "",
    key: "closed_jobs",
  },
  {
    id: 5,
    cardColor: "primary",
    label: "Focus of",
    subLabel: "the Day",
    badge: "",
    badgeClass: "",
    percentage: "",
    counter: "10",
    link: "/jobs/filter/fod",
    bgcolor: "success",
    icon: "bx bx-sun",
    decimals: 0,
    prefix: "",
    suffix: "",
    key: "fod",
  },
  {
    id: 6,
    cardColor: "primary",
    label: "Assigned Job",
    subLabel: "Openings",
    badge: "",
    badgeClass: "",
    percentage: "",
    counter: "10",
    link: "/jobs/filter/assigned_jobs",
    bgcolor: "primary",
    icon: "bx bx-user-check",
    decimals: 0,
    prefix: "",
    suffix: "",
    key: "assigned_jobs",
  },
  {
    id: 7,
    cardColor: "primary",
    label: "Update Candidate",
    subLabel: "Profile Status",
    badge: "",
    badgeClass: "",
    percentage: "",
    counter: "10",
    link: "",
    bgcolor: "info",
    icon: "bx bx-user-pin",
    decimals: 0,
    prefix: "",
    suffix: "",
    key: "update_cadidate_profile",
  },
  {
    id: 8,
    cardColor: "primary",
    label: "Offer Status",
    statusArray: [
      { status: "Accepted", count: 100 },
      { status: "Declined", count: 90 },
      { status: "Renegotiated", count: 5 },
    ],
    subLabel: "Last Month",
    badge: "",
    badgeClass: "",
    percentage: "",
    counter: "",
    link: "",
    bgcolor: "warning",
    icon: "bx bx-receipt",
    decimals: 0,
    prefix: "",
    suffix: "",
    key: "offer_status",
  },
  {
    id: 9,
    cardColor: "primary",
    label: "Pending",
    subLabel: "Onboarding",
    badge: "",
    badgeClass: "",
    percentage: "",
    counter: "8",
    link: "",
    bgcolor: "success",
    icon: "bx bx-error-circle",
    decimals: 0,
    prefix: "",
    suffix: "",
    key: "pending_onboarding",
  },
];

export { recruiterDashboard, salesDashboard };
