import {
  FETCH_CANDIDATE,
  FETCH_CANDIDATE_SUCCESS,
  FETCH_CANDIDATE_FAILURE,
  FETCH_CANDIDATES,
  FETCH_CANDIDATES_SUCCESS,
  FETCH_CANDIDATES_FAILURE,
  CREATE_CANDIDATE,
  CREATE_CANDIDATE_SUCCESS,
  CREATE_CANDIDATE_FAILURE,
  POST_CANDIDATE,
  POST_CANDIDATE_SUCCESS,
  POST_CANDIDATE_FAILURE,
  PUT_CANDIDATE,
  PUT_CANDIDATE_SUCCESS,
  PUT_CANDIDATE_FAILURE,
  DELETE_CANDIDATE,
  DELETE_CANDIDATE_SUCCESS,
  DELETE_CANDIDATE_FAILURE,
  FETCH_CANDIDATES_FIELDS,
  FETCH_CANDIDATES_FIELDS_SUCCESS,
  FETCH_CANDIDATES_FIELDS_FAILURE,
  PUT_CANDIDATE_DRAFT_STATUS,
  PUT_CANDIDATE_DRAFT_STATUS_SUCCESS,
  PUT_CANDIDATE_DRAFT_STATUS_FAILURE,
  RESET_META_DATA,
  FETCH_CANDIDATE_DATA,
  FETCH_CANDIDATE_DATA_SUCCESS,
  FETCH_CANDIDATE_DATA_FAILURE,
  FETCH_CANDIDATES_FIELDS_ALL,
  FETCH_CANDIDATES_FIELDS_ALL_SUCCESS,
  FETCH_CANDIDATES_FIELDS_ALL_FAILURE,
  IMPORT_CANDIDATE,
  IMPORT_CANDIDATE_SUCCESS,
  IMPORT_CANDIDATE_FAILURE,
  IMPORT_CANDIDATE_MULTI,
  IMPORT_CANDIDATE_MULTI_SUCCESS,
  IMPORT_CANDIDATE_MULTI_FAILURE,
  SET_PARSE_AND_IMPORT_LOADING,
  UPDATE_CANIDATE_EMBEDDINGS,
  UPDATE_CANIDATE_EMBEDDINGS_SUCCESS,
  UPDATE_CANIDATE_EMBEDDINGS_FAILURE,
  CANDIDATE_RECOMMENDATION_LIST,
  CANDIDATE_RECOMMENDATION_LIST_SUCCESS,
  CANDIDATE_RECOMMENDATION_LIST_FAILURE,
  RESET_CANDIDATE_RECOMMENDATION_LIST,
  CREATE_CANDIDATE_CUSTOM_VIEW,
  CREATE_CANDIDATE_CUSTOM_VIEW_SUCCESS,
  CREATE_CANDIDATE_CUSTOM_VIEW_FAILURE,
  FETCH_CANDIDATE_CUSTOM_VIEW,
  FETCH_CANDIDATE_CUSTOM_VIEW_SUCCESS,
  FETCH_CANDIDATE_CUSTOM_VIEW_FAILURE,
  SELECT_CANDIDATE_CUSTOM_VIEW,
  SELECT_CANDIDATE_CUSTOM_VIEW_SUCCESS,
  SELECT_CANDIDATE_CUSTOM_VIEW_FAILURE,
  DELETE_CANDIDATE_CUSTOM_VIEW,
  DELETE_CANDIDATE_CUSTOM_VIEW_SUCCESS,
  DELETE_CANDIDATE_CUSTOM_VIEW_FAILURE,
  DELETE_CANDIDATES,
  DELETE_CANDIDATES_SUCCESS,
  DELETE_CANDIDATES_FAILURE,
  DELETE_CANDIDATES_RESET,
  RESET_CANDIDATE_CUSTOM_VIEW,
  FETCH_CANDIDATE_CUSTOM_VIEW_BY_ID,
  FETCH_CANDIDATE_CUSTOM_VIEW_BY_ID_FAILURE,
  FETCH_CANDIDATE_CUSTOM_VIEW_BY_ID_SUCCESS,
  EDIT_CANDIDATE_CUSTOM_VIEW_BY_ID,
  EDIT_CANDIDATE_CUSTOM_VIEW_BY_ID_FAILURE,
  EDIT_CANDIDATE_CUSTOM_VIEW_BY_ID_SUCCESS,
  RESET_CANDIDATES,
  UNSELECT_CANDIDATE_CUSTOM_VIEW,
  UNSELECT_CANDIDATE_CUSTOM_VIEW_SUCCESS,
  UNSELECT_CANDIDATE_CUSTOM_VIEW_FAILURE,
  FETCH_CANDIDATE_STATIC_REPORT_COUNT,
  FETCH_CANDIDATE_STATIC_REPORT_COUNT_SUCCESS,
  FETCH_CANDIDATE_STATIC_REPORT_COUNT_FAILURE,
  FETCH_CANDIDATE_STATIC_REPORT_LISTING,
  FETCH_CANDIDATE_STATIC_REPORT_LISTING_SUCCESS,
  FETCH_CANDIDATE_STATIC_REPORT_LISTING_FAILURE,
} from "./actionTypes";

