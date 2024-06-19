import {
  call,
  put,
  takeEvery,
  takeLatest,
  cancelled,
} from "redux-saga/effects";
import { CandidateEntityConstant } from "../../constants/candidateConstant";

import {
  FETCH_CANDIDATE,
  POST_CANDIDATE,
  PUT_CANDIDATE,
  DELETE_CANDIDATE,
  FETCH_CANDIDATES,
  FETCH_CANDIDATES_FIELDS,
  PUT_CANDIDATE_DRAFT_STATUS,
  FETCH_CANDIDATE_DATA,
  FETCH_CANDIDATES_FIELDS_ALL,
  IMPORT_CANDIDATE,
  IMPORT_CANDIDATE_MULTI,
  UPDATE_CANIDATE_EMBEDDINGS,
  CANDIDATE_RECOMMENDATION_LIST,
  CREATE_CANDIDATE_CUSTOM_VIEW,
  FETCH_CANDIDATE_CUSTOM_VIEW,
  SELECT_CANDIDATE_CUSTOM_VIEW,
  DELETE_CANDIDATE_CUSTOM_VIEW,
  DELETE_CANDIDATES,
  FETCH_CANDIDATE_CUSTOM_VIEW_BY_ID,
  EDIT_CANDIDATE_CUSTOM_VIEW_BY_ID,
} from "./actionTypes";
import {
  fetchCandidateSuccess,
  fetchCandidateFailure,
  postCandidateSuccess,
  postCandidateFailure,
  putCandidateSuccess,
  putCandidateFailure,
  deleteCandidateSuccess,
  deleteCandidateFailure,
  fetchCandidatesSuccess,
  fetchCandidatesFailure,
  fetchCandidatesFieldsSuccess,
  fetchCandidatesFieldsFailure,
  putCandidateDraftStatusSuccess,
  putCandidateDraftStatusFailure,
  putCandidateDraftStatus,
  fetchCandidateDataSuccess,
  fetchCandidateDataFailure,
  fetchCandidatesFieldsAllSuccess,
  fetchCandidatesFieldsAllFailure,
  fetchCandidatesAdminSuccess,
  fetchCandidatesAdminFailure,
  importCandidateSuccess,
  importCandidateFailure,
  importCandidateMultiFailure,
  importCandidateMultiSuccess,
  setParseAndImportLoading,
  updateCandidateEmbeddingsSuccess,
  updateCandidateEmbeddingsFailure,
  candidateRecommendationListSuccess,
  candidateRecommendationListFailure,
  createCandidateCustomViewSuccess,
  createCandidateCustomViewFailure,
  fetchCandidateCustomViewSuccess,
  fetchCandidateCustomViewFailure,
  selectCandidateCustomViewSuccess,
  selectCandidateCustomViewFailure,
  fetchCandidateCustomView,
  deleteCandidateCustomViewSuccess,
  deleteCandidateCustomViewFailure,
  deleteCandidatesSuccess,
  deleteCandidatesFailure,
  fetchCandidateCustomViewByIdFailure,
  fetchCandidateCustomViewByIdSuccess,
  editCandidateCustomViewByIdSuccess,
  editCandidateCustomViewByIdFailure,
} from "./action";
import {
  getCandidates,
  createCandidate,
  updateCandidate,
  deleteCandidate,
  getCandidatesFields,
  getCandidateById,
  completeCandidateRegistration,
  getCandidateDataById,
  getCandidateFieldAll,
  createCandidateList,
  updateCandidateEmbeddings,
  getCandidateRecommendations,
  createCandidateCustomView,
  getCandidateCustomViews,
  selectCandidateCustomView,
  deleteCandidateCustomView,
  deleteCandidates,
} from "../../helpers/backend_helper";
import {
  setCandidateId,
  deleteCandidateId,
  setCandidateCountry,
  deleteCandidateCountry,
} from "../candidateregistration/action";
import { toast } from "react-toastify";
import { ObjectHelper } from "@workspace/common";

