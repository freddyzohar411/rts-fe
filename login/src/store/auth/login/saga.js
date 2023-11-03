import {
  call,
  put,
  takeEvery,
  takeLatest,
  select,
  take,
} from "redux-saga/effects";
import { toast } from "react-toastify";
import { fetchProfile, profileSuccess } from "../profile/actions";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes";
import {
  apiError,
  loginSuccess,
  logoutUserSuccess,
  logoutUser as logout,
} from "./actions";
import { deleteProfile } from "../profile/actions";
import {
  getLogout,
  postLogin,
  getUserProfile,
} from "../../../helpers/backend_helper";

function getAllUserGroups(userProfile) {
  const userGroupList = [];
  if (userProfile?.userGroup) {
    userProfile.userGroup.forEach((group) => {
      userGroupList.push(group.groupName);
    });
  }
  return userGroupList;
}

function getAllRoles(userProfile) {
  const roleList = [];
  if (userProfile?.userGroup) {
    userProfile.userGroup.forEach((group) => {
      group.roles.forEach((role) => {
        roleList.push(role.roleName);
      });
    });
  }
  return roleList;
}

function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(postLogin, {
      username: user.username,
      password: user.password,
    });
    if (response) {
      yield put(loginSuccess(response));
      sessionStorage.setItem("authUser", JSON.stringify(response));

      // Check if user has any profile
      yield put(fetchProfile());
      yield take("PROFILE_SUCCESS");
      const userProfile = yield select((state) => state.Profile.userProfile);

      if (getAllRoles(userProfile).length === 0) {
        // yield put(logout(true));
        const logOutResponse = yield call(getLogout, {
          token: response.refresh_token,
        });
        if (logOutResponse) {
          sessionStorage.removeItem("authUser");
          yield put(deleteProfile());
          yield put(logoutUserSuccess(LOGOUT_USER, true));
          toast.error("User has no profile");
          return;
        }
      }

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
