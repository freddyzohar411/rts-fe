import React from "react";
import { fieldLocation, fieldSize } from "./constant";

const SelectElement = ({ formik, field, formStateHook }) => {
  const { formState } = formStateHook;
  return (
    <div className={fieldLocation[field.fieldLocation]}>
      <select
        id={field.name}
        name={field.name}
        className={`form-select ${fieldSize[field.fieldSize]} ${
          formik?.values?.[field.name] === "" ||
          formik?.values?.[field.name] === undefined
            ? "text-muted"
            : ""
        }`}
        onChange={formik.handleChange}
        value={formik?.values?.[field.name]}
        placeholder={field.placeholder}
        disabled={formState === "view" ? true : false}
      >
        <option value="">{field.placeholder}</option>
        {field?.options?.map((option, index) => (
          <option key={index} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectElement;
