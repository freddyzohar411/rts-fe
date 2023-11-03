import { Field, Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import { initialValues, schema } from "./constants";
import DualListBox from "react-dual-listbox";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import { createGroup } from "../../../../store/group/action";

function CreateGroup() {
  document.title = "Create User Group | RTS";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const users = useSelector((state) => state.UserReducer.users);
  const roles = useSelector((state) => state.RoleReducer.users);
  const loading = useSelector((state) => state.GroupReducer.loading);
  const success = useSelector((state) => state.GroupReducer.success);
  const message = useSelector((state) => state.GroupReducer.message);

  const [formattedUsers, setFormattedUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [formattedRoles, setFormattedRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab != tab) {
      setActiveTab(tab);
    }
  };

  useEffect(() => {
    if (users?.length) {
      const usersData = users?.map((user) => ({
        value: user?.id,
        label: user?.firstName + " " + user?.lastName,
      }));
      setFormattedUsers(usersData);
    } else {
      navigate("/settings/access");
    }
  }, [users]);

  useEffect(() => {
    if (roles?.length) {
      const rolesData = roles?.map((role) => ({
        value: role?.id,
        label: role?.roleName,
      }));
      setFormattedRoles(rolesData);
    }
  }, [roles]);

  const handleSubmit = async (values, { resetForm }) => {
    const input = {
      userGroupName: values.groupName,
      description: values.groupDescription,
      users: selectedUsers,
      roles: selectedRoles,
    };

    dispatch(createGroup(input));
    resetForm();
    navigate("/settings/access");
  };

  const handleResetForm = (resetForm) => {
    resetForm();
    setSelectedUsers([]);
    setSelectedRoles([]);
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
                <BreadcrumbItem active>Create Group</BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardHeader className="bg-header">
                  <div className="d-flex flex-column gap-1">
                    <span className="h6 fw-bold text-dark">
                      Create User Group
                    </span>
                    <span className="fw-medium fs-6 text-dark">
                      Begin creating a user group, assigning members and
                      permissions.
                    </span>
                  </div>
                </CardHeader>
                <Formik
                  validateOnChange={false}
                  validateOnBlur
                  validationSchema={schema}
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                >
                  {({ touched, errors, resetForm }) => (
                    <Form>
                      <CardBody>
                        <div className="d-flex flex-column gap-2">
                          <Row className="mb-3">
                            <Col>
                              <Row className="mb-3">
                                <Col>
                                  <span className="h6 fw-bold">
                                    General Information
                                  </span>
                                </Col>
                              </Row>
                              <Row className="mb-3">
                                <Col>
                                  <Label htmlFor="groupName">Group Name</Label>
                                  <Field
                                    name="groupName"
                                    type="text"
                                    placeholder="Enter Group Name"
                                    className={`form-control ${
                                      errors.groupName && touched.groupName
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                  />
                                  {errors.groupName && touched.groupName && (
                                    <FormFeedback typeof="invalid">
                                      {errors.groupName}
                                    </FormFeedback>
                                  )}
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <Label htmlFor="groupDescription">
                                    Group Description
                                  </Label>
                                  <Field
                                    component="textarea"
                                    name="groupDescription"
                                    placeholder="Enter Group Description"
                                    className={`form-control ${
                                      errors.groupDescription &&
                                      touched.groupDescription
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                  />
                                  {errors.groupDescription &&
                                    touched.groupDescription && (
                                      <FormFeedback typeof="invalid">
                                        {errors.groupDescription}
                                      </FormFeedback>
                                    )}
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col>
                              <Row className="mb-3">
                                <Col>
                                  <span className="h6 fw-bold">
                                    Members and Roles
                                  </span>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <Nav tabs>
                                    <NavItem>
                                      <NavLink
                                        style={{ cursor: "pointer" }}
                                        className={classnames({
                                          active: activeTab === "1",
                                        })}
                                        onClick={() => toggle("1")}
                                      >
                                        Members
                                      </NavLink>
                                    </NavItem>
                                    <NavItem>
                                      <NavLink
                                        style={{ cursor: "pointer" }}
                                        className={classnames({
                                          active: activeTab === "2",
                                        })}
                                        onClick={() => toggle("2")}
                                      >
                                        Roles
                                      </NavLink>
                                    </NavItem>
                                  </Nav>
                                  <TabContent activeTab={activeTab}>
                                    <TabPane tabId="1">
                                      <div className="p-3">
                                        <Row className="mb-3">
                                          <Col>
                                            <div className="d-flex flex-row justify-content-around">
                                              <span className="fw-semibold">
                                                All Users
                                              </span>
                                              <span className="fw-semibold">
                                                Assigned Users
                                              </span>
                                            </div>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col>
                                            <DualListBox
                                              options={formattedUsers}
                                              selected={selectedUsers}
                                              onChange={(e) =>
                                                setSelectedUsers(e)
                                              }
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
                                      </div>
                                    </TabPane>
                                    <TabPane tabId="2">
                                      <div className="p-3">
                                        <Row className="mb-3">
                                          <Col>
                                            <div className="d-flex flex-row justify-content-around">
                                              <span className="fw-semibold">
                                                All Roles
                                              </span>
                                              <span className="fw-semibold">
                                                Assigned Roles
                                              </span>
                                            </div>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col>
                                            <DualListBox
                                              options={formattedRoles}
                                              selected={selectedRoles}
                                              onChange={(e) =>
                                                setSelectedRoles(e)
                                              }
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
                                      </div>
                                    </TabPane>
                                  </TabContent>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </div>
                      </CardBody>
                      <CardFooter>
                        <div className="d-flex flex-row justify-content-between">
                          <Button
                            type="button"
                            className="btn btn-custom-primary"
                            onClick={() => handleResetForm(resetForm)}
                          >
                            Reset
                          </Button>
                          <div className="d-flex flex-row gap-2">
                            <Link to="/settings/access">
                              <Button
                                type="button"
                                className="btn btn-custom-primary"
                                onClick={() => handleResetForm(resetForm)}
                              >
                                Cancel
                              </Button>
                            </Link>
                            <Button
                              type="submit"
                              className="btn btn-custom-primary"
                            >
                              Submit
                            </Button>
                          </div>
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

export default CreateGroup;
