import React, { useState, useRef, useEffect, createRef } from "react";
import { sections } from "./InnerTimelineStepConstants";
import {
  JOB_STAGE_STATUS,
  JOB_STAGE_STATUS_LABELS,
} from "../JobListing/JobListingConstants";

const InnerTimelineStep = ({ data }) => {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const sectionRefs = useRef([]);
  const [sectionRowIndexes, setSectionRowIndexes] = useState([]);
  const [noOfRows, setNoOfRows] = useState(0);
  const [rowDivs, setRowDivs] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [divWidth, setDivWidth] = useState("");
  const [elementSizing, setElementSizing] = useState("");

  useEffect(() => {
    const updateRowIndexes = () => {
      const newIndexes = sectionRefs.current.map((ref) => {
        const top = ref.current?.getBoundingClientRect().top;
        const containerTop = containerRef.current?.getBoundingClientRect().top;
        const rowIndex = Math.floor((top - containerTop) / 90);
        return rowIndex;
      });
      setSectionRowIndexes(newIndexes);
    };

    updateRowIndexes();
    window.addEventListener("resize", updateRowIndexes);

    return () => {
      window.removeEventListener("resize", updateRowIndexes);
    };
  }, [noOfRows]);

  useEffect(() => {
    sectionRefs.current = sections.map(
      (_, i) => sectionRefs.current[i] ?? createRef()
    );
  }, [sections]);

  const timelineElement = document.getElementById("timeline-container");

  const getStatus = (subitems) => {
    const statuses = subitems
      .map((subitem) => data[subitem]?.status)
      .filter((status) => status);

    if (statuses.length === 0) {
      return "NOTSTARTED";
    }

    const hasCompleted = statuses.includes("COMPLETED");
    const hasWithdrawn = statuses.includes("WITHDRAWN");
    const hasRejected = statuses.includes("REJECTED");
    const hasSkipped = statuses.includes("SKIPPED");

    if (hasCompleted && !hasWithdrawn && !hasRejected && !hasSkipped) {
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

  const sectionsWithStatus = sections.map((section) => {
    const status = getStatus(section.subitems);
    return { ...section, status };
  });

  const toggleSection = (sectionName) => {
    setExpandedSections((prevState) => ({
      ...prevState,
      [sectionName]: !prevState[sectionName],
    }));
  };

  function calculateNoOfRows() {
    if (containerRef.current) {
      const containerHeight = containerRef.current.clientHeight;
      const timelineModule = document.getElementById("module-timeline");
      const rowHeight = timelineModule.offsetHeight;
      const calculatedRows = Math.ceil(containerHeight / rowHeight);
      setNoOfRows(calculatedRows);
    }
  }

  useEffect(() => {
    calculateNoOfRows();
    const resizeObserver = new ResizeObserver(() => {
      calculateNoOfRows();
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
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
                borderRadius: "50px 0 0 50px",
                left: "20px",
                height: "95px",
                top: `${i * 95}px`,
                width: "91%",
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
                borderRadius: "0 50px 50px 0",
                left: "60px",
                height: "95px",
                top: `${i * 95}px`,
                width: "91%",
                position: "absolute",
                borderLeft: "none",
              }}
            ></div>
          );
        }
      }
    } else {
      // If only one row is there, add a single dashed line
      divs.push(
        <div
          className="mt-3"
          style={{
            border: "1px dashed lightgray",
            position: "absolute",
            top: 0,
            left: "60px",
            width: "91%",
          }}
        ></div>
      );
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

  function toRoman(num) {
    const roman = [
      "m",
      "cm",
      "d",
      "cd",
      "c",
      "xc",
      "l",
      "xl",
      "x",
      "ix",
      "v",
      "iv",
      "i",
    ];
    const decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    let romanNum = "";
    for (let i = 0; i <= decimal.length; i++) {
      while (num % decimal[i] < num) {
        romanNum += roman[i];
        num -= decimal[i];
      }
    }
    return romanNum;
  }

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

  return (
    <div style={{ position: "relative" }}>
      <div className="py-2 w-100">
        <div id="timeline-line" ref={timelineRef}>
          {rowDivs}
        </div>
        <div
          ref={containerRef}
          id="timeline-container"
          className="d-flex flex-row justify-content-between flex-wrap ms-2"
          style={{
            position: "relative",
            zIndex: "2",
            left: "50px",
            width: divWidth,
          }}
        >
          {sectionsWithStatus.map((section, index) => {
            const subitemsData = section.subitems.map((subitem) => ({
              name: subitem,
              data: data[subitem] || {},
            }));
            const submittedDate = getSubmittedDate([...subitemsData]);
            const lastItem = subitemsData?.[subitemsData?.length - 1];
            const status =
              section?.status === "NOTSTARTED" ||
              section?.status === "WITHDRAWN" ||
              section?.status === "REJECTED"
                ? section?.status
                : lastItem?.data?.status
                ? lastItem?.data?.status
                : JOB_STAGE_STATUS.IN_PROGRESS;
            return (
              <div key={index}>
                <div className="d-flex flex-row justify-content-between">
                  <div
                    id="module-timeline"
                    className={`d-flex flex-column pb-4 align-items-start justify-content-center`}
                    style={{ width: elementSizing }}
                  >
                    <div className="d-flex flex-column align-items-start">
                      <div
                        className={`rounded-circle d-flex justify-content-center mb-2 ${getBulletBgColor(
                          status
                        )}`}
                        style={{
                          width: "22px",
                          height: "22px",
                        }}
                      >
                        <span className="fw-semibold">
                          {GetLabel(index + 1, status)}
                        </span>
                      </div>
                      <span className="form-text text-muted">
                        {submittedDate}
                      </span>
                      <span
                        className="fw-semibold text-dark"
                        style={{ fontSize: "13px", whiteSpace: "nowrap" }}
                      >
                        {section.name}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`cursor-pointer d-flex align-items-top justify-content-start`}
                    onClick={() => toggleSection(section.name)}
                    style={{ width: elementSizing }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "22px",
                        height: "22px",
                        border: "1px solid",
                        borderRadius: "100%",
                        borderColor: expandedSections[section.name]
                          ? "#000000"
                          : "#0A56AE",
                        backgroundColor: expandedSections[section.name]
                          ? "#000000"
                          : "#E3EFFF",
                        color: expandedSections[section.name]
                          ? "#FFFFFF"
                          : "#000000",
                      }}
                    >
                      {expandedSections[section.name] ? (
                        <i className="bx bx-collapse-horizontal"></i>
                      ) : (
                        <i className="bx bx-expand-horizontal"></i>
                      )}
                    </div>
                  </div>

                  {expandedSections[section.name] && (
                    <div className="d-flex flex-row align-items-top justify-content-center gap-3">
                      {section.subitems.map((subitem, subindex) => {
                        const renderSubitemStyle = renderSectionStyle(
                          subitemsData[subindex]?.data?.status
                        );
                        return (
                          <div
                            key={subindex}
                            className="d-flex flex-column align-items-center"
                            style={{
                              width: elementSizing,
                            }}
                          >
                            <div className="d-flex flex-column align-items-start">
                              <div
                                className="d-flex align-items-center justify-content-center mb-1"
                                style={{
                                  width: "22px",
                                  height: "22px",
                                  border: "1px solid",
                                  borderRadius: "100%",
                                  backgroundColor: renderSubitemStyle.bgColor,
                                  color: renderSubitemStyle.color,
                                }}
                              >
                                {renderSubitemStyle.icon ? (
                                  <i className={renderSubitemStyle.icon}></i>
                                ) : (
                                  <span>{toRoman(subindex + 1)}</span>
                                )}
                              </div>
                              <span className="form-text text-muted">
                                {getStatusValue(subitemsData?.[subindex]?.data)}
                              </span>
                              <span
                                key={subindex}
                                className="fw-semibold text-dark no-wrap"
                                style={{
                                  fontSize: "13px",
                                }}
                              >
                                {subitem}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
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
