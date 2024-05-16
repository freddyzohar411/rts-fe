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
import { useLocation } from "react-router-dom";
import { fetchJobForm } from "../../store/actions";
import { useUserAuth } from "@workspace/login";
import { getTOSByJobIdAndCandidateIdAndStatus } from "../../helpers/backend_helper";

// Display uneditable form for approving TOS.
// User should be able to select reject or accept TOS.
const ApproveTOS = forwardRef(
  (
    {
      closeOffCanvas,
      jobId,
      candidateId,
      setOffcanvasForm,
      setIsFormModalOpen,
      setModalFormName,
      jobTimeLineData,
      edit = true,
    },
    parentRef
  ) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const formikRef = useRef(null);
    const { getAllUserGroups } = useUserAuth();

    const form = useSelector((state) => state.JobFormReducer.form);
    const [formTemplate, setFormTemplate] = useState(null);
    const [formSubmissionData, setFormSubmissionData] = useState(null);
    const [tosId, setTosId] = useState(null);

    useEffect(() => {
      if (form && tosId && formTemplate) {
        const newFormTemplate = setEntityInfo({ ...formTemplate });

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

    const handleCancel = () => {
      setOffcanvasForm(false);
    };

    const handleFormSubmit = (values) => {};

    const approveTos = () => {
      setIsFormModalOpen(true);
      setModalFormName({ header: "Confirmation", formName: "approve_tos" });
      setOffcanvasForm(false);
    };

    const rejectTos = () => {
      setIsFormModalOpen(true);
      setModalFormName({ header: "TOS Rejected", formName: "rejected_tos" });
      setOffcanvasForm(false);
    };

    useImperativeHandle(parentRef, () => ({
      handleCancel,
      approveTos,
      rejectTos,
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
                  editData={formSubmissionData}
                  onSubmit={handleFormSubmit}
                  onFormFieldsChange={null}
                  errorMessage={null}
                  view={true}
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

export default ApproveTOS;
