export const conditionObject = {
  "EQUAL": "Equal",
  "NOT_EQUAL": "Not Equal",
  "CONTAINS": "Contains",
  "DOES_NOT_CONTAIN": "Does Not Contain",
  "STARTS_WITH": "Starts With",
  "ENDS_WITH": "Ends With",
  "GREATER_THAN": "Greater Than",
  "GREATER_THAN_OR_EQUAL": "Greater Than Or Equal",
  "LESS_THAN": "Less Than",
  "LESS_THAN_OR_EQUAL": "Less Than Or Equal",
  "IS_EMPTY": "Is Empty",
  "IS_NOT_EMPTY": "Is Not Empty",
  "IS_NULL": "Is Null",
  "IS_NOT_NULL": "Is Not Null",
  "IS_TRUE": "Is True",
  "IS_FALSE": "Is False",
  "ON": "On",
  "BEFORE": "Before",
  "BEFORE_OR_EQUAL": "Before Or Equal",
  "AFTER": "After",
  "AFTER_OR_EQUAL": "After Or Equal",
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