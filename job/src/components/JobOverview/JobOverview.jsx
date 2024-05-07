import React, { useState, useEffect, useRef } from "react";
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
  OffcanvasBody,
  Pagination,
  PaginationItem,
  PaginationLink,
  Tooltip,
  ButtonGroup,
  Spinner,
  Card,
  CardBody,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import {
  fetchJobForm,
  fetchJobFormSubmission,
  clearJobFormSubmission,
  fetchJobTimelineList,
  fetchJobtimeineCount,
  tagReset,
} from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { JOB_FORM_NAME } from "../JobCreation/constants";
import "./StepComponent.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// Elements
import { TemplateSelectByCategoryElement } from "@workspace/common";
// Forms
import AssociateCandidate from "../AssociateCandidate/AssociateCandidate";
import SubmitToSales from "../SubmitToSales/SubmitToSales";
import SubmitToClient from "../SubmitToClient/SubmitToClient";
import ProfileFeedbackPending from "../ProfileFeedbackPending/ProfileFeedbackPending";
import ScheduleInterview from "../ScheduleInterview/ScheduleInterview";
import FirstInterviewFeedbackPending from "../FirstInterviewFeedback/FirstInterviewFeedback";
import ThirdInterviewFeedbackPending from "../ThirdInterviewFeedback/ThirdInterviewFeedback";
import SecondInterviewFeedbackPending from "../SecondInterviewFeedback/SecondInterviewFeedback";
import { ConditionalOffer } from "../ConditionalOffer";
import { ConditionalOfferStatus } from "../ConditionalOfferStatus";
import StepComponent from "./StepComponent";
import { TimelineHeader } from "../TimelineHeader";
import { CVPreview } from "../CVPreview";
import {
  JOB_TIMELINE_INITIAL_OPTIONS,
  jobHeaders,
  rtsStatusHeaders,
  steps,
  timelineSkip,
  timelineSkipModule,
  timelineSkipSubModule,
  timelineLegend,
  stepOrders,
  newHeaders,
} from "./JobOverviewConstants";
import { DynamicTableHelper, useTableHook } from "@workspace/common";
import "./JobOverview.scss";
import { JOB_STAGE_STATUS } from "../JobListing/JobListingConstants";
import { useMediaQuery } from "react-responsive";
import BSGTimeline from "../BSGTimeline/BSGTimeline";
import { truncate } from "@workspace/common/src/helpers/string_helper";
import { SkillAssessment } from "../SkillAssessment";
import { CodingTest } from "../CodingTest";
import { CulturalFitTest } from "../CulturalFitTest";
import { TechnicalInterview } from "../TechnicalInterview";
import PreSkillAssessment from "../PreSkillAssessment/PreSkillAssessment";
import { overviewHeaders, overviewValues } from "./JobOverviewUtil";
import { SideDrawer } from "@workspace/common";
import "./ViewTemplateSection.scss";
import TemplatePreviewSideDrawer from "./TemplatePreviewSideDrawer/TemplatePreviewSideDrawer";
import ModalFormWrapper from "../ModalFormWrapper/ModalFormWrapper";
import OverviewStepComponent from "./OverviewStepComponent";
import InnerTimelineStep from "./InnerTimelineStep";

