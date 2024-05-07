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

export const TAG = "Tag";
export const ASSOCIATE = "Associate";
export const SUBMIT_TO_SALES = "Submit to Sales";
export const SUBMIT_TO_CLIENT = "Submit to Client";
export const PROFILE_FEEDBACK_PENDING = "Profile Feedback Pending";
export const SKILLS_ASSESSMENT = "Skills Assessment";
export const CODING_TEST = "Coding Test";
export const TECHNICAL_INTERVIEW = "Technical Interview";
export const CULTURAL_FIT_TEST = "Cultural Fit Test";
export const FIRST_INTERVIEW_SCHEDULED = "First Interview Scheduled";
export const SECOND_INTERVIEW_SCHEDULED = "Second Interview Scheduled";
export const THIRD_INTERVIEW_SCHEDULED = "Third Interview Scheduled";
export const INTERVIEW_FEEDBACK_PENDING = "Interview Feedback Pending";
export const CONDITIONAL_OFFER_SENT = "Conditional Offer Sent";
export const CONDITIONAL_OFFER_ACCEPTED_DECLINED =
  "Conditional Offer Accepted/Declined";
export const INTERVIEWS = "Interviews";
export const ODIN_PROTOCOL = "Odin Protocol";

export const steps = {
  Tag: "Tag",
  Associate: "Associate",
  "Submit to Sales": "Submit to Sales",
  "Submit to Client": "Submit to Client",
  "Profile Feedback Pending": "Profile Feedback Pending",
  "Odin Protocol": "Odin Protocol",
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
  "Odin Protocol": 5,
  Interviews: 9,
  "Conditional Offer Sent": 13,
  "Conditional Offer Accepted/Declined": 14,
};

export const jobHeaders = [
  "Tag",
  "Associate",
  "Submit to Sales",
  "Submit to Client",
  "Profile Feedback Pending",
  "Interview Scheduled",
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
  "Odin Protocol",
  "Interviews",
  "Conditional Offer Sent",
  "Conditional Offer Accepted/Declined",
];

export const newHeaders = [
  { name: "Candidate & Recruiter", icon: "mdi mdi-sort-descending" },
  { name: "Progress", icon: "" },
  { name: "Current Status", icon: "" },
  { name: "Next Step", icon: "" },
  { name: "Actions", icon: "" },
];

export const timelineSkip = {
  Associate: 1,
  "Submit to Sales": 2,
  "Submit to Client": 3,
  "Profile Feedback": 4,
  "Odin Protocol": 5,
  Interviews: 9,
  "Conditional Offer": 13,
  "Conditional Offer Status": 14,
};

export const timelineSkipModule = {
  Profile: 1,
  Odin: 2,
  Interview: 3,
  TOS: 4,
  "Conditional Offer": 5,
};

export const timelineSkipSubModule = {
  1: [
    "Untag",
    "Associate",
    "Profile Withdrawn",
    "Submit To Sales",
    "Profile Rejected - Sales",
    "Submit To Client",
    "Profile Rejected - Client",
  ],
  2: [
    "Skills Assessment",
    "Coding Test",
    "Technical Interview",
    "Cultural Fit Test",
  ],
  3: [
    "Schedule",
    "Backout-Candidate",
    "Rescheduled",
    "Cancelled by Client",
    "Rejected",
    "Selected",
  ],
  4: ["Prepare TOS", "Edit TOS", "Approve TOS"],
  5: ["Prepare", "Edit", "Release", "Accepted", "Rejected"],
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
    color: "withdrawn",
    borderColor: "dark",
    legend: "Candidate Withdrawn",
    tooltip: "Candidate has withdrawn.",
  },
  {
    color: "gray",
    borderColor: "dark",
    legend: "Skipped",
    tooltip: "The step has been skipped.",
  },
];

export const jobTimelineType = {
  SUBMIT_TO_SALES: "submit_to_sales",
  SUBMIT_TO_CLIENT: "submit_to_client",
}
