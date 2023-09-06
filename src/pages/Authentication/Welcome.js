import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";

import { logoutUser } from "../../store/actions";

//redux
import withRouter from "../../Components/Common/withRouter";
import Loader from "../../Components/Common/Loader";

const Welcome = (props) => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const refresh_token = searchParams.get("refresh_token");
    const asyncCall = async () => {
      if (token && refresh_token) {
        const authUser = { token, refresh_token };
        await sessionStorage.setItem("authUser", JSON.stringify(authUser));
        props?.router?.navigate("/dashboard");
      }
    };
    asyncCall();
  }, [searchParams]);

  return <Loader />;
};

Welcome.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Welcome);
