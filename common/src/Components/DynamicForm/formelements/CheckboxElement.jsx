import React from "react";

const CheckboxElement = ({ formik, field }) => {
  return (
    <>
      {field?.options.map((option) => (
        <div className="form-check" key={option.value}>
          <input
            className="form-check-input"
            type="checkbox"
            name={field.name}
            id={option.value}
            value={option.value}
            checked={formik.values[field.name]?.includes(option.value)}
            onChange={() => {
              // Write method in here
              const isChecked = formik.values[field.name]?.includes(
                option.value
              );
              if (isChecked) {
                formik.setFieldValue(
                  field.name,
                  formik.values[field.name]?.filter(
                    (item) => item !== option.value
                  )
                );
              } else {
                formik.setFieldValue(field.name, [
                  ...formik.values[field.name],
                  option.value,
                ]);
              }
            }}
          />
          <label className="form-check-label" htmlFor={option.value}>
            {option.label}
          </label>
        </div>
      ))}
    </>
  );
};

export default CheckboxElement;
