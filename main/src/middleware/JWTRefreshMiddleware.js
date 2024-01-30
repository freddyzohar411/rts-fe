import { jwtDecode } from "jwt-decode";
import moment from "moment";
import { toast } from "react-toastify";
import { refreshToken } from "@workspace/common/src/helpers/api_helper";

const JWTRefreshMiddleware = ({ dispatch, getState }) => {
  return (next) => async (action) => {
    try {
      if (
        action?.type !== "LOGIN_USER" &&
        action?.type !== "LOGOUT_USER" &&
        !action?.type?.toLowerCase()?.includes("error") &&
        !action?.type?.toLowerCase()?.includes("fail") &&
        !action?.type?.toLowerCase()?.includes("logout")
      ) {
        const access_token = await sessionStorage.getItem("accessToken");
        if (access_token) {
          const decoded = jwtDecode(access_token);
          if (decoded.exp && decoded.exp - moment().unix() < 10) {
            refreshToken()
              .then(async (refreshTokenResponse) => {
                const { access_token, refresh_token } = refreshTokenResponse;
                await sessionStorage.setItem("accessToken", access_token);
                await sessionStorage.setItem("refreshToken", refresh_token);
                return dispatch(action);
              })
              .catch((error) => {
                toast.error("Your session has been expired.");
                sessionStorage.removeItem("accessToken");
                sessionStorage.removeItem("refreshToken");
                return window.location.replace("/login");
              });
          }
        }
      }
    } catch (e) {}
    return next(action);
  };
};

export default JWTRefreshMiddleware;
