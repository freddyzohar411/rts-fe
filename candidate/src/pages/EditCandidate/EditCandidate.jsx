import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Container } from "reactstrap";
import FormStepper from "./FormStepper";
import { Form } from "@workspace/common";
import { useSelector, useDispatch } from "react-redux";
import {
  postCandidate,
  putCandidate,
  fetchCandidate,
  resetMetaData,
} from "../../store/candidate/action";
import { deleteCandidateCountry } from "../../store/candidateregistration/action";
import { fetchCandidateForm } from "../../store/candidateForm/action";
import {
  CandidateFormConstant,
  CandidateEntityConstant,
  CandidateTableListConstant,
} from "../../constants/candidateConstant";
import {
  fetchCandidateFormSubmission,
  clearCandidateFormSubmission,
} from "../../store/candidateForm/action";
import { ObjectHelper } from "@workspace/common";
import { CryptoHelper } from "@workspace/common";
import {
  DOCUMENT_BASE_URL,
  GET_DOCUMENT_BY_ENTITY_URL,
  CANDIDATE_WORK_EXPERIENCE_BASE_URL,
  GET_CANDIDATE_WORK_EXPERIENCE_BY_ENTITY_URL,
  CANDIDATE_EDUCATION_DETAILS_BASE_URL,
  GET_CANDIDATE_EDUCATION_DETAILS_BY_ENTITY_URL,
  CANDIDATE_CERTIFICATE_BASE_URL,
  GET_CANDIDATE_CERTIFICATE_BY_ENTITY_URL,
  CANDIDATE_LANGUAGES_BASE_URL,
  GET_CANDIDATE_LANGUAGES_BY_ENTITY_URL,
  CANDIDATE_EMPLOYER_DETAILS_BASE_URL,
  GET_CANDIDATE_EMPLOYER_DETAILS_BY_ENTITY_URL,
} from "../../helpers/backend_helper";
import { useUserAuth } from "@workspace/login";

