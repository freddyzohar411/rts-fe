import React from "react";
import { useParams } from "react-router-dom";
import { CustomNav } from "@workspace/common";
import { Container, Breadcrumb, BreadcrumbItem, Row, Col } from "reactstrap";
import { StringHelper } from "@workspace/common";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingOverlay from "react-loading-overlay";
import JobCreation from "../../components/JobCreation/JobCreation";
import JobOverview from "../../components/JobOverview/JobOverview";

const JobManage = () => {
  const { jobId, slug } = useParams();
  const jobTagMeta = useSelector((state) => state.JobStageReducer.jobTagMeta);

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
    <LoadingOverlay
      active={jobTagMeta?.isLoading ?? false}
      spinner
      text="Please wait..."
    >
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="/jobs">Jobs</Link>
                </BreadcrumbItem>
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
              <div>
                <JobOverview />
              </div>
            )}
          </CustomNav>
        </Container>
      </div>
    </LoadingOverlay>
  );
};

export default JobManage;
