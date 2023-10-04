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
// import { Reducers as SettingsReducers } from "@workspace/settings";
import { Reducers as FormBuilderReducers } from "@workspace/formbuilder";

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

const { FormReducer } = FormBuilderReducers;

const {
  JobCountryCurrencyReducer,
  JobAccountReducer,
  JobAccountContactsReducer,
  JobReducer,
} = JobReducers;

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

  // Form
  FormReducer
});

export default rootReducer;
