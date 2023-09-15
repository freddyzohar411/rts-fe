import React from "react";
import { Field } from "formik";
import { Input, Label, FormFeedback } from "reactstrap";

const FormInput = ({ name, ...props }) => {
  return (
    <div>
      {props?.label && (
        <Label className="form-label" htmlFor={props?.htmlFor ?? "input-field"}>
          {props?.label}
        </Label>
      )}
      <Field name={name}>
        {({ field }) => (
          <Input
            {...field}
            {...props}
            className={`form-control ${props?.error ? "is-invalid" : ""}`}
          />
        )}
      </Field>
      {props?.error && (
        <FormFeedback type="invalid">{props?.error}</FormFeedback>
      )}
    </div>
  );
};

export default FormInput;
