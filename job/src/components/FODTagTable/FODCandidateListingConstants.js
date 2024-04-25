import {Link} from "react-router-dom";

const CANDIDATE_INITIAL_OPTIONS = [
  {
    label: "Candidate First Name",
    value: "candidateSubmissionData.firstName",
    sort: true,
    sortValue: "candidate_submission_data.firstName",
  },
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
    label: "Phone",
    value: "candidate_submission_data.phone",
    sort: true,
    sortValue: "candidate_submission_data.phone",
  },
  {
    label: "Email",
    value: "candidateSubmissionData.email",
    sort: true,
    sortValue: "candidate_submission_data.email",
  },
  {
    label: "Experience",
    value: "candidateSubmissionData.totalExperience",
    sort: true,
    sortValue: "candidate_submission_data.totalExperience",
  }
];

export { CANDIDATE_INITIAL_OPTIONS };
