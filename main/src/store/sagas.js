import { all, fork } from "redux-saga/effects";

//layout
import { Saga as LayoutSaga } from "@workspace/common";

//Auth
import { Saga as AuthSaga } from "@workspace/login";
// import ForgetSaga from "./auth/forgetpwd/saga";
// import ProfileSaga from "./auth/profile/saga";

export default function* rootSaga() {
  yield all([
    //public
    fork(LayoutSaga),
    fork(AuthSaga),
    // fork(ForgetSaga),
    // fork(ProfileSaga),
  ]);
}
