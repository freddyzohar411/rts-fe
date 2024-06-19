import { conditionObject } from "./filterConstant";

export const validateFilters = (filters, setErrors) => {
  if (!filters) return true;
  if (filters?.length === 0) return true;
  let isValid = true;
  const newErrors = filters?.map((filter) => {
    let fieldError = "";
    let conditionError = "";
    let valueError = "";

    if (!filter.condition) {
      isValid = false;
      conditionError = "Condition is required";

      if (!filter.field) {
        fieldError = "Field is required";
      }

      if (!filter.value) {
        valueError = "Value is required";
      }
    }

    if (
      filter?.condition === conditionObject.EQUAL ||
      filter?.condition === conditionObject.NOT_EQUAL ||
      filter?.condition === conditionObject.CONTAINS ||
      filter?.condition === conditionObject.DOES_NOT_CONTAIN ||
      filter?.condition === conditionObject.GREATER_THAN ||
      filter?.condition === conditionObject.LESS_THAN
    ) {
      if (!filter.field) {
        isValid = false;
        fieldError = "Field is required";
      }

      if (!filter?.value) {
        isValid = false;
        valueError = "Value is required";
      }
    }

    if (
      filter?.condition === conditionObject.IN ||
      filter?.condition === conditionObject.NOT_IN
    ) {
      if (!filter.field) {
        isValid = false;
        fieldError = "Field is required";
      }

      if (!filter?.value) {
        isValid = false;
        valueError = "Value/comma separated values is required";
      }
    }

    if (
      filter?.condition === conditionObject.IS_EMPTY ||
      filter?.condition === conditionObject.IS_NOT_EMPTY ||
      filter?.condition === conditionObject.IS_TRUE ||
      filter?.condition === conditionObject.IS_FALSE ||
      filter?.condition === conditionObject.IS_NULL ||
      filter?.condition === conditionObject.IS_NOT_NULL
    ) {
      if (!filter.field) {
        isValid = false;
        fieldError = "Field is required";
      }
    }

    return {
      field: fieldError,
      condition: conditionError,
      value: valueError,
    };
  });
  setErrors(newErrors);
  return isValid;
};
