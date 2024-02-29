import React from "react";
import { fieldLocation, fieldSize } from "./constant";

const InputElement = ({ formik, field, formStateHook,  tabIndexData }) => {
  const { formState } = formStateHook;
  return (
    <div className={fieldLocation[field.fieldLocation]}>
      <input
        id={field.name}
        name={field.name}
        type={field.type}
        className={`form-control ${fieldSize[field?.fieldSize]}`}
        onChange={formik?.handleChange}
        value={formik?.values?.[field.name]}
        placeholder={field?.placeholder}
        disabled={formState === "view" ? true : false}
        tabIndex={tabIndexData?.[field?.fieldId]}
      />
    </div>
  );
};

export default InputElement;
