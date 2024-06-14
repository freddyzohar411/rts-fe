import React, { useState, useEffect } from "react";
import { Row, Col, Label, Button } from "reactstrap";
import Filter from "./Filter";

const TableFilter = ({ fields }) => {
  const [filters, setFilters] = useState([
    {
      field: "name",
      condition: "contains",
      value: "John",
    },
    {
      field: "age",
      condition: "greater than",
      value: "30",
      operator: "AND",
    },
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

  console.log("fields");

  useEffect(() => {
    console.log("Filters String", buildFilterString(filters));
  }, [filters]);

  function buildFilterString(filters) {
    if (!filters || filters.length === 0) return "";

    let filterString = "";
    let currentGroup = "";

    for (let i = 0; i < filters.length; i++) {
      const filter = filters[i];
      const conditionString = `${filter.column} ${getConditionOperator(
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
      case "contains":
        return "LIKE";
      case "equal":
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
            onClick={() =>
              setFilters((prev) => [
                ...prev,
                {
                //   field: "",
                //   condition: "",
                //   value: "",
                },
              ])
            }
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
              />
            </div>
          );
        })}
      </Row>
    </div>
  );
};

export default TableFilter;
