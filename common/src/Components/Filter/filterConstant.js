export const conditionObject = {
  "EQUAL": "Equal",
  "NOT_EQUAL": "Not Equal",
  "CONTAINS": "Contains",
  "DOES_NOT_CONTAIN": "Does Not Contain",
  "STARTS_WITH": "Starts With",
  "ENDS_WITH": "Ends With",
  "GREATER_THAN": "Greater Than",
  "LESS_THAN": "Less Than",
  "IS_EMPTY": "Is Empty",
  "IS_NOT_EMPTY": "Is Not Empty",
  "IS_NULL": "Is Null",
  "IS_NOT_NULL": "Is Not Null",
  "IS_TRUE": "Is True",
  "IS_FALSE": "Is False",
  "BEFORE": "Before",
  "AFTER": "After",
  "IN": "In",
  "NOT_IN": "Not In",
}

export const mapConditionObjectArray = () => {
  const conditionArray = [];
  for (const key in conditionObject) {
    conditionArray.push({
      label: conditionObject[key],
      value: conditionObject[key],
    });
  }
  return conditionArray;

}

export const conditionTypes = [
    // Label and value are the same
  {
    label: "Equal",
    value: "Equal",
  },
  {
    label: "Not Equal",
    value: "Not Equal",
  },
  {
    label: "Contains",
    value: "Contains",
  },
  {
    label: "Does Not Contain",
    value: "Does Not Contain",
  },
  {
    label: "Starts With",
    value: "Starts With",
  },
  {
    label: "Ends With",
    value: "Ends With",
  },
  {
    label: "Greater Than",
    value: "Greater Than",
  },
  {
    label: "Less Than",
    value: "Less Than",
  },
  {
    label: "Is Empty",
    value: "Is Empty",
  },
  {
    label: "Is Not Empty",
    value: "Is Not Empty",
  },
  {
    label: "Is True",
    value: "Is True",
  },
  {
    label: "Is False",
    value: "Is False",
  },
  {
    label: "Is Null",
    value: "Is Null",
  },
  {
    label: "Is Not Null",
    value: "Is Not Null",
  },
  {
    label: "Before",
    value: "Before",
  },
  {
    label: "After",
    value: "After",
  },
];
