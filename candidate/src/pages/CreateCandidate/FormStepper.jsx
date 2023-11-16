import { useState } from "react";
import { Button, Card, Container } from "reactstrap";
import { useDispatch } from "react-redux";
import CandidateStepper from "../../components/CandidateStepper/CandidateStepper";
// import { deleteDraftAccount } from "../../store/accountregistration/action";
import { DeleteCustomModal } from "@Workspace/common";
import { CandidateTableListConstant } from "../../constants/candidateConstant";

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

    // if (activeStep === 1) {
    //   const table = formFieldsData.filter(
    //     (field) => field.name === "contactList"
    //   );
    //   if (table.length === 1 && table[0]?.tableData?.length > 0) {
    //     setErrorMessage(null);
    //     handleNext();
    //   } else {
    //     setErrorMessage("Please add 1 contact to proceed");
    //   }
    // }
    // if (activeStep === 2) {
    //   const table = formFieldsData.filter(
    //     (field) => field.name === "documentList"
    //   );
    //   if (table.length === 1 && table[0]?.tableData?.length > 0) {
    //     setErrorMessage(null);
    //     handleNext();
    //   } else {
    //     setErrorMessage("Please add 1 document to proceed");
    //   }
    // }
    // if (activeStep === 3 && formikRef?.current?.formik) {
    //   formikRef.current.formik.submitForm();
    // }
    // if (activeStep === 4) {
    //   handleNext();
    // }
    // if (activeStep === 5 && formikRef?.current?.formik) {
    //   formikRef.current.formik.submitForm();
    // }

    // if (activeStep <= 5) {
    //   handleNext();
    // }
  };

  const resetAndDeleteDraftForm = () => {
    dispatch(
      deleteDraftAccount({
        candidateId: candidateId,
        resetStepper: resetStepper,
      })
    );
    setIsDeleteModalOpen(false);
  };

  return (
    <Card>
      <DeleteCustomModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        confirmDelete={resetAndDeleteDraftForm}
        header="Reset Account Form"
        deleteText={"Are you sure you would like to reset candidate form?"}
      />
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
              className="btn btn-danger"
            >
              Reset
            </Button>
          )}
          <div className="d-flex gap-2">
            {activeStep > 0 && (
              <Button color="dark" onClick={handleBack}>
                Back
              </Button>
            )}
            <Button color="dark">Skip</Button>
            <Button color="dark" onClick={handleNextStep}>
              Next
            </Button>
          </div>
        </div>
      </Container>
    </Card>
  );
};
export default FormStepper;
