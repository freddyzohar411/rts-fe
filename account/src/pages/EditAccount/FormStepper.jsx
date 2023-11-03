import { Button, Card, Container } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AccountStepper from "../../components/AccountStepper/AccountStepper";
import { DeleteCustomModal } from "@Workspace/common";
import { useState } from "react";
import { useUserAuth } from "@workspace/login";

const FormStepper = ({
  activeStep,
  handleBack,
  handleNext,
  children,
  formFormik,
  formFieldsData,
  setErrorMessage,
  accountId,
  resetStepper,
  toggleFormViewState,
  viewState,
}) => {
  const { Permission, checkAllPermission } = useUserAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("Form Stepper View", viewState);

  // Delete modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleNextStep = () => {
    if (activeStep === 0 && formFormik) {
      formFormik.submitForm();
    }
    if (activeStep === 1) {
      const table = formFieldsData.filter(
        (field) => field.name === "contactList"
      );
      if (table.length === 1 && table[0]?.tableData?.length > 0) {
        setErrorMessage(null);
        handleNext();
      } else {
        setErrorMessage("Please add 1 contact to proceed");
        // console.log("Please add 1 contact to proceed")
      }
    }
    if (activeStep === 2) {
      const table = formFieldsData.filter(
        (field) => field.name === "documentList"
      );
      if (table.length === 1 && table[0]?.tableData?.length > 0) {
        setErrorMessage(null);
        handleNext();
      } else {
        setErrorMessage("Please add 1 document to proceed");
        // console.log("Please add 1 document to proceed")
      }
    }
    if (activeStep === 3 && formFormik) {
      formFormik.submitForm();
    }
    if (activeStep === 4) {
      handleNext();
    }
    if (activeStep === 5 && formFormik) {
      formFormik.submitForm();
    }
  };

  // const resetAndDeleteDraftForm = () => {
  //   console.log("Reset and delete draft form");
  //   // dispatch(
  //   //   deleteDraftAccount({
  //   //     accountId: accountId,
  //   //     resetStepper: resetStepper,
  //   //   })
  //   // );
  //   setIsDeleteModalOpen(false);
  // };

  const checkReadEditPermission = () => {
    return checkAllPermission([
      Permission.ACCOUNT_EDIT,
      Permission.ACCOUNT_READ,
    ]);
  };

  return (
    <Card>
      {/* <DeleteCustomModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        confirmDelete={resetAndDeleteDraftForm}
        header="Reset Account Form"
        deleteText={"Are you sure you would like to reset account form?"}
      /> */}
      <Container fluid>
        <AccountStepper step={activeStep} />
        <div className="px-3"> {children}</div>
        <div
          className={`d-flex ${
            accountId && checkReadEditPermission()
              ? "justify-content-between"
              : "justify-content-end"
          } align-items-center mb-2`}
        >
          {accountId && checkReadEditPermission() && (
            <Button onClick={toggleFormViewState} className="btn btn-danger">
              {viewState ? "Edit" : "View"}
            </Button>
          )}
          {/* <div className={`d-flex justify-content-end align-items-center mb-2`}> */}
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
