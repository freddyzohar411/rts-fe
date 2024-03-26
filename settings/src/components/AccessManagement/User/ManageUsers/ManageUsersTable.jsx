import React, { useEffect, useState, useRef } from "react";
import {
  Row,
  Table,
  InputGroup,
  InputGroupText,
  Input,
  FormFeedback,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Button,
  Badge,
  Label,
} from "reactstrap";
import SimpleBar from "simplebar-react";
import { schema, initialValues, populateForm } from "./constants";
import { Formik, Field, Form } from "formik";
import { userColumns } from "./ManageUsersData";
import { fetchGroups } from "../../../../store/group/action";
import { fetchUsers } from "../../../../store/users/action";
import { useDispatch, useSelector } from "react-redux";

function ManageUsersTable({
  extractedUserData,
  selectedFile,
  onSubmittedUsers,
}) {
  const [selectedUserData, setSelectedUserData] = useState([]);
  const [submittedForms, setSubmittedForms] = useState([]);
  useEffect(() => {
    const selectedData = extractedUserData[selectedFile || []];
    setSelectedUserData(selectedData);
  }, [selectedUserData, selectedFile, extractedUserData]);
  const dispatch = useDispatch();
  const allGroups = useSelector((state) => state?.GroupReducer?.groups);
  const allUsers = useSelector((state) => state?.UserReducer?.users);
  const [userInitialValues, setUserInitialValues] = useState(
    populateForm(initialValues)
  );
  const [confirmedUsers, setConfirmedUsers] = useState([]);
  const [editingRow, setEditingRow] = useState(false);
  const [formikArray, setFormikArray] = useState([]);
  const [newUser, setNewUser] = useState([]);
  const [submitUsers, setSubmitUsers] = useState([]);

  const formikRefs = useRef([]);

  useEffect(() => {
    const initialUserValues = selectedUserData.map((user, index) => {
      const userGroup = allGroups?.find(
        (group) => group.userGroupName === user.groupName
      );
      const userManager = (Array.isArray(allUsers) ? allUsers : []).find(
        (manager) => manager.email === user.managerEmail
      );
      return {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        mobile: user.mobile,
        employeeId: user.employeeId,
        managerId: userManager ? userManager?.id : null,
        groups: userGroup ? [userGroup?.id] : [],
      };
    });

    setUserInitialValues(initialUserValues);
  }, [selectedUserData, allGroups, allUsers]);

  //   PAGINATION - START
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const getTotalPages = () => {
    return Math.ceil(selectedUserData?.length / itemsPerPage);
  };

  const getCurrentPageData = () => {
    const firstIndex = (currentPage - 1) * itemsPerPage;
    const lastIndex = firstIndex + itemsPerPage;
    return selectedUserData.slice(firstIndex, lastIndex);
  };

  const handleNext = () => {
    const totalPages = getTotalPages();
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  //  PAGINATION - END

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchUsers());
  }, []);

  const deleteUserData = (index) => {
    const updatedUserData = selectedUserData.filter((_, i) => i !== index);
    setSelectedUserData(updatedUserData);
    const updatedFormikRefs = formikRefs.current.filter((_, i) => i !== index);
    formikRefs.current = updatedFormikRefs;
  };

  const handleSubmit = (values, index) => {
    const updateUserData = [...selectedUserData];
    updateUserData[index] = values;
    setNewUser(updateUserData);
  };

  const handleSubmitAll = async () => {
    formikRefs.current.forEach((formik) => {
      formik?.handleSubmit();
    });
    const newUsers = formikRefs.current.map((formik) => formik?.values);
    setSubmittedForms((prevSubmittedForms) => [
      ...prevSubmittedForms,
      ...newUsers,
    ]);
  };

  useEffect(() => {
    if (submittedForms) {
      onSubmittedUsers(submittedForms);
    }
  }, [submittedForms]);

  return (
    <React.Fragment>
      <div>
        <Row className="mb-3">
          <Col>
            <div className="d-flex flex-row justify-content-between align-items-baseline">
              {editingRow ? (
                <Badge color="success">Editing Row</Badge>
              ) : (
                <Badge color="dark">Read Only</Badge>
              )}
              <div>
                <Button
                  className="btn btn-custom-primary btn-sm me-2"
                  onClick={() => setEditingRow(!editingRow)}
                >
                  {editingRow
                    ? "Switch to Reading View"
                    : "Switch to Editing View"}
                </Button>
                <Button className="btn btn-custom-primary btn-sm">
                  Add User
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <div className="search-box">
              <Input
                type="text"
                placeholder="Search.."
                className="form-control border-primary"
              />
              <i className="bx bx-search-alt search-icon"></i>
            </div>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <SimpleBar style={{ overflowX: "auto" }} autoHide={false}>
              <Table className="table table-hover table-striped border-secondary align-middle table-nowrap">
                <thead style={{ backgroundColor: "#B8DAF3", color: "#000000" }}>
                  <tr>
                    <th></th>
                    {userColumns.map((column, index) => (
                      <th key={index} style={{ minWidth: "160px" }}>
                        {column}
                      </th>
                    ))}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedUserData?.map((userData, index) => (
                    <tr>
                      <Formik
                        initialValues={userInitialValues[index]}
                        validateOnBlur
                        validateOnChange={false}
                        validationSchema={schema}
                        enableReinitialize={true}
                        onSubmit={(values) => handleSubmit(values, index)}
                        innerRef={(el) => {
                          if (el) {
                            formikRefs.current[index] = el;
                          }
                        }}
                      >
                        {({ errors, touched, handleSubmit, setFieldValue }) => (
                          <>
                            <td>
                              {Object.values(errors).some((error) => error) ? (
                                <i
                                  className="ri-error-warning-line text-danger fs-5"
                                  onClick={() => console.log(errors)}
                                ></i>
                              ) : (
                                <i className="ri-checkbox-circle-line text-success"></i>
                              )}
                            </td>
                            <td>
                              <Form onSubmit={handleSubmit}>
                                <Field
                                  name="firstName"
                                  type="text"
                                  placeholder="Enter First Name"
                                  className={`form-control ${
                                    errors.firstName && touched.firstName
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  disabled={!editingRow}
                                />
                                {errors.firstName && touched.firstName && (
                                  <div className="invalid-feedback">
                                    {errors.firstName}
                                  </div>
                                )}
                              </Form>
                            </td>
                            <td>
                              <Form onSubmit={handleSubmit}>
                                <Field
                                  name="lastName"
                                  type="text"
                                  placeholder="Enter Last Name"
                                  className={`form-control ${
                                    errors.lastName && touched.lastName
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  // disabled={editingRow !== index}
                                  disabled={!editingRow}
                                />
                                {errors.lastName && touched.lastName && (
                                  <div className="invalid-feedback">
                                    {errors.lastName}
                                  </div>
                                )}
                              </Form>
                            </td>
                            <td>
                              <Form onSubmit={handleSubmit}>
                                <Field
                                  name="username"
                                  type="text"
                                  placeholder="Enter Username"
                                  className={`form-control ${
                                    errors.username && touched.username
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  disabled={!editingRow}
                                />
                                {errors.username && touched.username && (
                                  <div className="invalid-feedback">
                                    {errors.username}
                                  </div>
                                )}
                              </Form>
                            </td>
                            <td>
                              <Form onSubmit={handleSubmit}>
                                <Field
                                  name="email"
                                  type="email"
                                  placeholder="Enter Email"
                                  className={`form-control ${
                                    errors.email && touched.email
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  // disabled={editingRow !== index}
                                  disabled={!editingRow}
                                />
                                {errors.email && touched.email && (
                                  <div className="invalid-feedback">
                                    {errors.email}
                                  </div>
                                )}
                              </Form>
                            </td>
                            <td>
                              <Form onSubmit={handleSubmit}>
                                <Field
                                  name="mobile"
                                  type="text"
                                  placeholder="Enter Mobile Number"
                                  className={`form-control ${
                                    errors.mobile && touched.mobile
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  disabled={!editingRow}
                                />
                                {errors.mobile && touched.mobile && (
                                  <FormFeedback typeof="invalid">
                                    {errors.mobile}
                                  </FormFeedback>
                                )}
                              </Form>
                            </td>
                            <td>
                              <Form onSubmit={handleSubmit}>
                                <Field
                                  name="employeeId"
                                  type="text"
                                  placeholder="Enter Employee ID"
                                  className={`form-control ${
                                    errors.employeeId && touched.employeeId
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  disabled={!editingRow}
                                />
                                {errors.employeeId && touched.employeeId && (
                                  <FormFeedback typeof="invalid">
                                    {errors.employeeId}
                                  </FormFeedback>
                                )}
                              </Form>
                            </td>
                            <td>
                              <Form onSubmit={handleSubmit}>
                                <Field
                                  name="managerId"
                                  as="select"
                                  className="form-select"
                                  style={{
                                    maxHeight: "100px",
                                    overflowY: "auto",
                                  }}
                                  disabled={!editingRow}
                                  onChange={(e) =>
                                    setFieldValue("managerId", e.target.value)
                                  }
                                >
                                  <option value="">Select a Manager</option>
                                  {(Array.isArray(allUsers)
                                    ? allUsers
                                    : []
                                  ).map((user, userIndex) => (
                                    <option
                                      key={userIndex}
                                      value={user?.id}
                                      selected={
                                        user?.email === userData.managerEmail
                                      }
                                    >
                                      {user?.email} ({user?.firstName}{" "}
                                      {user?.lastName})
                                    </option>
                                  ))}
                                </Field>
                              </Form>
                            </td>
                            <td>
                              <Form onSubmit={handleSubmit}>
                                <Field
                                  name="groups"
                                  as="select"
                                  className="form-select"
                                  style={{
                                    maxHeight: "100px",
                                    overflowY: "auto",
                                  }}
                                  disabled={!editingRow}
                                  onChange={(e) =>
                                    setFieldValue("groups", e.target.value)
                                  }
                                >
                                  <option value="">Select a Group</option>
                                  {(Array.isArray(allGroups)
                                    ? allGroups
                                    : []
                                  ).map((group, groupIndex) => (
                                    <option
                                      key={groupIndex}
                                      value={group?.id}
                                      selected={
                                        group?.userGroupName ===
                                        userData.groupName
                                      }
                                    >
                                      {group?.userGroupName}
                                    </option>
                                  ))}
                                </Field>
                              </Form>
                            </td>

                            <td>
                              <div className="d-flex justify-content-between gap-2">
                                {/* <Button
                                  className="btn btn-sm btn-custom-primary"
                                  type="button"
                                  onClick={() => {
                                    setEditingRow(index);
                                  }}
                                >
                                  <i className="ri-pencil-line"></i>
                                </Button>

                                <Form onSubmit={handleSubmit}>
                                  <button
                                    type="submit"
                                    className="btn btn-sm btn-custom-primary"
                                    disabled={editingRow !== index}
                                  >
                                    <i className="ri-save-line"></i>
                                  </button>
                                </Form> */}

                                <Button
                                  className="btn btn-sm btn-danger"
                                  type="button"
                                  onClick={() => deleteUserData(index)}
                                >
                                  <i className="ri-delete-back-2-line"></i>
                                </Button>
                              </div>
                            </td>
                          </>
                        )}
                      </Formik>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </SimpleBar>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="d-flex justify-content-between align-items-baseline">
              <Input
                type="select"
                className="form-select border-primary"
                style={{ width: "100px" }}
                onChange={(e) => setItemsPerPage(e.target.value)}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </Input>

              <Pagination>
                <PaginationItem disabled={currentPage === 1 || editingRow > -1}>
                  <PaginationLink onClick={handlePrev}>Prev</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink active>{currentPage}</PaginationLink>
                </PaginationItem>
                <PaginationItem
                  disabled={currentPage === getTotalPages() || editingRow > -1}
                >
                  <PaginationLink onClick={handleNext}>Next</PaginationLink>
                </PaginationItem>
              </Pagination>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              className="btn btn-custom-primary"
              type="button"
              onClick={handleSubmitAll}
            >
              Confirm Users
            </Button>
          </Col>
          <Col>
            <InputGroup className="w-25">
              <InputGroupText>Total Confirmed Users</InputGroupText>
              <Input disabled value={submittedForms?.length || 0} />
            </InputGroup>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default ManageUsersTable;
