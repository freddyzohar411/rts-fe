import React, { useState } from "react";
import {
  Input,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import { SelectElement } from "@Workspace/common";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import { conditionTypes } from "./filterConstant";

const Filter = ({ fields, filter, setFilters, index }) => {
  const [filtersInput, setFiltersInput] = useState({}); // [field, condition, value, operator]
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  console.log("Index", index);

  const addANDCondition = () => {
    // Add after the index

    setFilters((prev) => {
      const newFilters = [...prev];
      newFilters.splice(index + 1, 0, { operator: "AND" });
      return newFilters;
    });
  };

  const addORCondition = () => {
    // Add After index
    setFilters((prev) => {
      const newFilters = [...prev];
      newFilters.splice(index + 1, 0, { operator: "OR" });
      return newFilters;
    });
  };

  const removeCondition = () => {
    // Remove the index
    setFilters((prev) => {
      const newFilters = [...prev];
      newFilters.splice(index, 1);
      return newFilters;
    });
  };

  return (
    <div className="d-flex align-items-center gap-2 mb-2">
      <div className="flex-grow-1">
        <SelectElement
          optionsData={fields}
          setSelectedOptionData={(selectedOptions) => {
            setFiltersInput({
              ...filtersInput,
              field: selectedOptions?.label,
              value: selectedOptions?.value,
            });
          }}
          value={
            filter?.field &&
            filter?.value && {
              label: filter?.field,
              value: filter?.value,
            }
          }
        />
      </div>
      <div className="flex-grow-1">
        <SelectElement optionsData={conditionTypes} />
      </div>
      <div className="flex-grow-1">
        <Input type="text" className="form-control" />
      </div>
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle
          tag="div"
          data-toggle="dropdown"
          aria-expanded={dropdownOpen}
          onClick={toggle}
        >
          <AddCircleOutlineOutlinedIcon
            className="cursor-pointer"
            onClick={toggle}
          />
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={addANDCondition}>AND</DropdownItem>
          <DropdownItem onClick={addORCondition}>OR</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <RemoveCircleOutlineOutlinedIcon
        className="cursor-pointer"
        onClick={removeCondition}
      />
    </div>
  );
};

export default Filter;
