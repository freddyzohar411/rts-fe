import React from "react";
import { fieldLocation, fieldSize } from "./constant";
import { checkVisibleConditions } from "../formelements/formElements_helper";

const InputElement = ({ formik, field, formStateHook, tabIndexData }) => {
  const { formState } = formStateHook;
  let type = field.type;
  if (type === "datemonth") {
    type = "month";
  }

  // Transform type to match HTML5 input types
  if (type === "month") {
    if (formik?.values?.[field.name]?.length === 10) {
      formik?.setFieldValue(
        field.name,
        formik?.values?.[field.name].slice(0, 7)
      );
    }
  }

  // Handle Present date "present" so as not to throw error
  if (
    type === "date" &&
    checkVisibleConditions(field, formik) &&
    formik?.values?.[field.name] === "present"
  ) {
    formik?.setFieldValue(field.name, "");
  }

  return (
    <div className={fieldLocation[field.fieldLocation]}>
      <input
        id={field.name}
        name={field.name}
        type={type}
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
