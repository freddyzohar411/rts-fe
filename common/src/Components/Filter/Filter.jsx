import React, { useState, useEffect, useCallback } from "react";
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
import { mapConditionObjectArray, conditionObject } from "./filterConstant";
import MultiDateElement from "./Elements/MultiDateElement";

const Filter = ({ fields, filter, setFilters, index, errors, formSchema }) => {
  console.log("formSchema", formSchema);
  const [filtersInput, setFiltersInput] = useState({}); // [field, condition, value, operator]
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [formElement, setFormElement] = useState(null);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

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
      <div style={{ color: "red", fontSize: "12px" }}>
        <> {message}</>
      </div>
    );
  };

  const errorDivHeight = "20px";

  const isErrorExist = (errors) => {
    if (errors) {
      if (errors?.field || errors?.condition || errors?.value) {
        return true;
      }
    }
    return false;
  };

  const generateErrorDiv = (errors) => {
    if (!isErrorExist(errors)) return null;
    return (
      <div
        style={{
          height: errorDivHeight,
        }}
      >
        {errors?.value && ErrorDiv(errors?.value)}
      </div>
    );
  };

  const generateElementFromFormSchema = (formSchema, filter) => {
    if (!formSchema) return null;
    let filterField = filter?.field;
    console.log("filterField", filterField);
    // If filterField constains . then split it
    if (filterField?.includes(".")) {
      filterField = filterField.split(".")[1];
    }
    console.log("filterField SPLIT", filterField);
    const schema = formSchema?.find((schema) => {
      return schema?.name === filterField;
    });
    if (!schema) return null;
    if (schema?.type === "select") {
      return (
        <SelectElement
          optionsData={schema?.options}
          setSelectedOptionData={(selectedOptions) => {
            setFilters((prev) => {
              const newFiltersInput = JSON.parse(JSON.stringify(prev));
              newFiltersInput[index] = {
                ...newFiltersInput[index],
                value: selectedOptions?.value,
              };
              return newFiltersInput;
            });
          }}
          value={schema?.options?.find(
            (option) => option?.value === filter?.value
          )}
        />
      );
    }
    if (schema?.type === "date") {
      return (
        <MultiDateElement
          onChange={setValueInput}
          value={filter?.value}
          schema={schema}
        />
      );
    }
    if (schema?.type === "datemonth") {
      return (
        <MultiDateElement
          onChange={setValueInput}
          value={filter?.value}
          schema={schema}
          type="dateMonth"
        />
      );
    }
  };

  const generateValueElement = (filter) => {
    // Set a function that take in formSchema and return the element
    const element = generateElementFromFormSchema(formSchema, filter);
    if (element) return element;

    if (!filter?.condition) return null;
    if (
      filter?.condition === conditionObject.EQUAL ||
      filter?.condition === conditionObject.NOT_EQUAL ||
      filter?.condition === conditionObject.CONTAINS ||
      filter?.condition === conditionObject.DOES_NOT_CONTAIN ||
      filter?.condition === conditionObject.IN ||
      filter?.condition === conditionObject.NOT_IN ||
      filter?.condition === conditionObject.STARTS_WITH ||
      filter?.condition === conditionObject.ENDS_WITH
    ) {
      return (
        <>
          <Input
            type="text"
            className="form-control"
            onChange={setValueInput}
            value={filter?.value}
          />
          {generateErrorDiv(errors)}
        </>
      );
    } else if (
      (filter && filter?.condition === conditionObject.GREATER_THAN) ||
      filter?.condition === conditionObject.LESS_THAN
    ) {
      return (
        <>
          <Input
            type="number"
            className="form-control"
            onChange={setValueInput}
            value={filter?.value}
          />
          {generateErrorDiv(errors)}
        </>
      );
    } else if (
      filter?.condition === conditionObject.BEFORE ||
      filter?.condition === conditionObject.AFTER
    ) {
      return (
        <MultiDateElement onChange={setValueInput} value={filter?.value} />
      );
    }
  };

  useEffect(() => {
    setFormElement(generateValueElement(filter));
  }, [formSchema, filter]);

  return (
    <div className="d-flex align-items-center gap-2 mb-2">
      <div
        style={{
          display: "flex",
          width: "100%",
          gap: "10px",
        }}
      >
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <SelectElement
            enableTooltip={true}
            optionsData={() => {
              return fields?.map((field) => {
                return {
                  label: field?.label,
                  value: field?.sortValue,
                };
              });
            }}
            setSelectedOptionData={(selectedOptions) => {
              setFieldInput(selectedOptions);
            }}
            value={
              filter?.field &&
              filter?.label && {
                label: filter?.label,
                value: filter?.field,
              }
            }
          />
          {isErrorExist(errors) && (
            <div
              style={{
                height: errorDivHeight,
              }}
            >
              {errors?.field && ErrorDiv(errors?.field)}
            </div>
          )}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <SelectElement
            enableTooltip={true}
            optionsData={mapConditionObjectArray()}
            setSelectedOptionData={(selectedOptions) => {
              setFilters((prev) => {
                const newFiltersInput = JSON.parse(JSON.stringify(prev));
                newFiltersInput[index] = {
                  ...newFiltersInput[index],
                  value: "",
                };
                return newFiltersInput;
              });
              setConditionInput(selectedOptions);
            }}
            value={
              filter?.condition && {
                label: filter?.condition,
                value: filter?.condition,
              }
            }
          />
          {isErrorExist(errors) && (
            <div
              style={{
                height: errorDivHeight,
              }}
            >
              {errors?.condition && ErrorDiv(errors?.condition)}
            </div>
          )}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {formElement}
        </div>
      </div>
      <div>
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
        {isErrorExist(errors) && (
          <div
            style={{
              height: errorDivHeight,
            }}
          ></div>
        )}
      </div>
      <div>
        <RemoveCircleOutlineOutlinedIcon
          className="cursor-pointer"
          onClick={removeCondition}
        />
        {isErrorExist(errors) && (
          <div
            style={{
              height: errorDivHeight,
            }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default Filter;
