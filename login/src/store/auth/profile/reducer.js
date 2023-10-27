import {
  PROFILE_ERROR,
  PROFILE_SUCCESS,
  EDIT_PROFILE,
  RESET_PROFILE_FLAG,
  PROFILE_PERMISSION_ERROR,
  PROFILE_PERMISSION_SUCCESS,
} from "./actionTypes";

const initialState = {
  error: "",
  success: "",
  user: {},
  userPermission: null,
  userPermissionError: null,
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PROFILE:
      state = { ...state };
      break;
    case PROFILE_SUCCESS:
      state = {
        ...state,
        success: action.payload.status,
        user: action.payload.data,
      };
      break;
    case PROFILE_ERROR:
      state = {
        ...state,
        error: action.payload,
      };
      break;
    case RESET_PROFILE_FLAG:
      state = {
        ...state,
        success: null,
      };
      break;
    case PROFILE_PERMISSION_SUCCESS:
      state = {
        ...state,
        userPermission: action.payload,
      };
      break;
    case PROFILE_PERMISSION_ERROR:
      state = {
        ...state,
        userPermissionError: action.payload,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default profile;
