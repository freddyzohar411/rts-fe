import {
  FETCH_MODULES,
  FETCH_MODULES_SUCCESS,
  FETCH_MODULES_FAILURE,
} from "./actionTypes";

// Fetch Modules
export const fetchModules = () => ({
  type: FETCH_MODULES,
});

export const fetchModulesSuccess = (modules) => ({
  type: FETCH_MODULES_SUCCESS,
  payload: modules,
});

export const fetchModulesFailure = (error) => ({
  type: FETCH_MODULES_FAILURE,
  payload: error,
});
