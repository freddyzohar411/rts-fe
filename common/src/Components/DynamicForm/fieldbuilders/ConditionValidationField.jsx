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
  setValidationConditionErrors,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState([]);
  const [conditionValidationError, setConditionValidationError] = useState([]);

  useEffect(() => {
    setDropdownOpen((prevState) => {
      const newState = new Array(validationConditionList.length).fill(false);
      prevState.forEach((state, index) => {
        if (index < newState.length) {
          newState[index] = state;
        }
      });
      return newState;
    });
  }, [validationConditionList]);

  const toggle = (index) => {
    setDropdownOpen((prevState) =>
      prevState.map((item, i) => (i === index ? !prevState[index] : item))
    );
  };

  const conditionTypes = [
    { label: "AND", value: "AND" },
    { label: "OR", value: "OR" },
  ];

  const jsonCopy = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  };

  const verifyAndModifyConditionalMessage = () => {
    setValidationConditionList((prev) => {
      return prev.map((condition) => {
        if (condition.validationList.length === 0) {
          return {
            ...condition,
            conditionValidationMessage: "",
          };
        } else {
          return {
            ...condition,
            conditionValidationMessage: condition.conditionValidationMessage,
          };
        }
      });
    });
  };

  useEffect(() => {
    const newConditions = validationConditionList.map((condition) => {
      if (condition.validationList.length === 0) {
        return { ...condition, conditionValidationMessage: "" };
      }
      return condition; // Assuming we don't need to update if there's no change
    });
    if (
      JSON.stringify(newConditions) !== JSON.stringify(validationConditionList)
    ) {
      setValidationConditionList(newConditions);
    }
  }, [validationConditionList]);

  const handleValidationErrorMessage = (index) => {
    if (
      validationConditionList[index].validationList.length > 0 &&
      validationConditionList[index].conditionValidationMessage === ""
    ) {
      return "Please add a condition error message";
    }
    return "";
  };

  useEffect(() => {
    const getNewValidationError = validationConditionList.map(
      (condition, index) => handleValidationErrorMessage(index)
    );
    setConditionValidationError(getNewValidationError);
    setValidationConditionErrors(getNewValidationError);
  }, [validationConditionList]);

  console.log("Erorrr", conditionValidationError);

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
            <div className="d-flex align-items-center gap-3 mb-2">
              <span>{index + 1}) </span>
              <Dropdown
                isOpen={dropdownOpen[index]}
                toggle={() => toggle(index)}
                direction="down"
              >
                <DropdownToggle className="btn btn-custom-primary px-2 py-1 " caret style={{fontSize:"0.7rem"}}>
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
                className="btn btn-danger px-2 py-1"
                style={{ fontSize: "0.7rem" }}
                onClick={() => {
                  setValidationConditionList(
                    validationConditionList.filter((item, i) => i !== index)
                  );
                  verifyAndModifyConditionalMessage();
                }}
              >
                <span className="ri-delete-bin-line"></span>
                {/* Delete */}
              </Button>
            </div>
            {validationCondition?.validationList?.map((condition, index2) => {
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
              disabled={validationCondition.validationList.length === 0}
              onChange={(e) => {
                setValidationConditionList((prev) => {
                  const va = jsonCopy(prev);
                  va[index].conditionValidationMessage = e.target.value;
                  return va;
                });
              }}
              onBlur={() => handleBlur(index)} // Here you attach the onBlur handler
            />
            {/* // Error handling. If there is a condition. Make sure Input cannot
            be empty */}
            {conditionValidationError[index] && (
              <div className="mt-2 text-danger">
                {conditionValidationError[index]}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ConditionValidationField;
