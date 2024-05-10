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
import ConditionalOffer from "../ConditionalOffer/ConditionalOffer";
import ConditionalOfferRelease from "../ConditionalOfferRelease.jsx/ConditionalOfferRelease.jsx";
import { ConditionalOfferStatus } from "../ConditionalOfferStatus";
import { TimelineHeader } from "../TimelineHeader";
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
import {
  getLastSubmittedStage,
  getMaxOrder,
  getStatus,
  overviewHeaders,
  overviewValues,
} from "./JobOverviewUtil";
import "./ViewTemplateSection.scss";
import TemplatePreviewSideDrawer from "./TemplatePreviewSideDrawer/TemplatePreviewSideDrawer";
import ModalFormWrapper from "../ModalFormWrapper/ModalFormWrapper";
import OverviewStepComponent from "./OverviewStepComponent";
import InnerTimelineStep from "./InnerTimelineStep";
import OffCanvasHeaderComponent from "./OffCanvasHeaderComponent";

const JobOverview = () => {
  document.title = "Job Timeline | RTS";

  const dispatch = useDispatch();
  const { jobId } = useParams();
  const formikRef = useRef();
  const ref = useRef();

  const isTablet = useMediaQuery({ query: "(max-width: 1224px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [openJobIndex, setOpenJobIndex] = useState(null);
  // Next Step Dropdown States
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedSubModule, setSelectedSubModule] = useState("");
  const [legendTooltip, setLegendTooltip] = useState(false);
  const [headerTooltip, setHeaderTooltip] = useState(false);
  const [sortDirection, setSortDirection] = useState("asc");

  const [timelineTab, setTimelineTab] = useState("1");
  const [offcanvasForm, setOffcanvasForm] = useState(false);
  const [stepperState, setStepperState] = useState("");
  const [activeStep, setActiveStep] = useState(1);

  const [templateData, setTemplateData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
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

  // Email Loading
  const emailIsLoading = useSelector(
    (state) => state.EmailCommonReducer.loading
  );

  const jobTimelineMeta = useSelector(
    (state) => state.JobStageReducer.jobTimelineMeta
  );

  const formSubmissionData = useSelector(
    (state) => state.JobFormReducer.formSubmission
  );

  const jobTimelineData = useSelector(
    (state) => state.JobStageReducer.jobTimeline
  );

  console.log("jobTimelineData", jobTimelineData);

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
  } = useTableHook(
    {
      page: 0,
      pageSize: 20,
      sortBy: "candidate.first_name",
      sortDirection: sortDirection,
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
        if (maxOrder >= 1 && maxOrder <= 5) {
          maxOrder = 1;
        } else if (maxOrder >= 1 && maxOrder <= 5) {
          maxOrder = 1;
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

  const toggleJobOpen = (index) => {
    setOpenJobIndex(openJobIndex === index ? null : index);
  };

  const handleModuleChange = (e) => {
    setSelectedModule(e.target.value);
  };

  const handleSubModuleChange = (e) => {
    setSelectedSubModule(e.target.value);
  };

  const handleSaveClick = () => {
    if (selectedModule == 1 && selectedSubModule == "Untag") {
    }
  };

  const handleSkipSelection = (jobId, value) => {
    const newOb = { ...skipComboOptions };
    newOb[jobId] = value;
    setSkipComboOptions(newOb);
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
            ref={ref}
          />
        );
      case 6:
        return (
          <SkillAssessment
            closeOffcanvas={closeOffcanvas}
            jobId={jobId}
            candidateId={candidateId}
            activeStep={step}
            ref={ref}
          />
        );
      case 7:
        return (
          <CodingTest
            closeOffcanvas={closeOffcanvas}
            jobId={jobId}
            candidateId={candidateId}
            activeStep={step}
            ref={ref}
          />
        );
      case 8:
        return (
          <TechnicalInterview
            closeOffcanvas={closeOffcanvas}
            jobId={jobId}
            candidateId={candidateId}
            activeStep={step}
            ref={ref}
          />
        );
      case 9:
        return (
          <CulturalFitTest
            closeOffcanvas={closeOffcanvas}
            jobId={jobId}
            candidateId={candidateId}
            activeStep={step}
            ref={ref}
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
          // <ConditionalOffer
          //   templateData={templateData}
          //   closeOffcanvas={closeOffcanvas}
          //   candidateId={candidateId}
          //   jobId={parseInt(jobId)}
          //   activeStep={step}
          // />
          <ConditionalOffer
            closeOffcanvas={closeOffcanvas}
            candidateId={candidateId}
            jobId={parseInt(jobId)}
            activeStep={step}
            ref={formikRef}
            jobTimeLineData={jobTimelineData?.jobs?.[timelineRowIndex]}
            edit={false}
          />
        );
      case 17:
        return (
          // <ConditionalOffer
          //   templateData={templateData}
          //   closeOffcanvas={closeOffcanvas}
          //   candidateId={candidateId}
          //   jobId={parseInt(jobId)}
          //   activeStep={step}
          // />
          <ConditionalOffer
            closeOffcanvas={closeOffcanvas}
            candidateId={candidateId}
            jobId={parseInt(jobId)}
            activeStep={step}
            ref={formikRef}
            jobTimeLineData={jobTimelineData?.jobs?.[timelineRowIndex]}
            edit={true}
          />
        );
      case 18:
        return (
          <ConditionalOfferRelease
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
      case 19:
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
    if (index === 0) {
      const direction = sortDirection === "asc" ? "desc" : "asc";
      dispatch(
        fetchJobTimelineList({
          ...DynamicTableHelper.cleanPageRequest(pageRequest),
          jobId: parseInt(jobId),
          sortDirection: direction,
        })
      );
      setSortDirection(direction);
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
            const lastSubmittedStage = getLastSubmittedStage(data, maxOrder);
            const status = getStatus(data, maxOrder);
            const isRejected =
              status === JOB_STAGE_STATUS.REJECTED ||
              status === JOB_STAGE_STATUS.WITHDRAWN;
            const isInProgress = JOB_STAGE_STATUS.IN_PROGRESS;

            if (maxOrder >= 6 && maxOrder < 9) {
              maxOrder = 5;
            } else if (maxOrder === 9) {
              maxOrder = status === JOB_STAGE_STATUS.IN_PROGRESS ? 5 : 9;
            } else if (maxOrder >= 10 && maxOrder < 13) {
              maxOrder = 9;
            }
            return (
              <>
                <tr className="cursor-pointer" key={timelineIndex}>
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

                      <div className="d-flex gap-1 flex-row justify-content-center align-items-center text-muted text-small">
                        <i className="ri-account-circle-line ri-lg mt-1 "></i>{" "}
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
                      <span className="fw-semibold">{lastSubmittedStage}</span>
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
                        value={selectedSubModule}
                        disabled={!selectedModule}
                        onChange={handleSubModuleChange}
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
                          setTimelineRowIndex(timelineIndex);
                          actionButtonTrigger(activeStep);
                          // setOffcanvasForm(true);
                        }}
                      >
                        <i
                          className="mdi mdi-content-save-outline mdi-18px"
                          style={{ color: "#0A56AE" }}
                          onClick={() => handleSaveClick()}
                        ></i>
                      </div>
                    </div>
                  </td>
                </tr>
                {openJobIndex === data.id && (
                  <tr>
                    <td colSpan={10} className="px-3">
                      <InnerTimelineStep data={data.timeline} />
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
      case 18:
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
              {jobTagMeta?.isLoading ? (
                <Spinner size="sm" color="light" />
              ) : (
                "Send"
              )}
            </Button>
          </div>
        );
      case 16:
      case 17:
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
              className="btn btn-outline-success"
              onClick={() => {
                formikRef.current.submitForm("draft");
              }}
              style={{
                borderRadius: "8px",
              }}
            >
              {jobTagMeta?.isLoading &&
              jobTagMeta?.jobType === "conditional_offer_draft" ? (
                <Spinner size="sm" color="light" />
              ) : (
                "Safe As Draft"
              )}
            </Button>
            <Button
              className="btn btn-success"
              onClick={() => {
                formikRef.current.submitForm("submit");
              }}
              style={{
                borderRadius: "8px",
              }}
            >
              {jobTagMeta?.isLoading &&
              jobTagMeta?.jobType === "conditional_offer_sent" ? (
                <Spinner size="sm" color="light" />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        );

      case 5:
        return (
          <div className="d-flex flex-row justify-content-start gap-2">
            <Button
              type="button"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E7EAEE",
                color: "#000000",
                fontWeight: "500",
                borderRadius: "8px",
              }}
              onClick={() => {
                ref.current.handleCancel();
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              style={{
                backgroundColor: "#0A56AE",
                color: "#FFFFFF",
                fontWeight: "500",
                borderRadius: "8px",
              }}
              onClick={() => {
                ref.current.handleUpdate();
              }}
            >
              Invite Candidate
            </Button>
          </div>
        );

      case 6:
        return (
          <Row>
            <Col>
              <div className="d-flex justify-content-end gap-2">
                <Button
                  type="button"
                  onClick={() => ref.current.handleCancel()}
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E7EAEE",
                    color: "#000000",
                    fontWeight: "500",
                    borderRadius: "8px",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "#0A56AE",
                    color: "#FFFFFF",
                    fontWeight: "500",
                    borderRadius: "8px",
                  }}
                  onClick={() => {
                    ref.current.submitForm();
                  }}
                >
                  Update
                </Button>
              </div>
            </Col>
          </Row>
        );

      case 7:
        return (
          <Row>
            <Col>
              <div className="d-flex justify-content-end gap-2">
                <Button
                  type="button"
                  onClick={() => ref.current.handleCancel()}
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E7EAEE",
                    color: "#000000",
                    fontWeight: "500",
                    borderRadius: "8px",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "#0A56AE",
                    color: "#FFFFFF",
                    fontWeight: "500",
                    borderRadius: "8px",
                  }}
                  onClick={() => {
                    ref.current.submitForm();
                  }}
                >
                  Update
                </Button>
              </div>
            </Col>
          </Row>
        );

      case 8:
        return (
          <Row>
            <Col>
              <div className="d-flex justify-content-end gap-2">
                <Button
                  type="button"
                  onClick={() => ref.current.handleCancel()}
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E7EAEE",
                    color: "#000000",
                    fontWeight: "500",
                    borderRadius: "8px",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "#0A56AE",
                    color: "#FFFFFF",
                    fontWeight: "500",
                    borderRadius: "8px",
                  }}
                  onClick={() => {
                    ref.current.submitForm();
                  }}
                >
                  Update
                </Button>
              </div>
            </Col>
          </Row>
        );

      case 9:
        return (
          <Row>
            <Col>
              <div className="d-flex justify-content-end gap-2">
                <Button
                  type="button"
                  onClick={() => ref.current.handleCancel()}
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E7EAEE",
                    color: "#000000",
                    fontWeight: "500",
                    borderRadius: "8px",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "#0A56AE",
                    color: "#FFFFFF",
                    fontWeight: "500",
                    borderRadius: "8px",
                  }}
                  onClick={() => {
                    ref.current.submitForm();
                  }}
                >
                  Update
                </Button>
              </div>
            </Col>
          </Row>
        );
      default:
        return null;
    }
  };

  const actionButtonTrigger = (step) => {
    switch (step) {
      case 2:
      case 3:
      case 16:
      case 17:
      case 18:
        setOffcanvasForm(true);
        break;
      case 98:
      case 99:
        setIsFormModalOpen(true);
        break;
      default:
        break;
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
                        <td
                          key={index}
                          className="main-border-style cursor-pointer"
                          onClick={() => handleSort(index)}
                        >
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
          <OffCanvasHeaderComponent
            stepperState={stepperState}
            formSubmissionData={formSubmissionData}
            activeStep={activeStep}
            generateCanvasHeaderButton={generateCanvasHeaderButton}
          />
          
          <OffcanvasBody className="p-0">
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

        {/* Form Modal */}
        <ModalFormWrapper
          activeStep={activeStep}
          isFormModalOpen={isFormModalOpen}
          setIsFormModalOpen={setIsFormModalOpen}
          header={stepperState}
          jobTimeLineData={jobTimelineData?.jobs?.[timelineRowIndex]}
          isLoading={jobTimelineMeta?.isLoading}
        />

        <button
          onClick={() => {
            // Everytime i click i want it to render even if it is the same step
            // setIsFormModalOpen(true);
            setActiveStep(3);
          }}
        >
          SET STEP (DEV)
        </button>
      </div>
    </React.Fragment>
  );
};

export default JobOverview;
