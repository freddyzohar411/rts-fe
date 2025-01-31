import { takeEvery, fork, put, all, call } from "redux-saga/effects";

// Login Redux States
import {
  FORGET_PASSWORD,
  VALIDATE_RESET_TOKEN,
  FORGET_PASSWORD_RESET,
} from "./actionTypes";
import {
  userForgetPasswordSuccess,
  userForgetPasswordError,
  validateResetTokenSuccess,
  validateResetTokenError,
  forgetPasswordResetSuccess,
  forgetPasswordResetError,
} from "./actions";
import {
  getforgetPassword,
  getValidateResetToken,
  postForgetPasswordReset,
} from "../../../helpers/backend_helper";
import { toast } from "react-toastify";

//If user is send successfully send mail link then dispatch redux action's are directly from here.
function* forgetUser({ payload: { user, history } }) {
  try {
    const response = yield call(getforgetPassword, user.email);
    if (response) {
      yield put(
        userForgetPasswordSuccess(
          "Password reset link has been sent to your email."
        )
      );
    }
  } catch (error) {
    yield put(
      userForgetPasswordError(error?.message || "Something went wrong")
    );
  }
}

function* validateResetToken({ payload: { token, navigate } }) {
  try {
    const response = yield call(getValidateResetToken, token);
    if (response) {
      yield put(validateResetTokenSuccess(response));
    }
  } catch (error) {
    yield put(
      validateResetTokenError(error?.message || "Something went wrong")
    );
    toast.error(error?.message || "Something went wrong, Please try again");
    navigate("/login");
  }
}

function* forgetPasswordReset({ payload: data }) {
  try {
    yield call(postForgetPasswordReset, data);
    yield put(forgetPasswordResetSuccess("Password reset successfully"));
  } catch (error) {
    yield put(
      forgetPasswordResetError(error?.message || "Something went wrong")
    );
    toast.error(error?.message || "Something went wrong, Please try again");
  }
}

export function* watchUserPasswordForget() {
  yield takeEvery(FORGET_PASSWORD, forgetUser);
  yield takeEvery(VALIDATE_RESET_TOKEN, validateResetToken);
  yield takeEvery(FORGET_PASSWORD_RESET, forgetPasswordReset);
}

function* forgetPasswordSaga() {
  yield all([fork(watchUserPasswordForget)]);
}

export default forgetPasswordSaga;
