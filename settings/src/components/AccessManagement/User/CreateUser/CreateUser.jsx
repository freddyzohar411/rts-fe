import { Form, Formik, Field, getIn } from "formik";
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
import { fetchGroups } from "../../../../store/group/action";
import { fetchCountryCurrency } from "@workspace/common/src/store/actions";
import { encode } from "@workspace/common/src/helpers/string_helper";
import { Actions } from "@workspace/common";
import "react-dual-listbox/lib/react-dual-listbox.css";
import DualListBox from "react-dual-listbox";

function CreateUser() {
  document.title = "Create New User | RTS";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state?.UserReducer?.users);
  const allGroups = useSelector((state) => state?.GroupReducer?.groups);
  const allCountries = useSelector(
    (state) => state?.CountryCurrencyReducer?.countryCurrency
  );
  // Manager Dropdown
  const [sortBy, setSortBy] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  // Dual List Box
  const [formattedGroups, setFormattedGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  // Country Dropdown
  const [sortByCountry, setSortByCountry] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (allUsers && allUsers?.length > 0) {
      setSelectedOption([
        {
          options: allUsers?.map((user) => ({
            label: `${user.firstName} (${user.mobile})`,
            value: user.id.toString(),
          })),
        },
      ]);
    }
  }, [allUsers]);

  useEffect(() => {
    if (allCountries && allCountries?.length > 0) {
      setSelectedCountry([
        {
          options: allCountries?.map((country) => ({
            label: country.name,
            value: country.name,
          })),
        },
      ]);
    }
  }, [allCountries]);

  const handleSubmit = async (values) => {
    const newUser = {
      firstName: values.firstName,
      lastName: values.lastName,
      username: values.username,
      email: values.email,
      mobile: values.mobile,
      location: values.location,
      country: values.country,
      designation: values.designation,
      groups: selectedGroups,
      employeeId: values.employeeId,
      password: encode(values.password),
      confirmPassword: encode(values.confirmPassword),
      managerId: parseInt(values.managerId),
      status: values.status === "true" ? true : false,
    };
    dispatch(createUser({ newUser, navigate: navigate }));
  };

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchGroups());
    dispatch(fetchCountryCurrency());
  }, []);

  useEffect(() => {
    if (allGroups?.length) {
      const groupsData = allGroups?.map((group) => ({
        value: group?.id,
        label: group?.userGroupName,
      }));
      setFormattedGroups(groupsData);
    }
  }, [allGroups]);

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
                          <div className="mb-3">
                            <span className="h6 fw-bold">
                              General Information
                            </span>
                          </div>
                        </Row>
                        <Row>
                          <Col lg={4}>
                            <div className="mb-3">
                              <Label>First Name*</Label>
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
                              <Label>Last Name*</Label>
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
                              <Label>Username*</Label>
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
                              <Label>Employee ID*</Label>
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
                              <Label>Email Address*</Label>
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
                              <Label>Contact Number*</Label>
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
                              <Label>Designation</Label>
                              <Field
                                name="designation"
                                type="text"
                                placeholder="Enter Designation"
                                className={`form-control ${
                                  touched.designation && errors.designation
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                              {errors.designation && touched.designation && (
                                <FormFeedback typeof="invalid">
                                  {errors.designation}
                                </FormFeedback>
                              )}
                            </div>
                          </Col>
                          <Col lg={4}>
                            <div className="mb-3">
                              <FormSelection
                                label="Country"
                                type="text"
                                name="country"
                                options={selectedCountry}
                                value={sortByCountry}
                                onChange={(selectedCountry) => {
                                  setSortByCountry(selectedCountry);
                                  if (!selectedCountry) {
                                    handleChange("country")("");
                                  } else {
                                    handleChange("country")(
                                      selectedCountry?.value
                                    );
                                  }
                                }}
                                isClearable
                              />
                            </div>
                          </Col>
                          <Col lg={4}>
                            <div className="mb-3">
                              <Label>Location</Label>
                              <Field
                                name="location"
                                type="text"
                                placeholder="Enter Location"
                                className={`form-control ${
                                  touched.location && errors.location
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                            </div>
                            {errors.location && touched.location && (
                              <FormFeedback typeof="invalid">
                                {errors.location}
                              </FormFeedback>
                            )}
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col lg={4}>
                            <div className="mb-3">
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
                                label="Select Manager*"
                                options={selectedOption}
                                style={{ borderColor: "#8aaed6" }}
                                className="js-example-basic-single"
                                isClearable
                                error={errors.managerId}
                              />
                            </div>
                          </Col>
                          <Col lg={4}>
                            <div className="mb-3">
                              <Label>Status*</Label>
                              <Field
                                name="status"
                                as="select"
                                className={`form-select ${
                                  errors.status && touched.status
                                    ? "is-invalid"
                                    : ""
                                }`}
                              >
                                <option value="">Select Status</option>
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                              </Field>
                              {errors.status && touched.status && (
                                <FormFeedback typeof="invalid">
                                  {errors.status}
                                </FormFeedback>
                              )}
                            </div>
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <span className="h6 fw-bold">Set Password</span>
                        </Row>
                        <Row className="mb-3">
                          <Col lg={4}>
                            <div className="mb-3">
                              <Label>Password*</Label>
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
                              <Label>Confirm Password*</Label>
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
                        </Row>
                        <Row className="mb-3">
                          <div className="d-flex flex-column gap-1">
                            <span className="h6 fw-bold">Select Group</span>
                            <span className="text-muted">
                              Groups will determine the roles that this user
                              will be assigned to.
                            </span>
                          </div>
                        </Row>
                        <Row className="mb-2">
                          <div className="d-flex flex-row justify-content-around fw-semibold">
                            <span>All Groups</span>
                            <span>Assigned Groups</span>
                          </div>
                        </Row>
                        <Row className="mb-3">
                          <Col>
                            <DualListBox
                              options={formattedGroups}
                              selected={selectedGroups}
                              onChange={(e) => setSelectedGroups(e)}
                              canFilter={true}
                              icons={{
                                moveLeft: (
                                  <span
                                    className="mdi mdi-chevron-left"
                                    key="key"
                                  />
                                ),
                                moveAllLeft: [
                                  <span
                                    className="mdi mdi-chevron-double-left"
                                    key="key"
                                  />,
                                ],
                                moveRight: (
                                  <span
                                    className="mdi mdi-chevron-right"
                                    key="key"
                                  />
                                ),
                                moveAllRight: [
                                  <span
                                    className="mdi mdi-chevron-double-right"
                                    key="key"
                                  />,
                                ],
                                moveDown: (
                                  <span
                                    className="mdi mdi-chevron-down"
                                    key="key"
                                  />
                                ),
                                moveUp: (
                                  <span
                                    className="mdi mdi-chevron-up"
                                    key="key"
                                  />
                                ),
                                moveTop: (
                                  <span
                                    className="mdi mdi-chevron-double-up"
                                    key="key"
                                  />
                                ),
                                moveBottom: (
                                  <span
                                    className="mdi mdi-chevron-double-down"
                                    key="key"
                                  />
                                ),
                              }}
                            />
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
                                onClick={() => {
                                  resetForm();
                                  setSelectedGroups([]);
                                  setSortByCountry(null);
                                  setSortBy(null);
                                }}
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
