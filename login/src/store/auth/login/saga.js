import { call, put, takeEvery, take } from "redux-saga/effects";
import { toast } from "react-toastify";
import bcrypt from "bcryptjs-react";
import { fetchProfile } from "../profile/actions";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess } from "./actions";
import { deleteProfile } from "../profile/actions";
import { getLogout, postLogin } from "../../../helpers/backend_helper";

function* loginUser({ payload: { user, history } }) {
  try {
    const saltRounds = 10;
    const hashedPassword = yield bcrypt.hash(user.password, saltRounds);
    const response = yield call(postLogin, {
      username: user.username,
      password: user.password,
    });
    if (response) {
      yield put(loginSuccess(response));
      const { access_token, refresh_token } = response;
      sessionStorage.setItem("accessToken", access_token);
      sessionStorage.setItem("refreshToken", refresh_token);
      sessionStorage.setItem("authUser", JSON.stringify(response));
      // Check if user has any profile
      yield put(fetchProfile());
      yield take("PROFILE_SUCCESS");
      history("/dashboard");
      toast.success("Thanks for logging in.");
    } else {
      yield put(apiError(response));
    }
  } catch (error) {
    if (error?.status === "UNAUTHORIZED") {
      toast.error(error?.message);
    } else {
      toast.error("Something went wrong, Please try again after some time.");
    }
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
      yield put(deleteProfile());
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
