import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";

function CustomViewButton() {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  return (
    <div>
      <Dropdown
        isOpen={dropDownOpen}
        toggle={() => setDropDownOpen(!dropDownOpen)}
      >
        <DropdownToggle caret className="btn btn-custom-primary d-flex flex-row">
          <i className="ri-settings-3-fill me-2"></i>
          <span>Custom View</span>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>New Custom View</DropdownItem>
          <Link to="/custom-view">
            <DropdownItem>Create Custom View</DropdownItem>
          </Link>
          <DropdownItem divider />
          <DropdownItem header>My Custom Views</DropdownItem>
          <DropdownItem disabled>Custom View 1</DropdownItem>
          <DropdownItem>Custom View 2</DropdownItem>
          <DropdownItem>Custom View 3</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default CustomViewButton;
