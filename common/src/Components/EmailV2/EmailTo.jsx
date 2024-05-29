import React, { useState } from "react";
import { Button } from "reactstrap";
import { MultiInputFormikNoBorder } from "@workspace/common";

const EmailTo = ({
  formik,
  ToIcon,
  ToName = "to",
  CC = false,
  CCIcon,
  CcName = "cc",
}) => {
  const [isCCOpen, setIsCCOpen] = useState(false);
  return (
    <>
      <div className="d-flex align-items-start gap-2 ">
        <div
          style={{
            width: "40px",
          }}
        >
          <Button
            className="d-flex justify-content-center align-items-center"
            style={{
              height: "30px",
              width: "30px",
              backgroundColor: "#F5F5F5",
              border: "1px solid #A8A8A8",
              color: "#7A7A7A",
            }}
          >
            {ToIcon || <span>To</span>}
          </Button>
        </div>
        <div className="d-flex gap-3 w-100">
          <span className="text-muted">To</span>
          <MultiInputFormikNoBorder
            name={ToName}
            formik={formik}
            placeholder=""
            containerWidth="100%"
            placeholderAlign="left"
          />
          {!isCCOpen && CC && (
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
                if (isCCOpen) {
                  formik.setFieldValue(CcName, []);
                  setIsCCOpen(false);
                } else {
                  setIsCCOpen(true);
                }
              }}
            >
              <span>CC</span>
              <span>{isCCOpen ? "-" : "+"}</span>
            </div>
          )}
        </div>
      </div>
      {isCCOpen && (
        <>
          <hr className="mt-2" />
          <div className="d-flex align-items-start gap-2 mt-2">
            <div
              style={{
                width: "40px",
              }}
            >
              <Button className="px-1 py-0">{CCIcon || <span>Cc</span>}</Button>
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
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EmailTo;
