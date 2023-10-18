import React, { useEffect, useReducer, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormFeedback,
  Row,
} from "reactstrap";
import { Formik, Form, Field } from "formik";
import { populateForm, schema } from "./constants";

function UpdateUser(props) {
  if (!props.user) {
    return null;
  }
  const [currentUserData, setCurrentUserData] = useState(props.user);
  const initialValues = populateForm(currentUserData);

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
  };

  useEffect(() => {
    setCurrentUserData(props.user);
  }, [props.user]);

  return (
    <Modal
      isOpen={props.show}
      toggle={props.cancel}
      centered
      scrollable
      size="xl"
    >
      <ModalHeader className="border-bottom">
        <div className="d-flex flex-column gap-1">
          <span className="modal-title">Edit User</span>
          <span className="fs-6 text-muted">Make changes to the user details.</span>
        </div>
      </ModalHeader>

      <ModalBody className="bg-light">
        <Formik
          validateOnBlur
          validateOnChange={false}
          validationSchema={schema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ touched, errors }) => (
            <Form>
              <Card>
                <CardBody>
                  <Row className="mb-3">
                    <Col lg={6}>
                      <Label>First Name</Label>
                      <Field
                        name="firstName"
                        type="text"
                        className={`form-control ${
                          touched.firstName && errors.firstName
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {touched.firstName && errors.firstName && (
                        <FormFeedback typeof="invalid">
                          {errors.firstName}
                        </FormFeedback>
                      )}
                    </Col>
                    <Col lg={6}>
                      <Label>Last Name</Label>
                      <Field
                        name="lastName"
                        type="text"
                        className={`form-control ${
                          touched.lastName && errors.lastName
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {touched.lastName && errors.lastName && (
                        <FormFeedback typeof="invalid">
                          {errors.lastName}
                        </FormFeedback>
                      )}
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col lg={6}>
                      <Label>Username</Label>
                      <Field
                        name="username"
                        type="text"
                        className={`form-control ${
                          touched.username && errors.username
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {touched.username && errors.username && (
                        <FormFeedback typeof="invalid">
                          {errors.username}
                        </FormFeedback>
                      )}
                    </Col>
                    <Col lg={6}>
                      <Label>Email Address</Label>
                      <Field
                        name="email"
                        type="text"
                        className={`form-control ${
                          touched.email && errors.email ? "is-invalid" : ""
                        }`}
                      />
                      {touched.email && errors.email && (
                        <FormFeedback typeof="invalid">
                          {errors.email}
                        </FormFeedback>
                      )}
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col lg={6}>
                      <Label>Contact Number</Label>
                      <Field
                        name="contactNo"
                        type="text"
                        className={`form-control ${
                          touched.contactNo && errors.contactNo
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {touched.contactNo && errors.contactNo && (
                        <FormFeedback typeof="invalid">
                          {errors.contactNo}
                        </FormFeedback>
                      )}
                    </Col>
                    <Col lg={6}>
                      <Label>Employee ID</Label>
                      <Field
                        name="employeeId"
                        type="text"
                        className={`form-control ${
                          touched.employeeId && errors.employeeId
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {touched.employeeId && errors.employeeId && (
                        <FormFeedback typeof="invalid">
                          {errors.employeeId}
                        </FormFeedback>
                      )}
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col lg={6}>
                      <Label>Password</Label>
                      <Field
                        name="password"
                        type="password"
                        className={`form-control ${
                          touched.password && errors.password
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {touched.password && errors.password && (
                        <FormFeedback typeof="invalid">
                          {errors.password}
                        </FormFeedback>
                      )}
                    </Col>
                    <Col lg={6}>
                      <Label>Confirm Password</Label>
                      <Field
                        name="confirmPassword"
                        type="password"
                        className={`form-control ${
                          touched.confirmPassword && errors.confirmPassword
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {touched.confirmPassword && errors.confirmPassword && (
                        <FormFeedback typeof="invalid">
                          {errors.confirmPassword}
                        </FormFeedback>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="d-flex flex-row gap-2 justify-content-end">
                      <Button
                        className="btn btn-dark"
                        type="button"
                        onClick={props.cancel}
                      >
                        Cancel
                      </Button>
                      <Button className="btn btn-dark" type="submit">
                        Save
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </Modal>
  );
}

export default UpdateUser;
