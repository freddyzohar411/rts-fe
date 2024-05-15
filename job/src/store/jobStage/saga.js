import { call, put, takeEvery } from "redux-saga/effects";
import { toast } from "react-toastify";
import {
  FETCH_JOB_TIMELINE_LIST,
  JOB_TIMELINE_COUNT,
  TAG_JOB,
  TAG_JOB_ALL,
  TAG_JOB_ATTACHMENT,
  UNTAG_JOB,
} from "./actionTypes";
import {
  tagJobSuccess,
  tagJobFailure,
  tagJobAllSuccess,
  tagJobAllFailure,
  fetchJobTimelineListSuccess,
  fetchJobTimelineListFailure,
  fetchJobtimeineCountSuccess,
  fetchJobtimeineCountFailure,
  tagJobAttachmentSuccess,
  tagJobAttachmentFailure,
  untagJobSuccess,
  untagJobFailure,
} from "./action";
import {
  getJobTimeline,
  getJobTimelineCount,
  tagAllJob,
  tagJob,
  tagJobWithAttachments,
  untagJob,
} from "../../helpers/backend_helper";

function* workTagJob(action) {
  const { payload, navigate } = action.payload;
  try {
    const response = yield call(tagJob, payload);
    yield put(tagJobSuccess(response.data));
    if (payload?.jobType) {
      if (payload?.jobType === "associate_candidate") {
        toast.success("Job has been associated successfully.");
      } else if (payload?.jobType === "submit_to_sales") {
        toast.success("Job has been submitted to sales.");
      } else if (payload?.jobType === "submit_to_client") {
        toast.success("Job has been submitted to client.");
      } else {
        toast.success("Operation submitted successfully.");
      }
    } else {
      toast.success(response?.message);
      navigate(`/jobs/${payload?.jobId}/overview`);
    }
  } catch (error) {
    yield put(tagJobFailure(error));
  }
}

function* workTagAllJob(action) {
  const { payload, navigate } = action.payload;
  try {
    // Tag a job
    const response = yield call(tagAllJob, payload);
    yield put(tagJobAllSuccess(response.data));
    toast.success(response?.message);
    navigate(`/jobs/${payload?.[0]?.jobId}/overview`);
  } catch (error) {
    yield put(tagJobAllFailure(error));
  }
}

function* workUntagJob(action) {
  const { jobId, candidateId } = action.payload;
  try {
    // Untag a job
    const response = yield call(untagJob, jobId, candidateId);
    yield put(untagJobSuccess(response.data));
    toast.success(response?.message);
  } catch (error) {
    yield put(untagJobFailure(error));
  }
}

// Fetch job timeline listing
function* workFetchJobTimelineList(action) {
  try {
    const response = yield call(getJobTimeline, action.payload);
    yield put(fetchJobTimelineListSuccess(response.data));
  } catch (error) {
    yield put(fetchJobTimelineListFailure(error));
  }
}

// Fetch job timeline count
function* workFetchJobTimelineCount(action) {
  try {
    const { jobId } = action.payload;
    const response = yield call(getJobTimelineCount, jobId);
    yield put(fetchJobtimeineCountSuccess(response.data));
  } catch (error) {
    yield put(fetchJobtimeineCountFailure(error));
  }
}

// Tag job attachment
function* workTagJobAttachment(action) {
  const { formData, navigate, jobType, config } = action.payload;
  try {
    // Tag a job
    const response = yield call(tagJobWithAttachments, formData, config);
    yield put(tagJobAttachmentSuccess(response.data));
    if (jobType) {
      if (jobType === "submit_to_sales") {
        toast.success("Job has been submitted to sales.");
      } else if (jobType === "submit_to_client") {
        toast.success("Job has been submitted to client.");
      } else {
        toast.success("Operation submitted successfully.");
      }
    } else {
      toast.success(response?.message);
      navigate(`/jobs/${payload?.jobId}/overview`);
    }
  } catch (error) {
    yield put(tagJobAttachmentFailure(error));
  }
}

export default function* watchTagJobSaga() {
  yield takeEvery(TAG_JOB, workTagJob);
  yield takeEvery(TAG_JOB_ALL, workTagAllJob);
  yield takeEvery(UNTAG_JOB, workUntagJob);
  yield takeEvery(FETCH_JOB_TIMELINE_LIST, workFetchJobTimelineList);
  yield takeEvery(JOB_TIMELINE_COUNT, workFetchJobTimelineCount);
  yield takeEvery(TAG_JOB_ATTACHMENT, workTagJobAttachment);
}
