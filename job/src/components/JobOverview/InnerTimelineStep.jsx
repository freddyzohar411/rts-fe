import React, { useState, useRef, useEffect, createRef } from "react";
import { sections } from "./InnerTimelineStepConstants";

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
    WITHDRAWN: { icon: "ri-close-line", bgColor: "#D90909", color: "#FFFFFF" },
    REJECTED: {
      icon: "mdi mdi-thumb-down-outline",
      bgColor: "#992EF2",
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

  function renderSectionStyle(status) {
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
        return renderStyle.INPROGRESS;
      default:
        return renderStyle.NOTSTARTED;
    }
  }

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
  }, []);

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
                        className="mb-2"
                        style={{
                          width: "22px",
                          height: "22px",
                          border: "1px solid #0A56AE",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "100%",
                          backgroundColor: "#FFFFFF",
                          color: "#0A56AE",
                        }}
                      >
                        <span className="fw-semibold">{index + 1}</span>
                      </div>
                      <span className="form-text text-muted">15/02/2024</span>
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
                    <div className="d-flex flex-row align-items-top justify-content-center">
                      {section.subitems.map((subitem, subindex) => {
                        const renderSubitemStyle = renderSectionStyle(
                          subitemsData[subindex]?.data?.status
                        );
                        return (
                          <div
                            key={subindex}
                            className="d-flex flex-column align-items-center"
                            style={{
                              width: isExpanded ? "140px" : "110px",
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
                                {subitemsData[subindex].data.date
                                  ? new Date(
                                      subitemsData[subindex].data.date
                                    ).toLocaleDateString()
                                  : "Not Started"}
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
