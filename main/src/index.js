import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";

import "@workspace/common/src/assets/scss/themes.scss";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "./store";

//imoprt Route
import Route from "./Routes";
import Error500 from "./component/Error500";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ErrorBoundary
    FallbackComponent={Error500}
    onReset={() => (window.location.href = "/dashboard")}
  >
    <Provider store={configureStore({})}>
      <React.Fragment>
        <Route />
      </React.Fragment>
    </Provider>
  </ErrorBoundary>
);

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
