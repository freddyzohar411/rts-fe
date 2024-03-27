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
  }, [itemsPerPage]);

  const jobTimelineCount = useSelector(
    (state) => state.JobStageReducer.jobTimelineCount
  );

  const [counts, setCounts] = useState({});

  useEffect(() => {
    let data = {};
    if (jobTimelineCount?.length > 0) {
      jobTimelineCount?.map((item) => {
        data[item?.name] = item?.count;
      });
      setCounts(data);
    }
  }, [jobTimelineCount]);

  return (
    <div
      className={`d-flex p-0 justify-content-around ${
        isMobile
          ? "flex-wrap align-items-start"
          : "flex-nowrap align-items-start"
      }`}
    >
      {data.map((item, index) => (
        <div
          key={index}
          className={`d-flex flex-column align-items-center justify-content-top gap-3 p-1 ${
            isMobile ? "" : "h-100"
          }`}
        >
          <div
            className="rounded rounded-circle bg-custom-primary text-white d-flex justify-content-center align-items-center"
            style={{ width: "28px", height: "28px" }}
          >
            {counts?.[item] ?? 0}
          </div>
          <div className="text-center" style={{ fontSize: "12px" }}>
            {item}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TimelineHeader;
