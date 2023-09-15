import { Button, Card, Container } from "reactstrap";
import { Field, useFormikContext } from "formik";
import Stepper from "../../components/Stepper/Stepper";

const FormStepper = ({ activeStep, handleBack, handleNext, children }) => {
  const { handleSubmit, validateForm } = useFormikContext();

  const onClickNextHandler = async () => {
    const form = await validateForm();
    if (form && Object.keys(form).length === 0) {
      handleNext();
    }
  };

  return (
    <Card>
      <Container>
        <Stepper step={activeStep} />
        <form onSubmit={handleSubmit}>
          {children}
          <div className="d-flex justify-content-end gap-2 mb-2">
            <Button color="dark" onClick={handleBack}>
              Cancel
            </Button>
            <Button color="dark">Skip</Button>
            <Button color="dark" onClick={onClickNextHandler}>
              Next
            </Button>
          </div>
        </form>
      </Container>
    </Card>
  );
};
export default FormStepper;
