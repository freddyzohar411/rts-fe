import React, { useState } from "react";
import { Progress, UncontrolledPopover, PopoverBody } from "reactstrap";
import Moment from "react-moment";
import InterviewPopUp from "../InterviewPopUp/InterviewPopUp";
import "./StepComponent.scss";
import {
  FIRST_INTERVIEW_SCHEDULED,
  INTERVIEWS,
  INTERVIEW_FEEDBACK_PENDING,
  SECOND_INTERVIEW_SCHEDULED,
  THIRD_INTERVIEW_SCHEDULED,
} from "./JobOverviewConstants";

function StepComponent({
  index,
  maxOrder,
  data,
  isRejected,
  candidateId,
  timeline,
  originalOrder,
  step,
}) {
  const [toggleInterview, setToggleInterview] = useState(false);
  const date = data?.date;
  const inProgress = maxOrder + 1;

  const getInterviewStatus = () => {
    let status = data?.status;
    if (step === INTERVIEWS && !status) {
      if (timeline?.[FIRST_INTERVIEW_SCHEDULED]) {
        status = timeline?.[FIRST_INTERVIEW_SCHEDULED]?.["status"];
      } else if (timeline?.[SECOND_INTERVIEW_SCHEDULED]) {
        status = timeline?.[SECOND_INTERVIEW_SCHEDULED]?.["status"];
      } else if (timeline?.[THIRD_INTERVIEW_SCHEDULED]) {
        status = timeline?.[THIRD_INTERVIEW_SCHEDULED]?.["status"];
      } else if (timeline?.[INTERVIEW_FEEDBACK_PENDING]) {
        status = timeline?.[INTERVIEW_FEEDBACK_PENDING]?.["status"];
      }
    }
    return status;
  };

  const status = getInterviewStatus();

  const getBulletBgColor = () => {
    let customCSS = "bg-primary border-light";
    switch (status) {
      case "COMPLETED":
        customCSS = "bg-success border-success";
        break;
      case "WITHDRAWN":
        customCSS = "bg-withdrawn border-withdrawn";
        break;
      case "REJECTED":
        customCSS = "bg-danger border-danger";
        break;
      case "SKIPPED":
        customCSS = "bg-gray border-gray";
        break;
      case "REJECTED":
        customCSS = "bg-danger border-danger";
        break;
      default:
        break;
    }
    return customCSS;
  };

  return (
    <React.Fragment>
      <div
        id={`Popover-${index}-${candidateId}`}
        className="step-component pt-2"
      >
        <div className="d-flex gap-2 flex-column justify-content-center align-items-center gap-1">
          <div className="d-flex flex-row justify-content-center align-items-center w-100">
            {/* Status {status} */}
            {index !== 0 ? (
              <Progress
                animated={false}
                value={0}
                style={{ height: "4px", width: "100%" }}
                className={`no-transition ${
                  index < inProgress
                    ? "bg-black border-black"
                    : "border-primary"
                }`}
              />
            ) : (
              <div style={{ height: "2px", width: "100%" }}></div>
            )}

            <div
              className={`rounded-pill border border-primary ${
                index === maxOrder && !isRejected
                  ? "bg-warning border-warning"
                  : getBulletBgColor()
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
              {index === 5 && (
                <span>
                  <i
                    className="ri-add-fill text-white fw-bold cursor-pointer"
                    onClick={() => {
                      setToggleInterview(!toggleInterview);
                    }}
                  ></i>
                </span>
              )}
            </div>
            {index !== 7 ? (
              <Progress
                animated={false}
                value={0}
                style={{ height: "4px", width: "100%" }}
                color="black"
                className={`no-transition ${
                  index < maxOrder ? "bg-black border-black" : "border-primary"
                }`}
              />
            ) : (
              <div style={{ height: "2px", width: "100%" }}></div>
            )}
          </div>
          {date && (
            <div className="d-flex flex-column align-items-center justify-content-center">
              <Moment format="DD/MM/YYYY">{date}</Moment>
            </div>
          )}
        </div>
      </div>
      {/* Interview Schedule Pop Up */}
      {index === 5 && (
        <UncontrolledPopover
          className="custom-popover"
          placement="bottom"
          isOpen={toggleInterview}
          target={`Popover-${index}-${candidateId}`}
          trigger="legacy"
          toggle={() => setToggleInterview(!toggleInterview)}
        >
          <PopoverBody>
            <InterviewPopUp
              index={index}
              timeline={timeline}
              maxOrder={maxOrder}
              originalOrder={originalOrder}
            />
          </PopoverBody>
        </UncontrolledPopover>
      )}
    </React.Fragment>
  );
}

export default StepComponent;
