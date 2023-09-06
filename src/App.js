import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

//import Scss
import "./assets/scss/themes.scss";

import { configureStore } from "./store";

//imoprt Route
import Route from "./Routes";

function App() {
  return (
    <Provider store={configureStore({})}>
      <React.Fragment>
        <Route />
      </React.Fragment>
    </Provider>
  );
}

export default App;
