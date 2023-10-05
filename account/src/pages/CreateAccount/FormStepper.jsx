import { Button, Card, Container } from "reactstrap";
import AccountStepper from "../../components/AccountStepper/AccountStepper";

const FormStepper = ({
  activeStep,
  handleBack,
  handleNext,
  children,
  formFormik,
}) => {
  const handleNextStep = () => {
    if (formFormik) {
      formFormik.submitForm();
      console.log("FORM SUBMITTED");
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
