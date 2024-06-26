export const moduleConstants = [
  { label: "Accounts", value: "Accounts" },
  { label: "Jobs", value: "Jobs" },
  { label: "Candidates", value: "Candidates" },
];

export const injectionVariables = [
  { label: "Reset Password Link", value: "RESET_PASSWORD_LINK" },
  { label: "Login OTP Token", value: "LOGIN_OTP_TOKEN" },
];

export const fixedVariables = {
  Login: [
    { label: "Login OTP Token", value: "LOGIN_OTP_TOKEN", type: 1 },
    { label: "Reset Password Link", value: "RESET_PASSWORD_LINK", type: 1 },
  ],
  Interview: [
    { label: "Interview Start Date", value: "INTERVIEW_START_DATE", type: 2 },
    { label: "Interview End Date", value: "INTERVIEW_END_DATE", type: 2 },
    { label: "Interview Start Time", value: "INTERVIEW_START_TIME", type: 2 },
    { label: "Interview End Time", value: "INTERVIEW_END_TIME", type: 2 },
    { label: "Interview Location", value: "INTERVIEW_LOCATION", type: 2 },
  ],
};

export const templateCategoryList = [
  {
    label: "Email - Submit to Sales",
    value: "Email - Submit to Sales",
  },
  {
    label: "Email - Submit to Client",
    value: "Email - Submit to Client",
  },
  {
    label: "Email - Interview Schedule",
    value: "Email - Interview Schedule",
  },
  {
    label: "Email - Conditional Offer Release",
    value: "Email - Conditional Offer Release",
  },
  {
    label: "CV",
    value: "CV",
  },
  {
    label: "Table Templates",
    value: "Table Templates",
  },
  {
    label: "Old UAT Templates",
    value: "Old UAT Templates",
  },
  {
    label: "User Admin Backend Templates",
    value: "User Admin Backend Templates",
  },
];
