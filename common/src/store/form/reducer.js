import {
  FETCH_FORMCATEGORIES,
  FETCH_FORMCATEGORIES_SUCCESS,
  FETCH_FORMCATEGORIES_FAILURE,
  FETCH_FORMS_BY_CATEGORY,
  FETCH_FORMS_BY_CATEGORY_SUCCESS,
  FETCH_FORMS_BY_CATEGORY_FAILURE,
} from "./actionTypes";

const initialState = {
  formCategories: [],
  formsByCategories: [],
  errorMsg: "",
  loading: false,
  error: false,
};

const FormCommonReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FORMCATEGORIES:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_FORMCATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        formCategories: action.payload,
      };
    case FETCH_FORMCATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    case FETCH_FORMS_BY_CATEGORY:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_FORMS_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        formsByCategories: action.payload,
      };
    case FETCH_FORMS_BY_CATEGORY_FAILURE:
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

export default FormCommonReducer;
