import { all, fork } from "redux-saga/effects";

//layout
import { Saga as CommonSaga } from "@workspace/common";

//Auth
import { Saga as LoginSaga } from "@workspace/login";

const { LayoutSaga } = CommonSaga;
const { AuthSaga, ForgetSaga, ProfileSaga } = LoginSaga;

export default function* rootSaga() {
  yield all([
    //public
    fork(LayoutSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
  ]);
}
