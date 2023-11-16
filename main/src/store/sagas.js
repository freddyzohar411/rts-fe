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
import { Sagas as FormBuilderSagas } from "@workspace/formbuilder";

// Settings
import { Sagas as SettingSagas } from "@workspace/settings";

// Candidate
import { Sagas as CandidateSagas } from "@workspace/candidate";

const {
  LayoutSaga,
  CountryCurrencySaga,
  CitySaga,
  IndustrySaga,
  DepartmentSaga,
  ParentCompanySaga,
  UserGroupSaga,
} = CommonSaga;
const { AuthSaga, ForgetSaga, ProfileSaga } = LoginSaga;
const { DashboardEcommerceSaga } = DashboardSaga;
const { AccountSaga, AccountRegistrationSaga, AccountFormSaga } = AccountSagas;

const {
  JobCountryCurrencySaga,
  JobAccountSaga,
  JobAccountContactsSaga,
  JobSaga,
} = JobSagas;

const { FormSaga } = FormBuilderSagas;

const { UserSaga, RoleSaga, ModuleSaga, PermissionSaga, GroupSaga } =
  SettingSagas;

const { CandidateFormSaga, CandidateSaga, CandidateRegistrationSaga } =
  CandidateSagas;

export default function* rootSaga() {
  yield all([
    //Common
    fork(CountryCurrencySaga),
    fork(CitySaga),
    fork(IndustrySaga),
    fork(DepartmentSaga),
    fork(LayoutSaga),
    fork(ParentCompanySaga),
    fork(UserGroupSaga),

    //public
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(DashboardEcommerceSaga),

    //Account
    fork(IndustrySaga),
    fork(AccountSaga),
    fork(AccountRegistrationSaga),
    fork(AccountFormSaga),

    //Job
    fork(JobCountryCurrencySaga),
    fork(JobAccountSaga),
    fork(JobAccountContactsSaga),
    fork(JobSaga),

    //Form
    fork(FormSaga),

    //Settings
    fork(UserSaga),
    fork(RoleSaga),
    fork(ModuleSaga),
    fork(PermissionSaga),
    fork(GroupSaga),

    // Candidate
    fork(CandidateFormSaga),
    fork(CandidateSaga),
    fork(CandidateRegistrationSaga),
  ]);
}
