const JOB_MANDATORY_OPTIONS = [
  {
    sortValue: "job_submission_data.jobId",
    label: "Pulse Job Id",
    value: "jobSubmissionData.jobId",
    sort: true,
    expand: true,
  },
  {
    sortValue: "job_submission_data.jobTitle",
    label: "Job Title",
    value: "jobSubmissionData.jobTitle",
    sort: true,
    expand: true,
  },
  {
    sortValue: "recruiterName",
    label: "Recruiter(s)",
    value: "recruiterName",
    sort: false,
    expand: true,
  },
];

const JOB_INITIAL_OPTIONS = [
  {
    sortValue: "job_submission_data.jobType",
    label: "Job Type",
    value: "jobSubmissionData.jobType",
    sort: true,
  },
  {
    sortValue: "job_submission_data.dateOpen",
    label: "Date Open",
    value: "jobSubmissionData.dateOpen",
    sort: true,
  },
  {
    sortValue: "job_submission_data.accountOwner",
    label: "Account Owner",
    value: "jobSubmissionData.accountOwner",
    sort: true,
  },
  {
    sortValue: "job_submission_data.accountName",
    label: "Account Name",
    value: "jobSubmissionData.accountName",
    sort: true,
  },
  {
    sortValue: "job_submission_data.accountContact",
    label: "Account Contact",
    value: "jobSubmissionData.accountContact",
    sort: true,
  },
  {
    sortValue: "job_submission_data.workLocation",
    label: "Work Location",
    value: "jobSubmissionData.workLocation",
    sort: true,
  },
  {
    sortValue: "job_submission_data.noofheadcounts",
    label: "No. Of Headcounts",
    value: "jobSubmissionData.noofheadcounts",
    sort: true,
  },
];

const JOB_FILTERS = [
  {
    all_jobs: "All Jobs",
  },
  {
    new_job: "New Job Openings",
  },
  {
    active_jobs: "Active Job Openings",
  },
  {
    inactive_jobs: "Inactive Job Openings",
  },
  {
    closed_jobs: "Closed Job Openings",
  },
  {
    fod: "Focus of the Day",
  },
  {
    assigned_jobs: "Assigned Job Openings",
  },
];

const JOB_LABELS = {
  all_jobs: "All Jobs",
  new_job: "New Job Openings",
  active_jobs: "Active Job Openings",
  inactive_jobs: "Inactive Job Openings",
  closed_jobs: "Closed Job Openings",
  fod: "Focus of the Day",
  assigned_jobs: "Assigned Job Openings",
};

const JOB_STAGE_IDS = {
  TAG: 1,
  ASSOCIATE: 2,
  SUBMIT_TO_SALES: 3,
  SUBMIT_TO_CLIENT: 4,
  PROFILE_FEEDBACK_PENDING: 5,
  SKILLS_ASSESSMENT: 6,
  CODING_TEST: 7,
  TECHNICAL_INTERVIEW: 8,
  CULTURAL_FIT_TEST: 9,
  FIRST_INTERVIEW_SCHEDULED: 10,
  SECOND_INTERVIEW_SCHEDULED: 11,
  THIRD_INTERVIEW_SCHEDULED: 12,
  INTERVIEW_FEEDBACK_PENDING: 13,
  PREPARE_TOS: 14,
  TOS_APPROVAL: 15,
  CONDITIONAL_OFFER: 16,
  CONDITIONAL_OFFER_APPROVAL: 17,
};

const JOB_STAGE_STATUS = {
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  WITHDRAWN: "WITHDRAWN",
  REJECTED: "REJECTED",
  DRAFT: "DRAFT",
  RELEASED: "RELEASED",
  SKIPPED: "SKIPPED",
  ACCEPTED: "ACCEPTED",
};

const JOB_STAGE_STATUS_LABELS = {
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  WITHDRAWN: "Withdrawn",
  REJECTED: "Rejected",
  SKIPPED: "Skipped",
};

export {
  JOB_INITIAL_OPTIONS,
  JOB_FILTERS,
  JOB_LABELS,
  JOB_STAGE_IDS,
  JOB_STAGE_STATUS,
  JOB_MANDATORY_OPTIONS,
  JOB_STAGE_STATUS_LABELS,
};
