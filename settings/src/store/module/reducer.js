import {
  FETCH_MODULES,
  FETCH_MODULES_SUCCESS,
  FETCH_MODULES_FAILURE,
} from "./actionTypes";

const initialState = {
  modules: [],
  message: "",
  error: false,
  loading: false,
};

const ModuleReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch Modules
    case FETCH_MODULES:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case FETCH_MODULES_SUCCESS:
      return {
        ...state,
        loading: false,
        modules: action.payload,
      };

    case FETCH_MODULES_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
      };

    default:
      return state;
  }
};

export default ModuleReducer;
