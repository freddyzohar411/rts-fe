import jwtDecode from 'jwt-decode';

// Get Json web token from session storage
export const getJwtToken = () => {
  return sessionStorage.getItem("authUser")
    ? JSON.parse(sessionStorage.getItem("authUser")).access_token
    : null;
};

// Get information from the Json web token
export const getUserDetails = () => {
  const jwtToken = getJwtToken();
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
}


