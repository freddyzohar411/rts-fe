import { combineReducers } from "redux";

// Common
import { Reducers } from "@workspace/common";

// Authentication
import { Reducers as LoginReducers } from "@workspace/login";

const { Layout } = Reducers;
const { Login, ForgetPassword, Profile } = LoginReducers;

const rootReducer = combineReducers({
  // public
  Login,
  ForgetPassword,
  Layout,
  Profile,
});

export default rootReducer;
