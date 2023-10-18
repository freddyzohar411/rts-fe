import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Table,
} from "reactstrap";
import classnames from "classnames";
import {
  userGroupData,
  userData,
  permissionData,
  roleData,
  roleGroupData,
} from "../dataSample";
import "react-dual-listbox/lib/react-dual-listbox.css";
import DualListBox from "react-dual-listbox";
import { Field, Form, Formik } from "formik";
import { initialValues, schema } from "./constants";

function NewRole(props) {
  // TABS
  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  // DUAL LIST BOX
  const [selected, setSelected] = useState([]);
  const formattedGroupData = userGroupData.map((group) => ({
    value: group.groupName,
    label: group.groupName,
  }));

  const handleSubmit = async (values) => {
    const newRoleData = {
      roleName: values.roleName,
      roleDescription: values.roleDescription,
    };
    roleData.push(newRoleData);

    const newRoleGroups = {
      roleName: values.roleName,
      groups: selected,
    };
    roleGroupData.push(newRoleGroups);

    props.cancel();
  };

  return (
    <Modal
      isOpen={props.show}
      toggle={props.cancel}
      size="xl"
      centered
      scrollable
    >
      <ModalHeader className="modal-title border-bottom">
        Create a New Role
      </ModalHeader>
      <ModalBody className="bg-light">
        <Formik
          validateOnBlur
          validateOnChange={false}
          validationSchema={schema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {({ touched, errors, resetForm }) => (
            <Form>
              <Card>
                <CardBody>
                  <div className="mb-3">
                    <Row>
                      <Col lg={12} className="mb-3">
                        <Label>Role Name</Label>

                        <Field
                          name="roleName"
                          type="text"
                          className={`form-control ${
                            errors.roleName && touched.roleName
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Enter role name.."
                        />
                        {errors.roleName && touched.roleName && (
                          <FormFeedback typeof="invalid">
                            {errors.roleName}
                          </FormFeedback>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12} className="mb-3">
                        <Label>Role Description</Label>
                        <Field
                          name="roleDescription"
                          type="textarea"
                          className={`form-control ${
                            errors.roleDescription && touched.roleDescription
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Enter role description.."
                        />
                        {errors.roleDescription && touched.roleDescription && (
                          <FormFeedback typeof="invalid">
                            {errors.roleDescription}
                          </FormFeedback>
                        )}
                      </Col>
                    </Row>
                  </div>
                </CardBody>
              </Card>

              <Row>
                <Col lg={12}>
                  <Card>
                    <CardBody>
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
                            Permissions
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
                            Groups
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent activeTab={activeTab}>
                        {/* PERMISSIONS */}
                        <TabPane tabId="1" id="permissions">
                          <div className="my-3 p-1">
                            <Row>
                              <Col>
                                <h6>Permissions</h6>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <p className="text-muted">
                                  Permissions control the types of activities
                                  that a user or group can do. Please tick the
                                  appropriate boxes for permission to carry out
                                  these actions for this role.
                                </p>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <Table
                                  className="table table-hover table-bordered table-striped border-light align-middle table-nowrap rounded-3"
                                  id="permissionsTable"
                                >
                                  <thead>
                                    <tr>
                                      <th>Module</th>
                                      <th>Create</th>
                                      <th>Retrieve</th>
                                      <th>Update</th>
                                      <th>Delete</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {permissionData.map((module) => (
                                      <tr>
                                        <td>{module.moduleName}</td>
                                        <td>
                                          <Input
                                            type="checkbox"
                                            name="createCheckbox"
                                            className="form-check-input"
                                          />
                                        </td>
                                        <td>
                                          <Input
                                            type="checkbox"
                                            name="retrieveCheckbox"
                                            className="form-check-input"
                                          />
                                        </td>
                                        <td>
                                          <Input
                                            type="checkbox"
                                            name="updateCheckbox"
                                            className="form-check-input"
                                          />
                                        </td>
                                        <td>
                                          <Input
                                            type="checkbox"
                                            name="deleteCheckbox"
                                            className="form-check-input"
                                          />
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </Table>
                              </Col>
                            </Row>
                          </div>
                        </TabPane>

                        {/* NEW GROUPS */}
                        <TabPane tabId="2" id="members">
                          <div className="my-3 p-1">
                            <Row>
                              <Col lg={12}>
                                <h6>Groups</h6>
                                <p className="text-muted">
                                  Assign user groups to this role.
                                </p>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <DualListBox
                                  options={formattedGroupData}
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
                        </TabPane>
                      </TabContent>
                    </CardBody>
                  </Card>
                </Col>
              </Row>

              <Row>
                <Col lg={12}>
                  <div className="d-flex flex-row justify-content-between">
                    <Button type="button" className="btn btn-dark" onClick={() => {resetForm(); setSelected([]);}}>Reset</Button>
                    <div className="d-flex flex-row gap-2">
                      <Button type="submit" className="btn btn-dark">Save</Button>
                      <Button type="button" className="btn btn-dark" onClick={props.cancel}>Cancel</Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </Modal>
  );
}

export default NewRole;
