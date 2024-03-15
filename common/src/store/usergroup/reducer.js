import {
  FETCH_USERGROUP,
  FETCH_USERGROUP_SUCCESS,
  FETCH_USERGROUP_FAILURE,
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from "./actionTypes";

import {
  errorMetaData,
  pendingMetaData,
  successMetaData,
} from "@workspace/common";

const initialState = {
  userGroups: [],
  usersMeta: {},
  users: [],
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

    case FETCH_USERS:
      return {
        ...state,
        usersMeta: pendingMetaData(),
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        usersMeta: successMetaData(action.payload),
        users: action.payload,
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        candidates: [],
        users: errorMetaData(action.payload),
      };
    default:
      return state;
  }
};

export default UserGroupReducer;
