import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Row,
  Col,
  Button,
  Label,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import "react-dual-listbox/lib/react-dual-listbox.css";
import DualListBox from "react-dual-listbox";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { schema } from "./constants";
import { fetchGroup, updateGroup } from "../../../../store/group/action";
import { useRef } from "react";
import { listUsers } from "../../../../store/users/action";

function GroupUpdate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const form = useRef();

  const groupDetails = useSelector((state) => state?.GroupReducer?.group);
  const usersListing = useSelector((state) => state.UserReducer.usersListing);
  const rolesListing = useSelector((state) => state.RoleReducer.rolesListing);
  const users = usersListing?.users ?? [];
  const roles = rolesListing?.roles ?? [];
  const updateMeta = useSelector((state) => state.GroupReducer.updateMeta);

  useEffect(() => {
    dispatch(listUsers({ pageSize: usersListing.totalElements }));
  }, []);

  const initialValues = { groupName: "", groupDescription: "", members: [] };

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
    dispatch(fetchGroup(id));
  }, [id]);

  useEffect(() => {
    if (groupDetails) {
      document.title = `${groupDetails?.userGroupName} | RTS`;

      if (form.current) {
        form.current.setValues({
          groupName: groupDetails?.userGroupName,
          groupDescription: groupDetails?.userGroupDescription,
        });
      }

      const existingUsers = groupDetails?.users?.map((user) => user?.id);
      setSelectedUsers(existingUsers);

      const roleNames = groupDetails?.roleEntities?.map((role) => role?.id);
      setSelectedRoles(roleNames);
    } else {
      navigate("/settings/access");
    }
  }, [groupDetails]);

  useEffect(() => {
    if (users?.length) {
      const usersData = users?.map((user) => ({
        value: user?.id,
        label: user?.firstName + " " + user?.lastName + " (" + user.email + ")",
      }));
      setFormattedUsers(usersData);
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

  useEffect(() => {
    if (updateMeta?.isSuccess) {
      navigate("/settings/access", { state: { ugTab: "2" } });
    }
  }, [updateMeta]);

  const handleSubmit = async (values, { resetForm }) => {
    const input = {
      id: id,
      userGroupName: values.groupName,
      description: values.groupDescription,
      users: selectedUsers,
      roles: selectedRoles,
    };
    dispatch(updateGroup(input));
  };

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
                <BreadcrumbItem active>Update Group</BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardHeader className="bg-header">
                  <div className="d-flex flex-column">
                    <span className="fs-5 fw-bold">Update Group Details</span>
                    <span>
                      Make changes the group details, members and roles assigned
                      to the group.
                    </span>
                  </div>
                </CardHeader>
                <Formik
                  innerRef={form}
                  validateOnChange={false}
                  validateOnBlur
                  validationSchema={schema}
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                >
                  {({ touched, errors, resetForm }) => (
                    <Form>
                      <CardBody>
                        <Row className="mb-4">
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
                                <Label>Group Name *</Label>
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
                            <Row className="mb-3">
                              <Col>
                                <Label>Group Description</Label>
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

                        <Row>
                          <Col>
                            <Row className="mb-3">
                              <Col>
                                <span className="h6 fw-bold">
                                  Member and Roles
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
                                      onClick={() => {
                                        toggle("1");
                                      }}
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
                                      onClick={() => {
                                        toggle("2");
                                      }}
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
                                          <div className="d-flex flex-row w-100">
                                            <span className="fw-semibold w-50">
                                              All Users
                                            </span>
                                            <span className="fw-semibold w-50 ms-5">
                                              Assigned Users
                                            </span>
                                          </div>
                                        </Col>
                                      </Row>
                                      <Row className="mb-3">
                                        <Col>
                                          <DualListBox
                                            options={formattedUsers}
                                            selected={selectedUsers}
                                            onChange={(e) =>
                                              setSelectedUsers(e)
                                            }
                                            canFilter={true}
                                            required
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
                                          <div className="d-flex flex-row w-100">
                                            <span className="fw-semibold w-50">
                                              All Roles
                                            </span>
                                            <span className="fw-semibold w-50 ms-5">
                                              Assigned Roles
                                            </span>
                                          </div>
                                        </Col>
                                      </Row>
                                      <Row className="mb-3">
                                        <Col>
                                          <DualListBox
                                            options={formattedRoles}
                                            selected={selectedRoles}
                                            onChange={(e) =>
                                              setSelectedRoles(e)
                                            }
                                            canFilter={true}
                                            required
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
                      </CardBody>
                      <CardFooter>
                        <div className="d-flex flex-row justify-content-end gap-2">
                          <Link to="/settings/access/" state={{ ugTab: "2" }}>
                            <Button className="btn btn-custom-primary">
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

export default GroupUpdate;