import {
  errorMetaData,
  pendingMetaData,
  resetAllMetaData,
  successMetaData,
} from "@workspace/common";

const initialState = {
  candidate: {},
  candidateMeta: {},
  candidates: [],
  candidateData: null,
  candidatesFields: [],
  candidatesFieldsAll: [],
  meta: {},
  createMeta: {},
  updateMeta: {},
  deleteMeta: {},

  tableMeta: {},
  importLoading: false,
  importMultiLoading: false,
  parseAndImportLoading: false,
  candidatesRecommendation: [],
  candidateRecommendationLoading: false,
  candidateCustomView: {},
  candidateCustomViewMeta: {},
  candidateCustomViews: null,
  deleteCandidatesMeta: {},
  candidateStaticReportCount: [],
  candidateStaticReportListing: [],
  staticReportMeta: {},
};

const CandidateReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch Account
    case FETCH_CANDIDATE:
      return {
        ...state,
        candidateMeta: pendingMetaData(),
      };
    case FETCH_CANDIDATE_SUCCESS:
      return {
        ...state,
        candidateMeta: successMetaData(action.payload),
        candidate: action.payload,
      };
    case FETCH_CANDIDATE_FAILURE:
      return {
        ...state,
        candidate: {},
        candidateMeta: errorMetaData(action.payload),
      };

    // Fetch all accounts
    case FETCH_CANDIDATES:
      return {
        ...state,
        candidateMeta: pendingMetaData(),
      };
    case FETCH_CANDIDATES_SUCCESS:
      return {
        ...state,
        candidateMeta: successMetaData(action.payload),
        candidates: action.payload,
      };
    case FETCH_CANDIDATES_FAILURE:
      return {
        ...state,
        candidates: [],
        candidateMeta: errorMetaData(action.payload),
      };

    // Create an Account
    case CREATE_CANDIDATE:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case CREATE_CANDIDATE_SUCCESS:
      return {
        ...state,
        createMeta: successMetaData(action.payload),
        candidate: action.payload,
      };
    case CREATE_CANDIDATE_FAILURE:
      return {
        ...state,
        createMeta: errorMetaData(action.payload),
      };

    // Post an Account
    case POST_CANDIDATE:
      return {
        ...state,
        createMeta: pendingMetaData(),
      };
    case POST_CANDIDATE_SUCCESS:
      return {
        ...state,
        createMeta: successMetaData(action.payload),
        candidate: action.payload,
      };
    case POST_CANDIDATE_FAILURE:
      return {
        ...state,
        createMeta: errorMetaData(action.payload),
      };

    // Put an Account
    case PUT_CANDIDATE:
      return {
        ...state,
        updateMeta: pendingMetaData(),
      };
    case PUT_CANDIDATE_SUCCESS:
      return {
        ...state,
        updateMeta: successMetaData(action.payload),
        candidate: action.payload,
      };
    case PUT_CANDIDATE_FAILURE:
      return {
        ...state,
        updateMeta: errorMetaData(action.payload),
      };

    // Delete an Account
    case DELETE_CANDIDATE:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case DELETE_CANDIDATE_SUCCESS:
      const newCandidates = JSON.parse(JSON.stringify(state.candidates));
      const filteredCandidates = newCandidates.candidates.filter(
        (candidate) => candidate.id !== action.payload
      );
      newCandidates.candidates = filteredCandidates;
      return {
        ...state,
        candidates: newCandidates,
        loading: false,
        success: true,
      };
    case DELETE_CANDIDATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
        success: false,
      };

    // Fetch all accounts fields
    case FETCH_CANDIDATES_FIELDS:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case FETCH_CANDIDATES_FIELDS_SUCCESS:
      return {
        ...state,
        loading: false,
        candidatesFields: action.payload,
      };

    case FETCH_CANDIDATES_FIELDS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    case PUT_CANDIDATE_DRAFT_STATUS:
      return {
        ...state,
        updateMeta: pendingMetaData(),
      };
    case PUT_CANDIDATE_DRAFT_STATUS_SUCCESS:
      return {
        ...state,
        updateMeta: successMetaData(action.payload),
        candidate: action.payload,
      };
    case PUT_CANDIDATE_DRAFT_STATUS_FAILURE:
      return {
        ...state,
        updateMeta: errorMetaData(action.payload),
      };
    case RESET_META_DATA:
      return {
        ...state,
        meta: resetAllMetaData(),
        createMeta: resetAllMetaData(),
        updateMeta: resetAllMetaData(),
        deleteMeta: resetAllMetaData(),
      };
    case FETCH_CANDIDATE_DATA:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_CANDIDATE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        candidateData: action.payload,
      };
    case FETCH_CANDIDATE_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    case FETCH_CANDIDATES_FIELDS_ALL:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_CANDIDATES_FIELDS_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        candidatesFieldsAll: action.payload,
      };
    case FETCH_CANDIDATES_FIELDS_ALL_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    case IMPORT_CANDIDATE:
      return {
        ...state,
        importLoading: true,
      };
    case IMPORT_CANDIDATE_SUCCESS:
      return {
        ...state,
        importLoading: false,
      };
    case IMPORT_CANDIDATE_FAILURE:
      return {
        ...state,
        importLoading: false,
      };
    case IMPORT_CANDIDATE_MULTI:
      return {
        ...state,
        importMultiLoading: true,
      };
    case IMPORT_CANDIDATE_MULTI_SUCCESS:
      return {
        ...state,
        importMultiLoading: false,
      };
    case IMPORT_CANDIDATE_MULTI_FAILURE:
      return {
        ...state,
        importMultiLoading: false,
      };
    case SET_PARSE_AND_IMPORT_LOADING:
      return {
        ...state,
        parseAndImportLoading: action.payload,
      };

    case UPDATE_CANIDATE_EMBEDDINGS:
      return {
        ...state,
      };
    case UPDATE_CANIDATE_EMBEDDINGS_SUCCESS:
      return {
        ...state,
      };
    case UPDATE_CANIDATE_EMBEDDINGS_FAILURE:
      return {
        ...state,
      };
    case CANDIDATE_RECOMMENDATION_LIST:
      return {
        ...state,
        candidateRecommendationLoading: true,
        error: false,
      };
    case CANDIDATE_RECOMMENDATION_LIST_SUCCESS:
      return {
        ...state,
        candidateRecommendationLoading: false,
        candidatesRecommendation: action.payload,
      };
    case CANDIDATE_RECOMMENDATION_LIST_FAILURE:
      return {
        ...state,
        candidateRecommendationLoading: false,
        error: true,
        errorMsg: action.payload,
      };
    case RESET_CANDIDATE_RECOMMENDATION_LIST:
      return {
        ...state,
        candidatesRecommendation: [],
      };

    // Create Custom View
    case CREATE_CANDIDATE_CUSTOM_VIEW:
      return {
        ...state,
        candidateCustomViewMeta: pendingMetaData(),
      };
    case CREATE_CANDIDATE_CUSTOM_VIEW_SUCCESS:
      return {
        ...state,
        candidateCustomView: action.payload,
        candidateCustomViewMeta: successMetaData(action.payload),
      };
    case CREATE_CANDIDATE_CUSTOM_VIEW_FAILURE:
      return {
        ...state,
        errorMsg: action.payload,
        candidateCustomViewMeta: errorMetaData(action.payload),
      };
    // Fetch Custom View
    case FETCH_CANDIDATE_CUSTOM_VIEW:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_CANDIDATE_CUSTOM_VIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        candidateCustomViews: action.payload,
      };
    case FETCH_CANDIDATE_CUSTOM_VIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    // Select Custom View
    case SELECT_CANDIDATE_CUSTOM_VIEW:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case SELECT_CANDIDATE_CUSTOM_VIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        candidateCustomView: action.payload,
      };
    case SELECT_CANDIDATE_CUSTOM_VIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    // Delete Custom View
    case DELETE_CANDIDATE_CUSTOM_VIEW:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case DELETE_CANDIDATE_CUSTOM_VIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        candidateCustomView: action.payload,
      };
    case DELETE_CANDIDATE_CUSTOM_VIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    case DELETE_CANDIDATES:
      return {
        ...state,
        deleteCandidatesMeta: pendingMetaData(),
      };
    case DELETE_CANDIDATES_SUCCESS:
      const newCandidatesTemp = JSON.parse(JSON.stringify(state.candidates));
      const filteredCandidatesTemp = newCandidatesTemp.candidates.filter(
        (candidate) => !action.payload.includes(candidate.id)
      );
      newCandidatesTemp.candidates = filteredCandidatesTemp;
      return {
        ...state,
        deleteCandidatesMeta: successMetaData(action.payload),
        candidates: newCandidatesTemp,
      };
    case DELETE_CANDIDATES_FAILURE:
      return {
        ...state,
        deleteCandidatesMeta: errorMetaData(action.payload),
      };
    case DELETE_CANDIDATES_RESET:
      return {
        ...state,
        deleteCandidatesMeta: resetAllMetaData(),
      };
    case RESET_CANDIDATE_CUSTOM_VIEW:
      return {
        ...state,
        candidateCustomViews: null,
      };
    case FETCH_CANDIDATE_CUSTOM_VIEW_BY_ID:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_CANDIDATE_CUSTOM_VIEW_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        candidateCustomView: action.payload,
      };
    case FETCH_CANDIDATE_CUSTOM_VIEW_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    case EDIT_CANDIDATE_CUSTOM_VIEW_BY_ID:
      return {
        ...state,
        candidateCustomViewMeta: pendingMetaData(),
      };
    case EDIT_CANDIDATE_CUSTOM_VIEW_BY_ID_SUCCESS:
      return {
        ...state,
        candidateCustomView: action.payload,
        candidateCustomViewMeta: successMetaData(action.payload),
      };
    case EDIT_CANDIDATE_CUSTOM_VIEW_BY_ID_FAILURE:
      return {
        ...state,
        errorMsg: action.payload,
        candidateCustomViewMeta: errorMetaData(action.payload),
      };
    case RESET_CANDIDATES:
      return {
        ...state,
        candidates: [],
        candidateMeta: {},
      };
    case FETCH_CANDIDATE_STATIC_REPORT_COUNT:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_CANDIDATE_STATIC_REPORT_COUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        candidateStaticReportCount: action.payload,
      };
    case FETCH_CANDIDATE_STATIC_REPORT_COUNT_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    case FETCH_CANDIDATE_STATIC_REPORT_LISTING:
      return {
        ...state,
        staticReportMeta: pendingMetaData(),
      };
    case FETCH_CANDIDATE_STATIC_REPORT_LISTING_SUCCESS:
      return {
        ...state,
        staticReportMeta: successMetaData(action.payload),
        candidateStaticReportListing: action.payload,
      };
    case FETCH_CANDIDATE_STATIC_REPORT_LISTING_FAILURE:
      return {
        ...state,
        candidateStaticReportListing: [],
        staticReportMeta: errorMetaData(action.payload),
      };
    case UNSELECT_CANDIDATE_CUSTOM_VIEW:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case UNSELECT_CANDIDATE_CUSTOM_VIEW_SUCCESS:
      const newCandidateCustomViews = state.candidateCustomViews.map((view) => {
        if (view?.selected === true) {
          view.selected = false;
        }
        return view;
      });
      return {
        ...state,
        loading: false,
        candidateCustomViews: newCandidateCustomViews,
      };
    case UNSELECT_CANDIDATE_CUSTOM_VIEW_FAILURE:
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

export default CandidateReducer;
