import {
  FETCH_PARENTCOMPANY,
  FETCH_PARENTCOMPANY_SUCCESS,
  FETCH_PARENTCOMPANY_FAILURE,
} from "./actionTypes";

export const fetchParentCompany = () => ({
  type: FETCH_PARENTCOMPANY,
});

export const fetchParentCompanySuccess = (parentCompany) => ({
  type: FETCH_PARENTCOMPANY_SUCCESS,
  payload: parentCompany,
});

export const fetchParentCompanyFailure = (error) => ({
  type: FETCH_PARENTCOMPANY_FAILURE,
  payload: error,
});
