import {
  FETCH_USERGROUP,
  FETCH_USERGROUP_SUCCESS,
  FETCH_USERGROUP_FAILURE,
} from "./actionTypes";

const initialState = {
  userGroups: [],
  errorMsg: "",
  loading: false,
  error: false,
};

const UserGroupReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERGROUP:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_USERGROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        userGroups: action.payload,
      };
    case FETCH_USERGROUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default UserGroupReducer;
