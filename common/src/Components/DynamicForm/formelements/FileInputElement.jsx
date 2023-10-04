import React from "react";

const FileInputElement = ({ formik, field }) => {
  return (
    <input
      id={field.name}
      name={field.name}
      type={field.type}
      className="form-control"
      onChange={(e) => {
        formik.setFieldValue(field.name, e.target.files[0]);
      }}
      placeholder={field.placeholder}
    />
  );
};

export default FileInputElement;
