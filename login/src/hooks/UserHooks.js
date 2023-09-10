import { useEffect, useState } from "react";
import { Axios } from "@workspace/common";
import { getValidate } from "../helpers/backend_helper";

const useProfile = () => {
  const { getLoggedinUser } = Axios;

  const userProfileSession = Axios.getLoggedinUser();
  var token = userProfileSession && userProfileSession["token"];
  const [loading, setLoading] = useState(userProfileSession ? false : true);
  const [userProfile, setUserProfile] = useState(
    userProfileSession ? userProfileSession : null
  );

  useEffect(() => {
    const userProfileSession = getLoggedinUser();
    var token = userProfileSession && userProfileSession["token"];
    if (token) {
      getValidate({ token })
        .then((resp) => {
          if (resp?.active) {
            setUserProfile(userProfileSession ? userProfileSession : null);
            setLoading(token ? false : true);
          } else {
            token = null;
            setUserProfile(null);
            setLoading(false);
          }
        })
        .catch((e) => {
          token = null;
          setUserProfile(null);
          setLoading(false);
        });
    }
  }, []);

  return { userProfile, loading, token };
};

export { useProfile };
