import React from "react";

const TextAreaElement = ({ formik, field }) => {
  return (
    <textarea
      id={field.name}
      name={field.name}
      className="form-control"
      onChange={formik.handleChange}
      value={formik.values[field.name]}
      placeholder={field.placeholder}
    />
  );
};

export default TextAreaElement;
