import { combineReducers } from "redux";

// Common
import { Reducers } from "@workspace/common";

// Authentication
import { Reducers as LoginReducers } from "@workspace/login";

// Dashboard
import { Reducers as DashboardReducers } from "@workspace/dashboard";

// Account
import { Reducers as AccountReducers } from "@workspace/account";

// Job
import { Reducers as JobReducers } from "@workspace/job";

// Form
import { Reducers as FormBuilderReducers } from "@workspace/formbuilder";

// Settings
import { Reducers as SettingReducers } from "@workspace/settings";

// Candidate
import { Reducers as CandidateReducers } from "@workspace/candidate";

const {
  Layout,
  CityReducer,
  CountryCurrencyReducer,
  DepartmentReducer,
  IndustryReducer,
  ParentCompanyReducer,
  UserGroupReducer,
  AccountNamesReducer,
  AccountContactReducer,
} = Reducers;

const { Login, ForgetPassword, Profile } = LoginReducers;
const { DashboardEcommerce, JobsCount } = DashboardReducers;
const { AccountReducer, AccountRegistrationReducer, AccountFormReducer } =
  AccountReducers;

const { FormReducer } = FormBuilderReducers;

const { JobReducer, JobFormReducer, JobListReducer } = JobReducers;

const {
  UserReducer,
  RoleReducer,
  ModuleReducer,
  PermissionReducer,
  GroupReducer,
} = SettingReducers;

const { CandidateFormReducer, CandidateReducer, CandidateRegistrationReducer } =
  CandidateReducers;

const rootReducer = combineReducers({
  // Common
  Layout,
  CityReducer,
  CountryCurrencyReducer,
  DepartmentReducer,
  IndustryReducer,
  ParentCompanyReducer,
  UserGroupReducer,
  AccountNamesReducer,
  AccountContactReducer,

  // public
  Login,
  ForgetPassword,
  Profile,
  DashboardEcommerce,
  JobsCount,

  // account
  AccountReducer,
  AccountRegistrationReducer,
  AccountFormReducer,

  // Job
  JobReducer,
  JobFormReducer,
  JobListReducer,

  // Form
  FormReducer,

  // Settings
  UserReducer,
  RoleReducer,
  ModuleReducer,
  PermissionReducer,
  GroupReducer,

  //Candidate
  CandidateFormReducer,
  CandidateReducer,
  CandidateRegistrationReducer,
});

export default rootReducer;
