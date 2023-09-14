import React from "react";
import { Field } from "formik";
import { Input, Label } from "reactstrap";
const FormInput = ({ name, ...props }) => {
  return (
    <div>
      {props?.label && (
        <Label className="form-label" htmlFor={props?.htmlFor ?? "input-field"}>
          {props?.label}
        </Label>
      )}
      <Field name={name}>
        {({ field }) => <Input {...field} {...props} />}
      </Field>
    </div>
  );
};

export default FormInput;
