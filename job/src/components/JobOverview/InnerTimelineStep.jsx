import React, { useState, useRef, useEffect, createRef, useMemo } from "react";
import {
  innerTimelineSteps,
  innerTimelineOuterSteps,
  stepsToIgnore,
  initialExpandRanges,
  subStationGroupRange,
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
  const [noOfRows, setNoOfRows] = useState(1);
  const [expandedSectionRange, setExpandedSectionRange] =
    useState(initialExpandRanges);
  const [allExpandedIndexes, setAllExpandedIndexes] = useState([]);
  const [expandedTimeline, setExpandedTimeline] = useState([]);
  const [filteredExpandedTimeline, setFilteredExpandedTimeline] = useState([]);
  const [indexRanges, setIndexRanges] = useState({});
  const [innerTimelineSteppers, setInnerTimelineSteppers] =
    useState(innerTimelineSteps);
  const [defaultTimeline, setDefaultTimeline] = useState(innerTimelineSteppers);
  const [actionTriggeredWithSubitem, setActionTriggeredWithSubitem] =
    useState(null);
  const [badCaseData, setBadCaseData] = useState([]);

  // Read Only Action Trigger
  useEffect(() => {
    if (actionTriggeredWithSubitem) {
      readOnlyActionTrigger(actionTriggeredWithSubitem);
    }
    setActionTriggeredWithSubitem(null);
  }, [actionTriggeredWithSubitem]);

  // Render Style: Start
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

  // Render Style: End

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

  // Bad Case Data
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

  // Expand/Collapse Functionality
  const toggleExpansion = (step) => {
    setExpandedSectionRange((prev) => ({
      ...prev,
      [step]: !prev[step],
    }));
  };

  // Convert subStationGroupRange to a map for easier lookup
  const subStationGroupMap = subStationGroupRange.reduce((acc, range) => {
    const key = Object.keys(range)[0];
    const value = Object.values(range)[0];
    acc[key] = value;
    return acc;
  }, {});

  // Get Sub-station Indexes in Ranges
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

    // Calculate ranges after each "Expand" step using subStationGroupMap
    Object.keys(expandIndexes).forEach((expandStep) => {
      const currentExpandIndex = expandIndexes[expandStep];
      const nextOuterStep = subStationGroupMap[expandStep];
      let nextOuterIndex = timeline.length;

      // Find the next outer step index based on subStationGroupMap
      for (let i = currentExpandIndex + 1; i < timeline.length; i++) {
        const stepName = Object.values(timeline[i])[0];
        if (stepName === nextOuterStep) {
          nextOuterIndex = i;
          break;
        }
      }

      // Store the range for this expand step
      result[currentExpandIndex] = [currentExpandIndex + 1, nextOuterIndex - 1];
    });

    return result;
  };

  // Whenever the expandedSectionRange changes, update the indexRanges
  useEffect(() => {
    const rangeOfIndex = getRangesAfterExpand(innerTimelineSteppers);
    const expandedIndexes = getExpandedIndexes(
      rangeOfIndex,
      expandedSectionRange,
      innerTimelineSteppers
    );
    const mainIndexes = getMainIndexes(
      innerTimelineOuterSteps,
      innerTimelineSteppers
    );
    const expandIndexes = getExpandStepIndexes(innerTimelineSteppers);
    const combinedIndexes = [
      ...mainIndexes,
      ...expandIndexes,
      ...expandedIndexes,
    ];
    const sortedIndexes = [...new Set(combinedIndexes)].sort((a, b) => a - b);
    const indexesInnerTimeline = sortedIndexes.map(
      (index) => innerTimelineSteppers[index]
    );

    const filtered = expandedTimeline.filter((item) => {
      // Ensure item is an object before proceeding
      if (!item || typeof item !== "object") {
        return false;
      }
      // Convert item to an array of [key, value] pairs and check if any pair matches the specified structures
      return !Object.entries(item).some(
        ([key, value]) =>
          (key === "topRightCurve" && value === "topRightCurve") ||
          (key === "bottomRightCurve" && value === "bottomRightCurve") ||
          (key === "topLeftCurve" && value === "topLeftCurve") ||
          (key === "bottomLeftCurve" && value === "bottomLeftCurve") ||
          (key === "topRightCurve2" && value === "topRightCurve2") ||
          (key === "bottomRightCurve2" && value === "bottomRightCurve2")
      );
    });

    if (noOfRows === 1) {
      setInnerTimelineSteppers(defaultTimeline);
    } else {
      const newTimeline = updateTimeline(
        defaultTimeline,
        filtered,
        expandedTimeline,
        noOfRows
      );
      setInnerTimelineSteppers(newTimeline);
    }

    setFilteredExpandedTimeline(filtered);
    setExpandedTimeline(indexesInnerTimeline);
    setAllExpandedIndexes([...expandedIndexes]);
    setIndexRanges(rangeOfIndex);
  }, [
    expandedSectionRange,
    noOfRows,
    JSON.stringify(innerTimelineSteppers),
    JSON.stringify(expandedTimeline),
  ]);

  const getExpandedIndexes = (indexRanges, expandRanges, timeline) => {
    const result = [];
    const expandMapping = {};

    // Create a mapping of "Expand" step names to their indices in the timeline
    timeline.forEach((item, index) => {
      const stepName = Object.values(item)[0];
      if (stepName.startsWith("Expand")) {
        expandMapping[stepName] = index;
      }
    });

    // Iterate over the keys in expandRanges
    Object.keys(expandRanges).forEach((expandKey) => {
      if (expandRanges[expandKey]) {
        const indexKey = expandMapping[expandKey];
        if (indexRanges[indexKey]) {
          // Get the start and end indices from indexRanges
          const [start, end] = indexRanges[indexKey];
          // Push all indices from start to end into the result array
          for (let i = start; i <= end; i++) {
            result.push(i);
          }
        }
      }
    });

    return result;
  };

  // Get indexes of main stations
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

  // // Setting number of rows
  useEffect(() => {
    const filteredLength = filteredExpandedTimeline.length;
    if (filteredLength <= 10) {
      setNoOfRows(1);
    } else if (filteredLength > 10 && filteredLength <= 18) {
      setNoOfRows(2);
    } else if (filteredLength >= 19 && filteredLength <= 25) {
      setNoOfRows(3);
    } else if (filteredLength == 27) {
      setNoOfRows(4);
    }
  }, [filteredExpandedTimeline]);

  // Render Timeline with Curves
  const updateTimeline = (
    defaultTimeline,
    filteredExpandedTimeline,
    expandedTimeline,
    noOfRows
  ) => {
    const newTimeline = [...defaultTimeline];
    if (noOfRows === 2) {
      const rightCurveIndex = filteredExpandedTimeline[8];
      const rightCurveStepper = newTimeline.findIndex(
        (item) => item === rightCurveIndex
      );
      newTimeline.splice(rightCurveStepper + 1, 0, {
        topRightCurve: "topRightCurve",
      });
      newTimeline.splice(rightCurveStepper + 2, 0, {
        bottomRightCurve: "bottomRightCurve",
      });
    } else if (noOfRows === 3) {
      const rightCurveIndex = filteredExpandedTimeline[8];
      const rightCurveStepper = newTimeline.findIndex(
        (item) => item === rightCurveIndex
      );
      newTimeline.splice(rightCurveStepper + 1, 0, {
        topRightCurve: "topRightCurve",
      });
      newTimeline.splice(rightCurveStepper + 2, 0, {
        bottomRightCurve: "bottomRightCurve",
      });
      const newExpandedTimeline = expandedTimeline.filter(
        (step) =>
          !step.hasOwnProperty("topLeftCurve") &&
          !step.hasOwnProperty("bottomLeftCurve") &&
          !step.hasOwnProperty("topRightCurve") &&
          !step.hasOwnProperty("bottomRightCurve")
      );
      newExpandedTimeline.splice(rightCurveStepper + 1, 0, {
        topRightCurve: "topRightCurve",
      });
      newExpandedTimeline.splice(rightCurveStepper + 2, 0, {
        bottomRightCurve: "bottomRightCurve",
      });
      const leftCurveIndex = newExpandedTimeline[18];
      const leftCurveStepper = newTimeline.findIndex(
        (step) => step === leftCurveIndex
      );

      newTimeline.splice(leftCurveStepper + 1, 0, {
        topLeftCurve: "topLeftCurve",
      });
      newTimeline.splice(leftCurveStepper + 2, 0, {
        bottomLeftCurve: "bottomLeftCurve",
      });
    } else if (noOfRows === 4) {
      const rightCurveIndex = filteredExpandedTimeline[8];
      const rightCurveStepper = newTimeline.findIndex(
        (item) => item === rightCurveIndex
      );
      newTimeline.splice(rightCurveStepper + 1, 0, {
        topRightCurve: "topRightCurve",
      });
      newTimeline.splice(rightCurveStepper + 2, 0, {
        bottomRightCurve: "bottomRightCurve",
      });

      const leftCurveIndex = newTimeline[18];
      const leftCurveStepper = newTimeline.findIndex(
        (step) => step === leftCurveIndex
      );
      newTimeline.splice(leftCurveStepper + 1, 0, {
        topLeftCurve: "topLeftCurve",
      });
      newTimeline.splice(leftCurveStepper + 2, 0, {
        bottomLeftCurve: "bottomLeftCurve",
      });

      const finalRightCurve = newTimeline[28];
      const finalRightCurveStepper = newTimeline.findIndex(
        (step) => step === finalRightCurve
      );
      newTimeline.splice(finalRightCurveStepper + 1, 0, {
        topRightCurve2: "topRightCurve2",
      });
      newTimeline.splice(finalRightCurveStepper + 2, 0, {
        bottomRightCurve2: "bottomRightCurve2",
      });
    }

    return newTimeline;
  };

  // When No of Rows Change or Expand has been toggled
  // useEffect(() => {
  //   if (noOfRows === 1) {
  //     setInnerTimelineSteppers(defaultTimeline);
  //   } else {
  //     const newTimeline = updateTimeline(
  //       defaultTimeline,
  //       filteredExpandedTimeline,
  //       expandedTimeline,
  //       noOfRows
  //     );
  //     setInnerTimelineSteppers(newTimeline);
  //   }
  // }, [noOfRows, expandedSectionRange, innerTimelineSteppers]);

  // Get Main Station Status
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

  // Get Data for All Steps
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

  // Get Data for a Specific Step
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

  const [itemCount, setItemCount] = useState(0);
  useEffect(() => {
    setItemCount(innerTimelineOuterSteps.length);
  }, []);

  // For checking the style of the main steps
  let mainStyling = [];

  return (
    <div className="inner-timeline">
      <div className="py-2 w-100">
        <div
          id="container-new"
          ref={containerNewRef}
          className={`container ${itemCount <= 10 ? "single-row" : ""}`}
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

            const getRenderMainStepStyle = (stepName) => {
              const nearestMainStepStyle = mainStyling.find(
                (item) => item.stepName === stepName
              );
              return nearestMainStepStyle
                ? nearestMainStepStyle.renderMainStepStyle
                : null;
            };

            // Rendering the Main Step
            if (innerTimelineOuterSteps.includes(stepName)) {
              const matchingStep = combinedStepsWithStatus.find(
                (item) => item.stepName === stepName
              );

              const status = matchingStep ? matchingStep.status : null;
              const statusDate = matchingStep ? matchingStep.statusDate : null;
              const renderMainStepStyle = renderSectionStyle(status);
              mainStyling.push({ renderMainStepStyle, stepName });

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
                  <div
                    className="progress-line"
                    style={{
                      borderColor: isCurrentStepWithdrawnOrRejected
                        ? renderMainStepStyle.bgColor
                        : isStepAfterWithdrawnOrRejected
                        ? "#DADADA"
                        : renderMainStepStyle.bgColor,
                      backgroundColor: "transparent",
                      width: index === 0 ? "50%" : "100%",
                      left: index === 0 ? "50%" : "0",
                    }}
                  ></div>
                  <div className="main-step-text">
                    <span style={{ color: "#0A56AE", fontWeight: "500" }}>
                      {stepName}
                    </span>
                    <span className="step-datetime">
                      {statusDate ? statusDate : "Not Started"}
                    </span>
                  </div>
                  <div
                    className="outer-main-circle"
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
                      className="inner-main-circle"
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
                          ? "#FFF"
                          : isStepAfterWithdrawnOrRejected
                          ? "#B7B7B7"
                          : "#FFF",
                      }}
                    >
                      {renderMainStepStyle?.icon ? (
                        <span className={renderMainStepStyle.icon}></span>
                      ) : (
                        stepNumber
                      )}
                    </div>
                  </div>
                </div>
              );
            }

            // Rendering the Expand/Collapse Button
            if (stepName.includes("Expand")) {
              const isSectionExpanded = expandedSectionRange[stepName];
              const isCOCollapsed =
                !isSectionExpanded && stepName === "Expand Conditional Offer";
              const isDisabled =
                withdrawnKey !== null && index > withdrawnKey + 1;

              // Retrieving color for expanded lines
              const stepNameBeforeExpand = Object.values(
                innerTimelineSteppers[index - 1]
              )[0];
              let renderingStyle = null;

              if (
                stepNameBeforeExpand === "bottomRightCurve" ||
                stepNameBeforeExpand === "bottomLeftCurve"
              ) {
                const newStepNameBeforeExpand = Object.values(
                  innerTimelineSteppers[index - 3]
                )[0];
                renderingStyle = getRenderMainStepStyle(
                  newStepNameBeforeExpand
                );
              } else {
                renderingStyle = getRenderMainStepStyle(stepNameBeforeExpand);
              }

              return (
                <div key={index} className="item" id="item-timeline">
                  <div
                    className={`${
                      isCOCollapsed
                        ? noOfRows % 2 === 0
                          ? "conditional-offer-line-right"
                          : "conditional-offer-line-left"
                        : "progress-line"
                    }`}
                    style={{
                      borderColor: isDisabled
                        ? "#DADADA"
                        : renderingStyle !== null
                        ? renderingStyle.borderColor
                        : "#DADADA",
                      backgroundColor: "transparent",
                    }}
                  ></div>
                  <div
                    className="toggle-circle"
                    onClick={
                      !isDisabled ? () => toggleExpansion(stepName) : undefined
                    }
                    style={{
                      backgroundColor: isDisabled
                        ? "#DADADA"
                        : isSectionExpanded
                        ? "#E3EFFF"
                        : "#000000",
                      color: isDisabled
                        ? "#939393"
                        : isSectionExpanded
                        ? "#000000"
                        : "#FFFFFF",
                      borderColor: isDisabled
                        ? "#B7B7B7"
                        : isSectionExpanded
                        ? "#0A56AE"
                        : "#000000",
                      cursor: isDisabled ? "not-allowed" : "pointer",
                      borderWidth: "1px",
                      borderStyle: "solid",
                    }}
                  >
                    <span
                      className={`bx ${
                        isSectionExpanded
                          ? "bx-collapse-horizontal"
                          : "bx-expand-horizontal"
                      }`}
                    ></span>
                  </div>
                </div>
              );
            }

            const getClosestPreviousStep = (steps, outerSteps, index) => {
              // Find the indexes and step names that match the outer steps
              const matchedSteps = steps
                .map((step, idx) => {
                  const stepName = Object.values(step)[0];
                  if (outerSteps.includes(stepName)) {
                    return { stepName, idx };
                  }
                  return null;
                })
                .filter((item) => item !== null && item.idx < index);

              // Find the closest previous step
              if (matchedSteps.length === 0) {
                return null;
              }

              return matchedSteps[matchedSteps.length - 1];
            };

            // Rendering Right Curves
            if (stepName === "topRightCurve") {
              const isStepNameBeforeDisabled =
                withdrawnKey !== null && index - 2 > withdrawnKey + 1;
              const nearestMainStep = getClosestPreviousStep(
                innerTimelineSteppers,
                innerTimelineOuterSteps,
                index
              );
              const nearestMainStepName = nearestMainStep
                ? nearestMainStep.stepName
                : null;
              const renderingStyle = nearestMainStepName
                ? getRenderMainStepStyle(nearestMainStepName)
                : null;
              return (
                <div className="item">
                  <div
                    className="top-right-curve"
                    style={{
                      borderColor: isStepNameBeforeDisabled
                        ? "#DADADA"
                        : renderingStyle !== null
                        ? renderingStyle.borderColor
                        : "#DADADA",
                    }}
                  ></div>
                </div>
              );
            }

            if (stepName === "bottomRightCurve") {
              const isStepNameBeforeDisabled =
                withdrawnKey !== null && index - 2 > withdrawnKey + 1;
              const nearestMainStep = getClosestPreviousStep(
                innerTimelineSteppers,
                innerTimelineOuterSteps,
                index
              );
              const nearestMainStepName = nearestMainStep
                ? nearestMainStep.stepName
                : null;
              const renderingStyle = nearestMainStepName
                ? getRenderMainStepStyle(nearestMainStepName)
                : null;
              return (
                <div className="item">
                  <div
                    className="bottom-right-curve"
                    style={{
                      borderColor: isStepNameBeforeDisabled
                        ? "#DADADA"
                        : renderingStyle !== null
                        ? renderingStyle.borderColor
                        : "#DADADA",
                    }}
                  ></div>
                </div>
              );
            }

            // Rendering Right Curves (Fourth Row)
            if (stepName === "topRightCurve2") {
              const nearestMainStep = getClosestPreviousStep(
                innerTimelineSteppers,
                innerTimelineOuterSteps,
                index
              ).stepName;
              const renderingStyle = getRenderMainStepStyle(nearestMainStep);

              const isStepNameBeforeDisabled =
                withdrawnKey !== null && index - 1 > withdrawnKey + 1;
              return (
                <div className="item">
                  <div
                    className="top-right-curve-2"
                    style={{
                      borderColor: isStepNameBeforeDisabled
                        ? "#DADADA"
                        : renderingStyle.borderColor,
                    }}
                  ></div>
                </div>
              );
            }

            if (stepName === "bottomRightCurve2") {
              const isStepNameBeforeDisabled =
                withdrawnKey !== null && index - 2 > withdrawnKey + 1;
              const nearestMainStep = getClosestPreviousStep(
                innerTimelineSteppers,
                innerTimelineOuterSteps,
                index
              ).stepName;
              const renderingStyle = getRenderMainStepStyle(nearestMainStep);

              return (
                <div className="item">
                  <div
                    className="bottom-right-curve-2"
                    style={{
                      borderColor: isStepNameBeforeDisabled
                        ? "#DADADA"
                        : renderingStyle.borderColor,
                    }}
                  ></div>
                </div>
              );
            }

            // Rendering Left Curves
            if (stepName === "topLeftCurve") {
              const isStepNameBeforeDisabled =
                withdrawnKey !== null && index - 2 > withdrawnKey + 1;
              const nearestMainStep = getClosestPreviousStep(
                innerTimelineSteppers,
                innerTimelineOuterSteps,
                index
              );
              const nearestMainStepName = nearestMainStep
                ? nearestMainStep.stepName
                : null;
              const renderingStyle = nearestMainStepName
                ? getRenderMainStepStyle(nearestMainStepName)
                : null;
              return (
                <div className="item">
                  <div
                    className="top-left-curve"
                    style={{
                      borderColor: isStepNameBeforeDisabled
                        ? "#DADADA"
                        : renderingStyle !== null
                        ? renderingStyle.borderColor
                        : "#DADADA",
                    }}
                  ></div>
                </div>
              );
            }

            if (stepName === "bottomLeftCurve") {
              const isStepNameBeforeDisabled =
                withdrawnKey !== null && index - 2 > withdrawnKey + 1;
              const nearestMainStep = getClosestPreviousStep(
                innerTimelineSteppers,
                innerTimelineOuterSteps,
                index
              );
              const nearestMainStepName = nearestMainStep
                ? nearestMainStep.stepName
                : null;
              const renderingStyle = nearestMainStepName
                ? getRenderMainStepStyle(nearestMainStepName)
                : null;
              return (
                <div className="item">
                  <div
                    className="bottom-left-curve"
                    style={{
                      borderColor: isStepNameBeforeDisabled
                        ? "#DADADA"
                        : renderingStyle !== null
                        ? renderingStyle.borderColor
                        : "#DADADA",
                    }}
                  ></div>
                </div>
              );
            }

            // Check if the current index is within the expandedIndexes array
            if (!allExpandedIndexes.includes(index)) {
              return null;
            }

            // Check for any Bad Case items
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
                  <div
                    className="progress-line"
                    style={{
                      borderColor: renderBadCaseStyle.bgColor,
                      backgroundColor: "transparent",
                    }}
                  >
                    <div
                      className="bad-case-vertical-line"
                      style={{
                        backgroundColor: renderBadCaseStyle.bgColor,
                      }}
                    >
                      <div
                        className="bad-case-square"
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
                      <div className="bad-case-square-text">
                        <span
                          style={{
                            color: renderBadCaseStyle.bgColor,
                            fontWeight: "500",
                          }}
                        >
                          {stepName}
                        </span>
                        <span className="step-datetime">
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
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div key={index} className="item" id="item-timeline">
                <div
                  className="progress-line"
                  style={{ borderColor: renderStepStyle.borderColor }}
                >
                  <div
                    className="expanded-vertical-line"
                    style={{ backgroundColor: renderStepStyle.borderColor }}
                  >
                    <div
                      className="square"
                      style={{
                        backgroundColor: renderStepStyle.bgColor,
                        color: renderStepStyle.color,
                        border: "1px solid",
                        borderColor: renderStepStyle.borderColor,
                      }}
                    >
                      {renderStepStyle.icon ? (
                        <span className={renderStepStyle.icon}></span>
                      ) : (
                        stepNumber
                      )}
                    </div>
                    <div
                      className={`square-text ${
                        readOnlyActionTrigger(stepName, true, dataIndex)
                          ? "cursor-pointer"
                          : ""
                      }`}
                      onClick={() => {
                        setActionTriggeredWithSubitem(stepName);
                        setTimelineRowIndex();
                      }}
                    >
                      <span
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
                            : "#0A56AE",
                          fontWeight: "500",
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InnerTimelineStep;
