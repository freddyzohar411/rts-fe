import React from "react";
import { truncate } from "@workspace/common/src/helpers/string_helper";

function OffCanvasHeaderComponent({
  stepperState,
  formSubmissionData,
  activeStep,
  generateCanvasHeaderButton,
}) {
  return (
    <div
      className="offcanvas-header d-flex flex-row gap-4 align-items-center py-3"
      style={{
        border: "none",
        borderBottom: "1px solid #E7EAEE",
      }}
    >
      <div className="flex-grow-1 gap-3">
        <div className="d-flex gap-2 align-items-center mb-1">
          <span
            className="px-2 rounded-3"
            style={{
              backgroundColor: "#0A56AE",
              color: "#fff",
              paddingTop: "2px",
              paddingBottom: "2px",
            }}
          >
            {stepperState}
          </span>
          <span className="fw-bold fs-4">
            {formSubmissionData?.accountName}
          </span>
        </div>
        <div className="d-flex flex-row gap-2 align-items-center ms-1">
          <span
            className="fs-6 text-nowrap"
            style={{
              color: "#0A56AE",
            }}
          >
            Job ID - {formSubmissionData?.clientJobId}
          </span>
          <span
            style={{
              color: "#0A56AE",
            }}
          >
            |
          </span>
          <span
            className="fs-6 text-nowrap cursor-pointer"
            style={{
              color: "#0A56AE",
            }}
            title={formSubmissionData?.jobTitle}
          >
            Job Title - {truncate(formSubmissionData?.jobTitle, 55)}
          </span>
        </div>
      </div>
      {/* Canvas Header Button Add-on */}
      {generateCanvasHeaderButton(activeStep)}
    </div>
  );
}

export default OffCanvasHeaderComponent;
