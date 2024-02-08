import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fieldSize } from "./constant";

const AccountOwnerElement = ({ formik, field, formStateHook, ...props }) => {
  const data = useSelector((state) => state.AccountNamesReducer.accountById);

  useEffect(() => {
    if (data?.accountSubmissionData) {
      formik?.setFieldValue(
        field.name,
        data?.accountSubmissionData?.accountOwner ?? "NA"
      );
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
        value={data?.accountSubmissionData?.accountOwner ?? "NA"}
        placeholder={field?.placeholder}
        disabled={true}
      />
      {props?.error && (
        <FormFeedback type="invalid">{props?.error}</FormFeedback>
      )}
    </div>
  );
};

export default AccountOwnerElement;