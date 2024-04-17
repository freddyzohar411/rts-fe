import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import { Link, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {
  handleCandidateEmbeddings,
  handleJobEmbeddings,
} from "../../helpers/backend_helper";

import { fetchGroups, listGroups } from "../../store/group/action";

function InitializeSetting() {
  const location = useLocation();
  const navState = location.state;

  document.title = "Initialize Setting | RTS";

  const handleCandidateEmbeddingsData = () => {
      // Hanld the candidate embeddings
    handleCandidateEmbeddings()
      .then((response) => {})
      .catch((error) => {});
  };

  const handleJobEmbeddingsData = () => {
    handleJobEmbeddings()
      .then((response) => {})
      .catch((error) => {});
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <div className="mb-3">
                <h5>Initialize Settings</h5>
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody className="p-5">
                  <Row>
                    <Button onClick={handleCandidateEmbeddingsData}>
                      Update Candidate Embeddings
                    </Button>
                  </Row>
                  <Row className="mt-3">
                    <Button onClick={handleJobEmbeddingsData}>
                      Update Job Embeddings
                    </Button>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default InitializeSetting;
