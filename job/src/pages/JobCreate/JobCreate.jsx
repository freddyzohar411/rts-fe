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
    <div className="page-content">
      <Container >
        <Row>
          <Col>
            <Card>
              <CardBody>
                <CardTitle tag="h5">Create a new job</CardTitle>
                <CardText>Fill out the form below to create a new job</CardText>
                <JobCreation />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default JobCreate;
