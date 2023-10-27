import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profilePermissionSuccess } from "../store/auth/profile/actions";
import { PermissionConstants } from "../constants/permissionConstant";
import { ModuleContants } from "../constants/moduleConstant";

const useUserPermission = () => {
  const dispatch = useDispatch();
  const userPermission = useSelector((state) => state.Profile.userPermission);

  useEffect(() => {
    const userPermissionSession = JSON.parse(
      sessionStorage.getItem("permissions")
    );
    dispatch(profilePermissionSuccess(userPermissionSession));
  }, []);

  const checkAllPermission = (module, action) => {
    // Action is an array of actions permission have to match with user permissions
    if (userPermission) {
      return (
        userPermission[module] &&
        action.every((item) => userPermission[module].includes(item.toLowerCase()))
      );
    }
    return false;
  };

  const checkAnyPermission = (module, action) => {
    // Action is an array of actions permission have to match with user permissions
    if (userPermission) {
      return (
        userPermission[module] &&
        action.some((item) => userPermission[module].includes(item.toLowerCase()))
      );
    }
    return false;
  }

  return { userPermission, checkAllPermission, checkAnyPermission, PermissionConstants, ModuleContants };
};

export { useUserPermission };
