import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess } from "./actions";
import { deleteProfile } from "../profile/actions";
import { getLogout, postLogin, getUserProfile } from "../../../helpers/backend_helper";

function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(postLogin, {
      username: user.username,
      password: user.password,
    });
    if (response) {
      yield put(loginSuccess(response));
      sessionStorage.setItem("authUser", JSON.stringify(response));
      history("/dashboard");
      toast.success("Login Successfully");
    } else {
      yield put(apiError(response));
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    const user = JSON.parse(sessionStorage.getItem("authUser"));
    const response = yield call(getLogout, {
      token: user.refresh_token,
    });
    if (response) {
      sessionStorage.removeItem("authUser");
      yield put(deleteProfile())
      yield put(logoutUserSuccess(LOGOUT_USER, true));
      toast.success("Logout Successfully");
    }
  } catch (error) {
    yield put(apiError(LOGOUT_USER, error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
