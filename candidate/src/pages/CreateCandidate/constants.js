import {
  BasicInfo,
  Certifications,
  Documents,
  EducationDetails,
  EmployerDetails,
  Languages,
  WorkExperience,
} from "../../components";
import * as yup from "yup";

export const candidateInitialValues = {
  basicInfo: {
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    phone: "",
    candidateNationality: "",
    currentLocation: "",
    visaStatus: "",
    languageKnown: "",
    candidateOwner: "",
    totalExperience: "",
    relevantExperience: "",
    currentEmployer: "",
    currentPositionTitle: "",
    candidateCurrentSalary: "",
    candidateExpectedSalary: "",
    reasonforChange: "",
    noticeperiod: "",
    profileSummary: "",
    primarySkills: "",
    secondarySkills: "",
    additionalInfo: "",
    candidateStatus: "",
    source: "",
    referrerName: "",
  },
  documents: {
    tittle: "",
    type: "",
    comments: "",
  },
};

export const candidateSchema = yup.object().shape({
  basicInfo: yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    gender: yup.string().required("Gender is required"),
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    phone: yup.string().required("Phone is required"),
    // candidateNationality: yup
    //   .string()
    //   .required("Candidate Nationality is required"),
    currentLocation: yup.string().required("Current location is required"),
    visaStatus: yup.string().required("Visa Status is required"),
    totalExperience: yup.string().required("Total Experience is required"),
    relevantExperience: yup
      .string()
      .required("Relevant Experience is required"),
    currentEmployer: yup.string().required("Current Employer is required"),
    currentPositionTitle: yup
      .string()
      .required("Current Position Title is required"),
    candidateCurrentSalary: yup
      .string()
      .required("Candidate Current Salary is required"),
    candidateExpectedSalary: yup
      .string()
      .required("Candidate Expected Salary is required"),
    reasonforChange: yup.string().required("Reason for Change is required"),
    noticeperiod: yup.string().required("Notice period is required"),
    profileSummary: yup.string().required("Profile Summary is required"),
  }),
});

export const steps = [
  { label: "Basic Info", value: "Basic-Info" },
  { label: "Certifications", value: "Certifications" },
  { label: "Documents", value: "Documents" },
  { label: "Education Details", value: "Education-Details" },
  { label: "Employer Details", value: "Employer-Details" },
  { label: "Languages", value: "Languages" },
  { label: "Work Experience", value: "Work-Experience" },
];

export const FORM_OPTION = [
  {
    initialValues: candidateInitialValues,
    schema: candidateSchema,
    form: BasicInfo,
  },
  {
    initialValues: candidateInitialValues,
    schema: candidateSchema,
    form: Certifications,
  },
  {
    initialValues: candidateInitialValues,
    schema: candidateSchema,
    form: Documents,
  },
  {
    initialValues: candidateInitialValues,
    schema: candidateSchema,
    form: EducationDetails,
  },
  {
    initialValues: candidateInitialValues,
    schema: candidateSchema,
    form: EmployerDetails,
  },
  {
    initialValues: candidateInitialValues,
    schema: candidateSchema,
    form: Languages,
  },
  {
    initialValues: candidateInitialValues,
    schema: candidateSchema,
    form: WorkExperience,
  },
];
