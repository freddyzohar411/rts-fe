import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "reactstrap";
import { useSelector } from "react-redux";
import LoadingOverlay from "react-loading-overlay";
import JobCreation from "../../components/JobCreation/JobCreation";
import JobOverview from "../../components/JobOverview/JobOverview";
import { overviewHeaders } from "../../components/JobOverview/JobOverviewUtil";
import {
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import "./JobManage.scss";

const JobManage = () => {
  const { jobId, slug } = useParams();
  const jobTagMeta = useSelector((state) => state.JobStageReducer.jobTagMeta);
  const navState = location.state;

  // Tabs
  const [ugTab, setUgTab] = useState(navState?.ugTab || "1");
  const toggleUg = (tab) => {
    if (ugTab !== tab) {
      setUgTab(tab);
    }
  };

  // Overview Header
  const [onRetrieveHeader, setOnRetrieveHeader] = useState(null);
  const handleOverviewHeader = (value) => {
    setOnRetrieveHeader(value);
  };

  return (
    <LoadingOverlay
      active={jobTagMeta?.isLoading ?? false}
      spinner
      text="Please wait..."
    >
      <div className="page-content">
        <div className="overview-header">
          <div className="d-flex flex-wrap">
            {overviewHeaders.map((header, index) => {
              // const mobile = isMobile | isTablet;
              // const values = overviewValues(
              //   formSubmissionData,
              //   jobTimelineData,
              //   deliveryTeam,
              //   mobile
              // );
              // const shouldShowTooltip = values?.[header]?.value?.length > 20;
              return (
                <div
                  key={index}
                  style={{
                    flex: "0 0 calc(100% / 7)",
                    maxWidth: "calc(100% / 7)",
                    paddingBottom: "10px",
                  }}
                >
                  <div
                    className="d-flex flex-column cursor-pointer"
                    id={`btn-${index}`}
                    // onClick={() => setHeaderTooltip(!headerTooltip)}
                  >
                    <span className="fw-medium text-muted">{header}</span>
                    <span
                      className="fw-semibold gap-1"
                      style={{ color: "#0A56AE" }}
                    >
                      {onRetrieveHeader?.[header]?.trimValue}
                    </span>
                  </div>
                  {/* {shouldShowTooltip && (
                    <Tooltip
                      isOpen={isToolTipOpen(`btn-${index}`)}
                      placement="bottom-start"
                      target={`btn-${index}`}
                      toggle={() => toggle(`btn-${index}`)}
                    >
                      {onRetrieveHeader?.[header]?.value}
                    </Tooltip>
                  )} */}
                </div>
              );
            })}
          </div>
        </div>
        <Container fluid className="p-0">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames(
                  {
                    active: ugTab === "1",
                  },
                  "cursor-pointer px-4"
                )}
                onClick={() => {
                  toggleUg("1");
                }}
              >
                <span>Overview</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames(
                  {
                    active: ugTab === "2",
                  },
                  "cursor-pointer px-4"
                )}
                onClick={() => {
                  toggleUg("2");
                }}
              >
                <span>Snapshot</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames(
                  {
                    active: ugTab === "3",
                  },
                  "cursor-pointer px-4"
                )}
                onClick={() => {
                  toggleUg("3");
                }}
              >
                <span>Performance</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames(
                  {
                    active: ugTab === "4",
                  },
                  "cursor-pointer px-4"
                )}
                onClick={() => {
                  toggleUg("4");
                }}
              >
                <span>History</span>
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={ugTab}>
            {/*Overview*/}
            <TabPane tabId="1" id="manageOverview">
              <Card style={{ boxShadow: "none" }}>
                <CardBody
                  className="p-2 bg-light"
                  style={{ boxShadow: "none" }}
                >
                  <JobOverview onRetrieveHeader={handleOverviewHeader} />
                </CardBody>
              </Card>
            </TabPane>
            {/*Snapshot*/}
            <TabPane tabId="2" id="manageSnapshot">
              <Card>
                <CardBody>
                  <JobCreation key={ugTab} />
                </CardBody>
              </Card>
            </TabPane>
            {/*Perfomrmance*/}
            <TabPane tabId="3" id="manageSnapshot">
              <Card>
                <CardBody>TBA</CardBody>
              </Card>
            </TabPane>
            {/*History*/}
            <TabPane tabId="4" id="manageSnapshot">
              <Card>
                <CardBody>TBA</CardBody>
              </Card>
            </TabPane>
          </TabContent>
        </Container>
      </div>
    </LoadingOverlay>
  );
};

export default JobManage;
