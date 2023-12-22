import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  CardImgOverlay,
} from "reactstrap";
import { JobCreation } from "../../components";

const JobCreate = () => {
  return (
    <Container fluid className="page-content">
      <Row>
        <Col>
          <Card>
            <CardBody>
              <Container fluid className="pt-3">
                <JobCreation />
              </Container>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default JobCreate;
