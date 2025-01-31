import React, { useState } from "react";
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";

const MultiDateElement = ({ onChange, value, type = "date" }) => {
  const [dateType, setDateType] = useState(type);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <>
      <div className="d-flex align-items-center w-100 h-100">
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle
            tag="div"
            data-toggle="dropdown"
            aria-expanded={dropdownOpen}
            onClick={toggle}
          >
            <button
              type="button"
              className="btn btn-custom-primary"
              style={{
                borderTopRightRadius: "0px",
                borderBottomRightRadius: "0px",
                whiteSpace: "nowrap",
              }}
              onClick={toggle}
            >
              {dateType === "date" ? "Full Date" : "Month Year"}
            </button>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => setDateType("date")}>
              Full Date
            </DropdownItem>
            <DropdownItem onClick={() => setDateType("dateMonth")}>
              Month Year
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <input
          type={
            dateType === "date"
              ? "date"
              : dateType === "dateMonth"
              ? "month"
              : "date"
          }
          className="form-control"
          style={{
            borderTopLeftRadius: "0px",
            borderBottomLeftRadius: "0px",
          }}
          onChange={onChange}
          value={value}
        />
      </div>
    </>
  );
};

export default MultiDateElement;
