import React from "react";
import { Field } from "formik";
import { Label } from "reactstrap";
import Select from "react-select";

const FormSelection = ({ name, ...props }) => {
  return (
    <div>
      {props?.label && (
        <Label className="form-label" htmlFor={props?.htmlFor ?? "input-field"}>
          {props?.label}
        </Label>
      )}
      <Field name={name}>
        {({ field }) => <Select {...field} {...props} />}
      </Field>
    </div>
  );
};

export default FormSelection;
