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

export const jobHeaders = [
  "Tag",
  "Associate",
  "Submit to Sales",
  "Submit to Client",
  "Scheduled",
  "Completed",
  "Cancelled/Backout",
  "Pending Feedback",
];

export const newHeaders = [
  { name: "Candidate & Recruiter", icon: "mdi mdi-sort-descending" },
  { name: "Progress", icon: "" },
  { name: "Current Status", icon: "" },
  { name: "Next Step", icon: "" },
  { name: "Actions", icon: "" },
];

export const progressSteps = [
  {
    order: 1,
    name: "Profile",
  },
  {
    order: 2,
    name: "Odin",
  },
  {
    order: 3,
    name: "Interviews",
  },
  {
    order: 4,
    name: "TOS",
  },
  {
    order: 5,
    name: "Conditional Offer",
  },
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

//Profile
export const UNTAG_FORM_INDEX = 1;
export const ASSOCIATE_FORM_INDEX = 2;
export const PRF_WTDWN_FORM_INDEX = 3;
export const SUB_TO_SALES_FORM_INDEX = 4;
export const PRF_REJ_SALES_FORM_INDEX = 5;
export const SUB_TO_CLIENT_FORM_INDEX = 6;
export const PRF_REJ_CLIENT_FORM_INDEX = 7;
//Odin
export const PRE_SKILLS_ASSESSMENT_FORM_INDEX = 8;
export const SKILLS_ASSESSMENT_FORM_INDEX = 9;
export const CODING_TEST_FORM_INDEX = 10;
export const TEC_INTRW_FORM_INDEX = 11;
export const CULTURAL_FIT_TEST_FORM_INDEX = 12;
//Interview
export const SCHEDULE_FORM_INDEX = 13;
export const BACKOUT_CANDIE_FORM_INDEX = 14;
export const RESCHEDULED_FORM_INDEX = 15;
export const CANCL_BY_CLIENT_FORM_INDEX = 16;
export const REJECTED_INTRW_FORM_INDEX = 17;
export const SELECTED_FORM_INDEX = 18;
//TOS
export const PREPARE_TOS_FORM_INDEX = 19;
export const EDIT_TOS_FORM_INDEX = 20;
export const APPROVE_TOS_FORM_INDEX = 21;
//Conditional Offer
export const PREPARE_FORM_INDEX = 22;
export const EDIT_FORM_INDEX = 23;
export const RELEASE_FORM_INDEX = 24;
export const ACCEPTED_FORM_INDEX = 25;
export const REJECTED_FORM_INDEX = 26;
//Profile Feedback - Profile
export const PROFILE_FEEDBACK_PENDING_INDEX = 27;

export const timelineSkipModule = {
  Profile: 1,
  Odin: 2,
  Interview: 3,
  TOS: 4,
  "Conditional Offer": 5,
};

export const timelineSkipSubModule = {
  1: [
    { id: UNTAG_FORM_INDEX, form: "Untag" },
    { id: ASSOCIATE_FORM_INDEX, form: "Associate" },
    { id: PRF_WTDWN_FORM_INDEX, form: "Profile Withdrawn" },
    { id: SUB_TO_SALES_FORM_INDEX, form: "Submit To Sales" },
    { id: PRF_REJ_SALES_FORM_INDEX, form: "Profile Rejected - Sales" },
    { id: SUB_TO_CLIENT_FORM_INDEX, form: "Submit To Client" },
    { id: PRF_REJ_CLIENT_FORM_INDEX, form: "Profile Rejected - Client" },
    { id: PROFILE_FEEDBACK_PENDING_INDEX, form: "Profile Status" },
  ],
  2: [
    { id: PRE_SKILLS_ASSESSMENT_FORM_INDEX, form: "Pre Skills Assessment" },
    { id: SKILLS_ASSESSMENT_FORM_INDEX, form: "Skills Assessment" },
    { id: CODING_TEST_FORM_INDEX, form: "Coding Test" },
    { id: TEC_INTRW_FORM_INDEX, form: "Technical Interview" },
    { id: CULTURAL_FIT_TEST_FORM_INDEX, form: "Cultural Fit Test" },
  ],
  3: [
    { id: SCHEDULE_FORM_INDEX, form: "Schedule" },
    { id: BACKOUT_CANDIE_FORM_INDEX, form: "Backout-Candidate" },
    { id: RESCHEDULED_FORM_INDEX, form: "Rescheduled" },
    { id: CANCL_BY_CLIENT_FORM_INDEX, form: "Cancelled by Client" },
    { id: REJECTED_INTRW_FORM_INDEX, form: "Rejected" },
    { id: SELECTED_FORM_INDEX, form: "Selected" },
  ],
  4: [
    { id: PREPARE_TOS_FORM_INDEX, form: "Prepare TOS" },
    { id: EDIT_TOS_FORM_INDEX, form: "Edit TOS" },
    { id: APPROVE_TOS_FORM_INDEX, form: "Approve TOS" },
  ],
  5: [
    { id: PREPARE_FORM_INDEX, form: "Prepare" },
    { id: EDIT_FORM_INDEX, form: "Edit" },
    { id: RELEASE_FORM_INDEX, form: "Release" },
    { id: ACCEPTED_FORM_INDEX, form: "Accepted" },
    { id: REJECTED_FORM_INDEX, form: "Rejected" },
  ],
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
  //Profile
  ASSOCIATE: "associate_candidate",
  SUBMIT_TO_SALES: "submit_to_sales",
  SUBMIT_TO_CLIENT: "submit_to_client",
  PROFILE_WITHDRAWN: "profile_withdrawn",
  //Odin
  SKILLS_ASSESSMENT: "skills_assessment",
  //Interview
  FIRST_INTERVIEW_SCHEDULED: "first_interview_scheduled",
  SECOND_INTERVIEW_SCHEDULED: "second_interview_scheduled",
  THIRD_INTERVIEW_SCHEDULED: "third_interview_scheduled",
  INTERVIEW_BACKOUT: "interview_backout",
  INTERVIEW_REJECTED: "interview_rejected",
  //Condition Offer
  CONDITIONAL_OFFER_PREPARE: "conditional_offer_prepare",
  CONDITIONAL_OFFER_EDIT: "conditional_offer_edit",
  CONDITIONAL_OFFER_RELEASE: "conditional_offer_release",
  CONDITIONAL_OFFER_APPROVAL: "conditional_offer_approval",
  CONDITIONAL_OFFER_REJECTED: "conditional_offer_rejected",
};

export const OdinURLs = {
  PRE_SKILL_ASSESSMENT: "https://app.hackerearth.com/recruiter/",
  CODING_TEST_ASSESSMENT: "https://app.hackerearth.com/recruiter/",
  TECHNICAL_INTERVIEW_ASSESSMENT: "https://app.hackerearth.com/recruiter/",
  CULTURAL_FIT_TEST: "https://app.hackerearth.com/recruiter/interview/",
};

export const BillRateZeroLabels = {
  header: "Alert",
  body: "The bill rate is 0, Please fill the value to proceed further.",
};
