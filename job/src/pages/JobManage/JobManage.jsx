import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CustomNav } from "@workspace/common";
import { Container, Breadcrumb, BreadcrumbItem, Row, Col } from "reactstrap";
import { StringHelper } from "@workspace/common";

import JobCreation from "../../components/JobCreation/JobCreation";
import JobOverview from "../../components/JobOverview/JobOverview";
// import CandidatePerformance from "../../components/CandidatePerformance/CandidatePerformance";
// import CandidateEmail from "../../components/CandidateEmail/CandidateEmail";
// import CandidateTask from "../../components/CandidateTask/CandidateTask";

const JobManage = () => {
  const { jobId, slug } = useParams();

  const navContents = [
    { link: "Snapshot", url: `/jobs/${jobId}/snapshot`, slug: "snapshot" },
    { link: "Overview", url: `/jobs/${jobId}/overview`, slug: "overview" },
    {
      link: "Performance",
      url: `/jobs/${jobId}/performance`,
      slug: "performance",
    },
    { link: "Email", url: `/jobs/${jobId}/email`, slug: "email" },
    { link: "Task", url: `/jobs/${jobId}/task`, slug: "task" },
  ];

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col>
            <Breadcrumb>
              <BreadcrumbItem>Jobs</BreadcrumbItem>
              <BreadcrumbItem active>{`${StringHelper.capitalizeFirstLetter(
                slug
              )}`}</BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>

        <CustomNav navContents={navContents} slug={slug}>
          {slug == "snapshot" && (
            <div className="mt-3">
              <JobCreation />
            </div>
          )}
          {slug == "overview" && (
            <div className="mt-3">
              <JobOverview />
            </div>
          )}
          {/* {slug == "performance" && <CandidatePerformance />}
          {slug == "email" && <CandidateEmail />}
          {slug == "task" && <CandidateTask />} */}
        </CustomNav>
      </Container>
    </div>
  );
};

export default JobManage;
