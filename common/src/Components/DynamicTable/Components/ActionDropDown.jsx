import React, { useState, useEffect } from "react";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import Portal from "./Portal";

const ActionDropDown = ({
  dropDownIcon,
  children,
  caret = false,
  width,
  portal = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // If there is a scroll, close the drop down
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("scroll", handleScroll, true);
    } else {
      window.removeEventListener("scroll", handleScroll, true);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [isOpen]);

  return (
    <Dropdown
      isOpen={isOpen}
      toggle={() => setIsOpen(!isOpen)}
      className="text-center m-0 p-0"
    >
      <DropdownToggle
        caret={caret}
        className="border-0 m-0 p-0"
        style={{ background: "transparent" }}

      >
        {dropDownIcon ?? <i className="ri-more-fill fs-5 p-0 m-0"></i>}
      </DropdownToggle>
      {portal ? (
      <Portal>
        <DropdownMenu
          style={{
            position: "absolute",
            backgroundColor: "white",
            minWidth: width || "auto",
          }}
        >
          {children}
        </DropdownMenu>
      </Portal> ) : (
        <DropdownMenu
          style={{
            position: "relative",
            backgroundColor: "white",
            minWidth: width || "auto",
          }}
        >
          {children}
        </DropdownMenu>
      )}
    </Dropdown>
  );
};

export default ActionDropDown;
