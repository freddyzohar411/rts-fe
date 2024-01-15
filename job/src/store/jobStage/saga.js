import { call, put, takeEvery } from "redux-saga/effects";
import { toast } from "react-toastify";
import { TAG_JOB, TAG_JOB_ALL } from "./actionTypes";
import {
  tagJobSuccess,
  tagJobFailure,
  tagJobAllSuccess,
  tagJobAllFailure,
} from "./action";
import { tagAllJob, tagJob } from "../../helpers/backend_helper";

function* workTagJob(action) {
  const { payload, navigate } = action.payload;
  try {
    // Tag a job
    const response = yield call(tagJob, payload);
    yield put(tagJobSuccess(response.data));
    toast.success(response?.message);
    navigate(`/jobs/${payload?.jobId}/overview`);
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
    navigate(`/jobs/${payload?.jobId}/overview`);
  } catch (error) {
    toast.error(error?.message);
    yield put(tagJobAllFailure(error));
  }
}

export default function* watchTagJobSaga() {
  yield takeEvery(TAG_JOB, workTagJob);
  yield takeEvery(TAG_JOB_ALL, workTagAllJob);
}
