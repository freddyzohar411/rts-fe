import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CustomNav } from "@workspace/common";
import { Container, Breadcrumb, BreadcrumbItem, Row, Col } from "reactstrap";
import { StringHelper } from "@workspace/common";

import EditCandidate from "../../components/EditCandidate/EditCandidate";
import CandidateOverview from "../../components/CandidateOverview/CandidateOverview";
import CandidatePerformance from "../../components/CandidatePerformance/CandidatePerformance";
import CandidateEmail from "../../components/CandidateEmail/CandidateEmail";
import CandidateTask from "../../components/CandidateTask/CandidateTask";

const CandidateManage = () => {
  const { candidateId, slug } = useParams();

  const navContents = [
    { link: "Snapshot", url: `/candidates/${candidateId}/snapshot`, slug: "snapshot"},
    { link: "Overview", url: `/candidates/${candidateId}/overview`, slug: "overview" },
    { link: "Performance", url: `/candidates/${candidateId}/performance`, slug: "performance" },
    { link: "Email", url: `/candidates/${candidateId}/email`, slug: "email" },
    { link: "Task", url: `/candidates/${candidateId}/task`, slug: "task" },
  ];

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col>
            <Breadcrumb>
              <BreadcrumbItem>Candidates</BreadcrumbItem>
              <BreadcrumbItem active>{`${StringHelper.capitalizeFirstLetter(slug)}`}</BreadcrumbItem>
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
