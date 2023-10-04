import React from "react";

const RadioElement = ({ formik, field }) => {
  return (
    <div className="d-flex gap-3">
      {field?.options?.map((option) => (
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name={field.name}
            id={option.value}
            value={option.value}
            onChange={formik.handleChange}
            checked={formik.values[field.name] === option.value}
          />
          <label className="form-check-label" htmlFor={option.value}>
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioElement;
