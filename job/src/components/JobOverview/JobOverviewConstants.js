export const JOB_TIMELINE_INITIAL_OPTIONS = [
  {
    sortValue: "candidate.first_name",
    label: "Candidate",
    value: "candidate.firstName",
    sort: true,
  },
  {
    sortValue: "users.first_name",
    label: "Recruiter",
    value: "createdBy",
    sort: true,
  },
];

export const steps = [
  "Tag",
  "Associate",
  "Submit to Sales",
  "Submit to Client",
  "Profile Feedback Pending",
  "Interviews",
  "Conditional Offer Sent",
  "Conditional Offer Accepted/Declined",
];

export const jobHeaders = [
  "Tag",
  "Associate",
  "Submit to Sales",
  "Submit to Client",
  "Profile Feedback Pending",
  "Interview Scheduled",
  "Interview Scheduled - Future",
  "Interview Happened",
  "Interview Cancelled/Backout",
  "Interview Pending Feedback",
];

export const rtsStatusHeaders = [
  "Candidate",
  "Recruiter",
  "Tag",
  "Associate",
  "Submit to Sales",
  "Submit to Client",
  "Profile Feedback Pending",
  "Interviews",
  "Conditional Offer Sent",
  "Conditional Offer Accepted/Declined",
];

export const timelineSkip = [
  { 1: "Associate" },
  { 2: "Submit to Sales" },
  { 3: "Submit to Client" },
  { 4: "Profile Feedback" },
  { 5: "Interviews" },
  { 6: "Conditional Offer" },
  { 7: "Conditional Offer Status" },
];

export const timelineLegend = [
  {
    color: "dark",
    legend: "Completed Stage",
    borderColor: "custom-primary",
    tooltip: "Candidate has completed this stage.",
  },
  {
    color: "custom-primary",
    legend: "Incomplete Stage",
    borderColor: "primary",
    tooltip: "Candidate has not progressed to this stage.",
  },
  {
    color: "danger",
    legend: "Candidate Rejected",
    borderColor: "dark",
    tooltip: "Candidate has been rejected.",
  },
  {
    color: "warning",
    legend: "In Progress",
    borderColor: "dark",
    tooltip: "Candidate is in progress in this stage.",
  },
  {
    color: "orange",
    borderColor: "dark",
    legend: "Candidate Withdrawn",
    tooltip: "Candidate has withdrawn.",
  },
  {
    color: "success",
    borderColor: "dark",
    legend: "Completed All Stages",
    tooltip: "Candidate has completed all stages.",
  }
];
