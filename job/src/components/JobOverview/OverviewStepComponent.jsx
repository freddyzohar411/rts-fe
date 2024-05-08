import React, { useState } from "react";
import { Tooltip } from "reactstrap";
import { progressSteps } from "./JobOverviewConstants";
import { useEffect } from "react";
import { getMaxOrder, getStatus } from "./JobOverviewUtil";
import {
  JOB_STAGE_STATUS,
  JOB_STAGE_STATUS_LABELS,
} from "../JobListing/JobListingConstants";
import "./OverviewStepComponent.scss";

/**
 * @author Rahul Sahu
 */
const OverviewStepComponent = ({ data }) => {
  const [stepTooltipIndexes, setStepTooltipIndexes] = useState();
  const [progressStatus, setProgressStatus] = useState({});

  useEffect(() => {
    if (data?.timeline) {
      let progressStatus = {};
      let maxOrder = getMaxOrder(data);
      const status = getStatus(data, maxOrder);
      const isRejected =
        status === JOB_STAGE_STATUS.REJECTED ||
        status === JOB_STAGE_STATUS.WITHDRAWN;

      //Profile Status
      if (maxOrder >= 1 && maxOrder <= 5) {
        progressStatus["Profile"] = !isRejected
          ? JOB_STAGE_STATUS_LABELS.IN_PROGRESS
          : status;
      }
      //Odin Status
      if (maxOrder >= 6 && maxOrder <= 9) {
        progressStatus["Profile"] = JOB_STAGE_STATUS_LABELS.COMPLETED;
        progressStatus["Odin"] = !isRejected
          ? JOB_STAGE_STATUS_LABELS.IN_PROGRESS
          : status;
      }

      //Interviews Status
      if (maxOrder >= 10 && maxOrder <= 13) {
        progressStatus["Profile"] = JOB_STAGE_STATUS_LABELS.COMPLETED;
        progressStatus["Odin"] = JOB_STAGE_STATUS_LABELS.COMPLETED;
        progressStatus["Interviews"] = !isRejected
          ? JOB_STAGE_STATUS_LABELS.IN_PROGRESS
          : status;
      }
      setProgressStatus(progressStatus);
    }
  }, [data]);

  // Get bollets border, text and background color
  const getBulletBgColor = (stepName) => {
    let customCSS;
    const status = progressStatus?.[stepName];
    switch (status) {
      case undefined:
        customCSS = "text-disabled bg-disabled border-disabled";
        break;
      case JOB_STAGE_STATUS_LABELS.IN_PROGRESS:
        customCSS = "text-white bg-in-progress border-in-progress";
        break;
      case JOB_STAGE_STATUS_LABELS.COMPLETED:
        customCSS = "text-white bg-completed border-completed";
        break;
      case JOB_STAGE_STATUS_LABELS.WITHDRAWN:
        customCSS = "text-white bg-withdrawn border-withdrawn";
        break;
      case JOB_STAGE_STATUS_LABELS.REJECTED:
        customCSS = "text-white bg-rejected border-rejected";
        break;
      case JOB_STAGE_STATUS_LABELS.SKIPPED:
        customCSS = "text-white bg-skipped border-skipped";
        break;
      default:
        break;
    }
    return customCSS;
  };

  const GetLabel = (step, status) => {
    switch (status) {
      case JOB_STAGE_STATUS_LABELS.COMPLETED:
        return (
          <i className="ri-check-line ri-xl" style={{ color: "#ffffff" }}></i>
        );
      case JOB_STAGE_STATUS_LABELS.WITHDRAWN:
        return (
          <i
            className="ri-thumb-down-line ri-xl"
            style={{ color: "#ffffff" }}
          ></i>
        );
      case JOB_STAGE_STATUS_LABELS.REJECTED:
        return (
          <i className="ri-close-fill ri-xl " style={{ color: "#ffffff" }}></i>
        );
      case JOB_STAGE_STATUS_LABELS.SKIPPED:
        return (
          <i
            className="las la-forward icon-10x"
            style={{ color: "#ffffff" }}
          ></i>
        );
      default:
        return <span className="fw-semibold">{step?.order}</span>;
    }
  };

  const isStepToolTipOpen = (targetName) => {
    return stepTooltipIndexes?.[targetName]
      ? stepTooltipIndexes?.[targetName]?.tooltipOpen
      : false;
  };

  const stepToggle = (targetName) => {
    if (!stepTooltipIndexes?.[targetName]) {
      setStepTooltipIndexes({
        ...stepTooltipIndexes,
        [targetName]: {
          tooltipOpen: true,
        },
      });
    } else {
      setStepTooltipIndexes({
        ...stepTooltipIndexes,
        [targetName]: {
          tooltipOpen: !stepTooltipIndexes?.[targetName]?.tooltipOpen,
        },
      });
    }
  };

  return (
    <div style={{ position: "relative" }} aria-disabled>
      <div
        className="mt-3"
        style={{
          position: "absolute",
          width: "100%",
          zIndex: "1",
          borderStyle: "dashed",
          borderWidth: "1px",
          borderColor: "lightgray",
        }}
      ></div>
      <div
        className="d-flex flex-row justify-content-between align-items-center"
        style={{ position: "relative", zIndex: "2" }}
      >
        {Object.values(progressSteps).map((step, index) => {
          const status = progressStatus?.[step?.name];
          return (
            <div
              key={index}
              className="d-flex align-items-center justify-content-center flex-column gap-2"
              id={`step-btn-${step?.order}-${index}`}
            >
              <div
                className={`rounded-circle d-flex justify-content-center align-items-center circles-width ${getBulletBgColor(
                  step?.name
                )}`}
              >
                {GetLabel(step, status)}
              </div>
              <Tooltip
                isOpen={isStepToolTipOpen(`step-btn-${step?.order}-${index}`)}
                placement="top-start"
                target={`step-btn-${step?.order}-${index}`}
                toggle={() => stepToggle(`step-btn-${step?.order}-${index}`)}
              >
                {step?.name}
                <br />
                {status}
              </Tooltip>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(OverviewStepComponent);
