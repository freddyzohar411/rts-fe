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
  Alert,
} from "reactstrap";
import SimpleBar from "simplebar-react";
import { schema, initialValues, populateForm } from "./constants";
import { Formik, Field, Form } from "formik";
import { userColumns } from "./ManageUsersData";
import { fetchGroups } from "../../../../store/group/action";
import { fetchUsers } from "../../../../store/users/action";
import { useDispatch, useSelector } from "react-redux";
import { ValidationError } from "yup";

function ManageUsersTable({
  extractedUserData,
  selectedFile,
  onSubmittedUsers,
}) {
  const [selectedUserData, setSelectedUserData] = useState([]);
  const [submittedForms, setSubmittedForms] = useState([]);
  const dispatch = useDispatch();
  const allGroups = useSelector((state) => state?.GroupReducer?.groups);
  const allUsers = useSelector((state) => state?.UserReducer?.users);
  const [userInitialValues, setUserInitialValues] = useState(
    populateForm(initialValues)
  );
  const [formError, setFormError] = useState(false);
  const [validationErrorMsg, setValidationErrorMsg] = useState([]);

  // delete a row of user data
  const deleteUserData = (index) => {
    const updatedUserData = selectedUserData.filter((user, userIndex) => {
      return userIndex !== index;
    });
    setSelectedUserData(updatedUserData);

    const updatedUserInitialValues = getPageData(updatedUserData).map(
      (user, index) => {
        const userGroup = allGroups?.find(
          (group) => group.userGroupName === user.groupName
        );
        const userManager = (Array.isArray(allUsers) ? allUsers : []).find(
          (manager) => manager.email === user.managerEmail
        );
        return {
          firstName: user.firstName ? user.firstName : "",
          lastName: user.lastName ? user.lastName : "",
          username: user.username ? user.username : "",
          email: user.email ? user.email : "",
          mobile: user.mobile ? user.mobile : "",
          employeeId: user.employeeId ? user.employeeId : "",
          managerId: userManager ? userManager?.id : null,
          groups: userGroup ? [userGroup?.id] : null,
        };
      }
    );
    setUserInitialValues(updatedUserInitialValues);
  };

  const [editingRow, setEditingRow] = useState(false);
  const formikRefs = useRef([]);

  // get current page
  const [currentPage, setCurrentPage] = useState(1);
  // get items displayed per page
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // get total number of pages
  const getTotalPages = () => {
    return Math.ceil(selectedUserData.length / itemsPerPage);
  };
  // get the page data based of the index
  const getPageData = (selectedUserData) => {
    const firstIdx = (currentPage - 1) * itemsPerPage;
    const lastIdx = firstIdx + itemsPerPage;
    return selectedUserData.slice(firstIdx, lastIdx);
  };

  // go back to page 1 when itemsperpage changes
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  // function to go to the next page
  const handleNext = () => {
    const totalPages = getTotalPages();
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  // function to go to the previous page
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // get user index based on the current page
  const getUserIndex = (index) => {
    return index + (currentPage - 1) * itemsPerPage;
  };

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (selectedFile) {
      const selectedData = extractedUserData[selectedFile] || [];
      let filteredData = selectedData;

      if (searchQuery && searchQuery.length > 0) {
        filteredData = selectedData.filter((user) => {
          return (
            user?.firstName
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            user?.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user?.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (typeof user?.mobile === "string" &&
              user?.mobile
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase())) ||
            (typeof user?.employeeId === "string" &&
              user?.employeeId
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase()))
          );
        });
      }

      setSelectedUserData(filteredData);

      const initialUserValues = getPageData(filteredData).map((user, index) => {
        const userGroup = allGroups?.find(
          (group) => group.userGroupName === user.groupName
        );
        const userManager = (Array.isArray(allUsers) ? allUsers : []).find(
          (manager) => manager.email === user.managerEmail
        );
        return {
          firstName: user.firstName ? user.firstName : "",
          lastName: user.lastName ? user.lastName : "",
          username: user.username ? user.username : "",
          email: user.email ? user.email : "",
          mobile: user.mobile ? user.mobile : "",
          employeeId: user.employeeId ? user.employeeId : "",
          managerId: userManager ? userManager?.id : null,
          groups: userGroup ? [userGroup?.id] : null,
        };
      });

      setUserInitialValues(initialUserValues);
    }
  }, [
    selectedFile,
    extractedUserData,
    allGroups,
    allUsers,
    itemsPerPage,
    currentPage,
    searchQuery,
  ]);

  // retrieving the groups and users
  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchUsers());
  }, []);

  // submitting one row of data
  const handleSubmit = (values, index) => {
    // If managerId is not present in values, set it to null
    if (!values.managerId) {
      values.managerId = null;
    }
    // If groups is not present in values or it's an empty array, set it to []
    if (!values.groups || values.groups.length === 0) {
      values.groups = [];
    }

    const updateUserData = [...selectedUserData];
    updateUserData[getUserIndex(index)] = values;
    setSelectedUserData(updateUserData, () => {
      const updatedUserInitialValues = getPageData(selectedUserData).map(
        (user, index) => {
          const userGroup = allGroups?.find(
            (group) => group.userGroupName === user.groupName
          );
          const userManager = (Array.isArray(allUsers) ? allUsers : []).find(
            (manager) => manager.email === user.managerEmail
          );
          return {
            firstName: user.firstName ? user.firstName : "",
            lastName: user.lastName ? user.lastName : "",
            username: user.username ? user.username : "",
            email: user.email ? user.email : "",
            mobile: user.mobile ? user.mobile : "",
            employeeId: user.employeeId ? user.employeeId : "",
            managerId: userManager ? userManager?.id : null,
            groups: userGroup ? [userGroup?.id] : null,
          };
        }
      );
      setUserInitialValues(updatedUserInitialValues);
    });
  };

  // submitting all the data in the current table
  const handleSubmitAll = async () => {
    try {
      const submissionPromises = selectedUserData.map((userData) => {
        return new Promise((resolve, reject) => {
          schema
            .validate(userData, { abortEarly: false })
            .then((values) => {
              resolve(values);
            })
            .catch((errors) => {
              reject(errors);
            });
        });
      });
      const submittedUsers = await Promise.all(submissionPromises);
      // Create new variable to hold the correct data.
      const formattedSubmittedUsers = submittedUsers.map((users) => {
        const userGroup = allGroups.find(
          (group) => group.userGroupName === users.groupName
        );
        const userManager = allUsers.find(
          (manager) => manager.email === users.managerEmail
        );
        return {
          firstName: users.firstName,
          lastName: users.lastName,
          username: users.username,
          email: users.email,
          mobile: users.mobile,
          employeeId: users.employeeId,
          managerId: users.managerId ? users.managerId : (userManager ? userManager?.id : null),
          groups: users.groups ? [users.groups] : (userGroup ? [userGroup.id] : []),
        };
      });

      setSubmittedForms((prevSubmittedForms) => [
        ...prevSubmittedForms,
        ...formattedSubmittedUsers,
      ]);
      setFormError(false);
    } catch (error) {
      if (error instanceof ValidationError) {
        setValidationErrorMsg(error.errors);
      }
      setFormError(true);
    }
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
                value={searchQuery}
                onChange={handleSearch}
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
                    {userColumns.map((column, index) => (
                      <th key={index} style={{ minWidth: "160px" }}>
                        {column}
                      </th>
                    ))}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {getPageData(selectedUserData)?.map((userData, index) => (
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
                                <Form onSubmit={handleSubmit}>
                                  <button
                                    type="submit"
                                    className="btn btn-sm btn-custom-primary"
                                  >
                                    <i className="ri-save-line"></i>
                                  </button>
                                </Form>

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
        {formError && (
          <Row>
            <Col>
              <Alert color="danger">
                <b>Alert:</b> User data is not complete. Following error(s)
                found:
                <ul className="mb-0">
                  {validationErrorMsg.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </Alert>
            </Col>
          </Row>
        )}

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
                <PaginationItem>
                  <PaginationLink
                    previous
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                  >
                    Prev
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>{currentPage}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    next
                    onClick={handleNext}
                    disabled={currentPage > getTotalPages()}
                  >
                    Next
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              className="btn btn-custom-primary me-2"
              type="button"
              onClick={handleSubmitAll}
            >
              Confirm Users
            </Button>
          </Col>
          <Col>
            <InputGroup>
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
