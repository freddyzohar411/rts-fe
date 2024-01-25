const JOB_INITIAL_OPTIONS = [
  {
    sortValue: "job_submission_data.dateOpen",
    label: "Date Open",
    value: "jobSubmissionData.dateOpen",
    sort: true,
  },
  {
    sortValue: "job_submission_data.salesManager",
    label: "Sales Manager",
    value: "jobSubmissionData.salesManager",
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
    sortValue: "job_submission_data.clientJobId",
    label: "Client Job Id",
    value: "jobSubmissionData.clientJobId",
    sort: true,
  },
  {
    sortValue: "job_submission_data.jobTitle",
    label: "Job Title",
    value: "jobSubmissionData.jobTitle",
    sort: true,
  },
  {
    sortValue: "job_submission_data.jobType",
    label: "Job Type",
    value: "jobSubmissionData.jobType",
    sort: true,
  },
  {
    sortValue: "job_submission_data.workLocation",
    label: "Work Location",
    value: "jobSubmissionData.workLocation",
    sort: true,
  },
  {
    sortValue: "job_submission_data.noOfHeadcounts",
    label: "No Of Headcounts",
    value: "jobSubmissionData.noOfHeadcounts",
    sort: true,
  },
];

const JOB_FILTERS = [
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

const JOB_STAGE_IDS = {
  TAG: 1,
  ASSOCIATE: 2,
  SUBMIT_TO_SALES: 3,
  SUBMIT_TO_CLIENT: 4,
};

const JOB_STAGE_STATUS = { IN_PROGRESS: "IN PROGRESS", COMPLETED: "COMPLETED" };

export { JOB_INITIAL_OPTIONS, JOB_FILTERS, JOB_STAGE_IDS, JOB_STAGE_STATUS };