const EditCandidate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getAllUserGroups } = useUserAuth();

  const location = useLocation();
  const linkState = location.state;
  const formSubmissionData = useSelector(
    (state) => state.CandidateFormReducer.formSubmission
  );
  const candidateCountry = useSelector(
    (state) => state.CandidateRegistrationReducer.candidateCountry
  );
  const form = useSelector((state) => state.CandidateFormReducer.form);
  const editId = useSelector((state) => state.CandidateFormReducer.editId);
  const createMetaData = useSelector(
    (state) => state.CandidateReducer.createMeta
  );

  const updateMetaData = useSelector(
    (state) => state.CandidateReducer.updateMeta
  );

  const MAX_STEP = 6;
  const [step, setStep] = useState(linkState?.stepNo || 0);
  const formikRef = useRef(null);
  const [editData, setEditData] = useState(formSubmissionData || null);
  const [formFieldsData, setFormFieldsData] = useState([]);
  const [formTemplate, setFormTemplate] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [view, setView] = useState(
    linkState?.view !== null ? linkState?.view : true
  );

  console.log("Step: ", step);

  /**
   * Get candidate id from url
   */
  const { candidateId } = useParams();

  /**
   * Fetch form template based on step
   * Can make changes to form template here before loading to form
   */
  useEffect(() => {
    if (form) {
      if (step === 1) {
        const formEdited = setTableAPI(
          form,
          CandidateTableListConstant.DOCUMENTS_LIST,
          GET_DOCUMENT_BY_ENTITY_URL(
            CandidateEntityConstant.CANDIDATE_DOCUMENTS,
            candidateId
          ),
          DOCUMENT_BASE_URL
        );
        setFormTemplate(formEdited);
        return;
      }
      if (step === 2) {
        const formEdited = setTableAPI(
          form,
          CandidateTableListConstant.WORK_EXPERIENCE_LIST,
          GET_CANDIDATE_WORK_EXPERIENCE_BY_ENTITY_URL(
            CandidateEntityConstant.CANDIDATE_WORK_EXPERIENCE,
            candidateId
          ),
          CANDIDATE_WORK_EXPERIENCE_BASE_URL
        );
        setFormTemplate(formEdited);
        return;
      }
      if (step === 3) {
        const formEdited = setTableAPI(
          form,
          CandidateTableListConstant.EDUCATION_DETAILS_LIST,
          GET_CANDIDATE_EDUCATION_DETAILS_BY_ENTITY_URL(
            CandidateEntityConstant.CANDIDATE_EDUCATION_DETAILS,
            candidateId
          ),
          CANDIDATE_EDUCATION_DETAILS_BASE_URL
        );
        setFormTemplate(formEdited);
        return;
      }
      if (step === 4) {
        const formEdited = setTableAPI(
          form,
          CandidateTableListConstant.CERTIFICATION_LIST,
          GET_CANDIDATE_CERTIFICATE_BY_ENTITY_URL(
            CandidateEntityConstant.CANDIDATE_CERTIFICATION,
            candidateId
          ),
          CANDIDATE_CERTIFICATE_BASE_URL
        );
        setFormTemplate(formEdited);
        return;
      }
      if (step === 5) {
        const formEdited = setTableAPI(
          form,
          CandidateTableListConstant.LANGUAGES_LIST,
          GET_CANDIDATE_LANGUAGES_BY_ENTITY_URL(
            CandidateEntityConstant.CANDIDATE_LANGUAGES,
            candidateId
          ),
          CANDIDATE_LANGUAGES_BASE_URL
        );
        setFormTemplate(formEdited);
        return;
      }
      if (step === 6) {
        const formEdited = setTableAPI(
          form,
          CandidateTableListConstant.EMPLOYER_DETAILS_LIST,
          GET_CANDIDATE_EMPLOYER_DETAILS_BY_ENTITY_URL(
            CandidateEntityConstant.CANDIDATE_EMPLOYER_DETAILS,
            candidateId
          ),
          CANDIDATE_EMPLOYER_DETAILS_BASE_URL
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
   * Fetch form submission data if there is a draft candidate
   */
  useEffect(() => {
    dispatch(clearCandidateFormSubmission());
    setEditData(null);
    if (candidateId) {
      if (step === 0) {
        dispatch(
          fetchCandidateFormSubmission(
            CandidateEntityConstant.CANDIDATE_BASIC_INFO,
            candidateId
          )
        );
      }
    }
  }, [step, candidateId]);

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
    dispatch(fetchCandidateForm(CandidateFormConstant[step]));
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
      // if (step === 6) {
      //   navigate("/candidates");
      // }
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
      }
      if (formState !== "") {
        setFormState(formState);
      }
    };

    // Update basic info
    if (step === 0) {
      // Update Candidate
      if (formSubmissionData != null) {
        // Update Account
        let candidateData = { ...newValues };

        const candidateDataOut = {
          ...candidateData,
          formData: JSON.stringify(candidateData),
          formId: parseInt(form.formId),
        };

        const formDataUpdate =
          ObjectHelper.convertObjectToFormData(candidateDataOut);

        dispatch(
          putCandidate({
            entity: CandidateEntityConstant.CANDIDATE_BASIC_INFO,
            id: candidateId,
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

    // Documents
    if (step === 1) {
      // Add document
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
          entityType: CandidateEntityConstant.CANDIDATE_DOCUMENTS,
          entityId: parseInt(candidateId),
          formData: JSON.stringify(formValues),
          formId: parseInt(form.formId),
        };
        delete documentDataOut.documentList;

        const documentFormData =
          ObjectHelper.convertObjectToFormData(documentDataOut);

        dispatch(
          postCandidate({
            entity: CandidateEntityConstant.CANDIDATE_DOCUMENTS,
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
      if (buttonName === "cancel" && !editData) {
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
          entityType: CandidateEntityConstant.CANDIDATE_DOCUMENTS,
          entityId: parseInt(candidateId),
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
            field.name === CandidateTableListConstant.DOCUMENTS_LIST
        );
        const { tableEditId } = table.tableSetting;
        dispatch(
          putCandidate({
            entity: CandidateEntityConstant.CANDIDATE_DOCUMENTS,
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

    // Work Experience
    if (step === 2) {
      // Add contact
      if (buttonName === "add") {
        setErrorMessage(null);
        setButtonName("");
        const newData = {
          ...newValues,
          entityId: candidateId,
          entityType: CandidateEntityConstant.CANDIDATE_WORK_EXPERIENCE,
          formData: JSON.stringify(newValues),
          formId: parseInt(form.formId),
        };

        dispatch(
          postCandidate({
            entity: CandidateEntityConstant.CANDIDATE_WORK_EXPERIENCE,
            newData,
            rerenderTable: rerenderTable,
            resetForm: resetForm([], "create"),
          })
        );
        return;
      }

      // Cancel add contact and reset form
      if (buttonName === "cancel" && !editData) {
        setButtonName("");
        resetForm([], "create");
        return;
      }

      // Update contact
      if (buttonName === "tableUpdate") {
        setButtonName("");
        const newData = {
          ...newValues,
          entityId: candidateId,
          entityType: CandidateEntityConstant.CANDIDATE_WORK_EXPERIENCE,
          formData: JSON.stringify(newValues),
          formId: parseInt(form.formId),
        };

        // Get update id
        const table = formFieldsData.find(
          (field) =>
            field.type === "table" &&
            field.name === CandidateTableListConstant.WORK_EXPERIENCE_LIST
        );
        const { tableEditId } = table.tableSetting;
        dispatch(
          putCandidate({
            entity: CandidateEntityConstant.CANDIDATE_WORK_EXPERIENCE,
            id: tableEditId,
            newData,
            rerenderTable: rerenderTable,
            resetForm: resetForm([], "create"),
          })
        );
      }
    }

    // Education Details
    if (step === 3) {
      // Add contact
      if (buttonName === "add") {
        setErrorMessage(null);
        setButtonName("");
        const newData = {
          ...newValues,
          entityId: candidateId,
          entityType: CandidateEntityConstant.CANDIDATE_EDUCATION_DETAILS,
          formData: JSON.stringify(newValues),
          formId: parseInt(form.formId),
        };

        dispatch(
          postCandidate({
            entity: CandidateEntityConstant.CANDIDATE_EDUCATION_DETAILS,
            newData,
            rerenderTable: rerenderTable,
            resetForm: resetForm([], "create"),
          })
        );
        return;
      }

      // Cancel add contact and reset form
      if (buttonName === "cancel" && !editData) {
        setButtonName("");
        resetForm([], "create");
        return;
      }

      // Update contact
      if (buttonName === "tableUpdate") {
        setButtonName("");
        const newData = {
          ...newValues,
          entityId: candidateId,
          entityType: CandidateEntityConstant.CANDIDATE_EDUCATION_DETAILS,
          formData: JSON.stringify(newValues),
          formId: parseInt(form.formId),
        };

        // Get update id
        const table = formFieldsData.find(
          (field) =>
            field.type === "table" &&
            field.name === CandidateTableListConstant.EDUCATION_DETAILS_LIST
        );
        const { tableEditId } = table.tableSetting;
        dispatch(
          putCandidate({
            entity: CandidateEntityConstant.CANDIDATE_EDUCATION_DETAILS,
            id: tableEditId,
            newData,
            rerenderTable: rerenderTable,
            resetForm: resetForm([], "create"),
          })
        );
      }
    }

    // Certificates
    if (step === 4) {
      // Add contact
      if (buttonName === "add") {
        setErrorMessage(null);
        setButtonName("");
        const newData = {
          ...newValues,
          entityId: candidateId,
          entityType: CandidateEntityConstant.CANDIDATE_CERTIFICATION,
          formData: JSON.stringify(newValues),
          formId: parseInt(form.formId),
        };

        dispatch(
          postCandidate({
            entity: CandidateEntityConstant.CANDIDATE_CERTIFICATION,
            newData,
            rerenderTable: rerenderTable,
            resetForm: resetForm([], "create"),
          })
        );
        return;
      }

      // Cancel add contact and reset form
      if (buttonName === "cancel" && !editData) {
        setButtonName("");
        resetForm([], "create");
        return;
      }

      // Update contact
      if (buttonName === "tableUpdate") {
        setButtonName("");
        const newData = {
          ...newValues,
          entityId: candidateId,
          entityType: CandidateEntityConstant.CANDIDATE_CERTIFICATION,
          formData: JSON.stringify(newValues),
          formId: parseInt(form.formId),
        };

        // Get update id
        const table = formFieldsData.find(
          (field) =>
            field.type === "table" &&
            field.name === CandidateTableListConstant.CERTIFICATION_LIST
        );
        const { tableEditId } = table.tableSetting;
        dispatch(
          putCandidate({
            entity: CandidateEntityConstant.CANDIDATE_CERTIFICATION,
            id: tableEditId,
            newData,
            rerenderTable: rerenderTable,
            resetForm: resetForm([], "create"),
          })
        );
      }
    }

    // // Languages
    // if (step === 5) {
    //   // Add contact
    //   if (buttonName === "add") {
    //     setErrorMessage(null);
    //     setButtonName("");
    //     const newData = {
    //       ...newValues,
    //       entityId: candidateId,
    //       entityType: CandidateEntityConstant.CANDIDATE_LANGUAGES,
    //       formData: JSON.stringify(newValues),
    //       formId: parseInt(form.formId),
    //     };

    //     dispatch(
    //       postCandidate({
    //         entity: CandidateEntityConstant.CANDIDATE_LANGUAGES,
    //         newData,
    //         rerenderTable: rerenderTable,
    //         resetForm: resetForm([], "create"),
    //       })
    //     );
    //     return;
    //   }

    //   // Cancel add contact and reset form
    //   if (buttonName === "cancel" && !editData) {
    //     setButtonName("");
    //     resetForm([], "create");
    //     return;
    //   }

    //   // Update contact
    //   if (buttonName === "tableUpdate") {
    //     setButtonName("");
    //     const newData = {
    //       ...newValues,
    //       entityId: candidateId,
    //       entityType: CandidateEntityConstant.CANDIDATE_LANGUAGES,
    //       formData: JSON.stringify(newValues),
    //       formId: parseInt(form.formId),
    //     };

    //     // Get update id
    //     const table = formFieldsData.find(
    //       (field) =>
    //         field.type === "table" &&
    //         field.name === CandidateTableListConstant.LANGUAGES_LIST
    //     );
    //     const { tableEditId } = table.tableSetting;
    //     dispatch(
    //       putCandidate({
    //         entity: CandidateEntityConstant.CANDIDATE_LANGUAGES,
    //         id: tableEditId,
    //         newData,
    //         rerenderTable: rerenderTable,
    //         resetForm: resetForm([], "create"),
    //       })
    //     );
    //   }
    // }

    // Employer Details
    // if (step === 6) {
    //   // Add contact
    //   if (buttonName === "add") {
    //     setErrorMessage(null);
    //     setButtonName("");
    //     const newData = {
    //       ...newValues,
    //       entityId: candidateId,
    //       entityType: CandidateEntityConstant.CANDIDATE_EMPLOYER_DETAILS,
    //       formData: JSON.stringify(newValues),
    //       formId: parseInt(form.formId),
    //     };

    //     dispatch(
    //       postCandidate({
    //         entity: CandidateEntityConstant.CANDIDATE_EMPLOYER_DETAILS,
    //         newData,
    //         rerenderTable: rerenderTable,
    //         resetForm: resetForm([], "create"),
    //       })
    //     );
    //     return;
    //   }

    //   // Cancel add contact and reset form
    //   if (buttonName === "cancel" && !editData) {
    //     setButtonName("");
    //     resetForm([], "create");
    //     return;
    //   }

    //   // Update contact
    //   if (buttonName === "tableUpdate") {
    //     setButtonName("");
    //     const newData = {
    //       ...newValues,
    //       entityId: candidateId,
    //       entityType: CandidateEntityConstant.CANDIDATE_EMPLOYER_DETAILS,
    //       formData: JSON.stringify(newValues),
    //       formId: parseInt(form.formId),
    //     };

    //     // Get update id
    //     const table = formFieldsData.find(
    //       (field) =>
    //         field.type === "table" &&
    //         field.name === CandidateTableListConstant.EMPLOYER_DETAILS_LIST
    //     );
    //     const { tableEditId } = table.tableSetting;
    //     dispatch(
    //       putCandidate({
    //         entity: CandidateEntityConstant.CANDIDATE_EMPLOYER_DETAILS,
    //         id: tableEditId,
    //         newData,
    //         rerenderTable: rerenderTable,
    //         resetForm: resetForm([], "create"),
    //       })
    //     );
    //   }

    //   // Patch draft status to false
    //   if (buttonName === "submit") {
    //    // Fetch to patch draft status to false
    //   }
    // }

    // if (step === 1) {
    //   if (buttonName === "add") {
    //     setErrorMessage(null);
    //     setButtonName("");
    //     const newData = {
    //       ...newValues,
    //       entityId: candidateId,
    //       entityType: CandidateEntityConstant.ACCOUNT_CONTACT,
    //       formData: JSON.stringify(newValues),
    //       formId: parseInt(form.formId),
    //     };

    //     dispatch(
    //       postCandidate({
    //         entity: CandidateEntityConstant.ACCOUNT_CONTACT,
    //         newData,
    //         rerenderTable: rerenderTable,
    //         resetForm: resetForm([], "create"),
    //       })
    //     );
    //     return;
    //   }

    //   if (buttonName === "cancel" && !editData) {
    //     setButtonName("");
    //     resetForm([], "create");
    //     return;
    //   }

    //   if (buttonName === "tableUpdate") {
    //     setButtonName("");
    //     const newData = {
    //       ...newValues,
    //       entityId: candidateId,
    //       entityType: CandidateEntityConstant.ACCOUNT_CONTACT,
    //       formData: JSON.stringify(newValues),
    //       formId: parseInt(form.formId),
    //     };

    //     // Get update id
    //     const table = formFieldsData.find(
    //       (field) =>
    //         field.type === "table" &&
    //         field.name === CandidateTableListConstant.CONTACT_LIST
    //     );
    //     const { tableEditId } = table.tableSetting;
    //     dispatch(
    //       putCandidate({
    //         entity: CandidateEntityConstant.ACCOUNT_CONTACT,
    //         id: tableEditId,
    //         newData,
    //         rerenderTable: rerenderTable,
    //         resetForm: resetForm([], "create"),
    //       })
    //     );
    //   }
    // }

    // if (step === 2) {
    //   if (buttonName === "add") {
    //     setErrorMessage(null);
    //     setButtonName("");
    //     let formValues = { ...newValues };
    //     const documentData = { ...formValues };
    //     const fileData = formValues?.file;
    //     const fileName = fileData?.name;
    //     formValues = { ...formValues, file: fileName };
    //     const documentDataOut = {
    //       ...documentData,
    //       entityType: CandidateEntityConstant.ACCOUNT_DOCUMENT,
    //       entityId: parseInt(candidateId),
    //       formData: JSON.stringify(formValues),
    //       formId: parseInt(form.formId),
    //     };
    //     delete documentDataOut.documentList;

    //     const documentFormData =
    //       ObjectHelper.convertObjectToFormData(documentDataOut);
    //     dispatch(
    //       postCandidate({
    //         entity: CandidateEntityConstant.ACCOUNT_DOCUMENT,
    //         newData: documentFormData,
    //         config: {
    //           headers: {
    //             "Content-Type": "multipart/form-data",
    //           },
    //         },
    //         rerenderTable: rerenderTable,
    //         resetForm: resetForm,
    //       })
    //     );
    //   }

    //   if (buttonName === "cancel" && !editData) {
    //     resetForm();
    //     return;
    //   }

    //   if (buttonName === "tableUpdate") {
    //     let formValues = { ...newValues };
    //     const documentData = { ...formValues };
    //     const fileData = formValues?.file;
    //     if (typeof fileData === "string") {
    //       // Remove upload agreement from object
    //       formValues = { ...formValues, file: fileData };
    //       delete documentData.file;
    //     } else {
    //       const fileName = fileData?.name;
    //       formValues = { ...formValues, file: fileName };
    //     }

    //     const documentDataOut = {
    //       ...documentData,
    //       entityType: CandidateEntityConstant.ACCOUNT_DOCUMENT,
    //       entityId: parseInt(candidateId),
    //       formData: JSON.stringify(formValues),
    //       formId: parseInt(form.formId),
    //     };
    //     delete documentDataOut.documentList;

    //     const documentFormData =
    //       ObjectHelper.convertObjectToFormData(documentDataOut);

    //     // Get update id
    //     const table = formFieldsData.find(
    //       (field) =>
    //         field.type === "table" &&
    //         field.name === CandidateTableListConstant.DOCUMENT_LIST
    //     );
    //     const { tableEditId } = table.tableSetting;
    //     dispatch(
    //       putCandidate({
    //         entity: CandidateEntityConstant.ACCOUNT_DOCUMENT,
    //         id: tableEditId,
    //         newData: documentFormData,
    //         config: {
    //           headers: {
    //             "Content-Type": "multipart/form-data",
    //           },
    //         },
    //         rerenderTable: rerenderTable,
    //         resetForm: resetForm([], "create"),
    //       })
    //     );
    //   }
    // }

    // if (step === 3) {
    //   if (buttonName === "add") {
    //     setButtonName("");
    //     let formValues = { file: newValues.file };
    //     const documentData = { ...formValues };
    //     const fileData = formValues?.file;
    //     const fileName = fileData?.name;
    //     formValues = { ...formValues, file: fileName };
    //     const documentDataOut = {
    //       ...documentData,
    //       entityType: CandidateEntityConstant.ACCOUNT_INSTRUCTION_DOCUMENT,
    //       entityId: parseInt(candidateId),
    //       formData: JSON.stringify(formValues),
    //       formId: parseInt(form.formId),
    //     };

    //     const documentFormData =
    //       ObjectHelper.convertObjectToFormData(documentDataOut);
    //     dispatch(
    //       postCandidate({
    //         entity: CandidateEntityConstant.ACCOUNT_DOCUMENT,
    //         newData: documentFormData,
    //         config: {
    //           headers: {
    //             "Content-Type": "multipart/form-data",
    //           },
    //         },
    //         rerenderTable: rerenderTable,
    //         resetForm: resetForm(["file"]),
    //       })
    //     );
    //     return;
    //   }
    //   if (formSubmissionData != null) {
    //     const formData = {
    //       guidelines: newValues.guidelines,
    //     };
    //     const newData = {
    //       ...formData,
    //       entityId: candidateId,
    //       entityType: CandidateEntityConstant.ACCOUNT_INSTRUCTION,
    //       formData: JSON.stringify(formData),
    //       formId: parseInt(form.formId),
    //     };

    //     dispatch(
    //       putCandidate({
    //         entity: CandidateEntityConstant.ACCOUNT_INSTRUCTION,
    //         id: editId,
    //         newData,
    //         rerenderTable: rerenderTable,
    //       })
    //     );
    //   }
    // }

    // if (step === 5) {
    //   const formData = {
    //     ...newValues,
    //     entityType: CandidateEntityConstant.ACCOUNT_COMMERCIAL,
    //     entityId: parseInt(candidateId),
    //     formData: JSON.stringify(newValues),
    //     formId: parseInt(form.formId),
    //   };
    //   dispatch(
    //     putCandidate({
    //       entity: CandidateEntityConstant.ACCOUNT_COMMERCIAL,
    //       id: candidateId,
    //       newData: formData,
    //     })
    //   );
    // }
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
    if (
      step === 1 ||
      step === 2 ||
      step === 3 ||
      step === 4 ||
      step === 5 ||
      step === 6
    ) {
      if (view === false) {
        // formFormik.resetForm();
        formikRef.current.clearForm();
        // Set all to untouched
        formikRef.current.formik.setTouched({});
      }
    }
    setView((prevState) => !prevState);
  };

  /**
   * Handle Candidate Success
   */
  if (createMetaData?.isSuccess) {
    dispatch(resetMetaData());
    if (step === 6) {
      navigate("/candidates");
      return;
    }
    handleNext();
  }

  /**
   * Handle Candidate success (Update)
   */
  if (updateMetaData?.isSuccess) {
    dispatch(resetMetaData());
    if (step === 6) {
      navigate("/candidates");
      return;
    }
    handleNext();
  }

  return (
    <>
      <Container className="page-content">
        <FormStepper
          activeStep={step}
          handleBack={handleBack}
          handleNext={handleNext}
          formikRef={formikRef}
          formFieldsData={formFieldsData}
          setErrorMessage={setErrorMessage}
          candidateId={candidateId}
          resetStepper={resetStepper}
          toggleFormViewState={toggleFormViewState}
          viewState={view}
        >
          <Form
            template={formTemplate}
            userDetails={getAllUserGroups()}
            country={candidateCountry}
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

export default EditCandidate;
