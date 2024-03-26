import React, { useState, useEffect } from "react";
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
import { useParams } from "react-router-dom";
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
  timelineLegend,
  stepOrders,
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

const JobOverview = () => {
  document.title = "Job Timeline | RTS";

  const isTablet = useMediaQuery({ query: "(max-width: 1224px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isBigScreen = useMediaQuery({ query: "(max-width: 1440px)" });
  const [legendTooltip, setLegendTooltip] = useState(false);

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
      searchFields: DynamicTableHelper.generateSeachFieldArray(
        JOB_TIMELINE_INITIAL_OPTIONS
      ),
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
        if (maxOrder >= 10 && maxOrder < 13) {
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
      setFormTemplate(JSON.parse(JSON.stringify(form)));
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
          />
        );
      case 2:
        return isPreviewCV ? (
          <CVPreview
            onExitPreview={handleExitPreview}
            templateData={templateData}
            candidateId={candidateId}
          />
        ) : (
          <SubmitToSales
            closeOffcanvas={closeOffcanvas}
            onPreviewCVClick={handlePreviewCVClick}
            templateData={templateData}
            jobId={jobId}
            candidateId={candidateId}
          />
        );
      case 3:
        return isPreviewCV ? (
          <CVPreview
            onExitPreview={handleExitPreview}
            templateData={templateData}
            candidateId={candidateId}
            jobId={jobId}
          />
        ) : (
          <SubmitToClient
            closeOffcanvas={closeOffcanvas}
            onPreviewCVClick={handlePreviewCVClick}
            templateData={templateData}
            jobId={jobId}
            candidateId={candidateId}
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
  const getFormIndex = (originalOrder) => {
    let index = null;
    switch (originalOrder) {
      case 6:
        index = 6;
        break;
      case 7:
        index = 8;
        break;
      case 8:
        index = 10;
        break;
      case 9:
        index = 11;
        break;
      case 10:
        index = 12;
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

  return (
    <React.Fragment>
      <div>
        <Row lg={12} className="m-0 p-0">
          <TimelineHeader data={jobHeaders} />
        </Row>
        <hr className="border border-dashed border-dark" />
        <Row className="mb-2">
          <Col>
            <div
              className={`d-flex ${
                isMobile
                  ? "flex-column align-items-start"
                  : "flex-row align-items-center"
              } justify-content-between gap-1`}
            >
              <div
                className={`d-flex ${
                  isMobile
                    ? "flex-column align-items-start"
                    : "flex-row align-items-end"
                } h5 fw-bold  gap-1`}
                style={{ whiteSpace: "nowrap" }}
              >
                <div className="d-flex flex-row gap-1">
                  <div className="d-flex flex-column">
                    <span className="fw-medium h6 text-muted">Account</span>
                    <span
                      title={formSubmissionData?.accountName}
                      className="cursor-pointer"
                    >
                      {isMobile | isTablet
                        ? truncate(formSubmissionData?.accountName, 8)
                        : truncate(formSubmissionData?.accountName, 35)}
                      <span> | </span>
                    </span>
                  </div>
                  <div className="d-flex flex-column">
                    <span className="fw-medium h6 text-muted">Job Title</span>
                    <span
                      title={formSubmissionData?.jobTitle}
                      className="cursor-pointer"
                    >
                      {isMobile | isTablet
                        ? truncate(formSubmissionData?.jobTitle, 8)
                        : truncate(formSubmissionData?.jobTitle, 35)}
                      <span> | </span>
                    </span>
                  </div>
                  <div className="d-flex flex-column">
                    <span className="fw-medium h6 text-muted">Job Id</span>
                    <span
                      title={formSubmissionData?.clientJobId}
                      className="cursor-pointer"
                    >
                      {isMobile | isTablet
                        ? truncate(formSubmissionData?.clientJobId, 8)
                        : truncate(formSubmissionData?.clientJobId, 35)}
                      {isMobile || <span> | </span>}
                    </span>
                  </div>
                </div>
                <div className="d-flex flex-row gap-1">
                  <div className="d-flex flex-column">
                    <span className="fw-medium h6 text-muted">Sales</span>
                    <span
                      title={formSubmissionData?.accountOwner}
                      className="cursor-pointer"
                    >
                      {isMobile | isTablet
                        ? truncate(formSubmissionData?.accountOwner, 8)
                        : truncate(formSubmissionData?.accountOwner, 35)}
                    </span>
                  </div>
                  <div className="d-flex align-items-end gap-1">
                    <span>|</span>
                    <div className="d-flex flex-column">
                      <span className="fw-medium h6 text-muted">Delivery</span>
                      <span
                        title={deliveryTeam?.join(", ")}
                        className="cursor-pointer"
                      >
                        {isMobile | isTablet
                          ? truncate(deliveryTeam?.join(", "), 8)
                          : truncate(deliveryTeam?.join(", "), 25)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column gap-2">
                <div className="d-flex flex-row gap-2 justify-content-end align-items-center">
                  <div>
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
                  <div className="search-box">
                    <form onSubmit={pageRequestSet.setSearchTerm}>
                      <Input
                        type="text"
                        placeholder="Search"
                        className="form-control search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </form>
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

                  {jobTimelineMeta?.isLoading ? (
                    <tr>
                      <td colSpan={rtsStatusHeaders.length}>
                        <Skeleton count={1} />
                      </td>
                    </tr>
                  ) : jobTimelineData?.jobs?.length > 0 ? (
                    jobTimelineData?.jobs?.map((data, index) => {
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
                      const originalOrder = maxOrder;
                      if (maxOrder >= 6 && maxOrder < 9) {
                        maxOrder = 5;
                      }
                      return (
                        <tbody key={index}>
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
                              {!isRejected && maxOrder < 11 && (
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
                                    onClick={() =>
                                      handleIconClick(
                                        data?.candidate?.id,
                                        data?.id,
                                        getFormIndex(
                                          skipComboOptions[data.id] <
                                            originalOrder
                                            ? originalOrder
                                            : skipComboOptions[data.id]
                                        )
                                      )
                                    }
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
          toggle={() => setOffcanvasForm(!offcanvasForm)}
          direction="end"
          style={{ width: isMobile ? "100vw" : "75vw" }}
        >
          <div className="offcanvas-header border-bottom border-bottom-dashed d-flex flex-row gap-4 align-items-center">
            <div className="avatar-md flex-shrink-0 d-flex gap-3">
              <div className="avatar-title rounded-circle fs-4 flex-shrink-0">
                {formSubmissionData?.accountName.charAt(0)}
              </div>

              <Row className="d-flex flex-row justify-content-between align-items-end gap-5">
                <Col>
                  <Row>
                    <span className="h4 fw-bold">
                      {formSubmissionData?.accountName}
                    </span>
                  </Row>
                  <Row>
                    <div className="d-flex flex-row gap-4">
                      <span className="h6 fw-semibold text-nowrap">
                        Job ID - {formSubmissionData?.clientJobId}
                      </span>
                      <span
                        className="h6 fw-semibold text-nowrap cursor-pointer"
                        title={formSubmissionData?.jobTitle}
                      >
                        Job Title - {truncate(formSubmissionData?.jobTitle, 55)}
                      </span>
                    </div>
                  </Row>
                  <Row>
                    <span className="h6 text-muted fw-bold">
                      {stepperState}
                    </span>
                  </Row>
                </Col>
              </Row>
            </div>
            {/* Template Selector */}
            {(activeStep === 11 || isPreviewCV) && (
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
            )}
          </div>
          <OffcanvasBody>
            {getFormComponent(activeStep, () => setOffcanvasForm(false))}
          </OffcanvasBody>
        </Offcanvas>
      </div>
    </React.Fragment>
  );
};

export default JobOverview;
