const isUserLoggedIn = () => {
  return sessionStorage.getItem("authUser") ? true : false;
};

const getAuthUser = () => {
  return JSON.parse(sessionStorage.getItem("authUser"));
};

const getAccessToken = () => {
  const authUser = getAuthUser();
  if (authUser) {
    return authUser.access_token;
  }
  return null;
};

const getPermissions = () => {
  return JSON.parse(sessionStorage.getItem("permissions"));
};

// const permissions = {
//     account: ['read', 'write', 'delete', 'edit'],
//     job: ['read', 'write', 'delete', 'edit'],
//     candidate: ['read', 'write', 'delete', 'edit'],
//   };
const checkPermission = (module, action) => {
  const permissions = getPermissions();
  if (permissions) {
    return permissions[module] && permissions[module].includes(action);
  }
  return false;
};

export {
  isUserLoggedIn,
  getAuthUser,
  getAccessToken,
  getPermissions,
  checkPermission,
};
