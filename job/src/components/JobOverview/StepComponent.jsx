import React, { useState } from "react";
import { Progress, PopoverBody, Popover } from "reactstrap";
import Moment from "react-moment";
import InterviewPopUp from "../InterviewPopUp/InterviewPopUp";
import "./StepComponent.scss";
import {
  CODING_TEST,
  CULTURAL_FIT_TEST,
  FIRST_INTERVIEW_SCHEDULED,
  INTERVIEWS,
  INTERVIEW_FEEDBACK_PENDING,
  ODIN_PROTOCOL,
  SECOND_INTERVIEW_SCHEDULED,
  SKILLS_ASSESSMENT,
  TECHNICAL_INTERVIEW,
  THIRD_INTERVIEW_SCHEDULED,
} from "./JobOverviewConstants";
import AssessmentPopUp from "../AssessmentPopUp/AssessmentPopUp";

function StepComponent({
  index,
  maxOrder,
  data,
  isRejected,
  isInProgress,
  candidateId,
  timeline,
  originalOrder,
  step,
}) {
  const [toggleInterview, setToggleInterview] = useState(false);
  const [toggleAssessment, setToggleAssessment] = useState(false);
  const date = data?.date;
  const inProgress = maxOrder + 1;

  const getInterviewStatus = () => {
    let status = data?.status;
    if (step === ODIN_PROTOCOL && !status) {
      if (timeline?.[CULTURAL_FIT_TEST]) {
        status = timeline?.[CULTURAL_FIT_TEST]?.["status"];
      } else if (timeline?.[TECHNICAL_INTERVIEW]) {
        status = timeline?.[TECHNICAL_INTERVIEW]?.["status"];
      } else if (timeline?.[CODING_TEST]) {
        status = timeline?.[CODING_TEST]?.["status"];
      } else if (timeline?.[SKILLS_ASSESSMENT]) {
        status = timeline?.[SKILLS_ASSESSMENT]?.["status"];
      }
    } else if (step === INTERVIEWS && !status) {
      if (timeline?.[INTERVIEW_FEEDBACK_PENDING]) {
        status = timeline?.[INTERVIEW_FEEDBACK_PENDING]?.["status"];
      } else if (timeline?.[THIRD_INTERVIEW_SCHEDULED]) {
        status = timeline?.[THIRD_INTERVIEW_SCHEDULED]?.["status"];
      } else if (timeline?.[SECOND_INTERVIEW_SCHEDULED]) {
        status = timeline?.[SECOND_INTERVIEW_SCHEDULED]?.["status"];
      } else if (timeline?.[FIRST_INTERVIEW_SCHEDULED]) {
        status = timeline?.[FIRST_INTERVIEW_SCHEDULED]?.["status"];
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
                    id="assessment-popover"
                    className="ri-add-fill text-white fw-bold cursor-pointer"
                    onClick={() => {
                      setToggleAssessment(!toggleAssessment);
                    }}
                  ></i>
                </span>
              )}
              {index === 9 && (
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
            {index !== 11 ? (
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
      {/* Odin Protocol Pop Up */}
      {index === 5 && (
        <Popover
          className="custom-assessment-popover"
          target={`Popover-${index}-${candidateId}`}
          isOpen={toggleAssessment}
          toggle={() => setToggleAssessment(!toggleAssessment)}
          placement="bottom"
          trigger="legacy"
        >
          <PopoverBody>
            <AssessmentPopUp
              index={index}
              timeline={timeline}
              maxOrder={maxOrder}
              originalOrder={originalOrder}
            />
          </PopoverBody>
        </Popover>
      )}

      {/* Interview Schedule Pop Up */}
      {index === 9 && (
        <Popover
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
        </Popover>
      )}
    </React.Fragment>
  );
}

export default StepComponent;
