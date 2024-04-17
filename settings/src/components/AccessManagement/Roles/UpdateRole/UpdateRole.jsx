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
  Spinner,
} from "reactstrap";
import classnames from "classnames";
import { initialValues, populateForm, schema } from "../constants";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRole,
  updateRole,
  removeRole,
} from "../../../../store/roles/action";
import { fetchModules } from "../../../../store/module/action";
import { fetchPermissions } from "../../../../store/permissions/action";

function UpdateRole() {
  const { roleId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.RoleReducer.role);
  const [roleInitialValues, setRoleInitialValues] = useState(
    populateForm(initialValues)
  );

  const modulesData = useSelector((state) => state.ModuleReducer.modules);
  const permissionData = useSelector(
    (state) => state.PermissionReducer.permissions
  );
  const roleUpdateMeta = useSelector(
    (state) => state.RoleReducer.roleUpdateMeta
  );

  // Fetch Modules and Permissions if dont exist
  useEffect(() => {
    if (!modulesData) {
      dispatch(fetchModules());
    }
    if (!permissionData) {
      dispatch(fetchPermissions());
    }
  }, []);

  // Get Role and Module Data
  useEffect(() => {
    if (roleId) {
      dispatch(fetchRole(roleId));
    }
    return () => {
      dispatch(removeRole());
    };
  }, []);

  // Set Role Initial Values
  useEffect(() => {
    const fetchRoleInitialValues = {
      id: role?.id,
      roleName: role?.roleName,
      roleDescription: role?.roleDescription,
      modules: role?.modules,
    };
    setRoleInitialValues(
      populateForm(fetchRoleInitialValues, permissionData, modulesData)
    );
  }, [role]);

  // Document Title
  useEffect(() => {
    if (roleId) {
      document.title = `${role?.roleName} Update | RTS`;
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
    dispatch(updateRole({ updatedRole: values, navigate: navigate }));
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
                    <span className="fs-5 fw-bold">Update Role</span>
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
                  {({ errors, touched, ...props }) => (
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
                          <Col>
                            <div>
                              <Label>Role Name*</Label>
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
                              <Label>Role Description*</Label>
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
                          <TabPane tabId="1">
                            <Row className="mb-3">
                              <Col>
                                <Table className="table table-bordered table-hover border-secondary align-middle">
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
                                                    value={permission?.id.toString()}
                                                    className="form-check-input"
                                                    checked={props?.values?.modules
                                                      ?.find(
                                                        (m) =>
                                                          m?.id === module?.id
                                                      )
                                                      ?.permissions?.includes(
                                                        permission?.id
                                                      )}
                                                    onChange={(e) => {
                                                      const checked =
                                                        e.target.checked;
                                                      const permissionId =
                                                        permission?.id;

                                                      let updatedPermissions;

                                                      let updateIndex =
                                                        props?.values?.modules.findIndex(
                                                          (m) =>
                                                            m?.id === module?.id
                                                        );

                                                      if (checked) {
                                                        // Find index in array
                                                        updatedPermissions = [
                                                          ...props.values
                                                            .modules[
                                                            updateIndex
                                                          ].permissions,
                                                          permissionId,
                                                        ];
                                                      } else {
                                                        updatedPermissions =
                                                          props.values.modules[
                                                            updateIndex
                                                          ].permissions.filter(
                                                            (id) =>
                                                              id !==
                                                              permissionId
                                                          );
                                                      }

                                                      props.setFieldValue(
                                                        `modules.${updateIndex}.permissions`,
                                                        updatedPermissions
                                                      );
                                                    }}
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
                          <TabPane tabId="2"></TabPane>
                        </TabContent>
                      </CardBody>
                      <CardFooter>
                        <div className="d-flex flex-row justify-content-end gap-3">
                          <Link
                            to="/settings/access"
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
                            disabled={roleUpdateMeta?.isLoading}
                          >
                            Save{" "}
                            {roleUpdateMeta?.isLoading && (
                              <Spinner size="sm"></Spinner>
                            )}
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
