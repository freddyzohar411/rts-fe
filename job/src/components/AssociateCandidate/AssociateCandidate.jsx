import { Form } from "@workspace/common";
import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Col,
  Row,
  TabContent,
  TabPane,
  Nav,
  NavLink,
  NavItem,
} from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobForm, tagJob } from "../../store/actions";
import { ASSOCIATE_CANDIDATE } from "./constants";
import { useUserAuth } from "@workspace/login";
import TechnicalScreening from "./TechnicalScreening";
import classnames from "classnames";
import {
  JOB_STAGE_IDS,
  JOB_STAGE_STATUS,
} from "../JobListing/JobListingConstants";

function AssociateCandidate({
  closeOffcanvas,
  jobId,
  candidateId,
  timelineData,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const linkState = location.state;
  const { getAllUserGroups } = useUserAuth();

  const [view, setView] = useState(
    linkState?.view !== null && linkState?.view !== undefined
      ? linkState?.view
      : false
  );
  const formikRef = useRef(null);
  const form = useSelector((state) => state.JobFormReducer.form);
  const [formTemplate, setFormTemplate] = useState(null);
  const [activeTab, setActiveTab] = useState("1");
  const [editData, setEditData] = useState({});

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  useEffect(() => {
    dispatch(fetchJobForm(ASSOCIATE_CANDIDATE));
  }, []);

  useEffect(() => {
    if (form) {
      setFormTemplate(form);
    }
  }, [form]);

  // Set candidate salaries on associate page
  useEffect(() => {
    if (timelineData) {
      setEditData({
        candidateCurrentSalary:
          timelineData?.candidate?.candidateSubmissionData
            ?.candidateCurrentSalary,
        candidateExpectedSalary:
          timelineData?.candidate?.candidateSubmissionData
            ?.candidateExpectedSalary,
      });
    }
  }, [timelineData]);

  // Handle form submit
  const handleFormSubmit = async (
    event,
    values,
    newValues,
    buttonNameHook,
    formStateHook,
    rerenderTable
  ) => {
    const payload = {
      jobId: jobId,
      jobStageId: JOB_STAGE_IDS?.ASSOCIATE,
      status: JOB_STAGE_STATUS?.COMPLETED,
      candidateId,
      formData: JSON.stringify(values),
      formId: parseInt(form.formId),
      jobType: "associate_candidate",
    };
    dispatch(tagJob({ payload, navigate }));
    closeOffcanvas();
  };

  const handleCancel = () => {
    closeOffcanvas();
  };

  return (
    <React.Fragment>
      <div className="p-3">
        <Row>
          <Col lg={4} className="mb-3">
            <span className="h5 fw-bold text-dark">Associate Candidate</span>
          </Col>
        </Row>
        <Nav tabs>
          <NavItem>
            <NavLink
              style={{ cursor: "pointer" }}
              className={classnames({ active: activeTab === "1" })}
              onClick={() => toggle("1")}
            >
              Associate Candidate
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ cursor: "pointer" }}
              className={classnames({ active: activeTab === "2" })}
              onClick={() => toggle("2")}
            >
              Technical Screening
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <div className="mt-3">
              <Form
                template={formTemplate}
                userDetails={getAllUserGroups()}
                country={null}
                editData={editData}
                onSubmit={handleFormSubmit}
                onFormFieldsChange={null}
                errorMessage={null}
                view={view}
                ref={formikRef}
              />
              <div className="d-flex flex-row justify-content-end gap-4 m-2">
                <div className="d-flex flex-row gap-2">
                  <Button
                    type="submit"
                    className="btn btn-custom-primary"
                    onClick={() => {
                      formikRef?.current?.formik?.submitForm();
                    }}
                  >
                    Associate
                  </Button>
                  <Button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleCancel()}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane tabId="2">
            <TechnicalScreening />
          </TabPane>
        </TabContent>
      </div>
    </React.Fragment>
  );
}

export default AssociateCandidate;
