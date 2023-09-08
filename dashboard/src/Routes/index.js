import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

//Layouts
import NonAuthLayout from "../Layouts/NonAuthLayout";
import VerticalLayout from "../Layouts/index";

//routes
import { authProtectedRoutes, publicRoutes } from "./allRoutes";
import { AuthProtected } from "./AuthProtected";

const Index = () => {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route>
            {publicRoutes.map((route, idx) => (
              <Route
                path={route.path}
                element={<NonAuthLayout>{route.component}</NonAuthLayout>}
                key={idx}
                exact={true}
              />
            ))}
          </Route>

          <Route>
            {authProtectedRoutes.map((route, idx) => (
              <Route
                path={route.path}
                element={
                  <AuthProtected>
                    <VerticalLayout>{route.component}</VerticalLayout>
                  </AuthProtected>
                }
                key={idx}
                exact={true}
              />
            ))}
          </Route>
        </Routes>
      </Router>
    </React.Fragment>
  );
};

export default Index;
