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
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Table,
  FormFeedback,
} from "reactstrap";
// Formik
import { Formik, Form, Field } from "formik";
import { initialValues, schema } from "../constants";
// Nav Tabs
import classnames from "classnames";
import { userGroupData } from "../../dataSample";
// Dual List Box
import "react-dual-listbox/lib/react-dual-listbox.css";
import DualListBox from "react-dual-listbox";
// Navigation
import { Link, useNavigate } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { fetchModules } from "../../../../store/module/action";
import { createRole } from "../../../../store/roles/action";
import { fetchGroups } from "../../../../store/group/action";
import { fetchPermissions } from "../../../../store/actions";

function CreateNewRole() {
  document.title = "Create New Role | RTS";

  // Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allGroups = useSelector((state) => state.GroupReducer.groups);
  const modulesData = useSelector((state) => state.ModuleReducer.modules);
  const permissionData = useSelector(
    (state) => state.PermissionReducer.permissions
  );

  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    if (!modulesData) {
      dispatch(fetchModules());
    }
    if (!permissionData) {
      dispatch(fetchPermissions());
    }
  }, []);

  useEffect(() => {
    if (modulesData && permissionData) {
      const newModule = modulesData?.map((module) => {
        return {
          id: module.id,
          permissions: [],
        };
      });

      const initialValuesNew = {
        id: "",
        roleName: "",
        roleDescription: "",
        modules: newModule,
      };
      setInitialValues(initialValuesNew);
    }
  }, [modulesData, permissionData]);

  useEffect(() => {
    dispatch(fetchGroups());
  }, []);

  // Tabs
  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  // Dual List Box
  const [selected, setSelected] = useState([]);
  const formattedGroups = allGroups?.map((group) => ({
    value: group.userGroupName,
    label: group.userGroupName,
  }));

  // Handle Submit
  const handleSubmit = async (values) => {
    const newRole = {
      roleName: values.roleName,
      roleDescription: values.roleDescription,
      modules: values.modules,
    };

    try {
      const response = await dispatch(
        createRole({ newRole, navigate: navigate })
      );
      if (response && response.code === 200) {
        dispatch(showSuccessToast("Role created successfully!"));
      }
    } catch (error) {
      dispatch(showFailureToast("Role creation failed!"));
    }
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
                <BreadcrumbItem active>Create New Role</BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardHeader className="bg-header">
                  <div className="d-flex flex-column">
                    <span className="fs-5 fw-bold">Create New Role</span>
                    <span>
                      Create a new role to begin assigning access permissions to
                      user groups.
                    </span>
                  </div>
                </CardHeader>
                <Formik
                  validateOnBlur
                  validateOnChange={false}
                  validationSchema={schema}
                  enableReinitialize={true}
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched, resetForm }) => (
                    <Form>
                      <CardBody>
                        <Row>
                          <Col lg={12}>
                            <Row>
                              <Col>
                                <div className="mb-3">
                                  <span className="h6 fw-bold">
                                    General Information
                                  </span>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <div className="mb-3">
                                  <Label className="fw-semibold">
                                    Role Name
                                  </Label>
                                  <Field
                                    name="roleName"
                                    className={`form-control ${
                                      errors.roleName && touched.roleName
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                    placeholder="Enter role name"
                                    type="text"
                                  />
                                  {errors.roleName && touched.roleName && (
                                    <FormFeedback typeof="invalid">
                                      {errors.roleName}
                                    </FormFeedback>
                                  )}
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <div className="mb-3">
                                  <Label className="fw-semibold">
                                    Role Description
                                  </Label>
                                  <Field
                                    name="roleDescription"
                                    className={`form-control ${
                                      errors.roleDescription &&
                                      touched.roleDescription
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                    placeholder="Enter role name"
                                    component="textarea"
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
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Row>
                              <Col>
                                <div className="d-flex flex-column gap-1 mb-3">
                                  <span className="fw-bold h6">
                                    Permissions and Groups
                                  </span>
                                  <span className="text-muted">
                                    Assign permissions and groups to this role.
                                  </span>
                                </div>
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
                              <NavItem hidden>
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
                              <TabPane tabId="1" id="permissionTab">
                                <Row>
                                  <Col>
                                    <Table className="table table-striped table-bordered table-hover align-middle border-secondary">
                                      <thead>
                                        <tr>
                                          <th>Modules</th>
                                          {permissionData?.map((permission) => (
                                            <th key={permission.id}>
                                              {permission.permissionName}
                                            </th>
                                          ))}
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {modulesData?.map((module, index) => {
                                          return (
                                            <tr key={module.id}>
                                              <td>{module.moduleName}</td>
                                              {permissionData?.map(
                                                (permission, idx) => {
                                                  return (
                                                    <td>
                                                      <Field
                                                        type="checkbox"
                                                        name={`modules.${index}.permissions`}
                                                        value={permission.id.toString()}
                                                        className="form-check-input"
                                                      />
                                                    </td>
                                                  );
                                                }
                                              )}
                                            </tr>
                                          );
                                        })}
                                      </tbody>
                                    </Table>
                                  </Col>
                                </Row>
                              </TabPane>
                              <TabPane tabId="2" id="groupTab">
                                <Row>
                                  <Col>
                                    <div className="p-3">
                                      <Row className="mb-3">
                                        <Col>
                                          <div className="d-flex flex-row justify-content-around">
                                            <span className="fw-semibold">
                                              All Groups
                                            </span>
                                            <span className="fw-semibold">
                                              Assigned Groups
                                            </span>
                                          </div>
                                        </Col>
                                      </Row>
                                      <Row className="mb-3">
                                        <Col>
                                          <DualListBox
                                            options={formattedGroups}
                                            selected={selected}
                                            onChange={(e) => setSelected(e)}
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
                                  </Col>
                                </Row>
                              </TabPane>
                            </TabContent>
                          </Col>
                        </Row>
                      </CardBody>

                      <CardFooter>
                        <div className="d-flex flex-row justify-content-between">
                          <Button
                            className="btn btn-custom-primary"
                            type="button"
                            onClick={() => resetForm()}
                          >
                            Reset
                          </Button>
                          <div className="d-flex flex-row gap-3">
                            <Link
                              to="/settings/access"
                              className="text-dark"
                              state={{ activeTab: "2" }}
                            >
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

export default CreateNewRole;
