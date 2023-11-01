import { Field, Formik, Form } from "formik";
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
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Table,
} from "reactstrap";
import classnames from "classnames";
import { initialValues, populateForm, schema } from "../constants";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRole, updateRole } from "../../../../store/roles/action";
import { fetchModules } from "../../../../store/module/action";
import axios from "axios";
function UpdateRole() {
  const { roleId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.RoleReducer.role);
  const allModules = useSelector((state) => state.ModuleReducer.modules);
  const [roleInitialValues, setRoleInitialValues] = useState(
    populateForm(initialValues)
  );

  // Get Role and Module Data
  useEffect(() => {
    if (roleId) {
      dispatch(fetchRole(roleId));
      dispatch(fetchModules());
    }
  }, []);

  // Set Role Initial Values
  useEffect(() => {
    const fetchRoleInitialValues = {
      id: role.id,
      roleName: role.roleName,
      roleDescription: role.roleDescription,
      modules: role.modules,
    };
    setRoleInitialValues(populateForm(fetchRoleInitialValues));
  }, []);

  // Document Title
  useEffect(() => {
    if (roleId) {
      document.title = `${role.roleName} Update | RTS`;
    }
  }, []);

  // Tabs
  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab != tab) {
      setActiveTab(tab);
    }
  };

  // Handle Submit Button
  const handleSubmit = async (values) => {
    const permissionMap = {
      Read: "1",
      Write: "2",
      Edit: "3",
      Delete: "4",
    };

    const updatedModules = values.modules.map((module) => ({
      id: module.id,
      permissions: module.permissions.map(
        (permission) => permissionMap[permission]
      ),
    }));

    const updatedRole = {
      id: values.id,
      roleName: values.roleName,
      roleDescription: values.roleDescription,
      modules: updatedModules,
    };

    console.log("Updated Role:", updatedRole);

    // console.log("updatedRole:", updatedRole);
    // axios
    //   .put("http://localhost:8091/api/role", updatedRole)
    //   .then((res) => {
    //     console.log("Updated role success!", res.data);
    //     navigate("/settings/access");
    //   })
    //   .catch((error) => console.error("Error updating:", error));
    dispatch(updateRole({ updatedRole, navigate: navigate }));
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
                <BreadcrumbItem>Update Role</BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <div className="d-flex flex-column">
                    <span className="h5 fw-bold">Update Role</span>
                    <span>
                      Make changes to role details, permissions and groups.
                    </span>
                  </div>
                </CardHeader>
                <Formik
                  validateOnBlur
                  validateOnChange={false}
                  initialValues={roleInitialValues}
                  validationSchema={schema}
                  enableReinitialize={true}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <CardBody>
                        <Row className="mb-3">
                          <Col>
                            <span className="fw-bold">General Information</span>
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col>
                            <div>
                              <Label className="fw-semibold">Role Name</Label>
                              <Field
                                placeholder="Enter Role Name"
                                type="text"
                                name="roleName"
                                className={`form-control ${
                                  errors.roleName && touched.roleName
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
                                placeholder="Enter Role Description"
                                type="text"
                                component="textarea"
                                name="roleDescription"
                                className={`form-control ${
                                  errors.roleDescription &&
                                  touched.roleDescription
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
                            <Label>ID</Label>
                            <Field
                              name="id"
                              type="text"
                              className="form-control"
                            />
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col>
                            <span className="fw-bold">
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
                          <TabPane tabId="1">
                            <Row className="mb-3">
                              <Col>
                                <Table className="table table-bordered table-hover border-secondary align-middle">
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
                                    {roleInitialValues &&
                                      roleInitialValues.modules.map(
                                        (module, index) => {
                                          const matchingModule =
                                            allModules.find(
                                              (m) => m.id === module.id
                                            );
                                          const moduleName = matchingModule
                                            ? matchingModule.moduleName
                                            : "Unknown Module";
                                          return (
                                            <tr key={module.id}>
                                              <td>{moduleName}</td>
                                              <td>
                                                {module.permissions.includes(
                                                  "Read"
                                                ) ? (
                                                  <Field
                                                    type="checkbox"
                                                    name={`modules.${index}.permissions`}
                                                    value="1"
                                                    className="form-check-input"
                                                    checked
                                                  />
                                                ) : (
                                                  <Field
                                                    type="checkbox"
                                                    name={`modules.${index}.permissions`}
                                                    value="1"
                                                    className="form-check-input"
                                                  />
                                                )}
                                              </td>
                                              <td>
                                                {module.permissions.includes(
                                                  "Write"
                                                ) ? (
                                                  <Field
                                                    type="checkbox"
                                                    name={`modules.${index}.permissions`}
                                                    value="2"
                                                    className="form-check-input"
                                                    checked
                                                  />
                                                ) : (
                                                  <Field
                                                    type="checkbox"
                                                    name={`modules.${index}.permissions`}
                                                    value="2"
                                                    className="form-check-input"
                                                  />
                                                )}
                                              </td>
                                              <td>
                                                {module.permissions.includes(
                                                  "Edit"
                                                ) ? (
                                                  <Field
                                                    type="checkbox"
                                                    name={`modules.${index}.permissions`}
                                                    value="3"
                                                    className="form-check-input"
                                                    checked
                                                  />
                                                ) : (
                                                  <Field
                                                    type="checkbox"
                                                    name={`modules.${index}.permissions`}
                                                    value="3"
                                                    className="form-check-input"
                                                  />
                                                )}
                                              </td>
                                              <td>
                                                {module.permissions.includes(
                                                  "Delete"
                                                ) ? (
                                                  <Field
                                                    type="checkbox"
                                                    name={`modules.${index}.permissions`}
                                                    value="4"
                                                    className="form-check-input"
                                                    checked
                                                  />
                                                ) : (
                                                  <Field
                                                    type="checkbox"
                                                    name={`modules.${index}.permissions`}
                                                    value="4"
                                                    className="form-check-input"
                                                  />
                                                )}
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
                          <TabPane tabId="2"></TabPane>
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
