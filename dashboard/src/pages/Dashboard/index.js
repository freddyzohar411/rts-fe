import React, { useState } from "react";
import { Container, Row, Col, Input } from "reactstrap";
import Widget from "./Widgets";
import { useUserAuth } from "@workspace/login";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchJobCounts } from "../../store/dashboardEcommerce/action";

const Dashboard = () => {
  const dispatch = useDispatch();

  document.title = "Dashboard | RTS";
  const [rightColumn, setRightColumn] = useState(true);

  useEffect(() => {
    dispatch(fetchJobCounts());
  }, []);

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
