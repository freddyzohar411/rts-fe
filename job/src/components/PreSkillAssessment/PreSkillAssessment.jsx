import React from "react";
import { Row, Col, Container, Button, Card, CardBody } from "reactstrap";
import { useNavigate } from "react-router-dom";

function PreSkillAssessment({ closeOffcanvas }) {
  const handleUpdate = () => {
    closeOffcanvas();
    window.open("https://app.hackerearth.com/recruiter/", "_blank");
  };

  const handleCancel = () => {
    closeOffcanvas();
  };

  return (
    <React.Fragment>
      <div>
        <Container>
              <div className="d-flex flex-column gap-4">
                <Row>
                  <Col>
                    <h5>Invite Candidate to Skill Assessment</h5>
                    <p className="text-muted">Begin inviting your candidate to partake in your assessments.</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="d-flex flex-row justify-content-start gap-2">
                      <Button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                          handleCancel();
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        className="btn btn-custom-primary"
                        onClick={() => {
                          handleUpdate();
                        }}
                      >
                        Invite Candidate
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default PreSkillAssessment;
