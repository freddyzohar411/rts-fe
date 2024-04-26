import React from "react";
import { Button } from "reactstrap";
import { MultiInputFormikNoBorder } from "@workspace/common";

const EmailTo = ({ formik }) => {
  return (
    <div className="d-flex align-items-start gap-2 ">
      <div
        style={{
          width: "40px",
        }}
      >
        <Button className="px-1 py-0">
          <i className="ri-mail-fill fs-5"></i>
        </Button>
      </div>
      <div className="d-flex gap-3 w-100">
        <span className="text-muted">To</span>
        <MultiInputFormikNoBorder
          name="to"
          formik={formik}
          placeholder=""
          containerWidth="100%"
          placeholderAlign="left"
        />
      </div>
    </div>
  );
};

export default EmailTo;
