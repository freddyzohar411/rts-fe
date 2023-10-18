import React from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  FormFeedback,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { initialValues, schema } from "./constants";
import { Form, Field, Formik } from "formik";
import { userData } from "../dataSample";

function NewUser(props) {
  const handleSubmit = async (values, { resetForm }) => {
    userData.push(values);
    props.cancel();
    resetForm();
  };

  return (
    <Modal
      isOpen={props.show}
      toggle={props.cancel}
      size="xl"
      centered
      scrollable
    >
      <ModalHeader className="border-bottom">
        <div className="d-flex flex-column gap-1">
          <span className="modal-title">Create New User</span>
          <span className="text-muted fs-6">
            Begin the creation of a new user account in this form.
          </span>
        </div>
      </ModalHeader>
      <Formik
        validateOnBlur
        validateOnChange={false}
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={schema}
      >
        {({ errors, touched, resetForm }) => (
          <ModalBody className="d-flex flex-column p-4 bg-light">
            <Row>
              <Col>
                <Form>
                  <Card>
                    <CardBody>
                      <Row className="mb-3">
                        <Col lg={6}>
                          <div>
                            <Label>First Name</Label>
                            <Field
                              name="firstName"
                              type="text"
                              placeholder="Enter First Name"
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
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div>
                            <Label>Last Name</Label>
                            <Field
                              name="lastName"
                              type="text"
                              placeholder="Enter Last Name"
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
                          </div>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col lg={6}>
                          <div>
                            <Label>Username</Label>
                            <Field
                              name="username"
                              type="text"
                              placeholder="Enter Username"
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
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div>
                            <Label>Email Address</Label>
                            <Field
                              type="text"
                              placeholder="Enter Email Address"
                              name="email"
                              className={`form-control ${
                                touched.email && errors.email
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            {touched.email && errors.email && (
                              <FormFeedback typeof="invalid">
                                {errors.email}
                              </FormFeedback>
                            )}
                          </div>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col lg={6}>
                          <div>
                            <Label>Contact Number</Label>
                            <Field
                              type="number"
                              placeholder="Enter Contact Number"
                              name="contactNo"
                              className={`form-control ${
                                errors.contactNo && touched.contactNo
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            {touched.contactNo && errors.contactNo && (
                              <FormFeedback typeof="invalid">
                                {errors.contactNo}
                              </FormFeedback>
                            )}
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div>
                            <Label>Employee ID</Label>
                            <Field
                              type="string"
                              placeholder="Enter Employee ID"
                              name="employeeId"
                              className={`form-control ${
                                errors.employeeId && touched.employeeId
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            {touched.employeeId && errors.employeeId && (
                              <FormFeedback typeof="invalid">
                                {errors.employeeId}
                              </FormFeedback>
                            )}
                          </div>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col lg={6}>
                          <div>
                            <Label>Password</Label>
                            <Field
                              type="password"
                              placeholder="Enter Password"
                              name="password"
                              className={`form-control ${
                                errors.password && touched.password
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            {touched.password && errors.password && (
                              <FormFeedback typeof="invalid">
                                {errors.password}
                              </FormFeedback>
                            )}
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div>
                            <Label>Confirm Password</Label>
                            <Field
                              type="password"
                              placeholder="Confirm Password"
                              name="confirmPassword"
                              className={`form-control ${
                                touched.confirmPassword &&
                                errors.confirmPassword
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            {touched.confirmPassword &&
                              errors.confirmPassword && (
                                <FormFeedback typeof="invalid">
                                  {errors.confirmPassword}
                                </FormFeedback>
                              )}
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>

                  <Row className="mb-3">
                    <Col lg={12} className="d-flex flex-row justify-content-between">
                      <Button
                        className="btn btn-dark"
                        type="button"
                        onClick={resetForm}
                      >
                        Reset
                      </Button>

                      <div className="d-flex flex-row gap-3">
                        <Button
                          className="btn btn-dark"
                          type="button"
                          onClick={props.cancel}
                        >
                          Cancel
                        </Button>

                        <Button className="btn btn-dark" type="submit">
                          Save User
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </ModalBody>
        )}
      </Formik>
    </Modal>
  );
}

export default NewUser;
