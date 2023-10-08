import React, { useState, useEffect, useCallback } from "react";
import AccountStepper from "../../components/AccountStepper/AccountStepper";
import { Button, Container } from "reactstrap";
import FormStepper from "./FormStepper";
import { Form } from "@workspace/common";
import { useSelector, useDispatch } from "react-redux";
import { fetchAccountForm } from "../../store/accountForm/action";
import { AccountFormConstant } from "./accountFormConstant";

const AccountCreation = () => {
  const dispatch = useDispatch();

  const form = useSelector((state) => state.AccountFormReducer.form);
  const MAX_STEP = 6;
  const [step, setStep] = useState(1);
  const [formFormik, setFormFormik] = useState(null);
  const [editData, setEditData] = useState(null);

  const handleFormikChange = useCallback((formik) => {
    // Handle formik change here
    setFormFormik(formik);
    console.log("Formik has changed:", formik);
  }, []);

  useEffect(() => {
    dispatch(fetchAccountForm(AccountFormConstant[step]));
  }, [step]);

  const handleFormSubmit = (event, values, newValues, buttonName, formStateHook) => {
    const { formState, setFormState } = formStateHook;
    console.log("values", values);
    console.log("newValues", newValues);
    console.log("Button Name:", buttonName);
    if (step === 0) {
      // const buttonName = event;
      // const submitData = {
      //   formId: form.id,
      //   submissionData: JSON.stringify(newValues),
      //   entityId: 1,
      //   entityType: "Account",
      // };
      // fetch("http://localhost:9400/form-submissions", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(submitData),
      // })
      //   .then((response) => response.json())
      //   .then(
      //     (data) => {
      //       const reponseData = data.data;
      //       reponseData.submissionData = JSON.parse(reponseData.submissionData);
      //       console.log("Success Data:", reponseData);
      //     },
      //     (error) => {
      //       console.error("Error:", error);
      //     }
      //   );
    }
    if (step === 1) {
      if (buttonName === "add") {
        console.log("add a contact now!");
        const submitData = {
          formId: form.id,
          submissionData: JSON.stringify(newValues),
          entityId: 1,
          entityType: "Account",
        };
        fetch("http://localhost:9400/form-submissions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submitData),
        })
          .then((response) => response.json())
          .then(
            (data) => {
              const reponseData = data.data;
              reponseData.submissionData = JSON.parse(
                reponseData.submissionData
              );
              console.log("Success Data:", reponseData);
              formFormik.resetForm();
            },
            (error) => {
              console.error("Error:", error);
            }
          );
      }

      if (buttonName === "cancel" && !editData) {
        setFormState("create")
        formFormik.resetForm();
      }
    }

    // handleNext();
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((prevStep) => prevStep - 1);
    }
  };

  const handleNext = () => {
    if (step < MAX_STEP) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  return (
    <Container className="page-content">
      <FormStepper
        activeStep={step}
        handleBack={handleBack}
        handleNext={handleNext}
        formFormik={formFormik}
      >
        <Form
          template={form}
          userDetails={null}
          country={null}
          editData={null}
          onFormikChange={handleFormikChange}
          onSubmit={handleFormSubmit}
        />
      </FormStepper>
    </Container>
  );
};

export default AccountCreation;
