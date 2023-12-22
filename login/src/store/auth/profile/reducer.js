import {
  FETCH_PROFILE,
  PROFILE_ERROR,
  PROFILE_SUCCESS,
  EDIT_PROFILE,
  RESET_PROFILE_FLAG,
  DELETE_PROFILE,
} from "./actionTypes";

const initialState = {
  error: "",
  success: "",
  user: {},
  userProfile: null,
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROFILE:
      state = { ...state };
      break;
    case EDIT_PROFILE:
      state = { ...state };
      break;
    case PROFILE_SUCCESS:
      state = {
        ...state,
        success: !action.payload.error,
        userProfile: action.payload.data,
      };
      break;
    case PROFILE_ERROR:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
    case DELETE_PROFILE:
      return {
        ...state,
        userProfile: null,
      };
    case RESET_PROFILE_FLAG:
      state = {
        ...state,
        success: null,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default profile;
