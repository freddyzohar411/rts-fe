import React, { useState } from "react";
import { Tooltip } from "reactstrap";
import { progressSteps } from "./JobOverviewConstants";
import { useEffect } from "react";
import { getMaxOrder } from "./JobOverviewUtil";
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
      let timelineStations = {};

      if (data?.timeline) {
        Object.values(data?.timeline)
          ?.sort((a, b) => b?.order - a?.order)
          ?.forEach((dt) => {
            timelineStations[dt?.order] = dt?.status;
          });
      }

      //Profile Status
      if (timelineStations) {
        let profileStatus = "";
        let isProfileStatusInprogress = true;
        if (timelineStations?.[5]) {
          profileStatus = timelineStations?.[5];
          isProfileStatusInprogress = false;
        } else if (timelineStations?.[4]) {
          profileStatus = timelineStations?.[4];
        } else if (timelineStations?.[3]) {
          profileStatus = timelineStations?.[3];
        } else if (timelineStations?.[2]) {
          profileStatus = timelineStations?.[2];
        } else if (timelineStations?.[1]) {
          profileStatus = timelineStations?.[1];
        }

        progressStatus["Profile"] = getProgressStatus(
          profileStatus,
          isProfileStatusInprogress
        );

        //Odin Status
        if (maxOrder > 5) {
          let odinStatus = "";
          let isOdinStatusInprogress = true;
          if (timelineStations?.[9]) {
            odinStatus = timelineStations?.[9];
            isOdinStatusInprogress = false;
          } else if (timelineStations?.[8]) {
            odinStatus = timelineStations?.[8];
          } else if (timelineStations?.[7]) {
            odinStatus = timelineStations?.[7];
          } else if (timelineStations?.[6]) {
            odinStatus = timelineStations?.[6];
          }
          progressStatus["Odin"] = getProgressStatus(
            odinStatus,
            isOdinStatusInprogress
          );
        }

        //Interviews Status
        if (maxOrder > 9) {
          let interviewsStatus = "";
          let isInterviewsStatusInprogress = true;
          if (timelineStations?.[13]) {
            interviewsStatus = timelineStations?.[13];
            isInterviewsStatusInprogress = false;
          } else if (timelineStations?.[12]) {
            interviewsStatus = timelineStations?.[12];
          } else if (timelineStations?.[11]) {
            interviewsStatus = timelineStations?.[11];
          } else if (timelineStations?.[10]) {
            interviewsStatus = timelineStations?.[10];
          }
          progressStatus["Interviews"] = getProgressStatus(
            interviewsStatus,
            isInterviewsStatusInprogress
          );
        }

        //TOS Status
        if (maxOrder > 13) {
          let tosStatus = "";
          let isTosStatusInprogress = true;
          if (timelineStations?.[15]) {
            tosStatus = timelineStations?.[15];
            isTosStatusInprogress = false;
          } else if (timelineStations?.[14]) {
            tosStatus = timelineStations?.[14];
          }
          progressStatus["TOS"] = getProgressStatus(
            tosStatus,
            isTosStatusInprogress
          );
        }

        //Conditional Offer Status
        if (maxOrder > 15) {
          let coStatus = "";
          let isCOStatusInprogress = true;
          if (timelineStations?.[17]) {
            coStatus = timelineStations?.[17];
            isCOStatusInprogress = false;
          } else if (timelineStations?.[16]) {
            coStatus = timelineStations?.[16];
          }
          progressStatus["Conditional Offer"] = getProgressStatus(
            coStatus,
            isCOStatusInprogress
          );
        }
        setProgressStatus(progressStatus);
      }
    }
  }, [data]);

  const getProgressStatus = (status, inprogresFlag) => {
    let response = "";
    if (
      (status !== JOB_STAGE_STATUS.REJECTED ||
        status !== JOB_STAGE_STATUS.WITHDRAWN ||
        status !== JOB_STAGE_STATUS.SKIPPED) &&
      inprogresFlag
    ) {
      response = JOB_STAGE_STATUS.IN_PROGRESS;
    } else {
      response = status;
    }
    return response;
  };

  // Get bollets border, text and background color
  const getBulletBgColor = (stepName) => {
    let customCSS;
    const status = progressStatus?.[stepName];
    switch (status) {
      case undefined:
        customCSS = "text-disabled bg-disabled border-disabled";
        break;
      case JOB_STAGE_STATUS_LABELS.IN_PROGRESS:
      case JOB_STAGE_STATUS.IN_PROGRESS:
        customCSS = "text-white bg-in-progress border-in-progress";
        break;
      case JOB_STAGE_STATUS.COMPLETED:
      case JOB_STAGE_STATUS_LABELS.COMPLETED:
        customCSS = "text-white bg-completed border-completed";
        break;
      case JOB_STAGE_STATUS.WITHDRAWN:
      case JOB_STAGE_STATUS.WITHDRAWN:
        customCSS = "text-white bg-withdrawn border-withdrawn";
        break;
      case JOB_STAGE_STATUS.REJECTED:
      case JOB_STAGE_STATUS.REJECTED:
        customCSS = "text-white bg-rejected border-rejected";
        break;
      case JOB_STAGE_STATUS.SKIPPED:
      case JOB_STAGE_STATUS.SKIPPED:
        customCSS = "text-white bg-skipped border-skipped";
        break;
      default:
        break;
    }
    return customCSS;
  };

  const GetLabel = (step, status) => {
    switch (status) {
      case JOB_STAGE_STATUS.COMPLETED:
      case JOB_STAGE_STATUS_LABELS.COMPLETED:
        return (
          <i className="ri-check-line ri-xl" style={{ color: "#ffffff" }}></i>
        );
      case JOB_STAGE_STATUS.WITHDRAWN:
      case JOB_STAGE_STATUS_LABELS.WITHDRAWN:
        return (
          <i
            className="ri-thumb-down-line ri-xl"
            style={{ color: "#ffffff" }}
          ></i>
        );
      case JOB_STAGE_STATUS.REJECTED:
      case JOB_STAGE_STATUS_LABELS.REJECTED:
        return (
          <i className="ri-close-fill ri-xl " style={{ color: "#ffffff" }}></i>
        );
      case JOB_STAGE_STATUS.SKIPPED:
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

  const getStatusValue = (status) => {
    switch (status) {
      case JOB_STAGE_STATUS.COMPLETED:
        return JOB_STAGE_STATUS_LABELS.COMPLETED;
      case JOB_STAGE_STATUS.WITHDRAWN:
        return JOB_STAGE_STATUS_LABELS.WITHDRAWN;
      case JOB_STAGE_STATUS.REJECTED:
        return JOB_STAGE_STATUS_LABELS.REJECTED;
      case JOB_STAGE_STATUS.SKIPPED:
        return JOB_STAGE_STATUS_LABELS.SKIPPED;
      case JOB_STAGE_STATUS.IN_PROGRESS:
        return JOB_STAGE_STATUS_LABELS.IN_PROGRESS;
      default:
        return "";
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
          const status = getStatusValue(progressStatus?.[step?.name]);
          return (
            <div
              key={index}
              className="d-flex align-items-center justify-content-center flex-column gap-2"
              id={`step-btn-${data?.candidate?.id}-${index}`}
            >
              <div
                className={`rounded-circle d-flex justify-content-center align-items-center circles-width ${getBulletBgColor(
                  step?.name
                )}`}
              >
                {GetLabel(step, status)}
              </div>
              <Tooltip
                isOpen={isStepToolTipOpen(
                  `step-btn-${data?.candidate?.id}-${index}`
                )}
                placement="top-start"
                target={`step-btn-${data?.candidate?.id}-${index}`}
                toggle={() =>
                  stepToggle(`step-btn-${data?.candidate?.id}-${index}`)
                }
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
