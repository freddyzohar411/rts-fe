import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

import { CREATE_CUSTOM_VIEW, FETCH_JOB_CUSTOM_VIEW } from "./actionTypes";
import {
  createCustomViewSuccess,
  createCustomViewFailure,
} from "../accountcustomview/action";
import { createCustomView } from "../../helpers/backend_helper";

function* workCreateJobCustomView(action) {
  const { payload } = action.payload;
  try {
    const customViewResponse = yield call(createCustomView, payload);
    yield put(createCustomViewSuccess(customViewResponse));
    toast.success(customViewResponse?.message);
  } catch (error) {
    yield put(createCustomViewFailure(error));
    toast.error(customViewResponse?.message);
  }
}

export default function* watchFetchJobCustomViewSaga() {
  yield takeEvery(CREATE_CUSTOM_VIEW, workCreateJobCustomView);
}
