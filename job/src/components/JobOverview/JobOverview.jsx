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
  untagJobReset,
  resetBillRate,
} from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import TableItemDisplay from "@workspace/common/src/Components/DynamicTable/TableItemDisplay";
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
import ConditionalOffer from "../ConditionalOffer/ConditionalOffer";
import ConditionalOfferRelease from "../ConditionalOfferRelease/ConditionalOfferRelease.jsx";
import { TimelineHeader } from "../TimelineHeader";

import {
  JOB_TIMELINE_INITIAL_OPTIONS,
  jobHeaders,
  timelineSkipModule,
  timelineSkipSubModule,
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
  PRE_SKILLS_ASSESSMENT_FORM_INDEX,
  ACCEPTED_FORM_INDEX,
  REJECTED_FORM_INDEX,
  BACKOUT_CANDIE_FORM_INDEX,
  RESCHEDULED_FORM_INDEX,
  REJECTED_INTRW_FORM_INDEX,
  CANCL_BY_CLIENT_FORM_INDEX,
  EDIT_TOS_FORM_INDEX,
  PREPARE_FORM_INDEX,
  EDIT_FORM_INDEX,
  SELECTED_FORM_INDEX,
  PROFILE_FEEDBACK_PENDING_INDEX,
  BillRateZeroLabels,
} from "./JobOverviewConstants";
import * as JobOverviewConstants from "./JobOverviewConstants";
import { DynamicTableHelper, useTableHook } from "@workspace/common";
import "./JobOverview.scss";
import {
  JOB_STAGE_IDS,
  JOB_STAGE_STATUS,
} from "../JobListing/JobListingConstants";
import { useMediaQuery } from "react-responsive";
import BSGTimeline from "../BSGTimeline/BSGTimeline";
import { SkillAssessment } from "../SkillAssessment";
import { CodingTest } from "../CodingTest";
import { CulturalFitTest } from "../CulturalFitTest";
import { TechnicalInterview } from "../TechnicalInterview";
import { getMaxOrder, getStatus, overviewValues } from "./JobOverviewUtil";
import "./ViewTemplateSection.scss";
import TemplatePreviewSideDrawer from "./TemplatePreviewSideDrawer/TemplatePreviewSideDrawer";
import ModalFormWrapper from "../ModalFormWrapper/ModalFormWrapper";
import OverviewStepComponent from "./OverviewStepComponent";
import InnerTimelineStep from "./InnerTimelineStep";
import OffCanvasHeaderComponent from "./OffCanvasHeaderComponent";
import PrepareTOS from "../TOSComponents/PrepareTOS.jsx";
import ApproveTOS from "../TOSComponents/ApproveTOS.jsx";
import PreSkillAssessment from "../PreSkillAssessment/PreSkillAssessment.jsx";
import BillRateSalaryEditModal from "../BillRateSalaryEditModal/BillRateSalaryEditModal.jsx";
import BillRateZeroModal from "../BillRateZeroModal/BillRateZeroModal.jsx";
import TableRowsPerPageWithNav from "@workspace/common/src/Components/DynamicTable/TableRowsPerPageWithNav.jsx";
import JobOverviewTag from "./JobOverviewTag/JobOverviewTag.jsx";

