import React, { useEffect } from "react";
import { Navigate, Route, useLocation, useNavigate } from "react-router-dom";
import { setAuthorization } from "@workspace/common/src/helpers/api_helper";
import { useDispatch } from "react-redux";

import { useProfile } from "@workspace/login";

import { Actions } from "@workspace/login";

const AuthProtected = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { userProfile, loading, token } = useProfile();
  const { logoutUser } = Actions;

  /**
   * @author Rahul Sahu
   * @description prevent user to access auth protected url before resetting the password after first login.
   */
  const bypassUrls = [
    "/login",
    "/reset-password",
    "/logout",
    "/forget-password",
  ];

  useEffect(() => {
    if (!bypassUrls.includes(location?.pathname)) {
      const authUser = JSON.parse(sessionStorage.getItem("authUser"));
      if (authUser) {
        const isTemp = authUser?.user?.isTemp;
        if (isTemp) {
          navigate("/reset-password");
        }
      }
    }
  }, [location]);

  useEffect(() => {
    if (userProfile && !loading && token) {
      setAuthorization(token);
    } else if (!userProfile && loading && !token) {
      dispatch(logoutUser());
    }
  }, [token, userProfile, loading, dispatch]);

  /*
    Navigate is un-auth access protected routes via url
    */

  if (!userProfile && loading && !token) {
    return (
      <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
    );
  }

  return <>{props.children}</>;
};

const AccessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <>
            <Component {...props} />{" "}
          </>
        );
      }}
    />
  );
};

export { AuthProtected, AccessRoute };
