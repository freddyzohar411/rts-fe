import React from "react";

const TextAreaElement = ({ formik, field, formStateHook, tabIndexData }) => {
  const { formState } = formStateHook;
  return (
    <textarea
      id={field.name}
      name={field.name}
      className="form-control"
      onChange={formik.handleChange}
      value={formik?.values?.[field.name]}
      placeholder={field.placeholder}
      disabled={formState === "view" ? true : false}
      tabIndex={tabIndexData?.[field?.fieldId]}
    />
  );
};

export default TextAreaElement;
