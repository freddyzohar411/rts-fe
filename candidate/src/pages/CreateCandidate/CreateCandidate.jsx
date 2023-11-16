import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "reactstrap";
import FormStepper from "./FormStepper";
import { Form } from "@workspace/common";
import { useSelector, useDispatch } from "react-redux";
import {
  postCandidate,
  putCandidate,
  resetMetaData,
} from "../../store/candidate/action";
import {
  CandidateFormConstant,
  CandidateEntityConstant,
  CandidateTableListConstant,
} from "../../constants/candidateConstant";
import {
  fetchDraftCandidate,
  deleteCandidateId,
  deleteCandidateCountry,
} from "../../store/candidateregistration/action";
import {
  fetchCandidateFormSubmission,
  clearCandidateFormSubmission,
} from "../../store/candidateForm/action";
import { ObjectHelper } from "@workspace/common";
// import {
//   CONTACT_BASE_URL,
//   GET_CONTACT_BY_ENTITY_URL,
//   DOCUMENT_BASE_URL,
//   GET_DOCUMENT_BY_ENTITY_URL,
// } from "../../helpers/endpoint_helper";
import {
  DOCUMENT_BASE_URL,
  GET_DOCUMENT_BY_ENTITY_URL
} from "../../helpers/backend_helper";
import { useUserAuth } from "@workspace/login";
import { toast } from "react-toastify";
import CountryModal from "../../components/CountryModal/CountryModal";
import { fetchCandidateForm } from "../../store/candidateForm/action";

