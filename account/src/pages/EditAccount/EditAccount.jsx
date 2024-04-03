import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Container } from "reactstrap";
import FormStepper from "./FormStepper";
import { Form } from "@workspace/common";
import { useSelector, useDispatch } from "react-redux";
import {
  postAccount,
  putAccount,
  fetchAccount,
  accountResetMetaData,
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
import {
  CONTACT_BASE_URL,
  GET_CONTACT_BY_ENTITY_URL,
  DOCUMENT_BASE_URL,
  GET_DOCUMENT_BY_ENTITY_URL,
} from "../../helpers/endpoint_helper";
import { useUserAuth } from "@workspace/login";

const EditAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getAllUserGroups } = useUserAuth();

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
  const createMetaData = useSelector(
    (state) => state.AccountReducer.createMeta
  );

  const updateMetaData = useSelector(
    (state) => state.AccountReducer.updateMeta
  );

  const MAX_STEP = 5;
  const [step, setStep] = useState(linkState?.stepNo || 0);
  const formikRef = useRef(null);
  const [editData, setEditData] = useState(formSubmissionData || null);
  const [formFieldsData, setFormFieldsData] = useState([]);
  const [formTemplate, setFormTemplate] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [view, setView] = useState(
    linkState?.view !== null ? linkState?.view : true
  );

  /**
   * Get account id from url
   */
  const { accountId } = useParams();

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
  }, [step, form, view]);

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
      if (step === 4) {
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
   * @param {*} values - formik values
   * @param {*} newValues - form values (After processing)
   * @param {*} buttonNameHook - button name (To determine if it is add or update)
   * @param {*} formStateHook - form state hook (To determine if it is create or update)
   * @param {*} rerenderTable - rerender table
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
    // Check if form is edited. If updated, update in db

    const isFormChanged = await isFormEdited(formSubmissionData, newValues);

    if (!isFormChanged) {
      if (step === 4) {
        navigate("/accounts");
      }
      handleNext();
      return;
    }

    const { formState, setFormState } = formStateHook;
    const { buttonName, setButtonName } = buttonNameHook;
    // Set a reset form functions
    const resetForm = (arrayFields = [], formState = "") => {
      if (arrayFields.length > 0) {
        arrayFields.forEach((field) => {
          formikRef.current.formik.setFieldValue(field, "");
        });
      } else {
        formikRef.current.clearForm();
        formikRef.current.formik.setTouched({});
      }
      if (formState !== "") {
        setFormState(formState);
      }
    };

    if (step === 0) {
      // Update Account
      if (formSubmissionData != null) {
        let formValues = { ...newValues };
        const accountData = { ...formValues };
        const fileData = formValues?.uploadAgreement || "";
        if (typeof fileData === "string" && fileData !== "") {
          // Remove upload agreement from object
          formValues = { ...formValues, uploadAgreement: fileData };
          delete accountData.uploadAgreement;
        } else if (
          typeof fileData === "string" &&
          fileData === "" &&
          formSubmissionData?.uploadAgreement !== ""
        ) {
          delete accountData.uploadAgreement;
          accountData.isDeleteFile = true;
        } else if (
          formSubmissionData?.uploadAgreement === null &&
          !(fileData instanceof File)
        ) {
          delete accountData.uploadAgreement;
        } else if (typeof fileData === "string" && fileData === "") {
          delete accountData.uploadAgreement;
        } else {
          const fileName = fileData?.name;
          formValues = { ...formValues, uploadAgreement: fileName };
        }

        const accountDataOut = {
          ...accountData,
          formData: JSON.stringify(formValues),
          formId: parseInt(form.formId),
          accountOwnerId: newValues.accountOwnerId,
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
          })
        );
      }
    }

    if (step === 1) {
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
            resetForm: resetForm([], "create"),
          })
        );
        return;
      }

      if (buttonName === "cancel" && !editData) {
        setButtonName("");
        resetForm([], "create");
        return;
      }

      if (buttonName === "tableUpdate") {
        setButtonName("");
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
            resetForm: resetForm([], "create"),
          })
        );
      }
    }

    if (step === 2) {
      if (buttonName === "add") {
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
            resetForm: resetForm,
          })
        );
      }

       // Cancel add document and reset form
       if (buttonName === "cancel" && !editData) {
        resetForm([], "create");
        return;
      }

      if (buttonName === "tableUpdate") {
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
            resetForm: resetForm([], "create"),
          })
        );
      }
    }

    if (step === 3) {
      if (buttonName === "add") {
        setButtonName("");
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
            resetForm: resetForm(["file"]),
          })
        );
        return;
      }
      if (formSubmissionData != null) {
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
          })
        );
      }
    }

    if (step === 4) {
      const formData = {
        ...newValues,
        entityType: AccountEntityConstant.ACCOUNT_COMMERCIAL,
        entityId: parseInt(accountId),
        formData: JSON.stringify(newValues),
        formId: parseInt(form.formId),
      };
      dispatch(
        putAccount({
          entity: AccountEntityConstant.ACCOUNT_COMMERCIAL,
          id: accountId,
          newData: formData,
        })
      );
    }
  };

  /**
   * Check if form edited
   */
  const isFormEdited = async (oldFormValues, newFormValues) => {
    if (JSON.stringify(oldFormValues) === JSON.stringify(newFormValues)) {
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
    if (step === 1 || step === 2) {
      if (view === false) {
        formikRef.current.clearForm();
      }
    }
    setView((prevState) => !prevState);
  };

  useEffect(() => {
    if (createMetaData?.isSuccess) {
      dispatch(accountResetMetaData());
      if (step === 4) {
        navigate("/accounts");
        return;
      }
      handleNext();
    }
  }, [createMetaData?.isSuccess]);

  useEffect(() => {
    if (updateMetaData?.isSuccess) {
      dispatch(accountResetMetaData());
      if (step === 4) {
        navigate("/accounts");
        return;
      }
      handleNext();
    }
  }, [updateMetaData?.isSuccess]);

  return (
    <>
      <Container fluid className="page-content">
        <FormStepper
          activeStep={step}
          handleBack={handleBack}
          handleNext={handleNext}
          formikRef={formikRef}
          formFieldsData={formFieldsData}
          setErrorMessage={setErrorMessage}
          accountId={accountId}
          resetStepper={resetStepper}
          toggleFormViewState={toggleFormViewState}
          viewState={view}
        >
          <Form
            template={formTemplate}
            userDetails={getAllUserGroups()}
            country={accountCountry}
            editData={formSubmissionData}
            onSubmit={handleFormSubmit}
            onFormFieldsChange={handleFormFieldChange}
            errorMessage={errorMessage}
            view={view}
            ref={formikRef}
          />
        </FormStepper>
      </Container>
    </>
  );
};

export default EditAccount;
