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
const { DashboardEcommerce } = DashboardReducers;
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
});

export default rootReducer;
