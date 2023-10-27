import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserPermission } from "@workspace/login";

const PermissionProtected = ({
  moduleName,
  requiredPermissions = [],
  children,
}) => {
  const navigate = useNavigate();
  const { checkAllPermission, checkAnyPermission } = useUserPermission();
  // Check if requiredPermissions is empty
  if (requiredPermissions.length === 0) {
    return children;
  } else {
    // Check if user has all permission
    const hasPermission = checkAllPermission(moduleName, requiredPermissions);

    if (hasPermission) {
      return children;
    }
  }
  return navigate("/dashboard");
};

export default PermissionProtected;
