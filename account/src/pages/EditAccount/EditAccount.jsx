import React, { useState, useEffect, useCallback } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Container } from "reactstrap";
import FormStepper from "./FormStepper";
import { Form } from "@workspace/common";
import { useSelector, useDispatch } from "react-redux";
import {
  postAccount,
  putAccount,
  fetchAccount,
} from "../../store/account/action";
import { deleteAccountCountry } from "../../store/accountregistration/action";
import { fetchAccountForm } from "../../store/accountForm/action";
import {
  AccountFormConstant,
  AccountEntityConstant,
  AccountTableListConstant,
} from "../../constants/accountConstant";
import {
  fetchAccountFormSubmission,
  clearAccountFormSubmission,
} from "../../store/accountForm/action";
import { ObjectHelper } from "@workspace/common";
import { CryptoHelper } from "@workspace/common";
import {
  CONTACT_BASE_URL,
  GET_CONTACT_BY_ENTITY_URL,
  DOCUMENT_BASE_URL,
  GET_DOCUMENT_BY_ENTITY_URL,
} from "../../helpers/endpoint_helper";
import { useUserAuth } from "@workspace/login";

const EditAccount = () => {
  const { getAllUserGroups, checkAllPermission, Permission } = useUserAuth();

  
  const location = useLocation();
  const linkState = location.state;
  const formSubmissionData = useSelector(
    (state) => state.AccountFormReducer.formSubmission
  );
  const accountCountry = useSelector(
    (state) => state.AccountRegistrationReducer.accountCountry
  );
  const form = useSelector((state) => state.AccountFormReducer.form);
  const editId = useSelector((state) => state.AccountFormReducer.editId);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const MAX_STEP = 6;
  const [step, setStep] = useState(linkState?.stepNo || 0);
  const [formFormik, setFormFormik] = useState(null);
  const [editData, setEditData] = useState(formSubmissionData || null);
  const [formFieldsData, setFormFieldsData] = useState([]);
  const [formTemplate, setFormTemplate] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [view, setView] = useState(linkState?.view !== null ? linkState?.view : true);

  // console.log("HASH 1 Data",formSubmissionData)
  // computeHash(JSON.stringify(formSubmissionData)).then((res) => console.log("HASH 1",res))

  /**
   * Get account id from url
   */
  const { accountId } = useParams();
  // console.log("Account Id: ", accountId);
  // console.log("Step: ", step);
  // console.log("Form Submission Data: ", formSubmissionData);
  // console.log("Form: ", form);
  // console.log("Form Template: ", formTemplate);

  // Fetch country if country do not exist
  useEffect(() => {
    if (accountCountry === null) {
      dispatch(fetchAccount(accountId));
    }

    return () => {
      if (accountCountry !== null) {
        dispatch(deleteAccountCountry());
      }
    };
  }, []);

  /**
   * Fetch form template based on step
   * Can make changes to form template here before loading to form
   */
  useEffect(() => {
    if (form) {
      if (step === 1) {
        const formEdited = setTableAPI(
          form,
          AccountTableListConstant.CONTACT_LIST,
          GET_CONTACT_BY_ENTITY_URL(
            AccountEntityConstant.ACCOUNT_CONTACT,
            accountId
          ),
          CONTACT_BASE_URL
        );
        setFormTemplate(formEdited);
        return;
      }
      if (step === 2) {
        const formEdited = setTableAPI(
          form,
          AccountTableListConstant.DOCUMENT_LIST,
          GET_DOCUMENT_BY_ENTITY_URL(
            AccountEntityConstant.ACCOUNT_DOCUMENT,
            accountId
          ),
          DOCUMENT_BASE_URL
        );
        setFormTemplate(formEdited);
        return;
      }
      if (step === 3) {
        const formEdited = setTableAPI(
          form,
          AccountTableListConstant.INSTRUCTION_DOCUMENT_LIST,
          GET_DOCUMENT_BY_ENTITY_URL(
            AccountEntityConstant.ACCOUNT_INSTRUCTION_DOCUMENT,
            accountId
          ),
          DOCUMENT_BASE_URL
        );
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
  };

  /**
   * Fetch form submission data if there is a draft account
   */
  useEffect(() => {
    dispatch(clearAccountFormSubmission());
    setEditData(null);
    if (accountId) {
      if (step === 0) {
        dispatch(
          fetchAccountFormSubmission(
            AccountEntityConstant.ACCOUNT_ACCOUNT,
            accountId
          )
        );
      }
      if (step === 3) {
        dispatch(
          fetchAccountFormSubmission(
            AccountEntityConstant.ACCOUNT_INSTRUCTION,
            accountId
          )
        );
      }
      if (step === 5) {
        dispatch(
          fetchAccountFormSubmission(
            AccountEntityConstant.ACCOUNT_COMMERCIAL,
            accountId
          )
        );
      }
    }
  }, [step, accountId]);

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
  const handleFormSubmit = async (
    event,
    values,
    newValues,
    buttonNameHook,
    formStateHook,
    rerenderTable
  ) => {
    // console.log("HASH 2 Data",newValues)
    // await computeHash(JSON.stringify(newValues)).then((res) => console.log("HASH 2",res))
    // return

    const isFormChanged = await isFormEdited(formSubmissionData, newValues);

    if (!isFormChanged) {
      if (step === 5) {
        navigate("/accounts");
      }
      handleNext();
      return;
    }

    const { formState, setFormState } = formStateHook;
    const { buttonName, setButtonName } = buttonNameHook;
    // console.log("values", values);
    // console.log("newValues", newValues);
    // console.log("Button Name:", buttonName);
    // console.log("Step: ", step);
    // Set a reset form functions
    const resetForm = (arrayFields = []) => {
      formFormik.resetForm();
      if (arrayFields.length > 0) {
        arrayFields.forEach((fieldName) =>
          formFormik.setFieldValue(fieldName, "")
        );
      }
      // setFormState("create");
    };

    const resetFormFields = (arrayFields = []) => {
      if (arrayFields.length > 0) {
        arrayFields.forEach((fieldName) =>
          formFormik.setFieldValue(fieldName, "")
        );
      }
      // setFormState("create");
    };

    if (step === 0) {
      console.log("Step 0");
      if (formSubmissionData != null) {
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

        const formDataUpdate =
          ObjectHelper.convertObjectToFormData(accountDataOut);

        dispatch(
          putAccount({
            entity: AccountEntityConstant.ACCOUNT_ACCOUNT,
            id: accountId,
            newData: formDataUpdate,
            config: {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
            handleNext: handleNext,
          })
        );
      }
    }

    if (step === 1) {
      console.log("Step 1");
      if (buttonName === "add") {
        setErrorMessage(null);
        setButtonName("");
        const newData = {
          ...newValues,
          entityId: accountId,
          entityType: AccountEntityConstant.ACCOUNT_CONTACT,
          formData: JSON.stringify(newValues),
          formId: parseInt(form.formId),
        };

        dispatch(
          postAccount({
            entity: AccountEntityConstant.ACCOUNT_CONTACT,
            newData,
            rerenderTable: rerenderTable,
            resetForm: resetForm,
          })
        );
        return;
      }

      if (buttonName === "cancel" && !editData) {
        setButtonName("");
        resetForm();
        return;
      }

      if (buttonName === "tableUpdate") {
        setButtonName("");
        console.log("Update Contact");
        const newData = {
          ...newValues,
          entityId: accountId,
          entityType: AccountEntityConstant.ACCOUNT_CONTACT,
          formData: JSON.stringify(newValues),
          formId: parseInt(form.formId),
        };

        // Get update id
        const table = formFieldsData.find(
          (field) =>
            field.type === "table" &&
            field.name === AccountTableListConstant.CONTACT_LIST
        );
        const { tableEditId } = table.tableSetting;
        dispatch(
          putAccount({
            entity: AccountEntityConstant.ACCOUNT_CONTACT,
            id: tableEditId,
            newData,
            rerenderTable: rerenderTable,
            resetForm: resetForm(),
          })
        );
      }
    }

    if (step === 2) {
      if (buttonName === "add") {
        console.log("Add Address");
        setErrorMessage(null);
        setButtonName("");
        let formValues = { ...newValues };
        const documentData = { ...formValues };
        const fileData = formValues?.file;
        const fileName = fileData?.name;
        formValues = { ...formValues, file: fileName };
        const documentDataOut = {
          ...documentData,
          entityType: AccountEntityConstant.ACCOUNT_DOCUMENT,
          entityId: parseInt(accountId),
          formData: JSON.stringify(formValues),
          formId: parseInt(form.formId),
        };
        delete documentDataOut.documentList;

        const documentFormData =
          ObjectHelper.convertObjectToFormData(documentDataOut);
        dispatch(
          postAccount({
            entity: AccountEntityConstant.ACCOUNT_DOCUMENT,
            newData: documentFormData,
            config: {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
            rerenderTable: rerenderTable,
            resetForm: resetForm(["file"]),
          })
        );
      }

      if (buttonName === "cancel" && !editData) {
        resetForm();
        return;
      }

      if (buttonName === "tableUpdate") {
        console.log("Update Document");
        let formValues = { ...newValues };
        const documentData = { ...formValues };
        const fileData = formValues?.file;
        if (typeof fileData === "string") {
          // Remove upload agreement from object
          formValues = { ...formValues, file: fileData };
          delete documentData.file;
        } else {
          const fileName = fileData?.name;
          formValues = { ...formValues, file: fileName };
        }

        const documentDataOut = {
          ...documentData,
          entityType: AccountEntityConstant.ACCOUNT_DOCUMENT,
          entityId: parseInt(accountId),
          formData: JSON.stringify(formValues),
          formId: parseInt(form.formId),
        };
        delete documentDataOut.documentList;

        const documentFormData =
          ObjectHelper.convertObjectToFormData(documentDataOut);

        // Get update id
        const table = formFieldsData.find(
          (field) =>
            field.type === "table" &&
            field.name === AccountTableListConstant.DOCUMENT_LIST
        );
        const { tableEditId } = table.tableSetting;
        console.log("Table edit Id: ", tableEditId);
        dispatch(
          putAccount({
            entity: AccountEntityConstant.ACCOUNT_DOCUMENT,
            id: tableEditId,
            newData: documentFormData,
            config: {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
            rerenderTable: rerenderTable,
            resetForm: resetForm(["file"]),
          })
        );
      }
    }

    if (step === 3) {
      console.log("Step 3");
      if (buttonName === "add") {
        setButtonName("");
        console.log("Add client instruction");
        let formValues = { file: newValues.file };
        const documentData = { ...formValues };
        const fileData = formValues?.file;
        const fileName = fileData?.name;
        formValues = { ...formValues, file: fileName };
        const documentDataOut = {
          ...documentData,
          entityType: AccountEntityConstant.ACCOUNT_INSTRUCTION_DOCUMENT,
          entityId: parseInt(accountId),
          formData: JSON.stringify(formValues),
          formId: parseInt(form.formId),
        };

        const documentFormData =
          ObjectHelper.convertObjectToFormData(documentDataOut);
        dispatch(
          postAccount({
            entity: AccountEntityConstant.ACCOUNT_DOCUMENT,
            newData: documentFormData,
            config: {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
            rerenderTable: rerenderTable,
            resetForm: resetFormFields(["file"]),
          })
        );
        return;
      }
      if (formSubmissionData != null) {
        console.log("Update instruction");
        const formData = {
          guidelines: newValues.guidelines,
        };
        const newData = {
          ...formData,
          entityId: accountId,
          entityType: AccountEntityConstant.ACCOUNT_INSTRUCTION,
          formData: JSON.stringify(formData),
          formId: parseInt(form.formId),
        };

        dispatch(
          putAccount({
            entity: AccountEntityConstant.ACCOUNT_INSTRUCTION,
            id: editId,
            newData,
            rerenderTable: rerenderTable,
            handleNext: handleNext,
          })
        );
      }
    }

    if (step === 5) {
      console.log("Create Commercial");
      const formData = {
        ...newValues,
        entityType: AccountEntityConstant.ACCOUNT_COMMERCIAL,
        entityId: parseInt(accountId),
        formData: JSON.stringify(newValues),
        formId: parseInt(form.formId),
      };
      dispatch(
        postAccount({
          entity: AccountEntityConstant.ACCOUNT_COMMERCIAL,
          id: accountId,
          newData: formData,
          navigate: navigate,
          link: "/accounts",
        })
      );
    }
  };

  /**
   * Check if form edited
   */
  const isFormEdited = async (oldFormValues, newFormValues) => {
    const oldFormValuesString = await CryptoHelper.computeHash(
      JSON.stringify(oldFormValues)
    );
    const newFormValuesString = await CryptoHelper.computeHash(
      JSON.stringify(newFormValues)
    );
    console.log("Old Form Values Hash: ", oldFormValuesString);
    console.log("New Form Values Hash: ", newFormValuesString);
    if (oldFormValuesString === newFormValuesString) {
      return false;
    }
    return true;
  };

  /**
   * Handle back button
   */
  const handleBack = () => {
    if (step > 0) {
      setStep((prevStep) => prevStep - 1);
      setErrorMessage(null);
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

  /**
   * Reset Stepper to number
   */
  const resetStepper = (number) => {
    setStep(number);
  };

  /**
   * Toggle view
   */
  const toggleFormViewState = () => {
    setView((prevState) => !prevState);
  }

  return (
    <>
      <Container className="page-content">
        <FormStepper
          activeStep={step}
          handleBack={handleBack}
          handleNext={handleNext}
          formFormik={formFormik}
          formFieldsData={formFieldsData}
          setErrorMessage={setErrorMessage}
          accountId={accountId}
          resetStepper={resetStepper}
          toggleFormViewState={toggleFormViewState}
          viewState={view}
        >
          {/* {formSubmissionData && ( */}
          <Form
            template={formTemplate}
            userDetails={getAllUserGroups()}
            country={accountCountry}
            editData={formSubmissionData}
            onFormikChange={handleFormikChange}
            onSubmit={handleFormSubmit}
            onFormFieldsChange={handleFormFieldChange}
            errorMessage={errorMessage}
            view={view}
          />
           {/* )}  */}
        </FormStepper>
      </Container>
    </>
  );
};

export default EditAccount;
