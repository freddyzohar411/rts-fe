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
import { mapConditionObjectArray } from "./filterConstant";

const Filter = ({ fields, filter, setFilters, index, errors }) => {
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

  const setFieldInput = (selectedOptions) => {
    // Set at the the right index
    setFilters((prev) => {
      const newFiltersInput = JSON.parse(JSON.stringify(prev));
      console.log("Prev", prev);
      newFiltersInput[index] = {
        ...newFiltersInput[index],
        label: selectedOptions?.label || undefined,
        field: selectedOptions?.value || undefined,
      };
      return newFiltersInput;
    });
  };

  const setConditionInput = (selectedOptions) => {
    setFilters((prev) => {
      const newFiltersInput = JSON.parse(JSON.stringify(prev));
      newFiltersInput[index] = {
        ...newFiltersInput[index],
        condition: selectedOptions?.label || undefined,
      };
      return newFiltersInput;
    });
  };

  const setValueInput = (e) => {
    setFilters((prev) => {
      const newFiltersInput = JSON.parse(JSON.stringify(prev));
      newFiltersInput[index] = {
        ...newFiltersInput[index],
        value: e.target.value,
      };
      return newFiltersInput;
    });
  };

  const ErrorDiv = (message) => {
    if (!message) return null;
    return (
      <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
        <> {message}</>
      </div>
    );
  };

  return (
    <div className="d-flex align-items-center gap-2 mb-2">
      <div className="flex-grow-1">
        <SelectElement
          optionsData={fields}
          setSelectedOptionData={(selectedOptions) => {
            console.log("Selected Options", selectedOptions);
            setFieldInput(selectedOptions);
          }}
          value={
            filter?.field &&
            filter?.value && {
              label: filter?.label,
              value: filter?.field,
            }
          }
        />
        <div
          style={{
            height: "10px",
          }}
        >
          {errors?.field && ErrorDiv(errors?.field)}
        </div>
      </div>
      <div className="flex-grow-1">
        <SelectElement
          optionsData={mapConditionObjectArray()}
          setSelectedOptionData={(selectedOptions) => {
            setConditionInput(selectedOptions);
          }}
          value={
            filter?.condition && {
              label: filter?.condition,
              value: filter?.condition,
            }
          }
        />
        <div
          style={{
            height: "10px",
          }}
        >
          {errors?.condition && ErrorDiv(errors?.condition)}
        </div>
      </div>
      <div className="flex-grow-1">
        <Input type="text" className="form-control" onChange={setValueInput} />
        <div
          style={{
            height: "10px",
          }}
        >
          {errors?.value && ErrorDiv(errors?.value)}
        </div>
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