function generateFormDataArray(data, listName, addEnitityId = true, id = null) {
  const formData = new FormData();
  data.forEach((exp, expIndex) => {
    Object.keys(exp).forEach((key) => {
      // Check if the property is an array of files
      if (
        Array.isArray(exp[key]) &&
        exp[key].length &&
        exp[key][0] instanceof File
      ) {
        exp[key].forEach((file, fileIndex) => {
          formData.append(
            `${listName}[${expIndex}].${key}[${fileIndex}]`,
            file
          );
        });
      } else {
        // For non-file array or other types of properties
        formData.append(`${listName}[${expIndex}].${key}`, exp[key]);
      }
    });
    if (addEnitityId) {
      // Append the entityId
      formData.append(`${listName}[${expIndex}].entityId`, id);
    }
  });
  return formData;
}

function generateFormData(data, addEnitityId = true, id = null) {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    // Check if the property is an array of files
    if (
      Array.isArray(data[key]) &&
      data[key].length &&
      data[key][0] instanceof File
    ) {
      data[key].forEach((file, fileIndex) => {
        formData.append(`${key}[${fileIndex}]`, file);
      });
    } else {
      // For non-file array or other types of properties
      formData.append(key, data[key]);
    }
  });
  if (addEnitityId) {
    // Append the entityId
    formData.append("entityId", id);
  }
  return formData;
}

// Post account
function* workPostCandidate(action) {
  const { entity, newData, config, rerenderTable, id, resetForm } =
    action.payload;
  try {
    const response = yield call(createCandidate, entity, id, newData, config);
    if (entity === CandidateEntityConstant.CANDIDATE_BASIC_INFO) {
      yield put(postCandidateSuccess(response.data));
    }

    if (typeof resetForm === "function") {
      resetForm();
    }

    if (typeof rerenderTable === "function") {
      rerenderTable();
    }

    if (entity === CandidateEntityConstant.CANDIDATE_BASIC_INFO) {
      yield put(setCandidateId(response.data.id));
      // yield put(setCandidateCountry(response.data.candidateCountry));
      return;
    }
  } catch (error) {
    yield put(postCandidateFailure(error));
    toast.error(error?.message);
  }
}

// Put Candidate
function* workPutCandidate(action) {
  const { entity, id, newData, config, rerenderTable, resetForm } =
    action.payload;
  try {
    const response = yield call(updateCandidate, entity, id, newData, config);
    if (entity === CandidateEntityConstant.CANDIDATE_BASIC_INFO) {
      yield put(putCandidateSuccess(response.data));
    }

    if (typeof resetForm === "function") {
      resetForm();
    }

    if (typeof rerenderTable === "function") {
      rerenderTable();
    }
  } catch (error) {
    yield put(putCandidateFailure(error));
    if (error?.message) {
      if (error?.message === "Candidate already exists!") {
        toast.error("Candidate already exists");
      }
    }
  }
}

// Fetch accounts listing
function* workFetchCandidates(action) {
  try {
    const response = yield call(getCandidates, action.payload);
    yield put(fetchCandidatesSuccess(response.data));
  } catch (error) {
    yield put(fetchCandidatesFailure(error));
  }
}

// Delete Candidate
function* workDeleteCandidate(action) {
  try {
    const response = yield call(deleteCandidate, action.payload);
    yield put(deleteCandidateSuccess(action.payload));
    toast.success("Candidate deleted successfully");
  } catch (error) {
    yield put(deleteCandidateFailure(error));
  }
}

// Fetch accounts fields
function* workFetchCandidatesFields() {
  try {
    const response = yield call(getCandidatesFields);
    yield put(fetchCandidatesFieldsSuccess(response.data));
  } catch (error) {
    yield put(fetchCandidatesFieldsFailure(error));
  }
}

