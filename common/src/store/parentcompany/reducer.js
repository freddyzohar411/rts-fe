import {
  FETCH_PARENTCOMPANY,
  FETCH_PARENTCOMPANY_SUCCESS,
  FETCH_PARENTCOMPANY_FAILURE,
} from "./actionTypes";

const initialState = {
  parentCompany: [],
  errorMsg: "",
  loading: false,
  error: false,
};

const ParentCompanyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PARENTCOMPANY:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_PARENTCOMPANY_SUCCESS:
      return {
        ...state,
        loading: false,
        parentCompany: action.payload,
      };
    case FETCH_PARENTCOMPANY_FAILURE:
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

export default ParentCompanyReducer;
