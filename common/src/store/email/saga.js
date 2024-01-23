import { call, put, takeEvery } from "redux-saga/effects";
import { SEND_EMAIL } from "./actionTypes";
import { sendEmailSuccess, sendEmailFailure } from "./action";
import { sendEmail } from "../../helpers/backend_helper";
import { toast } from "react-toastify";

function* workSendEmail(action) {
  const { newFormData, config} = action.payload;
  try {
    const response = yield call(sendEmail, newFormData, config);
    yield put(sendEmailSuccess(response.data));
    toast.success("Email sent successfully");
  } catch (error) {
    yield put(sendEmailFailure(error));
    toast.error("Email sent failed");
  }
}

export default function* workEmailCommonSaga() {
  yield takeEvery(SEND_EMAIL, workSendEmail);
}
