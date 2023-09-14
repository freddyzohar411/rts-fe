import FormInput from "@workspace/common/src/Components/Common/FormInput";
import FormSelection from "@workspace/common/src/Components/Common/FormSelection";
import React, { useState, useEffect } from "react";
import { Field, useFormikContext } from "formik";
import {
  Container,
  Label,
  Row,
  Col,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  FormFeedback,
  Button,
  Card,
} from "reactstrap";

const BasicInfo = ({ handleNext }) => {
  const [sortBy, setsortBy] = useState(null);
  const { errors } = useFormikContext();

  const sortbyname = [
    {
      options: [
        { label: "Alabama", value: "AL" },
        { label: "Madrid", value: "MA" },
        { label: "Toronto", value: "TO" },
        { label: "Londan", value: "LO" },
        { label: "Wyoming", value: "WY" },
      ],
    },
  ];

  return (
    <div className="page-content">
      <Container>
        <div className="mb-2 mt-4">
          <Label className="h5">Basic Info</Label>
        </div>
        <Row className="mb-3">
          <Col lg={4}>
            <FormInput
              name="basicInfo.firstName"
              type="text"
              placeholder="None"
              className="form-control"
              id="accName"
              label="First name*"
              htmlFor="accName"
              invalid={!!errors.accName}
            />
          </Col>
          <Col lg={4}>
            <FormInput
              name="accName"
              type="text"
              className="form-control"
              id="accName"
              label="Last Name*"
              htmlFor="accName"
              invalid={!!errors.accName}
            />
          </Col>
          <Col lg={4}>
            <FormInput
              name="accName"
              type="text"
              className="form-control"
              id="accName"
              label="Gender*"
              htmlFor="accName"
              invalid={!!errors.accName}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col lg={4}>
            <FormInput
              name="accName"
              type="text"
              className="form-control"
              id="accName"
              label="Email*"
              htmlFor="accName"
              invalid={!!errors.accName}
            />
          </Col>
          <Col lg={4}>
            <FormInput
              name="accName"
              type="text"
              className="form-control"
              id="accName"
              label="Phone*"
              htmlFor="accName"
              invalid={!!errors.accName}
            />
          </Col>
          <Col lg={4}>
            <h6 className="fw-semibold mt-1">Candidatte Nationality</h6>
            <FormSelection
              value={sortBy}
              onChange={(sortBy) => {
                setsortBy(sortBy);
              }}
              options={sortbyname}
              className="js-example-basic-single mb-0"
              name="state"
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col lg={4}>
            <FormInput
              name="accName"
              type="text"
              className="form-control"
              id="accName"
              label="Current location*"
              htmlFor="accName"
              invalid={!!errors.accName}
            />
          </Col>
          <Col lg={4}>
            <FormInput
              name="accName"
              type="text"
              className="form-control"
              id="accName"
              label="VISA status*"
              htmlFor="accName"
              invalid={!!errors.accName}
            />
          </Col>
          <Col lg={4}>
            <FormInput
              name="accName"
              type="text"
              placeholder="None"
              className="form-control"
              id="accName"
              label="Language known*"
              htmlFor="accName"
              invalid={!!errors.accName}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={4}>
            <h6 className="fw-semibold mt-1">Candidatte Owner</h6>
            <FormSelection
              value={sortBy}
              onChange={(sortBy) => {
                setsortBy(sortBy);
              }}
              options={sortbyname}
              className="js-example-basic-single mb-0"
              name="state"
            />
          </Col>
        </Row>
      </Container>
      <Container>
        <div className="mb-2 mt-3">
          <Label className="h5">Professional Info</Label>
        </div>
        <Row className="mb-3">
          <Col lg={4}>
            <FormInput
              name="accName"
              type="text"
              placeholder="None"
              className="form-control"
              id="accName"
              label="Total Experience*"
              htmlFor="accName"
              invalid={!!errors.accName}
            />
          </Col>
          <Col lg={4}>
            <FormInput
              name="accName"
              type="text"
              className="form-control"
              id="accName"
              label="Relevent Experience*"
              htmlFor="accName"
              invalid={!!errors.accName}
            />
          </Col>
          <Col lg={4}>
            <FormInput
              name="accName"
              type="text"
              className="form-control"
              id="accName"
              label="Current Employer*"
              htmlFor="accName"
              invalid={!!errors.accName}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col lg={4}>
            <FormInput
              name="accName"
              type="text"
              className="form-control"
              id="accName"
              label="Current Position Tittle*"
              htmlFor="accName"
              invalid={!!errors.accName}
            />
          </Col>
          <Col lg={4}>
            <FormInput
              name="accName"
              type="text"
              className="form-control"
              id="accName"
              label="Candidate Current Salary*"
              htmlFor="accName"
              invalid={!!errors.accName}
            />
          </Col>
          <Col lg={4}>
            <FormInput
              name="accName"
              type="text"
              placeholder="None"
              className="form-control"
              id="accName"
              label="Candidate Expected Salary*"
              htmlFor="accName"
              invalid={!!errors.accName}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col lg={4}>
            <FormInput
              name="accName"
              type="text"
              className="form-control"
              id="accName"
              label="Reason for Change*"
              htmlFor="accName"
              invalid={!!errors.accName}
            />
          </Col>
          <Col lg={4}>
            <FormInput
              name="accName"
              type="text"
              className="form-control"
              id="accName"
              label="Notice period*"
              htmlFor="accName"
              invalid={!!errors.accName}
            />
          </Col>
          <Col lg={4}>
            <FormInput
              name="accName"
              type="text"
              placeholder="None"
              className="form-control"
              id="accName"
              label="Profile Summary*"
              htmlFor="accName"
              invalid={!!errors.accName}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col lg={4}>
            <h6 className="fw-semibold mt-1">Primary Skills</h6>
            <FormSelection
              value={sortBy}
              onChange={(sortBy) => {
                setsortBy(sortBy);
              }}
              options={sortbyname}
              className="js-example-basic-single mb-0"
              name="state"
            />
          </Col>
          <Col lg={4}>
            <FormInput
              name="accName"
              type="text"
              className="form-control"
              id="accName"
              label="Secondary Skills"
              htmlFor="accName"
              invalid={!!errors.accName}
            />
          </Col>
          <Col lg={4}>
            <FormInput
              name="accName"
              type="text"
              placeholder="None"
              className="form-control"
              id="accName"
              label="Additional Info"
              htmlFor="accName"
              invalid={!!errors.accName}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col lg={4}>
            <h6 className="fw-semibold mt-1">Candidatte Stutus*</h6>
            <FormSelection
              value={sortBy}
              onChange={(sortBy) => {
                setsortBy(sortBy);
              }}
              options={sortbyname}
              className="js-example-basic-single mb-0"
              name="state"
            />
          </Col>
          <Col lg={4}>
            <h6 className="fw-semibold mt-1">Source*</h6>
            <FormSelection
              value={sortBy}
              onChange={(sortBy) => {
                setsortBy(sortBy);
              }}
              options={sortbyname}
              className="js-example-basic-single mb-0"
              name="state"
            />
          </Col>
          <Col lg={4}>
            <FormInput
              name="accName"
              type="text"
              placeholder="None"
              className="form-control"
              id="accName"
              label="Referrer's Name (if applicable)"
              htmlFor="accName"
              invalid={!!errors.accName}
            />
          </Col>
          <div className="form-check mt-3 ">
            <Input
              className="form-check-input"
              type="checkbox"
              id="formCheck2"
              defaultChecked
            />
            <Label className="form-check-label " htmlFor="formCheck2">
              Email Out Put
            </Label>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default BasicInfo;
