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
    sortValue: "job.job_submission_data.accountName",
    label: "Client Name",
    value: "job.jobSubmissionData.accountName",
    sort: true,
    expand: true,
  },
  {
    sortValue: "job.job_submission_data.jobTitle",
    label: "Job Title",
    value: "job.jobSubmissionData.jobTitle",
    sort: true,
    expand: true,
  },
  {
    sortValue: "job.job_submission_data.jobId",
    label: "Pulse Job ID",
    value: "job.jobSubmissionData.jobId",
    sort: true,
    expand: true,
  },
  {
    sortValue: "job.job_submission_data.accountOwner",
    label: "Sales Person",
    value: "job.jobSubmissionData.accountOwner",
    sort: true,
    expand: true,
  },
  {
    sortValue: "createdByName",
    label: "Recruiter",
    value: "createdByName",
    sort: true,
    expand: true,
  },
];

export const CANDIDATE_STATIC_MANDATORY_OPTIONS = [];
