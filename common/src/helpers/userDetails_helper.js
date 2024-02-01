import jwtDecode from "jwt-decode";
import { getToken } from "./api_helper";

// Get information from the Json web token
export const getUserDetails = () => {
  const jwtToken = getToken();
  if (!jwtToken) {
    return null;
  } else {
    return jwtDecode(jwtToken);
  }
};

export const getUserRoles = () => {
  const userDetails = getUserDetails();
  if (!userDetails) {
    return null;
  } else {
    return userDetails.realm_access.roles;
  }
};
