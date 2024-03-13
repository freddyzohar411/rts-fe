import { all, fork } from "redux-saga/effects";

//layout
import { Sagas as CommonSaga } from "@workspace/common";

//Auth
import { Sagas as LoginSaga } from "@workspace/login";

//Dashboard
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

// Template
import { Sagas as TemplateSagas } from "@workspace/template";

const {
  LayoutSaga,
  CountryCurrencySaga,
  CitySaga,
  IndustrySaga,
  DepartmentSaga,
  ParentCompanySaga,
  UserGroupSaga,
  AccountNamesSaga,
  AccountContactSaga,
  FormCommonSaga,
  EmailCommonSaga,
} = CommonSaga;
const { AuthSaga, ForgetSaga, ProfileSaga } = LoginSaga;
const { DashboardEcommerceSaga, JobsCountSaga } = DashboardSaga;
const { AccountSaga, AccountRegistrationSaga, AccountFormSaga } = AccountSagas;

const { JobSaga, JobFormSaga, JobListSaga, JobStageSaga } = JobSagas;

const { FormSaga } = FormBuilderSagas;

const { UserSaga, RoleSaga, ModuleSaga, PermissionSaga, GroupSaga } =
  SettingSagas;

const { CandidateFormSaga, CandidateSaga, CandidateRegistrationSaga, CandidateMappingSaga } =
  CandidateSagas;

const { TemplateSaga } = TemplateSagas;

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
    fork(AccountNamesSaga),
    fork(AccountContactSaga),
    fork(FormCommonSaga),
    fork(EmailCommonSaga),

    //public
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(DashboardEcommerceSaga),
    fork(JobsCountSaga),

    //Account
    fork(IndustrySaga),
    fork(AccountSaga),
    fork(AccountRegistrationSaga),
    fork(AccountFormSaga),

    //Job
    fork(JobSaga),
    fork(JobFormSaga),
    fork(JobListSaga),
    fork(JobStageSaga),

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
    fork(CandidateMappingSaga),

    // Template 
    fork(TemplateSaga),
  ]);
}
