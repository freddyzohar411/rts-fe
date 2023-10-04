import React from 'react'

const SelectElement = ({ formik, field }) => {
  return (
    <select
        id={field.name}
        name={field.name}
        className="form-control"
        onChange={formik.handleChange}
        value={formik.values[field.name]}
        placeholder={field.placeholder}
      >
        <option value="">{field.placeholder}</option>
        {field?.options?.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
  )
}

export default SelectElement