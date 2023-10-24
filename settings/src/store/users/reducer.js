import {
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
} from "./actionTypes";

const initialState = {
  user: {},
  errorMsg: "",
  loading: false,
  error: false,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch User
    case FETCH_USER:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };

    case CREATE_USER:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case CREATE_USER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };

    case CREATE_USER_FAILURE:
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

export default UserReducer;
