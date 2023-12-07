import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CustomNav } from "@workspace/common";
import { Container, Breadcrumb, BreadcrumbItem, Row, Col } from "reactstrap";

import JobCreation from "../../components/JobCreation/JobCreation";
import JobOverview from "../../components/JobOverview/JobOverview";
// import CandidatePerformance from "../../components/CandidatePerformance/CandidatePerformance";
// import CandidateEmail from "../../components/CandidateEmail/CandidateEmail";
// import CandidateTask from "../../components/CandidateTask/CandidateTask";

const JobManage = () => {
  const { jobId, slug } = useParams();

  const navContents = [
    { link: "SNAPSHOT", url: `/jobs/${jobId}/snapshot`, slug: "snapshot"},
    { link: "OVERVIEW", url: `/jobs/${jobId}/overview`, slug: "overview" },
    { link: "PERFORMANCE", url: `/jobs/${jobId}/performance`, slug: "performance" },
    { link: "EMAIL", url: `/jobs/${jobId}/email`, slug: "email" },
    { link: "TASK", url: `/jobs/${jobId}/task`, slug: "task" },
  ];

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col>
            <Breadcrumb>
              <BreadcrumbItem>jobs</BreadcrumbItem>
              <BreadcrumbItem active>{`${slug}`}</BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>

        <CustomNav navContents={navContents} slug={slug}>
          {slug == "snapshot" && <JobCreation />}
          {slug == "overview" && <JobOverview />}
          {/* {slug == "performance" && <CandidatePerformance />}
          {slug == "email" && <CandidateEmail />}
          {slug == "task" && <CandidateTask />} */}
        </CustomNav>
      </Container>
    </div>
  );
};

export default JobManage;
