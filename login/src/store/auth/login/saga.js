import { call, put, takeEvery, take } from "redux-saga/effects";
import { toast } from "react-toastify";
import { fetchProfile } from "../profile/actions";

// Login Redux States
import {
  LOGIN_RESET_PASSWORD_USER,
  LOGIN_USER,
  LOGOUT_USER,
} from "./actionTypes";
import {
  loginError,
  loginResetPasswordError,
  loginResetPasswordSuccess,
  loginSuccess,
  logoutUserError,
  logoutUserSuccess,
} from "./actions";
import { deleteProfile } from "../profile/actions";
import {
  getLogout,
  loginResetPwd,
  postLogin,
} from "../../../helpers/backend_helper";
import { encode } from "@workspace/common/src/helpers/string_helper";

function* loginUser({ payload: { user, history } }) {
  try {
    const hashedPassword = yield encode(user.password);
    const response = yield call(postLogin, {
      username: user.username,
      password: hashedPassword,
    });
    yield put(loginSuccess(response));
    const { access_token, refresh_token } = response;
    sessionStorage.setItem("accessToken", access_token);
    sessionStorage.setItem("refreshToken", refresh_token);
    sessionStorage.setItem("authUser", JSON.stringify(response));
    // Check if user has any profile
    yield put(fetchProfile());
    yield take("PROFILE_SUCCESS");
    const isTemp = response?.user?.isTemp;
    if (isTemp) {
      history("/reset-password");
    } else {
      history("/dashboard");
      toast.success("Thanks for logging in.");
    }
  } catch (error) {
    if (error?.status === "UNAUTHORIZED") {
      toast.error(error?.message);
    } else {
      toast.error("Something went wrong, Please try again after some time.");
    }
    yield put(loginError(error));
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    const refreshToken = sessionStorage.getItem("refreshToken");
    const response = yield call(getLogout, {
      token: refreshToken,
    });
    if (response) {
      sessionStorage.removeItem("authUser");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      yield put(deleteProfile());
      yield put(logoutUserSuccess(LOGOUT_USER, true));
      toast.success("Logout Successfully");
    }
  } catch (error) {
    yield put(logoutUserError(LOGOUT_USER, error));
    return window.location.replace("/login");
  }
}

function* loginResetPassword({ payload: { user, history } }) {
  try {
    const response = yield call(loginResetPwd, user);
    yield put(loginResetPasswordSuccess(response));
    toast.success("Password has been reset successfully.");
    history("/dashboard");
  } catch (error) {
    yield put(loginResetPasswordError(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
  yield takeEvery(LOGIN_RESET_PASSWORD_USER, loginResetPassword);
}

export default authSaga;
