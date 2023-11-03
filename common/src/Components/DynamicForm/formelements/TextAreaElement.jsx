import React from "react";

const TextAreaElement = ({ formik, field , formStateHook}) => {
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
    />
  );
};

export default TextAreaElement;
