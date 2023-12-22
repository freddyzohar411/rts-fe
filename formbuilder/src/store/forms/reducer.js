import {
  FETCH_FORMS,
  FETCH_FORMS_SUCCESS,
  FETCH_FORMS_FAILURE,
  FETCH_FORM,
  FETCH_FORM_SUCCESS,
  FETCH_FORM_FAILURE,
  DELETE_FORM,
  DELETE_FORM_SUCCESS,
  DELETE_FORM_FAILURE,
  CREATE_FORM,
  CREATE_FORM_SUCCESS,
  CREATE_FORM_FAILURE,
  UPDATE_FORM,
  UPDATE_FORM_SUCCESS,
  UPDATE_FORM_FAILURE,
  CLEAR_FORM,
} from "./actionTypes";
import { JsonHelper } from "@workspace/common";

const initialState = {
  forms: [],
  form: null,
  errorMsg: "",
  loading: false,
  error: false,
};

const FormReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch forms
    case FETCH_FORMS:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_FORMS_SUCCESS:
      return {
        ...state,
        loading: false,
        forms: action.payload,
      };
    case FETCH_FORMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };

    // Fetch Form by id
    case FETCH_FORM:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_FORM_SUCCESS:
      const data = action.payload;
      const newForm = {
        formName: data?.formName,
        formType: data?.formType,
        baseFormId: data?.baseFormId || 0,
        formCategory: data?.formCategory,
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
    case FETCH_FORM_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };

    // Delete form by id
    case DELETE_FORM:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case DELETE_FORM_SUCCESS:
      // Let filter away the deleted form from forms
      const newForms = JSON.parse(JSON.stringify(state.forms));
      const formsData = newForms.forms.filter(
        (form) => parseInt(form.formId) !== action.payload
      );
      newForms.forms = formsData;
      return {
        ...state,
        loading: false,
        forms: newForms,
      };
    case DELETE_FORM_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };

    // Create a form
    case CREATE_FORM:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case CREATE_FORM_SUCCESS:
      return {
        ...state,
        loading: false,
        form: null,
      };

    case CREATE_FORM_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };

    // Update a form
    case UPDATE_FORM:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case UPDATE_FORM_SUCCESS:
      return {
        ...state,
        loading: false,
        form: null,
      };
    case UPDATE_FORM_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    case CLEAR_FORM:
      return {
        ...state,
        form: null,
      };
    default:
      return state;
  }
};

export default FormReducer;
