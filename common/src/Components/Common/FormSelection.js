import React from "react";
import { Field, ErrorMessage } from "formik";
import { Label, FormFeedback } from "reactstrap";
import Select from "react-select";

const FormSelection = ({ name, ...props }) => {
  const isValid = !props?.error;

  const customStyles = {
    control: (base, state) => ({
      ...base,
      // state.isFocused can display different borderColor if you need it
      borderColor: state.isFocused ? "#8aaed6" : isValid ? "#8aaed6" : "red",
      // overwrittes hover style
      "&:hover": {
        borderColor: state.isFocused ? "#ddd" : isValid ? "#8aaed6" : "red",
      },
    }),
  };

  return (
    <div>
      {props?.label && (
        <Label className="form-label" htmlFor={props?.htmlFor ?? "input-field"}>
          {props?.label}
        </Label>
      )}
      <Field as="select" name={name}>
        {({ field }) => <Select styles={customStyles} {...field} {...props} />}
      </Field>
      {props?.error && (
        <ErrorMessage
          className="text-danger"
          name={name}
          component="span"
          style={{ fontSize: "11px", marginTop: "0.25rem" }}
        />
      )}
    </div>
  );
};

export default FormSelection;
