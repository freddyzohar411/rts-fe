import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { setAuthorization } from "@workspace/common/src/helpers/api_helper";
import { useDispatch } from "react-redux";

import { useProfile } from "@workspace/common";

import { logoutUser } from "../store/actions";

import { api } from "@workspace/common/src/config";

const AuthProtected = (props) => {
  const dispatch = useDispatch();
  const { userProfile, loading, token } = useProfile();
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
    //window.location.replace(api.LOGIN_MS_URL);
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
