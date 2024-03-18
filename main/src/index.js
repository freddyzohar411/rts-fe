import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "@workspace/common/src/assets/scss/themes.scss";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "./store";

//imoprt Route
import Route from "./Routes";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Provider store={configureStore({})}>
      <React.Fragment>
        <Route />
      </React.Fragment>
    </Provider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
