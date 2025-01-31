import React from "react";
import { Container, Row, Col } from "reactstrap";
import Widget from "./Widgets";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchActiveJobsCount,
  fetchAllJobsCount,
  fetchAssignedJobsCount,
  fetchClosedJobsCount,
  fetchFODCount,
  fetchInactiveJobsCount,
  fetchNewJobsCount,
} from "../../store/jobsCount/action";

const Dashboard = () => {
  const dispatch = useDispatch();
  document.title = "Dashboard | RTS";

  useEffect(() => {
    dispatch(fetchNewJobsCount());
    dispatch(fetchActiveJobsCount());
    dispatch(fetchInactiveJobsCount());
    dispatch(fetchClosedJobsCount());
    dispatch(fetchAssignedJobsCount());
    dispatch(fetchFODCount());
    dispatch(fetchAllJobsCount());
  }, []);

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
