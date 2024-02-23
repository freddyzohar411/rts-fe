import { Field, Form, Formik } from "formik";
import { FormSelection } from "@workspace/common";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  FormFeedback,
  Label,
  Row,
} from "reactstrap";
import { initialValues, schema, populateForm } from "../constants";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUser,
  updateUser,
  fetchUsers,
} from "../../../../store/users/action";
import { encode } from "@workspace/common/src/helpers/string_helper";

function UpdateUser() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInitialValues, setUserInitialValues] = useState(
    populateForm(initialValues)
  );
  const [sortBy, setSortBy] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const allUsers = useSelector((state) => state?.UserReducer?.users);
  const user = useSelector((state) => state.UserReducer.user);

  useEffect(() => {
    if (!allUsers) return;
    setSelectedOption([
      {
        options: allUsers.map((user) => ({
          label: `${user.firstName} (${user.mobile})`,
          value: user?.id?.toString(),
        })),
      },
    ]);
  }, [allUsers]);

  useEffect(() => {
    if (!user) return;
    const manager = allUsers?.find(
      (singleUser) => singleUser.id === parseInt(user.managerId)
    );
    if (!manager) return;
    setSortBy({
      label: `${manager.firstName} (${manager.mobile})`,
      value: manager?.id?.toString(),
    });
  }, [user, allUsers]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUser(userId));
    }
  }, []);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  // Set User Initial Values
  useEffect(() => {
    if (userId && user) {
      const fetchInitialValues = {
        firstName: user?.firstName,
        lastName: user?.lastName,
        username: user?.username,
        employeeId: user?.employeeId,
        mobile: user?.mobile,
        email: user?.email,
        keycloackId: user?.keycloackId,
        id: user?.id,
        managerId: user?.managerId,
      };
      setUserInitialValues(populateForm(fetchInitialValues));
    }
  }, [user]);

  // Document Title
  useEffect(() => {
    if (userId) {
      document.title = `${user?.firstName} ${user?.lastName} Update | RTS`;
    }
  }, []);

  // Handle Submit Button
  const handleSubmit = async (values) => {
    const updatedUser = {
      firstName: values.firstName,
      lastName: values.lastName,
      username: values.username,
      email: values.email,
      mobile: values.mobile,
      employeeId: values.employeeId,
      id: values.id,
      keycloackId: values.keycloackId,
      password: encode(values.password),
      managerId: parseInt(values.managerId) ?? null,
    };
    dispatch(updateUser({ updatedUser, navigate: navigate }));
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="/settings/access">Settings</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>Update User</BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <div className="d-flex flex-column mb-3 gap-1">
                    <span className="h5 fw-bold">Update User</span>
                    <span>Make changes to the user details.</span>
                  </div>
                </CardHeader>
                <Formik
                  validateOnBlur
                  validateOnChange={false}
                  validationSchema={schema}
                  initialValues={userInitialValues}
                  enableReinitialize={true}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched, resetForm, values, handleChange }) => (
                    <Form>
                      <CardBody>
                        <Row className="mb-3">
                          <Col>
                            <span className="h6 fw-bold">
                              General Information
                            </span>
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col lg={4}>
                            <div className="d-flex flex-column mb-3 mb-3">
                              <Label className="fw-semibold">First Name</Label>
                              <Field
                                name="firstName"
                                type="text"
                                placeholder="Enter First Name"
                                className={`form-control ${
                                  errors.firstName && touched.firstName
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
                            <div className="d-flex flex-column mb-3">
                              <Label className="fw-semibold">Last Name</Label>
                              <Field
                                name="lastName"
                                type="text"
                                placeholder="Enter Last Name"
                                className={`form-control ${
                                  errors.lastName && touched.lastName
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
                            <div className="d-flex flex-column mb-3">
                              <Label className="fw-semibold">Username</Label>
                              <Field
                                name="username"
                                type="text"
                                placeholder="Enter Username"
                                className={`form-control ${
                                  errors.username && touched.username
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
                        <Row className="mb-3">
                          <Col lg={4}>
                            <div className="d-flex flex-column mb-3">
                              <Label className="fw-semibold">
                                Email Address
                              </Label>
                              <Field
                                name="email"
                                type="text"
                                placeholder="Enter Email Address"
                                className={`form-control ${
                                  errors.email && touched.email
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
                            <div className="d-flex flex-column mb-3">
                              <Label className="fw-semibold">
                                Contact Number
                              </Label>
                              <Field
                                name="mobile"
                                type="text"
                                placeholder="Enter Contact Number"
                                className={`form-control ${
                                  errors.mobile && touched.mobile
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
                          <Col lg={4}>
                            <div className="d-flex flex-column mb-3">
                              <Label className="fw-semibold">Employee ID</Label>
                              <Field
                                name="employeeId"
                                type="text"
                                placeholder="Enter Employee ID"
                                className={`form-control ${
                                  errors.employeeId && touched.employeeId
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
                              <Label className="fw-semibold">
                                Select Manager
                              </Label>
                              <FormSelection
                                name="managerId"
                                value={sortBy}
                                onChange={(selectedOption) => {
                                  setSortBy(selectedOption);
                                  if (!selectedOption) {
                                    handleChange("managerId")("");
                                  } else {
                                    handleChange("managerId")(
                                      selectedOption?.value
                                    );
                                  }
                                }}
                                options={selectedOption}
                                style={{ borderColor: "#8aaed6" }}
                                className="js-example-basic-single mb-0"
                                isClearable
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row className="mb-3">
                          <Col>
                            <span className="h6 fw-bold">Password</span>
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col lg={4}>
                            <div className="d-flex flex-column mb-3 ">
                              <Label className="fw-semibold">
                                Set New Password
                              </Label>
                              <Field
                                name="password"
                                type="password"
                                placeholder="Enter New Password"
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
                            <div className="d-flex flex-column mb-3 ">
                              <Label className="fw-semibold">
                                Confirm Password
                              </Label>
                              <Field
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm Password"
                                className={`form-control ${
                                  touched.confirmPassword &&
                                  errors.confirmPassword
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                              {errors.confirmPassword &&
                                touched.confirmPassword && (
                                  <FormFeedback typeof="invalid">
                                    {errors.confirmPassword}
                                  </FormFeedback>
                                )}
                            </div>
                          </Col>
                          <Col lg={4} hidden>
                            <div className="d-flex flex-column mb-3 ">
                              <Label className="fw-semibold">ID</Label>
                              <Field
                                name="id"
                                type="number"
                                className={`form-control ${
                                  touched.id && errors.id ? "is-invalid" : ""
                                }`}
                              />
                              {errors.id && touched.id && (
                                <FormFeedback typeof="invalid">
                                  {errors.id}
                                </FormFeedback>
                              )}
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                      <CardFooter>
                        <div className="d-flex flex-row justify-content-end gap-3">
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
                            Save
                          </Button>
                        </div>
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

export default UpdateUser;
