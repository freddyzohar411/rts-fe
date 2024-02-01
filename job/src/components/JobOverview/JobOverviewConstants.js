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
  "TAG",
  "ASSOCIATE",
  "SUBMIT_TO_SALES",
  "SUBMIT_TO_CLIENT",
  "PROFILE_FEEDBACK_PENDING",
  "SCHEDULE_INTERVIEW",
  7,
  8,
];

export const jobHeaders = [
  "Tag",
  "Associate",
  "Submitted to Sales",
  "Submitted to Client",
  "Profile Feedback Pending",
  "Interview Scheduled",
  "Interview Sched - Future",
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
  { 2: "Submitted to Sales" },
  { 3: "Submitted to Client" },
  { 4: "Profile Feedback Pending" },
  { 5: "Interview" },
  { 6: "Conditional Offer" },
  { 7: "Conditional Offer Status" },
];

export const timelineLegend = [
  {
    color: "primary",
    legend: "Completed",
    borderColor: "custom-primary",
    tooltip: "Candidate has completed this stage.",
  },
  {
    color: "light",
    legend: "Have Not Started",
    borderColor: "primary",
    tooltip: "Candidate has not progressed to this stage.",
  },
  {
    color: "danger",
    legend: "Rejected",
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
    legend: "Withdrawn",
    tooltip: "Candidate has withdrawn.",
  },
  {
    color: "success",
    borderColor: "dark",
    legend: "Completed",
    tooltip: "Candidate has completed all stages.",
  }
];
