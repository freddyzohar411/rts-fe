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
import { fetchJobForm, tagJob, tagJobFiles } from "../../store/actions";
import { useUserAuth } from "@workspace/login";
import {
  JOB_STAGE_IDS,
  JOB_STAGE_STATUS,
} from "../JobListing/JobListingConstants";
import { getTOSByJobIdAndCandidateIdAndStatus } from "../../helpers/backend_helper";

const PrepareTOS = forwardRef(
  (
    {
      jobId,
      candidateId,
      setOffcanvasForm,
      jobTimeLineData,
      edit = false,
      readOnly = false,
    },
    parentRef
  ) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const formikRef = useRef(null);
    const { getAllUserGroups } = useUserAuth();

    const form = useSelector((state) => state.JobFormReducer.form);
    const [formTemplate, setFormTemplate] = useState(null);

    const [tosId, setTosId] = useState(null);
    const linkState = location.state;
    const [view] = useState(
      linkState?.view !== null && linkState?.view !== undefined
        ? linkState?.view
        : false
    );

    const [formSubmissionData, setFormSubmissionData] = useState(null);

    const [prePrepopulateData, setPrePopulateData] = useState(null);
    // Pre Populate Data
    useEffect(() => {
      if (!edit) {
        setPrePopulateData({
          clientName: jobTimeLineData?.job?.jobSubmissionData?.clientName || "",
        });
      }
    }, []);

    useEffect(() => {
      if (form && tosId && formTemplate) {
        const newFormTemplate = setEntityInfo({ ...formTemplate }); // Ensures a new object is created

        // Deep compare to check if the update is necessary
        if (JSON.stringify(formTemplate) !== JSON.stringify(newFormTemplate)) {
          setFormTemplate(newFormTemplate);
        }
      }
    }, [tosId, formSubmissionData, form, formTemplate]);

    // Set entity info for file upload to the form schema
    const setEntityInfo = (form) => {
      const newForm = JSON.parse(JSON.stringify(form));
      newForm?.formSchema?.forEach((field) => {
        if (field.type === "file") {
          field.entityInfo = {
            entityId: tosId,
            entityType: "TOS",
            documentKey: field.name,
          };
        }
      });
      return newForm;
    };

    useEffect(() => {
      // Get TOS SUbmission data
      if (jobTimeLineData && edit) {
        getTOSByJobIdAndCandidateIdAndStatus(
          jobTimeLineData?.job?.id,
          jobTimeLineData?.candidate?.id,
          "PREPARE"
        ).then((response) => {
          setTosId(response?.data?.id);
          setFormSubmissionData(response?.data?.tosSubmissionData);
        });
      }
    }, [jobTimeLineData]);

    useEffect(() => {
      dispatch(fetchJobForm("prepare_tos"));
    }, []);

    useEffect(() => {
      if (form) {
        setFormTemplate(form);
      }
    }, [form]);

    // Handle Form Submit
    const handleFormSubmit = async (values, events, newValues) => {
      // Input is an object Write me function if value is a file return back a array witht the { fileKey, file}
      const extractFilesToArray = (values) => {
        const files = [];
        for (const key in values) {
          if (values[key] instanceof File) {
            files.push({ fileKey: key, file: values[key] });
            // Remove the file and replace with file name
            values[key] = values[key].name;
          }
        }
        return files;
      };

      // Based on the form schema, get an array of all the file type in the form
      let filesData = [];
      formTemplate?.formSchema?.forEach((field) => {
        if (field?.type === "file") {
          filesData.push({ fileKey: field?.name });
        }
      });

      // Check against newValues and extract files. If there is a string, just leave as null else delete the file
      filesData = filesData.map((fileData) => {
        // if there is a string then just ignore if there is a file then return the file
        if (newValues[fileData?.fileKey] instanceof File) {
          return {
            ...fileData,
            file: newValues[fileData?.fileKey],
          };
        } else if (
          typeof newValues[fileData?.fileKey] === "string" &&
          newValues[fileData?.fileKey] !== ""
        ) {
          return {
            ...fileData,
          };
        } else {
          return null;
        }
      });

      // Remove null values
      filesData = filesData.filter((fileData) => fileData !== null);

      // Get File out of the newValues and replace with String
      extractFilesToArray(newValues);

      const payload = {
        jobId: jobTimeLineData?.job?.id,
        jobStageId: JOB_STAGE_IDS?.PREPARE_TOS,
        status: values?.candidateStatus ?? JOB_STAGE_STATUS?.COMPLETED,
        candidateId: jobTimeLineData?.candidate?.id,
        formData: JSON.stringify(newValues),
        formId: parseInt(form.formId),
        jobType: "prepare_tos",
        stepName: "TOS",
        subStepName: edit === false ? "Prepare TOS" : "Edit TOS",
      };

      const formData = new FormData();
      for (const key in payload) {
        formData.append(key, payload[key]);
      }

      // Add files to the form data
      if (filesData.length > 0) {
        filesData?.forEach((fileData, index) => {
          formData.append(`files[${index}].fileKey`, fileData?.fileKey);
          if (fileData?.file) {
            formData.append(`files[${index}].file`, fileData?.file);
          }
        });
      }

      dispatch(
        tagJobFiles({
          formData,
          config: {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
          jobType: "prepare_tos",
          navigate,
        })
      );

      // Close the form
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
                  editData={edit ? formSubmissionData : prePrepopulateData}
                  onSubmit={handleFormSubmit}
                  onFormFieldsChange={null}
                  errorMessage={null}
                  view={readOnly}
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
