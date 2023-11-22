import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CustomNav } from "@workspace/common";
import { Container, Breadcrumb, BreadcrumbItem, Row, Col } from "reactstrap";

import EditCandidate from "../../components/EditCandidate/EditCandidate";
import CandidateOverview from "../../components/CandidateOverview/CandidateOverview";
import CandidatePerformance from "../../components/CandidatePerformance/CandidatePerformance";
import CandidateEmail from "../../components/CandidateEmail/CandidateEmail";
import CandidateTask from "../../components/CandidateTask/CandidateTask";

const CandidateManage = () => {
  const { candidateId, slug } = useParams();

  const navContents = [
    { link: "SNAPSHOT", url: `/candidates/${candidateId}/snapshot`, slug: "snapshot"},
    { link: "OVERVIEW", url: `/candidates/${candidateId}/overview`, slug: "overview" },
    { link: "PERFORMANCE", url: `/candidates/${candidateId}/performance`, slug: "performance" },
    { link: "EMAIL", url: `/candidates/${candidateId}/email`, slug: "email" },
    { link: "TASK", url: `/candidates/${candidateId}/task`, slug: "task" },
  ];

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col>
            <Breadcrumb>
              <BreadcrumbItem>candidates</BreadcrumbItem>
              <BreadcrumbItem active>{`${slug}`}</BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>

        <CustomNav navContents={navContents} slug={slug}>
          {slug == "snapshot" && <EditCandidate />}
          {slug == "overview" && <CandidateOverview />}
          {slug == "performance" && <CandidatePerformance />}
          {slug == "email" && <CandidateEmail />}
          {slug == "task" && <CandidateTask />}
        </CustomNav>
      </Container>
    </div>
  );
};

export default CandidateManage;
