import React, { useState, useEffect } from "react";
import { Progress, Row, Col } from "reactstrap";

function BSGStepComponent({ step, index, timelineState }) {
  const [startProgressBarValue, setStartProgressBarValue] = useState(0);
  const [endProgressBarValue, setEndProgressBarValue] = useState(0);
  useEffect(() => {
    if (timelineState > index) {
      setStartProgressBarValue(100);
      setEndProgressBarValue(100);
    } else if (timelineState === index) {
      setStartProgressBarValue(100);
      setEndProgressBarValue(0);
    } else if ((timelineState < index) || (timelineState === null)) {
      setStartProgressBarValue(0);
      setEndProgressBarValue(0);
    }
  }, [timelineState, index]);

  return (
    <React.Fragment>
      <div className="step-component pt-2">
        <div className="d-flex gap-2 flex-column justify-content-center align-items-center gap-1">
          <div className="d-flex flex-row justify-content-center align-items-center w-100">
            {index !== 0 ? (
              <Progress
                animated={false}
                value={startProgressBarValue}
                style={{ height: "2px", width: "100%" }}
                color="black"
                className="no-transition"
              />
            ) : (
              <div style={{ height: "2px", width: "100%" }}></div>
            )}
            <div
              className={`d-flex justify-content-center align-items-center cursor-pointer rounded-pill border border-primary ${
                timelineState === index
                  ? "bg-black border-black"
                  : "bg-light border-primary"
              }`}
              color="custom-button"
              style={{
                width: "18px",
                height: "18px",
                flexShrink: 0,
                flexGrow: 0,
                flexBasis: "auto",
              }}
            >
              <span>+</span>
            </div>
            {index !== 8 ? (
              <Progress
                animated={false}
                value={endProgressBarValue}
                style={{ height: "2px", width: "100%" }}
                color="black"
              />
            ) : (
              <div style={{ height: "2px", width: "100%" }}></div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default BSGStepComponent;
