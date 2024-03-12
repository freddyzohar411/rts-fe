import React from "react";
import { Col, Progress, Row } from "reactstrap";

function FinaliseMassUsers({ importedUsers }) {
  return (
    <React.Fragment>
      <hr />
      <div className="mb-5">
        <Row>
          <Col>
            {importedUsers && importedUsers.length > 0 ? (
              <div className="d-flex flex-column align-items-center justify-content-center gap-3">
                <i className="ri-checkbox-circle-line display-4 text-success fw-medium"></i>
                <span className="fs-5 text-center">
                  Generated {importedUsers?.length} users.
                </span>
                <div className="d-flex flex-column gap-3 w-75">
                  <span className="text-muted text-center">
                    Mass Import User Account Progress
                  </span>
                  <Progress value={60} color="primary" striped animated />
                </div>
              </div>
            ) : (
              <div className="d-flex flex-column align-items-center justify-content-center">
                <i className="ri-error-warning-line display-4 text-danger"></i>
                <span className="fs-5 text-center">No users generated.</span>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default FinaliseMassUsers;
