import React, { useState, useRef, useEffect, createRef } from "react";
import {
  sections,
  innerTimelineSteps,
  innerTimelineOuterSteps,
  stepsToIgnore,
  expandedRange,
} from "./InnerTimelineStepConstants";
import {
  JOB_STAGE_STATUS,
  JOB_STAGE_STATUS_LABELS,
} from "../JobListing/JobListingConstants";
import "./InnerTimelineStep.scss";

const InnerTimelineStep = ({
  data,
  readOnlyActionTrigger,
  setTimelineRowIndex,
  dataIndex,
}) => {
  const containerNewRef = useRef(null);
  const timelineRef = useRef(null);
  const sectionRefs = useRef([]);
  const [noOfRows, setNoOfRows] = useState(0);
  const [rowDivs, setRowDivs] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [divWidth, setDivWidth] = useState("");
  const [elementSizing, setElementSizing] = useState("");
  const [bottomWidth, setBottomWidth] = useState(0);
  const [actionTriggeredWithSubitem, setActionTriggeredWithSubitem] =
    useState(null);

  useEffect(() => {
    if (actionTriggeredWithSubitem) {
      readOnlyActionTrigger(actionTriggeredWithSubitem);
    }
    setActionTriggeredWithSubitem(null);
  }, [actionTriggeredWithSubitem]);

  useEffect(() => {
    sectionRefs.current = sections.map(
      (_, i) => sectionRefs.current[i] ?? createRef()
    );
  }, [sections]);

  const timelineElement = document.getElementById("timeline-container");

  function calculateNoOfRows() {
    if (containerNewRef.current) {
      // get height of container
      const containerHeight = containerNewRef.current.clientHeight;
      // get height of each row
      const timelineModule = document.getElementById("item-timeline");
      const rowHeight = timelineModule.offsetHeight;
      // divide container height by row height to get number of rows
      const calculatedRows = Math.ceil(containerHeight / rowHeight);
      setNoOfRows(calculatedRows);
    }
  }

  useEffect(() => {
    calculateNoOfRows();
    const resizeObserver = new ResizeObserver(() => {
      calculateNoOfRows();
    });
    if (containerNewRef.current) {
      resizeObserver.observe(containerNewRef.current);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  function generateDivs(rows) {
    const divs = [];
    if (rows > 1) {
      for (let i = 0; i < rows - 1; i++) {
        if (i % 2) {
          // If the row is odd, add a dashed line with border radius on the left
          divs.push(
            <div
              className="mt-3"
              style={{
                border: "1px dashed lightgray",
                borderRadius: "60px 0 0 60px",
                left: "20px",
                height: "118px",
                top: `${i * 118}px`,
                width: bottomWidth ? `${bottomWidth}px` : "93%",
                position: "absolute",
                borderRight: "none",
                borderTop: "none",
              }}
            ></div>
          );
        } else {
          // If the row is even, add a dashed line with border radius on the right
          divs.push(
            <div
              className="mt-3"
              style={{
                border: "1px dashed lightgray",
                borderRadius: "0 60px 60px 0",
                left: "60px",
                height: "118px",
                top: `${i * 118}px`,
                width: "93%",
                position: "absolute",
                borderLeft: "none",
              }}
            ></div>
          );
        }
      }
    } else {
      // If only one row is there, add a single dashed line
      divs.push(<div className="mt-3 single-line"></div>);
    }
    return divs;
  }

  useEffect(() => {
    setRowDivs(generateDivs(noOfRows));
  }, [noOfRows]);

  const renderStyle = {
    COMPLETED: {
      icon: "mdi mdi-check",
      bgColor: "#10B967",
      color: "#FFFFFF",
    },
    WITHDRAWN: {
      icon: "mdi mdi-thumb-down-outline",
      bgColor: "#992EF2",
      color: "#FFFFFF",
    },
    REJECTED: {
      icon: "ri-close-line",
      bgColor: "#D90909",
      color: "#FFFFFF",
    },
    SKIPPED: {
      icon: "mdi mdi-fast-forward-outline",
      bgColor: "#868384",
      color: "#FFFFFF",
    },
    INPROGRESS: { icon: "", bgColor: "#0A56AE", color: "#FFFFFF" },
    NOTSTARTED: { icon: "", bgColor: "#F5B617", color: "#FFFFFF" },
  };

  const renderSectionStyle = (status) => {
    switch (status) {
      case "COMPLETED":
        return renderStyle.COMPLETED;
      case "WITHDRAWN":
        return renderStyle.WITHDRAWN;
      case "REJECTED":
        return renderStyle.REJECTED;
      case "SKIPPED":
        return renderStyle.SKIPPED;
      case "INPROGRESS":
      case "IN_PROGRESS":
        return renderStyle.INPROGRESS;
      default:
        return renderStyle.NOTSTARTED;
    }
  };

  useEffect(() => {
    const expandedTimeline = Object.values(expandedSections).includes(true);
    if (expandedTimeline) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  }, [expandedSections]);

  useEffect(() => {
    const timelineElement = document.getElementById("timeline-line");
    if (timelineElement && timelineElement.firstChild) {
      setDivWidth(`${timelineElement.firstChild.offsetWidth}px`);
      setElementSizing(`${timelineElement.firstChild.offsetWidth / 10}px`);
    }
  }, [timelineElement]);

  const getSubmittedDate = (items) => {
    let date = "Not Started";
    const firstItem =
      items?.sort((a, b) => b?.data?.order - a?.data?.order)?.[0] ?? {};
    if (firstItem?.data?.date) {
      date = new Date(firstItem?.data?.date).toLocaleDateString();
    }
    return date;
  };

  const getStatusValue = (data) => {
    switch (data?.status) {
      case JOB_STAGE_STATUS.COMPLETED:
      case JOB_STAGE_STATUS.WITHDRAWN:
      case JOB_STAGE_STATUS.REJECTED:
        return new Date(data?.date).toLocaleDateString();
      case JOB_STAGE_STATUS.SKIPPED:
        return JOB_STAGE_STATUS_LABELS.SKIPPED;
      case JOB_STAGE_STATUS.IN_PROGRESS:
        return JOB_STAGE_STATUS_LABELS.IN_PROGRESS;
      default:
        return "Not Started";
    }
  };

  // Get bollets border, text and background color
  const getBulletBgColor = (status) => {
    let customCSS;
    switch (status) {
      case "NOTSTARTED":
        customCSS = "text-notstarted bg-notstarted border-notstarted";
        break;
      case JOB_STAGE_STATUS.IN_PROGRESS:
      case JOB_STAGE_STATUS_LABELS.IN_PROGRESS:
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
    const renderSubitemStyle = renderSectionStyle(status);
    if (renderSubitemStyle?.icon?.length > 0) {
      return (
        <i
          className={renderSubitemStyle.icon}
          style={{ color: renderSubitemStyle?.color }}
        ></i>
      );
    } else {
      return <span className="fw-semibold">{step}</span>;
    }
  };

  const [expandedView, setexpandedView] = useState(
    innerTimelineSteps.map(() => false)
  );

  const toggleExpansion = (index) => {
    setexpandedView((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getOverallStatus = (data) => {
    const statuses = data.map((item) => item.data.status);

    if (statuses.length === 0) {
      return "NOTSTARTED";
    }

    const hasCompleted = statuses.includes("COMPLETED");
    const hasWithdrawn = statuses.includes("WITHDRAWN");
    const hasRejected = statuses.includes("REJECTED");
    const hasSkipped = statuses.includes("SKIPPED");
    const hasUndefinedOrNull =
      statuses.includes(undefined) || statuses.includes(null);

    if (
      hasCompleted &&
      !hasWithdrawn &&
      !hasRejected &&
      !hasSkipped &&
      !hasUndefinedOrNull
    ) {
      return "COMPLETED";
    }

    if (hasWithdrawn) {
      return "WITHDRAWN";
    }

    if (hasRejected) {
      return "REJECTED";
    }

    if (hasSkipped) {
      return "SKIPPED";
    }

    // If none of the above conditions match, return "In Progress"
    return "INPROGRESS";
  };

  const stepsData = innerTimelineSteps
    .filter((step) => {
      const stepName = step[Object.keys(step)[0]];
      return !stepsToIgnore.includes(stepName);
    })
    .map((step) => {
      const stepNumber = Object.keys(step)[0];
      const stepName = step[stepNumber];
      const stepData = data[stepName] || {};

      return {
        name: stepName,
        data: stepData,
      };
    });

  const getStepData = (stepName) => {
    const step = stepsData.find((item) => item.name === stepName);
    return step ? step.data : {};
  };

  const separateIntoRanges = (stepsData) => {
    const ranges = [
      { start: 0, end: 4 },
      { start: 5, end: 8 },
      { start: 9, end: 12 },
      { start: 13, end: 14 },
      { start: 15, end: 16 },
    ];

    return ranges.map((range) => stepsData.slice(range.start, range.end + 1));
  };

  const separatedData = separateIntoRanges(stepsData);

  const stepsWithStatus = separatedData.map((section) => {
    const status = getOverallStatus(section);
    return { ...section, status };
  });

  // For !isExpanded view > Single Row
  const [itemCount, setItemCount] = useState(0);
  useEffect(() => {
    setItemCount(innerTimelineOuterSteps.length);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <div className="py-2 w-100">
        <div id="timeline-line" ref={timelineRef}>
          {rowDivs}
        </div>
        <div
          id="container-new"
          ref={containerNewRef}
          class={`container ${itemCount <= 10 ? "single-row" : ""}`}
        >
          {innerTimelineSteps.map((step, index) => {
            const stepNumber = Object.keys(step)[0];
            const stepName = Object.values(step)[0];
            const stepData = getStepData(stepName);
            const renderStepStyle = renderSectionStyle(stepData?.status);

            const combinedStepsWithStatus = innerTimelineOuterSteps.map(
              (stepName, index) => {
                // Retrieving the first date of the submitted step.
                const firstSubmitted = stepsWithStatus[index]?.[0]?.data?.date;
                const statusDate = firstSubmitted
                  ? new Date(firstSubmitted).toLocaleDateString()
                  : "Not Started";
                const status = stepsWithStatus[index]?.status;
                return { stepName, status, statusDate };
              }
            );

            const hasWithdrawnOrRejected = combinedStepsWithStatus.some(
              (step) =>
                step.status === "WITHDRAWN" || step.status === "REJECTED"
            );
            const isWithDrawnOrRejected = combinedStepsWithStatus.find(
              (item) =>
                item.status === "WITHDRAWN" || item.status === "REJECTED"
            );
            const isDisabled = hasWithdrawnOrRejected;

            // Rendering the Main Step
            if (innerTimelineOuterSteps.includes(stepName)) {
              const matchingStep = combinedStepsWithStatus.find(
                (item) => item.stepName === stepName
              );

              const status = matchingStep ? matchingStep.status : null;
              const statusDate = matchingStep ? matchingStep.statusDate : null;
              const renderMainStepStyle = renderSectionStyle(status);

              // Check if the current step is the withdrawn or rejected step
              const isCurrentStepWithdrawnOrRejected =
                isWithDrawnOrRejected &&
                isWithDrawnOrRejected.stepName === stepName;

              // Check if the current step comes after the withdrawn or rejected step
              const isStepAfterWithdrawnOrRejected =
                isWithDrawnOrRejected &&
                innerTimelineOuterSteps.indexOf(stepName) >
                  innerTimelineOuterSteps.indexOf(
                    isWithDrawnOrRejected.stepName
                  );

              return (
                <div key={index} className="item" id="item-timeline">
                  <div className="general-alignment">
                    <div
                      className={`step-circle fw-semibold`}
                      style={{
                        backgroundColor: isCurrentStepWithdrawnOrRejected
                          ? renderMainStepStyle.bgColor
                          : isStepAfterWithdrawnOrRejected
                          ? "#DADADA"
                          : renderMainStepStyle.bgColor,
                        color: isCurrentStepWithdrawnOrRejected
                          ? renderMainStepStyle.color
                          : isStepAfterWithdrawnOrRejected
                          ? "#939393"
                          : renderMainStepStyle.color,
                        borderColor: isCurrentStepWithdrawnOrRejected
                          ? renderMainStepStyle.borderColor
                          : isStepAfterWithdrawnOrRejected
                          ? "#B7B7B7"
                          : renderMainStepStyle.borderColor,
                      }}
                    >
                      {renderMainStepStyle?.icon ? (
                        <span className={renderMainStepStyle.icon}></span>
                      ) : (
                        stepNumber
                      )}
                    </div>
                    <div
                      className="general-alignment"
                      onClick={() => setActionTriggeredWithSubitem(stepName)}
                    >
                      <span className="form-text">{statusDate}</span>
                      <span
                        className="step-title"
                        style={{
                          textDecoration: readOnlyActionTrigger(
                            stepName,
                            true,
                            dataIndex
                          )
                            ? "underline"
                            : "none",
                          color: readOnlyActionTrigger(
                            stepName,
                            true,
                            dataIndex
                          )
                            ? "#8A9AD0"
                            : "",
                        }}
                      >
                        {stepName}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }

            // Rendering the Expand/Collapse Button
            if (stepName === "Expand") {
              const isExpanded = expandedView[index];

              return (
                <div
                  key={index}
                  className="item align-items-top"
                  id="item-timeline"
                >
                  <div
                    className="step-circle"
                    onClick={
                      !isDisabled ? () => toggleExpansion(index) : undefined
                    }
                    style={{
                      backgroundColor: isDisabled
                        ? "#DADADA"
                        : isExpanded
                        ? "#000000"
                        : "#E3EFFF",
                      color: isDisabled
                        ? "#939393"
                        : isExpanded
                        ? "#FFFFFF"
                        : "#000000",
                      borderColor: isDisabled
                        ? "#B7B7B7"
                        : isExpanded
                        ? "#000000"
                        : "#0A56AE",
                      cursor: isDisabled ? "not-allowed" : "pointer",
                    }}
                  >
                    <span
                      className={`bx ${
                        isExpanded
                          ? "bx-collapse-horizontal"
                          : "bx-expand-horizontal"
                      }`}
                    ></span>
                  </div>
                </div>
              );
            }

            const isUnderCollapsedSection = Object.keys(expandedView).some(
              (key) => {
                const [start, end] = expandedRange[key] || [];
                return (
                  start <= index && index <= end && expandedView[key] === false
                );
              }
            );

            const isUnderCurrentExpandedSection = Object.keys(
              expandedView
            ).some((key) => {
              const [start, end] = expandedRange[key] || [];
              return (
                start <= index && index <= end && expandedView[key] === true
              );
            });

            if (isUnderCollapsedSection && !isUnderCurrentExpandedSection) {
              return null;
            }

            return (
              <div key={index} className="item" id="item-timeline">
                <div className="general-alignment">
                  <div
                    className="step-circle"
                    style={{
                      backgroundColor: renderStepStyle.bgColor,
                      color: renderStepStyle.color,
                    }}
                  >
                    {renderStepStyle.icon ? (
                      <span className={renderStepStyle.icon}></span>
                    ) : (
                      stepNumber
                    )}
                  </div>
                  <div className="general-alignment">
                    <span className="form-text">
                      {stepData.date
                        ? new Date(stepData.date).toLocaleDateString()
                        : "Not Started"}
                    </span>
                    <span
                      className={`step-title ${
                        readOnlyActionTrigger(stepName, true, dataIndex)
                          ? "cursor-pointer"
                          : ""
                      }`}
                      onClick={() => {
                        setActionTriggeredWithSubitem(stepName);
                        setTimelineRowIndex();
                      }}
                      style={{
                        textDecoration: readOnlyActionTrigger(
                          stepName,
                          true,
                          dataIndex
                        )
                          ? "underline"
                          : "none",
                        color: readOnlyActionTrigger(stepName, true, dataIndex)
                          ? "#8A9AD0"
                          : "",
                      }}
                    >
                      {stepName.split("/").join(" ")}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InnerTimelineStep;
