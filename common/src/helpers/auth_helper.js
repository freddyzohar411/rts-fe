const isUserLoggedIn = () => {
  return sessionStorage.getItem("authUser") ? true : false;
};

const getAuthUser = () => {
  return JSON.parse(sessionStorage.getItem("authUser"));
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
      action.every((item) => permissions[module].includes(item.toLowerCase()))
    );
  }
  return false;
};

const getRoles = () => {
  return JSON.parse(sessionStorage.getItem("roles"));
};

/**
 * This method take a role and check it against user
 * @param {*} role
 * @returns
 */
const checkRole = (roles) => {
  const userRoles = getRoles();
  if (roles) {
    return roles.some((role) => userRoles.includes(role));
  }
  return false;
};

const getUserDetails = () => {
  const authUser = getAuthUser();
  const permissions = getPermissions();
  const roles = getRoles();
  return {
    authUser,
    permissions,
    roles,
  };
};

export {
  isUserLoggedIn,
  getAuthUser,
  getPermissions,
  checkPermission,
  checkRole,
  getUserDetails,
};
