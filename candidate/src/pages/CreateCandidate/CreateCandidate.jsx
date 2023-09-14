import React, { useState } from "react";
import { Field, Formik, Form } from "formik";
import { FORM_OPTION } from "./constants";
import FormStep from "./FormStep";
import FormStepper from "./FormStepper";

const CreateCandidate = () => {
  const [step, setStep] = useState(0);

  const handleFormSubmit = () => {};

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleNext = () => {
    if (step < 7) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  return (
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
  );
};
export default CreateCandidate;
