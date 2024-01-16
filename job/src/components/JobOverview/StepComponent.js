import React, { useState, useEffect } from "react";
import { Progress, Popover, PopoverBody } from "reactstrap";
import InterviewPopUp from "../InterviewPopUp/InterviewPopUp";
import "./StepComponent.scss";

function StepComponent({ step, timelineState, index }) {
  const [startProgressBarValue, setStartProgressBarValue] = useState(0);
  const [endProgressBarValue, setEndProgressBarValue] = useState(0);
  const [toggleInterview, setToggleInterview] = useState(false);

  useEffect(() => {
    if (timelineState > index) {
      setStartProgressBarValue(100);
      setEndProgressBarValue(100);
    } else if (timelineState === index) {
      setStartProgressBarValue(100);
      setEndProgressBarValue(0);
    } else if (timelineState < index) {
      setStartProgressBarValue(0);
      setEndProgressBarValue(0);
    }
  }, [timelineState, index]);

  return (
    <React.Fragment>
      <div id={`Popover-${index}`} className="step-component pt-2">
        <div className="d-flex gap-2 flex-column justify-content-center align-items-center gap-1">
          {step && <span className="text-center">{step}</span>}
          <div className="d-flex flex-row justify-content-center align-items-center w-100">
            {index !== 0 ? (
              <Progress
                animated={false}
                value={startProgressBarValue}
                style={{ height: "1px", width: "100%" }}
                color="custom-button"
                className="no-transition"
              />
            ) : (
              <div style={{ height: "1px", width: "100%" }}></div>
            )}
            <div
              className={`rounded-pill border border-primary ${
                timelineState === index && "bg-warning border-light"
              } ${timelineState > index && "bg-primary border-light"}`}
              color="custom-button"
              style={{
                width: "18px",
                height: "18px",
                flexShrink: 0,
                flexGrow: 0,
                flexBasis: "auto",
              }}
              onClick={() => {
                setToggleInterview(!toggleInterview);
              }}
            >
              {index === 5 && (
                <span>
                  <i
                    className="ri-add-fill text-dark fw-bold cursor-pointer"
                    onClick={() => {
                      setToggleInterview(!toggleInterview);
                      console.log("clicked", toggleInterview);
                    }}
                  ></i>
                </span>
              )}
            </div>
            {index !== 7 ? (
              <Progress
                animated={false}
                value={endProgressBarValue}
                style={{ height: "1px", width: "100%" }}
                color="custom-button"
                className="no-transition"
              />
            ) : (
              <div style={{ height: "1px", width: "100%" }}></div>
            )}
          </div>
          <div className="d-flex flex-column align-items-center justify-content-center">
            <span>19/11/2023</span>
            <span>- (4)</span>
          </div>
        </div>
      </div>
      {/* Interview Schedule Pop Up */}
      {index === 5 && (
        <Popover
          className="custom-popover"
          placement="bottom"
          isOpen={toggleInterview}
          target={`Popover-${index}`}
          trigger="legacy"
          toggle={() => setToggleInterview(!toggleInterview)}
        >
          <PopoverBody>
            <InterviewPopUp />
          </PopoverBody>
        </Popover>
      )}
    </React.Fragment>
  );
}

export default StepComponent;