// Fetch account by id
function* workFetchCandidate(action) {
  try {
    const response = yield call(getCandidateById, action.payload);
    yield put(fetchCandidateSuccess(response.data));
    yield put(setCandidateCountry(response.data.accountCountry));
  } catch (error) {
    yield put(fetchCandidateFailure(error));
  }
}

// Put candidate draft status
function* workPutCandidateDraftStatus(action) {
  try {
    const response = yield call(completeCandidateRegistration, action.payload);
    yield put(putCandidateDraftStatusSuccess(response.data));
    yield put(deleteCandidateId());
    // yield put(deleteCandidateCountry());
    toast.success("Candidate created successfully");
  } catch (error) {
    yield put(putCandidateDraftStatusFailure(error));
  }
}

// Fetch candidate data by id
function* workFetchCandidateData(action) {
  try {
    const response = yield call(getCandidateDataById, action.payload);
    yield put(fetchCandidateDataSuccess(response.data));
  } catch (error) {
    yield put(fetchCandidateDataFailure(error));
  }
}

// Fetch accounts fields All
function* workFetchCandidatesFieldsAll() {
  try {
    const response = yield call(getCandidateFieldAll);
    yield put(fetchCandidatesFieldsAllSuccess(response.data));
  } catch (error) {
    yield put(fetchCandidatesFieldsAllFailure(error));
  }
}

// Import Candidate
function* workImportCandidate(action) {
  try {
    const { candidateRequestArray: candidateData, navigate } = action.payload; // Array of candidate data
    let candidateId = null;
    try {
      const response = yield call(
        createCandidate,
        candidateData[0].entity,
        candidateData[0]?.id,
        candidateData[0].newData,
        candidateData[0].config
      );
      candidateId = response?.data?.id;
    } catch (error) {
      yield put(setParseAndImportLoading(false));
      yield put(importCandidateFailure());
      if (error?.message) {
        if (error?.message === "Candidate already exists!") {
          toast.error("Candidate already exists");
        } else {
          toast.error("Error creating candidate basic info");
        }
      }
    }

    if (!candidateId) return;

    // Work experience
    const workExperiences = candidateData[1].newData;
    if (workExperiences.length > 0) {
      const workExperienceFormData = generateFormDataArray(
        candidateData[1]?.newData,
        "workExperienceList",
        true,
        candidateId
      );

      try {
        const response = yield call(
          createCandidateList,
          candidateData[1].entity,
          null,
          workExperienceFormData,
          candidateData[1].config
        );
      } catch (error) {
        yield put(setParseAndImportLoading(false));
        yield put(importCandidateFailure());
        toast.error("Error creating candidate work experiences");
      }
    }

    // Languages
    const languages = candidateData[2].newData;
    if (languages.length > 0) {
      let languageFormDataArray = [];
      for (const language of candidateData[2].newData) {
        languageFormDataArray.push({
          formData: "",
          ...language,
          entityId: candidateId,
        });
      }
      if (languageFormDataArray.length > 0) {
        try {
          const response = yield call(
            createCandidateList,
            candidateData[2].entity,
            null,
            {
              languagesList: languageFormDataArray,
            },
            candidateData[2]?.config
          );
        } catch (error) {
          yield put(setParseAndImportLoading(false));
          yield put(importCandidateFailure());
          toast.error("Error creating candidate languages");
        }
      }
    }

    // Education
    let educationFormDataArray = [];
    for (const education of candidateData[3].newData) {
      educationFormDataArray.push({
        formData: "",
        ...education,
        entityId: candidateId,
      });
    }
    try {
      const response = yield call(
        createCandidateList,
        candidateData[3].entity,
        null,
        {
          educationDetailsList: educationFormDataArray,
        },
        candidateData[3].config
      );
    } catch (error) {
      yield put(setParseAndImportLoading(false));
      yield put(importCandidateFailure());
      toast.error("Error creating candidate education details");
    }

    // Document
    let documentFormData = candidateData[4].newData;
    if (documentFormData?.file) {
      if (documentFormData) {
        const documentFormDataArray = generateFormData(
          documentFormData,
          true,
          candidateId
        );
        try {
          const response = yield call(
            createCandidate,
            candidateData[4].entity,
            null,
            documentFormDataArray,
            candidateData[4].config
          );
        } catch (error) {
          yield put(setParseAndImportLoading(false));
          yield put(importCandidateFailure());
          toast.error("Error creating candidate Document");
        }
      }
    }

    // Certification
    const certifications = candidateData[5].newData;
    if (certifications.length > 0) {
      let certificationFormDataArray = [];
      for (const certification of candidateData[5].newData) {
        certificationFormDataArray.push({
          formData: "",
          ...certification,
          entityId: candidateId,
        });
      }
      try {
        const response = yield call(
          createCandidateList,
          candidateData[5].entity,
          null,
          {
            certificationsList: certificationFormDataArray,
          },
          candidateData[5]?.config
        );
      } catch (error) {
        yield put(setParseAndImportLoading(false));
        yield put(importCandidateFailure());
        toast.error("Error creating candidate certificates");
      }
    }

    // Complete candidate registration
    try {
      const response = yield call(
        completeCandidateRegistration,
        parseInt(candidateId)
      );
      // Embedding
      // yield call(updateCandidateEmbeddings, candidateId);
      yield put(importCandidateSuccess());
      // Check if navgate exist
      if (typeof navigate === "function") {
        yield put(setParseAndImportLoading(false));
        toast.success("Candidate created successfully");
        navigate(`/candidates/${candidateId}/snapshot`, {
          state: { view: false },
        });
      }
      return { success: true };
    } catch (error) {
      yield put(importCandidateFailure());
      toast.error("Error creating candidate registration");
    }
  } catch (error) {
    yield put(importCandidateFailure());
    yield put(importCandidateMultiFailure());
    yield put(setParseAndImportLoading(false));
  }
}

