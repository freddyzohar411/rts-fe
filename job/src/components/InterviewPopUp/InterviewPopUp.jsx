import React from "react";
import InterviewStepComponent from "./InterviewStepComponent";

const InterviewPopUp = ({ currentStep }) => {
  const stepHeaders = [
    "First Interview Scheduled",
    "Second Interview Scheduled",
    "Third Interview Scheduled",
    "Interview Feedback Pending",
  ];
  
  return (
    <React.Fragment>
      <div className="d-flex">
        {stepHeaders.map((header, index) => (
          <InterviewStepComponent
            header={header}
            index={index}
            currentStep={currentStep}
          />
        ))}
      </div>
    </React.Fragment>
  );
};
export default InterviewPopUp;
