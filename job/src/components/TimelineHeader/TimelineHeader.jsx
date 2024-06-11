import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import "./TimelineHeader.scss";

function TimelineHeader({ data, setStageType }) {
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

  const handleBarChartClick = (order, count) => {
    if (count && count > 0) {
      setStageType(order);
    }
  };

  return (
    <div
      className={`d-flex p-0 justify-content-around ${
        isMobile
          ? "flex-wrap align-items-start"
          : "flex-nowrap align-items-start"
      }`}
    >
      {data?.map((item, index) => (
        <div
          key={index}
          className="d-flex flex-column align-items-center justify-content-end"
          style={{
            height: "130px",
            cursor: counts?.[item?.name] > 0 ? "pointer" : "auto",
          }}
          onClick={() => handleBarChartClick(item?.order, counts?.[item?.name])}
        >
          <div
            className="header-bar-chart"
            style={{
              height:
                counts[item?.name] === 0 || !candidatesExist
                  ? "7.5%"
                  : `${(counts[item?.name] / maxCount) * 60}%`,
              transition: "height 0.3s ease",
              background:
                "linear-gradient(to bottom, rgba(255, 255, 255, 0.5), #A5BEE3)",
              color: "white",
              alignSelf: "flex-end",
            }}
          ></div>
          <div className="text-center">
            <div className="form-text" style={{ alignSelf: "flex-end" }}>
              {item?.name}
            </div>
            <div
              className="fw-semibold text-custom-primary"
              style={{ alignSelf: "flex-end" }}
            >
              <span>{counts?.[item?.name] ?? 0}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TimelineHeader;
