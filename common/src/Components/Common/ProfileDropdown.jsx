import React, { useState, useEffect } from "react";
import { useUserAuth } from "../../../../login/src/hooks/UserAuthHook";
import { useSelector } from "react-redux";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

//import images
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import { createSelector } from "reselect";

const ProfileDropdown = () => {
  const selectDashboardData = createSelector(
    (state) => state.Profile.user,
    (user) => user
  );

  const { userProfile } = useUserAuth();

  // Inside your component
  const user = useSelector(selectDashboardData);

  const [userName, setUserName] = useState("Admin");

  //Dropdown Toggle
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const toggleProfileDropdown = () => {
    setIsProfileDropdown(!isProfileDropdown);
  };
  return (
    <React.Fragment>
      <Dropdown
        isOpen={isProfileDropdown}
        toggle={toggleProfileDropdown}
        className="ms-sm-3 header-item topbar-user"
      >
        <DropdownToggle tag="button" type="button" className="btn">
          <span className="d-flex align-items-center">
            <span className="text-start">
              <span className="d-none d-xl-inline-block fw-medium user-name-text">
                {userProfile?.firstName} {userProfile?.lastName}
              </span>
            </span>
          </span>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <h6 className="dropdown-header">Welcome {userProfile?.firstName}!</h6>
          <DropdownItem href={process.env.PUBLIC_URL + "/profile"} hidden>
            <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
            <span className="align-middle">Profile</span>
          </DropdownItem>
          <div className="dropdown-divider"></div>
          <DropdownItem href={process.env.PUBLIC_URL + "/logout"}>
            <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle" data-key="t-logout">
              Logout
            </span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default ProfileDropdown;
