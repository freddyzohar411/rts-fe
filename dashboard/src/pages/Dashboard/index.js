import React, { useState } from "react";
import { Container, Row, Col, Input } from "reactstrap";
import Widget from "./Widgets";
import { useUserAuth } from "@workspace/login";

const Dashboard = () => {
  document.title = "Dashboard | RTS";
  const [rightColumn, setRightColumn] = useState(true);
  const toggleRightColumn = () => {
    setRightColumn(!rightColumn);
  };

  const { Permission, checkAllPermission } = useUserAuth();

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>
              <div className="h-100">
                <Row>
                  <Widget />
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
