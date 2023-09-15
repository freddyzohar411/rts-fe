import FormInput from "@workspace/common/src/Components/Common/FormInput";
import FormSelection from "@workspace/common/src/Components/Common/FormSelection";
import React, { useState } from "react";
import { useFormikContext } from "formik";
import { Label, Row, Col, Input, Container } from "reactstrap";

const EducationDetails = ({ handleNext }) => {
  const [sortBy, setsortBy] = useState(null);
  const { errors } = useFormikContext();

  const sortbyname = [
    {
      options: [
        { label: "Alabama", value: "AL" },
        { label: "Madrid", value: "MA" },
        { label: "Toronto", value: "TO" },
        { label: "London", value: "LO" },
        { label: "Wyoming", value: "WY" },
      ],
    },
  ];

  return (
    <Container>
      <div className="mb-2">
        <Label className="h5">New Education Details</Label>
      </div>
      <Row>
        <Col lg={5}>
          <Row>
            <Col lg={2}>
              <div className="form-check form-radio-primary mb-3">
                <Input
                  className="form-check-input"
                  type="radio"
                  name="formradiocolor1"
                  id="formradioRight5"
                  defaultChecked
                />
                <Label className="form-check-label" htmlFor="formradioRight5">
                  New
                </Label>
              </div>
            </Col>
            <Col lg={9}>
              <div className="form-check form-radio-primary mb-3">
                <Input
                  className="form-check-input"
                  type="radio"
                  name="formradiocolor1"
                  id="formradioRight5"
                  defaultChecked
                />
                <Label className="form-check-label" htmlFor="formradioRight5">
                  Add from existing vendor contact Record
                </Label>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col lg={4}>
          <FormSelection
            value={sortBy}
            onChange={(sortBy) => {
              setsortBy(sortBy);
            }}
            label="Required"
            options={sortbyname}
            className="js-example-basic-single mb-0"
            name="state"
          />
        </Col>
        <Col lg={4}>
          <FormInput
            name="firstName"
            type="text"
            className="form-control"
            id="firstName"
            placeholder="First Name"
            label="First Name"
            htmlFor="Last Name"
            invalid={!!errors.accName}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col lg={4}>
          <FormInput
            name="basicInfo.emails"
            type="text"
            className="form-control"
            id="accName"
            placeholder="Last Name"
            label="Last Name"
            htmlFor="Email"
            invalid={!!errors.accName}
          />
        </Col>
        <Col lg={4}>
          <FormInput
            name="employerName"
            type="text"
            className="form-control"
            id="employerName"
            placeholder="Employer Name"
            label="Employer Name"
            htmlFor="Employer Name"
            invalid={!!errors.accName}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col lg={4}>
          <Row>
            <Col lg={8}>
              <FormInput
                name="officeNumber"
                type="text"
                className="form-control"
                id="accName"
                placeholder="Office Number"
                label="Office Number"
                htmlFor="accNCurrent location"
                invalid={!!errors.accName}
              />
            </Col>
            <Col lg={4}>
              <FormInput
                name="emailid"
                type="text"
                className="form-control"
                id="emailid"
                placeholder="Extension"
                htmlFor="Extension"
                label="Extension"
                invalid={!!errors.accName}
              />
            </Col>
          </Row>
        </Col>
        <Col lg={4}>
          <FormInput
            name="emailid"
            type="text"
            className="form-control"
            id="emailid"
            placeholder="Email Id"
            htmlFor="Email Id"
            label="Email Id"
            invalid={!!errors.accName}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col lg={4}>
          <FormInput
            name="mobileNumber"
            type="text"
            placeholder="Mobile Number"
            className="form-control"
            id="firstName"
            label="Mobile Number"
            htmlFor="Mobile Number"
            invalid={!!errors.accName}
          />
        </Col>
        <Col lg={4}>
          <FormSelection
            value={sortBy}
            onChange={(sortBy) => {
              setsortBy(sortBy);
            }}
            label="Select Status"
            options={sortbyname}
            className="js-example-basic-single mb-0"
            name="state"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default EducationDetails;
