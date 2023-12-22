import React, { useState } from "react";
import { Label, Row, Col, Input, Container } from "reactstrap";
import { useFormikContext } from "formik";
import { FormSelection } from "@workspace/common";

const Languages = () => {
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
        <Label className="h5">New Language</Label>
      </div>
      <Row className="mb-2">
        <Col lg={4}>
          <FormSelection
            value={sortBy}
            onChange={(sortBy) => {
              setsortBy(sortBy);
            }}
            label="Language"
            options={sortbyname}
            className="js-example-basic-single mb-0"
            name="state"
          />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col lg={2}>
          <p className="mt-2">Proficiency</p>
        </Col>
        <Col lg={4}>
          <Row className="mt-2">
            <Col lg={4}>
              <div className="form-check  ">
                <Input
                  className="form-check-input"
                  type="checkbox"
                  id="formCheck2"
                  defaultChecked
                />
                <Label className="form-check-label " htmlFor="formCheck2">
                  Read
                </Label>
              </div>
            </Col>
            <Col lg={4}>
              <div className="form-check  ">
                <Input
                  className="form-check-input"
                  type="checkbox"
                  id="formCheck2"
                  defaultChecked
                />
                <Label className="form-check-label " htmlFor="formCheck2">
                  Speak
                </Label>
              </div>
            </Col>
            <Col lg={4}>
              <div className="form-check ">
                <Input
                  className="form-check-input"
                  type="checkbox"
                  id="formCheck2"
                  defaultChecked
                />
                <Label className="form-check-label " htmlFor="formCheck2">
                  Write
                </Label>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Languages;
