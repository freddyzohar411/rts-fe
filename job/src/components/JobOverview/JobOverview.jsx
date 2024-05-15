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
  timelineSkipModule,
  timelineSkipSubModule,
  timelineLegend,
  newHeaders,
  ASSOCIATE_FORM_INDEX,
  SUB_TO_SALES_FORM_INDEX,
  SUB_TO_CLIENT_FORM_INDEX,
  SKILLS_ASSESSMENT_FORM_INDEX,
  CODING_TEST_FORM_INDEX,
  TEC_INTRW_FORM_INDEX,
  CULTURAL_FIT_TEST_FORM_INDEX,
  SCHEDULE_FORM_INDEX,
  RELEASE_FORM_INDEX,
  PREPARE_TOS_FORM_INDEX,
  APPROVE_TOS_FORM_INDEX,
  UNTAG_FORM_INDEX,
  PRF_WTDWN_FORM_INDEX,
  PRF_REJ_SALES_FORM_INDEX,
  PRF_REJ_CLIENT_FORM_INDEX,
} from "./JobOverviewConstants";
import { DynamicTableHelper, useTableHook } from "@workspace/common";
import "./JobOverview.scss";
import { JOB_STAGE_STATUS } from "../JobListing/JobListingConstants";
import { useMediaQuery } from "react-responsive";
import BSGTimeline from "../BSGTimeline/BSGTimeline";
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
import PrepareTOS from "../TOSComponents/PrepareTOS.jsx";
import ApproveTOS from "../TOSComponents/ApproveTOS.jsx";

