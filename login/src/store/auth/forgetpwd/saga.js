import { takeEvery, fork, put, all, call } from "redux-saga/effects";

// Login Redux States
import { FORGET_PASSWORD, VALIDATE_RESET_TOKEN } from "./actionTypes";
import { userForgetPasswordSuccess, userForgetPasswordError, validateResetTokenSuccess, validateResetTokenError } from "./actions";
import { getforgetPassword, getValidateResetToken } from "../../../helpers/backend_helper";
import { toast } from "react-toastify";

//If user is send successfully send mail link then dispatch redux action's are directly from here.
function* forgetUser({ payload: { user, history } }) {
  try {
    const response = yield call(getforgetPassword, user.email);
    if (response) {
      yield put(
        userForgetPasswordSuccess(
          "Reset link are sended to your mailbox, check there first"
        )
      );
    }
  } catch (error) {
    yield put(userForgetPasswordError(error?.message || "Something went wrong")); 
    console.log("error", error);
    
    toast.error(error?.message || "Something went wrong, Please try again");
  }
}

function* validateResetToken({ payload: { token, navigate } }) {
  try {
    const response = yield call(getValidateResetToken, token);
    if (response) {
      yield put(validateResetTokenSuccess(response));
    }
  } catch (error) {
    yield put(validateResetTokenError(error?.message || "Something went wrong"));
    toast.error(error?.message || "Something went wrong, Please try again");
    navigate("/login");
  }
}

export function* watchUserPasswordForget() {
  yield takeEvery(FORGET_PASSWORD, forgetUser);
  yield takeEvery(VALIDATE_RESET_TOKEN, validateResetToken);
}

function* forgetPasswordSaga() {
  yield all([fork(watchUserPasswordForget)]);
}

export default forgetPasswordSaga;
