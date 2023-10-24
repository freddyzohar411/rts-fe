import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

//Layouts
import NonAuthLayout from "@workspace/common/src/Layouts/NonAuthLayout";
import VerticalLayout from "@workspace/common/src/Layouts/index";

//routes
import { authProtectedRoutes, publicRoutes } from "./allRoutes";
import { AuthProtected } from "./AuthProtected";
import PermissionProtected from "./PermissionProtected";

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
            {authProtectedRoutes.map((route, idx) => {
              if (route?.nested) {
                return (
                  <Route
                    path={route?.path}
                    element={
                      <AuthProtected>
                        <PermissionProtected
                          moduleName={route.moduleName}
                          requiredPermissions={route.requiredPermissions}
                        >
                          <VerticalLayout>{route.component}</VerticalLayout>
                        </PermissionProtected>
                      </AuthProtected>
                    }
                    key={idx}
                    exact={true}
                  >
                    {route.subroutes.map((route, idx) => (
                      <Route
                        path={route.path}
                        element={
                          <AuthProtected>{route.component}</AuthProtected>
                        }
                        key={idx}
                        exact={true}
                      />
                    ))}
                  </Route>
                );
              } else {
                return (
                  <Route
                    path={route.path}
                    element={
                      <AuthProtected>
                        <PermissionProtected
                          moduleName={route.moduleName}
                          requiredPermissions={route.requiredPermissions}
                        >
                          <VerticalLayout>{route.component}</VerticalLayout>
                        </PermissionProtected>
                      </AuthProtected>
                    }
                    key={idx}
                    exact={true}
                  />
                );
              }
            })}
          </Route>
        </Routes>
      </Router>
    </React.Fragment>
  );
};

export default Index;
