import React, { useState } from "react";
import { Button } from "reactstrap";
import { MultiInputFormikNoBorder } from "@workspace/common";

const EmailCCBCC = ({ formik }) => {
  const [isBCCOpen, setIsBCCOpen] = useState(false);
  return (
    <>
      <div className="d-flex gap-3 align-items-start ">
        <Button
          className="px-1 py-0"
          style={{
            height: "25px",
          }}
        >
          {/* <i className="ri-mail-fill fs-5"></i> */}
          <span>Cc</span>
        </Button>
        {/* <span className="text-muted">Cc</span> */}
        <MultiInputFormikNoBorder
          name="cc"
          formik={formik}
          placeholder="Cc"
          containerWidth="100%"
          placeholderAlign="left"
        />
        <div
          className="px-2 py-1 d-flex gap-1 align-items-center cursor-pointer fw-semibold"
          style={{
            borderRadius: "8px",
            backgroundColor: "#F9F5FF",
            color: "#6941C6",
            border: "1px solid #E9D7FE",
            height: "25px",
          }}
          onClick={() => {
            if (isBCCOpen) {
              formik.setFieldValue("bcc", []);
              setIsBCCOpen(false);
            } else {
              setIsBCCOpen(true);
            }
          }}
        >
          <span>BCC</span>
          <span>{isBCCOpen ? "-" : "+"}</span>
        </div>
      </div>
      {isBCCOpen && (
        <div className="d-flex gap-3 align-items-start mt-2">
          <Button
            className="px-1 py-0"
            style={{
              height: "25px",
            }}
          >
            {/* <i className="ri-mail-fill fs-5"></i> */}
            <span>Bcc</span>
          </Button>
          {/* <span className="text-muted">BCc</span> */}
          <MultiInputFormikNoBorder
            name="bcc"
            formik={formik}
            placeholder="Bcc"
            containerWidth="100%"
            placeholderAlign="left"
          />
        </div>
      )}
    </>
  );
};

export default EmailCCBCC;