const JobOverview = () => {
  document.title = "Job Timeline | RTS";

  const dispatch = useDispatch();
  const { jobId } = useParams();
  const formikRef = useRef();
  const ref = useRef();

  const isTablet = useMediaQuery({ query: "(max-width: 1224px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [openJobIndex, setOpenJobIndex] = useState(null);

  const [candidateId, setCandidateId] = useState();

  // Next Step Dropdown States
  const [legendTooltip, setLegendTooltip] = useState(false);
  const [headerTooltip, setHeaderTooltip] = useState(false);
  const [sortDirection, setSortDirection] = useState("asc");
  const [timelineTab, setTimelineTab] = useState("1");
  const [offcanvasForm, setOffcanvasForm] = useState(false);
  const [stepperState, setStepperState] = useState("");
  const [activeStep, setActiveStep] = useState();

  const [skipSteps, setSkipSteps] = useState({});
  const [selectedSubSteps, setSelectedSubSteps] = useState({});

  const [deliveryTeam, setDeliveryTeam] = useState();
  const [timelineRowIndex, setTimelineRowIndex] = useState();
  const [tooltipIndexes, setTooltipIndexes] = useState();
  const [isViewTemplate, setIsViewTemplate] = useState(false);
  const [templatePreviewInfo, setTemplatePreviewInfo] = useState(null);
  const [templatePreviewAction, setTemplatePreviewAction] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [myNumber, setMyNumber] = useState(1);
  const [modalFormName, setModalFormName] = useState({});

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
        } else if (maxOrder >= 6 && maxOrder <= 9) {
          maxOrder = 2;
        } else if (maxOrder >= 10 && maxOrder <= 13) {
          maxOrder = 3;
        } else if (maxOrder >= 14 && maxOrder <= 15) {
          maxOrder = 4;
        } else if (maxOrder >= 16 && maxOrder <= 17) {
          maxOrder = 5;
        }
        jsonObject[data?.id] = maxOrder;
      });
      setSkipSteps(jsonObject);
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
      // Profile
      case UNTAG_FORM_INDEX:
        setModalFormName({ header: "Confirm" });
        break;
      case PRF_WTDWN_FORM_INDEX:
        setModalFormName({ header: "Profile Withdrawn Confirmation" });
        break;
      case ASSOCIATE_FORM_INDEX:
        setStepperState("Associate");
        break;
      case SUB_TO_SALES_FORM_INDEX:
        setStepperState("Submit to Sales");
        break;
      case PRF_REJ_SALES_FORM_INDEX:
        setModalFormName({ header: "Profile Rejected - Sales" });
        break;
      case SUB_TO_CLIENT_FORM_INDEX:
        setStepperState("Submit to Client");
        break;
      case PRF_REJ_CLIENT_FORM_INDEX:
        setModalFormName({ header: "Profile Rejected - Client" });
        break;
      // Odin
      case SKILLS_ASSESSMENT_FORM_INDEX:
        // setStepperState("Pre-Skill Assessment");
        setStepperState("Review Skill Assessment Results");
        break;
      case CODING_TEST_FORM_INDEX:
        setStepperState("Review Coding Test Results");
        break;
      case TEC_INTRW_FORM_INDEX:
        setStepperState("Review Technical Interview Results");
        break;
      case CULTURAL_FIT_TEST_FORM_INDEX:
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
      // TOS
      case PREPARE_TOS_FORM_INDEX:
        setStepperState("Prepare TOS");
        break;
      case APPROVE_TOS_FORM_INDEX:
        setStepperState("Approve TOS");
        break;
      default:
        setStepperState("");
    }
  }, [activeStep]);

  const toggleJobOpen = (index) => {
    setOpenJobIndex(openJobIndex === index ? null : index);
  };

  const handleStepsSelection = (jobId, value) => {
    const newOb = { ...skipSteps };
    newOb[jobId] = value;
    setSkipSteps(newOb);
  };

  const handleSubStepsSelection = (candidateId, value) => {
    const newOb = { ...selectedSubSteps };
    newOb[candidateId] = value;
    setSelectedSubSteps(newOb);
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

  const handleIconClick = (candidateId, actStep) => {
    setActiveStep(actStep);
    actionButtonTrigger(actStep);
    setCandidateId(candidateId);
  };

  const actionButtonTrigger = (step) => {
    switch (step) {
      //Profile
      case ASSOCIATE_FORM_INDEX:
      case SUB_TO_SALES_FORM_INDEX:
      case SUB_TO_CLIENT_FORM_INDEX:
      //Odin
      case SKILLS_ASSESSMENT_FORM_INDEX:
      case CODING_TEST_FORM_INDEX:
      case TEC_INTRW_FORM_INDEX:
      case CULTURAL_FIT_TEST_FORM_INDEX:
        setOffcanvasForm(true);
        break;
      //Profile
      case UNTAG_FORM_INDEX:
      case PRF_WTDWN_FORM_INDEX:
      case PRF_REJ_SALES_FORM_INDEX:
      case PRF_REJ_CLIENT_FORM_INDEX:
        setIsFormModalOpen(true);
        break;
      default:
        break;
    }
  };

  const getFormComponent = (step, closeOffcanvas) => {
    switch (step) {
      case ASSOCIATE_FORM_INDEX:
        return (
          <AssociateCandidate
            closeOffcanvas={closeOffcanvas}
            jobId={jobId}
            candidateId={candidateId}
            timelineData={jobTimelineData?.jobs?.[timelineRowIndex]}
            ref={formikRef}
          />
        );
      case SUB_TO_SALES_FORM_INDEX:
        return (
          <SubmitToSales
            closeOffcanvas={closeOffcanvas}
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
      case SUB_TO_CLIENT_FORM_INDEX:
        return (
          <SubmitToClient
            closeOffcanvas={closeOffcanvas}
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
      // case SKILLS_ASSESSMENT_FORM_INDEX:
      //   return (
      //     <PreSkillAssessment
      //       closeOffcanvas={closeOffcanvas}
      //       jobId={jobId}
      //       candidateId={candidateId}
      //       activeStep={step}
      //       ref={ref}
      //     />
      //   );
      case SKILLS_ASSESSMENT_FORM_INDEX:
        return (
          <SkillAssessment
            closeOffcanvas={closeOffcanvas}
            jobId={jobId}
            candidateId={candidateId}
            activeStep={step}
            ref={ref}
          />
        );
      case CODING_TEST_FORM_INDEX:
        return (
          <CodingTest
            closeOffcanvas={closeOffcanvas}
            jobId={jobId}
            candidateId={candidateId}
            activeStep={step}
            ref={ref}
          />
        );
      case TEC_INTRW_FORM_INDEX:
        return (
          <TechnicalInterview
            closeOffcanvas={closeOffcanvas}
            jobId={jobId}
            candidateId={candidateId}
            activeStep={step}
            ref={ref}
          />
        );
      case CULTURAL_FIT_TEST_FORM_INDEX:
        return (
          <CulturalFitTest
            closeOffcanvas={closeOffcanvas}
            jobId={jobId}
            candidateId={candidateId}
            activeStep={step}
            ref={ref}
          />
        );
      case SCHEDULE_FORM_INDEX:
        return (
          <ScheduleInterview
            closeOffcanvas={closeOffcanvas}
            onPreviewCVClick={handlePreviewCVClick}
            jobId={jobId}
            candidateId={candidateId}
            setIsViewTemplate={setIsViewTemplate}
            setTemplatePreviewInfo={setTemplatePreviewInfo}
            setTemplatePreviewAction={setTemplatePreviewAction}
            setOffcanvasForm={setOffcanvasForm}
            ref={formikRef}
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
      case RELEASE_FORM_INDEX:
        return (
          <ConditionalOfferRelease
            closeOffcanvas={closeOffcanvas}
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
      case PREPARE_TOS_FORM_INDEX:
        return (
          <PrepareTOS
            setOffcanvasForm={setOffcanvasForm}
            candidateId={candidateId}
            jobId={parseInt(jobId)}
            activeStep={step}
            ref={ref}
          />
        );
      case APPROVE_TOS_FORM_INDEX:
        return (
          <ApproveTOS
            setOffcanvasForm={setOffcanvasForm}
            setIsFormModalOpen={setIsFormModalOpen}
            setModalFormName={setModalFormName}
            candidateId={candidateId}
            jobId={parseInt(jobId)}
            activeStep={step}
            ref={ref}
          />
        );
      default:
        return null;
    }
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

  const getMainStage = (maxOrder) => {
    let stage = "Profile";
    if (maxOrder === 2) {
      stage = "Odin";
    } else if (maxOrder === 3) {
      stage = "Interview";
    } else if (maxOrder === 4) {
      stage = "TOS";
    } else if (maxOrder === 5) {
      stage = "Conditional Offer";
    }
    return stage;
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

            if (maxOrder >= 1 && maxOrder <= 5) {
              maxOrder = 1;
            } else if (maxOrder >= 6 && maxOrder <= 9) {
              maxOrder = 2;
            } else if (maxOrder >= 10 && maxOrder <= 13) {
              maxOrder = 3;
            } else if (maxOrder >= 14 && maxOrder <= 15) {
              maxOrder = 4;
            } else if (maxOrder >= 16 && maxOrder <= 17) {
              maxOrder = 5;
            }
            const mainStage = getMainStage(maxOrder);
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
                      <span>{mainStage}</span>
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
                        value={skipSteps?.[data?.id]}
                        onChange={(e) =>
                          handleStepsSelection(
                            data?.id,
                            parseInt(e.target.value)
                          )
                        }
                      >
                        <option value="">Select</option>
                        {Object.keys(timelineSkipModule).map((item, index) => {
                          if (maxOrder >= timelineSkipModule[item] + 1) {
                            return null;
                          }
                          return (
                            <option
                              key={index}
                              value={timelineSkipModule[item]}
                            >
                              {item}
                            </option>
                          );
                        })}
                      </Input>
                      <Input
                        type="select"
                        className="form-select border-0"
                        value={selectedSubSteps?.[candidateData?.id]}
                        onChange={(e) =>
                          handleSubStepsSelection(
                            candidateData?.id,
                            parseInt(e.target.value)
                          )
                        }
                      >
                        <option value="">Select</option>
                        {timelineSkipSubModule?.[skipSteps?.[data?.id]]?.map(
                          (item, index) => (
                            <option key={index} value={item?.id}>
                              {item?.form}
                            </option>
                          )
                        )}
                      </Input>
                    </div>
                  </td>
                  {/* Save Button */}
                  <td style={{ width: "50px" }}>
                    <button
                      className="bg-light main-border-style rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: "30px", height: "30px" }}
                      onClick={() => {
                        handleIconClick(
                          candidateData?.id,
                          selectedSubSteps?.[candidateData?.id]
                        );
                        setTimelineRowIndex(timelineIndex);
                      }}
                      disabled={!selectedSubSteps?.[candidateData?.id]}
                    >
                      <i
                        className="mdi mdi-content-save-outline mdi-18px"
                        style={{ color: "#0A56AE" }}
                      ></i>
                    </button>
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
      case 1:
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
                "Submit"
              )}
            </Button>
          </div>
        );
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

      case SKILLS_ASSESSMENT_FORM_INDEX:
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

      case 20:
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
                    backgroundColor: "#12A35D",
                    color: "#FFFFFF",
                    fontWeight: "500",
                    borderRadius: "8px",
                  }}
                  onClick={() => {
                    ref.current.submitForm();
                  }}
                >
                  Submit
                </Button>
              </div>
            </Col>
          </Row>
        );

      case 21:
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
                  type="button"
                  onClick={() => ref.current.rejectTos()}
                  style={{
                    backgroundColor: "#D92D20",
                    color: "#FFFFFF",
                    fontWeight: "500",
                    borderRadius: "8px",
                  }}
                >
                  Reject
                </Button>
                <Button
                  type="submit"
                  onClick={() => ref.current.approveTos()}
                  style={{
                    backgroundColor: "#12A35D",
                    color: "#FFFFFF",
                    fontWeight: "500",
                    borderRadius: "8px",
                  }}
                >
                  Approve
                </Button>
              </div>
            </Col>
          </Row>
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
        <Row className="d-flex flex-row align-items-center">
          <div
            className="btn btn-info w-25 me-3 mb-3"
            onClick={() => setActiveStep(1)}
          >
            Associate
          </div>
          <div
            className="btn btn-info w-25 me-3 mb-3"
            onClick={() => setActiveStep(2)}
          >
            Submit to Sales
          </div>
          <div
            className="btn btn-info w-25 me-3 mb-3"
            onClick={() => setActiveStep(3)}
          >
            Submit to Client
          </div>
          <div
            className="btn btn-info w-25 me-3 mb-3"
            onClick={() => setActiveStep(16)}
          >
            Profile Feedback Pending{" "}
          </div>
          <div
            className="btn btn-info w-25 me-3 mb-3"
            onClick={() => setActiveStep(20)}
          >
            Prepare TOS
          </div>
          <div
            className="btn btn-info w-25 me-3 mb-3"
            onClick={() => setActiveStep(21)}
          >
            Accept or Decline
          </div>
          <div
            className="btn btn-info w-25 me-3 mb-3"
            onClick={() => setActiveStep(16)}
          >
            Conditional Offer
          </div>
          <div
            className="btn btn-info w-25 me-3 mb-3"
            onClick={() => setActiveStep(17)}
          >
            Accept or Decline
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
            jobTimeLineData={jobTimelineData?.jobs?.[timelineRowIndex]}
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
          modalFormName={modalFormName}
          setModalFormName={setModalFormName}
        />
        <div className="d-flex gap-2 w-25">
          <Input
            type="text"
            onChange={(e) => setMyNumber(parseInt(e.target.value))}
          />
          <Button
            className="btn btn-primary fs-semibold"
            onClick={() => {
              // Everytime i click i want it to render even if it is the same step
              setIsFormModalOpen(true);
              setActiveStep(myNumber);
            }}
            style={{
              textWrap: "nowrap",
            }}
          >
            STEP (DEV)
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default JobOverview;
