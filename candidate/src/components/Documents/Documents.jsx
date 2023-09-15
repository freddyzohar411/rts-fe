import React, { useState } from "react";
import { Label, Row, Col, Input, Container } from "reactstrap";
import { useFormikContext, getIn } from "formik";
import { FormSelection, FormInput } from "@workspace/common";

const Documents = () => {
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
        <Label className="h5">New Documents</Label>
      </div>
      <Row className="mb-3">
        <Col lg={4}>
          <FormInput
            name="documents.tittle"
            type="text"
            className="form-control"
            id="lastName"
            label="Tittle"
            htmlFor="Last Name"
            error={getIn(errors, "documents.tittle")}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col lg={4}>
          <FormSelection
            value={sortBy}
            onChange={(sortBy) => {
              setsortBy(sortBy);
            }}
            label="Type"
            options={sortbyname}
            className="js-example-basic-single mb-0"
            name="state"
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col lg={4}>
          <FormInput
            name="documents.comments"
            type="text"
            className="form-control"
            id="Comments"
            label="Comments"
            htmlFor="Comments"
            error={getIn(errors, "documents.comments")}
          />
        </Col>
      </Row>
    </Container>
  );
};
export default Documents;
