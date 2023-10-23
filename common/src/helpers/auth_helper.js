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
/**
 * This method take a module and an array of action and check it against user
 * permission if user have all the required permission then it return true
 * @param {*} module 
 * @param {*} action 
 * @returns 
 */
const checkPermission = (module, action) => {
  // Action is an array of actions permission have to match with user permissions
  const permissions = getPermissions();
  if (permissions) {
    // return permissions[module] && permissions[module].includes(action);
    return (
      permissions[module] &&
      action.every((item) => permissions[module].includes(item))
    );
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