const JobOverview = ({ onRetrieveHeader, onTimelineFullScreen }) => {
  document.title = "Job Timeline | RTS";

  const dispatch = useDispatch();
  const { jobId } = useParams();

  const formikRef = useRef();

  const isTablet = useMediaQuery({ query: "(max-width: 1224px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [openJobIndex, setOpenJobIndex] = useState(null);

  const [candidateId, setCandidateId] = useState();
  const [originalOrder, setOriginalOrder] = useState();

  // Next Step Dropdown States
  const [sortDirection, setSortDirection] = useState("desc");
  const [timelineTab, setTimelineTab] = useState("1");
  const [offcanvasForm, setOffcanvasForm] = useState(false);
  const [stepperState, setStepperState] = useState("");
  const [activeStep, setActiveStep] = useState();

  const [skipSteps, setSkipSteps] = useState({});
  const [selectedSubSteps, setSelectedSubSteps] = useState({});

  const [deliveryTeam, setDeliveryTeam] = useState();
  const [timelineRowIndex, setTimelineRowIndex] = useState();
  const [isViewTemplate, setIsViewTemplate] = useState(false);
  const [templatePreviewInfo, setTemplatePreviewInfo] = useState(null);
  const [templatePreviewAction, setTemplatePreviewAction] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [modalFormName, setModalFormName] = useState({});
  const [readOnly, setReadOnly] = useState(false);
  const [readOnlyInterviewNo, setReadOnlyInterviewNo] = useState(0);
  const [billRateModalOpen, setBillRateModalOpen] = useState(false);
  const [bsrOption, setBsrOption] = useState("");
  const [stageType, setStageType] = useState(null);
  const [isTimelineFullscreen, setIsTimelineFullscreen] = useState(false);

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
  const jobAllTagMeta = useSelector(
    (state) => state.JobStageReducer.jobAllTagMeta
  );

  const jobUntagMeta = useSelector(
    (state) => state.JobStageReducer?.jobUntagMeta
  );

  const updateBillrateMeta = useSelector(
    (state) => state.JobStageReducer.updateBillrateMeta
  );

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
      sortBy: "job_timeline.updated_at",
      sortDirection: sortDirection,
      searchTerm: null,
      searchFields: [
        "candidate.first_name",
        "candidate.last_name",
        "users.first_name",
        "users.last_name",
      ],
      allActive: true,
    },
    JOB_TIMELINE_INITIAL_OPTIONS,
    customRenderList
  );

  const toggleTimelineFullscreen = () => {
    setIsTimelineFullscreen(!isTimelineFullscreen);
    onTimelineFullScreen(!isTimelineFullscreen);
  };

  useEffect(() => {
    if (
      jobTagMeta?.isSuccess ||
      updateBillrateMeta?.isSuccess ||
      jobAllTagMeta?.isSuccess
    ) {
      setOffcanvasForm(false);
      setModalFormName(null);
      dispatch(
        fetchJobTimelineList({
          ...DynamicTableHelper.cleanPageRequest(pageRequest),
          jobId: parseInt(jobId),
          stageType,
        })
      );
      dispatch(fetchJobtimeineCount({ jobId }));
      dispatch(tagReset());
      dispatch(resetBillRate());
    }
  }, [jobTagMeta, updateBillrateMeta, jobAllTagMeta]);

  // Fetch the job when the pageRequest changes
  useEffect(() => {
    dispatch(
      fetchJobTimelineList({
        ...DynamicTableHelper.cleanPageRequest(pageRequest),
        jobId: parseInt(jobId),
        stageType,
      })
    );
  }, [pageRequest, stageType]);

  useEffect(() => {
    if (jobUntagMeta?.isSuccess) {
      setIsFormModalOpen(false);
      dispatch(
        fetchJobTimelineList({
          ...DynamicTableHelper.cleanPageRequest(pageRequest),
          jobId: parseInt(jobId),
          stageType,
        })
      );
      dispatch(untagJobReset());
    }
  }, [jobUntagMeta]);

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
        if (maxOrder >= 1 && maxOrder <= 4) {
          maxOrder = 1;
        } else if (maxOrder >= 5 && maxOrder <= 8) {
          maxOrder = 2;
        } else if (maxOrder >= 9 && maxOrder <= 12) {
          const status = getStatus(data, maxOrder);
          if (status === JOB_STAGE_STATUS.COMPLETED) {
            maxOrder = 3;
          } else {
            maxOrder = 2;
          }
        } else if (maxOrder >= 13 && maxOrder <= 14) {
          maxOrder = 4;
        } else if (maxOrder >= 15 && maxOrder <= 17) {
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
        setModalFormName({ header: "Confirmation" });
        break;
      case PRF_WTDWN_FORM_INDEX:
        setStepperState("Profile Withdrawn Confirmation");
        setModalFormName({ header: "Profile Withdrawn Confirmation" });
        break;
      case ASSOCIATE_FORM_INDEX:
        setStepperState("Associate");
        break;
      case SUB_TO_SALES_FORM_INDEX:
        setStepperState("Submit to Sales");
        break;
      case PRF_REJ_SALES_FORM_INDEX:
        setStepperState("Profile Rejected - Sales");
        setModalFormName({ header: "Profile Rejected - Sales" });
        break;
      case SUB_TO_CLIENT_FORM_INDEX:
        setStepperState("Submit to Client");
        break;
      case PRF_REJ_CLIENT_FORM_INDEX:
        setStepperState("Profile Rejected - Client");
        setModalFormName({ header: "Profile Rejected - Client" });
        break;
      // Odin
      case PRE_SKILLS_ASSESSMENT_FORM_INDEX:
        setStepperState("Pre-Skill Assessment");
        break;
      case SKILLS_ASSESSMENT_FORM_INDEX:
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
      // Interview
      case SCHEDULE_FORM_INDEX:
        let formName = "Schedule First Interview";
        if (originalOrder === JOB_STAGE_IDS.FIRST_INTERVIEW_SCHEDULED) {
          formName = "Schedule Second Interview";
        } else if (
          originalOrder === JOB_STAGE_IDS.SECOND_INTERVIEW_SCHEDULED ||
          originalOrder === JOB_STAGE_IDS.THIRD_INTERVIEW_SCHEDULED
        ) {
          formName = "Schedule Third Interview";
        }
        setStepperState(formName);
        break;
      case RESCHEDULED_FORM_INDEX:
        let frmName = "Reschedule First Interview";
        if (originalOrder === JOB_STAGE_IDS.SECOND_INTERVIEW_SCHEDULED) {
          frmName = "Reschedule Second Interview";
        } else if (originalOrder === JOB_STAGE_IDS.THIRD_INTERVIEW_SCHEDULED) {
          frmName = "Reschedule Third Interview";
        }
        setStepperState(frmName);
        break;
      case BACKOUT_CANDIE_FORM_INDEX:
        setModalFormName({ header: "Backout-Candidate" });
        break;
      case REJECTED_INTRW_FORM_INDEX:
        setModalFormName({ header: "Interview Rejected" });
        break;
      case CANCL_BY_CLIENT_FORM_INDEX:
        setModalFormName({ header: "Interview Cancelled by Client" });
        break;
      case SELECTED_FORM_INDEX:
        setModalFormName({ header: "Candidate Select" });
        break;
      case PROFILE_FEEDBACK_PENDING_INDEX:
        setStepperState("Profile Status");
        break;
      // TOS
      case PREPARE_TOS_FORM_INDEX:
        setStepperState("Prepare TOS");
        break;
      case EDIT_TOS_FORM_INDEX:
        setStepperState("Edit TOS");
        break;
      case APPROVE_TOS_FORM_INDEX:
        setStepperState("Approve TOS");
        break;
      // Conditional Offer
      case PREPARE_FORM_INDEX:
        setStepperState("Conditional Offer Prepare");
        break;
      case EDIT_FORM_INDEX:
        setStepperState("Conditional Offer Edit");
        break;
      case RELEASE_FORM_INDEX:
        setStepperState("Conditional Offer Release");
        break;
      case ACCEPTED_FORM_INDEX:
        setModalFormName({ header: "Conditional Offer Accepted by Candidate" });
        break;
      case REJECTED_FORM_INDEX:
        setModalFormName({ header: "Conditional Offer Rejected by Candidate" });
        break;
      default:
        setStepperState("");
    }
  }, [activeStep, originalOrder]);

  const [prevOpenedIndex, setPrevOpenedIndex] = useState(null);
  const toggleJobOpen = (dataIndex, index) => {
    setOpenJobIndex(openJobIndex === dataIndex ? null : dataIndex);
    setPrevOpenedIndex(index - 1);
  };

  const [isTimelineOpen, setIsTimelineOpen] = useState(false);

  useEffect(() => {
    if (openJobIndex !== null) {
      setIsTimelineOpen(true);
    } else {
      setIsTimelineOpen(false);
      setPrevOpenedIndex(null);
    }
  }, [openJobIndex]);

  const [isBrsModalOpen, setIsBrsModalOpen] = useState(false);

  const toggleBrsModal = () => {
    setIsBrsModalOpen(!isBrsModalOpen);
  };

  const [isJobOverviewTagOpen, setIsJobOverviewTagOpen] = useState(false);

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
          sortBy: "candidate.first_name",
          jobId: parseInt(jobId),
          sortDirection: direction,
          stageType,
        })
      );
      setSortDirection(direction);
    }
  };

  const handleIconClick = (candidateId, actStep, originalOrder, data) => {
    if (data?.job?.billRate === 0 && actStep === 6) {
      setBillRateModalOpen(true);
    } else {
      setActiveStep(actStep);
      actionButtonTrigger(actStep);
      setCandidateId(candidateId);
      setOriginalOrder(originalOrder);
    }
  };

  const actionButtonTrigger = (step) => {
    switch (step) {
      //Profile
      case ASSOCIATE_FORM_INDEX:
      case SUB_TO_SALES_FORM_INDEX:
      case SUB_TO_CLIENT_FORM_INDEX:
      //Odin
      case PRE_SKILLS_ASSESSMENT_FORM_INDEX:
      case SKILLS_ASSESSMENT_FORM_INDEX:
      case CODING_TEST_FORM_INDEX:
      case TEC_INTRW_FORM_INDEX:
      case CULTURAL_FIT_TEST_FORM_INDEX:
      //Interview
      case SCHEDULE_FORM_INDEX:
      case RESCHEDULED_FORM_INDEX:
      case PROFILE_FEEDBACK_PENDING_INDEX:
      //TOS
      case PREPARE_TOS_FORM_INDEX:
      case EDIT_TOS_FORM_INDEX:
      case APPROVE_TOS_FORM_INDEX:
      //Conditional Offer
      case PREPARE_FORM_INDEX:
      case EDIT_FORM_INDEX:
      case RELEASE_FORM_INDEX:
        setOffcanvasForm(true);
        break;
      //Profile
      case UNTAG_FORM_INDEX:
      case PRF_WTDWN_FORM_INDEX:
      case PRF_REJ_SALES_FORM_INDEX:
      case PRF_REJ_CLIENT_FORM_INDEX:
      case ACCEPTED_FORM_INDEX:
      case REJECTED_FORM_INDEX:
      //Interview
      case BACKOUT_CANDIE_FORM_INDEX:
      case REJECTED_INTRW_FORM_INDEX:
      case CANCL_BY_CLIENT_FORM_INDEX:
      case SELECTED_FORM_INDEX:
        setIsFormModalOpen(true);
        break;
      default:
        break;
    }
  };

  const getFormComponent = (step, closeOffcanvas) => {
    switch (step) {
      //Profile
      case ASSOCIATE_FORM_INDEX:
        return (
          <AssociateCandidate
            closeOffcanvas={closeOffcanvas}
            jobId={jobId}
            candidateId={candidateId}
            jobTimeLineData={jobTimelineData?.jobs?.[timelineRowIndex]}
            setIsViewTemplate={setIsViewTemplate}
            setTemplatePreviewInfo={setTemplatePreviewInfo}
            setTemplatePreviewAction={setTemplatePreviewAction}
            ref={formikRef}
            readOnly={readOnly}
          />
        );
      case SUB_TO_SALES_FORM_INDEX:
        return (
          <SubmitToSales
            closeOffcanvas={closeOffcanvas}
            setIsViewTemplate={setIsViewTemplate}
            setTemplatePreviewInfo={setTemplatePreviewInfo}
            setTemplatePreviewAction={setTemplatePreviewAction}
            jobTimeLineData={jobTimelineData?.jobs?.[timelineRowIndex]}
            ref={formikRef}
          />
        );
      case SUB_TO_CLIENT_FORM_INDEX:
        return (
          <SubmitToClient
            closeOffcanvas={closeOffcanvas}
            setIsViewTemplate={setIsViewTemplate}
            setTemplatePreviewInfo={setTemplatePreviewInfo}
            setTemplatePreviewAction={setTemplatePreviewAction}
            jobTimeLineData={jobTimelineData?.jobs?.[timelineRowIndex]}
            ref={formikRef}
          />
        );
      case PROFILE_FEEDBACK_PENDING_INDEX:
        return (
          <ProfileFeedbackPending
            closeOffcanvas={closeOffcanvas}
            jobId={jobId}
            candidateId={candidateId}
            jobTimeLineData={jobTimelineData?.jobs?.[timelineRowIndex]}
            ref={formikRef}
            readOnly={readOnly}
          />
        );
      //Odin
      case PRE_SKILLS_ASSESSMENT_FORM_INDEX:
        return (
          <PreSkillAssessment
            closeOffcanvas={closeOffcanvas}
            jobId={jobId}
            candidateId={candidateId}
            ref={formikRef}
            jobTimeLineData={jobTimelineData?.jobs?.[timelineRowIndex]}
          />
        );
      case SKILLS_ASSESSMENT_FORM_INDEX:
        return (
          <SkillAssessment
            closeOffcanvas={closeOffcanvas}
            jobId={jobId}
            candidateId={candidateId}
            ref={formikRef}
            jobTimeLineData={jobTimelineData?.jobs?.[timelineRowIndex]}
            readOnly={readOnly}
          />
        );
      case CODING_TEST_FORM_INDEX:
        return (
          <CodingTest
            closeOffcanvas={closeOffcanvas}
            jobId={jobId}
            candidateId={candidateId}
            ref={formikRef}
            jobTimeLineData={jobTimelineData?.jobs?.[timelineRowIndex]}
            readOnly={readOnly}
          />
        );
      case TEC_INTRW_FORM_INDEX:
        return (
          <TechnicalInterview
            closeOffcanvas={closeOffcanvas}
            jobId={jobId}
            candidateId={candidateId}
            ref={formikRef}
            jobTimeLineData={jobTimelineData?.jobs?.[timelineRowIndex]}
            readOnly={readOnly}
          />
        );
      case CULTURAL_FIT_TEST_FORM_INDEX:
        return (
          <CulturalFitTest
            closeOffcanvas={closeOffcanvas}
            jobId={jobId}
            candidateId={candidateId}
            activeStep={step}
            ref={formikRef}
            jobTimeLineData={jobTimelineData?.jobs?.[timelineRowIndex]}
            readOnly={readOnly}
          />
        );
      //Interview
      case SCHEDULE_FORM_INDEX:
      case RESCHEDULED_FORM_INDEX:
        return (
          <ScheduleInterview
            closeOffcanvas={closeOffcanvas}
            setIsViewTemplate={setIsViewTemplate}
            setTemplatePreviewInfo={setTemplatePreviewInfo}
            setTemplatePreviewAction={setTemplatePreviewAction}
            jobTimeLineData={jobTimelineData?.jobs?.[timelineRowIndex]}
            originalOrder={originalOrder}
            activeStep={activeStep}
            ref={formikRef}
          />
        );
      //Conditional Offer
      case PREPARE_FORM_INDEX:
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
      case EDIT_FORM_INDEX:
        return (
          <ConditionalOffer
            closeOffcanvas={closeOffcanvas}
            candidateId={candidateId}
            jobId={parseInt(jobId)}
            activeStep={step}
            ref={formikRef}
            jobTimeLineData={jobTimelineData?.jobs?.[timelineRowIndex]}
            edit={true}
            readOnly={readOnly}
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
      // TOS
      case PREPARE_TOS_FORM_INDEX:
        return (
          <PrepareTOS
            setOffcanvasForm={setOffcanvasForm}
            candidateId={candidateId}
            jobId={jobId}
            ref={formikRef}
            jobTimeLineData={jobTimelineData?.jobs?.[timelineRowIndex]}
          />
        );

      case EDIT_TOS_FORM_INDEX:
        return (
          <PrepareTOS
            setOffcanvasForm={setOffcanvasForm}
            candidateId={candidateId}
            jobId={parseInt(jobId)}
            activeStep={step}
            ref={formikRef}
            jobTimeLineData={jobTimelineData?.jobs?.[timelineRowIndex]}
            edit={true}
            readOnly={readOnly}
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
            ref={formikRef}
            jobTimeLineData={jobTimelineData?.jobs?.[timelineRowIndex]}
            edit={true}
          />
        );
      default:
        return null;
    }
  };

  // Retrieve individual candidate data - job timeline
  const generateBodyJsx = (jobTimelineMeta, jobTimelineData) => {
    return (
      <React.Fragment>
        {jobTimelineData?.jobs && jobTimelineData?.jobs?.length > 0 ? (
          jobTimelineData?.jobs?.map((data, timelineIndex) => {
            const billRateCurrency = formSubmissionData?.currency ?? "";
            const candidateData = data?.candidate;
            let maxOrder = getMaxOrder(data);
            const originalOrder = maxOrder;
            const status = getStatus(data, maxOrder);
            const isRejected =
              status === JOB_STAGE_STATUS.REJECTED ||
              status === JOB_STAGE_STATUS.WITHDRAWN;
            const isAllStepsCompleted = originalOrder === 17;

            if (maxOrder >= 1 && maxOrder <= 4) {
              maxOrder = 1;
            } else if (maxOrder >= 5 && maxOrder <= 8) {
              maxOrder = 2;
            } else if (maxOrder >= 9 && maxOrder <= 12) {
              const odinStatus = getStatus(data, maxOrder);
              if (odinStatus === JOB_STAGE_STATUS.COMPLETED) {
                maxOrder = 3;
              } else {
                maxOrder = 2;
              }
            } else if (maxOrder >= 13 && maxOrder <= 14) {
              maxOrder = 4;
            } else if (maxOrder >= 15 && maxOrder <= 17) {
              maxOrder = 5;
            }

            const isSelectedItem = openJobIndex === data.id;

            return (
              <>
                <tr
                  className={`cursor-pointer ${
                    isSelectedItem
                      ? "selected-candidate-top"
                      : prevOpenedIndex === timelineIndex
                      ? "selected-candidate-prev"
                      : null
                  }`}
                  key={timelineIndex}
                >
                  {/* Candidate */}
                  <td
                    style={{
                      width: "170px",
                    }}
                  >
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
                        <span className="form-text">{data?.createdByName}</span>
                      </div>
                    </div>
                  </td>
                  {/* Bill Rate */}
                  <td
                    style={{
                      width: "7rem",
                    }}
                  >
                    <div className="billrate-container">
                      <div className="billrate-inner">
                        <span className="billrate-amt">
                          {`${
                            data?.billRate && data?.billRate > 0
                              ? `${billRateCurrency} ${data?.billRate}`
                              : "N/A"
                          }`}
                        </span>
                      </div>
                      <Button
                        className="billrate-button"
                        onClick={() => {
                          toggleBrsModal(true);
                          setCandidateId(candidateData?.id);
                          setBsrOption("billRate");
                        }}
                      >
                        <span className="mdi mdi-pencil"></span>
                      </Button>
                    </div>
                  </td>
                  {/* Salary */}
                  <td
                    style={{
                      width: "7rem",
                    }}
                  >
                    <div className="billrate-container">
                      <div className="billrate-inner">
                        <span className="billrate-amt">
                          {`${
                            data?.expectedSalary && data?.expectedSalary > 0
                              ? `${billRateCurrency} ${data?.expectedSalary}`
                              : "N/A"
                          }`}
                        </span>
                      </div>

                      <Button
                        className="billrate-button"
                        onClick={() => {
                          toggleBrsModal(true);
                          setCandidateId(candidateData?.id);
                          setBsrOption("salary");
                        }}
                      >
                        <span className="mdi mdi-pencil"></span>
                      </Button>
                    </div>
                  </td>
                  {/* Progress Bar */}
                  <td
                    style={{
                      width: "300px",
                    }}
                    onClick={() => toggleJobOpen(data.id, timelineIndex)}
                  >
                    <OverviewStepComponent data={data} />
                  </td>
                  {/* Current Status */}
                  <td
                    style={{
                      width: "7rem",
                    }}
                  >
                    <div className="d-flex flex-column align-items-start justify-content-start">
                      <span className="form-text station-title">
                        {data?.stepName ?? "N/A"}
                      </span>
                      <span className="fw-semibold substation-title">
                        {data?.subStepName ?? "N/A"}
                      </span>
                    </div>
                  </td>
                  {/* Next Step */}
                  <td
                    style={{
                      width: "15rem",
                    }}
                  >
                    <div className="d-flex flex-row gap-1">
                      <Input
                        type="select"
                        className="form-select border-0"
                        value={skipSteps?.[data?.id]}
                        disabled={isRejected || isAllStepsCompleted}
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
                        disabled={isRejected || isAllStepsCompleted}
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
                  <td
                    style={{
                      width: "50px",
                    }}
                  >
                    <button
                      className="bg-light main-border-style rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: "30px", height: "30px" }}
                      onClick={() => {
                        handleIconClick(
                          candidateData?.id,
                          selectedSubSteps?.[candidateData?.id],
                          originalOrder,
                          data
                        );
                        setTimelineRowIndex(timelineIndex);
                      }}
                      disabled={
                        isRejected ||
                        !selectedSubSteps?.[candidateData?.id] ||
                        isAllStepsCompleted
                      }
                    >
                      <i
                        className="mdi mdi-content-save-outline mdi-18px"
                        style={{ color: "#0A56AE" }}
                      ></i>
                    </button>
                  </td>
                </tr>
                {isSelectedItem && (
                  <tr className="selected-candidate-bottom">
                    <td colSpan={10} className="px-1 custom-border-bottom">
                      <InnerTimelineStep
                        data={data.timeline}
                        readOnlyActionTrigger={readOnlyActionTrigger}
                        setTimelineRowIndex={() => {
                          setTimelineRowIndex(timelineIndex);
                        }}
                        dataIndex={timelineIndex}
                      />
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
    let showCancel = true;
    let showSubmit = true;
    let cancelLabel = "Cancel";
    let submitLabel = "Update";

    // If read only return cancel
    if (readOnly) {
      return (
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
      );
    }

    switch (step) {
      case ASSOCIATE_FORM_INDEX:
      case PREPARE_TOS_FORM_INDEX:
      case EDIT_TOS_FORM_INDEX:
        submitLabel = "Submit";
        break;
      case SUB_TO_SALES_FORM_INDEX:
      case SUB_TO_CLIENT_FORM_INDEX:
      case SCHEDULE_FORM_INDEX:
      case RESCHEDULED_FORM_INDEX:
      case RELEASE_FORM_INDEX:
        submitLabel = "Send";
        break;
      case PROFILE_FEEDBACK_PENDING_INDEX:
        submitLabel = "Update";
        break;
      case PRE_SKILLS_ASSESSMENT_FORM_INDEX:
        submitLabel = "Invite Candidate";
        break;
      // Tos Form
      case APPROVE_TOS_FORM_INDEX:
        return (
          <Row>
            <Col>
              <div className="d-flex justify-content-end gap-2">
                <Button
                  type="button"
                  onClick={() => formikRef.current.handleCancel()}
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
                  onClick={() => formikRef.current.rejectTos()}
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
                  onClick={() => formikRef.current.approveTos()}
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
      // Conditional Offer prepare and edit
      case PREPARE_FORM_INDEX:
      case EDIT_FORM_INDEX:
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
                whiteSpace: "nowrap",
              }}
            >
              {jobTagMeta?.isLoading &&
              jobTagMeta?.jobType === "conditional_offer_prepare" ? (
                <Spinner size="sm" color="light" />
              ) : (
                "Save As Draft"
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
              jobTagMeta?.jobType === "conditional_offer_edit" ? (
                <Spinner size="sm" color="light" />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        );
      default:
        break;
    }

    return (
      <div className="d-flex align-items-center gap-2">
        {showCancel && (
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
            {cancelLabel}
          </Button>
        )}
        {showSubmit && (
          <Button
            className="btn btn-success"
            onClick={() => {
              formikRef.current.submitForm();
            }}
            style={{
              borderRadius: "8px",
            }}
            disabled={jobTagMeta?.isLoading}
          >
            {jobTagMeta?.isLoading ? (
              <Spinner size="sm" color="light" />
            ) : (
              <span>{submitLabel}</span>
            )}
          </Button>
        )}
      </div>
    );
  };

  const readOnlyActionTrigger = (subitem, flag = false, index) => {
    let onFlag = false;
    const readOnlyActionTriggerObj = {
      [JobOverviewConstants.ASSOCIATE]: () => {
        const status =
          jobTimelineData?.jobs?.[index ?? timelineRowIndex]?.timeline?.[
            JobOverviewConstants.ASSOCIATE
          ]?.status;
        if (
          jobTimelineData?.jobs?.[index ?? timelineRowIndex]?.timeline?.[
            JobOverviewConstants.ASSOCIATE
          ] &&
          status !== JOB_STAGE_STATUS.SKIPPED
        ) {
          if (status === JOB_STAGE_STATUS.WITHDRAWN) {
            if (flag) {
              onFlag = true;
              return;
            }
            setActiveStep(PRF_WTDWN_FORM_INDEX);
            setIsFormModalOpen(true);
          } else {
            if (flag) {
              onFlag = true;
              return;
            }
            setActiveStep(ASSOCIATE_FORM_INDEX);
            setOffcanvasForm(true);
            setReadOnly(true);
          }
        }
      },
      [JobOverviewConstants.PROFILE_FEEDBACK_PENDING]: () => {
        const status =
          jobTimelineData?.jobs?.[index ?? timelineRowIndex]?.timeline?.[
            JobOverviewConstants.PROFILE_FEEDBACK_PENDING
          ]?.status;
        if (
          jobTimelineData?.jobs?.[index ?? timelineRowIndex]?.timeline?.[
            JobOverviewConstants.PROFILE_FEEDBACK_PENDING
          ] &&
          status !== JOB_STAGE_STATUS.SKIPPED
        ) {
          if (flag) {
            onFlag = true;
            return;
          }
          setActiveStep(PROFILE_FEEDBACK_PENDING_INDEX);
          setOffcanvasForm(true);
          setReadOnly(true);
        }
      },
      [JobOverviewConstants.SKILLS_ASSESSMENT]: () => {
        const status =
          jobTimelineData?.jobs?.[index ?? timelineRowIndex]?.timeline?.[
            JobOverviewConstants.SKILLS_ASSESSMENT
          ]?.status;
        if (
          jobTimelineData?.jobs?.[index ?? timelineRowIndex]?.timeline?.[
            JobOverviewConstants.SKILLS_ASSESSMENT
          ] &&
          status !== JOB_STAGE_STATUS.SKIPPED &&
          status !== JOB_STAGE_STATUS.IN_PROGRESS
        ) {
          if (flag) {
            onFlag = true;
            return;
          }
          setActiveStep(SKILLS_ASSESSMENT_FORM_INDEX);
          setOffcanvasForm(true);
          setReadOnly(true);
        }
      },
      [JobOverviewConstants.CODING_TEST]: () => {
        const status =
          jobTimelineData?.jobs?.[index ?? timelineRowIndex]?.timeline?.[
            JobOverviewConstants.CODING_TEST
          ]?.status;
        if (
          jobTimelineData?.jobs?.[index ?? timelineRowIndex]?.timeline?.[
            JobOverviewConstants.CODING_TEST
          ] &&
          status !== JOB_STAGE_STATUS.SKIPPED &&
          status !== JOB_STAGE_STATUS.IN_PROGRESS
        ) {
          if (flag) {
            onFlag = true;
            return;
          }
          setActiveStep(CODING_TEST_FORM_INDEX);
          setOffcanvasForm(true);
          setReadOnly(true);
        }
      },
      [JobOverviewConstants.TECHNICAL_INTERVIEW]: () => {
        const status =
          jobTimelineData?.jobs?.[index ?? timelineRowIndex]?.timeline?.[
            JobOverviewConstants.TECHNICAL_INTERVIEW
          ]?.status;
        if (
          jobTimelineData?.jobs?.[index ?? timelineRowIndex]?.timeline?.[
            JobOverviewConstants.TECHNICAL_INTERVIEW
          ] &&
          status !== JOB_STAGE_STATUS.SKIPPED &&
          status !== JOB_STAGE_STATUS.IN_PROGRESS
        ) {
          if (flag) {
            onFlag = true;
            return;
          }
          setActiveStep(TEC_INTRW_FORM_INDEX);
          setOffcanvasForm(true);
          setReadOnly(true);
        }
      },
      [JobOverviewConstants.CULTURAL_FIT_TEST]: () => {
        const status =
          jobTimelineData?.jobs?.[index ?? timelineRowIndex]?.timeline?.[
            JobOverviewConstants.CULTURAL_FIT_TEST
          ]?.status;
        if (
          jobTimelineData?.jobs?.[index ?? timelineRowIndex]?.timeline?.[
            JobOverviewConstants.CULTURAL_FIT_TEST
          ] &&
          status !== JOB_STAGE_STATUS.SKIPPED &&
          status !== JOB_STAGE_STATUS.IN_PROGRESS
        ) {
          if (flag) {
            onFlag = true;
            return;
          }
          setActiveStep(CULTURAL_FIT_TEST_FORM_INDEX);
          setOffcanvasForm(true);
          setReadOnly(true);
        }
      },
      [JobOverviewConstants.PREPARE_TOS]: () => {
        const status =
          jobTimelineData?.jobs?.[index ?? timelineRowIndex]?.timeline?.[
            JobOverviewConstants.PREPARE_TOS
          ]?.status;
        if (
          jobTimelineData?.jobs?.[index ?? timelineRowIndex]?.timeline?.[
            JobOverviewConstants.PREPARE_TOS
          ] &&
          status !== JOB_STAGE_STATUS.SKIPPED
        ) {
          if (flag) {
            onFlag = true;
            return;
          }
          setActiveStep(EDIT_TOS_FORM_INDEX);
          setOffcanvasForm(true);
          setReadOnly(true);
        }
      },
      [JobOverviewConstants.CONDITIONAL_OFFER_SENT]: () => {
        if (
          jobTimelineData?.jobs?.[index ?? timelineRowIndex]?.timeline?.[
            JobOverviewConstants.CONDITIONAL_OFFER_SENT
          ] &&
          jobTimelineData?.jobs?.[index ?? timelineRowIndex]?.timeline?.[
            JobOverviewConstants.CONDITIONAL_OFFER_SENT
          ]?.status === JOB_STAGE_STATUS.COMPLETED
        ) {
          if (flag) {
            onFlag = true;
            return;
          }
          setActiveStep(EDIT_FORM_INDEX);
          setOffcanvasForm(true);
          setReadOnly(true);
        }
      },

      // Modal and Forms
      [JobOverviewConstants.TAG]: () => {
        if (
          jobTimelineData?.jobs?.[index ?? timelineRowIndex]?.timeline?.[
            JobOverviewConstants.TAG
          ] &&
          jobTimelineData?.jobs?.[index ?? timelineRowIndex]?.timeline?.["Tag"]
            ?.status === JOB_STAGE_STATUS.WITHDRAWN
        ) {
          if (flag) {
            onFlag = true;
            return;
          }
          setActiveStep(PRF_WTDWN_FORM_INDEX);
          setIsFormModalOpen(true);
        }
      },
      [JobOverviewConstants.SUBMIT_TO_SALES]: () => {
        const status =
          jobTimelineData?.jobs?.[index ?? timelineRowIndex]?.timeline?.[
            JobOverviewConstants.SUBMIT_TO_SALES
          ]?.status;
        if (
          jobTimelineData?.jobs?.[index ?? timelineRowIndex]?.timeline?.[
            JobOverviewConstants.SUBMIT_TO_SALES
          ]
        ) {
          if (status === JOB_STAGE_STATUS.REJECTED) {
            if (flag) {
              onFlag = true;
              return;
            }
            setActiveStep(PRF_REJ_SALES_FORM_INDEX);
            setIsFormModalOpen(true);
          } else if (status === JOB_STAGE_STATUS.WITHDRAWN) {
            if (flag) {
              onFlag = true;
              return;
            }
            setActiveStep(PRF_WTDWN_FORM_INDEX);
            setIsFormModalOpen(true);
          }
        }
      },
      [JobOverviewConstants.SUBMIT_TO_CLIENT]: () => {
        const status =
          jobTimelineData?.jobs?.[index ?? timelineRowIndex]?.timeline?.[
            JobOverviewConstants.SUBMIT_TO_CLIENT
          ]?.status;
        if (
          jobTimelineData?.jobs?.[index ?? timelineRowIndex]?.timeline?.[
            JobOverviewConstants.SUBMIT_TO_CLIENT
          ]
        ) {
          if (status === JOB_STAGE_STATUS.REJECTED) {
            if (flag) {
              onFlag = true;
              return;
            }
            setActiveStep(PRF_REJ_CLIENT_FORM_INDEX);
            setIsFormModalOpen(true);
          } else if (status === JOB_STAGE_STATUS.WITHDRAWN) {
            if (flag) {
              onFlag = true;
              return;
            }
            setActiveStep(PRF_WTDWN_FORM_INDEX);
            setIsFormModalOpen(true);
          }
        }
      },
      [JobOverviewConstants.TOS_ACCEPTED_DECLINED]: () => {
        if (
          jobTimelineData?.jobs?.[index ?? timelineRowIndex]?.timeline?.[
            JobOverviewConstants.TOS_ACCEPTED_DECLINED
          ]
        ) {
          if (
            jobTimelineData?.jobs?.[index ?? timelineRowIndex]?.timeline?.[
              JobOverviewConstants.TOS_ACCEPTED_DECLINED
            ]?.status === JOB_STAGE_STATUS.COMPLETED
          ) {
            if (flag) {
              onFlag = true;
              return;
            }
            setActiveStep(EDIT_TOS_FORM_INDEX);
            setOffcanvasForm(true);
            setReadOnly(true);
          }
          if (
            jobTimelineData?.jobs?.[index ?? timelineRowIndex]?.timeline?.[
              JobOverviewConstants.TOS_ACCEPTED_DECLINED
            ]?.status === JOB_STAGE_STATUS.REJECTED
          ) {
            if (flag) {
              onFlag = true;
              return;
            }
            setActiveStep(APPROVE_TOS_FORM_INDEX);
            setModalFormName({
              header: "TOS Rejected",
              formName: "rejected_tos",
            });
            setIsFormModalOpen(true);
          }
        }
      },
      [JobOverviewConstants.CONDITIONAL_OFFER_ACCEPTED_DECLINED]: () => {
        if (
          jobTimelineData?.jobs?.[index ?? timelineRowIndex]?.timeline?.[
            JobOverviewConstants.CONDITIONAL_OFFER_ACCEPTED_DECLINED
          ]
        ) {
          const conditionalOfferStatus =
            jobTimelineData?.jobs?.[index ?? timelineRowIndex]?.timeline?.[
              JobOverviewConstants.CONDITIONAL_OFFER_ACCEPTED_DECLINED
            ]?.status;
          if (conditionalOfferStatus === JOB_STAGE_STATUS.COMPLETED) {
            if (flag) {
              onFlag = true;
              return;
            }
            setActiveStep(ACCEPTED_FORM_INDEX);
            setModalFormName({
              header: "Conditional Offer Accepted",
              formName: "conditional_offer_accepted",
            });
            setIsFormModalOpen(true);
          }
          if (conditionalOfferStatus === JOB_STAGE_STATUS.REJECTED) {
            if (flag) {
              onFlag = true;
              return;
            }
            setActiveStep(REJECTED_FORM_INDEX);
            setModalFormName({
              header: "Conditional Offer Rejected",
              formName: "conditional_offer_rejected",
            });
            setIsFormModalOpen(true);
          }
        }
      },
      [JobOverviewConstants.FIRST_INTERVIEW_SCHEDULED]: () => {
        if (
          jobTimelineData?.jobs?.[index ?? timelineRowIndex]?.timeline?.[
            JobOverviewConstants.FIRST_INTERVIEW_SCHEDULED
          ]
        ) {
          const status =
            jobTimelineData?.jobs?.[index ?? timelineRowIndex]?.timeline?.[
              JobOverviewConstants.FIRST_INTERVIEW_SCHEDULED
            ]?.status;
          if (status === JOB_STAGE_STATUS.REJECTED) {
            if (flag) {
              onFlag = true;
              return;
            }
            setActiveStep(REJECTED_INTRW_FORM_INDEX);
            setIsFormModalOpen(true);
            setReadOnlyInterviewNo(1);
          } else if (status === JOB_STAGE_STATUS.WITHDRAWN) {
            if (flag) {
              onFlag = true;
              return;
            }
            setActiveStep(BACKOUT_CANDIE_FORM_INDEX);
            setIsFormModalOpen(true);
            setReadOnlyInterviewNo(1);
          }
        }
      },
      [JobOverviewConstants.SECOND_INTERVIEW_SCHEDULED]: () => {
        if (
          jobTimelineData?.jobs?.[index ?? timelineRowIndex]?.timeline?.[
            JobOverviewConstants.SECOND_INTERVIEW_SCHEDULED
          ]
        ) {
          const status =
            jobTimelineData?.jobs?.[index ?? timelineRowIndex]?.timeline?.[
              JobOverviewConstants.SECOND_INTERVIEW_SCHEDULED
            ]?.status;
          if (status === JOB_STAGE_STATUS.REJECTED) {
            if (flag) {
              onFlag = true;
              return;
            }
            setActiveStep(REJECTED_INTRW_FORM_INDEX);
            setIsFormModalOpen(true);
            setReadOnlyInterviewNo(2);
          } else if (status === JOB_STAGE_STATUS.WITHDRAWN) {
            if (flag) {
              onFlag = true;
              return;
            }
            setActiveStep(BACKOUT_CANDIE_FORM_INDEX);
            setIsFormModalOpen(true);
            setReadOnlyInterviewNo(2);
          }
        }
      },
      [JobOverviewConstants.THIRD_INTERVIEW_SCHEDULED]: () => {
        if (
          jobTimelineData?.jobs?.[index ?? timelineRowIndex]?.timeline?.[
            JobOverviewConstants.THIRD_INTERVIEW_SCHEDULED
          ]
        ) {
          const status =
            jobTimelineData?.jobs?.[index ?? timelineRowIndex]?.timeline?.[
              JobOverviewConstants.THIRD_INTERVIEW_SCHEDULED
            ]?.status;
          if (status === JOB_STAGE_STATUS.REJECTED) {
            if (flag) {
              onFlag = true;
              return;
            }
            setActiveStep(REJECTED_INTRW_FORM_INDEX);
            setIsFormModalOpen(true);
            setReadOnlyInterviewNo(3);
          } else if (status === JOB_STAGE_STATUS.WITHDRAWN) {
            if (flag) {
              onFlag = true;
              return;
            }
            setActiveStep(BACKOUT_CANDIE_FORM_INDEX);
            setIsFormModalOpen(true);
            setReadOnlyInterviewNo(3);
          }
        }
      },
      [JobOverviewConstants.INTERVIEW_FEEDBACK_PENDING]: () => {
        if (
          jobTimelineData?.jobs?.[index ?? timelineRowIndex]?.timeline?.[
            JobOverviewConstants.INTERVIEW_FEEDBACK_PENDING
          ] &&
          jobTimelineData?.jobs?.[index ?? timelineRowIndex]?.timeline?.[
            JobOverviewConstants.INTERVIEW_FEEDBACK_PENDING
          ]?.status === JOB_STAGE_STATUS.COMPLETED
        ) {
          if (flag) {
            onFlag = true;
            return;
          }
          setActiveStep(SELECTED_FORM_INDEX);
          setIsFormModalOpen(true);
        }
      },
    };
    readOnlyActionTriggerObj[subitem]?.();
    return onFlag;
  };

  //Handle Canvas Close and Modal Close
  useEffect(() => {
    // If canvas is close set readOnly to false
    if (!offcanvasForm) {
      setReadOnly(false);
      setReadOnlyInterviewNo(0);
    }
  }, [offcanvasForm]);

  useEffect(() => {
    if (!isFormModalOpen) {
      setReadOnly(false);
      setReadOnlyInterviewNo(0);
    }
  }, [isFormModalOpen]);

  useEffect(() => {
    const mobile = isMobile | isTablet;
    const values = overviewValues(
      formSubmissionData,
      jobTimelineData,
      deliveryTeam,
      mobile
    );
    onRetrieveHeader(values);
  }, [formSubmissionData, jobTimelineData, deliveryTeam, isMobile, isTablet]);

  return (
    <React.Fragment>
      <div className="p-2">
        <Row className="mb-0" hidden={isTimelineFullscreen}>
          <Card
            style={{ backgroundColor: "#F3F8FF", border: "1px solid #D0DAE8" }}
          >
            <CardBody className="py-1 px-0">
              <TimelineHeader
                data={jobHeaders}
                setStageType={setStageType}
                pageRequestSet={pageRequestSet}
              />
            </CardBody>
          </Card>
        </Row>
        <Row className="mb-2">
          <Nav pills>
            <NavItem>
              <NavLink
                className={`cursor-pointer fw-semibold ${
                  timelineTab === "1" ? "active" : ""
                }`}
                onClick={() => setTimelineTab("1")}
                style={{
                  borderRadius: "5px 0 0 5px",
                  boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.031)",
                }}
              >
                RTS Status
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={`cursor-pointer fw-semibold ${
                  timelineTab === "2" ? "active" : ""
                }`}
                onClick={() => setTimelineTab("2")}
                style={{
                  borderRadius: " 0 5px 5px 0",
                  boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.031)",
                }}
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
                    className="form-control search border-0"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </form>
                <i
                  className="ri-search-line fw-semibold search-icon"
                  style={{ color: "#0A56AE" }}
                ></i>
              </div>
            </div>
            <div className="d-flex flex-row align-items-center gap-2">
              <TableItemDisplay pageInfo={pageInfo} />
              <div
                style={{
                  width: "2px",
                  height: "20px",
                  backgroundColor: "#adb5bd",
                  marginLeft: "12px",
                }}
              ></div>
              <TableRowsPerPageWithNav
                pageInfo={pageInfo}
                pageRequestSet={pageRequestSet}
                defaultValue={20}
              />
              <ButtonGroup>
                <Button className="bg-white main-border-style">
                  <i className="mdi mdi-download-outline align-bottom me-1"></i>
                </Button>
                <Button
                  className="bg-white main-border-style"
                  onClick={() => {
                    setIsJobOverviewTagOpen(true);
                  }}
                >
                  <i className="mdi mdi-account-plus-outline align-bottom me-1"></i>
                </Button>
                <Button
                  className="bg-white main-border-style"
                  onClick={() => toggleTimelineFullscreen()}
                >
                  <i className="ri-fullscreen-line align-bottom me-1"></i>
                </Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button className="bg-white main-border-style">
                  <i className="mdi mdi-filter-variant align-bottom me-1"></i>
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
                  <thead className="bg-white">
                    <tr>
                      {newHeaders.map((header, index) => (
                        <td
                          key={index}
                          className={`main-border-style cursor-pointer main-table-header-text ${
                            prevOpenedIndex === -1
                              ? "selected-candidate-prev"
                              : null
                          }`}
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
        </Row>
        <Offcanvas
          isOpen={offcanvasForm}
          toggle={() => {
            setOffcanvasForm(!offcanvasForm);
            setIsViewTemplate(false);
            setTemplatePreviewInfo(null);
          }}
          direction="end"
          // Previously 55vw
          style={{ width: isMobile ? "100vw" : "60vw" }}
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
            jobTimeLineData={jobTimelineData?.jobs?.[timelineRowIndex]}
            fetchSingleTemplate={{
              category: "Email Templates",
              template: "Associate",
            }}
          />
        </Offcanvas>

        {/* Form Modal */}
        <ModalFormWrapper
          originalOrder={originalOrder}
          activeStep={activeStep}
          header={stepperState}
          isFormModalOpen={isFormModalOpen}
          closeModal={() => setIsFormModalOpen(false)}
          jobTimeLineData={jobTimelineData?.jobs?.[timelineRowIndex]}
          modalFormName={modalFormName}
          isLoading={jobTagMeta?.isLoading}
          readOnlyInterviewNo={readOnlyInterviewNo}
          setModalFormName={setModalFormName}
        />

        <BillRateSalaryEditModal
          data={jobTimelineData}
          isOpen={isBrsModalOpen}
          closeModal={() => {
            setIsBrsModalOpen(false);
            setBsrOption("");
          }}
          option={bsrOption}
          jobId={jobId}
          candidateId={candidateId}
        />

        <BillRateZeroModal
          isOpen={billRateModalOpen}
          closeModal={() => setBillRateModalOpen(false)}
          header={BillRateZeroLabels.header}
          body={BillRateZeroLabels.body}
        />

        <JobOverviewTag
          isJobOverviewTagOpen={isJobOverviewTagOpen}
          isOpen={isJobOverviewTagOpen}
          closeTag={() => setIsJobOverviewTagOpen(!isJobOverviewTagOpen)}
          jobId={jobId}
          data={formSubmissionData}
        />
      </div>
    </React.Fragment>
  );
};

export default JobOverview;
