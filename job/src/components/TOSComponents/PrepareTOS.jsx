import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Row, Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "@workspace/common";
import { useNavigate, useLocation } from "react-router-dom";
// Fetching the forms and tagging the job once created.
import { fetchJobForm, tagJob } from "../../store/actions";
import { useUserAuth } from "@workspace/login";
import {
  JOB_STAGE_IDS,
  JOB_STAGE_STATUS,
} from "../JobListing/JobListingConstants";

const PrepareTOS = forwardRef(
  ({ jobId, candidateId, setOffcanvasForm }, parentRef) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const formikRef = useRef(null);
    const { getAllUserGroups } = useUserAuth();
    const [editData, setEditData] = useState({});

    const form = useSelector((state) => state.JobFormReducer.form);
    const [formTemplate, setFormTemplate] = useState(null);

    const linkState = location.state;
    const [view, setView] = useState(
      linkState?.view !== null && linkState?.view !== undefined
        ? linkState?.view
        : false
    );

    useEffect(() => {
      dispatch(fetchJobForm("review_tos"));
    }, []);

    useEffect(() => {
      if (form) {
        setFormTemplate(form);
      }
    }, [form]);

    // Handle Form Submit
    const handleFormSubmit = async (values) => {
      const payload = {
        jobId: jobId,
        jobStageId: JOB_STAGE_IDS?.PREPARE_TOS,
        status: values?.candidateStatus ?? JOB_STAGE_STATUS?.COMPLETED,
        candidateId,
        formData: JSON.stringify(values),
        formId: parseInt(form.formId),
        jobType: "prepare_tos",
      };
      dispatch(tagJob({ payload, navigate }));
      setOffcanvasForm(false);
    };

    const handleCancel = () => {
      setOffcanvasForm(false);
    };

    useImperativeHandle(parentRef, () => ({
      handleCancel,
      submitForm: () => {
        formikRef?.current?.formik?.submitForm();
      },
    }));

    return (
      <React.Fragment>
        <div
          className="d-flex flex-column justiy-content-between h-100 p-3"
          style={{ height: "500px" }}
        >
          <Row>
            <Col>
              <div>
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
              </div>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
);

export default PrepareTOS;
