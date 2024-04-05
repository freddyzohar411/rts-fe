import { Button, Card, Container } from "reactstrap";
import AccountStepper from "../../components/AccountStepper/AccountStepper";
import { useUserAuth } from "@workspace/login";

const FormStepper = ({
  activeStep,
  handleBack,
  handleNext,
  children,
  formikRef,
  formFieldsData,
  setErrorMessage,
  accountId,
  resetStepper,
  toggleFormViewState,
  viewState,
  setStep
}) => {
  const { Permission, checkAllPermission } = useUserAuth();

  const handleNextStep = () => {
    if (activeStep === 0 && formikRef?.current?.formik) {
      formikRef.current.formik.submitForm();
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
      }
    }
    if (activeStep === 3 && formikRef?.current?.formik) {
      formikRef.current.formik.submitForm();
    }
    if (activeStep === 4 && formikRef?.current?.formik) {
      formikRef.current.formik.submitForm();
    }
  };

  const checkReadEditPermission = () => {
    return checkAllPermission([
      Permission.ACCOUNT_EDIT,
      Permission.ACCOUNT_READ,
    ]);
  };

  return (
    <Card>
      <Container fluid>
        <AccountStepper step={activeStep} setStep={setStep} />
        <div className="px-3"> {children}</div>
        <div
          className={`d-flex ${
            accountId && checkReadEditPermission()
              ? "justify-content-between"
              : "justify-content-end"
          } align-items-center mb-2`}
        >
          {accountId && checkReadEditPermission() && (
            <Button
              onClick={toggleFormViewState}
              className="btn btn-custom-primary"
            >
              {viewState ? "Edit" : "View"}
            </Button>
          )}
          <div className="d-flex gap-2">
            {activeStep > 0 && (
              <Button className="btn btn-custom-primary" onClick={handleBack}>
                Back
              </Button>
            )}
            <Button className="btn btn-custom-primary" onClick={handleNextStep}>
              Next
            </Button>
          </div>
        </div>
      </Container>
    </Card>
  );
};
export default FormStepper;
