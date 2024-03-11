import React from "react";
import { Button, Col, Input, Label, Progress, Row, Table } from "reactstrap";

function FinaliseMassUsers({ importedUsers }) {
  console.log(importedUsers, "importedUsers");

  return (
    <React.Fragment>
      <hr />
      <div>
        <Row>
          <Col>
            <span className="h6  fw-bold">Generated Mass Import Users</span>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            {importedUsers && importedUsers.length > 0 ? (
              <span>Generated {importedUsers?.length} users.</span>
            ) : (
              <span>No users generated.</span>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <Button type="button" className="btn btn-custom-primary">
              Mass Create User Accounts
            </Button>
          </Col>
        </Row>
        {/* <Row>
          <Col>
            <Progress />
          </Col>
        </Row> */}
      </div>
    </React.Fragment>
  );
}

export default FinaliseMassUsers;
