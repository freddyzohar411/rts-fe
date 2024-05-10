import React, { forwardRef, useImperativeHandle } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button } from "reactstrap";
import {
  JOB_STAGE_IDS,
  JOB_STAGE_STATUS,
} from "../JobListing/JobListingConstants";
import { tagJob } from "../../store/actions";

const PreSkillAssessment = forwardRef(
  ({ closeOffcanvas, jobId, candidateId }, ref) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUpdate = () => {
      try {
        const payload = {
          jobId: jobId,
          jobStageId: JOB_STAGE_IDS?.SKILLS_ASSESSMENT,
          status: JOB_STAGE_STATUS?.IN_PROGRESS,
          candidateId,
          jobType: "skills_assessment",
        };
        dispatch(tagJob({ payload, navigate }));
        closeOffcanvas();
      } catch (e) {}

      closeOffcanvas();
      window.open("https://app.hackerearth.com/recruiter/", "_blank");
    };

    const handleCancel = () => {
      closeOffcanvas();
    };

    useImperativeHandle(ref, () => ({
      handleCancel,
      handleUpdate,
    }));

    return (
      <React.Fragment>
        <div className="d-flex flex-column gap-4">
          <Row>
            <Col>
              <h5>Invite Candidate to Skill Assessment</h5>
              <p className="text-muted">
                Begin inviting your candidate to partake in your assessments.
              </p>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
);

export default PreSkillAssessment;
