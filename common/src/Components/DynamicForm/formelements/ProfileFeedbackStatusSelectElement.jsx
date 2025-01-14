import React from "react";
import { candidateStatus, fieldLocation, fieldSize } from "./constant";

const ProfileFeedbackStatusSelectElement = ({
  formik,
  field,
  formStateHook,
  tabIndexData,
  ...props
}) => {
  const { formState } = formStateHook;

  return (
    <div>
      {props?.label && (
        <Label className="form-label" htmlFor={props?.htmlFor ?? "input-field"}>
          {props?.label}
        </Label>
      )}
      <div className={fieldLocation[field.fieldLocation]}>
        <select
          id={field.name}
          name={field.name}
          className={`form-select ${fieldSize[field.fieldSize]} ${
            formik?.values?.[field.name] === "" ||
            formik?.values?.[field.name] === undefined
              ? "text-muted"
              : ""
          }`}
          onChange={formik.handleChange}
          value={formik?.values?.[field.name]}
          placeholder={field.placeholder}
          disabled={formState === "view" ? true : false}
          tabIndex={tabIndexData?.[field?.fieldId]}
        >
          <option value="">{field.placeholder}</option>
          {candidateStatus?.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {props?.error && (
        <FormFeedback type="invalid">{props?.error}</FormFeedback>
      )}
    </div>
  );
};

export default ProfileFeedbackStatusSelectElement;
