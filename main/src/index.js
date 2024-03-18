import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import { stopReportingRuntimeErrors } from "react-error-overlay";

import "@workspace/common/src/assets/scss/themes.scss";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "./store";

//imoprt Route
import Route from "./Routes";
import Error500 from "./component/Error500";

// if (process.env.NODE_ENV === "development") {
//   stopReportingRuntimeErrors(); // disables error overlays
// }

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
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
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
