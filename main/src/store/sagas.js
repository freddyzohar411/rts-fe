import { all, fork } from "redux-saga/effects";

//layout
import { Sagas as CommonSaga } from "@workspace/common";

//Auth
import { Sagas as LoginSaga } from "@workspace/login";

//Auth
import { Sagas as DashboardSaga } from "@workspace/dashboard";

//Account
import { Sagas as AccountSagas } from "@workspace/account";

//Job
import { Sagas as JobSagas } from "@workspace/job";

//Settings
// import { Sagas as SettingsSagas } from "@workspace/settings";
import { Sagas as FormBuilderSagas } from "@workspace/formbuilder";

const { LayoutSaga } = CommonSaga;
const { AuthSaga, ForgetSaga, ProfileSaga } = LoginSaga;
const { DashboardEcommerceSaga } = DashboardSaga;
const {
  CountryCurrencySaga,
  CitySaga,
  IndustrySaga,
  ParentCompanySaga,
  AccountSaga,
  BillingCitySaga,
  AccountRegistrationSaga,
  DepartmentSaga,
} = AccountSagas;

const {
  JobCountryCurrencySaga,
  JobAccountSaga,
  JobAccountContactsSaga,
  JobSaga,
} = JobSagas;

const { FormSaga } = FormBuilderSagas;

export default function* rootSaga() {
  yield all([
    //public
    fork(LayoutSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(DashboardEcommerceSaga),

    //Account
    fork(CountryCurrencySaga),
    fork(CitySaga),
    fork(IndustrySaga),
    fork(ParentCompanySaga),
    fork(AccountSaga),
    fork(BillingCitySaga),
    fork(AccountRegistrationSaga),
    fork(DepartmentSaga),

    //Job
    fork(JobCountryCurrencySaga),
    fork(JobAccountSaga),
    fork(JobAccountContactsSaga),
    fork(JobSaga),

    //Form
    fork(FormSaga),
  ]);
}
