import {
  FETCH_DEPARTMENT,
  FETCH_DEPARTMENT_SUCCESS,
  FETCH_DEPARTMENT_FAILURE,
} from "./actionTypes";

const initialState = {
  department: [],
  meta: {},
  createMeta: {},
  updateMeta: {},
  deleteMeta: {},
};

import {
  errorMetaData,
  pendingMetaData,
  resetMetaData,
  successMetaData,
} from "../../metadata/utilities";

const DepartmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DEPARTMENT:
      return {
        ...state,
        meta: pendingMetaData(),
      };
    case FETCH_DEPARTMENT_SUCCESS:
      return {
        ...state,
        meta: successMetaData(),
        department: action.payload,
      };
    case FETCH_DEPARTMENT_FAILURE:
      return {
        ...state,
        meta: errorMetaData(action.payload),
      };
    default:
      return state;
  }
};

export default DepartmentReducer;
