import {
  FETCH_FORMS,
  FETCH_FORMS_SUCCESS,
  FETCH_FORMS_FAILURE,
  DELETE_FORM,
  DELETE_FORM_SUCCESS,
  DELETE_FORM_FAILURE,
} from "./actionTypes";

const initialState = {
  forms: [],
  errorMsg: "",
  loading: false,
  error: false,
};

const FormReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FORMS:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_FORMS_SUCCESS:
      console.log("action.payload", action.payload);
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
    case DELETE_FORM:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case DELETE_FORM_SUCCESS:
      // Let filter away the deleted form from forms
      const newForms = state.forms.filter(
        (form) => parseInt(form.formId) !== action.payload
      );
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
