import React, { useState } from "react";
import { useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Label,
  Input,
} from "reactstrap";

const ConditionValidationField = ({
  validationConditionList,
  setValidationConditionList,
  formFields,
  field,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState([]);
  const toggle = (index) => {
    // Toggle all false except the index that is selected
    setDropdownOpen((prevState) =>
      prevState.map((item, i) => (i === index ? !item : false))
    );
  };

  useEffect(() => {
    // Set dropdownOpen as a List of Booleans
    setDropdownOpen(new Array(validationConditionList.length).fill(false));
  }, [validationConditionList]);

  const conditionTypes = [
    { label: "AND", value: "AND" },
    { label: "OR", value: "OR" },
  ];

  const jsonCopy = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  };

  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <label htmlFor={field.name} className="form-label">
          {field.label}
        </label>
        <Button
          type="button"
          className="btn btn-custom-primary"
          onClick={() => {
            setValidationConditionList([
              ...validationConditionList,
              {
                validationList: [],
                conditionValidationMessage: "",
              },
            ]);
          }}
        >
          Add Condition
        </Button>
      </div>

      {validationConditionList.map((validationCondition, index) => {
        return (
          <div className="mb-3">
            <div className="d-flex align-items-center gap-3">
              <span>{index + 1}) </span>
              <Dropdown
                isOpen={dropdownOpen[index]}
                toggle={() => toggle(index)}
                direction="down"
              >
                <DropdownToggle className="btn btn-custom-primary mb-2" caret>
                  Add Condition Type
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => {
                      const va = jsonCopy(validationConditionList);
                      va[index].validationList.push({
                        field: "",
                        condition: "",
                        value: "",
                        type: 1,
                        logicalCondition: "AND",
                      });
                      setValidationConditionList(va);
                    }}
                  >
                    Type 1
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      const va = jsonCopy(validationConditionList);
                      va[index].validationList.push({
                        field: "",
                        condition: "",
                        value: "",
                        type: 2,
                        logicalCondition: "AND",
                      });
                      setValidationConditionList(va);
                    }}
                  >
                    Type 2
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  setValidationConditionList(
                    validationConditionList.filter((item, i) => i !== index)
                  );
                }}
              >
                Delete
              </Button>
            </div>

            {validationCondition.validationList.map((condition, index2) => {
              if (condition.type === 1) {
                return (
                  <div className="d-flex gap-2 mb-2 align-items-center">
                    <span>- </span>
                    <select
                      className="form-select"
                      value={index2 == 0 ? "" : condition.logicalCondition}
                      disabled={index2 == 0}
                      onChange={(e) => {
                        setValidationConditionList((prev) => {
                          const va = jsonCopy(prev);
                          va[index].validationList[index2].logicalCondition =
                            e.target.value;
                          return va;
                        });
                      }}
                      style={{ width: "100px" }}
                    >
                      <option value="">Select a field</option>
                      {conditionTypes.map((field) => {
                        return (
                          <option value={field.label}>{field.value}</option>
                        );
                      })}
                    </select>
                    <select
                      className="form-select"
                      value={condition.condition}
                      onChange={(e) =>
                        setValidationConditionList((prev) => {
                          const va = jsonCopy(prev);
                          va[index].validationList[index2].condition =
                            e.target.value;
                          return va;
                        })
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
                        setValidationConditionList((prev) => {
                          const va = jsonCopy(prev);
                          va[index].validationList[index2].field =
                            e.target.value;
                          return va;
                        });
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
                        setValidationConditionList((prev) => {
                          const va = jsonCopy(prev);
                          va[index].validationList[index2].value =
                            e.target.value;
                          return va;
                        })
                      }
                      value={condition.value}
                      placeholder="Value"
                    />
                    <span>
                      <AiFillDelete
                        className="cursor-pointer text-custom-primary"
                        onClick={() => {
                          setValidationConditionList((prev) => {
                            const va = jsonCopy(prev);
                            va[index].validationList = va[
                              index
                            ].validationList.filter((item, i) => i !== index2);
                            return va;
                          });
                        }}
                      />
                    </span>
                  </div>
                );
              } else {
                return (
                  <div className="d-flex gap-2 mb-2 align-items-center">
                    <span>- </span>
                    <select
                      className="form-select"
                      value={index2 == 0 ? "" : condition.logicalCondition}
                      disabled={index2 == 0}
                      onChange={(e) => {
                        setValidationConditionList((prev) => {
                          const va = jsonCopy(prev);
                          va[index].validationList[index2].logicalCondition =
                            e.target.value;
                          return va;
                        });
                      }}
                      style={{ width: "100px" }}
                    >
                      <option value="">Select a field</option>
                      {conditionTypes.map((field) => {
                        return (
                          <option value={field.label}>{field.value}</option>
                        );
                      })}
                    </select>
                    <select
                      className="form-select"
                      value={condition.field}
                      onChange={(e) => {
                        setValidationConditionList((prev) => {
                          const va = jsonCopy(prev);
                          va[index].validationList[index2].field =
                            e.target.value;
                          return va;
                        });
                      }}
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
                        setValidationConditionList((prev) => {
                          const va = jsonCopy(prev);
                          va[index].validationList[index2].condition =
                            e.target.value;
                          return va;
                        })
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
                        setValidationConditionList((prev) => {
                          const va = jsonCopy(prev);
                          va[index].validationList[index2].value =
                            e.target.value;
                          return va;
                        })
                      }
                      value={condition.value}
                      placeholder="Value"
                    />

                    <span>
                      <AiFillDelete
                        className="cursor-pointer text-custom-primary"
                        onClick={() => {
                          setValidationConditionList((prev) => {
                            const va = jsonCopy(prev);
                            va[index].validationList = va[
                              index
                            ].validationList.filter((item, i) => i !== index2);
                            return va;
                          });
                        }}
                      />
                    </span>
                  </div>
                );
              }
            })}
            <Label>Condition validation message</Label>
            <Input
              value={validationCondition?.conditionValidationMessage}
              type="text"
              onChange={(e) => {
                setValidationConditionList((prev) => {
                  const va = jsonCopy(prev);
                  va[index].conditionValidationMessage = e.target.value;
                  return va;
                });
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ConditionValidationField;
