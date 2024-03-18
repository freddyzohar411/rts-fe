import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "@workspace/login";

const PermissionProtected = ({ requiredPermissions = [], children }) => {
  const navigate = useNavigate();
  const { checkAllPermission } = useUserAuth();

  useEffect(() => {
    navigate("/dashboard");
  }, []);

  // Check if requiredPermissions is empty
  if (requiredPermissions.length === 0) {
    return children;
  } else {
    // Check if user has all permission
    const hasPermission = checkAllPermission(requiredPermissions);
    if (hasPermission) {
      return children;
    }
  }
};

export default PermissionProtected;
