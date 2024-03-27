import {
  CREATE_CUSTOM_VIEW,
  CREATE_CUSTOM_VIEW_SUCCESS,
  CREATE_CUSTOM_VIEW_FAILURE,
} from "./actionTypes";

// Create Account Custom View
export const createCustomview = (customViewRequest) => ({
    type: CREATE_CUSTOM_VIEW,
    payload: customViewRequest,
  });
  
  export const createCustomViewSuccess = (customView) => ({
    type: CREATE_CUSTOM_VIEW_SUCCESS,
    payload: customView,
  });
  
  export const createCustomViewFailure = (error) => ({
    type: CREATE_CUSTOM_VIEW_FAILURE,
    payload: error,
  });