import {
  FETCH_CANDIDATEFORM,
  FETCH_CANDIDATEFORM_SUCCESS,
  FETCH_CANDIDATEFORM_FAILURE,
  FETCH_CANDIDATEFORM_SUBMISSION,
  FETCH_CANDIDATEFORM_SUBMISSION_SUCCESS,
  FETCH_CANDIDATEFORM_SUBMISSION_FAILURE,
  CLEAR_CANDIDATEFORM_SUBMISSION,
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

const CandidateFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_CANDIDATEFORM_SUBMISSION:
      return {
        ...state,
        formSubmission: null,
      };

    // Fetch Form by id
    case FETCH_CANDIDATEFORM:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_CANDIDATEFORM_SUCCESS:
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
    case FETCH_CANDIDATEFORM_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    case FETCH_CANDIDATEFORM_SUBMISSION:
      return {
        ...state,
        loading: true,
        formSubmissionLoading: true,
        error: false,
      };
    case FETCH_CANDIDATEFORM_SUBMISSION_SUCCESS:
      const submissionData = JSON.parse(action.payload.submissionData);
      return {
        ...state,
        formSubmissionLoading: false,
        formSubmission: submissionData,
        editId: parseInt(action.payload.id),
      };
    case FETCH_CANDIDATEFORM_SUBMISSION_FAILURE:
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

export default CandidateFormReducer;
