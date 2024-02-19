export const fieldLocation = {
  left: "d-flex justify-content-start",
  center: "d-flex justify-content-center",
  right: "d-flex justify-content-end",
};

export const fieldSize = {
  auto: "w-auto",
  "25%": "w-25",
  "50%": "w-50",
  "75%": "w-75",
  "100%": "w-100",
};

export const candidateStatus = [
  {
    value: "WITHDRAWN",
    label: "Profile Withdrawn",
  },
  { value: "REJECTED", label: "Profile Rejected" },
  {
    value: "COMPLETED",
    label: "Profile Selected",
  },
];

export const PROFILE_FEEDBACK_OPTIONS = [
  {
    value: "WITHDRAWN",
    label: "Profile Withdrawn",
  },
  { value: "REJECTED", label: "Profile Rejected" },
  {
    value: "first_interview_scheduled",
    label: "1st Interview Scheduled",
  },
];

export const FIRST_INTERVIEW_FEEDBACK_OPTIONS = [
  {
    value: "WITHDRAWN",
    label: "Profile Withdrawn",
  },
  { value: "REJECTED", label: "Profile Rejected" },
  {
    value: "2nd Interview Scheduled",
    label: "Scheduled 2nd Interview",
  },
];

export const SECOND_INTERVIEW_FEEDBACK_OPTIONS = [
  {
    value: "WITHDRAWN",
    label: "Profile Withdrawn",
  },
  { value: "REJECTED", label: "Profile Rejected" },
  {
    value: "3rd Interview Scheduled",
    label: "Scheduled 3rd Interview",
  },
  {
    value: "2nd Interview Scheduled",
    label: "Rescheduled 2nd Interview",
  },
];
