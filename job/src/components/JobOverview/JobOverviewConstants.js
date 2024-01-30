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
