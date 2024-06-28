export const staticColumns = [
  "New Requirements",
  "Associated",
  "Submitted to Sales",
  "Interview Scheduled",
  "Selected",
  "Active Requirements",
  "No Submission",
  "Submitted to Client",
  "Interview Happened",
  "Rejected",
];

export const CANDIDATE_STATIC_INITIAL_OPTIONS = [
  {
    sortValue: "job.job_submission_data.accountOwner",
    label: "Sales Person",
    value: "job.jobSubmissionData.accountOwner",
    sort: true,
    expand: true,
  },
  {
    sortValue: "users.first_name",
    label: "Recruiter",
    value: "createdByName",
    sort: true,
    expand: true,
  },
];

export const CANDIDATE_STATIC_MANDATORY_OPTIONS = [];
