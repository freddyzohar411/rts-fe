import React from "react";
import { AuthHelper } from "@workspace/common";

const RolesPermissionsComponent = ({
  moduleName,
  requiredRoles = [],
  requiredPermissions = [],
  children,
}) => {
    
  // Check if user has all required roles
  const hasRequiredRoles = AuthHelper.checkRole(requiredRoles);

  // Check if user has all required permissions
  const hasRequiredPermissions = AuthHelper.checkPermission(
    moduleName,
    requiredPermissions
  );

  // Logic to hceck permission and roles
  if (requiredRoles.length === 0 && requiredPermissions.length === 0) {
    return children;
  } else if (hasRequiredRoles && hasRequiredPermissions && requiredRoles.length > 0 && requiredPermissions.length > 0 ) {
    return children; // Render the component if user has both required roles and permissions
  } else if (hasRequiredRoles && requiredPermissions.length === 0) {
    return children;
  } else if (hasRequiredPermissions && requiredRoles.length === 0) {
    return children;
  } else {
    return <div>Access Denied</div>; // Render an access denied message if checks fail
  }

};

export default RolesPermissionsComponent;
