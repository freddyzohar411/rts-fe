import {
  FETCH_DEPARTMENT,
  FETCH_DEPARTMENT_SUCCESS,
  FETCH_DEPARTMENT_FAILURE,
} from "./actionTypes";

export const fetchDepartment = () => ({
  type: FETCH_DEPARTMENT,
});

export const fetchDepartmentSuccess = (department) => ({
  type: FETCH_DEPARTMENT_SUCCESS,
  payload: department,
});

export const fetchDepartmentFailure = (error) => ({
  type: FETCH_DEPARTMENT_FAILURE,
  payload: error,
});
