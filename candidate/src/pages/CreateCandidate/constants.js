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
    firstName: "Rahul",
  },
};

export const candidateSchema = yup.object().shape({});
export const candidateSchemaDefault = yup.object().shape({});

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
    initialValue: candidateInitialValues,
    schema: candidateSchemaDefault,
    form: BasicInfo,
  },
  {
    initialValue: candidateInitialValues,
    schema: candidateSchemaDefault,
    form: Certifications,
  },
  {
    initialValue: candidateInitialValues,
    schema: candidateSchemaDefault,
    form: Documents,
  },
  {
    initialValue: candidateInitialValues,
    schema: candidateSchemaDefault,
    form: EducationDetails,
  },
  {
    initialValue: candidateInitialValues,
    schema: candidateSchemaDefault,
    form: EmployerDetails,
  },
  {
    initialValue: candidateInitialValues,
    schema: candidateSchemaDefault,
    form: Languages,
  },
  {
    initialValue: candidateInitialValues,
    schema: candidateSchemaDefault,
    form: WorkExperience,
  },
];
