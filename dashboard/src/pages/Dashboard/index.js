import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Widget from "./Widgets";
import { useUserAuth } from "@workspace/login";
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
  fetchTotalAssignedJobsCount,
  fetchTotalFODCount,
} from "../../store/jobsCount/action";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { Permission, checkAllPermission } = useUserAuth();
  const newJobs = useSelector((state) => state.JobsCount.newJobs);

  document.title = "Dashboard | RTS";

  useEffect(() => {
    if (checkAllPermission([Permission.JOB_READ]) && !newJobs) {
      dispatch(fetchNewJobsCount());
      dispatch(fetchActiveJobsCount());
      dispatch(fetchInactiveJobsCount());
      dispatch(fetchClosedJobsCount());
      dispatch(fetchAssignedJobsCount());
      dispatch(fetchFODCount());
      dispatch(fetchAllJobsCount());
      dispatch(fetchTotalAssignedJobsCount());
      dispatch(fetchTotalFODCount());
    }
  }, [checkAllPermission([Permission.JOB_READ])]);

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
