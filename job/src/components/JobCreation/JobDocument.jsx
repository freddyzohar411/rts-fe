import React, { useState, useEffect, useCallback, useRef } from "react";
import { Form } from "@workspace/common";
import { DOCUMENT_LIST, JOB_DOCUMENT_NAME } from "./constants";
import { useDispatch, useSelector } from "react-redux";
import { createJobDocuments, fetchJobDocumentForm } from "../../store/actions";
import { useUserAuth } from "@workspace/login";
import { ObjectHelper } from "@workspace/common";
import {
  DOCUMENT_BASE_URL,
  GET_DOCUMENT_BY_ENTITY_URL,
} from "../../helpers/backend_helper";

const JobDocument = ({ jobId, view }) => {
  const dispatch = useDispatch();
  const { getAllUserGroups } = useUserAuth();
  const formikRef = useRef(null);

  const documentForm = useSelector(
    (state) => state.JobFormReducer.documentForm
  );
  const formSubmissionData = useSelector(
    (state) => state.JobFormReducer.formSubmission
  );

  const [formFieldsData, setFormFieldsData] = useState([]);
  const [editData, setEditData] = useState(formSubmissionData || null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formTemplate, setFormTemplate] = useState(null);

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

  // Fetch all the countries and account names
  useEffect(() => {
    dispatch(fetchJobDocumentForm(JOB_DOCUMENT_NAME));
  }, []);

  useEffect(() => {
    setEditData(null);
    if (documentForm && jobId) {
      const formEdited = setTableAPI(
        documentForm,
        DOCUMENT_LIST,
        GET_DOCUMENT_BY_ENTITY_URL(JOB_DOCUMENT_NAME, jobId),
        DOCUMENT_BASE_URL
      );
      setFormTemplate(formEdited);
    }
  }, [documentForm, view, jobId]);

  /**
   * Get Form field data from Form component
   */
  const handleFormFieldChange = useCallback((formFields) => {
    setFormFieldsData(formFields);
  }, []);

  useEffect(() => {
    if (formikRef.current && view === true) {
      formikRef.current.clearForm();
    }
  }, [view]);

  // Handle form submit
  const handleFormSubmit = async (
    event,
    values,
    newValues,
    buttonNameHook,
    formStateHook,
    rerenderTable
  ) => {
    const resetForm = (arrayFields = [], formState = "") => {
      if (arrayFields.length > 0) {
        arrayFields.forEach((field) => {
          formikRef.current.formik.setFieldValue(field, "");
        });
      } else {
        formikRef.current.clearForm();
        formikRef.current.formik.setTouched({});
        // Clear for fields with multi file + delete
        const newFormFields = [...formFieldsData];
        newFormFields.forEach((field) => {
          if (field.type === "multifile") {
            delete field.multiFileEnity;
            delete field.multiFileDelete;
          }
        });
      }
      if (formState !== "") {
        setFormState(formState);
      }
    };
    const { formState, setFormState } = formStateHook;
    const { buttonName, setButtonName } = buttonNameHook;
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
        entityType: JOB_DOCUMENT_NAME,
        entityId: parseInt(jobId),
        formData: JSON.stringify(formValues),
        formId: parseInt(documentForm.formId),
      };
      delete documentDataOut.documentList;
      const documentFormData =
        ObjectHelper.convertObjectToFormData(documentDataOut);

      dispatch(
        createJobDocuments({
          entity: JOB_DOCUMENT_NAME,
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

    // Cancel add document and reset form
    if (buttonName === "cancel") {
      resetForm([], "create");
      return;
    }

    // Update document
    if (buttonName === "tableUpdate") {
      setButtonName("");
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
        entityType: JOB_DOCUMENT_NAME,
        entityId: parseInt(jobId),
        formData: JSON.stringify(formValues),
        formId: parseInt(documentForm.formId),
      };
      delete documentDataOut.documentList;

      const documentFormData =
        ObjectHelper.convertObjectToFormData(documentDataOut);

      // Get update id
      const table = formFieldsData?.find(
        (field) => field.type === "table" && field.name === DOCUMENT_LIST
      );

      const { tableEditId } = table?.tableSetting;
      dispatch(
        createJobDocuments({
          entity: JOB_DOCUMENT_NAME,
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
  };

  document.title = "Job | RTS";

  return (
    <Form
      template={formTemplate}
      userDetails={getAllUserGroups()}
      country={"India"}
      editData={null}
      onSubmit={handleFormSubmit}
      onFormFieldsChange={handleFormFieldChange}
      errorMessage={errorMessage}
      view={view}
      ref={formikRef}
    />
  );
};

export default JobDocument;
