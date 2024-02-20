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

export const steps = {
  Tag: "Tag",
  Associate: "Associate",
  "Submit to Sales": "Submit to Sales",
  "Submit to Client": "Submit to Client",
  "Profile Feedback Pending": "Profile Feedback Pending",
  Interviews: "Interview Feedback Pending",
  "Conditional Offer Sent": "Conditional Offer Sent",
  "Conditional Offer Accepted/Declined": "Conditional Offer Accepted/Declined",
};

export const stepOrders = {
  Tag: 0,
  Associate: 1,
  "Submit to Sales": 2,
  "Submit to Client": 3,
  "Profile Feedback Pending": 4,
  Interviews: 5,
  "Conditional Offer Sent": 9,
  "Conditional Offer Accepted/Declined": 10,
};

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

export const timelineSkip = {
  Associate: 1,
  "Submit to Sales": 2,
  "Submit to Client": 3,
  "Profile Feedback": 4,
  Interviews: 5,
  "Conditional Offer": 9,
  "Conditional Offer Status": 10,
};

export const timelineLegend = [
  {
    color: "success",
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
    color: "gray",
    borderColor: "dark",
    legend: "Candidate Withdrawn",
    tooltip: "Candidate has withdrawn.",
  },
  {
    color: "success",
    borderColor: "dark",
    legend: "Completed All Stages",
    tooltip: "Candidate has completed all stages.",
  },
];
