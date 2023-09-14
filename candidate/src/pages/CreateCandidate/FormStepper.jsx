import { Button, Card } from "reactstrap";

const FormStepper = ({ activeStep, handleBack, handleNext, children }) => {
  return (
    <>
      <Card>
        {children}
        <div>
          <Button
            type="button"
            color="primary"
            className="btn mb-2 me-2"
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            type="button"
            color="primary"
            className="btn mb-2 me-2"
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
        <div className="d-flex justify-content-end gap-2 mb-2">
          <Button size="sm" color="primary">
            Cancel
          </Button>
          <Button size="sm" color="primary">
            Skip
          </Button>
          <Button size="sm" color="primary" onClick={handleNext}>
            Next
          </Button>
        </div>
      </Card>
    </>
  );
};
export default FormStepper;
