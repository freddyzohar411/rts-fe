import React, { useState } from "react";
import { Button } from "reactstrap";
import { MultiInputFormikNoBorder } from "@workspace/common";

const EmailCCBCC = ({
  formik,
  CCicon,
  CcName = "cc",
  BCC = false,
  BccIcon,
  BccName = "bcc",
}) => {
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
              height: "28px",
              width: "28px",
              backgroundColor: "#F5F5F5",
              border: "1px solid #A8A8A8",
              color: "#7A7A7A",
            }}
          >
            {CCicon || <span>Cc</span>}
          </Button>
        </div>
        <div className="d-flex gap-3 w-100">
          <span className="text-muted">Cc</span>
          <MultiInputFormikNoBorder
            name={CcName}
            formik={formik}
            placeholder=""
            containerWidth="100%"
            placeholderAlign="left"
          />
          {!isBCCOpen && BCC && (
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
                  formik.setFieldValue(BccName, []);
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
                {BccIcon || <span>Bcc</span>}
              </Button>
            </div>
            <div className="d-flex gap-3 w-100">
              <span className="text-muted">BCc</span>
              <MultiInputFormikNoBorder
                name={BccName}
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
