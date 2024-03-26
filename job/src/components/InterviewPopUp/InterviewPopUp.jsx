import React from "react";
import InterviewStepComponent from "./InterviewStepComponent";

const InterviewPopUp = ({ index, timeline, maxOrder, originalOrder }) => {
  const stepHeaders = {
    "First Interview Scheduled": 11,
    "Second Interview Scheduled": 12,
    "Third Interview Scheduled": 13,
    "Interview Feedback Pending": 14,
  };

  return (
    <React.Fragment>
      <div className="d-flex">
        {Object.keys(stepHeaders).map((header, ind) => (
          <InterviewStepComponent
            key={ind}
            header={header}
            index={stepHeaders[header] - 1}
            maxOrder={originalOrder}
            data={timeline?.[header]}
          />
        ))}
      </div>
    </React.Fragment>
  );
};
export default InterviewPopUp;
