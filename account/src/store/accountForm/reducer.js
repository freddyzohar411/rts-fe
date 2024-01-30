import {
  FETCH_ACCOUNTFORM,
  FETCH_ACCOUNTFORM_SUCCESS,
  FETCH_ACCOUNTFORM_FAILURE,
  FETCH_ACCOUNTFORM_SUBMISSION,
  FETCH_ACCOUNTFORM_SUBMISSION_SUCCESS,
  FETCH_ACCOUNTFORM_SUBMISSION_FAILURE,
  CLEAR_ACCOUNTFORM_SUBMISSION,
  SET_FORM_SUBMISSION,
} from "./actionTypes";
import { JsonHelper } from "@workspace/common";

const initialState = {
  forms: [],
  form: null,
  formSubmission: null,
  editId: null,
  errorMsg: "",
  loading: false,
  formSubmissionLoading: false,
  error: false,
};

const AccountFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_ACCOUNTFORM_SUBMISSION:
      return {
        ...state,
        formSubmission: null,
      };

    // Fetch Form by id
    case FETCH_ACCOUNTFORM:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_ACCOUNTFORM_SUCCESS:
      const data = action.payload;
      const newForm = {
        formId: data?.formId,
        formName: data?.formName,
        formType: data?.formType,
        baseFormId: data?.baseFormId || 0,
        entityType: data?.entityType,
        stepperNumber: parseInt(data?.stepperNumber),
        formSchema: JsonHelper.parseArrayObjectValues(data.formFieldsList),
        formLayoutSchema: data.formSchemaList,
      };
      return {
        ...state,
        loading: false,
        form: newForm,
      };
    case FETCH_ACCOUNTFORM_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    case FETCH_ACCOUNTFORM_SUBMISSION:
      return {
        ...state,
        loading: true,
        formSubmissionLoading: true,
        error: false,
      };
    case FETCH_ACCOUNTFORM_SUBMISSION_SUCCESS:
      let submissionData = action.payload?.submissionData;
      let submissionId = action.payload?.id;
      if (submissionData && submissionId) {
         submissionData = JSON.parse(action.payload?.submissionData);
         submissionId = parseInt(action.payload.id);
      }
      return {
        ...state,
        formSubmissionLoading: false,
        formSubmission: submissionData,
        editId: submissionId,
      };
    case FETCH_ACCOUNTFORM_SUBMISSION_FAILURE:
      return {
        ...state,
        formSubmissionLoading: false,
        error: true,
        errorMsg: action.payload,
      };
    case SET_FORM_SUBMISSION:
      return {
        ...state,
        formSubmission: action.payload,
      };

    default:
      return state;
  }
};

export default AccountFormReducer;
