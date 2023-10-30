import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profilePermissionSuccess } from "../store/auth/profile/actions";
import { PermissionConstants } from "../constants/permissionConstant";
import { ModuleConstants } from "../constants/moduleConstant";

/**
 * Custom hook to get user permissions
 * @returns 
 */
const useUserAuth = () => {
  const dispatch = useDispatch();
  const userPermission = useSelector((state) => state.Profile.userPermission);

  /**
   * Get user permissions from session storage when component is mounted
   */
  useEffect(() => {
    try {
      const userPermissionSession = JSON.parse(
        sessionStorage.getItem("permissions")
      );
      if (userPermissionSession) {
        dispatch(profilePermissionSuccess(userPermissionSession));
      }
    } catch (error) {
      console.error("Error while parsing user permissions:", error);
    }
  }, []);

  /**
   * Check if user has all permissions. Usememo to improve performance
   */
  const checkAllPermission = useMemo(
    () => (module, action) => {
      if (userPermission) {
        return (
          userPermission[module] &&
          action.every((item) =>
            userPermission[module].includes(item.toLowerCase())
          )
        );
      }
      return false;
    },
    [userPermission]
  );

  /**
   * Check if user has any permissions. Usememo to improve performance
   */
  const checkAnyPermission = useMemo(
    () => (module, action) => {
      if (userPermission) {
        return (
          userPermission[module] &&
          action.some((item) =>
            userPermission[module].includes(item.toLowerCase())
          )
        );
      }
    },
    [userPermission]
  );

  // Check user group 


  // Check user role

  return {
    userPermission,
    checkAllPermission,
    checkAnyPermission,
    PermissionConstants,
    ModuleConstants,
  };
};

export { useUserAuth };
