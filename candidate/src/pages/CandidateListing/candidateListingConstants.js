const CANDIDATE_INITIAL_OPTIONS = [
  {
    label: "Candidate Last Name",
    value: "candidateSubmissionData.lastName",
    sort: true,
    sortValue: "candidate_submission_data.lastName",
  },
  {
    label: "Candidate Nationality",
    value: "candidateSubmissionData.candidateNationality",
    sort: true,
    sortValue: "candidate_submission_data.candidateNationality",
  },
  {
    label: "Candidate Status",
    value: "candidateSubmissionData.candidateStatus",
    sort: true,
    sortValue: "candidate_submission_data.candidateStatus",
  },
  {
    label: "Visa Status",
    value: "candidateSubmissionData.visaStatus",
    sort: true,
    sortValue: "candidate_submission_data.visaStatus",
  },
  {
    label: "Created By",
    value: "createdByName",
    sort: false,
    sortValue: "createdByName",
  },
  {
    label: "Created On",
    value: "createdAt",
    sort: true,
    sortValue: "created_at",
  },
  {
    label: "Email",
    value: "candidateSubmissionData.email",
    sort: true,
    sortValue: "candidate_submission_data.email",
  },
];

const CANDIDATE_MANDATORY_OPTIONS = [
  {
    label: "Candidate First Name",
    value: "candidateSubmissionData.firstName",
    sort: true,
    sortValue: "candidate_submission_data.firstName",
  },
];

export { CANDIDATE_INITIAL_OPTIONS, CANDIDATE_MANDATORY_OPTIONS };
