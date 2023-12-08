import { Form, Formik, Field } from "formik";
import { FormSelection } from "@workspace/common";
import React, { useState, useEffect } from "react";
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
import { initialValues, schema } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { createUser, fetchUsers } from "../../../../store/users/action";

function CreateUser() {
  document.title = "Create New User | RTS";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state?.UserReducer?.users) || [];
  const [sortBy, setSortBy] = useState(null);
  console.log("sortby", sortBy);
  const sortByName = [
    {
      options: allUsers.map((user) => ({
        label: `${user.firstName} (${user.mobile})`,
        value: user.id.toString(),
      })),
    },
  ];
  console.log(sortByName);
  console.log(allUsers);

  const handleSubmit = async (values) => {

    const newUser = {
      firstName: values.firstName,
      lastName: values.lastName,
      username: values.username,
      email: values.email,
      mobile: values.mobile,
      employeeId: values.employeeId,
      password: values.password,
      confirmPassword: values.confirmPassword,
      managerId: parseInt(values.managerId),
    };
    console.log("NewUservalues", newUser);
    return;
    dispatch(createUser({ newUser, navigate: navigate }));
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
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
                  <div className="d-flex flex-column">
                    <span className="fs-5 fw-bold">Create New User</span>
                    <span>Begin the creation of a new user in this form.</span>
                  </div>
                </CardHeader>
                <Formik
                  initialValues={initialValues}
                  validateOnChange={false}
                  validateOnBlur
                  validationSchema={schema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched, resetForm, values, handleChange }) => (
                    <Form>
                      <CardBody>
                        <Row>
                          <Col lg={4}>
                            <div className="mb-3">
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
                            </div>
                          </Col>
                          <Col lg={4}>
                            <div className="mb-3">
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
                            </div>
                          </Col>
                          <Col lg={4}>
                            <div className="mb-3">
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
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={4}>
                            <div className="mb-3">
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
                            </div>
                          </Col>
                          <Col lg={4}>
                            <div className="mb-3">
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
                            </div>
                          </Col>
                          <Col lg={4}>
                            <div className="mb-3">
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
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={4}>
                            <div className="mb-3">
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
                            </div>
                          </Col>
                          <Col lg={4}>
                            <div className="mb-3">
                              <Label>Confirm Password</Label>
                              <Field
                                type="password"
                                name="confirmPassword"
                                className={`form-control ${
                                  errors.confirmPassword &&
                                  touched.confirmPassword
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder="Confirm Password"
                              />
                              {errors.confirmPassword &&
                                touched.confirmPassword && (
                                  <FormFeedback typeof="invalid">
                                    {errors.confirmPassword}
                                  </FormFeedback>
                                )}
                            </div>
                          </Col>
                          <Col lg={4}>
                            <div className="mb-3">
                              <FormSelection
                                name="managerId"
                                value={sortBy}
                                onChange={(selectedOption) => {
                                  console.log("SS options",selectedOption);
                                  setSortBy(selectedOption);
                                  handleChange("managerId")(selectedOption.value);
                                }}
                                label="Select Manager"
                                options={sortByName}
                                style={{ borderColor: "#8aaed6" }}
                                className="js-example-basic-single mb-0"
                              />
                            </div>
                          </Col>
                        </Row>
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
