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
import FilterQuery from "./FilterQuery";

const TableFilter = forwardRef(({ fields, filters, setFilters }, ref) => {
  const [errors, setErrors] = useState([]);

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
            marginRight: "3px",
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

  console.log("filters", filters);

  return (
    <div>
      <div className="d-flex gap-2 align-items-center mb-2">
        <span className="fw-semibold">Specify Criteria</span>
        {(filters?.length === 0 || filters == null) && (
          <Button
            type="button"
            className="btn btn-custom-primary"
            style={{
              padding: "1px 2px",
              fontSize: "12px",
            }}
            onClick={() =>
              setFilters((prev) => {
                if (!prev) {
                  return [{}];
                } else {
                  return [...prev, {}];
                }
              })
            }
          >
            Add Criteria
          </Button>
        )}
      </div>
      <div
        className="py-1"
        style={{
          overflowY: "auto",
          // height: "235px",
          height: "250px",
        }}
      >
        {filters?.map((filter, index) => {
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
      {filters?.length > 0 && (
        <div>
          <hr
            style={{
              marginTop: "5px",
              marginBottom: "5px",
            }}
          />
        </div>
      )}
      <div
        style={{
          overflowY: "auto",
          maxHeight: "75px",
          marginBottom: "6px",
        }}
      >
        <FilterQuery filters={filters} />
      </div>
    </div>
  );
});

export default TableFilter;
