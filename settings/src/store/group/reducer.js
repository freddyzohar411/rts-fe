import {
  CREATE_GROUP,
  CREATE_GROUP_SUCCESS,
  CREATE_GROUP_FAILURE,
  LIST_GROUPS,
  LIST_GROUPS_SUCCESS,
  LIST_GROUPS_FAILURE,
  FETCH_GROUPS,
  FETCH_GROUPS_SUCCESS,
  FETCH_GROUPS_FAILURE,
  FETCH_GROUP,
  FETCH_GROUP_SUCCESS,
  FETCH_GROUP_FAILURE,
  UPDATE_GROUP,
  UPDATE_GROUP_SUCCESS,
  UPDATE_GROUP_FAILURE,
  DELETE_GROUP,
  DELETE_GROUP_SUCCESS,
  DELETE_GROUP_FAILURE,
} from "./actionTypes";

import {
  errorMetaData,
  pendingMetaData,
  resetMetaData,
  successMetaData,
} from "@workspace/common";

const initialState = {
  group: {},
  groups: [],
  groupListing: [],
  meta: {},
  createMeta: {},
  updateMeta: {},
  deleteMeta: {},
};

const GroupReducer = (state = initialState, action) => {
  switch (action.type) {
    // Create Group
    case CREATE_GROUP:
      state.createMeta = pendingMetaData();
      return state;
    case CREATE_GROUP_SUCCESS:
      state.createMeta = successMetaData(action.payload);
      return state;
    case CREATE_GROUP_FAILURE:
      state.createMeta = errorMetaData(action.payload);
      return state;
    // Fetch Groups
    // case FETCH_GROUPS:
    //   state.meta = pendingMetaData();
    //   return state;
    // case FETCH_GROUPS_SUCCESS:
    //   state.meta = successMetaData();
    //   state.groups = action.payload;
    //   return state;
    // case FETCH_GROUPS_FAILURE:
    //   state.meta = errorMetaData(action.payload);
    //   return state;
    // Fetch Group
    case FETCH_GROUP:
      state.meta = pendingMetaData();
      return state;
    case FETCH_GROUP_SUCCESS:
      state.meta = successMetaData();
      state.group = action.payload;
      return state;
    case FETCH_GROUP_FAILURE:
      state.meta = errorMetaData(action.payload);
      return state;
    // Update Group
    case UPDATE_GROUP:
      state.updateMeta = pendingMetaData();
      return state;
    case UPDATE_GROUP_SUCCESS:
      state.updateMeta = successMetaData();
      return state;
    case UPDATE_GROUP_FAILURE:
      state.updateMeta = errorMetaData(action.payload);
      return state;
    // Delete Group
    case DELETE_GROUP:
      state.deleteMeta = pendingMetaData();
      return state;
    case DELETE_GROUP_SUCCESS:
      state.deleteMeta = successMetaData();
      return state;
    case DELETE_GROUP_FAILURE:
      state.deleteMeta = errorMetaData(action.payload);
      return state;
    // List Groups
    case LIST_GROUPS:
      state.meta = pendingMetaData();
      state.createMeta = resetMetaData();
      state.updateMeta = resetMetaData();
      state.deleteMeta = resetMetaData();
      return state;
    case LIST_GROUPS_SUCCESS:
      state.meta = successMetaData();
      state.groupListing = action.payload;
      return state;
    case LIST_GROUPS_FAILURE:
      state.meta = errorMetaData(action.payload);
      return state;
    default:
      return state;
  }
};

export default GroupReducer;
