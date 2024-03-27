import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";

function CustomViewButton({ initialOptions, optGroup }) {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dataTest = { name: "Jane Doe", age: 50 };
  console.log("DataTest", dataTest);

  const handleNavigate = () => {
    history.push({
      pathname: "/custom-view",
      state: dataTest,
    });
  };
  return (
    <div>
      <Dropdown
        isOpen={dropDownOpen}
        toggle={() => setDropDownOpen(!dropDownOpen)}
      >
        <DropdownToggle caret>Custom View</DropdownToggle>
        <DropdownMenu>
          <Link to={{pathname: "/custom-view", optGroup: optGroup}}>
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