function* workImportCandidateMulti(action) {
  const { candidateRequestArrayAll, navigate } = action.payload;
  let hasError = false;

  try {
    // Loop workImportCandidate
    for (const candidateRequestArray of candidateRequestArrayAll) {
      const { success } = yield call(workImportCandidate, {
        payload: { candidateRequestArray, navigate: null },
      });

      if (!success) {
        hasError = true;
        yield put(importCandidateFailure());
      }
    }

    if (!hasError) {
      yield put(importCandidateMultiSuccess());
      if (typeof navigate === "function") {
        toast.success("Candidates created successfully");
        navigate("/candidates");
      }
    } else {
      yield put(importCandidateMultiFailure());
    }
  } catch (error) {
    // Handle any unexpected errors that might occur outside the loop
    yield put(importCandidateFailure());
    yield put(importCandidateMultiFailure());
  } finally {
    // Ensure loading state is reset regardless of success or failure
    yield put(setParseAndImportLoading(false));
  }
}

// Update Candidate Embeddings
function* workUpdateCandidateEmbeddings(action) {
  try {
    const response = yield call(updateCandidateEmbeddings, action.payload);
  } catch (error) {}
}

// Candidate Recommendation List
function* workCandidateRecommendationList(action) {
  const { params, signal, type } = action.payload;
  try {
    let response = null;
    if (type === "Recommendation") {
      response = yield call(getCandidateRecommendations, params, signal);
    } else {
      response = yield call(getCandidates, params);
    }
    yield put(candidateRecommendationListSuccess(response.data));
  } catch (error) {
    yield put(candidateRecommendationListFailure(error));
  }
}

// Fetch Custom View
function* workFetchCandidateCustomView(action) {
  try {
    const response = yield call(getCandidateCustomViews, action.payload);
    yield put(fetchCandidateCustomViewSuccess(response.data));
  } catch (error) {
    yield put(fetchCandidateCustomViewFailure(error));
  }
}

