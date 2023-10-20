import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  FormFeedback,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import "react-dual-listbox/lib/react-dual-listbox.css";
import DualListBox from "react-dual-listbox";
import {
  roleData,
  userData,
  userGroupData,
  userGroupMembersData,
} from "../dataSample";
import { Field, Form, Formik } from "formik";
import { initialValues, schema } from "./constants";
import SimpleBar from "simplebar-react";

function NewGroup(props) {
  const [selected, setSelected] = useState([]);
  const formattedUserData = userData.map((user) => ({
    value: user.username,
    label: user.firstName,
  }));

  const handleSubmit = async (values, { resetForm }) => {
    const groupData = {
      groupName: values.groupName,
      groupDescription: values.groupDescription,
    };

    const groupMembersData = {
      groupName: values.groupName,
      members: selected,
    };

    userGroupData.push(groupData);
    userGroupMembersData.push(groupMembersData);
    resetForm();
    setSelected([]);
    props.cancel();
  };

  // Tabs
  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab != tab) {
      setActiveTab(tab);
    }
  };

  const formattedRoles = roleData.map((role) => ({
    value: role.roleName,
    label: role.roleName,
  }));
  const [selectedRole, setSelectedRole] = useState([]);

  return (
    <Modal
      isOpen={props.show}
      toggle={props.cancel}
      centered
      scrollable
      size="xl"
    >
      <ModalHeader className="border-bottom">
        <div className="d-flex flex-column gap-1">
          <span className="modal-title">Create New User Group</span>
          <span className="text-muted fs-6">
            Create a new user group to categorise users who perform similar
            functions.
          </span>
        </div>
      </ModalHeader>
      <SimpleBar style={{ height: "600px" }}>
        <ModalBody className="bg-light">
          <Formik
            validateOnBlur
            validateOnChange={false}
            validationSchema={schema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, resetForm }) => (
              <Form>
                <Card>
                  <CardBody>
                    <Row className="mb-3">
                      <Col>
                        <Label>Group Name</Label>
                        <Field
                          name="groupName"
                          placeholder="Enter a group name.."
                          type="text"
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
                          name="groupDescription"
                          type="textarea"
                          placeholder="Enter a group description.."
                          className={`form-control ${
                            errors.groupDescription && touched.groupDescription
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
                            <Row className="mb-3">
                              <Col>
                                <div className="border border-secondary rounded p-3">
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
                                        options={formattedUserData}
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
                          <TabPane tabId="2">
                            <Row className="mb-3">
                              <Col>
                                <div className="border border-secondary rounded p-3">
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
                                        selected={selectedRole}
                                        onChange={(e) => setSelectedRole(e)}
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
                </Card>

                <Row>
                  <Col
                    lg={12}
                    className="d-flex flex-row justify-content-between"
                  >
                    <Button
                      className="btn btn-primary"
                      type="button"
                      onClick={() => {
                        resetForm();
                        setSelected([]);
                      }}
                    >
                      Reset
                    </Button>
                    <div className="d-flex flex-row gap-2">
                      <Button
                        className="btn btn-primary"
                        type="button"
                        onClick={props.cancel}
                      >
                        Cancel
                      </Button>
                      <Button className="btn btn-primary" type="submit">
                        Save
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </SimpleBar>
    </Modal>
  );
}

export default NewGroup;
