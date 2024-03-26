import React from "react";
import AssessmentStepComponent from "./AssessmentStepComponent";

function AssessmentPopUp({ index, timeline, maxOrder, originalOrder }) {
  const stepHeaders = {
    "Skills Assessment": 5,
    "Coding Test": 6,
    "Technical Interview": 7,
    "Cultural Fit Test": 8,
  };

  return (
    <React.Fragment>
      <div className="d-flex">
        {Object.keys(stepHeaders).map((header, ind) => (
          <AssessmentStepComponent
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
}

export default AssessmentPopUp;