const CreateCandidate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getAllUserGroups } = useUserAuth();

  const form = useSelector((state) => state.CandidateFormReducer.form);
  console.log("form", form);

  const candidateId = useSelector(
    (state) => state.CandidateRegistrationReducer.candidateId
  );
  const accountCountry = useSelector(
    (state) => state.CandidateRegistrationReducer.candidateCountry
  );

  const formSubmissionData = useSelector(
    (state) => state.CandidateFormReducer.formSubmission
  );

  const editId = useSelector((state) => state.CandidateFormReducer.editId);

  const updateData = useSelector(
    (state) => state.CandidateFormReducer.formSubmission
  );

  const createMetaData = useSelector(
    (state) => state.CandidateReducer.createMeta
  );

  const updateMetaData = useSelector(
    (state) => state.CandidateReducer.updateMeta
  );

  const MAX_STEP = 6;
  const [step, setStep] = useState(0);
  const formikRef = useRef(null);
  const [editData, setEditData] = useState(formSubmissionData || null);
  const [formFieldsData, setFormFieldsData] = useState([]);
  const [formTemplate, setFormTemplate] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [country, setCountry] = useState(null);

  // ============Console.log============

  console.log("Step", step);
  console.log("Form submission data: ", formSubmissionData);
  console.log("candidate ID", candidateId);

  //====================================

  /**
   * Set country if is in edit mode
   */
  useEffect(() => {
    if (accountCountry) {
      setCountry(accountCountry);
    }
  }, [accountCountry]);

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
      // if (step === 1) {
      //   const formEdited = setTableAPI(
      //     form,
      //     AccountTableListConstant.CONTACT_LIST,
      //     GET_CONTACT_BY_ENTITY_URL(
      //       AccountEntityConstant.ACCOUNT_CONTACT,
      //       candidateId
      //     ),
      //     CONTACT_BASE_URL
      //   );
      //   setFormTemplate(formEdited);
      //   return;
      // }
      // if (step === 2) {
      //   const formEdited = setTableAPI(
      //     form,
      //     AccountTableListConstant.DOCUMENT_LIST,
      //     GET_DOCUMENT_BY_ENTITY_URL(
      //       AccountEntityConstant.ACCOUNT_DOCUMENT,
      //       candidateId
      //     ),
      //     DOCUMENT_BASE_URL
      //   );
      //   setFormTemplate(formEdited);
      //   return;
      // }
      // if (step === 3) {
      //   const formEdited = setTableAPI(
      //     form,
      //     AccountTableListConstant.INSTRUCTION_DOCUMENT_LIST,
      //     GET_DOCUMENT_BY_ENTITY_URL(
      //       AccountEntityConstant.ACCOUNT_INSTRUCTION_DOCUMENT,
      //       candidateId
      //     ),
      //     DOCUMENT_BASE_URL
      //   );
      //   setFormTemplate(formEdited);
      //   return;
      // }
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
   * Fetch draft account if there is
   */
  useEffect(() => {
    dispatch(fetchDraftCandidate());
  }, []);

  /**
   * Fetch form submission data if there is a draft account
   */
  useEffect(() => {
    dispatch(clearCandidateFormSubmission());
    setEditData(null);
    if (candidateId) {
      if (step === 0) {
        console.log("INNN LEH");
        dispatch(
          fetchCandidateFormSubmission(
            CandidateEntityConstant.CANDIDATE_BASIC_INFO,
            candidateId
          )
        );
      }
      // if (step === 2) {
      //   dispatch(clearAccountFormSubmission());
      // }
      // if (step === 3) {
      //   dispatch(
      //     fetchAccountFormSubmission(
      //       AccountEntityConstant.ACCOUNT_INSTRUCTION,
      //       candidateId
      //     )
      //   );
      // }
      // if (step === 5) {
      //   dispatch(
      //     fetchAccountFormSubmission(
      //       AccountEntityConstant.ACCOUNT_COMMERCIAL,
      //       candidateId
      //     )
      //   );
      // }
    }
  }, [step]);

  // clear form submission if
  useEffect(() => {
    if (candidateId === null) {
      dispatch(clearCandidateFormSubmission());
    }
  }, [candidateId]);

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

    if (step === 0) {
      // Create Account
      if (formSubmissionData === null) {
        // Get file data
        const candidateData = { ...newValues };

        const candidateDataOut = {
          ...candidateData,
          formData: JSON.stringify(candidateData),
          formId: parseInt(form.formId),
        };
        // console.log("Form Id", form.formId)
        // return;
        const formData1 =
          ObjectHelper.convertObjectToFormData(candidateDataOut);

        dispatch(
          postCandidate({
            entity: CandidateEntityConstant.CANDIDATE_BASIC_INFO,
            newData: formData1,
            config: {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
          })
        );
      } else {
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

    // if (step === 1) {
    //   // Add contact
    //   if (buttonName === "add") {
    //     setErrorMessage(null);
    //     setButtonName("");
    //     const newData = {
    //       ...newValues,
    //       entityId: accountId,
    //       entityType: AccountEntityConstant.ACCOUNT_CONTACT,
    //       formData: JSON.stringify(newValues),
    //       formId: parseInt(form.formId),
    //     };

    //     dispatch(
    //       postAccount({
    //         entity: AccountEntityConstant.ACCOUNT_CONTACT,
    //         newData,
    //         rerenderTable: rerenderTable,
    //         resetForm: resetForm,
    //       })
    //     );
    //     return;
    //   }

    //   // Cancel add contact and reset form
    //   if (buttonName === "cancel" && !editData) {
    //     setButtonName("");
    //     resetForm();
    //     return;
    //   }

    //   // Update contact
    //   if (buttonName === "tableUpdate") {
    //     setButtonName("");
    //     const newData = {
    //       ...newValues,
    //       entityId: accountId,
    //       entityType: AccountEntityConstant.ACCOUNT_CONTACT,
    //       formData: JSON.stringify(newValues),
    //       formId: parseInt(form.formId),
    //     };

    //     // Get update id
    //     const table = formFieldsData.find(
    //       (field) =>
    //         field.type === "table" &&
    //         field.name === AccountTableListConstant.CONTACT_LIST
    //     );
    //     const { tableEditId } = table.tableSetting;
    //     dispatch(
    //       putAccount({
    //         entity: AccountEntityConstant.ACCOUNT_CONTACT,
    //         id: tableEditId,
    //         newData,
    //         rerenderTable: rerenderTable,
    //         resetForm: resetForm,
    //       })
    //     );
    //   }
    // }

    // if (step === 2) {
    //   // Add document
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
    //       entityType: AccountEntityConstant.ACCOUNT_DOCUMENT,
    //       entityId: parseInt(accountId),
    //       formData: JSON.stringify(formValues),
    //       formId: parseInt(form.formId),
    //     };
    //     delete documentDataOut.documentList;

    //     const documentFormData =
    //       ObjectHelper.convertObjectToFormData(documentDataOut);

    //     dispatch(
    //       postAccount({
    //         entity: AccountEntityConstant.ACCOUNT_DOCUMENT,
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

    //   // Cancel add document and reset form
    //   if (buttonName === "cancel" && !editData) {
    //     resetForm([], "create");
    //     return;
    //   }

    //   // Update document
    //   if (buttonName === "tableUpdate") {
    //     setButtonName("");
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
    //       entityType: AccountEntityConstant.ACCOUNT_DOCUMENT,
    //       entityId: parseInt(accountId),
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
    //         field.name === AccountTableListConstant.DOCUMENT_LIST
    //     );
    //     const { tableEditId } = table.tableSetting;
    //     dispatch(
    //       putAccount({
    //         entity: AccountEntityConstant.ACCOUNT_DOCUMENT,
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
    //   // Add instruction document
    //   if (buttonName === "add") {
    //     setButtonName("");
    //     let formValues = { file: newValues.file };
    //     const documentData = { ...formValues };
    //     const fileData = formValues?.file;
    //     const fileName = fileData?.name;
    //     formValues = { ...formValues, file: fileName };
    //     const documentDataOut = {
    //       ...documentData,
    //       entityType: AccountEntityConstant.ACCOUNT_INSTRUCTION_DOCUMENT,
    //       entityId: parseInt(accountId),
    //       formData: JSON.stringify(formValues),
    //       formId: parseInt(form.formId),
    //     };

    //     const documentFormData =
    //       ObjectHelper.convertObjectToFormData(documentDataOut);
    //     dispatch(
    //       postAccount({
    //         entity: AccountEntityConstant.ACCOUNT_DOCUMENT,
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

    //   //Create instruction
    //   if (formSubmissionData === null) {
    //     const formData = {
    //       guidelines: newValues.guidelines,
    //     };
    //     const newData = {
    //       ...formData,
    //       entityId: accountId,
    //       entityType: AccountEntityConstant.ACCOUNT_INSTRUCTION,
    //       formData: JSON.stringify(formData),
    //       formId: parseInt(form.formId),
    //     };

    //     dispatch(
    //       postAccount({
    //         entity: AccountEntityConstant.ACCOUNT_INSTRUCTION,
    //         newData,
    //         rerenderTable: rerenderTable,
    //       })
    //     );
    //   } else {
    //     // Update instruction
    //     const formData = {
    //       guidelines: newValues.guidelines,
    //     };
    //     const newData = {
    //       ...formData,
    //       entityId: accountId,
    //       entityType: AccountEntityConstant.ACCOUNT_INSTRUCTION,
    //       formData: JSON.stringify(formData),
    //       formId: parseInt(form.formId),
    //     };

    //     dispatch(
    //       putAccount({
    //         entity: AccountEntityConstant.ACCOUNT_INSTRUCTION,
    //         id: editId,
    //         newData,
    //         rerenderTable: rerenderTable,
    //       })
    //     );
    //   }
    // }

    // if (step === 5) {
    //   // Create commercial
    //   const formData = {
    //     ...newValues,
    //     entityType: AccountEntityConstant.ACCOUNT_COMMERCIAL,
    //     entityId: parseInt(accountId),
    //     formData: JSON.stringify(newValues),
    //     formId: parseInt(form.formId),
    //   };
    //   dispatch(
    //     postAccount({
    //       entity: AccountEntityConstant.ACCOUNT_COMMERCIAL,
    //       id: accountId,
    //       newData: formData,
    //     })
    //   );
    // }
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
   * Handle Account Success
   */
  if (createMetaData?.isSuccess) {
    dispatch(resetMetaData());
    if (step === 5) {
      navigate("/accounts");
      return;
    }
    handleNext();
  }

  /**
   * Handle Account success (Update)
   */
  if (updateMetaData?.isSuccess) {
    dispatch(resetMetaData());
    if (step === 5) {
      navigate("/accounts");
      return;
    }
    handleNext();
  }

  return (
    <>
      {/* {isModalOpen && !accountId && <CountryModal setCountry={setCountry} />} */}
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
        >
          <Form
            template={formTemplate}
            userDetails={getAllUserGroups()}
            country={accountCountry || country?.name || null}
            editData={formSubmissionData}
            onSubmit={handleFormSubmit}
            onFormFieldsChange={handleFormFieldChange}
            errorMessage={errorMessage}
            view={false}
            ref={formikRef}
          />
        </FormStepper>
      </Container>
    </>
  );
};

export default CreateCandidate;
