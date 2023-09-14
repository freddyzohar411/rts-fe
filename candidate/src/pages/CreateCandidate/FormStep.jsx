import {
  BasicInfo,
  Certifications,
  Documents,
  EducationDetails,
  EmployerDetails,
  Languages,
  WorkExperience,
} from "../../components";

const FormStep = ({ step, handleNext = { handleNext } }) => {
  console.log("test step", step);
  return (
    <div>
      {step === 0 && <BasicInfo handleNext={handleNext} />}
      {step === 1 && <Certifications />}
      {step === 2 && <Documents />}
      {step === 3 && <EducationDetails />}
      {step === 4 && <EmployerDetails />}
      {step === 5 && <Languages />}
      {step === 6 && <WorkExperience />}
    </div>
  );
};
export default FormStep;
