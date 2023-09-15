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
  return (
    <div>
      {step === 0 && <BasicInfo handleNext={handleNext} />}
      {step === 1 && <Documents />}
      {step === 2 && <WorkExperience />}
      {step === 3 && <EducationDetails />}
      {step === 4 && <Certifications />}
      {step === 5 && <Languages />}
      {step === 6 && <EmployerDetails />}
    </div>
  );
};
export default FormStep;
