import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
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
  FETCH_CANDIDATES_ADMIN,
  IMPORT_CANDIDATE,
  IMPORT_CANDIDATE_MULTI,
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
  getCandidatesAdmin,
  createCandidateList,
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

// Fetch candidate Admin listing
function* workFetchCandidatesAdmin(action) {
  try {
    const response = yield call(getCandidatesAdmin, action.payload);
    yield put(fetchCandidatesAdminSuccess(response.data));
  } catch (error) {
    toast.error("Error fetching accounts");
    yield put(fetchCandidatesAdminFailure(error));
  }
}

// Import Candidate
// function* workImportCandidate(action) {
//   const { candidateRequestArray: candidateData, navigate } = action.payload; // Array of candidate data
//   let candidateId = null;
//   // Set Basic Info
//   console.log("Candidate Data [0]", candidateData[0]);
//   try {
//     const response = yield call(
//       createCandidate,
//       candidateData[0].entity,
//       candidateData[0]?.id,
//       candidateData[0].newData,
//       candidateData[0].config
//     );
//     candidateId = response?.data?.id;
//   } catch (error) {
//     toast.error("Error creating candidate");
//     console.log("Error creating candidate", error);
//   }

//   console.log("Candidate Id", candidateId);

//   console.log("Candidate Data [1]", candidateData[1]);
//   // Set Work Experience candidateData[1] which is an array
//   // Work experience
//   if (candidateId) {
//     for (const workExperience of candidateData[1].newData) {
//       const workExperienceFormData = ObjectHelper.convertObjectToFormData({
//         ...workExperience,
//         entityId: candidateId,
//       });
//       try {
//         const response = yield call(
//           createCandidate,
//           candidateData[1].entity,
//           null,
//           workExperienceFormData,
//           candidateData[1].config
//         );
//       } catch (error) {
//         toast.error("Error creating candidate");
//         console.log("Error creating candidate", error);
//       }
//     }
//   }

//   // Languages
//   if (candidateId) {
//     console.log("Languages Data", candidateData[2].newData);
//     for (const language of candidateData[2].newData) {
//       const languageFormData = {
//         formData: "",
//         ...language,
//         entityId: candidateId,
//       };
//       try {
//         const response = yield call(
//           createCandidate,
//           candidateData[2].entity,
//           null,
//           languageFormData,
//           candidateData[2]?.config
//         );
//       } catch (error) {
//         toast.error("Error creating candidate");
//         console.log("Error creating candidate", error);
//       }
//     }
//   }

//   // Education
//   if (candidateId) {
//     for (const education of candidateData[3].newData) {
//       const educationFormData = {
//         formData: "",
//         ...education,
//         entityId: candidateId,
//       };
//       try {
//         const response = yield call(
//           createCandidate,
//           candidateData[3].entity,
//           null,
//           educationFormData,
//           candidateData[3].config
//         );
//       } catch (error) {
//         toast.error("Error creating candidate");
//         console.log("Error creating candidate", error);
//       }
//     }
//   }

//   // Certification
//   if (candidateId) {
//     console.log("Certification Data", candidateData[4].newData);
//     for (const certification of candidateData[4].newData) {
//       console.log("Certification Data", certification);
//       const certificationFormData = {
//         formData: "",
//         ...certification,
//         entityId: candidateId,
//       };
//       try {
//         const response = yield call(
//           createCandidate,
//           candidateData[4].entity,
//           null,
//           certificationFormData,
//           candidateData[4]?.config
//         );
//       } catch (error) {
//         toast.error("Error creating candidate");
//         console.log("Error creating candidate", error);
//       }
//     }
//   }

//   // Complete candidate registration
//   try {
//     const response = yield call(
//       completeCandidateRegistration,
//       parseInt(candidateId)
//     );
//     toast.success("Candidate created successfully");
//     // console.log(
//     //   "Candidate Id EDit Link",
//     //   `/candidates/${candidateId}/snapshot`
//     // );
//     navigate(`/candidates/${candidateId}/snapshot`, { state: { view: false } });
//   } catch (error) {
//     toast.error("Error creating candidate");
//     console.log("Error creating candidate", error);
//   }
// }

// Import Candidate
function* workImportCandidate(action) {
  try {
    const { candidateRequestArray: candidateData, navigate } = action.payload; // Array of candidate data
    let candidateId = null;
    // Set Basic Info
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
      toast.error("Error creating candidate");
      console.log("Error creating candidate", error);
    }

    console.log("Candidate Id", candidateId);

    // Work experience
    if (!candidateId) return;

    const workExperiences = candidateData[1].newData;
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
      toast.error("Error creating candidate");
      console.log("Error creating candidate", error);
    }

    // Languages
    let languageFormDataArray = [];
    for (const language of candidateData[2].newData) {
      languageFormDataArray.push({
        formData: "",
        ...language,
        entityId: candidateId,
      });
    }
    console.log("Languages Data Array", languageFormDataArray);
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
        toast.error("Error creating candidate");
        console.log("Error creating candidate", error);
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
      toast.error("Error creating candidate");
      console.log("Error creating candidate", error);
    }

    // Document
    let documentFormData = candidateData[4].newData;
    console.log("Check File", documentFormData.file);
    console.log("candidateData[4].entity: ", candidateData[4].entity)
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
        toast.error("Error creating candidate Document");
        console.log("Error creating candidate", error);
      }
    }

    // Certification
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
      toast.error("Error creating candidate");
      console.log("Error creating candidate", error);
    }

    // Complete candidate registration
    try {
      const response = yield call(
        completeCandidateRegistration,
        parseInt(candidateId)
      );

      yield put(importCandidateSuccess());
      // Check if navgate exist
      if (typeof navigate === "function") {
        toast.success("Candidate created successfully");
        navigate(`/candidates/${candidateId}/snapshot`, {
          state: { view: false },
        });
      }
    } catch (error) {
      toast.error("Error creating candidate");
      console.log("Error creating candidate", error);
    }
  } catch (error) {
    console.log("Error creating candidate", error);
    yield put(importCandidateFailure());
  }
}

// Import Candidate multiples
function* workImportCandidateMulti(action) {
  try {
    const { candidateRequestArrayAll, navigate } = action.payload;
    // Loop workImportCandidate
    for (const candidateRequestArray of candidateRequestArrayAll) {
      yield call(workImportCandidate, {
        payload: {
          candidateRequestArray,
        },
      });
    }
    yield put(importCandidateMultiSuccess());

    if (typeof navigate === "function") {
      toast.success("Candidates created successfully");
      navigate("/candidates");
    }
  } catch (error) {
    console.log("Error creating candidate", error);
    yield put(importCandidateMultiFailure());
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
  yield takeEvery(FETCH_CANDIDATES_ADMIN, workFetchCandidatesAdmin);
  yield takeEvery(IMPORT_CANDIDATE, workImportCandidate);
  yield takeEvery(IMPORT_CANDIDATE_MULTI, workImportCandidateMulti);
}
