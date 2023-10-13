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

const {
  Layout,
  CityReducer,
  CountryCurrencyReducer,
  DepartmentReducer,
  IndustryReducer,
  ParentCompanyReducer,
} = Reducers;
const { Login, ForgetPassword, Profile } = LoginReducers;
const { DashboardEcommerce } = DashboardReducers;
const {
  AccountReducer,
  AccountRegistrationReducer,
  BillingCityReducer,
  // CityReducer,
  // CountryCurrencyReducer,
  // DepartmentReducer,
  // IndustryReducer,
  // ParentCompanyReducer,
  AccountFormReducer,
} = AccountReducers;

const { FormReducer } = FormBuilderReducers;

const {
  JobCountryCurrencyReducer,
  JobAccountReducer,
  JobAccountContactsReducer,
  JobReducer,
} = JobReducers;

const rootReducer = combineReducers({
  // Common
  Layout,
  CityReducer,
  CountryCurrencyReducer,
  DepartmentReducer,
  IndustryReducer,
  ParentCompanyReducer,

  // public
  Login,
  ForgetPassword,
  Profile,
  DashboardEcommerce,

  // account
  AccountReducer,
  AccountRegistrationReducer,
  BillingCityReducer,
  // CityReducer,
  // CountryCurrencyReducer,
  // DepartmentReducer,
  // IndustryReducer,
  // ParentCompanyReducer,
  AccountFormReducer,

  // Job
  JobCountryCurrencyReducer,
  JobAccountReducer,
  JobAccountContactsReducer,
  JobReducer,

  // Form
  FormReducer,
});

export default rootReducer;
