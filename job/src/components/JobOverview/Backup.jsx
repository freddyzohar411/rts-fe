import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Row,
  Col,
  Input,
  Button,
  Table,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
} from "reactstrap";
import {
  fetchJobForm,
  fetchJobFormSubmission,
  clearJobFormSubmission,
} from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { JOB_FORM_NAME } from "../JobCreation/constants";
import { useUserAuth } from "@workspace/login";

import { TimelineProgressBar } from "../TimelineProgressBar";
import AssociateCandidate from "../AssociateCandidate/AssociateCandidate";
import SubmitToSales from "../SubmitToSales/SubmitToSales";
import ProfileFeedbackPending from "../ProfileFeedbackPending/ProfileFeedbackPending";
import ScheduleInterview from "../ScheduleInterview/ScheduleInterview";
import { ConditionalOffer } from "../ConditionalOffer";
import { ConditionalOfferStatus } from "../ConditionalOfferStatus";

const JobOverview = () => {
  document.title = "Job Timeline | RTS";
  const [timelineTab, setTimelineTab] = useState("1");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getAllUserGroups, Permission, checkAllPermission } = useUserAuth();
  const { jobId, type } = useParams();
  const location = useLocation();
  const linkState = location.state;
  const [view, setView] = useState(
    linkState?.view !== null && linkState?.view !== undefined
      ? linkState?.view
      : false
  );
  const formikRef = useRef(null);
  const form = useSelector((state) => state.JobFormReducer.form);
  const formSubmissionData = useSelector(
    (state) => state.JobFormReducer.formSubmission
  );
  const [formTemplate, setFormTemplate] = useState(null);

  // Fetch all the countries and account names
  useEffect(() => {
    dispatch(fetchJobForm(JOB_FORM_NAME));
  }, []);

  useEffect(() => {
    if (form) {
      setFormTemplate(JSON.parse(JSON.stringify(form)));
    }
  }, [form]);

  useEffect(() => {
    dispatch(clearJobFormSubmission());
    if (jobId) {
      dispatch(fetchJobFormSubmission(jobId));
    }
  }, [jobId]);

  const handleFormFieldChange = useCallback((formFields) => {
    setFormFieldsData(formFields);
  }, []);

  const checkReadEditPermission = () => {
    return checkAllPermission([Permission.JOB_EDIT, Permission.JOB_READ]);
  };

  const toggleFormViewState = () => {
    setView(!view);
  };

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

  const [associateCandidateOC, setAssociatCandidateOC] = useState(false);

  return (
    <div>
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
                <div>| Java Dev | 165937 | Diptii | Ganesh, Priya, Vinod</div>

                <div className="d-flex flex-row gap-2 align-items-center">
                  <div className="search-box" style={{ width: "500px" }}>
                    <Input placeholder="Search.." className="form-control" />
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
                    <Table className="table align-middle table-hover table-striped table-bordered border-secondary">
                      <thead>
                        <tr className="bg-light">
                          {rtsStatusHeaders.map((header) => (
                            <th key={header} className="text-center">
                              {header}
                            </th>
                          ))}
                          {/* Actions */}
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="text-center">
                          <td>Jane Doe</td>
                          <td>Phoebe Koh</td>
                          <td>
                            <span
                              className="rounded rounded-circle p-1 bg-info d-flex justify-content-center align-self-center"
                              style={{ width: "15px", height: "15px" }}
                            ></span>
                          </td>

                          <td>
                            <span
                              className="rounded rounded-circle p-1 bg-info d-flex justify-content-center align-self-center"
                              style={{ width: "15px", height: "15px" }}
                            ></span>
                          </td>

                          <td>
                            <span
                              className="rounded rounded-circle p-1 bg-info d-flex justify-content-center align-self-center"
                              style={{ width: "15px", height: "15px" }}
                            ></span>
                          </td>

                          <td>
                            <span
                              className="rounded rounded-circle p-1 bg-info d-flex justify-content-center align-self-center"
                              style={{ width: "15px", height: "15px" }}
                            ></span>
                          </td>

                          <td>
                            <span
                              className="rounded rounded-circle p-1 bg-info d-flex justify-content-center align-self-center"
                              style={{ width: "15px", height: "15px" }}
                            ></span>
                          </td>

                          <td>
                            <span
                              className="rounded rounded-circle p-1 bg-info d-flex justify-content-center align-self-center"
                              style={{ width: "15px", height: "15px" }}
                            ></span>
                          </td>

                          <td>
                            <span
                              className="rounded rounded-circle p-1 bg-info d-flex justify-content-center align-self-center"
                              style={{ width: "15px", height: "15px" }}
                            ></span>
                          </td>

                          <td>
                            <span
                              className="rounded rounded-circle p-1 bg-info d-flex justify-content-center align-self-center"
                              style={{ width: "15px", height: "15px" }}
                            ></span>
                          </td>
                          <td>
                            <i
                              onClick={() =>
                                setAssociatCandidateOC(!associateCandidateOC)
                              }
                              className="ri-share-forward-fill fs-5 cursor-pointer"
                            ></i>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                  <TimelineProgressBar />
                </TabPane>

                <TabPane tabId="2">
                  <div>BSG Status</div>
                </TabPane>
              </TabContent>
              <Offcanvas
                isOpen={associateCandidateOC}
                toggle={() => setAssociatCandidateOC(!associateCandidateOC)}
                direction="end"
                style={{ width: "75vw" }}
              >
                <OffcanvasBody>
                  {/* <AssociateCandidate /> */}
                  {/* <SubmitToSales /> */}
                  {/* <ProfileFeedbackPending/> */}
                  {/* <ScheduleInterview/> */}
                  {/* <ConditionalOffer /> */}
                  <ConditionalOfferStatus />
                </OffcanvasBody>
              </Offcanvas>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default JobOverview;
