import { call, put, takeEvery } from "redux-saga/effects";
import { toast } from "react-toastify";
import {
  FETCH_JOB_TIMELINE_LIST,
  JOB_TIMELINE_COUNT,
  TAG_JOB,
  TAG_JOB_ALL,
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
} from "./action";
import {
  getJobTimeline,
  getJobTimelineCount,
  tagAllJob,
  tagJob,
} from "../../helpers/backend_helper";

function* workTagJob(action) {
  const { payload, navigate } = action.payload;
  try {
    // Tag a job
    const response = yield call(tagJob, payload);
    yield put(tagJobSuccess(response.data));
    if (payload?.jobType) {
      if (payload?.jobType === "associate_candidate") {
        toast.success("Job has been associated successfully.");
      }
    } else {
      toast.success(response?.message);
      navigate(`/jobs/${payload?.jobId}/overview`);
    }
  } catch (error) {
    toast.error(error?.message);
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
    toast.error(error?.message);
    yield put(tagJobAllFailure(error));
  }
}

// Fetch job timeline listing
function* workFetchJobTimelineList(action) {
  try {
    const response = yield call(getJobTimeline, action.payload);
    yield put(fetchJobTimelineListSuccess(response.data));
  } catch (error) {
    toast.error("Error: fetching job timeline");
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
    toast.error("Error: fetching job timeline count");
    yield put(fetchJobtimeineCountFailure(error));
  }
}

export default function* watchTagJobSaga() {
  yield takeEvery(TAG_JOB, workTagJob);
  yield takeEvery(TAG_JOB_ALL, workTagAllJob);
  yield takeEvery(FETCH_JOB_TIMELINE_LIST, workFetchJobTimelineList);
  yield takeEvery(JOB_TIMELINE_COUNT, workFetchJobTimelineCount);
}
