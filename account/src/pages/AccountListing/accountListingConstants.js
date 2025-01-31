const ACCOUNT_MANDATORY_OPTIONS = [
  {
    sortValue: "account_submission_data.accountId",
    label: "Pulse Account Id",
    value: "accountSubmissionData.accountId",
    sort: true,
    expand: true,
  },
  {
    label: "Account Number",
    value: "accountNumber",
    sort: true,
    sortValue: "account_submission_data.accountNumber",
  },
  {
    label: "Account Name",
    value: "accountSubmissionData.accountName",
    sort: true,
    sortValue: "account_submission_data.accountName",
    expand: true,
  },
];

const ACCOUNT_INITIAL_OPTIONS = [
  {
    label: "Account Source",
    value: "accountSubmissionData.accountSource",
    sort: true,
    sortValue: "account_submission_data.accountSource",
  },
  {
    label: "Account Owner",
    value: "accountSubmissionData.accountOwner",
    sort: true,
    sortValue: "account_submission_data.accountOwner",
  },
  {
    label: "Created By",
    value: "createdByName",
    sort: false,
    sortValue: "createdByName",
  },
  {
    label: "Parent Account",
    value: "accountSubmissionData.parentCompany",
    sort: true,
    sortValue: "account_submission_data.parentCompany",
  },
  {
    label: "Account Status",
    value: "accountSubmissionData.accountStatus",
    sort: true,
    sortValue: "account_submission_data.accountStatus",
  },
];

export { ACCOUNT_INITIAL_OPTIONS, ACCOUNT_MANDATORY_OPTIONS };
