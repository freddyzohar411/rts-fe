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

// Template
import { Reducers as TemplateReducers } from "@workspace/template";

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
  FormCommonReducer,
  EmailCommonReducer
} = Reducers;

const { Login, ForgetPassword, Profile } = LoginReducers;
const { DashboardEcommerce, JobsCount } = DashboardReducers;
const { AccountReducer, AccountRegistrationReducer, AccountFormReducer } =
  AccountReducers;

const { FormReducer } = FormBuilderReducers;

const { JobReducer, JobFormReducer, JobListReducer, JobStageReducer } =
  JobReducers;

const {
  UserReducer,
  RoleReducer,
  ModuleReducer,
  PermissionReducer,
  GroupReducer,
} = SettingReducers;

const { CandidateFormReducer, CandidateReducer, CandidateRegistrationReducer, CandidateMappingReducer } =
  CandidateReducers;

const { TemplateReducer } = TemplateReducers;

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
  FormCommonReducer,
  EmailCommonReducer,

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
  JobStageReducer,

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
  CandidateMappingReducer,
  
  // Template
  TemplateReducer,
});

export default rootReducer;
