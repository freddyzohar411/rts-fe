const ACCOUNT_INITIAL_OPTIONS = [
    {
      label: "Account Source",
      value: "accountSubmissionData.accountSource",
      sort: true,
      sortValue: "account_submission_data.accountSource",
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
    },
    {
      label: "Account Owner",
      value: "accountSubmissionData.secondaryOwner",
      sort: true,
      sortValue: "account_submission_data.secondaryOwner",
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

  export {
    ACCOUNT_INITIAL_OPTIONS,
  }