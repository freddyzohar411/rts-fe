import {
  GET_CANDIDATE_MAPPING,
  GET_CANDIDATE_MAPPING_SUCCESS,
  GET_CANDIDATE_MAPPING_FAILURE,
  POST_CANDIDATE_MAPPING,
  POST_CANDIDATE_MAPPING_SUCCESS,
  POST_CANDIDATE_MAPPING_FAILURE,
} from "./actionTypes";

export const getCandidateMapping = () => {
  return {
    type: GET_CANDIDATE_MAPPING,
  };
}

export const getCandidateMappingSuccess = (data) => {
  return {
    type: GET_CANDIDATE_MAPPING_SUCCESS,
    payload: data,
  };
}

export const getCandidateMappingFailure = (error) => {
  return {
    type: GET_CANDIDATE_MAPPING_FAILURE,
    payload: error,
  };
}

export const postCandidateMapping = (data) => {
  return {
    type: POST_CANDIDATE_MAPPING,
    payload: data,
  };
}

export const postCandidateMappingSuccess = (data) => {
  return {
    type: POST_CANDIDATE_MAPPING_SUCCESS,
    payload: data,
  };
}

export const postCandidateMappingFailure = (error) => {
  return {
    type: POST_CANDIDATE_MAPPING_FAILURE,
    payload: error,
  };
}







