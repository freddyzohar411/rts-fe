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

// Settings
import { Reducers as UserReducers } from "@workspace/settings";

const { Layout } = Reducers;
const { Login, ForgetPassword, Profile } = LoginReducers;
const { DashboardEcommerce } = DashboardReducers;
const {
  AccountReducer,
  AccountRegistrationReducer,
  BillingCityReducer,
  CityReducer,
  CountryCurrencyReducer,
  DepartmentReducer,
  IndustryReducer,
  ParentCompanyReducer,
} = AccountReducers;

const {
  JobCountryCurrencyReducer,
  JobAccountReducer,
  JobAccountContactsReducer,
  JobReducer,
} = JobReducers;

const { UserReducer } = UserReducers;

const rootReducer = combineReducers({
  // public
  Login,
  ForgetPassword,
  Layout,
  Profile,
  DashboardEcommerce,

  // account
  AccountReducer,
  AccountRegistrationReducer,
  BillingCityReducer,
  CityReducer,
  CountryCurrencyReducer,
  DepartmentReducer,
  IndustryReducer,
  ParentCompanyReducer,

  // Job
  JobCountryCurrencyReducer,
  JobAccountReducer,
  JobAccountContactsReducer,
  JobReducer,

  // Settings
  UserReducers,
});

export default rootReducer;
