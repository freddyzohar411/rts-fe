import { combineReducers } from "redux";

// Common
import { Reducers } from "@workspace/common";

// Authentication
import { Reducers as LoginReducers } from "@workspace/login";

// Dashboard
import { Reducers as DashboardReducers } from "@workspace/dashboard";

const { Layout } = Reducers;
const { Login, ForgetPassword, Profile } = LoginReducers;
const { DashboardEcommerce } = DashboardReducers;

const rootReducer = combineReducers({
  // public
  Login,
  ForgetPassword,
  Layout,
  Profile,
  DashboardEcommerce,
});

export default rootReducer;
