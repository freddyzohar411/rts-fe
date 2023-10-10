import React from "react";
import { fieldLocation, fieldSize } from "./constant";

const InputElement = ({ formik, field }) => {
  return (
    <div className={fieldLocation[field.fieldLocation]}>
      <input
        id={field.name}
        name={field.name}
        type={field.type}
        className={`form-control ${fieldSize[field.fieldSize]}`}
        onChange={formik.handleChange}
        value={formik.values[field.name]}
        placeholder={field.placeholder}
      />
    </div>
  );
};

export default InputElement;
