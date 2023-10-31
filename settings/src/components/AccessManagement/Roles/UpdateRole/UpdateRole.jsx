import React, { useEffect, useState } from "react";
import {
  Container,
  Col,
  Row,
  Label,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormFeedback,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Table,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { schema, populateForm, initialValues } from "../constants";
import { fetchRole, updateRole } from "../../../../store/roles/action";
import { fetchModules } from "../../../../store/module/action";
import classnames from "classnames";

function UpdateRole() {
  const { roleId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.RoleReducer.role);
  console.log(role);
  const [roleInitialValues, setRoleInitialValues] = useState(
    populateForm(initialValues)
  );

  // Tab
  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab != tab) {
      setActiveTab(tab);
    }
  };

  // Retrieve Modules
  const allModules = useSelector((state) => state.ModuleReducer.modules);
  useEffect(() => {
    dispatch(fetchModules());
  }, []);

  // Retrieve Role Details
  useEffect(() => {
    if (roleId) {
      dispatch(fetchRole(roleId));
    }
  }, []);

  // Set Role Initial Values
  useEffect(() => {
    const fetchInitialValues = {
      id: role.id,
      roleName: role.roleName,
      roleDescription: role.roleDescription,
      modules: role.modules,
    };
    setRoleInitialValues(populateForm(fetchInitialValues));
  }, []);

  // Document Title
  useEffect(() => {
    if (role) {
      document.title = `${role.roleName} Update | RTS`;
    }
  }, []);

  // Handle Upate
  const handleUpdateSubmit = async (values) => {
    if (role) {
      const updatedRole = {
        id: values.id,
        roleName: values.roleName,
        roleDescription: values.roleDescription,
        modules: values.modules,
      };
      console.log("updatedRole:", updatedRole);
      // dispatch(updateRole({ updatedRole, navigate: navigate }));
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container>
          <Row>
            <Col>
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="/settings/access">Settings</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>Update Role</BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <div className="d-flex flex-column gap-1">
                    <span className="h5 fw-bold">Update Role</span>
                    <span>
                      Make changes to role information, permissions and groups
                      associated to this role.
                    </span>
                  </div>
                </CardHeader>
                <Formik
                  validateOnBlur
                  validateOnChange={false}
                  initialValues={roleInitialValues}
                  validationSchema={schema}
                  enableReinitialize={true}
                  onSubmit={handleUpdateSubmit}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <CardBody>
                        <Row className="mb-3">
                          <Col>
                            <span className="fw-bold h6">
                              General Information
                            </span>
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col>
                            <div className="d-flex flex-column gap-1">
                              <Label className="fw-semibold">Role Name</Label>
                              <Field
                                name="roleName"
                                type="text"
                                className={`form-control ${
                                  touched.roleName && errors.roleName
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                              {errors.roleName && touched.roleName && (
                                <FormFeedback typeof="invalid">
                                  {errors.roleName}
                                </FormFeedback>
                              )}
                            </div>
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col>
                            <div>
                              <Label className="fw-semibold">
                                Role Description
                              </Label>
                              <Field
                                name="roleDescription"
                                component="textarea"
                                className={`form-control ${
                                  touched.roleDescription &&
                                  errors.roleDescription
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                              {errors.roleDescription &&
                                touched.roleDescription && (
                                  <FormFeedback typeof="invalid">
                                    {errors.roleDescription}
                                  </FormFeedback>
                                )}
                            </div>
                          </Col>
                        </Row>
                        <Row className="mb-3" hidden>
                          <Col>
                            <Label className="fw-semibold">ID</Label>
                            <Field
                              name="id"
                              type="number"
                              className="form-control"
                            />
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col>
                            <span className="h6 fw-bold">
                              Permissions and Groups
                            </span>
                          </Col>
                        </Row>
                        <Nav tabs>
                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: activeTab === "1",
                              })}
                              onClick={() => toggle("1")}
                            >
                              Permissions
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
                              Groups
                            </NavLink>
                          </NavItem>
                        </Nav>
                        <TabContent activeTab={activeTab}>
                          <TabPane tabId="1" id="permissionsUpdate">
                            <Row className="mb-3">
                              <Col>
                                <Table className="table table-striped table-hover table-bordered border-secondary align-middle">
                                  <thead>
                                    <tr>
                                      <th>Modules</th>
                                      <th>Read</th>
                                      <th>Write</th>
                                      <th>Edit</th>
                                      <th>Delete</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {roleInitialValues.modules.map(
                                      (module, index) => {
                                        const matchingModule = allModules.find(
                                          (m) => m.id === module.id
                                        );
                                        const moduleName = matchingModule
                                          ? matchingModule.moduleName
                                          : "Unknown Module";
                                        return (
                                          <tr>
                                            <td>{moduleName}</td>
                                            <td>
                                              <Field
                                                type="checkbox"
                                                name={`modules[${index}].permissions[0]`}
                                                checked={module.permissions.includes(
                                                  "Read"
                                                )}
                                                className="form-check-input"
                                              />
                                            </td>
                                            <td>
                                              <Field
                                                type="checkbox"
                                                name={`modules[${index}].permissions[1]`}
                                                checked={module.permissions.includes(
                                                  "Write"
                                                )}
                                                className="form-check-input"
                                              />
                                            </td>
                                            <td>
                                              <Field
                                                type="checkbox"
                                                name={`modules[${index}].permissions[2]`}
                                                checked={module.permissions.includes(
                                                  "Edit"
                                                )}
                                                className="form-check-input"
                                              />
                                            </td>
                                            <td >
                                              <Field
                                                type="checkbox"
                                                name={`modules[${index}].permissions[3]`}
                                                checked={module.permissions.includes(
                                                  "Delete"
                                                )}
                                                className="form-check-input"
                                              />
                                              
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </Table>
                              </Col>
                            </Row>
                          </TabPane>
                          <TabPane tabId="2" id="groupUpdate"></TabPane>
                        </TabContent>
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

export default UpdateRole;
