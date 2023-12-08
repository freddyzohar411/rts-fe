import { useState } from "react";
import { Button, Card, CardBody, Container } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import CandidateStepper from "../../components/CandidateStepper/CandidateStepper";
import { DeleteCustomModal } from "@Workspace/common";
import { CandidateTableListConstant } from "../../constants/candidateConstant";
import {
  deleteDraftCandidate,
  resetMetaDataCandidateRegistration,
} from "../../store/candidateregistration/action";
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
}) => {
  const dispatch = useDispatch();

  // Delete modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const deleteDraftCandidateMetaData = useSelector(
    (state) => state.CandidateRegistrationReducer.deleteMeta
  );

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

    if (activeStep === 6 && formikRef?.current?.formik) {
      formikRef.current.formik.submitForm();
    }
  };

  const resetAndDeleteDraftForm = () => {
    dispatch(
      deleteDraftCandidate({
        candidateId: candidateId,
        resetStepper: resetStepper,
      })
    );
  };

  /**
   * Handle delete draft candidate success
   */
  if (deleteDraftCandidateMetaData?.isSuccess) {
    setIsDeleteModalOpen(false);
    resetStepper(0);
    toast.success("Candidate form reset successfully");
    dispatch(resetMetaDataCandidateRegistration());
  }

  return (
    <Card>
      <CardBody>
        <Container fluid>
          <CandidateStepper step={activeStep} />
          <div className="px-3"> {children}</div>
          <div
            className={`d-flex ${
              candidateId ? "justify-content-between" : "justify-content-end"
            } align-items-center mb-2`}
          >
            {candidateId && (
              <Button
                onClick={() => setIsDeleteModalOpen(true)}
                className="btn btn-custom-primary"
              >
                Reset
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
        </Container>
      </CardBody>
      <DeleteCustomModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        confirmDelete={resetAndDeleteDraftForm}
        header="Reset Account Form"
        deleteText={"Are you sure you would like to reset candidate form?"}
        isLoading={deleteDraftCandidateMetaData?.isLoading}
      />
    </Card>
  );
};
export default FormStepper;