// Create Custom View
function* workCreateCandidateCustomView(action) {
  const { payload, navigate } = action.payload;
  try {
    const candidateCustomViewResponse = yield call(
      createCandidateCustomView,
      payload
    );
    yield put(createCandidateCustomViewSuccess(candidateCustomViewResponse));
    yield put(fetchCandidateCustomView());
    toast.success("Candidate custom view created successfully!");
    navigate("/candidates");
  } catch (error) {
    yield put(createCandidateCustomViewFailure(error));
    if (error.response && error.response.status === 409) {
      toast.error("Candidate custom view name already exists.");
    } else {
      toast.error("Error creating candidate custom view!");
    }
  }
}

// Select Custom View
function* workSelectCandidateCustomView(action) {
  const { id } = action.payload;
  try {
    const response = yield call(selectCandidateCustomView, id);
    yield put(selectCandidateCustomViewSuccess(response.data));
    yield put(fetchCandidateCustomView());
    toast.success("Candidate custom view selected successfully!");
  } catch (error) {
    yield put(selectCandidateCustomViewFailure(error));
    toast.error("Error selecting candidate custom view!");
  }
}

// Delete Candidate Custom View
function* workDeleteCandidateCustomView(action) {
  const { id } = action.payload;
  try {
    const response = yield call(deleteCandidateCustomView, id);
    yield put(deleteCandidateCustomViewSuccess(response.data));
    yield put(fetchCandidateCustomView());
    toast.success("Candidate custom view deleted successfully!");
  } catch (error) {
    yield put(deleteCandidateCustomViewFailure(error));
    toast.error("Error deleting candidate custom view!");
  }
}

// Delete Candidates
function* workDeleteCandidates(action) {
  try {
    const response = yield call(deleteCandidates, {
      candidateIds: action.payload,
    });
    yield put(deleteCandidatesSuccess(action.payload));
  } catch (error) {
    yield put(deleteCandidatesFailure(error));
    toast.error("Error deleting candidates!");
  }
}

export default function* watchFetchCandidateSaga() {
  yield takeEvery(POST_CANDIDATE, workPostCandidate);
  yield takeEvery(PUT_CANDIDATE, workPutCandidate);
  yield takeEvery(FETCH_CANDIDATES, workFetchCandidates);
  yield takeEvery(DELETE_CANDIDATE, workDeleteCandidate);
  yield takeEvery(FETCH_CANDIDATES_FIELDS, workFetchCandidatesFields);
  yield takeEvery(FETCH_CANDIDATE, workFetchCandidate);
  yield takeEvery(PUT_CANDIDATE_DRAFT_STATUS, workPutCandidateDraftStatus);
  yield takeEvery(FETCH_CANDIDATE_DATA, workFetchCandidateData);
  yield takeEvery(FETCH_CANDIDATES_FIELDS_ALL, workFetchCandidatesFieldsAll);
  yield takeEvery(IMPORT_CANDIDATE, workImportCandidate);
  yield takeEvery(IMPORT_CANDIDATE_MULTI, workImportCandidateMulti);
  yield takeEvery(UPDATE_CANIDATE_EMBEDDINGS, workUpdateCandidateEmbeddings);
  yield takeEvery(
    CANDIDATE_RECOMMENDATION_LIST,
    workCandidateRecommendationList
  );
  yield takeEvery(CREATE_CANDIDATE_CUSTOM_VIEW, workCreateCandidateCustomView);
  yield takeEvery(FETCH_CANDIDATE_CUSTOM_VIEW, workFetchCandidateCustomView);
  yield takeEvery(SELECT_CANDIDATE_CUSTOM_VIEW, workSelectCandidateCustomView);
  yield takeEvery(DELETE_CANDIDATE_CUSTOM_VIEW, workDeleteCandidateCustomView);
  yield takeEvery(DELETE_CANDIDATES, workDeleteCandidates);
}
