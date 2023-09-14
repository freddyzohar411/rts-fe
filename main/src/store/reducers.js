import { combineReducers } from "redux";

// Common
import { Reducers } from "@workspace/common";

// Authentication
import { Reducers as LoginReducers } from "@workspace/login";

// Dashboard
import { Reducers as DashboardReducers } from "@workspace/dashboard";

// Account
import { Reducers as AccountReducers } from "@workspace/account";

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
});

export default rootReducer;
