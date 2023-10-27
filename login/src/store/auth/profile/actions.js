import {
  PROFILE_ERROR,
  PROFILE_SUCCESS,
  EDIT_PROFILE,
  RESET_PROFILE_FLAG,
  PROFILE_PERMISSION_SUCCESS,
  PROFILE_PERMISSION_ERROR,
} from "./actionTypes";

export const editProfile = (user) => {
  return {
    type: EDIT_PROFILE,
    payload: { user },
  };
};

export const profileSuccess = (msg) => {
  return {
    type: PROFILE_SUCCESS,
    payload: msg,
  };
};

export const profileError = (error) => {
  return {
    type: PROFILE_ERROR,
    payload: error,
  };
};

export const resetProfileFlag = (error) => {
  return {
    type: RESET_PROFILE_FLAG,
  };
};

// User profile permission actions
export const profilePermissionSuccess = (profilePermission) => {
  return {
    type: PROFILE_PERMISSION_SUCCESS,
    payload: profilePermission,
  };
};

export const profilePermissionError = (error) => {
  return {
    type: PROFILE_PERMISSION_ERROR,
    payload: error,
  };
}
