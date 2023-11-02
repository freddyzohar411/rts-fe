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
  UserGroupReducer
} = Reducers;

const { Login, ForgetPassword, Profile } = LoginReducers;
const { DashboardEcommerce } = DashboardReducers;
const { AccountReducer, AccountRegistrationReducer, AccountFormReducer } =
  AccountReducers;

const { FormReducer } = FormBuilderReducers;

const {
  JobCountryCurrencyReducer,
  JobAccountReducer,
  JobAccountContactsReducer,
  JobReducer,
} = JobReducers;

const { UserReducer, RoleReducer, ModuleReducer, PermissionReducer } =
  SettingReducers;

const rootReducer = combineReducers({
  // Common
  Layout,
  CityReducer,
  CountryCurrencyReducer,
  DepartmentReducer,
  IndustryReducer,
  ParentCompanyReducer,
  UserGroupReducer,

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
  JobCountryCurrencyReducer,
  JobAccountReducer,
  JobAccountContactsReducer,
  JobReducer,

  // Form
  FormReducer,

  // Settings
  UserReducer,
  RoleReducer,
  ModuleReducer,
  PermissionReducer,
});

export default rootReducer;
