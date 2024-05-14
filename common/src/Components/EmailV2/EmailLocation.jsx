import React from "react";
import { Input } from "reactstrap";

const EmailLocation = ({ formik, name, disabled }) => {
  return (
    <div>
      <Input
        type="text"
        disabled={disabled}
        className="form-control location-input"
        style={{ border: "none" }}
        placeholder="Enter Location"
        name="location"
        value={formik?.values?.[name]}
        onChange={(event) => formik.setFieldValue(name, event.target.value)}
      />
    </div>
  );
};

export default EmailLocation;
