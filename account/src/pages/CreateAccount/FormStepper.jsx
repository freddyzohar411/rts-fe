import { Button, Card, Container } from "reactstrap";
import AccountStepper from "../../components/AccountStepper/AccountStepper";

const FormStepper = ({
  activeStep,
  handleBack,
  handleNext,
  children,
  formFormik,
  formFieldsData,
  setErrorMessage
}) => {
  const handleNextStep = () => {
    if (activeStep === 0 && formFormik) {
      formFormik.submitForm();
    }
    if (activeStep === 1) {
      const table = formFieldsData.filter(
        (field) => field.name === "contactList"
      );
      if (table.length === 1 && table[0]?.tableData?.length > 0) {
        setErrorMessage(null)
        handleNext();
      } else {
        setErrorMessage("Please add 1 contact to proceed")
        // console.log("Please add 1 contact to proceed")
      }

    }
    if (activeStep === 2) {
      const table = formFieldsData.filter(
        (field) => field.name === "documentList"
      );
      if (table.length === 1 && table[0]?.tableData?.length > 0) {
        setErrorMessage(null)
        handleNext();
      } else {
        setErrorMessage("Please add 1 document to proceed")
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
  return (
    <Card>
      <Container fluid>
        <AccountStepper step={activeStep} />
        <div className="px-3"> {children}</div>
        <div className="d-flex justify-content-end gap-2 mb-2">
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
      </Container>
    </Card>
  );
};
export default FormStepper;
