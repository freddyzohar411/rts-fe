export const candidateParseFields = [
  {
    label: "Basic Info",
    // value: "basicInfo__firstName", => basicInfo[key] of the candidateMapping and firstName is the Key within the value
    options: [
      { label: "First Name", value: "basicInfo__firstName" },
      { label: "Last Name", value: "basicInfo__lastName" },
      { label: "Email", value: "basicInfo__email" },
      { label: "Gender", value: "basicInfo__gender" },
      { label: "Phone", value: "basicInfo__phone" },
      { label: "Phone Code", value: "basicInfo__phoneCode" },
      { label: "Languages", value: "basicInfo__languages" },
      { label: "Current Location", value: "basicInfo__currentLocation" },
      { label: "Profile Summary", value: "basicInfo__profileSummary" },
      {
        label: "CandidateNationality",
        value: "basicInfo__candidateNationality",
      },
      { label: "Total Experience", value: "basicInfo__totalExperience" },
      { label: "Primary Skills", value: "basicInfo__primarySkills" },
      { label: "Secondary Skills", value: "basicInfo__secondarySkills" },
      { label: "Current Position Title", value: "basicInfo__jobTitle" },
      { label: "Expected Salary", value: "basicInfo__expectedSalary" },
      { label: "Current Employer", value: "basicInfo__currentEmployer" },
    ],
  },
  {
    label: "Work Experiences",
    options: [
      { label: "Company Name", value: "workExperience__companyName" },
      { label: "Job Title", value: "workExperience__jobTitle" },
      { label: "Start Date", value: "workExperience__startDate" },
      { label: "End Date", value: "workExperience__endDate" },
      { label: "industry", value: "workExperience__industry" },
      { label: "Description", value: "workExperience__description" },
    ],
  },
  {
    label: "Languages",
    options: [{ label: "Languages", value: "languages__languages" }],
  },
  {
    label: "Education Details",
    options: [
      { label: "Institute Name", value: "educationDetails__name" },
      { label: "Field of Study", value: "educationDetails__fieldOfStudy" },
      { label: "Start Date", value: "educationDetails__startDate" },
      { label: "End Date", value: "educationDetails__endDate" },
      { label: "Description", value: "educationDetails__description" },
      {
        label: "Qualification",
        value: "educationDetails__qualification",
      },
      { label: "Grade", value: "educationDetails__grade" },
      { label: "Activities", value: "educationDetails__activities" },
    ],
  },
  {
    label: "Certification",
    options: [
      { label: "Certification Name", value: "certifications__name" },
      { label: "Issuing Organization", value: "certifications__from" },
      { label: "Date", value: "certifications__date" },
    ],
  },
  {
    label: "Documents",
    options: [
      { label: "Document Name", value: "documents__name" },
      { label: "Document Type", value: "documents__type" },
      { label: "Document File", value: "documents__file" },
    ],
  },
];

export function candidateParseFieldsFilter(includeArray = []) {
  return candidateParseFields.filter((field) =>
    includeArray.includes(field.label)
  );
}
