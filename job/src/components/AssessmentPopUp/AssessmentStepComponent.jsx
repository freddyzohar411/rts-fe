import React from "react";
import { Progress } from "reactstrap";
import Moment from "react-moment";
import "../JobOverview/StepComponent.scss";
import { JOB_STAGE_STATUS } from "../JobListing/JobListingConstants";

function AssessmentStepComponent({ header, index, maxOrder, data }) {
  const date = data?.date;
  const status = data?.status;
  const isRejected =
    status === JOB_STAGE_STATUS.REJECTED ||
    status === JOB_STAGE_STATUS.WITHDRAWN;
  const inProgress = maxOrder + 1;

  const getBulletBgColor = () => {
    let customCSS = "bg-primary border-light";
    switch (status) {
      case "COMPLETED":
        customCSS = "bg-success border-success";
        break;
      case "IN_PROGRESS":
        customCSS = "bg-warning border-warning";
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
      <div className="d-flex flex-row text-center">
        <div className="d-flex flex-column gap-2">
          {/* Header */}
          <span style={{ height: "50%" }}>{header}</span>
          {/* Progress Bars and Step */}
          <div className="d-flex flex-row align-items-center justify-content-center m-0">
            {index !== 0 && (
              <Progress
                style={{ height: "1px", width: "100%" }}
                className={`no-transition ${
                  index < inProgress
                    ? "bg-black border-black"
                    : "border-primary"
                }`}
                value={0}
              />
            )}
            <div
              className={`rounded-pill border border-primary ${
                index === maxOrder && !isRejected
                  ? "bg-warning border-warning"
                  : getBulletBgColor()
              }`}
              style={{
                height: "18px",
                width: "18px",
                flexShrink: 0,
                flexGrow: 0,
                flexBasis: "auto",
              }}
            ></div>
            {index !== 3 && (
              <Progress
                style={{ height: "1px", width: "100%" }}
                className={`no-transition ${
                  index < maxOrder ? "bg-black border-black" : "border-primary"
                }`}
                color="black"
                value={0}
              />
            )}
          </div>
          {/* Date */}
          {date && (
            <div className="d-flex flex-column align-items-center justify-content-center">
              <Moment format="DD/MM/YYYY">{date}</Moment>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default AssessmentStepComponent;
