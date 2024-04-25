import React from "react";
import { Button } from "reactstrap";
import { MultiInputFormikNoBorder } from "@workspace/common";

const EmailTo = ({ formik }) => {
  return (
    <div className="d-flex gap-3 align-items-start ">
      <Button className="px-1 py-0">
        <i className="ri-mail-fill fs-5"></i>
      </Button>
      <span className="text-muted">To</span>
      <MultiInputFormikNoBorder
        name="to"
        formik={formik}
        placeholder="Enter To"
        containerWidth="100%"
        placeholderAlign="left"
      />
    </div>
  );
};

export default EmailTo;
