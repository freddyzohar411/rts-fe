import React, { useState, useEffect, useRef } from "react";
import {
  Input,
  Row,
  Col,
  Table,
  Button,
  Card,
  CardHeader,
  CardBody,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import * as XLSX from "xlsx";
import SimpleBar from "simplebar-react";
import { useNavigate } from "react-router-dom";
import { fetchGroups } from "../../../../store/group/action";
import { useDispatch, useSelector } from "react-redux";
import { userDataHeader } from "./ValidateUsersData";
import { initialValues, schema } from "./constants";
import { toast } from "react-toastify";
import { truncate } from "@workspace/common/src/helpers/string_helper";

function ValidateUsers({ selectedFiles, onImportUsers }) {
  const dispatch = useDispatch();
  const allGroups = useSelector((state) => state?.GroupReducer?.groups);
  const fileInputRef = useRef(null);
  const [fileUserDataArray, setFileUserDataArray] = useState([]);
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [selectedFilesIndexes, setSelectedFilesIndexes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [editingRow, setEditingRow] = useState(-1);
  const [editedData, setEditedData] = useState([]);
  const [importedUsers, setImportedUsers] = useState([]);
  const [updatedSelectedFiles, setUpdatedSelectedFiles] = useState([]);

  useEffect(() => {
    dispatch(fetchGroups());
  }, []);

  // File Handling - Start

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
        return editedDataForFile[userIndex]
          ? { ...user, ...editedDataForFile[userIndex] }
          : user;
      });

      result.push(updatedData);
      return result;
    }, []);

    // Flatten the combined data array
    const flattenedData = combinedData.flat();

    // Log or use the flattenedData array as needed
    console.log("Generated Imported Users:", flattenedData);
    onImportUsers(flattenedData);
  };

  // File Handling - End

  // Editing User - Start

  // Get Index of User
  const getUserIndex = (index) => {
    const start = (currentPage - 1) * itemsPerPage;
    return start + index;
  };

  const handleEditing = (index) => {
    setEditingRow(index);
    const newData = [...editedData];
    newData[getUserIndex(index)] = {
      ...fileUserDataArray[activeFileIndex][getUserIndex(index)],
    };
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

  // Editing User - End

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

  // Pagination - Start

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
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

  // Pagination - End

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
                                        ...selectedFileIndexes,
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
                                      setSelectedFileIndexes(updatedIndexes);
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
                        {getCurrentPageData().map((user, index) => (
                          <tr key={index}>
                            <td>
                              <Input
                                type="text"
                                className="form-control"
                                value={
                                  editingRow === index
                                    ? editedData[index]?.firstName || ""
                                    : user.firstName || "N/A"
                                }
                                disabled={editingRow !== index}
                                onChange={(e) =>
                                  handleInputChange(e, "firstName", index)
                                }
                              />
                            </td>
                            <td>
                              <Input
                                type="text"
                                className="form-control"
                                value={
                                  editingRow === index
                                    ? editedData[index]?.lastName || ""
                                    : user.lastName || "N/A"
                                }
                                disabled={editingRow !== index}
                                onChange={(e) =>
                                  handleInputChange(e, "lastName", index)
                                }
                              />
                            </td>
                            <td>
                              <Input
                                type="text"
                                className="form-control"
                                value={
                                  editingRow === index
                                    ? editedData[index]?.username || ""
                                    : user.username || "N/A"
                                }
                                disabled={editingRow !== index}
                                onChange={(e) =>
                                  handleInputChange(e, "username", index)
                                }
                              />
                            </td>
                            <td>
                              <Input
                                type="email"
                                className="form-control"
                                value={
                                  editingRow === index
                                    ? editedData[index]?.email || ""
                                    : user.email || "N/A"
                                }
                                disabled={editingRow !== index}
                                onChange={(e) =>
                                  handleInputChange(e, "email", index)
                                }
                              />
                            </td>
                            <td>
                              <Input
                                type="text"
                                className="form-control"
                                value={
                                  editingRow === index
                                    ? editedData[index]?.mobile || ""
                                    : user.mobile || "N/A"
                                }
                                disabled={editingRow !== index}
                                onChange={(e) =>
                                  handleInputChange(e, "mobile", index)
                                }
                              />
                            </td>
                            <td>
                              <Input
                                type="text"
                                className="form-control"
                                value={
                                  editingRow === index
                                    ? editedData[index]?.employeeId || ""
                                    : user.employeeId || "N/A"
                                }
                                disabled={editingRow !== index}
                                onChange={(e) =>
                                  handleInputChange(e, "employeeId", index)
                                }
                              />
                            </td>
                            <td>
                              <Input
                                type="email"
                                className="form-control"
                                value={
                                  editingRow === index
                                    ? editedData[index]?.managerEmail || ""
                                    : user.managerEmail || "N/A"
                                }
                                disabled={editingRow !== index}
                                onChange={(e) =>
                                  handleInputChange(e, "managerEmail", index)
                                }
                              />
                            </td>
                            <td>
                              <Input
                                type="select"
                                className="form-select"
                                value={
                                  editingRow === index
                                    ? editedData[index]?.groupName || ""
                                    : user.groupName || "N/A"
                                }
                                disabled={editingRow !== index}
                                onChange={(e) =>
                                  handleInputChange(e, "groupName", index)
                                }
                              >
                                <option value="">Select Group</option>
                                {allGroups.map((group, index) => (
                                  <option
                                    key={index}
                                    value={group?.userGroupName}
                                  >
                                    {group?.userGroupName}
                                  </option>
                                ))}
                              </Input>
                            </td>
                            <td>
                              <div className="d-flex flex-row gap-2">
                                <Button
                                  className="btn btn-custom-primary d-flex justify-content-center align-items-center"
                                  style={{ width: "30px", height: "30px" }}
                                  onClick={() => handleEditing(index)}
                                >
                                  <i className="ri-pencil-line"></i>
                                </Button>
                                <Button
                                  className="btn btn-custom-primary d-flex justify-content-center align-items-center"
                                  style={{ width: "30px", height: "30px" }}
                                  onClick={() => handleSave(index)}
                                >
                                  <i className="ri-save-line"></i>
                                </Button>
                                <Button
                                  className="btn btn-danger d-flex justify-content-center align-items-center"
                                  style={{ width: "30px", height: "30px" }}
                                  onClick={() => confirmDelete(index)}
                                >
                                  <i className="ri-delete-back-2-line"></i>
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
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
                        <PaginationLink onClick={handlePrev}>
                          Prev
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink active>{currentPage}</PaginationLink>
                      </PaginationItem>
                      <PaginationItem
                        disabled={currentPage === getTotalPages()}
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

      {/* <Row>
        <Col>
          <Card>
            <CardHeader>
              <h6 className="fw-bold">Preview Imported Users</h6>
              <span className="text-muted">
                Preview all imported user accounts.
              </span>
            </CardHeader>
            <CardBody>
              
              <Row><Col><span></span></Col></Row>
            </CardBody>
          </Card>
        </Col>
      </Row> */}
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
