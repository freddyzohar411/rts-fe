import React, { useState, useEffect } from "react";
import { Progress } from "reactstrap";
function InterviewStepComponent({ header, currentStep, index }) {
  const [startProgressBarValue, setStartProgressBarValue] = useState(0);
  const [endProgressBarValue, setEndProgressBarValue] = useState(0);

  useEffect(() => {
    if (currentStep > index) {
        setStartProgressBarValue(100);
        setEndProgressBarValue(100);
      } else if (currentStep === index) {
        setStartProgressBarValue(100);
        setEndProgressBarValue(0);
      } else if (currentStep < index) {
        setStartProgressBarValue(0);
        setEndProgressBarValue(0);
      }
  }, [currentStep, index]);

  return (
    <React.Fragment>
      <div className="d-flex flex-row text-center">
        <div className="d-flex flex-column gap-2">
          {/* Header */}
          <span>{header}</span>
          {/* Progress Bars and Step */}
          <div className="d-flex flex-row align-items-center justify-content-center m-0">
            {index !== 0 ? (
              <Progress
                style={{ height: "1px", width: "100%" }}
                color="bg-secondary"
                value={startProgressBarValue}
              />
            ) : (
              <div style={{ height: "1px", width: "100%" }}></div>
            )}

            <div
              className={`rounded-pill border border-primary ${
                currentStep === index && "bg-primary border-light"
              } ${currentStep > index && "bg-primary border-light"}`}
              style={{
                height: "18px",
                width: "18px",
                flexShrink: 0,
                flexGrow: 0,
                flexBasis: "auto",
              }}
            ></div>
            {index !== 3 ? (
              <Progress
                style={{ height: "1px", width: "100%" }}
                color="bg-secondary"
                value={endProgressBarValue}
              />
            ) : (
              <div style={{ height: "1px", width: "100%" }}></div>
            )}
          </div>
          {/* Date */}
          <span>11/01/2024</span>
        </div>
      </div>
    </React.Fragment>
  );
}

export default InterviewStepComponent;
