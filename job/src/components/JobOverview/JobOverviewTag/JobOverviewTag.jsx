import React from "react";
import { Offcanvas, OffcanvasBody, Row, Col } from "reactstrap";
import JobOverviewTagTable from "./JobOverviewTagTable";
import "./JobOverviewTag.scss";

function JobOverviewTag({
  isOpen,
  closeTag,
  jobId,
  data,
  isJobOverviewTagOpen,
}) {
  return (
    <Offcanvas isOpen={isOpen} direction="end" style={{ width: "65vw" }}>
      <div className="offcanvas-header oc-tag-header">
        <div className="job-tagging-header-info-container">
          <div className="job-tagging-header-info">
            <span className="tag-candidate-badge">Tag Candidate</span>
            <span className="job-name-header">{data?.accountName}</span>
          </div>
          <div>
            <div className="job-tagging-header-info-2">
              <span>Job ID - {jobId}</span>
              <span>|</span>
              <span>Job Title - {data?.jobTitle}</span>
            </div>
          </div>
        </div>
        <div className="cursor-pointer" onClick={closeTag}>
          <span className="mdi mdi-close"></span>
        </div>
      </div>
      <OffcanvasBody>
        <Row>
          <Col>
            <JobOverviewTagTable
              jobId={jobId}
              isJobOverviewTagOpen={isJobOverviewTagOpen}
              closeTag={closeTag}
            />
          </Col>
        </Row>
      </OffcanvasBody>
    </Offcanvas>
  );
}

export default JobOverviewTag;
