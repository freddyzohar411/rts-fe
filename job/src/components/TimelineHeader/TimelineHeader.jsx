import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "reactstrap";
import { useSelector } from "react-redux";

function TimelineHeader({ data }) {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 6;

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

  const handlePrevClick = () => {
    setStartIndex(Math.max(0, startIndex - itemsPerPage));
  };

  const handleNextClick = () => {
    setStartIndex(
      Math.min(data.length - itemsPerPage, startIndex + itemsPerPage)
    );
  };

  return (
    <Row className="align-items-stretch w-100 m-0" style={{ height: "60px" }}>
      <Col xs="auto" className="d-flex align-items-stretch">
        <Button
          onClick={handlePrevClick}
          disabled={startIndex === 0}
          className="h-100 btn btn-custom-primary px-1"
        >
          <i className="ri-arrow-left-s-line fs-5"></i>
        </Button>
      </Col>
      <Col>
        <div className="d-flex flex-row justify-content-between overflow-auto">
          {data
            .slice(startIndex, startIndex + itemsPerPage)
            .map((item, index) => (
              <div
                key={index}
                className="mx-2 d-flex flex-column align-items-center mt-2 gap-2 text-center"
              >
                <div
                  className="rounded rounded-pill bg-primary text-white d-flex align-items-center justify-content-center"
                  style={{ width: "20px", height: "20px" }}
                >
                  <span>{counts?.[item] ?? 0}</span>
                </div>
                <span className="text-nowrap">{item}</span>
              </div>
            ))}
        </div>
      </Col>
      <Col xs="auto" className="d-flex align-items-stretch">
        <Button
          onClick={handleNextClick}
          disabled={startIndex >= data.length - itemsPerPage}
          className="h-100 btn btn-custom-primary px-1"
        >
          <i className="ri-arrow-right-s-line fs-5"></i>
        </Button>
      </Col>
    </Row>
  );
}

export default TimelineHeader;