const JobOverview = () => {
  document.title = "Job Timeline | RTS";
  const formikRef = useRef(); // Formik reference

  const [openJobIndex, setOpenJobIndex] = useState(null);
  const toggleJobOpen = (index) => {
    setOpenJobIndex(openJobIndex === index ? null : index);
  };
  // Next Step Dropdown States
  const [selectedModule, setSelectedModule] = useState("");
  const handleModuleChange = (e) => {
    setSelectedModule(e.target.value);
  };

  const isTablet = useMediaQuery({ query: "(max-width: 1224px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isBigScreen = useMediaQuery({ query: "(max-width: 1440px)" });
  const [legendTooltip, setLegendTooltip] = useState(false);
  const [headerTooltip, setHeaderTooltip] = useState(false);

  const dispatch = useDispatch();
  const { jobId } = useParams();

  const [timelineTab, setTimelineTab] = useState("1");
  const [offcanvasForm, setOffcanvasForm] = useState(false);
  const [stepperState, setStepperState] = useState("");
  const [activeStep, setActiveStep] = useState(1);

  const [templateData, setTemplateData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [formTemplate, setFormTemplate] = useState(null);
  const [candidateId, setCandidateId] = useState();

  const [isPreviewCV, setIsPreviewCV] = useState(false);
  const [skipComboOptions, setSkipComboOptions] = useState({});

  const [deliveryTeam, setDeliveryTeam] = useState();
  const [timelineRowIndex, setTimelineRowIndex] = useState();
  const [tooltipIndexes, setTooltipIndexes] = useState();
  const [isViewTemplate, setIsViewTemplate] = useState(false);
  const [templatePreviewInfo, setTemplatePreviewInfo] = useState(null);
  const [templatePreviewAction, setTemplatePreviewAction] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formModalHeader, setFormModalHeader] = useState("Header");

  // Email Loading
  const emailIsLoading = useSelector(
    (state) => state.EmailCommonReducer.loading
  );

  const jobTimelineMeta = useSelector(
    (state) => state.JobStageReducer.jobTimelineMeta
  );
  const form = useSelector((state) => state.JobFormReducer.form);
  const formSubmissionData = useSelector(
    (state) => state.JobFormReducer.formSubmission
  );

  const jobTimelineData = useSelector(
    (state) => state.JobStageReducer.jobTimeline
  );
  const jobTagMeta = useSelector((state) => state.JobStageReducer.jobTagMeta);

  // Custom renders
  const customRenderList = [
    {
      names: ["updatedAt", "createdAt"],
      render: (data, opt) =>
        DateHelper.formatDateStandard2(
          DynamicTableHelper.getDynamicNestedResult(data, opt.value) || "-"
        ),
    },
  ];

  // Table Hooks
  const {
    pageRequest,
    pageRequestSet,
    pageInfo,
    setPageInfoData,
    search,
    setSearch,
    customConfig,
    setCustomConfigData,
  } = useTableHook(
    {
      page: 0,
      pageSize: 20,
      sortBy: null,
      sortDirection: "asc",
      searchTerm: null,
      searchFields: [
        "candidate.first_name",
        "candidate.last_name",
        "users.first_name",
        "users.last_name",
      ],
    },
    JOB_TIMELINE_INITIAL_OPTIONS,
    customRenderList
  );

  useEffect(() => {
    if (jobTagMeta?.isSuccess) {
      setOffcanvasForm(false);
      dispatch(
        fetchJobTimelineList({
          ...DynamicTableHelper.cleanPageRequest(pageRequest),
          jobId: parseInt(jobId),
        })
      );
      dispatch(fetchJobtimeineCount({ jobId }));
      dispatch(tagReset());
    }
  }, [jobTagMeta]);

  // Fetch the job when the pageRequest changes
  useEffect(() => {
    dispatch(
      fetchJobTimelineList({
        ...DynamicTableHelper.cleanPageRequest(pageRequest),
        jobId: parseInt(jobId),
      })
    );
  }, [pageRequest]);

  // Update the page info when job Data changes
  useEffect(() => {
    if (jobTimelineData) {
      setPageInfoData(jobTimelineData);
      const uniqueNames = [
        ...new Set(jobTimelineData?.jobs?.map((item) => item?.createdByName)),
      ];
      setDeliveryTeam(uniqueNames);

      let jsonObject = {};
      jobTimelineData?.jobs?.map((data) => {
        let maxOrder = getMaxOrder(data);
        const status = getStatus(data, maxOrder);
        if (maxOrder >= 6 && maxOrder < 9) {
          maxOrder = 5;
        } else if (maxOrder === 9) {
          maxOrder = status === JOB_STAGE_STATUS.IN_PROGRESS ? 5 : 9;
        } else if (maxOrder >= 10 && maxOrder < 13) {
          maxOrder = 9;
        }
        jsonObject[data?.id] = maxOrder;
      });
      setSkipComboOptions(jsonObject);
    }
  }, [jobTimelineData]);

  useEffect(() => {
    dispatch(fetchJobForm(JOB_FORM_NAME));
    dispatch(fetchJobtimeineCount({ jobId }));
  }, []);

  useEffect(() => {
    if (form) {
      setFormTemplate(form);
    }
  }, [form]);

  useEffect(() => {
    dispatch(clearJobFormSubmission());
    if (jobId) {
      dispatch(fetchJobFormSubmission(jobId));
    }
  }, [jobId]);

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
        setStepperState("Pre-Skill Assessment");
        break;
      case 6:
        setStepperState("Review Skill Assessment Results");
        break;
      case 7:
        setStepperState("Review Coding Test Results");
        break;
      case 8:
        setStepperState("Review Technical Interview Results");
        break;
      case 9:
        setStepperState("Review Cultural Fit Test Results");
        break;
      case 10:
        setStepperState("Schedule First Interview");
        break;
      case 11:
        setStepperState("Update 1st Interview Feedback");
        break;
      case 12:
        setStepperState("Schedule Second Interview");
        break;
      case 13:
        setStepperState("Update 2nd Interview Feedback");
        break;
      case 14:
        setStepperState("Schedule Third Interview");
        break;
      case 15:
        setStepperState("Interview Feedback Pending");
        break;
      case 16:
        setStepperState("Conditional Offer");
        break;
      case 17:
        setStepperState("Conditional Offer Status");
        break;
      default:
        setStepperState("");
    }
  }, [activeStep]);

  // Close Preview CV when OffCanvas is Closed
  useEffect(() => {
    // Set Category for Template
    switch (activeStep) {
      case 2:
        setSelectedCategory("CV");
        break;
      case 3:
        setSelectedCategory("CV");
        break;
      case 11:
        setSelectedCategory("Conditional Offer");
        break;
      default:
        setSelectedCategory(null);
    }
  }, [activeStep]);

  useEffect(() => {
    if (offcanvasForm === false) {
      setIsPreviewCV(false);
    }
  }, [offcanvasForm]);

  const handlePreviewCVClick = () => {
    setIsPreviewCV(true);
  };

  const handleExitPreview = () => {
    setIsPreviewCV(false);
  };

  const handleSkipSelection = (jobId, value) => {
    const newOb = { ...skipComboOptions };
    newOb[jobId] = value;
    setSkipComboOptions(newOb);
  };

  const getMaxOrder = (data) => {
    const values = Object.values(data?.timeline);
    let maxOrder = 1;
    if (values) {
      let orders = values?.map((item) => item?.order);
      if (orders) {
        orders = orders.sort((a, b) => b - a);
        maxOrder = orders?.[0] ?? 1;
      }
    }
    return maxOrder;
  };

  const getStatus = (data, orderNo) => {
    const values = Object.values(data?.timeline);
    let status;
    if (values) {
      let orders = values?.filter((item) => item?.order === orderNo);
      if (orders) {
        status = orders?.[0]?.status ?? null;
      }
    }
    return status;
  };

  const getFormComponent = (step, closeOffcanvas) => {
    switch (step) {
      case 1:
        return (
          <AssociateCandidate
            closeOffcanvas={closeOffcanvas}
            jobId={jobId}
            candidateId={candidateId}
            timelineData={jobTimelineData?.jobs?.[timelineRowIndex]}
          />
        );
      case 2:
        return (
          <SubmitToSales
            closeOffcanvas={closeOffcanvas}
            templateData={templateData}
            jobId={jobId}
            candidateId={candidateId}
            setIsViewTemplate={setIsViewTemplate}
            setTemplatePreviewInfo={setTemplatePreviewInfo}
            setTemplatePreviewAction={setTemplatePreviewAction}
            setOffcanvasForm={setOffcanvasForm}
            ref={formikRef}
            jobTimeLineData={jobTimelineData?.jobs?.[timelineRowIndex]}
          />
        );
      case 3:
        return (
          <SubmitToClient
            closeOffcanvas={closeOffcanvas}
            templateData={templateData}
            jobId={jobId}
            candidateId={candidateId}
            setIsViewTemplate={setIsViewTemplate}
            setTemplatePreviewInfo={setTemplatePreviewInfo}
            setTemplatePreviewAction={setTemplatePreviewAction}
            setOffcanvasForm={setOffcanvasForm}
            ref={formikRef}
            jobTimeLineData={jobTimelineData?.jobs?.[timelineRowIndex]}
          />
        );
      case 4:
        return (
          <ProfileFeedbackPending
            closeOffcanvas={closeOffcanvas}
            jobId={jobId}
            candidateId={candidateId}
            handleIconClick={handleIconClick}
          />
        );
      case 5:
        return (
          <PreSkillAssessment
            closeOffcanvas={closeOffcanvas}
            jobId={jobId}
            candidateId={candidateId}
            activeStep={step}
          />
        );
      case 6:
        return (
          <SkillAssessment
            closeOffcanvas={closeOffcanvas}
            jobId={jobId}
            candidateId={candidateId}
            activeStep={step}
          />
        );
      case 7:
        return (
          <CodingTest
            closeOffcanvas={closeOffcanvas}
            jobId={jobId}
            candidateId={candidateId}
            activeStep={step}
          />
        );
      case 8:
        return (
          <TechnicalInterview
            closeOffcanvas={closeOffcanvas}
            jobId={jobId}
            candidateId={candidateId}
            activeStep={step}
          />
        );
      case 9:
        return (
          <CulturalFitTest
            closeOffcanvas={closeOffcanvas}
            jobId={jobId}
            candidateId={candidateId}
            activeStep={step}
          />
        );
      case 10:
        return (
          <ScheduleInterview
            closeOffcanvas={closeOffcanvas}
            jobId={jobId}
            candidateId={candidateId}
            activeStep={step}
          />
        );
      case 11:
        return (
          <FirstInterviewFeedbackPending
            closeOffcanvas={closeOffcanvas}
            jobId={jobId}
            candidateId={candidateId}
            handleIconClick={handleIconClick}
          />
        );
      case 12:
        return (
          <ScheduleInterview
            closeOffcanvas={closeOffcanvas}
            jobId={jobId}
            candidateId={candidateId}
            activeStep={step}
          />
        );
      case 13:
        return (
          <SecondInterviewFeedbackPending
            closeOffcanvas={closeOffcanvas}
            jobId={jobId}
            candidateId={candidateId}
            handleIconClick={handleIconClick}
          />
        );
      case 14:
        return (
          <ScheduleInterview
            closeOffcanvas={closeOffcanvas}
            jobId={jobId}
            candidateId={candidateId}
            activeStep={step}
          />
        );
      case 15:
        return (
          <ThirdInterviewFeedbackPending
            closeOffcanvas={closeOffcanvas}
            jobId={jobId}
            candidateId={candidateId}
          />
        );
      case 16:
        return (
          <ConditionalOffer
            templateData={templateData}
            closeOffcanvas={closeOffcanvas}
            candidateId={candidateId}
            jobId={parseInt(jobId)}
            activeStep={step}
          />
        );
      case 17:
        return (
          <ConditionalOfferStatus
            closeOffcanvas={closeOffcanvas}
            candidateId={candidateId}
            jobId={parseInt(jobId)}
            activeStep={step}
          />
        );
      default:
        return null;
    }
  };

  const handleSort = (index) => {
    if (index === 0 || index === 1) {
      const option = JOB_TIMELINE_INITIAL_OPTIONS[index];
      // pageRequestSet.setSortAndDirection(option);
    }
  };

  const handleIconClick = (id, jobId, actStep, openCanvas) => {
    const activeStep = actStep ?? skipComboOptions[jobId];
    setActiveStep(activeStep);
    if (!openCanvas) {
      setOffcanvasForm(!offcanvasForm);
    }
    setCandidateId(id);
  };

  /**
   * @author Rahul Sahu
   * @description Get form index on the basis of index
   */
  const getFormIndex = (originalOrder, jobId) => {
    let index = null;
    switch (originalOrder) {
      case 6:
        index = 6;
        break;
      case 7:
        index = 7;
        break;
      case 8:
        index = 8;
        break;
      case 9:
        index = skipComboOptions?.[jobId] === 9 ? 10 : 9;
        break;
      case 10:
        index = 11;
        break;
      case 11:
        index = 13;
        break;
      case 12:
        index = 15;
        break;
      case 13:
        index = 16;
        break;
      case 14:
        index = 17;
        break;
      default:
        break;
    }
    return index;
  };

  const renderLegend = () => {
    return (
      <div className="d-flex flex-wrap">
        {timelineLegend.map((item, index) => (
          <div
            key={index}
            className="d-flex flex-row gap-2 justify-content-start align-items-center me-2"
            style={{ width: "calc(50% - 8px)" }}
          >
            <div
              className={`bg-${item.color} rounded-circle`}
              style={{
                width: "9px",
                height: "9px",
                backgroundColor: `${item.color}`,
                border: `1px solid ${item.color}`,
              }}
            ></div>
            <div>
              <span>{item.legend}</span>
            </div>
          </div>
        ))}
      </div>
    );
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
  // Retrieve individual candidate data - job timeline
  const generateBodyJsx = (jobTimelineMeta, jobTimelineData) => {
    return (
      <React.Fragment>
        {jobTimelineData?.jobs && jobTimelineData?.jobs?.length > 0 ? (
          jobTimelineData?.jobs?.map((data, timelineIndex) => {
            const candidateData = data?.candidate;
            let maxOrder = getMaxOrder(data);
            const status = getStatus(data, maxOrder);
            maxOrder =
              status !== JOB_STAGE_STATUS.REJECTED &&
              status !== JOB_STAGE_STATUS.WITHDRAWN
                ? maxOrder
                : maxOrder - 1;
            const isRejected =
              status === JOB_STAGE_STATUS.REJECTED ||
              status === JOB_STAGE_STATUS.WITHDRAWN;
            const isInProgress = JOB_STAGE_STATUS.IN_PROGRESS;
            const originalOrder = maxOrder;
            if (maxOrder >= 6 && maxOrder < 9) {
              maxOrder = 5;
            } else if (maxOrder === 9) {
              maxOrder = status === JOB_STAGE_STATUS.IN_PROGRESS ? 5 : 9;
            } else if (maxOrder >= 10 && maxOrder < 13) {
              maxOrder = 9;
            }
            return (
              <>
                <tr className="cursor-pointer">
                  {/* Candidate */}
                  <td style={{ width: "160px" }}>
                    <div className="d-flex flex-column align-items-start">
                      <Link
                        to={`/candidates/${candidateData.id}/snapshot`}
                        className="fw-semibold"
                        style={{ color: "#0A56AE" }}
                      >
                        <span>
                          {candidateData?.firstName} {candidateData?.lastName}
                        </span>
                      </Link>

                      <div className="d-flex flex-row justify-content-center align-items-center text-muted text-small">
                        <span className="form-text">{data?.createdByName}</span>
                      </div>
                    </div>
                  </td>
                  {/* Progress Bar */}
                  <td
                    style={{ width: "300px" }}
                    onClick={() => toggleJobOpen(data.id)}
                  >
                    <OverviewStepComponent data={data} />
                  </td>
                  {/* Current Status */}
                  <td style={{ width: "5rem" }}>
                    <div className="d-flex flex-row align-items-start justify-content-start gap-2 pt-2">
                      <span>Profile</span>
                      <i className="ri-arrow-right-s-line"></i>
                      <span className="fw-semibold">Tagged</span>
                    </div>
                  </td>
                  {/* Next Step */}
                  <td style={{ width: "15rem" }}>
                    <div className="d-flex flex-row gap-1">
                      <Input
                        type="select"
                        className="form-select border-0"
                        onChange={handleModuleChange}
                        value={selectedModule}
                      >
                        <option value="">Select</option>
                        {Object.keys(timelineSkipModule).map((item, index) => (
                          <option key={index} value={timelineSkipModule[item]}>
                            {item}
                          </option>
                        ))}
                      </Input>

                      <Input
                        type="select"
                        className="form-select border-0"
                        value={skipComboOptions[data.id]}
                        disabled={!selectedModule}
                        onChange={(e) => {
                          handleSkipSelection(
                            data.id,
                            parseInt(e.target.value)
                          );
                        }}
                      >
                        <option value="">Select</option>
                        {selectedModule &&
                          timelineSkipSubModule[selectedModule]?.map(
                            (item, index) => (
                              <option key={index} value={item}>
                                {item}
                              </option>
                            )
                          )}
                      </Input>
                    </div>
                  </td>
                  {/* Save Button */}
                  <td style={{ width: "50px" }}>
                    <div>
                      <div
                        className="bg-light main-border-style rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: "30px", height: "30px" }}
                        onClick={() => {
                          // handleIconClick(
                          //   data?.candidate?.id,
                          //   data?.id,
                          //   getFormIndex(
                          //     skipComboOptions[data.id] < originalOrder
                          //       ? originalOrder
                          //       : skipComboOptions[data.id],
                          //     data?.id
                          //   )
                          // );
                          // setTimelineRowIndex(timelineIndex);
                          // setOffcanvasForm(true);
                        }}
                      >
                        <i
                          className="mdi mdi-content-save-outline"
                          style={{ color: "#0A56AE" }}
                        ></i>
                      </div>
                    </div>
                  </td>
                </tr>
                {openJobIndex === data.id && (
                  <tr>
                    <td colSpan={10} className="px-3">
                      <InnerTimelineStep data={data.timeline} />
                      {/* {Object.keys(steps).map((step, index) => {
                        return (
                          <td key={index} className="px-0">
                            To replace with new timeline.
                            <InnerTimelineStep data={data} />
                            <StepComponent
                              index={stepOrders[step]}
                              maxOrder={maxOrder}
                              isRejected={isRejected}
                              isInProgress={isInProgress}
                              data={data?.timeline?.[steps[step]]}
                              candidateId={data?.candidate?.id}
                              timeline={data?.timeline}
                              originalOrder={originalOrder}
                              step={step}
                            />
                          </td>
                        );
                      })} */}
                    </td>
                  </tr>
                )}
              </>
            );
          })
        ) : (
          <tr>
            <td colSpan={10} className="fw-semibold text-center">
              No candidates tagged.
            </td>
          </tr>
        )}
      </React.Fragment>
    );
  };

  // Generate canvas header button
  const generateCanvasHeaderButton = (step) => {
    switch (step) {
      // Case 2 and 3 usese the same form
      case 2:
      case 3:
        return (
          <div className="d-flex align-items-center gap-2">
            <Button
              className="btn btn-white bg-gradient border-2 border-light-grey fw-semibold"
              style={{
                borderRadius: "8px",
              }}
              onClick={() => {
                setOffcanvasForm(false);
                setIsViewTemplate(false);
              }}
            >
              Cancel
            </Button>
            <Button
              className="btn btn-success"
              onClick={() => {
                formikRef.current.submitForm();
              }}
              style={{
                borderRadius: "8px",
              }}
            >
              {emailIsLoading ? <Spinner size="sm" color="light" /> : "Send"}
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      <div className="p-2">
        <Row className="mb-2">
          {overviewHeaders.map((header, index) => {
            const mobile = isMobile | isTablet;
            const values = overviewValues(
              formSubmissionData,
              deliveryTeam,
              mobile
            );
            return (
              <Col key={index}>
                <div
                  className="d-flex flex-column cursor-pointer"
                  id={`btn-${index}`}
                  onClick={() => setHeaderTooltip(!headerTooltip)}
                >
                  <span className="fw-medium text-muted">{header}</span>
                  <span
                    className="fw-semibold gap-1 text-nowrap"
                    style={{ color: "#0A56AE" }}
                  >
                    {values?.[header]?.trimValue}
                  </span>
                </div>
                <Tooltip
                  isOpen={isToolTipOpen(`btn-${index}`)}
                  placement="bottom-start"
                  target={`btn-${index}`}
                  toggle={() => toggle(`btn-${index}`)}
                >
                  {values?.[header]?.value}
                </Tooltip>
              </Col>
            );
          })}
        </Row>
        <hr className="w-100"></hr>
        <Row className="mb-2">
          <Card style={{ backgroundColor: "#F3F8FF" }}>
            <CardBody>
              <TimelineHeader data={jobHeaders} />
            </CardBody>
          </Card>
        </Row>
        <Row className="mb-2">
          <Nav pills>
            <NavItem>
              <NavLink
                className={`cursor-pointer rounded-0 ${
                  timelineTab === "1" ? "active" : ""
                }`}
                onClick={() => setTimelineTab("1")}
              >
                RTS Status
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={`cursor-pointer rounded-0 ${
                  timelineTab === "2" ? "active" : ""
                }`}
                onClick={() => setTimelineTab("2")}
              >
                BSG Status
              </NavLink>
            </NavItem>
          </Nav>
        </Row>
        <Row className="mb-2">
          <div
            className={`d-flex ${
              isMobile
                ? "flex-column align-items-start"
                : "flex-row align-items-center px-0"
            } justify-content-between`}
          >
            <div className="d-flex flex-row gap-2 align-items-center">
              <div className="search-box">
                <form onSubmit={pageRequestSet.setSearchTerm}>
                  <Input
                    type="text"
                    placeholder="Search"
                    className="form-control search main-border-style"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </form>
                <i
                  className="ri-search-line fw-semibold search-icon"
                  style={{ color: "#0A56AE" }}
                ></i>
              </div>
              <i
                id="legendInfo"
                className="ri-information-fill text-custom-primary fs-4 me-2 cursor-pointer"
                onClick={() => setLegendTooltip(!legendTooltip)}
              ></i>
              <Tooltip
                target="legendInfo"
                placement="bottom"
                isOpen={legendTooltip}
                toggle={() => setLegendTooltip(!legendTooltip)}
                className="legend-tooltip"
              >
                {renderLegend()}
              </Tooltip>
            </div>
            <div className="d-flex flex-row gap-2 ">
              <ButtonGroup>
                <Button className="bg-white main-border-style">
                  <i className="ri-filter-3-line align-bottom me-1"></i>Filter
                </Button>
                <Button className="bg-white main-border-style">
                  <i className="ri-download-fill align-bottom me-1"></i>
                </Button>
                <Button className="bg-white main-border-style">
                  <i className="ri-fullscreen-line align-bottom me-1"></i>
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </Row>
        <Row>
          <TabContent activeTab={timelineTab} className="p-0">
            <TabPane tabId="1">
              <div className="overflow-auto">
                <Table>
                  <thead className="bg-white main-border-style">
                    <tr>
                      {newHeaders.map((header, index) => (
                        <td key={index} className="main-border-style">
                          {header.name} <i className={header.icon}></i>
                        </td>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="main-border-style bg-white">
                    {jobTimelineMeta?.isLoading ? (
                      <tr className="border border-light">
                        <td colSpan={newHeaders.length}>
                          <Skeleton count="1" />
                        </td>
                      </tr>
                    ) : (
                      generateBodyJsx(jobTimelineMeta, jobTimelineData)
                    )}
                  </tbody>
                </Table>
              </div>

              {/* Old Timeline Code: For Reference */}
              {/* <div className="overflow-auto">
                <Table
                  className="table table-striped align-middle jobtimeline"
                  style={{ tableLayout: "fixed", wordWrap: "break-word" }}
                >
                  <thead className="table-light">
                    <tr>
                      {rtsStatusHeaders.map((header, index) => {
                        const isLabels = index === 0 || index === 1;
                        return (
                          <th
                            className={`text-center align-middle cursor-pointer ${
                              isLabels && "text-nowrap"
                            }`}
                            key={index}
                            scope="col"
                            style={{
                              width: isLabels ? "120px" : "150px",
                            }}
                            onClick={() => handleSort(index)}
                          >
                            {header}
                          </th>
                        );
                      })}
                      <th
                        className="text-center align-middle"
                        style={{ width: "260px" }}
                      ></th>
                    </tr>
                  </thead>

                  // Checks for loading state
                  {jobTimelineMeta?.isLoading ? (
                    <tr>
                      <td colSpan={rtsStatusHeaders.length}>
                        <Skeleton count={1} />
                      </td>
                    </tr>
                  ) : jobTimelineData?.jobs?.length > 0 ? (
                    jobTimelineData?.jobs?.map((data, timelineIndex) => {
                      let maxOrder = getMaxOrder(data);
                      const status = getStatus(data, maxOrder);
                      maxOrder =
                        status !== JOB_STAGE_STATUS.REJECTED &&
                        status !== JOB_STAGE_STATUS.WITHDRAWN
                          ? maxOrder
                          : maxOrder - 1;
                      const isRejected =
                        status === JOB_STAGE_STATUS.REJECTED ||
                        status === JOB_STAGE_STATUS.WITHDRAWN;
                      const isInProgress = JOB_STAGE_STATUS.IN_PROGRESS;
                      const originalOrder = maxOrder;
                      if (maxOrder >= 6 && maxOrder < 9) {
                        maxOrder = 5;
                      } else if (maxOrder === 9) {
                        maxOrder =
                          status === JOB_STAGE_STATUS.IN_PROGRESS ? 5 : 9;
                      } else if (maxOrder >= 10 && maxOrder < 13) {
                        maxOrder = 9;
                      }
                      return (
                        <tbody key={timelineIndex}>
                          <tr className="text-center align-top">
                            <td className="pt-4">{`${data?.candidate?.firstName} ${data?.candidate?.lastName}`}</td>
                            <td className="pt-4">{`${data?.createdByName}`}</td>
                            {Object.keys(steps).map((step, index) => {
                              return (
                                <td key={index} className="px-0">
                                  <StepComponent
                                    index={stepOrders[step]}
                                    maxOrder={maxOrder}
                                    isRejected={isRejected}
                                    isInProgress={isInProgress}
                                    data={data?.timeline?.[steps[step]]}
                                    candidateId={data?.candidate?.id}
                                    timeline={data?.timeline}
                                    originalOrder={originalOrder}
                                    step={step}
                                  />
                                </td>
                              );
                            })}
                            <td>
                              {!isRejected && maxOrder < 15 && (
                                <div className="d-flex flex-row gap-3 align-items-center">
                                  <Input
                                    type="select"
                                    value={skipComboOptions?.[data?.id]}
                                    onChange={(e) =>
                                      handleSkipSelection(
                                        data?.id,
                                        parseInt(e.target.value)
                                      )
                                    }
                                  >
                                    <option value="">Select</option>
                                    {Object.keys(timelineSkip).map(
                                      (item, index) => {
                                        if (
                                          maxOrder >=
                                          timelineSkip[item] + 1
                                        ) {
                                          return null;
                                        }
                                        return (
                                          <option
                                            key={index}
                                            value={timelineSkip[item]}
                                          >
                                            {item}
                                          </option>
                                        );
                                      }
                                    )}
                                  </Input>
                                  <i
                                    onClick={() => {
                                      handleIconClick(
                                        data?.candidate?.id,
                                        data?.id,
                                        getFormIndex(
                                          skipComboOptions[data.id] <
                                            originalOrder
                                            ? originalOrder
                                            : skipComboOptions[data.id],
                                          data?.id
                                        )
                                      );
                                      setTimelineRowIndex(timelineIndex);
                                    }}
                                    id="next-step"
                                    className="ri-share-forward-fill fs-5 text-custom-primary cursor-pointer"
                                  ></i>
                                </div>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={rtsStatusHeaders.length}>
                        <span className="pt-3">No data available.</span>
                      </td>
                    </tr>
                  )}
                </Table>
              </div> */}
            </TabPane>

            <TabPane tabId="2">
              <div>
                <BSGTimeline />
              </div>
            </TabPane>
          </TabContent>
          {/* Table Pagination */}
          <div className="d-flex flex-row justify-content-end my-3">
            <Input
              onChange={(e) =>
                pageRequestSet.setPageSize(parseInt(e.target.value))
              }
              type="select"
              className="form-select border-secondary"
              style={{ height: "34px", marginRight: "10px", width: "70px" }}
              defaultValue="20"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </Input>

            <Pagination>
              <PaginationItem
                disabled={pageInfo.currentPage === 0}
                onClick={pageRequestSet.setPreviousPage}
              >
                <PaginationLink
                  className={`${
                    pageInfo.currentPage === 0
                      ? "bg-secondary border-primary text-muted disabled"
                      : "bg-secondary border-primary text-dark"
                  }`}
                >
                  Previous
                </PaginationLink>
              </PaginationItem>
              <PaginationItem
                disabled={pageInfo.currentPage === pageInfo.totalPages - 1}
                onClick={pageRequestSet.setNextPage}
              >
                <PaginationLink
                  className={`${
                    pageInfo.currentPage === pageInfo.totalPages - 1
                      ? "bg-secondary border-primary text-muted disabled"
                      : "bg-secondary border-primary text-dark"
                  }`}
                >
                  Next
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          </div>
        </Row>
        <Offcanvas
          isOpen={offcanvasForm}
          toggle={() => {
            setOffcanvasForm(!offcanvasForm);
            setIsViewTemplate(false);
            setTemplatePreviewInfo(null);
          }}
          direction="end"
          style={{ width: isMobile ? "100vw" : "55vw" }}
        >
          <div className="offcanvas-header border-bottom border-bottom-dashed d-flex flex-row gap-4 align-items-center py-2">
            <div className="flex-grow-1 gap-3">
              <div className="d-flex gap-2 align-items-center mb-1">
                <span
                  className="px-2 rounded-3"
                  style={{
                    backgroundColor: "#0A65CC",
                    color: "#fff",
                    paddingTop: "2px",
                    paddingBottom: "2px",
                  }}
                >
                  {stepperState}
                </span>
                <span className="fw-bold fs-4">
                  {formSubmissionData?.accountName}
                </span>
              </div>
              <div className="d-flex flex-row gap-2 align-items-center">
                <span
                  className="fs-6 text-nowrap"
                  style={{
                    color: "#0A65CC",
                  }}
                >
                  Job ID - {formSubmissionData?.clientJobId}
                </span>
                <span
                  style={{
                    color: "#0A65CC",
                  }}
                >
                  |
                </span>
                <span
                  className="fs-6 text-nowrap cursor-pointer"
                  style={{
                    color: "#0A65CC",
                  }}
                  title={formSubmissionData?.jobTitle}
                >
                  Job Title - {truncate(formSubmissionData?.jobTitle, 55)}
                </span>
              </div>
            </div>
            {/* Canvas Header Button Add-on */}
            {generateCanvasHeaderButton(activeStep)}
            {/* Template Selector */}
            {/* {(activeStep === 11 || isPreviewCV) && (
              <Col>
                <div>
                  <TemplateSelectByCategoryElement
                    categoryName={selectedCategory}
                    placeholder="Select a template"
                    onChange={(value) => {
                      setTemplateData(value);
                    }}
                    defaultFirstValue
                    width="300px"
                    end
                  />
                </div>
              </Col>
            )} */}
          </div>
          <OffcanvasBody>
            {getFormComponent(activeStep, () => setOffcanvasForm(false))}
          </OffcanvasBody>
          {/* View Template */}
          <TemplatePreviewSideDrawer
            showSideDrawer={isViewTemplate}
            setShowSideDrawer={setIsViewTemplate}
            templatePreviewInfo={templatePreviewInfo}
            templatePreviewAction={templatePreviewAction}
            candidateId={candidateId}
            jobId={jobId}
          />
        </Offcanvas>
        {/* // Form Modal */}
        <ModalFormWrapper
          activeStep={activeStep}
          isFormModalOpen={isFormModalOpen}
          setIsFormModalOpen={setIsFormModalOpen}
          header={stepperState}
        />
      </div>
    </React.Fragment>
  );
};

export default JobOverview;
