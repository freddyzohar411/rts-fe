import {
  FETCH_PROFILE,
  PROFILE_ERROR,
  PROFILE_SUCCESS,
  EDIT_PROFILE,
  RESET_PROFILE_FLAG,
  DELETE_PROFILE
} from "./actionTypes";

export const editProfile = (user) => {
  return {
    type: EDIT_PROFILE,
    payload: { user },
  };
};

export const fetchProfile = () => {
  return {
    type: FETCH_PROFILE,
  };
};

export const profileSuccess = (userProfile) => {
  return {
    type: PROFILE_SUCCESS,
    payload: userProfile,
  };
};

export const profileError = (error) => {
  return {
    type: PROFILE_ERROR,
    payload: error,
  };
};

export const deleteProfile = () => {
  return {
    type: DELETE_PROFILE,
  };
};

export const resetProfileFlag = (error) => {
  return {
    type: RESET_PROFILE_FLAG,
  };
};

