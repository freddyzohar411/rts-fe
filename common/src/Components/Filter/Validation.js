import {  conditionObject } from "./filterConstant";

export const validateFilters = (filters, setErrors) => {
    console.log("filters VV", filters);
  let isValid = true;
  const newErrors = filters.map((filter) => {
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

    if (filter?.condition === conditionObject.EQUAL) {
      if (!filter.field) {
        isValid = false;
        fieldError = "Field is required";
      }

      if (!filter?.value) {
        isValid = false;
        valueError = "Value is required";
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
