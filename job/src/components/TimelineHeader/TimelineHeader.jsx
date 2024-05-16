import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

function TimelineHeader({ data }) {
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const isTablet = useMediaQuery({ query: "(max-width: 1224px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    if (isMobile) {
      setItemsPerPage(1);
    } else if (isTablet) {
      setItemsPerPage(4);
    } else {
      setItemsPerPage(6);
    }
  }, [isMobile, isTablet]);

  const jobTimelineCount = useSelector(
    (state) => state.JobStageReducer.jobTimelineCount
  );

  const [candidatesExist, setCandidatesExist] = useState(false);
  const [counts, setCounts] = useState({});
  // default to 1 to avoid division by zero
  const [maxCount, setMaxCount] = useState(1);

  useEffect(() => {
    let data = {};
    if (jobTimelineCount?.length > 0) {
      jobTimelineCount.forEach((item) => {
        data[item.name] = item.count;
      });
      setCounts(data);
      const max = Math.max(...jobTimelineCount.map((item) => item.count));
      setMaxCount(max);
    }
    if ("Tag" in data) {
      setCandidatesExist(true);
    } else {
      setCandidatesExist(false);
    }
  }, [jobTimelineCount]);

  const filteredData = data
    .filter((item) => item !== "Profile Feedback Pending")
    .map((item) => {
      switch (item) {
        case "Interview Scheduled":
          return "Scheduled";
        case "Interview Happened":
          return "Completed";
        case "Interview Cancelled/Backout":
          return "Cancelled/Backout";
        case "Interview Pending Feedback":
          return "Pending Feedback";
        default:
          return item;
      }
    });

  return (
    <div
      className={`d-flex p-0 justify-content-around ${
        isMobile
          ? "flex-wrap align-items-start"
          : "flex-nowrap align-items-start"
      }`}
    >
      {filteredData.map((item, index) => (
        <div
          key={index}
          className="d-flex flex-column align-items-center justify-content-end"
          style={{ height: "120px" }}
        >
          <div
            className="d-flex justify-content-center align-items-end mb-1"
            style={{
              width: "130px",
              height:
                (counts[item] === 0 || !candidatesExist)
                  ? "7.5%"
                  : `${(counts[item] / maxCount) * 60}%`,
              transition: "height 0.3s ease",
              background:
                "linear-gradient(to bottom, rgba(255, 255, 255, 0.5), #A5BEE3)",
              color: "white",
              alignSelf: "flex-end",
            }}
          ></div>
          <div className="text-center">
            <div className="form-text" style={{ alignSelf: "flex-end" }}>
              {item}
            </div>
            <div
              className="fw-semibold text-custom-primary"
              style={{ alignSelf: "flex-end" }}
            >
              <span>{counts?.[item] ?? 0}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TimelineHeader;
