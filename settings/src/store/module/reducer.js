import {
  FETCH_MODULES,
  FETCH_MODULES_SUCCESS,
  FETCH_MODULES_FAILURE,
} from "./actionTypes";

const initialState = {
  modules: null,
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
      console.log("modules", action.payload);
      // Sort in alphabetical order
      const modulesData = action.payload.sort((a, b) =>
        a.moduleName > b.moduleName ? 1 : -1
      );
      return {
        ...state,
        loading: false,
        modules: modulesData,
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
