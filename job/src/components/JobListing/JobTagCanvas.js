import React from "react";
import {
  Row,
  Col,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
} from "reactstrap";
import FODTagTable from "../FODTagTable/FODTagTable";
import "./JobTagCanvas.scss";

const JobTagCanvas = ({ tagOffcanvas, setTagOffcanvas, selectedRowData }) => {
  const charCircleText =
    selectedRowData?.jobSubmissionData?.accountName?.charAt(0) || "N/A";
  const jobID = selectedRowData?.jobSubmissionData?.jobId || "N/A";
  const jobTitle = selectedRowData?.jobSubmissionData?.jobTitle || "N/A";
  const workLocation =
    selectedRowData?.jobSubmissionData?.workLocation || "N/A";
  return (
    <Row>
      <Col>
        <Offcanvas
          isOpen={tagOffcanvas}
          toggle={() => setTagOffcanvas(!tagOffcanvas)}
          direction="end"
          style={{ width: "65vw" }}
        >
          <OffcanvasHeader
            toggle={() => setTagOffcanvas(!tagOffcanvas)}
            className="tag-border"
          >
            {selectedRowData && (
              <div className="job-info-row align-items-center">
                {/* Char Circle */}
                <div className="char-circle">
                  <span>{charCircleText}</span>
                </div>
                <div className="column-display">
                  {/* First Row: Account Name */}
                  <div className="account-name-row">
                    <div>
                      {selectedRowData?.jobSubmissionData?.accountName ?? "N/A"}
                    </div>
                    <div className="new-tag">
                      <span>New</span>
                    </div>
                  </div>
                  {/* Second Row: Job Information */}
                  <div className="job-info-row">
                    {/* Job ID */}
                    <div>
                      <span className="job-info-text">Job ID - {jobID} </span>
                    </div>
                    {/* Seperator */}
                    <div>
                      <span className="job-info-text">|</span>
                    </div>
                    {/* Job Title */}
                    <div>
                      <span className="job-info-text">
                        Job Title - {jobTitle}
                      </span>
                    </div>
                  </div>
                  {/* Third Row: Country */}
                  <div>
                    <span className="work-location-text">{workLocation}</span>
                  </div>
                </div>
              </div>
            )}
          </OffcanvasHeader>
          <OffcanvasBody>
            {/* Specific Data information */}
            <FODTagTable
              selectedRowData={selectedRowData}
              tagOffcanvas={tagOffcanvas}
            />
          </OffcanvasBody>
        </Offcanvas>
      </Col>
    </Row>
  );
};

export default JobTagCanvas;
