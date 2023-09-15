import React, { useState } from "react";
import FormInput from "@workspace/common/src/Components/Common/FormInput";
import { Label, Row, Col, Input, Container } from "reactstrap";
import { Field, useFormikContext } from "formik";
import FormSelection from "@workspace/common/src/Components/Common/FormSelection";

const Certifications = () => {
  const { errors } = useFormikContext();
  return (
    <Container>
      <div className="mb-2">
        <Label className="h5">New Certification</Label>
      </div>
      <Row>
        <Row className="mb-2">
          <Col lg={4}>
            <FormInput
              name="certifications"
              type="text"
              className="form-control"
              placeholder="Required"
              id="lastName"
              label="Certification"
              htmlFor="Certification"
              invalid={!!errors.accName}
            />
          </Col>
          <Col lg={4}>
            <FormInput
              name="yearCompleted"
              type="text"
              className="form-control"
              placeholder="Required"
              id="yearCompleted"
              label="Year completed"
              htmlFor="Year completed"
              invalid={!!errors.accName}
            />
          </Col>
        </Row>
        <Row className="mb-2">
          <Col lg={4}>
            <FormInput
              name="comments"
              type="text"
              className="form-control"
              id="comments"
              label="Comments"
              htmlFor="Comments"
              invalid={!!errors.accName}
            />
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default Certifications;
