import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Input,
  Button,
  Table,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";

const JobOverview = () => {
  document.title = "Job Timeline | RTS";
  const [timelineTab, setTimelineTab] = useState("1");

  const jobHeaders = [
    "Submitted to Sales",
    "Submitted to Client",
    "Profile Feedback Pending",
    "Interview Scheduled",
    "Interview Sched - Future",
    "Interview Happened",
    "Interview Cancelled/Backout",
    "Interview Pending Feedback",
  ];

  const rtsStatusHeaders = [
    "Candidate",
    "Recruiter",
    "Tag",
    "Associate",
    "Submit to Sales",
    "Submit to Client",
    "Profile Feedback Pending",
    "Interviews",
    "Conditional Offer Sent",
    "Conditional Offer Accepter/Declined",
  ];
  return (
    <div className="page-content">
      <Container fluid>
        <Card>
          <CardBody>
            <Row className="mb-3">
              <Col>
                <Row className="mb-3">
                  <Col>
                    <div className="d-flex flex-row justify-content-between text-center">
                      {jobHeaders.map((job) => (
                        <div
                          key={job}
                          className="d-flex flex-column align-items-center gap-2"
                        >
                          <span
                            className="bg-dark rounded-circle text-white"
                            style={{ height: "20px", width: "20px" }}
                          >
                            1
                          </span>
                          <span>{job}</span>
                        </div>
                      ))}
                    </div>
                  </Col>
                </Row>
                <hr className="border border-dashed border-dark" />
                <Row className="mb-3">
                  <Col>
                    <div className="d-flex flex-row justify-content-between">
                      <div>
                        <span className="h5 text-dark fw-bold">
                          TCS | Java Dev | 165937 | Diptii | Ganesh, Priya,
                          Vinod
                        </span>
                      </div>

                      <div className="d-flex flex-row gap-2 align-items-center">
                        <div className="search-box" style={{ width: "500px" }}>
                          <Input
                            placeholder="Search.."
                            className="form-control"
                          />
                          <i className="ri-search-eye-line search-icon"></i>
                        </div>
                        <Button className="btn btn-custom-primary">
                          <i className="ri-filter-2-fill"></i>
                        </Button>
                        <Button className="btn btn-custom-primary">
                          <i className="ri-message-2-fill"></i>
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Nav tabs>
                      <NavItem>
                        <NavLink
                          className={`cursor-pointer ${
                            timelineTab === "1" ? "active" : ""
                          }`}
                          onClick={() => setTimelineTab("1")}
                        >
                          RTS Status
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={`cursor-pointer ${
                            timelineTab === "2" ? "active" : ""
                          }`}
                          onClick={() => setTimelineTab("2")}
                        >
                          BSG Status
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent activeTab={timelineTab}>
                      <TabPane tabId="1">
                        <div>
                          <Table className="table table-hover table-striped border-secondary">
                            <thead>
                              <tr className="bg-light">
                                {rtsStatusHeaders.map((header) => (
                                  <th key={header}>{header}</th>
                                ))}
                                {/* Actions */}
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                {rtsStatusHeaders.map((header) => (
                                  <td key={header}>{header}</td>
                                ))}
                              </tr>
                              <tr>
                                {rtsStatusHeaders.map((header) => (
                                  <td key={header}>{header}</td>
                                ))}
                              </tr>
                              <tr>
                                {rtsStatusHeaders.map((header) => (
                                  <td key={header}>{header}</td>
                                ))}
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </TabPane>
                      <TabPane tabId="2">
                        <div>BSG Status</div>
                      </TabPane>
                    </TabContent>
                  </Col>
                </Row>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default JobOverview;
