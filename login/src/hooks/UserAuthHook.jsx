import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profilePermissionSuccess } from "../store/auth/profile/actions";
import { Permission } from "../constants/permissionConstant";
import { ModuleConstants } from "../constants/moduleConstant";
import { fetchProfile } from "../store/auth/profile/actions";

/**
 * Custom hook to get user permissions
 * @returns
 */
const useUserAuth = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.Profile.userProfile);

  console.log("User Profile: ", userProfile);

  /**
   * Get user permissions from session storage when component is mounted
   */
  useEffect(() => {
    try {
      if (!userProfile) {
        console.log("Fetching user profile");
        dispatch(fetchProfile());
      }
    } catch (error) {
      console.error("Error while parsing user permissions:", error);
    }
  }, []);

  // ------------------ Get & Check UserGroup ------------------
  function getAllUserGroups() {
    const userGroupList = [];
    if (userProfile?.userGroup) {
      userProfile.userGroup.forEach((group) => {
        userGroupList.push(group.groupName);
      });
    }
    return userGroupList;
  }

  // console.log("User Group List: ", getUserGroupList());

  function checkAllUserGroup(userGroupList = []) {
    const userGroups = getAllUserGroups();
    for (const userGroupItem of userGroupList) {
      if (!userGroups.includes(userGroupItem)) {
        return false;
      }
    }
    return true;
  }

  function checkAnyUserGroup(userGroupList = []) {
    const userGroups = getUserGroupList();
    for (const userGroupItem of userGroupList) {
      if (userGroups.includes(userGroupItem)) {
        return true;
      }
    }
    return false;
  }

  // console.log("Check All User Group: ", checkAllUserGroup(["Admin", "User"]));


  // ------------------ Get & Check Role ------------------
  function getAllRoles() {
    const roleList = [];
    if (userProfile?.userGroup) {
      userProfile.userGroup.forEach((group) => {
        group.roles.forEach((role) => {
          roleList.push(role.roleName);
        });
      });
    }
    return roleList;
  }

  function checkAllRole(roleList = []) {
    const roles = getAllRoles();
    for (const roleItem of roleList) {
      if (!roles.includes(roleItem)) {
        return false;
      }
    }
    return true;
  }

  function checkAnyRole(roleList = []) {
    const roles = getAllRoles();
    for (const roleItem of roleList) {
      if (roles.includes(roleItem)) {
        return true;
      }
    }
    return false;
  }


  // ------------------ Get & Check permission ------------------

  /**
   * Convert user profile to permission object
   * @param {*} userProfile
   * @returns
   */
  const convertUserProfileToPermissionObj = (userProfile) => {
    const modulePermissions = {};
    if (userProfile?.userGroup) {
      console.log("INNN");
      userProfile.userGroup.forEach((group) => {
        group.roles.forEach((role) => {
          role.modules.forEach((module) => {
            const moduleName = module.moduleName;
            const permissions = module.permissions;
            modulePermissions[moduleName] = new Set([
              ...(modulePermissions[moduleName] || []), // Add existing permissions if any
              ...permissions,
            ]);
          });
        });
      });
      // convert to normal object
      Object.keys(modulePermissions).forEach((key) => {
        modulePermissions[key] = Array.from(modulePermissions[key]);
      });
      return modulePermissions;
    } else {
      return null;
    }
  };

  /**
   * Check if user has all permissions
   * @param {*} modulePermissions 
   * @returns 
   */
  function checkAllPermission(modulePermissions = []) {
    const userPermission = convertUserProfileToPermissionObj(userProfile);
    for (const modulePermission of modulePermissions) {
      if (!checkSinglePermission(userPermission, modulePermission)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Helper function to check if user has a single permission
   * @param {*} userPermission 
   * @param {*} modulePermission 
   * @returns 
   */
  function checkSinglePermission(userPermission, modulePermission) {
    const [module, permission] = modulePermission.split(":");
    if (
      userPermission?.[module] &&
      userPermission?.[module].includes(permission)
    ) {
      return true;
    }
    return false;
  }

    console.log(
    "Module Permission: ",
    convertUserProfileToPermissionObj(userProfile)
  );

  // console.log(
  //   "Check Permission: ",
  //   checkAllPermission([
  //     Permission.ACCOUNT_READ,
  //     Permission.ACCOUNT_WRITE,
  //     // Permission.ACCOUNT_NOACCESS,
  //   ])
  // );


  //   () => (module, action) => {
  //     if (userPermission) {
  //       return (
  //         userPermission[module] &&
  //         action.some((item) =>
  //           userPermission[module].includes(item.toLowerCase())
  //         )
  //       );
  //     }
  //   },
  //   [userProfile]
  // );

  // Check user group

  // Check user role

  return {
    getAllRoles,
    getAllUserGroups,
    checkAllPermission,
    checkAllUserGroup,
    checkAnyUserGroup,
    checkAllRole,
    checkAnyRole,
    Permission,
  };
};

export { useUserAuth };
