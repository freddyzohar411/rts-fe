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
import { initialValues, updateSchema, populateForm } from "../constants";
import { fetchCountryCurrency } from "@workspace/common/src/store/actions";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUser,
  updateUser,
  fetchUsers,
} from "../../../../store/users/action";
import { encode } from "@workspace/common/src/helpers/string_helper";
import DualListBox from "react-dual-listbox";
import { fetchGroups } from "../../../../store/group/action";

function UpdateUser() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInitialValues, setUserInitialValues] = useState(
    populateForm(initialValues)
  );
  const [sortBy, setSortBy] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  // Country Dropdown
  const [sortByCountry, setSortByCountry] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [formattedGroups, setFormattedGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const allUsers = useSelector((state) => state?.UserReducer?.users);
  const user = useSelector((state) => state.UserReducer.user);
  const allGroups = useSelector((state) => state?.GroupReducer?.groups);
  const allCountries = useSelector(
    (state) => state?.CountryCurrencyReducer?.countryCurrency
  );

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

  useEffect(() => {
    if (allUsers && allUsers?.length > 0) {
      setSelectedOption([
        {
          options: allUsers?.map((user) => ({
            label: `${user?.firstName} (${user?.mobile})`,
            value: user?.id?.toString(),
          })),
        },
      ]);
    }
  }, [allUsers]);

  useEffect(() => {
    if (user && allUsers && allUsers?.length > 0) {
      const manager = allUsers?.find(
        (singleUser) => singleUser.id === parseInt(user.managerId)
      );
      if (manager) {
        setSortBy({
          label: `${manager.firstName} (${manager.mobile})`,
          value: manager?.id?.toString(),
        });
      }
      if (user?.country) {
        setSortByCountry({
          label: user?.country,
          value: user?.country,
        });
      }
    }
  }, [user, allUsers]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUser(userId));
    }
  }, []);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchCountryCurrency());
    dispatch(fetchGroups());
  }, []);

  // Set User Initial Values
  useEffect(() => {
    if (userId && user) {
      document.title = `${user?.firstName} ${user?.lastName} Update | RTS`;

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
        designation: user?.designation,
        location: user?.location,
        country: user?.country,
        status: user?.status ? "true" : "false",
        groups: selectedGroups,
      };
      setUserInitialValues(populateForm(fetchInitialValues));

      const existingGroups = user?.userGroup?.map((user) => user?.id);
      setSelectedGroups(existingGroups);
    }
  }, [user]);

  useEffect(() => {
    if (allGroups?.length) {
      const groupsData = allGroups?.map((group) => ({
        value: group?.id,
        label: group?.userGroupName,
      }));
      setFormattedGroups(groupsData);
    }
  }, [allGroups]);

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
      designation: values.designation,
      location: values.location,
      country: values.country,
      status: values.status === "true" ? true : false,
      groups: selectedGroups,
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
                  validationSchema={updateSchema}
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
                        <Row>
                          <Col lg={4}>
                            <div className="d-flex flex-column mb-3 mb-3">
                              <Label>First Name*</Label>
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
                              <Label>Last Name*</Label>
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
                              <Label>Username*</Label>
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
                        <Row>
                          <Col lg={4}>
                            <div className="d-flex flex-column mb-3">
                              <Label>Email Address*</Label>
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
                              <Label>Contact Number*</Label>
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
                              <Label>Employee ID*</Label>
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
                              <Label>Country</Label>
                              <FormSelection
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
                              <Label>Select Manager*</Label>
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
                                error={errors.managerId}
                              />
                            </div>
                          </Col>
                          <Col lg={4}>
                            <div className="mb-3">
                              <Label>Status</Label>
                              <Field
                                as="select"
                                name="status"
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

                        <Row className="mb-3">
                          <Col>
                            <span className="h6 fw-bold">Password</span>
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col lg={4}>
                            <div className="d-flex flex-column mb-3 ">
                              <Label>Set New Password*</Label>
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
                              <Label>Confirm Password*</Label>
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
