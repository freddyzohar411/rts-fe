import React from "react";
import { Field } from "formik";
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
        <FormFeedback type="invalid">{props?.error}</FormFeedback>
      )}
    </div>
  );
};

export default FormSelection;
