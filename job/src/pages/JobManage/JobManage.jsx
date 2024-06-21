import React, { useState } from "react";
import { useSelector } from "react-redux";
import LoadingOverlay from "react-loading-overlay";
import JobCreation from "../../components/JobCreation/JobCreation";
import JobOverview from "../../components/JobOverview/JobOverview";
import { overviewHeaders } from "../../components/JobOverview/JobOverviewUtil";
import {
  Container,
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Tooltip,
} from "reactstrap";
import classnames from "classnames";
import "./JobManage.scss";

const JobManage = () => {
  const jobTagMeta = useSelector((state) => state.JobStageReducer.jobTagMeta);
  const jobAllTagMeta = useSelector(
    (state) => state.JobStageReducer.jobAllTagMeta
  );
  const navState = location.state;

  // Overview Header
  const [onRetrieveHeader, setOnRetrieveHeader] = useState(null);
  const [headerTooltip, setHeaderTooltip] = useState(false);
  const [tooltipIndexes, setTooltipIndexes] = useState();

  // Tabs
  const [ugTab, setUgTab] = useState(navState?.ugTab || "1");
  const toggleUg = (tab) => {
    if (ugTab !== tab) {
      setUgTab(tab);
    }
  };

  const handleOverviewHeader = (value) => {
    setOnRetrieveHeader(value);
  };

  /**
   * @author Rahul Sahu
   * @param {*} targetName
   * Toggle tooltip
   */
  const toggle = (targetName) => {
    if (!tooltipIndexes?.[targetName]) {
      setTooltipIndexes({
        ...tooltipIndexes,
        [targetName]: {
          tooltipOpen: true,
        },
      });
    } else {
      setTooltipIndexes({
        ...tooltipIndexes,
        [targetName]: {
          tooltipOpen: !tooltipIndexes?.[targetName]?.tooltipOpen,
        },
      });
    }
  };

  const isToolTipOpen = (targetName) => {
    return tooltipIndexes?.[targetName]
      ? tooltipIndexes?.[targetName]?.tooltipOpen
      : false;
  };

  return (
    <LoadingOverlay
      active={(jobTagMeta?.isLoading || jobAllTagMeta?.isLoading) ?? false}
      spinner
      text="Please wait..."
    >
      <div className="page-content">
        <div className="overview-header sticky-header">
          <div className="d-flex flex-wrap">
            {overviewHeaders.map((header, index) => {
              const shouldShowTooltip =
                onRetrieveHeader?.[header]?.trimValue.length > 20;
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
                    onClick={() => setHeaderTooltip(!headerTooltip)}
                  >
                    <span className="header-title">{header}</span>
                    <span className="header-subtitle">
                      {onRetrieveHeader?.[header]?.trimValue}
                    </span>
                  </div>
                  {shouldShowTooltip && (
                    <Tooltip
                      isOpen={isToolTipOpen(`btn-${index}`)}
                      placement="bottom-start"
                      target={`btn-${index}`}
                      toggle={() => toggle(`btn-${index}`)}
                    >
                      {onRetrieveHeader?.[header]?.value}
                    </Tooltip>
                  )}
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
