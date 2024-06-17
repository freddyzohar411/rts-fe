import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Row, Col, Label, Button } from "reactstrap";
import Filter from "./Filter";
import { conditionObject } from "./filterConstant";
import { validateFilters } from "./Validation";

const TableFilter = forwardRef(({ fields, filters, setFilters }, ref) => {
  const [errors, setErrors] = useState([]);
  const [queryString, setQueryString] = useState("");

  // console.log("Errors", errors);

  useEffect(() => {
    setQueryString(buildFilterString(filters));
  }, [filters]);

  function buildFilterString(filters) {
    if (!filters || filters.length === 0) return "";

    let filterString = "";
    let currentGroup = "";

    for (let i = 0; i < filters.length; i++) {
      const filter = filters[i];
      const conditionString = `${filter?.label || ""} ${getConditionOperator(
        filter?.condition
      )} ${filter?.value ? `'${filter?.value}'` : ""}`;

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
      case conditionObject.CONTAINS:
        return "LIKE";
      case conditionObject.DOES_NOT_CONTAIN:
        return "NOT LIKE";
      case conditionObject.EQUAL:
        return "=";
      case conditionObject.NOT_EQUAL:
        return "!=";
      case conditionObject.IS_EMPTY:
        return "IS NULL";
      case conditionObject.IS_NOT_EMPTY:
        return "IS NOT NULL";
      case conditionObject.GREATER_THAN:
        return ">";
      case conditionObject.LESS_THAN:
        return "<";
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

  useImperativeHandle(
    ref,
    () => ({
      validate: () => validateFilters(filters, setErrors),
    }),
    [filters, setErrors]
  );

  return (
    <div>
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
      <div
        className="py-1"
        style={{
          overflowY: "auto",
          height: "220px",
        }}
      >
        {filters?.map((filter, index) => {
          // console.log("Filter", filter);
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
      </div>
      {/* <Row>
        <Button
          className="btn btn-success mt-2"
          onClick={() => validateFilters(filters, setErrors)}
        >
          Check
        </Button>
      </Row> */}
      <div>
        <hr />
      </div>
      <div>{queryString}</div>
    </div>
  );
});

export default TableFilter;
