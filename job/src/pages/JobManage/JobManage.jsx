import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Breadcrumb, BreadcrumbItem, Row, Col } from "reactstrap";
import { StringHelper } from "@workspace/common";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingOverlay from "react-loading-overlay";
import JobCreation from "../../components/JobCreation/JobCreation";
import JobOverview from "../../components/JobOverview/JobOverview";
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

  return (
    <LoadingOverlay
      active={jobTagMeta?.isLoading ?? false}
      spinner
      text="Please wait..."
    >
      <div className="page-content">
        <Container fluid className="p-0">
          <Nav className="nav-tabs-custom">
            <NavItem>
              <NavLink
                className={classnames(
                  {
                    active: ugTab === "1",
                  },
                  "cursor-pointer"
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
                  "cursor-pointer"
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
                  "cursor-pointer"
                )}
                onClick={() => {
                  toggleUg("0");
                }}
              >
                <span>Email</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames(
                  {
                    active: ugTab === "4",
                  },
                  "cursor-pointer"
                )}
                onClick={() => {
                  toggleUg("0");
                }}
              >
                <span>Performace</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames(
                  {
                    active: ugTab === "5",
                  },
                  "cursor-pointer"
                )}
                onClick={() => {
                  toggleUg("0");
                }}
              >
                <span>Task</span>
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={ugTab}>
            {/*OVERVIEW*/}
            <TabPane tabId="1" id="manageOverview">
              <Card>
                <CardBody>
                  <JobOverview />
                </CardBody>
              </Card>
            </TabPane>
            {/*SNAPSHOT*/}
            <TabPane tabId="2" id="manageSnapshot">
              <Card>
                <CardBody>
                  <JobCreation />
                </CardBody>
              </Card>
            </TabPane>
            {/*EMAIL*/}
            <TabPane tabId="3" id="manageSnapshot">
              <Card>
                <CardBody>TBA</CardBody>
              </Card>
            </TabPane>
            {/*PERFORMANCE*/}
            <TabPane tabId="4" id="manageSnapshot">
              <Card>
                <CardBody>TBA</CardBody>
              </Card>
            </TabPane>
            {/*TASK*/}
            <TabPane tabId="5" id="manageSnapshot">
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
