import react, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProfile } from "../store/auth/profile/actions";

const usePollingAuthHook = (intervalValue) => {
  const dispatch = useDispatch();

  useEffect(() => {
    setInterval(() => {
      dispatch(fetchProfile());
    }, intervalValue);
  }, []);
};

export { usePollingAuthHook };
