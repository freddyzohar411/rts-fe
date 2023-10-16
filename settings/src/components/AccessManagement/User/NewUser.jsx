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
  Row,
} from "reactstrap";
import { initialValues, schema } from "../constants";
import { Form, Field, Formik } from "formik";

function NewUser(props) {
  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };

  const validatePassword = (values) => {
    const errors = {};

    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match!";
    }

    return errors;
  };
  return (
    <Modal
      isOpen={props.show}
      toggle={props.cancel}
      size="xl"
      centered
      scrollable
    >
      <ModalBody className="d-flex flex-column p-4">
        <Row>
          <Col lg={12}>
            <div className="mb-4">
              <h5 className="mb-2">Create New User</h5>
              <p className="text-muted">
                Begin the creation of a new user account in this form.
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Formik
              validateOnBlur
              validateOnChange={false}
              validate={validatePassword}
              onSubmit={handleSubmit}
              initialValues={initialValues}
              validationSchema={schema}
            >
              {({ errors, touched, resetForm }) => (
                <Form className="d-flex flex-column gap-4 mb-3 p-3">
                  <Row>
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
                  <Row>
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
                          name="emailAddress"
                          className={`form-control ${
                            touched.emailAddress && errors.emailAddress
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        {touched.emailAddress && errors.emailAddress && (
                          <FormFeedback typeof="invalid">
                            {errors.emailAddress}
                          </FormFeedback>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row>
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
                          type="number"
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
                  <Row>
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
                            errors.confirmPassword && touched.confirmPassword
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        {touched.confirmPassword && errors.confirmPassword && (
                          <FormFeedback typeof="invalid">
                            {errors.confirmPassword}
                          </FormFeedback>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      lg={12}
                      className="d-flex flex-row justify-content-end gap-3"
                    >
                      <Button
                        className="btn btn-dark"
                        type="button"
                        onClick={props.cancel}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="btn btn-dark"
                        type="button"
                        onClick={resetForm}
                      >
                        Reset Form
                      </Button>
                      <Button className="btn btn-dark" type="submit">
                        Save User
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
}

export default NewUser;
