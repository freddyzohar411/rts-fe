import { Button, Card, Container } from "reactstrap";
import CandidateStepper from "../CandidateStepper/CandidateStepper";
import { useUserAuth } from "@workspace/login";
import { CandidateTableListConstant } from "../../constants/candidateConstant";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const FormStepper = ({
  activeStep,
  handleBack,
  handleNext,
  children,
  formikRef,
  formFieldsData,
  setErrorMessage,
  candidateId,
  resetStepper,
  toggleFormViewState,
  viewState,
  setStep
}) => {
  const { Permission, checkAllPermission } = useUserAuth();
  const navigate = useNavigate();
  
  const handleNextStep = () => {
    if (activeStep === 0 && formikRef?.current?.formik) {
      formikRef.current.formik.submitForm();
    }

    if (activeStep === 1 && formikRef?.current?.formik) {
      const table = formFieldsData.filter(
        (field) => field.name === CandidateTableListConstant.DOCUMENTS_LIST
      );
      if (table.length === 1 && table[0]?.tableData?.length > 0) {
        setErrorMessage(null);
        handleNext();
      } else {
        setErrorMessage("Please add 1 document to proceed");
      }
    }

    if (activeStep === 2) {
      handleNext();
    }

    if (activeStep === 3) {
      handleNext();
    }

    if (activeStep === 4) {
      handleNext();
    }

    if (activeStep === 5) {
      handleNext();
    }
    if (activeStep === 6) {
      navigate("/candidates");
      if (viewState === false) {
        toast.success("Candidate updated successfully");
      }
    }
  };

  const checkReadEditPermission = () => {
    return checkAllPermission([
      Permission.CANDIDATE_EDIT,
      Permission.CANDIDATE_READ,
    ]);
  };

  return (
    <>
      <CandidateStepper step={activeStep} setStep={setStep}/>
      <div className="px-3"> {children}</div>
      <div
        className={`d-flex ${
          candidateId && checkReadEditPermission()
            ? "justify-content-between"
            : "justify-content-end"
        } align-items-center mb-2`}
      >
        {candidateId && checkReadEditPermission() && (
          <Button onClick={toggleFormViewState} className="btn btn-custom-primary">
            {viewState ? "Edit" : "View"}
          </Button>
        )}
        <div className="d-flex gap-2">
          {activeStep > 0 && (
            <Button className="btn btn-custom-primary" onClick={handleBack}>
              Back
            </Button>
          )}
          <Button className="btn btn-custom-primary">Skip</Button>
          <Button className="btn btn-custom-primary" onClick={handleNextStep}>
            Next
          </Button>
        </div>
      </div>
    </>
  );
};
export default FormStepper;
