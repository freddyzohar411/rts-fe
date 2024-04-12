import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fieldSize } from "./constant";

const AccountTypeElement = ({
  formik,
  field,
  formStateHook,
  tabIndexData,
  ...props
}) => {
  const data = useSelector((state) => state.AccountNamesReducer.accountById);

  useEffect(() => {
    if (data?.accountSubmissionData) {
      try {
        formik?.setFieldValue(
          field.name,
          data?.accountSubmissionData?.accountType ?? "NA"
        );
      } catch {}
    }
  }, [data]);

  return (
    <div>
      {props?.label && (
        <Label className="form-label" htmlFor={props?.htmlFor ?? "input-field"}>
          {props?.label}
        </Label>
      )}
      <input
        id={field.name}
        name={field.name}
        type={field.type}
        className={`form-control ${fieldSize[field?.fieldSize]}`}
        onChange={formik?.handleChange}
        value={data?.accountSubmissionData?.accountType ?? "NA"}
        placeholder={field?.placeholder}
        disabled={true}
        tabIndex={tabIndexData?.[field?.fieldId]}
      />
      {props?.error && (
        <FormFeedback type="invalid">{props?.error}</FormFeedback>
      )}
    </div>
  );
};

export default AccountTypeElement;
