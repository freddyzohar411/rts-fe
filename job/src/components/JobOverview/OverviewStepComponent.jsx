import React, { useState, useEffect } from "react";
import "./JobOverview.scss";
function OverviewStepComponent() {
  const stepStyles = [
    { icon: "bx bx-check", color: "green", status: "Completed" },
    { icon: "bx bx-x", color: "red", status: "Incomplete"},
    { icon: "mdi mdi-thumb-down-outline", color: "purple", status: "No Progress" },
    { icon: "mdi mdi-fast-forward-outline", color: "darkgray", status: "Skipped" },
  ];

  const stepType = [
    { 1: "Profile" },
    { 2: "Odin Protocol" },
    { 3: "Interviews" },
    { 4: "TOS" },
    { 5: "Conditional Offer" },
  ];

  const [tooltipOpen, setTooltipOpen] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <div>
        <div
          className="mt-3"
          style={{
            position: "absolute",
            width: "100%",
            zIndex: "1",
            borderStyle: "dashed",
            borderWidth: "1px",
            borderColor: "lightgray",
          }}
        ></div>
        <div
          className="d-flex flex-row justify-content-between align-items-center"
          style={{ position: "relative", zIndex: "2" }}
        >
          {Object.values(stepType).map((step, index) => {
            return (
              <div
                className="rounded-circle bg-white d-flex justify-content-center align-items-center"
                style={{
                  width: "30px",
                  height: "30px",
                  border: "1px solid #0A56AE",
                }}
              >
                <span className="fw-semibold" style={{ color: "#0A56AE" }}>
                  {index + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default OverviewStepComponent;
