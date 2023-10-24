import { BreadCrumb } from "@workspace/common";
import { Form, Formik, Field } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  Card,
  FormFeedback,
} from "reactstrap";
import { userData } from "../../dataSample";
import { initialValues, schema } from "./constants";

import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../../../store/users/action";
import { Axios } from "@workspace/common";
const { APIClient } = Axios;
const api = new APIClient();

function CreateUser() {
  document.title = "Create New User | RTS";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const newUser = {
      firstName: values.firstName,
      lastName: values.lastName,
      username: values.username,
      email: values.email,
      contact: values.contact,
      employeeId: values.employeeId,
      password: values.password,
    };
    dispatch(createUser({ newUser, navigate: navigate }));
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container>
          <Row>
            <Col>
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="/settings/access/">Settings</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>Create User</BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardHeader className="bg-header">
                  <div className="d-flex flex-column gap-1">
                    <span className="h6 fw-bold">Create New User</span>
                    <span className="text-muted">
                      Begin the creation of a new user in this form.
                    </span>
                  </div>
                </CardHeader>
                <Formik
                  initialValues={initialValues}
                  validateOnChange={false}
                  validateOnBlur
                  validationSchema={schema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched, resetForm }) => (
                    <Form>
                      <CardBody className="bg-light">
                        <Card>
                          <CardBody>
                            <Row className="mb-4">
                              <Col lg={4}>
                                <Label>First Name</Label>
                                <Field
                                  type="text"
                                  name="firstName"
                                  placeholder="Enter First Name"
                                  className={`form-control ${
                                    touched.firstName && errors.firstName
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                                {errors.firstName && touched.firstName && (
                                  <FormFeedback typeof="invalid">
                                    {errors.firstName}
                                  </FormFeedback>
                                )}
                              </Col>
                              <Col lg={4}>
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
                                {errors.lastName && touched.lastName && (
                                  <FormFeedback typeof="invalid">
                                    {errors.lastName}
                                  </FormFeedback>
                                )}
                              </Col>
                              <Col lg={4}>
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
                                {errors.username && touched.username && (
                                  <FormFeedback typeof="invalid">
                                    {errors.username}
                                  </FormFeedback>
                                )}
                              </Col>
                            </Row>
                            <Row className="mb-4">
                              <Col lg={4}>
                                <Label>Employee ID</Label>
                                <Field
                                  name="employeeId"
                                  type="text"
                                  placeholder="Enter Employee ID"
                                  className={`form-control ${
                                    touched.employeeId && errors.employeeId
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                                {errors.employeeId && touched.employeeId && (
                                  <FormFeedback typeof="invalid">
                                    {errors.employeeId}
                                  </FormFeedback>
                                )}
                              </Col>
                              <Col lg={4}>
                                <Label>Email Address</Label>
                                <Field
                                  name="email"
                                  type="email"
                                  placeholder="Enter Email Address"
                                  className={`form-control ${
                                    touched.email && errors.email
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                                {errors.email && touched.email && (
                                  <FormFeedback typeof="invalid">
                                    {errors.email}
                                  </FormFeedback>
                                )}
                              </Col>
                              <Col lg={4}>
                                <Label>Contact Number</Label>
                                <Field
                                  name="mobile"
                                  type="text"
                                  placeholder="Enter Contact Number"
                                  className={`form-control ${
                                    touched.mobile && errors.mobile
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                                {errors.mobile && touched.mobile && (
                                  <FormFeedback typeof="invalid">
                                    {errors.mobile}
                                  </FormFeedback>
                                )}
                              </Col>
                            </Row>
                            <Row className="mb-4">
                              <Col lg={4}>
                                <Label>Password</Label>
                                <Field
                                  name="password"
                                  type="password"
                                  placeholder="Enter Password"
                                  className={`form-control ${
                                    touched.password && errors.password
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                                {errors.password && touched.password && (
                                  <FormFeedback typeof="invalid">
                                    {errors.password}
                                  </FormFeedback>
                                )}
                              </Col>
                              <Col lg={4}>
                                <Label>Confirm Password</Label>
                                <Input
                                  type="password"
                                  name="confirmPassword"
                                  className="form-control"
                                  placeholder="Confirm Password"
                                />
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </CardBody>
                      <CardFooter>
                        <Row>
                          <Col>
                            <div className="d-flex flex-row justify-content-between">
                              <Button
                                className="btn btn-custom-primary"
                                type="button"
                                onClick={() => resetForm()}
                              >
                                Reset
                              </Button>
                              <div className="d-flex flex-row gap-2">
                                <Link to="/settings/access">
                                  <Button
                                    className="btn btn-custom-primary"
                                    type="button"
                                  >
                                    Cancel
                                  </Button>
                                </Link>

                                <Button
                                  className="btn btn-custom-primary"
                                  type="submit"
                                >
                                  Submit
                                </Button>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </CardFooter>
                    </Form>
                  )}
                </Formik>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default CreateUser;
