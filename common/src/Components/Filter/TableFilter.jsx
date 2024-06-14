import React, { useState, useEffect } from "react";
import { Row, Col, Label, Button } from "reactstrap";
import Filter from "./Filter";
import { conditionObject } from "./filterConstant";
import { validateFilters } from "./Validation";

const TableFilter = ({ fields }) => {
  const [filters, setFilters] = useState([
    // {
    //   field: "name",
    //   condition: "contains",
    //   value: "John",
    // },
    // {
    //   field: "age",
    //   condition: "greater than",
    //   value: "30",
    //   operator: "AND",
    // },
    // {
    //   field: "status",
    //   condition: "equal",
    //   value: "active",
    //   operator: "OR",
    // },
    // {
    //   field: "department",
    //   condition: "contains",
    //   value: "sales",
    //   operator: "AND",
    // },
    // {
    //   field: "salary",
    //   condition: "greater than",
    //   value: "50000",
    //   operator: "OR",
    // },
  ]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    console.log("Filters String: ", buildFilterString(filters));
  }, [filters]);

  function buildFilterString(filters) {
    if (!filters || filters.length === 0) return "";

    let filterString = "";
    let currentGroup = "";

    for (let i = 0; i < filters.length; i++) {
      const filter = filters[i];
      const conditionString = `${filter?.field} ${getConditionOperator(
        filter.condition
      )} '${filter.value}'`;

      if (i === 0) {
        currentGroup = conditionString;
      } else {
        currentGroup = `(${currentGroup} ${filters[i].operator} ${conditionString})`;
      }
    }

    return currentGroup;
  }

  function getConditionOperator(condition) {
    switch (condition) {
      case "Contains":
        return "LIKE";
      case "Equal":
        return "=";
      case "isEmpty":
        return "IS NULL";
      case "greater than":
        return ">";
      default:
        return "";
    }
  }

  const generateOperatorHr = (filter, index) => {
    if (index === 0 || !filter.operator) {
      return null;
    }
    return (
      <div className="d-flex align-items-center">
        <span
          style={{
            fontSize: "12px",
            padding: "1px 3px",
            borderRadius: "5px",
            backgroundColor: "lightgray",
          }}
        >
          {filter?.operator}
        </span>
        <span
          className="flex-grow-1"
          style={{
            borderBottom: "1px dashed black",
          }}
        ></span>
      </div>
    );
  };

//   const validateFilters = () => {
//     let isValid = true;
//     const newErrors = filters.map((filter) => {
//       let fieldError = "";
//       let conditionError = "";
//       let valueError = "";

//       if (!filter.condition) {
//         isValid = false;
//         conditionError = "Condition is required";

//         if (!filter.field) {
//           fieldError = "Field is required";
//         }

//         if (!filter.value) {
//           valueError = "Value is required";
//         }
//       }

//       if (filter?.condition === conditionObject.EQUAL) {
//         if (!filter.field) {
//           isValid = false;
//           fieldError = "Field is required";
//         }

//         if (!filter?.value) {
//           isValid = false;
//           valueError = "Value is required";
//         }
//       }

//       return {
//         field: fieldError,
//         condition: conditionError,
//         value: valueError,
//       };
//     });
//     setErrors(newErrors);
//     return isValid;
//   };

  console.log("filters", filters);

  return (
    <div
      style={{
        overflowY: "auto",
        height: "280px",
      }}
    >
      <div className="d-flex gap-2 align-items-center mb-2">
        <span className="fw-semibold">Specify Criteria</span>
        {filters?.length === 0 && (
          <Button
            type="button"
            className="btn btn-custom-primary"
            style={{
              padding: "1px 2px",
              fontSize: "12px",
            }}
            onClick={() => setFilters((prev) => [...prev, {}])}
          >
            Add Criteria
          </Button>
        )}
      </div>

      <Row className="py-1">
        {filters?.map((filter, index) => {
          console.log("Filter", filter);
          return (
            <div className="d-flex flex-column gap-2">
              {generateOperatorHr(filter, index)}
              <Filter
                fields={fields}
                filter={filter}
                setFilters={setFilters}
                index={index}
                errors={errors?.[index]}
              />
            </div>
          );
        })}
      </Row>
      <Row>
        <Button
          className="btn btn-success"
          onClick={() => validateFilters(filters, setErrors)}
        >
          Check
        </Button>
      </Row>
    </div>
  );
};

export default TableFilter;
