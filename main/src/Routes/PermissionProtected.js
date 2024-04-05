import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "@workspace/login";

const PermissionProtected = ({ requiredPermissions = [], children }) => {
  const navigate = useNavigate();
  const { checkAllPermission } = useUserAuth();

  // Check if requiredPermissions is empty
  if (requiredPermissions.length === 0) {
    return children;
  } else {
    // Check if user has all permission
    const hasPermission = checkAllPermission(requiredPermissions);
    if (hasPermission) {
      return children;
    } else {
      navigate("/dashboard");
    }
  }
};

export default PermissionProtected;
