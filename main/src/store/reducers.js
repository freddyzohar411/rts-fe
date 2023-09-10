import { combineReducers } from "redux";

// Authentication
import { Reducers as Layout } from "@workspace/common";

import { Reducers as Login } from "@workspace/login";
// import ForgetPassword from "./auth/forgetpwd/reducer";

// import Profile from "./auth/profile/reducer";

const rootReducer = combineReducers({
  // public
  Login,
  // ForgetPassword,
  Layout,
  // Profile,
});

export default rootReducer;
