import { call, put, takeEvery, take } from "redux-saga/effects";
import { toast } from "react-toastify";
import { fetchProfile } from "../profile/actions";

// Login Redux States
import {
  LOGIN_RESET_PASSWORD_USER,
  LOGIN_USER,
  LOGOUT_USER,
  LOGIN_1FA,
  LOGIN_2FA,
} from "./actionTypes";
import {
  loginError,
  loginResetPasswordError,
  loginResetPasswordSuccess,
  loginSuccess,
  logoutUserError,
  logoutUserSuccess,
  login1FASuccess,
  login2FASuccess,
  login1FAError,
  login2FAError,
} from "./actions";
import { deleteProfile } from "../profile/actions";
import {
  getLogout,
  loginResetPwd,
  postLogin,
  postLogin1FA,
  postLogin2FA,
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

    // I need to add
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
    const authUser = JSON.parse(sessionStorage.getItem("authUser"));
    authUser.user["isTemp"] = false;
    yield sessionStorage.setItem("authUser", JSON.stringify(authUser));
    toast.success("Password has been reset successfully.");
    history("/dashboard");
  } catch (error) {
    yield put(loginResetPasswordError(error));
  }
}

function* login1FA({ payload: { userRequest1FA, navigate } }) {
  const devFlag = process.env.REACT_APP_DEV_FLAG;
  console.log("Dev Flag", devFlag);
  try {
    const hashedPassword = yield encode(userRequest1FA?.password);
    const response = yield call(postLogin1FA, {
      username: userRequest1FA?.username,
      password: hashedPassword,
    });
    yield put(login1FASuccess(response));

    const isTemp = response?.user?.isTemp;
    if (isTemp) {
      const { access_token, refresh_token } = response;
      sessionStorage.setItem("accessToken", access_token);
      sessionStorage.setItem("refreshToken", refresh_token);
      sessionStorage.setItem("authUser", JSON.stringify(response));
      // Check if user has any profile
      yield put(fetchProfile());
      yield take("PROFILE_SUCCESS");
      navigate("/reset-password");
      return;
    }
    if (devFlag === "true") {
      const { access_token, refresh_token } = response;
      sessionStorage.setItem("accessToken", access_token);
      sessionStorage.setItem("refreshToken", refresh_token);
      sessionStorage.setItem("authUser", JSON.stringify(response));
      // Check if user has any profile
      yield put(fetchProfile());
      yield take("PROFILE_SUCCESS");
      navigate("/dashboard");
      toast.success("Thanks for logging in.");
    } else {
      navigate("/login-otp", {
        state: {
          accessToken: response?.access_token,
          refreshToken: response?.refresh_token,
        },
      });
    }
  } catch (error) {
    if (error?.status === "UNAUTHORIZED") {
      toast.error(error?.message);
    } else {
      toast.error("Something went wrong, Please try again after some time.");
    }
    yield put(login1FAError(error));
  }
}

function* login2FA({ payload: { userRequest2FA, state, navigate } }) {
  try {
    const response = yield call(postLogin2FA, userRequest2FA, {
      headers: {
        Authorization: `Bearer ${state?.accessToken}`,
      },
    });

    console.log("Login 2FA Response", response);
    yield put(login2FASuccess(response));
    sessionStorage.setItem("accessToken", response?.access_token);
    sessionStorage.setItem("refreshToken", response?.refresh_token);
    sessionStorage.setItem("authUser", JSON.stringify(response));
    // Check if user has any profile
    yield put(fetchProfile());
    yield take("PROFILE_SUCCESS");
    const isTemp = response?.user?.isTemp;
    if (isTemp) {
      navigate("/reset-password");
    } else {
      navigate("/dashboard");
      toast.success("Thanks for logging in.");
    }
  } catch (error) {
    console.error("Login 2FA Error", error);
    if (error?.code === 401) {
      toast.error(error?.message);
      navigate("/login");
    } else {
      toast.error("Something went wrong, Please try again after some time.");
      navigate("/login");
    }
    yield put(login2FAError(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
  yield takeEvery(LOGIN_RESET_PASSWORD_USER, loginResetPassword);
  yield takeEvery(LOGIN_1FA, login1FA);
  yield takeEvery(LOGIN_2FA, login2FA);
}

export default authSaga;
