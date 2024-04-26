import React, { useState } from "react";
import { Button } from "reactstrap";
import { MultiInputFormikNoBorder } from "@workspace/common";

const EmailCCBCC = ({ formik }) => {
  const [isBCCOpen, setIsBCCOpen] = useState(false);
  return (
    <>
      <div className="d-flex align-items-start gap-2 ">
        <div
          style={{
            width: "40px",
          }}
        >
          <Button
            className="px-1 py-0"
            style={{
              height: "25px",
            }}
          >
            <span>Cc</span>
          </Button>
        </div>
        <div className="d-flex gap-3 w-100">
          <span className="text-muted">Cc</span>
          <MultiInputFormikNoBorder
            name="cc"
            formik={formik}
            placeholder=""
            containerWidth="100%"
            placeholderAlign="left"
          />
          {!isBCCOpen && (
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
          )}
        </div>
      </div>
      {isBCCOpen && (
        <>
          <hr className="mt-2" />
          <div className="d-flex align-items-start gap-2 mt-2">
            <div
              style={{
                width: "40px",
              }}
            >
              <Button className="px-1 py-0">
                <span>Bcc</span>
              </Button>
            </div>
            <div className="d-flex gap-3 w-100">
              <span className="text-muted">BCc</span>
              <MultiInputFormikNoBorder
                name="bcc"
                formik={formik}
                placeholder=""
                containerWidth="100%"
                placeholderAlign="left"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EmailCCBCC;
