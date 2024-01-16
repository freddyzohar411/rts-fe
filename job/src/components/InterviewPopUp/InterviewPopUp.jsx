import React, { useState, useEffect } from "react";
import { Progress } from "reactstrap";
import StepComponent from "../JobOverview/StepComponent";

const InterviewPopUp = ({ timelineState, step, setStep }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [stepperState, setStepperState] = useState("");
  useEffect(() => {
    switch (activeStep) {
      case 1:
        setStepperState("First Interview Scheduled");
        break;
      case 2:
        setStepperState("Second Interview Scheduled");
        break;

      case 3:
        setStepperState("Third Interview Scheduled");
        break;

      case 4:
        setStepperState("Interview Completed");
        break;
      default:
        setStepperState("");
    }
  }, [activeStep]);

  const steps = [
    "First Interview Scheduled",
    "Second Interview Scheduled",
    "Third Interview Scheduled",
    "Interview Completed",
  ];

  return (
    <React.Fragment>
      <div className="interview-popover">
        <div className="d-flex flex-row">
          {steps.map((step, index) => (
            <StepComponent
              key={index}
              step={step}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};
export default InterviewPopUp;
