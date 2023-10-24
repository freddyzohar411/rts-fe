import React from "react";
import { AuthHelper } from "@workspace/common";
import { useNavigate } from "react-router-dom";

const PermissionProtected = ({
  moduleName,
  requiredPermissions = [],
  children,
}) => {
  const navigate = useNavigate();
  // Check if requiredPermissions is empty
  if (requiredPermissions.length === 0) {
    return children;
  } else {
    // Check if user has permission
    const hasPermission = AuthHelper.checkPermission(
      moduleName,
      requiredPermissions
    );
    if (hasPermission) {
      return children;
    }
  }

  return navigate("/dashboard");
};

export default PermissionProtected;
