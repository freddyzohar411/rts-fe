export const SCHEDULE_INTERVIEW = "schedule_interview";
export const generateInterviewTemplateMap = (formik) => ({
  "$[[INTERVIEW_START_DATE]]": () => {
    return formik?.values?.fromDate;
  },
  "$[[INTERVIEW_END_DATE]]": () => {
    return formik?.values?.toDate;
  },
  "$[[INTERVIEW_START_TIME]]": () => {
    return formik?.values?.fromTime;
  },
  "$[[INTERVIEW_END_TIME]]": () => {
    return formik?.values?.toTime;
  },
  "$[[INTERVIEW_LOCATION]]": () => {
    return formik?.values?.location;
  },
});
