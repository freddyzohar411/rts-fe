import { combineReducers } from "redux";

// Front
import Layout from "./layouts/reducer";

// Authentication
import Login from "./auth/login/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";

import Profile from "./auth/profile/reducer";

const rootReducer = combineReducers({
  // public
  Login,
  ForgetPassword,
  Layout,
  Profile,
});

export default rootReducer;
