import React from 'react'
import { fieldLocation, fieldSize } from "./constant";

const SelectElement = ({ formik, field }) => {
  return (
    <div className={fieldLocation[field.fieldLocation]}>
    <select
        id={field.name}
        name={field.name}
        className={`form-select ${fieldSize[field.fieldSize]}`}
        onChange={formik.handleChange}
        value={formik.values[field.name]}
        placeholder={field.placeholder}
      >
        <option value="">{field.placeholder}</option>
        {field?.options?.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
      </div>
  )
}

export default SelectElement