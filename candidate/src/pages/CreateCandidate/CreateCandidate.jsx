import React, { useState } from "react";
import { Formik } from "formik";
import { FORM_OPTION } from "./constants";
import FormStep from "./FormStep";
import FormStepper from "./FormStepper";
import { Container } from "reactstrap";

const CreateCandidate = () => {
  const [step, setStep] = useState(0);

  const handleFormSubmit = () => {};

  const handleBack = () => {
    if (step > 0) {
      setStep((prevStep) => prevStep - 1);
    }
  };

  const handleNext = () => {
    if (step < 6) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  return (
    <Container className="page-content">
      <Formik
        validateOnBlur
        validateOnChange={false}
        initialValues={FORM_OPTION[step].initialValues}
        validationSchema={FORM_OPTION[step].schema}
        onSubmit={handleFormSubmit}
      >
        <FormStepper
          activeStep={step}
          handleBack={handleBack}
          handleNext={handleNext}
        >
          <FormStep step={step} handleNext={handleNext} />
        </FormStepper>
      </Formik>
    </Container>
  );
};
export default CreateCandidate;
