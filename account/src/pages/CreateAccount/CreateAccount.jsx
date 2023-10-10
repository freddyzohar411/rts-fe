import React, { useState, useEffect, useCallback } from "react";
import AccountStepper from "../../components/AccountStepper/AccountStepper";
import { Button, Container } from "reactstrap";
import FormStepper from "./FormStepper";
import { Form } from "@workspace/common";
import { useSelector, useDispatch } from "react-redux";
import { fetchAccountForm } from "../../store/accountForm/action";
import { AccountFormConstant } from "./accountFormConstant";
import { fetchDraftAccount } from "../../store/accountregistration/action";
import {
  fetchAccountFormSubmission,
  clearAccountFormSubmission,
} from "../../store/accountForm/action";
import { ObjectHelper } from "@workspace/common";
import axios from "axios";

const AccountCreation = () => {
  const dispatch = useDispatch();

  const form = useSelector((state) => state.AccountFormReducer.form);
  const accountId = useSelector(
    (state) => state.AccountRegistrationReducer.accountId
  );
  const formSubmissionData = useSelector(
    (state) => state.AccountFormReducer.formSubmission
  );
  const formSubmissionDataLoading = useSelector(
    (state) => state.AccountFormReducer.loading
  );

  const MAX_STEP = 6;
  const [step, setStep] = useState(0);
  const [formFormik, setFormFormik] = useState(null);
  const [editData, setEditData] = useState(formSubmissionData || null);
  const [formFieldsData, setFormFieldsData] = useState([]);
  const [formTemplate, setFormTemplate] = useState(null);

  /**
   * Fetch form template based on step
   * Can make changes to form template here before loading to form
   */
  useEffect(() => {
    if (form) {
      if (step === 1) {
        const formEdited = setTableAPI(form, "contactList", "xxxx", "yyyy")
        setFormTemplate(formEdited);
        return;
      }
      setFormTemplate(form);
    }
  }, [step, form]);

  /**
   * Set table API method
   * @param {*} form 
   * @param {*} tableName 
   * @param {*} getAPI 
   * @param {*} deleteAPI 
   * @returns 
   */
  const setTableAPI = (form, tableName, getAPI, deleteAPI) => {
    const newForm = JSON.parse(JSON.stringify(form));
    newForm.formSchema.forEach((field) => {
      if (field.type === "table" && field.name === tableName) {
        field.tableSetting.tableGetAPI = getAPI;
        field.tableSetting.tableDeleteAPI = deleteAPI;
      }
    });
    return newForm;
  }

  /**
   * Fetch draft account if there is
   */
  useEffect(() => {
    dispatch(fetchDraftAccount());
  }, []);

  console.log("Draft Account Id: ", accountId);

  /**
   * Fetch form submission data if there is a draft account
   */
  useEffect(() => {
    dispatch(clearAccountFormSubmission());
    if (accountId) {
      if (step === 0) {
        dispatch(fetchAccountFormSubmission("account_account", accountId));
      }
      if(step === 1) {
        // dispatch(fetchAccountFormSubmission("account_contact", accountId));
      }
    }
  }, [accountId, step]);

  /**
   * Get Formik hook from Form component
   */
  const handleFormikChange = useCallback((formik) => {
    // Handle formik change here
    setFormFormik(formik);
    console.log("Formik has changed:", formik);
  }, []);

  /**
   * Get Form field data from Form component
   */
  const handleFormFieldChange = useCallback((formFields) => {
    setFormFieldsData(formFields);
    console.log("Form field changed");
  }, []);

  /**
   * Fetch form template based on step
   */
  useEffect(() => {
    dispatch(fetchAccountForm(AccountFormConstant[step]));
  }, [step]);

  /**
   * Handle form submit based on step
   * @param {*} event
   * @param {*} values
   * @param {*} newValues
   * @param {*} buttonName
   * @param {*} formStateHook
   * @returns
   */
  const handleFormSubmit = (
    event,
    values,
    newValues,
    buttonName,
    formStateHook
  ) => {
    const { formState, setFormState } = formStateHook;
    console.log("values", values);
    console.log("newValues", newValues);
    console.log("Button Name:", buttonName);
    if (step === 0) {
      console.log("Step 0");
      if (formSubmissionData === null) {
        // Get file data
        let formValues = { ...newValues };
        const accountData = { ...formValues };
        const fileData = formValues?.uploadAgreement;
        const fileName = fileData?.name;
        formValues = { ...formValues, uploadAgreement: fileName };

        const accountDataOut = {
          ...accountData,
          formData: JSON.stringify(formValues),
          formId: parseInt(form.formId),
        };

        const formData1 = ObjectHelper.convertObjectToFormData(accountDataOut);

        console.log("Account data Object", accountDataOut);
        console.log("Account Data FORM: ", formData1);

        // Post data to account creation
        axios
          .post("http://localhost:8100/accounts", formData1, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            const responseData = response.data;
            console.log("Account Creation Success: ", responseData);
          })
          .catch((error) => {
            console.log("Account Creation Error: ", error);
          });
      } else {
        console.log("Update Form");
        let formValues = { ...newValues };
        const accountData = { ...formValues };
        const fileData = formValues?.uploadAgreement;
        if (typeof fileData === "string") {
          // Remove upload agreement from object
          formValues = { ...formValues, uploadAgreement: fileData };
          delete accountData.uploadAgreement;
        } else {
          const fileName = fileData?.name;
          formValues = { ...formValues, uploadAgreement: fileName };
        }

        const accountDataOut = {
          ...accountData,
          formData: JSON.stringify(formValues),
          formId: parseInt(form.formId),
        };

        console.log("Account data Object", accountDataOut);

        const formDataUpdate =
          ObjectHelper.convertObjectToFormData(accountDataOut);
        axios
          .put(`http://localhost:8100/accounts/${accountId}`, formDataUpdate, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log("Account Update Success: ", response);
            console.log("Dispatching...")
            // dispatch(clearAccountFormSubmission());
            handleNext();
          })
          .catch((error) => {
            console.log("Account Update Error: ", error);
          });
      }

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
      //       handleNext();
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
        return;
      }

      if (buttonName === "cancel" && !editData) {
        setFormState("create");
        formFormik.resetForm();
        return;
      }

      console.log("Form Submission: ", newValues);
    }
  };

  /**
   * Handle back button
   */
  const handleBack = () => {
    if (step > 0) {
      setStep((prevStep) => prevStep - 1);
    }
  };

  /**
   * Handle next button
   */
  const handleNext = () => {
    if (step < MAX_STEP) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  console.log("Form Submission Data Loading: ", formSubmissionDataLoading);

  return (
    <Container className="page-content">
      <FormStepper
        activeStep={step}
        handleBack={handleBack}
        handleNext={handleNext}
        formFormik={formFormik}
        formFieldsData={formFieldsData}
      >
        {/* {!formSubmissionDataLoading && ( */}
        <Form
          template={formTemplate}
          userDetails={null}
          country={null}
          editData={formSubmissionData}
          onFormikChange={handleFormikChange}
          onSubmit={handleFormSubmit}
          onFormFieldsChange={handleFormFieldChange}
        />
        {/* )} */}
      </FormStepper>
    </Container>
  );
};

export default AccountCreation;
