import {
  FETCH_ACCOUNTFORM,
  FETCH_ACCOUNTFORM_SUCCESS,
  FETCH_ACCOUNTFORM_FAILURE,
  FETCH_ACCOUNTFORM_SUBMISSION,
  FETCH_ACCOUNTFORM_SUBMISSION_SUCCESS,
  FETCH_ACCOUNTFORM_SUBMISSION_FAILURE,
  CLEAR_ACCOUNTFORM_SUBMISSION,
} from "./actionTypes";
import { JsonHelper } from "@workspace/common";

const initialState = {
  forms: [],
  form: null,
  formSubmission: null,
  errorMsg: "",
  loading: true,
  error: false,
};

const AccountFormReducer = (state = initialState, action) => {
  console.log("AccountFormReducer", action.type, action.payload)
  switch (action.type) {
    case CLEAR_ACCOUNTFORM_SUBMISSION:
      console.log("Clearing.....");
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
        error: false,
      };
    case FETCH_ACCOUNTFORM_SUBMISSION_SUCCESS:
      console.log("FETCH_ACCOUNTFORM_SUBMISSION_SUCCESS", action.payload);
      const submissionData = JSON.parse(action.payload.submissionData);
      return {
        ...state,
        loading: false,
        formSubmission: submissionData,
      };
    case FETCH_ACCOUNTFORM_SUBMISSION_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };

    default:
      return state;
  }
};

export default AccountFormReducer;
