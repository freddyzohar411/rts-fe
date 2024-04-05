import React, { useState, useEffect, useRef } from "react";
import { Formik, Field } from "formik";
import {
  Input,
  Row,
  Col,
  Table,
  Button,
  Card,
  CardHeader,
  CardBody,
  FormFeedback,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import * as XLSX from "xlsx";
import SimpleBar from "simplebar-react";
import { fetchGroups } from "../../../../store/group/action";
import { fetchUsers } from "../../../../store/users/action";
import { useDispatch, useSelector } from "react-redux";
import { userDataHeader } from "./ValidateUsersData";
import { initialValues, schema } from "./constants";
import { toast } from "react-toastify";
import { truncate } from "@workspace/common/src/helpers/string_helper";
import { FormSelection } from "@workspace/common";

function ValidateUsers({ selectedFiles, onImportUsers }) {
  const dispatch = useDispatch();
  const allGroups = useSelector((state) => state?.GroupReducer?.groups);
  const allUsers = useSelector((state) => state?.UserReducer?.users);
  const fileInputRef = useRef(null);
  const [fileUserDataArray, setFileUserDataArray] = useState([]);
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [selectedFilesIndexes, setSelectedFilesIndexes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [editingRow, setEditingRow] = useState(-1);
  const [editedData, setEditedData] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [updatedSelectedFiles, setUpdatedSelectedFiles] = useState([]);

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    if (allUsers && allUsers?.length > 0) {
      setSelectedOption([
        {
          options: allUsers?.map((user) => ({
            label: `${user.firstName} (${user.mobile})`,
            value: user.id.toString(),
          })),
        },
      ]);
    }
  }, [allUsers]);

  useEffect(() => {
    if (selectedFiles && selectedFiles.length > 0) {
      const promises = selectedFiles.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            resolve(XLSX.utils.sheet_to_json(worksheet, { header: 0 }));
          };

          reader.readAsBinaryString(file);
        });
      });

      Promise.all(promises).then((fileUserDataArray) => {
        setFileUserDataArray(fileUserDataArray);
        setActiveFileIndex(0);
      });
    }
  }, [selectedFiles]);

  const handleFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const newUserArray = XLSX.utils.sheet_to_json(worksheet, { header: 0 });

        setFileUserDataArray([...fileUserDataArray, newUserArray]);
        setActiveFileIndex(fileUserDataArray.length);
      };

      reader.readAsBinaryString(file);
    }
  };

  const handleDeletedSelected = () => {
    // Filter out selected files that are not marked for deletion
    const updatedSelectedFiles = selectedFiles.filter(
      (_, index) => !selectedFilesIndexes.includes(index)
    );
    setSelectedFilesIndexes([]);
    setUpdatedSelectedFiles(updatedSelectedFiles);

    // Trigger the file input to read the updated files
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleGenerateImportedUsers = () => {
    // Combine data from selected files and apply changes
    const combinedData = selectedFiles.reduce((result, file, index) => {
      const fileData = fileUserDataArray[index];
      const editedDataForFile = editedData.slice(
        index * itemsPerPage,
        (index + 1) * itemsPerPage
      );

      const updatedData = fileData.map((user, userIndex) => {
        const updatedUser = { ...user };
        // Convert mobile and employeeId to strings
        updatedUser.employeeId = String(updatedUser.employeeId);
        updatedUser.mobile = String(updatedUser.mobile);
        // Check if groups is null, if so, assign an empty array
        updatedUser.groups = updatedUser.groups
          ? [parseInt(updatedUser.groups)]
          : [];
        // Check if managerId is null, if so, assign an empty array
        updatedUser.managerId = parseInt(updatedUser.managerId)
        if (editedDataForFile[userIndex]) {
          Object.assign(updatedUser, editedDataForFile[userIndex]);
        }
        return updatedUser;
      });

      result.push(updatedData);
      return result;
    }, []);

    // Flatten the combined data array
    const flattenedData = combinedData.flat();

    // Log or use the flattenedData array as needed
    onImportUsers(flattenedData);
  };

  const getUserIndex = (index) => {
    const start = (currentPage - 1) * itemsPerPage;
    return start + index;
  };

  const handleInputChange = (e, field, index) => {
    const value = e.target.value;
    setEditedData((prevData) => {
      const newData = [...prevData];
      newData[getUserIndex(index)] = {
        ...newData[getUserIndex(index)],
        [field]: value,
      };
      return newData;
    });
  };

  const handleEditing = (index) => {
    setEditingRow(index);
    const newData = [...editedData];
    newData[getUserIndex(index)] = {
      ...fileUserDataArray[activeFileIndex][getUserIndex(index)],
    };
    setEditedData(newData);
  };

  const handleEditingCancel = (index) => {
    setEditingRow(-1);
    const newData = [...editedData];
    newData[getUserIndex(index)] = {};
    setEditedData(newData);
  };

  const handleSave = (index) => {
    setEditingRow(-1);
    const newData = [...fileUserDataArray[activeFileIndex]];
    newData[getUserIndex(index)] = { ...editedData[getUserIndex(index)] };
    setFileUserDataArray((prevData) => {
      const updatedData = [...prevData];
      updatedData[activeFileIndex] = newData;
      return updatedData;
    });
    setEditedData([]);
    toast.success("User saved successfully!");
  };

  const confirmDelete = (index) => {
    let confirmation = confirm("Are you sure you want to delete this user?");
    if (confirmation) {
      handleDelete(index);
    }
  };

  const handleDelete = (index) => {
    const newData = [...fileUserDataArray[activeFileIndex]];
    newData.splice(getUserIndex(index), 1);
    setFileUserDataArray((prevData) => {
      const updatedData = [...prevData];
      updatedData[activeFileIndex] = newData;
      return updatedData;
    });
    toast.success("User deleted successfully.");
  };

  const getTotalPages = () => {
    if (fileUserDataArray[activeFileIndex]) {
      return Math.ceil(
        fileUserDataArray[activeFileIndex].length / itemsPerPage
      );
    }
    return 0;
  };

  const getCurrentPageData = () => {
    if (fileUserDataArray[activeFileIndex]) {
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return fileUserDataArray[activeFileIndex].slice(start, end);
    }
    return [];
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

  return (
    <React.Fragment>
      <hr />
      <Row className="mb-3">
        <Col lg={4} className="border-right border-custom-primary">
          <Card className="h-100">
            <CardHeader>
              <h6 className="fw-bold">Files</h6>
              <span className="text-muted">
                Files that you have uploaded will be shown here.
              </span>
            </CardHeader>
            <CardBody>
              <Row>
                <Col>
                  <Row className="mb-3">
                    <Col>
                      <div className="d-flex flex-row justify-content-between gap-1">
                        <div className="search-box w-100">
                          <Input placeholder="Search File.." type="text" />
                          <i className="search-icon ri-search-line"></i>
                        </div>

                        <Button
                          type="button"
                          onClick={() => handleDeletedSelected()}
                          className="btn btn-danger d-flex justify-content-center align-items-center"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </Button>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <Table className="table table-hover table-striped border-secondary align-middle table-nowrap rounded-3">
                        <thead
                          style={{
                            backgroundColor: "#B8DAF3",
                            color: "#000000",
                          }}
                        >
                          <tr>
                            <th>
                              <Input
                                type="checkbox"
                                className="form-check-input"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    const allIndexes = Array.from(
                                      { length: selectedFiles.length },
                                      (_, i) => i
                                    );
                                    setSelectedFilesIndexes(allIndexes);
                                  } else {
                                    setSelectedFilesIndexes([]);
                                  }
                                }}
                                checked={
                                  selectedFilesIndexes.length ===
                                  selectedFiles.length
                                }
                              />
                            </th>
                            <th>File Name</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedFiles.length > 0 && selectedFiles ? (
                            selectedFiles.map((file, index) => (
                              <tr key={index}>
                                <td>
                                  <Input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={selectedFilesIndexes.includes(
                                      index
                                    )}
                                    onChange={(e) => {
                                      const updatedIndexes = [
                                        ...selectedFilesIndexes,
                                      ];
                                      if (e.target.checked) {
                                        updatedIndexes.push(index);
                                      } else {
                                        const indexToRemove =
                                          updatedIndexes.indexOf(index);
                                        if (indexToRemove !== -1) {
                                          updatedIndexes.splice(
                                            indexToRemove,
                                            1
                                          );
                                        }
                                      }
                                      setSelectedFilesIndexes(updatedIndexes);
                                    }}
                                  />
                                </td>
                                <td>{truncate(file.name, 19)}</td>
                                <td>
                                  <Button
                                    className="btn btn-sm btn-custom-primary d-flex justify-content-center align-items-center"
                                    onClick={() => setActiveFileIndex(index)}
                                  >
                                    Show
                                  </Button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={3}>No valid files uploaded.</td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>

        <Col lg={8}>
          <Card className="h-100">
            <CardHeader>
              <h6 className="fw-bold">Manage Extracted User Data</h6>
              <span className="text-muted">
                User data will be extracted from the files into the following
                table.
              </span>
            </CardHeader>
            <CardBody>
              <Row className="mb-3">
                <Col>
                  <div className="search-box">
                    <Input placeholder="Search.." type="text" />
                    <i className="search-icon ri-search-line"></i>
                  </div>
                </Col>
              </Row>
              {/* Manage Users Table */}
              <Row className="mb-3">
                <Col>
                  <SimpleBar style={{ overflowX: "auto" }} autoHide={false}>
                    <Table
                      className="table table-hover table-striped border-secondary align-middle table-nowrap rounded-3"
                      id="customFormTable"
                    >
                      <thead
                        style={{ backgroundColor: "#B8DAF3", color: "#000000" }}
                      >
                        <tr>
                          {userDataHeader.map((header, index) => (
                            <th key={index} style={{ minWidth: "160px" }}>
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <Formik
                          initialValues={initialValues}
                          validateOnChange={false}
                          validateOnBlur
                          validationSchema={schema}
                          onSubmit={handleSave}
                        >
                          {({ errors, touched, setFieldValue, handleChange }) =>
                            getCurrentPageData().map((user, index) => (
                              <tr key={index}>
                                <td>
                                  <Field
                                    name="firstName"
                                    type="text"
                                    placeholder="Enter First Name"
                                    value={
                                      editingRow === index
                                        ? editedData[getUserIndex(index)]
                                            ?.firstName || ""
                                        : user.firstName || ""
                                    }
                                    disabled={editingRow !== index}
                                    className={`form-control ${
                                      editingRow === index &&
                                      errors.firstName &&
                                      touched.firstName
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                    onChange={(e) => {
                                      setFieldValue(
                                        "firstName",
                                        e.target.value,
                                        true
                                      );
                                      handleInputChange(e, "firstName", index);
                                    }}
                                  />
                                  {errors.firstName && touched.firstName && (
                                    <FormFeedback type="invalid">
                                      {errors.firstName}
                                    </FormFeedback>
                                  )}
                                </td>
                                <td>
                                  <Field
                                    name="lastName"
                                    type="text"
                                    placeholder="Enter Last Name"
                                    value={
                                      editingRow === index
                                        ? editedData[getUserIndex(index)]
                                            ?.lastName || ""
                                        : user.lastName || "N/A"
                                    }
                                    disabled={editingRow !== index}
                                    className={`form-control ${
                                      editingRow === index &&
                                      errors.lastName &&
                                      touched.lastName
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                    onChange={(e) => {
                                      setFieldValue(
                                        "lastName",
                                        e.target.value,
                                        true
                                      );
                                      handleInputChange(e, "lastName", index);
                                    }}
                                  />
                                  {errors.lastName && touched.lastName && (
                                    <FormFeedback type="invalid">
                                      {errors.lastName}
                                    </FormFeedback>
                                  )}
                                </td>
                                <td>
                                  <Field
                                    name="username"
                                    type="text"
                                    placeholder="Enter Username"
                                    value={
                                      editingRow === index
                                        ? editedData[getUserIndex(index)]
                                            ?.username || ""
                                        : user.username || "N/A"
                                    }
                                    disabled={editingRow !== index}
                                    className={`form-control ${
                                      editingRow === index &&
                                      errors.username &&
                                      touched.username
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                    onChange={(e) => {
                                      setFieldValue(
                                        "username",
                                        e.target.value,
                                        true
                                      );
                                      handleInputChange(e, "username", index);
                                    }}
                                  />
                                  {errors.username && touched.username && (
                                    <FormFeedback type="invalid">
                                      {errors.username}
                                    </FormFeedback>
                                  )}
                                </td>
                                <td>
                                  <Field
                                    name="email"
                                    type="email"
                                    placeholder="Enter Email"
                                    value={
                                      editingRow === index
                                        ? editedData[getUserIndex(index)]
                                            ?.email || ""
                                        : user.email || "N/A"
                                    }
                                    disabled={editingRow !== index}
                                    className={`form-control ${
                                      editingRow === index &&
                                      errors.email &&
                                      touched.email
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                    onChange={(e) => {
                                      setFieldValue(
                                        "email",
                                        e.target.value,
                                        true
                                      );
                                      handleInputChange(e, "email", index);
                                    }}
                                  />
                                  {errors.email && touched.email && (
                                    <FormFeedback type="invalid">
                                      {errors.email}
                                    </FormFeedback>
                                  )}
                                </td>
                                <td>
                                  <Field
                                    name="mobile"
                                    type="text"
                                    placeholder="Enter Mobile"
                                    value={
                                      editingRow === index
                                        ? editedData[getUserIndex(index)]
                                            ?.mobile || ""
                                        : user.mobile || "N/A"
                                    }
                                    disabled={editingRow !== index}
                                    className={`form-control ${
                                      editingRow === index &&
                                      errors.mobile &&
                                      touched.mobile
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                    onChange={(e) => {
                                      setFieldValue(
                                        "mobile",
                                        e.target.value,
                                        true
                                      );
                                      handleInputChange(e, "mobile", index);
                                    }}
                                  />
                                  {errors.mobile && touched.mobile && (
                                    <FormFeedback type="invalid">
                                      {errors.mobile}
                                    </FormFeedback>
                                  )}
                                </td>
                                <td>
                                  <Field
                                    name="employeeId"
                                    type="text"
                                    placeholder="Enter Employee ID"
                                    value={
                                      editingRow === index
                                        ? editedData[getUserIndex(index)]
                                            ?.employeeId || ""
                                        : user.employeeId || "N/A"
                                    }
                                    disabled={editingRow !== index}
                                    className={`form-control ${
                                      editingRow === index &&
                                      errors.employeeId &&
                                      touched.employeeId
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                    onChange={(e) => {
                                      setFieldValue(
                                        "employeeId",
                                        e.target.value,
                                        true
                                      );
                                      handleInputChange(e, "employeeId", index);
                                    }}
                                  />
                                  {errors.employeeId && touched.employeeId && (
                                    <FormFeedback type="invalid">
                                      {errors.employeeId}
                                    </FormFeedback>
                                  )}
                                </td>
                                <td>
                                  <Field
                                    name="managerId"
                                    type="email"
                                    placeholder="Enter Manager Email"
                                    value={
                                      editingRow === index
                                        ? editedData[getUserIndex(index)]
                                            ?.managerId || ""
                                        : user.managerId || "N/A"
                                    }
                                    disabled={editingRow !== index}
                                    className={`form-control ${
                                      editingRow === index &&
                                      errors.managerId &&
                                      touched.managerId
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                    onChange={(e) => {
                                      setFieldValue(
                                        "managerId",
                                        e.target.value,
                                        true
                                      );
                                      handleInputChange(e, "managerId", index);
                                    }}
                                  />
                                  {errors.managerId && touched.managerId && (
                                    <FormFeedback type="invalid">
                                      {errors?.[getUserIndex(index)]?.managerId}
                                    </FormFeedback>
                                  )}
                                </td>

                                <td>
                                  <Field
                                    as="select"
                                    className={`form-select ${
                                      editingRow === index &&
                                      errors?.[getUserIndex(index)]?.groups &&
                                      touched?.[getUserIndex(index)]?.groups
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                    name="groups"
                                    disabled={editingRow !== index}
                                    value={
                                      editingRow === index
                                        ? editedData[getUserIndex(index)]
                                            ?.groups || ""
                                        : user.groups || ""
                                    }
                                    onChange={(e) => {
                                      setFieldValue(
                                        "groups",
                                        e.target.value,
                                        true
                                      );
                                      handleInputChange(e, "groups", index);
                                    }}
                                  >
                                    <option value="">Select Group</option>
                                    {allGroups.map((group, groupIndex) => (
                                      <option
                                        key={groupIndex}
                                        value={group?.id}
                                        selected={
                                          editingRow === index &&
                                          editedData[index]?.groups ===
                                            group?.userGroupName
                                        }
                                      >
                                        {group?.userGroupName}
                                      </option>
                                    ))}
                                  </Field>

                                  {errors.groups && touched.groups && (
                                    <FormFeedback type="invalid">
                                      {errors.groups}
                                    </FormFeedback>
                                  )}
                                </td>

                                <td>
                                  <div className="d-flex flex-row gap-2">
                                    <Button
                                      type="button"
                                      className="btn btn-custom-primary d-flex justify-content-center align-items-center"
                                      style={{
                                        width: "30px",
                                        height: "30px",
                                      }}
                                      onClick={() => {
                                        handleEditing(index);
                                        editingRow === index &&
                                          handleEditingCancel(index);
                                      }}
                                    >
                                      <i className="ri-pencil-line"></i>
                                    </Button>
                                    <button
                                      type="submit"
                                      className="btn btn-custom-primary d-flex justify-content-center align-items-center"
                                      style={{
                                        width: "30px",
                                        height: "30px",
                                      }}
                                      onClick={() => handleSave(index)}
                                      disabled={editingRow !== index}
                                    >
                                      <i className="ri-save-line"></i>
                                    </button>
                                    <Button
                                      type="button"
                                      className="btn btn-danger d-flex justify-content-center align-items-center"
                                      style={{
                                        width: "30px",
                                        height: "30px",
                                      }}
                                      onClick={() => confirmDelete(index)}
                                    >
                                      <i className="ri-delete-back-2-line"></i>
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          }
                        </Formik>
                      </tbody>
                    </Table>
                  </SimpleBar>
                </Col>
              </Row>
              {/* Pagination */}
              <Row className="mb-3">
                <Col>
                  <div className="d-flex justify-content-between align-items-baseline">
                    <Input
                      type="select"
                      className="form-select w-auto"
                      onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                    </Input>
                    <Pagination>
                      <PaginationItem disabled={currentPage === 1}>
                        <PaginationLink
                          onClick={handlePrev}
                          disabled={editingRow > -1}
                        >
                          Prev
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink active>{currentPage}</PaginationLink>
                      </PaginationItem>
                      <PaginationItem
                        disabled={
                          currentPage === getTotalPages() || editingRow > -1
                        }
                      >
                        <PaginationLink onClick={handleNext}>
                          Next
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="d-flex justify-content-end">
                  <Button
                    className="btn btn-custom-primary"
                    onClick={handleGenerateImportedUsers}
                  >
                    Generate Imported Users
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      {/* XLSX Reader */}
      <Input
        hidden
        type="file"
        accept=".xls, .xlsx"
        onChange={handleFile}
        className="mt-4"
        ref={fileInputRef}
      />
    </React.Fragment>
  );
}

export default ValidateUsers;
