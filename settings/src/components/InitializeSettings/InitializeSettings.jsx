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
import axios from "axios";

import { fetchGroups, listGroups } from "../../store/group/action";

function InitializeSetting() {
  const location = useLocation();
  const navState = location.state;

  document.title = "Access Management Settings | RTS";

  const handleCandidateEmbeddings = () => {
    axios
      .get("http://localhost:8050/api/candidates/create-embeddings/all")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleJobEmbeddings = () => {
    axios
      .get("http://localhost:9200/api/job/create-embeddings/all")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
                    <Button onClick={handleCandidateEmbeddings}>
                      Update Candidate Embeddings
                    </Button>
                  </Row>
                  <Row className="mt-3">
                    <Button onClick={handleJobEmbeddings}>
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
