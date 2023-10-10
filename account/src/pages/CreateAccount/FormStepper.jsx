import { Button, Card, Container } from "reactstrap";
import AccountStepper from "../../components/AccountStepper/AccountStepper";

const FormStepper = ({
  activeStep,
  handleBack,
  handleNext,
  children,
  formFormik,
  formFieldsData,
}) => {
  const handleNextStep = () => {
    if (activeStep === 0 && formFormik) {
      formFormik.submitForm();
      console.log("SUBMITT NO VALIDAtion");
    }
    if (activeStep === 1) {
      console.log("Form field Data: ", formFieldsData)
      const table = formFieldsData.filter(
        (field) => field.name === "contactList"
      );
      console.log('table: ', table)
      if (table.length === 1 && table[0]?.tableData?.length > 1) {
        handleNext();
      } else {
        console.log("Please add 1 contact to proceed")
      }

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
