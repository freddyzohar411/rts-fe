import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Row,
  Col,
  Button,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Table,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
  Tooltip,
} from "reactstrap";

import {
  fetchJobForm,
  fetchJobFormSubmission,
  clearJobFormSubmission,
} from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { JOB_FORM_NAME } from "../JobCreation/constants";
import { useUserAuth } from "@workspace/login";

// Forms
import AssociateCandidate from "../AssociateCandidate/AssociateCandidate";
import SubmitToSales from "../SubmitToSales/SubmitToSales";
import SubmitToClient from "../SubmitToClient/SubmitToClient";
import ProfileFeedbackPending from "../ProfileFeedbackPending/ProfileFeedbackPending";
import ScheduleInterview from "../ScheduleInterview/ScheduleInterview";
import { ConditionalOffer } from "../ConditionalOffer";
import { ConditionalOfferStatus } from "../ConditionalOfferStatus";
import StepComponent from "./StepComponent";
import { TimelineHeader } from "../TimelineHeader";
import { CVPreview } from "../CVPreview";

function JobOverview() {
  document.title = "Job Timeline | RTS";

  const [timelineTab, setTimelineTab] = useState("1");
  const [offcanvasForm, setOffcanvasForm] = useState(false);
  const [stepperState, setStepperState] = useState("");
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [isPreviewCV, setIsPreviewCV] = useState(false);

  const handlePreviewCVClick = () => {
    setIsPreviewCV(true);
  };

  const handleExitPreview = () => {
    setIsPreviewCV(false);
  };

  const steps = [0, 1, 2, 3, 4, 5, 6, 7];

  // Retrieve Job Information (Start)
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
  // Retrieve Job Information (End)

  useEffect(() => {
    // Set the stepper state based on the active step
    switch (activeStep) {
      case 1:
        setStepperState("Associate");
        break;
      case 2:
        setStepperState("Submit to Sales");
        break;
      case 3:
        setStepperState("Submit to Client");
        break;
      case 4:
        setStepperState("Profile Feedback Pending");
        break;
      case 5:
        setStepperState("Schedule Interview");
        break;
      case 6:
        setStepperState("Conditional Offer");
        break;
      case 7:
        setStepperState("Conditional Offer Status");
        break;
      default:
        setStepperState("");
    }
  }, [activeStep]);

  const getFormComponent = (step, closeOffcanvas) => {
    switch (step) {
      case 1:
        return <AssociateCandidate closeOffcanvas={closeOffcanvas} />;
      case 2:
        return isPreviewCV ? (
          <CVPreview onExitPreview={handleExitPreview} />
        ) : (
          <SubmitToSales
            closeOffcanvas={closeOffcanvas}
            onPreviewCVClick={handlePreviewCVClick}
          />
        );
      case 3:
        return isPreviewCV ? (
          <CVPreview onExitPreview={handleExitPreview} />
        ) : (
          <SubmitToClient
            closeOffcanvas={closeOffcanvas}
            onPreviewCVClick={handlePreviewCVClick}
          />
        );
      case 4:
        return <ProfileFeedbackPending closeOffcanvas={closeOffcanvas} />;
      case 5:
        return <ScheduleInterview closeOffcanvas={closeOffcanvas} />;
      case 6:
        return <ConditionalOffer closeOffcanvas={closeOffcanvas} />;
      case 7:
        return <ConditionalOfferStatus closeOffcanvas={closeOffcanvas} />;
      default:
        return null;
    }
  };

  // Close Preview CV when OffCanvas is Closed
  useEffect(() => {
    if (offcanvasForm === false) {
      setIsPreviewCV(false);
    }
  }, [offcanvasForm]);

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
    "Conditional Offer Accepted/Declined",
  ];

  const timelineSkip = [
    { 1: "Associate" },
    { 2: "Submit to Sales" },
    { 3: "Submit to Client" },
    { 4: "Profile Feedback Pending" },
    { 5: "Interview" },
    { 6: "Conditional Offer" },
    { 7: "Conditional Offer Status" },
  ];

  return (
    <React.Fragment>
      <div>
        <Row>
          <TimelineHeader data={jobHeaders} />
        </Row>
        <hr className="border border-dashed border-dark" />
        <Row className="mb-3">
          <Col>
            <div className="d-flex flex-row justify-content-between align-items-center">
              <div className="d-flex flex-row h5 fw-bold align-items-end gap-1">
                <span>{formSubmissionData?.accountName} | </span>
                <span>{formSubmissionData?.jobTitle} | </span>
                <span>{formSubmissionData?.clientJobId} | </span>
                <div className="d-flex flex-column">
                  <span className="fw-medium h6 text-muted">Sales</span>
                  <span>{formSubmissionData?.salesManager} | </span>
                </div>
                <div className="d-flex flex-column">
                  <span className="fw-medium h6 text-muted">Delivery</span>
                  <span>Ganesh, Priya, Vinod</span>
                </div>
              </div>

              <div className="d-flex flex-row gap-2 align-items-center">
                <div className="search-box" style={{ width: "300px" }}>
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
            <NavItem>
              <NavLink>
                <div className="d-flex flex-row gap-2 fw-semibold">
                  <span>Status Overview</span>
                  <span>|</span>
                  <span>Overall Man Days: 30</span>
                </div>
              </NavLink>
            </NavItem>
          </Nav>
        </Row>

        <Row>
          <TabContent activeTab={timelineTab} className="p-0">
            <TabPane tabId="1">
              <div className="overflow-auto">
                <Table
                  className="table table-striped align-middle"
                  style={{ tableLayout: "fixed", wordWrap: "break-word" }}
                >
                  <thead className="table-light">
                    <tr>
                      {rtsStatusHeaders.map((header, index) => (
                        <th
                          className="text-center align-middle"
                          key={header}
                          style={{
                            width:
                              index === 0 || index === 1 ? "90px" : "150px",
                          }}
                        >
                          {header}
                        </th>
                      ))}
                      <th
                        className="text-center align-middle"
                        style={{ width: "150px" }}
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center align-top">
                      <td className="pt-4">Jane Lee</td>
                      <td className="pt-4">Aaron Loo (7hrs)</td>
                      {steps.map((step, index) => (
                        <td key={index} className="px-0">
                          <StepComponent
                            timelineState={activeStep}
                            index={index}
                          />
                        </td>
                      ))}
                      <td>
                        <div className="d-flex flex-row gap-3 align-items-center">
                          <Input
                            type="select"
                            value={activeStep}
                            onChange={(e) =>
                              setActiveStep(parseInt(e.target.value))
                            }
                          >
                            <option value="">Select</option>
                            {timelineSkip.map((item, index) => (
                              <option key={index} value={index + 1}>
                                {Object.values(item)[0]}
                              </option>
                            ))}
                          </Input>

                          <i
                            onClick={() => setOffcanvasForm(!offcanvasForm)}
                            id="next-step"
                            className="ri-share-forward-fill fs-5 text-custom-primary cursor-pointer"
                          ></i>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </TabPane>
            <TabPane tabId="2">
              <div className="p-4">
                <span>BSG Status</span>
              </div>
            </TabPane>
          </TabContent>
        </Row>

        <Offcanvas
          isOpen={offcanvasForm}
          toggle={() => setOffcanvasForm(!offcanvasForm)}
          direction="end"
          style={{ width: "75vw" }}
        >
          {/* Offcanvas Header */}
          <div className="offcanvas-header border-bottom border-bottom-dashed d-flex flex-row justify-content-between align-items-end">
            {/* Circular Icon and Job Information */}
            <div className="d-flex flex-row gap-4">
              {/* Circular Icon */}
              <div className="avatar-md flex-shrink-0">
                <div className="avatar-title rounded-circle fs-4 flex-shrink-0">
                  {formSubmissionData?.accountName.charAt(0)}
                </div>
              </div>
              {/* Job Information */}
              <div>
                <div>
                  <span className="h4 fw-bold">
                    {formSubmissionData?.accountName}
                  </span>
                </div>
                <div className="d-flex flex-row gap-4">
                  <span className="h6 fw-semibold text-nowrap">
                    Job ID - {formSubmissionData?.clientJobId}
                  </span>
                  <span className="h6 fw-semibold text-nowrap">
                    Job Title - {formSubmissionData?.jobTitle}
                  </span>
                </div>
                <div>
                  <span className="h6 text-muted fw-bold">{stepperState}</span>
                </div>
              </div>
            </div>
            {/* Template Selector */}
            {(activeStep === 6) | isPreviewCV && (
              <div>
                <Input
                  type="select"
                  className="form-select form-select-md"
                  style={{ width: "250px" }}
                >
                  <option value="">Select Template</option>
                  <option value="">Template 1</option>
                  <option value="">Template 2</option>
                </Input>
              </div>
            )}
          </div>
          <OffcanvasBody>
            {getFormComponent(activeStep, () =>
              setOffcanvasForm(!offcanvasForm)
            )}
          </OffcanvasBody>
        </Offcanvas>

        <Tooltip
          target="next-step"
          isOpen={tooltipOpen}
          toggle={() => setTooltipOpen(!tooltipOpen)}
          placement="bottom"
        >
          {stepperState}
        </Tooltip>
      </div>
    </React.Fragment>
  );
}

export default JobOverview;
