import { all, fork } from "redux-saga/effects";

//layout
import { Sagas as CommonSaga } from "@workspace/common";

//Auth
import { Sagas as LoginSaga } from "@workspace/login";

//Auth
import { Sagas as DashboardSaga } from "@workspace/dashboard";

const { LayoutSaga } = CommonSaga;
const { AuthSaga, ForgetSaga, ProfileSaga } = LoginSaga;
const { DashboardEcommerceSaga } = DashboardSaga;

export default function* rootSaga() {
  yield all([
    //public
    fork(LayoutSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(DashboardEcommerceSaga),
  ]);
}
