import React from "react";

const InputElement = ({ formik, field }) => {
  return (
    <input
      id={field.name}
      name={field.name}
      type={field.type}
      className="form-control"
      onChange={formik.handleChange}
      value={formik.values[field.name]}
      placeholder={field.placeholder}
    />
  );
};

export default InputElement;
