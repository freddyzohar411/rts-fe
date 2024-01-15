import { call, put, takeEvery } from "redux-saga/effects";
import { toast } from "react-toastify";
import { TAG_JOB } from "./actionTypes";
import { tagJobSuccess, tagJobFailure } from "./action";
import { tagJob } from "../../helpers/backend_helper";

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

export default function* watchTagJobSaga() {
  yield takeEvery(TAG_JOB, workTagJob);
}
