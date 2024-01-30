import { useEffect, useState } from "react";
import { Axios } from "@workspace/common";
import { getValidate } from "../helpers/backend_helper";
import { useNavigate } from "react-router-dom";

const useProfile = () => {
  const navigate = useNavigate();

  const userProfileSession = Axios.getLoggedinUser();
  const token = Axios.getToken();
  const [loading, setLoading] = useState(userProfileSession ? false : true);
  const [userProfile, setUserProfile] = useState(
    userProfileSession ? userProfileSession : null
  );

  useEffect(() => {
    const asyncCall = async () => {
      var token = await sessionStorage.getItem("accessToken");
      if (token) {
        getValidate({ token })
          .then((resp) => {
            if (resp?.active) {
              setUserProfile(userProfileSession ? userProfileSession : null);
              setLoading(token ? false : true);
            } else {
              navigate("/logout");
            }
          })
          .catch((e) => {
            navigate("/logout");
          });
      }
    };
    asyncCall();
  }, []);

  return { userProfile, loading, token };
};

export { useProfile };
