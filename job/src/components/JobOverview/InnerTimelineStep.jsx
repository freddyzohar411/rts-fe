import React, { useState, useRef, useEffect, createRef, useMemo } from "react";
import {
  sections,
  innerTimelineSteps,
  innerTimelineOuterSteps,
  stepsToIgnore,
  expandedRange,
  innerTimelineMainIndexes,
  innerTimelineExpandCollapseIndexes,
} from "./InnerTimelineStepConstants";
import {
  JOB_STAGE_STATUS,
  JOB_STAGE_STATUS_LABELS,
} from "../JobListing/JobListingConstants";
import "./InnerTimelineStep.scss";
import useDebounce from "./useDebounce";

const InnerTimelineStep = ({
  data,
  readOnlyActionTrigger,
  setTimelineRowIndex,
  dataIndex,
}) => {
  const containerNewRef = useRef(null);
  const timelineRef = useRef(null);
  const sectionRefs = useRef([]);
  const [noOfRows, setNoOfRows] = useState(1);
  const debouncedNoOfRows = useDebounce(noOfRows, 400);

  const [rowDivs, setRowDivs] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [indexRanges, setIndexRanges] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [divWidth, setDivWidth] = useState("");
  const [elementSizing, setElementSizing] = useState("");
  const [bottomWidth, setBottomWidth] = useState(0);
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [innerTimelineSteppers, setInnerTimelineSteppers] =
    useState(innerTimelineSteps);
  const [defaultTimeline, setDefaultTimeline] = useState(innerTimelineSteppers);
  const [actionTriggeredWithSubitem, setActionTriggeredWithSubitem] =
    useState(null);
  const innerTimelineSteppersRef = useRef(innerTimelineSteppers);

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
      borderColor: "#10B967",
    },
    WITHDRAWN: {
      icon: "mdi mdi-thumb-down-outline",
      bgColor: "#992EF2",
      color: "#FFFFFF",
      borderColor: "#992EF2",
    },
    REJECTED: {
      icon: "ri-close-line",
      bgColor: "#D90909",
      color: "#FFFFFF",
      borderColor: "#D90909",
    },
    SKIPPED: {
      icon: "mdi mdi-fast-forward-outline",
      bgColor: "#868384",
      color: "#FFFFFF",
      borderColor: "#868384",
    },
    INPROGRESS: {
      icon: "",
      bgColor: "#0A56AE",
      color: "#FFFFFF",
      borderColor: "#0A56AE",
    },
    NOTSTARTED: {
      icon: "",
      bgColor: "#FFFFFF",
      color: "#0A56AE",
      borderColor: "#0A56AE",
    },
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
      case JOB_STAGE_STATUS.INPROGRESS:
      case JOB_STAGE_STATUS_LABELS.INPROGRESS:
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

  // Bad Case Data
  const [badCaseData, setBadCaseData] = useState([]);
  useEffect(() => {
    const stepBadCaseIndex = innerTimelineSteps.findIndex((step) => {
      const stepName = Object.values(step)[0];
      const stepData = getStepData(stepName);
      return (
        stepData?.status === "WITHDRAWN" || stepData?.status === "REJECTED"
      );
    });
    if (stepBadCaseIndex > -1) {
      const stepBadCase = innerTimelineSteps[stepBadCaseIndex];
      const stepBadCaseData = getStepData(Object.values(stepBadCase)[0]);
      const stepBadCaseInfo = [stepBadCaseIndex, stepBadCaseData];
      setBadCaseData(stepBadCaseInfo);
    }
  }, []);

  // Splice data array to add new item after the withdrawn/rejected step
  useEffect(() => {
    const removeBetweenBadCaseAndNextOuter = (array, outerArray) => {
      const badCaseIndex = array.findIndex((item) => item["Bad Case"]);
      if (badCaseIndex === -1) return array;

      const nextOuterIndex = array.findIndex((item, index) => {
        if (index <= badCaseIndex) return false;
        const key = Object.values(item)[0];
        return outerArray.includes(key);
      });
      if (nextOuterIndex === -1) return array;
      // Remove elements between badCaseIndex and nextOuterIndex
      return [
        ...array.slice(0, badCaseIndex + 1),
        ...array.slice(nextOuterIndex),
      ];
    };

    if (badCaseData.length !== 0) {
      const newTimeline = [...innerTimelineSteps];
      if (badCaseData[1].status === "WITHDRAWN") {
        newTimeline.splice(badCaseData[0] + 1, 0, {
          "Bad Case": "Candidate Withdrawn",
        });
        const withdrawnTimeline = removeBetweenBadCaseAndNextOuter(
          newTimeline,
          innerTimelineOuterSteps
        );
        setInnerTimelineSteppers(withdrawnTimeline);
        setDefaultTimeline(withdrawnTimeline);
      } else if (badCaseData[1].status === "REJECTED") {
        newTimeline.splice(badCaseData[0] + 1, 0, {
          "Bad Case": "Candidate Rejected",
        });
        const rejectedTimeline = removeBetweenBadCaseAndNextOuter(
          newTimeline,
          innerTimelineOuterSteps
        );
        setInnerTimelineSteppers(rejectedTimeline);
        setDefaultTimeline(rejectedTimeline);
      }
    }
  }, [badCaseData]);

  const getBadCaseExpand = (arr, index) => {
    if (index <= 0) return null;
    for (let i = index - 1; i >= 0; i--) {
      const obj = arr[i];
      const values = Object.values(obj);
      if (
        values.some(
          (value) => typeof value === "string" && value.includes("Expand")
        )
      ) {
        return values[0];
      }
    }
    return null;
  };

  const [expandedView, setExpandedView] = useState(
    innerTimelineSteps.map(() => false)
  );

  const toggleExpansion = (index) => {
    setExpandedView((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getRangesAfterExpand = (timeline, outerSteps) => {
    const result = {};
    const expandIndexes = {};

    // Find indexes of all "Expand" steps
    timeline.forEach((item, index) => {
      const stepName = Object.values(item)[0];
      if (stepName.startsWith("Expand")) {
        expandIndexes[stepName] = index;
      }
    });

    // Calculate ranges after each "Expand" step
    Object.keys(expandIndexes).forEach((expandStep) => {
      const currentExpandIndex = expandIndexes[expandStep];
      let nextOuterIndex = timeline.length;

      // Find the next outer step index
      for (let i = currentExpandIndex + 1; i < timeline.length; i++) {
        const stepName = Object.values(timeline[i])[0];
        if (outerSteps.includes(stepName)) {
          nextOuterIndex = i;
          break;
        }
      }

      // Store the range for this expand step
      result[currentExpandIndex] = [currentExpandIndex + 1, nextOuterIndex - 1];
    });

    return result;
  };

  useEffect(() => {
    setIndexRanges(
      getRangesAfterExpand(innerTimelineSteppers, innerTimelineOuterSteps)
    );
  }, [innerTimelineSteppers.length]);

  const getIndexesUnderCurrentExpandedSection = () => {
    let indexes = [];
    Object.keys(expandedView).forEach((key) => {
      const [start, end] = indexRanges[key] || [];
      for (let i = start; i <= end; i++) {
        if (expandedView[key] === true) {
          indexes.push(i);
        }
      }
    });
    return indexes;
  };

  const expandedSectionIndexes = getIndexesUnderCurrentExpandedSection();

  const getMainIndexes = (outerSteps, timelineSteps) => {
    const indexes = [];

    timelineSteps.forEach((step, index) => {
      const stepName = Object.values(step)[0];
      if (outerSteps.includes(stepName)) {
        indexes.push(index);
      }
    });

    return indexes;
  };
  const getExpandStepIndexes = (timelineSteps) => {
    const indexes = [];

    timelineSteps.forEach((step, index) => {
      const stepName = Object.values(step)[0];
      if (stepName.includes("Expand")) {
        indexes.push(index);
      }
    });

    return indexes;
  };
  const mainIndexes = getMainIndexes(
    innerTimelineOuterSteps,
    innerTimelineSteppers
  );
  const expandedStepsIndexes = getExpandStepIndexes(innerTimelineSteppers);
  const combinedIndexes = [
    ...mainIndexes,
    ...expandedStepsIndexes,
    ...expandedSectionIndexes,
  ];
  const sortedCombinedIndexes = [...new Set(combinedIndexes)].sort(
    (a, b) => a - b
  );
  const indexesInnerTimeline = sortedCombinedIndexes.map(
    (index) => innerTimelineSteppers[index]
  );

  useEffect(() => {
    if (debouncedNoOfRows === 1 || expandedSectionIndexes.length === 0) {
      setInnerTimelineSteppers(defaultTimeline);
    } else if (debouncedNoOfRows === 2) {
      setInnerTimelineSteppers(defaultTimeline);
      const newTimeline = [...defaultTimeline];
      const ninthIndex = indexesInnerTimeline[8];
      const ninthIndexSteppers = defaultTimeline.findIndex(
        (item) => item === ninthIndex
      );
      newTimeline.splice(ninthIndexSteppers + 1, 0, {
        topRightCurve: "topRightCurve",
      });
      newTimeline.splice(ninthIndexSteppers + 2, 0, {
        bottomRightCurve: "bottomRightCurve",
      });
      setInnerTimelineSteppers(newTimeline);
    } else if (debouncedNoOfRows === 3) {
      setInnerTimelineSteppers(defaultTimeline);
      const newTimeline = [...defaultTimeline];
      const ninthIndex = indexesInnerTimeline[8];
      const ninthIndexSteppers = defaultTimeline.findIndex(
        (item) => item === ninthIndex
      );
      newTimeline.splice(ninthIndexSteppers + 1, 0, {
        topRightCurve: "topRightCurve",
      });
      newTimeline.splice(ninthIndexSteppers + 2, 0, {
        bottomRightCurve: "bottomRightCurve",
      });

      const ninteenthIndex = indexesInnerTimeline[18];
      const ninteenthIndexSteppers = newTimeline.findIndex(
        (item) => item === ninteenthIndex
      );
      newTimeline.splice(ninteenthIndexSteppers + 1, 0, {
        topLeftCurve: "topLeftCurve",
      });
      newTimeline.splice(ninteenthIndexSteppers + 2, 0, {
        bottomLeftCurve: "bottomLeftCurve",
      });
      setInnerTimelineSteppers(newTimeline);
    } else if (debouncedNoOfRows === 4) {
      setInnerTimelineSteppers(defaultTimeline);
      const newTimeline = [...defaultTimeline];
      const ninthIndex = indexesInnerTimeline[8];
      const ninthIndexSteppers = defaultTimeline.findIndex(
        (item) => item === ninthIndex
      );
      newTimeline.splice(ninthIndexSteppers + 1, 0, {
        topRightCurve: "topRightCurve",
      });
      newTimeline.splice(ninthIndexSteppers + 2, 0, {
        bottomRightCurve: "bottomRightCurve",
      });

      const ninteenthIndex = indexesInnerTimeline[18];
      const ninteenthIndexSteppers = newTimeline.findIndex(
        (item) => item === ninteenthIndex
      );
      newTimeline.splice(ninteenthIndexSteppers + 1, 0, {
        topLeftCurve: "topLeftCurve",
      });
      newTimeline.splice(ninteenthIndexSteppers + 2, 0, {
        bottomLeftCurve: "bottomLeftCurve",
      });

      const twentyNinthIndex = indexesInnerTimeline[28];
      const twentyNinthIndexSteppers = newTimeline.findIndex(
        (item) => item === twentyNinthIndex
      );
      newTimeline.splice(twentyNinthIndexSteppers + 1, 0, {
        topRightCurve: "topRightCurve",
      });
      newTimeline.splice(twentyNinthIndexSteppers + 2, 0, {
        bottomRightCurve: "bottomRightCurve",
      });
      setInnerTimelineSteppers(newTimeline);
    }
  }, [debouncedNoOfRows, expandedSectionIndexes.length]);

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

  const stepsData = innerTimelineSteppers
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

  // Need to check for no of rows.
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
    <div style={{ position: "relative", marginTop: "-40px" }}>
      <div className="py-2 w-100">
        <div
          id="container-new"
          ref={containerNewRef}
          class={`container ${itemCount <= 10 ? "single-row" : ""}`}
        >
          {innerTimelineSteppers.map((step, index) => {
            const stepNumber = Object.keys(step)[0];
            const stepName = Object.values(step)[0];
            const stepData = getStepData(stepName);
            const renderStepStyle = renderSectionStyle(stepData?.status);

            const combinedStepsWithStatus = innerTimelineOuterSteps.map(
              (stepName, index) => {
                // Retrieving the first date of the submitted step.
                const firstSubmitted = stepsWithStatus[index]?.[0]?.data?.date;
                const statusDate = firstSubmitted
                  ? new Date(firstSubmitted).toLocaleString()
                  : "Not Started";
                const status = stepsWithStatus[index]?.status;
                return { stepName, status, statusDate };
              }
            );

            const isWithDrawnOrRejected = combinedStepsWithStatus.find(
              (item) =>
                item.status === "WITHDRAWN" || item.status === "REJECTED"
            );

            const withdrawnOrRejectedIndex = combinedStepsWithStatus.findIndex(
              (item) =>
                item.status === "WITHDRAWN" || item.status === "REJECTED"
            );

            const expandedRangeKeys = Object.keys(indexRanges)
              .map(Number)
              .sort((a, b) => a - b);
            let withdrawnKey = null;

            if (withdrawnOrRejectedIndex > -1) {
              for (let i = 0; i < expandedRangeKeys.length; i++) {
                if (
                  expandedRangeKeys[withdrawnOrRejectedIndex] >
                  withdrawnOrRejectedIndex
                ) {
                  withdrawnKey = expandedRangeKeys[withdrawnOrRejectedIndex];
                  break;
                }
              }
            }

            const getObj = (array, name) => {
              return array.find((obj) => {
                return Object.values(obj).some(
                  (innerObj) => innerObj.name === name
                );
              });
            };

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
                  <div className="main-step-alignment">
                    <div className="expand-col">
                      <div
                        className="d-flex flex-column align-items-start"
                        style={{ width: "100%" }}
                      >
                        <div className="step-info-area">
                          <span
                            className="step-title"
                            style={{
                              whiteSpace: "nowrap",
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
                          <span className="step-datetime">
                            {statusDate ? statusDate : "Not Started"}
                          </span>
                        </div>
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ width: "100%" }}
                        >
                          <div
                            className="main-progress-line"
                            style={
                              index === 0
                                ? { borderColor: "transparent" }
                                : {
                                    borderColor:
                                      isCurrentStepWithdrawnOrRejected
                                        ? renderMainStepStyle.bgColor
                                        : isStepAfterWithdrawnOrRejected
                                        ? "#DADADA"
                                        : renderMainStepStyle.bgColor,
                                  }
                            }
                          ></div>
                          <div
                            className={`outer-main-circle`}
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
                            <div
                              className={`inner-main-circle fw-semibold`}
                              style={{
                                backgroundColor:
                                  isCurrentStepWithdrawnOrRejected
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
                                  ? "#FFF"
                                  : isStepAfterWithdrawnOrRejected
                                  ? "#B7B7B7"
                                  : "#FFF",
                              }}
                            >
                              {renderMainStepStyle?.icon ? (
                                <span
                                  className={renderMainStepStyle.icon}
                                ></span>
                              ) : (
                                stepNumber
                              )}
                            </div>
                          </div>
                          <div
                            className="main-progress-line"
                            style={{
                              borderColor: isCurrentStepWithdrawnOrRejected
                                ? renderMainStepStyle.bgColor
                                : isStepAfterWithdrawnOrRejected
                                ? "#DADADA"
                                : renderMainStepStyle.bgColor,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // Rendering the Expand/Collapse Button
            if (stepName.includes("Expand")) {
              const isExpanded = expandedView[index];

              const isDisabled =
                withdrawnKey !== null && index > withdrawnKey + 1;

              // Retrieving color for expanded lines
              const stepNameAfterExpand = Object.values(
                innerTimelineSteppers[index + 1]
              )[0];

              const expandedStatus = getObj(
                stepsWithStatus,
                stepNameAfterExpand
              );
              let renderStepStyle = renderSectionStyle("INPROGRESS");
              if (expandedStatus !== undefined) {
                renderStepStyle = renderSectionStyle(expandedStatus.status);
              }

              return (
                <div key={index} className="item" id="item-timeline">
                  <div className="alignment-1">
                    <div className="alignment-2">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          width: "100%",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          height: "30px",
                        }}
                      >
                        <div
                          className="main-progress-line"
                          style={{
                            borderColor: isDisabled
                              ? "#DADADA"
                              : renderStepStyle.borderColor,
                          }}
                        ></div>
                        <div
                          className="step-circle"
                          onClick={
                            !isDisabled
                              ? () => toggleExpansion(index)
                              : undefined
                          }
                          style={{
                            backgroundColor: isDisabled
                              ? "#DADADA"
                              : isExpanded
                              ? "#E3EFFF"
                              : "#000000",
                            color: isDisabled
                              ? "#939393"
                              : isExpanded
                              ? "#000000"
                              : "#FFFFFF",
                            borderColor: isDisabled
                              ? "#B7B7B7"
                              : isExpanded
                              ? "#0A56AE"
                              : "#000000",
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
                        <div
                          className="main-progress-line"
                          style={{
                            borderColor: isDisabled
                              ? "#DADADA"
                              : renderStepStyle.borderColor,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // Rendering Right Curves
            if (stepName === "topRightCurve") {
              const stepNameBeforeRightCurve = innerTimelineSteppers[index - 2]
                ? Object.values(innerTimelineSteppers[index - 2])[0]
                : null;

              const isStepNameBeforeDisabled =
                withdrawnKey !== null && index - 1 > withdrawnKey + 1;
              return (
                <div
                  className="item"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      height: "65px",
                      width: "100%",
                      justifyContent: "flex-end",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        border: "1px solid",
                        borderColor: isStepNameBeforeDisabled
                          ? "#DADADA"
                          : "#0A56AE",
                        borderRadius: "0 80px 0 0",
                        borderBottom: "0",
                        borderLeft: "0",
                      }}
                    ></div>
                  </div>
                </div>
              );
            }

            if (stepName === "bottomRightCurve") {
              const isStepNameBeforeDisabled =
                withdrawnKey !== null && index - 2 > withdrawnKey + 1;
              return (
                <div
                  className="item"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      height: "96px",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        border: "1px solid pink",
                        borderColor: isStepNameBeforeDisabled
                          ? "#DADADA"
                          : "#0A56AE",
                        borderRadius: "0 0 80px 0",
                        borderTop: "0",
                        borderLeft: "0",
                      }}
                    ></div>
                  </div>
                </div>
              );
            }

            // Rendering Left Curves
            if (stepName === "topLeftCurve") {
              const stepNameBeforeRightCurve = innerTimelineSteppers[index - 2]
                ? Object.values(innerTimelineSteppers[index - 2])[0] || null
                : null;
              const isStepNameBeforeDisabled =
                withdrawnKey !== null && index - 1 > withdrawnKey + 1;
              return (
                <div
                  className="item"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      height: "65px",
                      width: "100%",
                      justifyContent: "flex-end",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        border: "1px solid",
                        borderColor: isStepNameBeforeDisabled
                          ? "#DADADA"
                          : "#0A56AE",
                        borderRadius: "80px 0 0 0",
                        borderBottom: "0",
                        borderRight: "0",
                      }}
                    ></div>
                  </div>
                </div>
              );
            }

            if (stepName === "bottomLeftCurve") {
              const isStepNameBeforeDisabled =
                withdrawnKey !== null && index - 2 > withdrawnKey + 1;
              return (
                <div
                  className="item"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      height: "95px",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        border: "1px solid",
                        borderColor: isStepNameBeforeDisabled
                          ? "#DADADA"
                          : "#0A56AE",

                        borderRadius: "0 0 0 80px",
                        borderTop: "0",
                        borderRight: "0",
                      }}
                    ></div>
                  </div>
                </div>
              );
            }

            const isUnderCollapsedSection = Object.keys(expandedView).some(
              (key) => {
                const [start, end] = indexRanges[key] || [];
                return (
                  start <= index && index <= end && expandedView[key] === false
                );
              }
            );

            const isUnderCurrentExpandedSection = Object.keys(
              expandedView
            ).some((key) => {
              const [start, end] = indexRanges[key] || [];
              return (
                start <= index && index <= end && expandedView[key] === true
              );
            });

            if (isUnderCollapsedSection && !isUnderCurrentExpandedSection) {
              return null;
            }

            if (
              stepName === "Candidate Withdrawn" ||
              stepName === "Candidate Rejected"
            ) {
              const renderBadCaseStyle = renderSectionStyle(
                badCaseData[1].status
              );
              const renderBadCaseDate = new Date(badCaseData[1].date);
              return (
                <div className="item">
                  <div className="alignment-3 line-padding-handle-bad-case">
                    <div className="alignment-4">
                      <div className="bad-case-container">
                        <div className="bad-case-wrapper">
                          <div
                            className="expanded-square"
                            style={{
                              backgroundColor: renderBadCaseStyle.bgColor,
                              border: "transparent",
                              marginBottom: "0",
                            }}
                          >
                            <span
                              className={renderBadCaseStyle.icon}
                              style={{ color: renderBadCaseStyle.color }}
                            ></span>
                          </div>
                          <div className="general-alignment">
                            <div
                              className="step-title-expanded"
                              style={{
                                color: renderBadCaseStyle.bgColor,
                                fontWeight: "500",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {stepName}
                            </div>
                            <div className="step-datetime">
                              {new Date(renderBadCaseDate)
                                .toLocaleString("en-GB", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                })
                                .replace(",", ";")}
                            </div>
                          </div>
                        </div>
                        <div>
                          <div
                            className="vertical-line"
                            style={{ borderColor: renderBadCaseStyle.bgColor }}
                          ></div>
                          <div className="horizontal-line">
                            <div
                              className="horizontal-line-1"
                              style={{
                                borderColor: renderBadCaseStyle.bgColor,
                              }}
                            ></div>
                            <div
                              className="horizontal-line-2"
                              style={{
                                borderColor: renderBadCaseStyle.bgColor,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div key={index} className="item" id="item-timeline">
                <div className="alignment-1">
                  <div className="alignment-2">
                    <div className="expand-col">
                      <div className="line-container line-padding-handle">
                        <div className="horizontal-line">
                          <div
                            className="horizontal-line-1"
                            style={{ borderColor: renderStepStyle.borderColor }}
                          ></div>
                          <div
                            className="horizontal-line-2"
                            style={{ borderColor: renderStepStyle.borderColor }}
                          ></div>
                        </div>
                        <div
                          className="vertical-line"
                          style={{ borderColor: renderStepStyle.borderColor }}
                        ></div>
                      </div>
                      <div className="expanded-alignment">
                        <div
                          className="expanded-square"
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
                        <div className="general-alignment-expanded">
                          <span
                            className={`step-title-expanded ${
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
                              color: readOnlyActionTrigger(
                                stepName,
                                true,
                                dataIndex
                              )
                                ? "#8A9AD0"
                                : "",
                            }}
                          >
                            {stepName.split("/").join(" ")}
                          </span>
                          <span className="step-datetime">
                            {stepData.date
                              ? `${new Date(stepData.date)
                                  .getDate()
                                  .toString()
                                  .padStart(2, "0")}/${(
                                  new Date(stepData.date).getMonth() + 1
                                )
                                  .toString()
                                  .padStart(2, "0")}/${new Date(
                                  stepData.date
                                ).getFullYear()}; ${new Date(stepData.date)
                                  .getHours()
                                  .toString()
                                  .padStart(2, "0")}:${new Date(stepData.date)
                                  .getMinutes()
                                  .toString()
                                  .padStart(2, "0")}`
                              : "Not Started"}
                          </span>
                        </div>
                      </div>
                    </div>
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
