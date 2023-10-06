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

const {
  LayoutSaga,
  CountryCurrencySaga,
  CitySaga,
  IndustrySaga,
  DepartmentSaga,
} = CommonSaga;
const { AuthSaga, ForgetSaga, ProfileSaga } = LoginSaga;
const { DashboardEcommerceSaga } = DashboardSaga;
const {
  // CountryCurrencySaga,
  // CitySaga,
  // IndustrySaga,
  ParentCompanySaga,
  AccountSaga,
  BillingCitySaga,
  AccountRegistrationSaga,
  // DepartmentSaga,
  AccountFormSaga,
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
    //Common
    fork(CountryCurrencySaga),
    fork(CitySaga),
    fork(IndustrySaga),
    fork(DepartmentSaga),
    fork(LayoutSaga),

    //public
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(DashboardEcommerceSaga),

    //Account
    // fork(CountryCurrencySaga),
    // fork(CitySaga),
    fork(IndustrySaga),
    fork(ParentCompanySaga),
    fork(AccountSaga),
    // fork(BillingCitySaga),
    fork(AccountRegistrationSaga),
    // fork(DepartmentSaga),
    fork(AccountFormSaga),

    //Job
    fork(JobCountryCurrencySaga),
    fork(JobAccountSaga),
    fork(JobAccountContactsSaga),
    fork(JobSaga),

    //Form
    fork(FormSaga),
  ]);
}
