import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess } from "./actions";
import { getLogout, postLogin } from "../../../helpers/backend_helper";

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
      yield put(logoutUserSuccess(LOGOUT_USER, true));
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
