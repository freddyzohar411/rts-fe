import React from "react";
import { AiFillDelete } from "react-icons/ai";

const ConditionValidationField = ({validationConditionList, setValidationConditionList, formFields, field }) => {
  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <label htmlFor={field.name} className="form-label">
          {field.label}
        </label>
        <button
          type="button"
          className="btn btn-custom-primary"
          onClick={() => {
            setValidationConditionList([
              ...validationConditionList,
              { field: "", condition: "", value: "", type: 1 },
            ]);
          }}
        >
          Add Type 1
        </button>
        <button
          type="button"
          className="btn btn-custom-primary"
          onClick={() => {
            setValidationConditionList([
              ...validationConditionList,
              { field: "", condition: "", value: "", type: 2 },
            ]);
          }}
        >
          Add Type 2
        </button>
      </div>
      {validationConditionList.map((condition, index) => {
        if (condition.type === 1) {
          return (
            <div className="d-flex gap-2 mb-2 align-items-center">
              <span>{index + 1}) </span>
              <select
                className="form-select"
                value={condition.condition}
                onChange={(e) =>
                  setValidationConditionList((prev) =>
                    prev.map((item, i) =>
                      i === index
                        ? { ...item, condition: e.target.value }
                        : item
                    )
                  )
                }
              >
                <option value="">Select a condition</option>
                {field.conditionTypes.map((conditionType) => (
                  <option value={conditionType}>{conditionType}</option>
                ))}
              </select>
              <select
                className="form-select"
                value={condition.field}
                onChange={(e) => {
                  setValidationConditionList((prev) =>
                    prev.map((item, i) =>
                      i === index
                        ? {
                            ...item,
                            field: e.target.value,
                            value: e.target.value ? "" : item.value,
                          }
                        : item
                    )
                  );
                }}
              >
                <option value="">Select a field</option>
                {formFields.map((field) => {
                  return <option value={field.name}>{field.name}</option>;
                })}
              </select>
              <span>OR</span>
              <input
                id="conditionValue"
                name="conditionValue"
                type="text"
                className="form-control"
                onChange={(e) =>
                  setValidationConditionList((prev) =>
                    prev.map((item, i) =>
                      i === index
                        ? {
                            ...item,
                            value: e.target.value,
                            field: e.target.value ? "" : item.field,
                          }
                        : item
                    )
                  )
                }
                value={condition.value}
                placeholder="Value"
              />
              <span>
                <AiFillDelete
                  className="cursor-pointer text-custom-primary"
                  onClick={() => {
                    setValidationConditionList(
                      validationConditionList.filter((item, i) => i !== index)
                    );
                  }}
                />
              </span>
            </div>
          );
        } else {
          return (
            <div className="d-flex gap-2 mb-2 align-items-center">
              <span>{index + 1}) </span>
              <select
                className="form-select"
                value={condition.field}
                onChange={(e) =>
                  setValidationConditionList((prev) =>
                    prev.map((item, i) =>
                      i === index ? { ...item, field: e.target.value } : item
                    )
                  )
                }
              >
                <option value="">Select a field</option>
                {formFields.map((field) => {
                  return <option value={field.name}>{field.name}</option>;
                })}
              </select>
              <select
                className="form-select"
                value={condition.condition}
                onChange={(e) =>
                  setValidationConditionList((prev) =>
                    prev.map((item, i) =>
                      i === index
                        ? { ...item, condition: e.target.value }
                        : item
                    )
                  )
                }
              >
                <option value="">Select a condition</option>
                {field.conditionTypes.map((conditionType) => (
                  <option value={conditionType}>{conditionType}</option>
                ))}
              </select>
              <input
                id="conditionValue"
                name="conditionValue"
                type="text"
                className="form-control"
                onChange={(e) =>
                  setValidationConditionList((prev) =>
                    prev.map((item, i) =>
                      i === index ? { ...item, value: e.target.value } : item
                    )
                  )
                }
                value={condition.value}
                placeholder="Value"
              />
              <span>
                <AiFillDelete
                  className="cursor-pointer text-custom-primary"
                  onClick={() => {
                    setValidationConditionList(
                      validationConditionList.filter((item, i) => i !== index)
                    );
                  }}
                />
              </span>
            </div>
          );
        }
      })}
    </div>
  );
};

export default ConditionValidationField;
