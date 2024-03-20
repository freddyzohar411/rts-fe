import React, { useEffect, useState } from "react";
import {
  Row,
  Table,
  Input,
  FormFeedback,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Button,
} from "reactstrap";
import SimpleBar from "simplebar-react";
import { schema, initialValues, populateForm } from "./constants";
import { Formik, Field } from "formik";
import { userColumns } from "./ManageUsersData";
import { fetchGroups } from "../../../../store/group/action";
import { fetchUsers } from "../../../../store/users/action";
import { useDispatch, useSelector } from "react-redux";

function ManageUsersTable({ extractedUserData, selectedFile }) {
  const [selectedUserData, setSelectedUserData] = useState(
    extractedUserData[selectedFile] || []
  );
  // const selectedUserData = extractedUserData[selectedFile] || [];
  const dispatch = useDispatch();
  const allGroups = useSelector((state) => state?.GroupReducer?.groups);
  const allUsers = useSelector((state) => state?.UserReducer?.users);
  const [userInitialValues, setUserInitialValues] = useState(
    populateForm(initialValues)
  );
  const [editingRow, setEditingRow] = useState(-1);
  const [formikArray, setFormikArray] = useState([]);

  useEffect(() => {
    // Populate initial values for each user in selectedUserData
    const initialUserValues = selectedUserData.map((user, index) => ({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      mobile: user.mobile,
      employeeId: user.employeeId,
      managerId: user.managerId,
      groups: user.groups,
    }));

    // Assuming setUserInitialValues is a state setter function
    setUserInitialValues(initialUserValues);
  }, [selectedUserData]);

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
    // const updatedUserData = selectedUserData.filter((_, i) => i !== index);
    // setSelectedUserData(updatedUserData);
  };

  const handleSubmit = async (index, values) => {
    const updateUserData = [...selectedUserData];
    updateUserData[index] = {
      firstName: values.firstName,
      lastName: values.lastName,
      username: values.username,
      email: values.email,
      mobile: values.mobile,
      employeeId: values.employeeId,
      managerId: values.managerId,
      groups: values.groups,
    };
    setSelectedUserData(updateUserData);
    console.log("Submitted - User Data Now:", selectedUserData);
  };

  const handleSubmitAll = async () => {
    const formikValuesArray = formikArray.map((formik) => formik.values);
    console.log("All Formik Values", formikValuesArray);
  };

  return (
    <React.Fragment>
      <div>
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
                  {getCurrentPageData()?.map((userData, index) => {
                    return (
                      <Formik
                        key={index}
                        initialValues={userInitialValues[index]}
                        validateOnBlur
                        validateOnChange={false}
                        validationSchema={schema}
                        enableReinitialize={true}
                      >
                        {({ errors, touched, setFieldValue, values }) => {
                          return (
                            <tr>
                              <td>
                                {Object.values(errors).some(
                                  (error) => error
                                ) ? (
                                  <i
                                    className="ri-error-warning-line text-danger fs-5"
                                    onClick={() => console.log(errors)}
                                  ></i>
                                ) : (
                                  <i className="ri-checkbox-circle-line text-success"></i>
                                )}
                              </td>
                              <td>
                                <Field
                                  name="firstName"
                                  type="text"
                                  placeholder="Enter First Name"
                                  className={`form-control ${
                                    errors.firstName && touched.firstName
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  disabled={editingRow !== index}
                                />
                                {errors.firstName && touched.firstName && (
                                  <FormFeedback typeof="invalid">
                                    {errors.firstName}
                                  </FormFeedback>
                                )}
                              </td>
                              <td>
                                <Field
                                  name="lastName"
                                  type="text"
                                  placeholder="Enter Last Name"
                                  className={`form-control ${
                                    errors.lastName && touched.lastName
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  disabled={editingRow !== index}
                                />
                                {errors.lastName && touched.lastName && (
                                  <FormFeedback typeof="invalid">
                                    {errors.lastName}
                                  </FormFeedback>
                                )}
                              </td>
                              <td>
                                <Field
                                  name="username"
                                  type="text"
                                  placeholder="Enter Username"
                                  className={`form-control ${
                                    errors.username && touched.username
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  disabled={editingRow !== index}
                                />
                                {errors.username && touched.username && (
                                  <FormFeedback typeof="invalid">
                                    {errors.username}
                                  </FormFeedback>
                                )}
                              </td>
                              <td>
                                <Field
                                  name="email"
                                  type="email"
                                  placeholder="Enter Email"
                                  className={`form-control ${
                                    errors.email && touched.email
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  disabled={editingRow !== index}
                                />
                                {errors.email && touched.email && (
                                  <FormFeedback typeof="invalid">
                                    {errors.email}
                                  </FormFeedback>
                                )}
                              </td>
                              <td>
                                <Field
                                  name="mobile"
                                  type="text"
                                  placeholder="Enter Mobile Number"
                                  className={`form-control ${
                                    errors.mobile && touched.mobile
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  disabled={editingRow !== index}
                                />
                                {errors.mobile && touched.mobile && (
                                  <FormFeedback typeof="invalid">
                                    {errors.mobile}
                                  </FormFeedback>
                                )}
                              </td>
                              <td>
                                <Field
                                  name="employeeId"
                                  type="text"
                                  placeholder="Enter Employee ID"
                                  className={`form-control ${
                                    errors.employeeId && touched.employeeId
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  disabled={editingRow !== index}
                                />
                                {errors.employeeId && touched.employeeId && (
                                  <FormFeedback typeof="invalid">
                                    {errors.employeeId}
                                  </FormFeedback>
                                )}
                              </td>
                              <td>
                                <Field
                                  name="managerId"
                                  as="select"
                                  className="form-select"
                                  style={{
                                    maxHeight: "100px",
                                    overflowY: "auto",
                                  }}
                                  disabled={editingRow !== index}
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
                              </td>
                              <td>
                                <Field
                                  name="groups"
                                  as="select"
                                  className="form-select"
                                  style={{
                                    maxHeight: "100px",
                                    overflowY: "auto",
                                  }}
                                  disabled={editingRow !== index}
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
                              </td>
                              <td>
                                <div className="d-flex justify-content-between gap-2">
                                  <Button
                                    className="btn btn-sm btn-custom-primary"
                                    type="button"
                                    onClick={() => {
                                      setEditingRow(index);
                                    }}
                                  >
                                    <i className="ri-pencil-line"></i>
                                  </Button>
                                  <Button
                                    className="btn btn-sm btn-custom-primary"
                                    type="submit"
                                    disabled={editingRow !== index}
                                    onClick={() => handleSubmit(index, formik.values)}
                                  >
                                    <i className="ri-save-line"></i>
                                  </Button>
                                  <Button
                                    className="btn btn-sm btn-danger"
                                    type="button"
                                    onClick={() => deleteUserData(index)}
                                  >
                                    <i className="ri-delete-back-2-line"></i>
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          );
                        }}
                      </Formik>
                    );
                  })}
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
        </Row>
      </div>
    </React.Fragment>
  );
}

export default ManageUsersTable;
