import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Spinner,
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { DeleteCustomModal } from "@workspace/common";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import CandidateParseDisplay from "../../components/CandidateParse/CandidateParseDisplay";
import Select from "react-select";
// import jsonData from "../../components/CandidateParse/data.json";
import useImportCandidate from "./useImportCandidate";
import CandidateMappingTable from "../../components/CandidateParse/CandidateMapping/CandidateMappingTable";
import { setParseAndImportLoading } from "../../store/candidate/action";
import { parseResumeMulti } from "../../helpers/backend_helper";
import jsonData from "../../components/CandidateParse/data2.json";

const CandidateResumeParse = () => {
  const dispatch = useDispatch();
  const [showModalSchema, setShowModalSchema] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [fileObjects, setFileObjects] = useState([]);
  const [totalUploadCount, setTotalUploadCount] = useState(0);
  const [currentUploadCount, setCurrentUploadCount] = useState(0);
  const [isValidAttachment, setIsValidAttachment] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [parseData, setParseData] = useState(jsonData ?? []);
  // const [parseData, setParseData] = useState([]);
  const [tab, setTab] = useState(1);
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([
    { value: "v1", label: "v1" },
    { value: "v2", label: "v2" },
  ]);
  const [selectedOptions, setSelectedOptions] = useState({
    value: "v2",
    label: "v2",
  });
  const prevTab = useRef(null);
  const [importSelectModalShow, setImportSelectModalShow] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { importLoading, importMultiLoading, parseAndImportLoading } =
    useSelector((state) => state.CandidateReducer);

  const { importCandidate, setCandidateMappingData } = useImportCandidate();

  useEffect(() => {
    const initialCheckedItems = new Array(parseData.length).fill(false);
    setCheckedItems(initialCheckedItems);
    setFilteredData(
      parseData.filter((item, index) => initialCheckedItems[index])
    );
  }, [parseData]);

  useEffect(() => {
    // Filter parseData based on checkedItems and update filteredData
    const newFilteredData = parseData.filter(
      (item, index) => checkedItems[index]
    );
    setFilteredData(newFilteredData);
  }, [checkedItems, parseData]);

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    const newCheckedItems = parseData.map(() => isChecked);
    setCheckedItems(newCheckedItems);
  };

  const handleSingleCheck = (checked, index) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = checked;
    setCheckedItems(updatedCheckedItems);

    // Update selectAll based on whether all items are checked
    setSelectAll(updatedCheckedItems.every(Boolean));
  };

  const handleInputChange = (inputValue) => {
    setSearch(inputValue);
  };

  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  /**
   * Dropzone function to handle file upload
   */
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    setCurrentUploadCount(0);
    setTotalUploadCount(0);
    setFileObjects([]);
    setIsValidAttachment(false);

    const files = acceptedFiles;
    // check if file exist
    if (files.length === 0) {
      // toast.error("Please select a file before uploading.");
      return;
    }

    // Check all files extension
    for (let i = 0; i < files.length; i++) {
      if (!checkFileExtension(files[i])) return;
    }

    setIsValidAttachment(true);
    setTotalUploadCount(files.length);

    // Set file object
    setFileObj(files);

  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // Confirm Reset Template
  const confirmClearResumeParse = () => {
    setFileObjects([]);
    setCurrentUploadCount(0);
    setTotalUploadCount(0);
    setFileUrl("");
    setIsResetModalOpen(false);
  };

  const setFileUrlFunc = (index, type, files = null) => {
    const ext = fileObjects[index].name.split(".").pop().toLowerCase();
    // If docx then ignore
    if (ext === "docx" || ext === "doc") {
      // Clear the reader
      setFileUrl("");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setFileUrl(reader.result);
    };
    if (type === 2) {
      reader.readAsDataURL(fileObjects[index].file);
    } else {
      reader.readAsDataURL(files[0]);
    }
  };

  useEffect(() => {
    if (fileObjects.length > 0) {
      setTotalUploadCount(fileObjects.length);
      setFileUrlFunc(0, 2);
    }
  }, [fileObjects]);

  // Move to next file to display
  const nextCount = () => {
    if (currentUploadCount < totalUploadCount) {
      setCurrentUploadCount((prev) => prev + 1);
      setFileUrlFunc(currentUploadCount + 1, 2);
    }
  };

  // Move to previous file to display
  const prevCount = () => {
    if (currentUploadCount > 0) {
      setCurrentUploadCount((prev) => prev - 1);
      setFileUrlFunc(currentUploadCount - 1, 2);
    }
  };

  // Check if file extension is correct (doc, docx or pdf). If not, display error message
  const checkFileExtension = (file) => {
    // Check if file extension is correct
    const fileType = file.name.split(".").pop().toLowerCase();
    if (fileType !== "pdf" && fileType !== "doc" && fileType !== "docx") {
      toast.error("Only PDF, DOC, and DOCX file types are allowed.");
      return false;
    }
    return true;
  };

  const setFileObj = (files) => {
    const fileObjStore = [];
    for (let i = 0; i < files.length; i++) {
      const newFileObj = {
        name: files[i].name,
        file: files[i],
        nameNoExt: files[i].name.split(".").slice(0, -1).join("."),
      };
      fileObjStore.push(newFileObj);
    }
    setFileObjects(fileObjStore);
  };

  // Delete file that was selected for parsing
  const deleteFile = (index) => {
    setFileObjects(fileObjects.filter((file, i) => i !== index));
    setCurrentUploadCount(0);

    if (fileObjects.length === 1) {
      setFileUrl("");
      setTotalUploadCount(0);
    }
  };

  /**
   * Handle submit of parsing. If isDirect is true, it will import the candidate
   * @param {*} isDirect
   * @returns
   */
  const handleResumeSubmit = async (isDirect = false) => {
    if (fileObjects.length === 0) {
      toast.error("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();

    for (let i = 0; i < fileObjects.length; i++) {
      formData.append(`resumes[${i}].file`, fileObjects[i].file);
      formData.append(`resumes[${i}].fileName`, fileObjects[i].nameNoExt);
    }

    // Set Version
    if (selectedOptions?.value) {
      formData.append("parseVer", selectedOptions?.value);
    } else {
      formData.append("parseVer", "v1");
    }
    if (!isDirect) {
      setLoading(true);
    } else {
      dispatch(setParseAndImportLoading(true));
    }

    try {
      const result = await parseResumeMulti(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setLoading(false);

      const fetchParsedData = convertFlattenArray(result.data);
      setParseData(fetchParsedData);
      if (isDirect) {
        importCandidate(fetchParsedData, fileObjects);
      } else {
        setTab(2);
      }
    } catch (error) {
      setLoading(false);
      dispatch(setParseAndImportLoading(false));
      toast.error("Error parsing resumes. Please try again.");
    }
  };

  // Flatten the array to 1 level deep array
  const convertFlattenArray = (arr) => {
    return arr.map((item) => {
      return item.data;
    });
  };

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
    control: (base, state) => ({
      ...base,
      // state.isFocused can display different borderColor if you need it
      borderColor: state.isFocused ? "#8AAED6" : "#8AAED6",
      // overwrittes hover style
      "&:hover": {
        borderColor: state.isFocused ? "#8AAED6" : "#8AAED6",
      },
      backgroundColor: state.isDisabled ? "#EFF2F7" : base.backgroundColor,
      minWidth: "100%",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: state.isDisabled ? "black !important" : provided.color,
    }),
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <DeleteCustomModal
          isOpen={isResetModalOpen}
          setIsOpen={setIsResetModalOpen}
          confirmDelete={confirmClearResumeParse}
          header="Remove all files"
          deleteText={"Are you sure you would like to remove all files?"}
        />
        <Container fluid>
          <Row>
            <Col>
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="/candidates">Candidates</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  <Link to="/candidates/new">Candidates New</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>Parse Resume</BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardHeader className="bg-header">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex flex-column">
                      <span className="fw-bold fs-5 text-dark">
                        Resume Parser
                      </span>
                      <span className="fw-medium fs-6 text-dark">
                        Begin by parsing resumes
                      </span>
                    </div>
                    <div>
                      <Button
                        className="btn btn-secondary"
                        onClick={() => {
                          setTab(3);
                          prevTab.current = tab;
                        }}
                      >
                        Mapping Setting
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  {tab === 1 && (
                    <Row>
                      <Col
                        md={5}
                        className="px-5"
                        style={{
                          borderRight: "1px solid #B8B8B8",
                          paddingTop: "10px",
                        }}
                      >
                        <div className="d-flex gap-3 align-items-center mb-4">
                          <label
                            style={{
                              fontSize: "1rem",
                              fontWeight: "500",
                              margin: 0,
                            }}
                          >
                            Parsing Version
                          </label>
                          <Select
                            className="flex-grow-1"
                            styles={customStyles}
                            value={selectedOptions}
                            onChange={handleChange}
                            onInputChange={handleInputChange}
                            inputValue={search}
                            menuShouldScrollIntoView={false}
                            isClearable
                            isSearchable
                            placeholder="Select parsing version"
                            options={options}
                          />
                        </div>
                        <div
                          {...getRootProps()}
                          className="d-flex flex-column justify-content-center align-items-center cursor-pointer"
                          style={{ border: "2px dashed grey", height: "275px" }}
                        >
                          <input {...getInputProps()} />
                          {totalUploadCount === 0 && (
                            <div>
                              <i
                                className="ri-file-upload-line"
                                style={{ fontSize: "4rem" }}
                              ></i>
                            </div>
                          )}
                          {totalUploadCount === 0 &&
                            (isDragActive ? (
                              <p>Drop the resummes here ...</p>
                            ) : (
                              <div className="text-center">
                                <p className="mb-0">
                                  <strong>Drag 'n' drop</strong> some resumes
                                  here, or <strong>click</strong> to select
                                  resumes.
                                </p>
                                <p>
                                  Only <strong>PDF, DOC, and DOCX</strong> files
                                  are allowed
                                </p>
                              </div>
                            ))}
                          <div className="text-center">
                            {totalUploadCount > 0 && (
                              <span
                                style={{ fontSize: "1.2rem" }}
                              >{`${totalUploadCount} files attached`}</span>
                            )}
                          </div>
                        </div>
                        <div
                          className="mt-3"
                          style={{ height: "150px", overflow: "auto" }}
                        >
                          {fileObjects.length > 0 && (
                            <div className="mt-3">
                              {fileObjects.map((fileobj, index) => {
                                return (
                                  <div
                                    className="d-flex align-items-center gap-2 mb-1"
                                    style={{ fontSize: "1rem" }}
                                  >
                                    <i
                                      onClick={() => deleteFile(index)}
                                      className="ri-delete-bin-line cursor-pointer"
                                    ></i>
                                    <span>{fileobj.name}</span>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </Col>
                      <Col md={7} className="px-5">
                        {fileObjects.length > 0 && (
                          <div className="d-flex justify-content-center align-items-center gap-5 arrows">
                            {currentUploadCount < 1 ? (
                              <i
                                className=" ri-arrow-left-circle-fill"
                                style={{ fontSize: "30px", opacity: "70%" }}
                              ></i>
                            ) : (
                              <i
                                className="ri-arrow-left-circle-fill"
                                onClick={prevCount}
                                style={{ cursor: "pointer", fontSize: "30px" }}
                              ></i>
                            )}
                            <div className="count" style={{ fontSize: "1rem" }}>
                              {currentUploadCount + 1}
                            </div>
                            {currentUploadCount === totalUploadCount - 1 ? (
                              <i
                                className=" ri-arrow-right-circle-fill"
                                style={{ fontSize: "30px", opacity: "70%" }}
                              ></i>
                            ) : (
                              <i
                                className="ri-arrow-right-circle-fill"
                                onClick={nextCount}
                                style={{ cursor: "pointer", fontSize: "30px" }}
                              ></i>
                            )}
                          </div>
                        )}
                        {fileObjects.length > 0 &&
                          (fileUrl !== "" ? (
                            <object
                              data={fileUrl}
                              type="application/pdf"
                              width="100%"
                              height="575px"
                            ></object>
                          ) : (
                            <div
                              className="text-center"
                              style={{ fontSize: "1rem", marginTop: "30%" }}
                            >
                              File cannot be displayed
                            </div>
                          ))}
                      </Col>
                    </Row>
                  )}
                  {tab === 2 && (
                    <CandidateParseDisplay resumeParseDataList={parseData} />
                  )}
                  {tab === 3 && (
                    <CandidateMappingTable
                      setCandidateMappingData={setCandidateMappingData}
                    />
                  )}
                </CardBody>
                <CardFooter>
                  <div className="d-flex flex-row justify-content-between">
                    <Link to="/candidates/new">
                      <Button type="button" className="btn btn-custom-primary">
                        Back
                      </Button>
                    </Link>
                    <div className="d-flex flex-row gap-2">
                      {tab === 1 && (
                        <>
                          <Button
                            type="button"
                            className="btn btn-custom-primary"
                            onClick={() => setShowModalSchema(true)}
                          >
                            Preview
                          </Button>
                          <Button
                            type="button"
                            className="btn btn-custom-primary"
                            onClick={() => setTab(2)}
                          >
                            View Parse Data
                          </Button>
                          <Button
                            type="button"
                            className="btn btn-custom-primary"
                            onClick={() => setIsResetModalOpen(true)}
                          >
                            Reset
                          </Button>

                          {/* //Old buttons */}
                          {/* <Button
                            type="button"
                            className="btn btn-custom-primary"
                            disabled={
                              !isValidAttachment || fileObjects.length === 0
                            }
                            onClick={() => handleResumeSubmit(false)}
                          >
                            {loading ? (
                              <Spinner size="sm"></Spinner>
                            ) : (
                              "Parse Resumes"
                            )}
                          </Button>
                          <Button
                            type="button"
                            className="btn btn-custom-primary"
                            disabled={
                              !isValidAttachment || fileObjects.length === 0
                            }
                            onClick={() => handleResumeSubmit(true)}
                          >
                            {parseAndImportLoading ? (
                              <Spinner size="sm"></Spinner>
                            ) : (
                              "Parse Resumes & Import"
                            )}
                          </Button> */}

                          <UncontrolledDropdown className="btn-group">
                            <Button
                              type="submit"
                              className="btn btn-custom-primary"
                              onClick={() => handleResumeSubmit(true)}
                              disabled={parseAndImportLoading || loading}
                            >
                              {parseAndImportLoading || loading ? (
                                <Spinner size="sm"></Spinner>
                              ) : (
                                "Parse and Import"
                              )}
                            </Button>
                            <DropdownToggle
                              tag="button"
                              type="button"
                              className="btn btn-custom-primary"
                              split
                              disabled={parseAndImportLoading || loading}
                            >
                              <span className="visually-hidden">
                                Toggle Dropdown
                              </span>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end">
                              {/* Start here */}
                              <li>
                                <DropdownItem
                                  onClick={() => {
                                    handleResumeSubmit(false);
                                  }}
                                >
                                  Parse and View
                                </DropdownItem>
                              </li>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </>
                      )}
                      {tab === 2 && (
                        <>
                          <Button
                            type="button"
                            className="btn btn-custom-primary"
                            onClick={() => setTab(1)}
                          >
                            Back to Upload
                          </Button>
                          <Button
                            type="button"
                            className="btn btn-custom-primary"
                            // onClick={() => importCandidate(parseData)}
                            onClick={() => {
                              if (parseData.length === 0) {
                                toast.error("No data to import");
                                return;
                              }
                              if (parseData.length === 1) {
                                importCandidate(parseData, fileObjects);
                              } else {
                                setImportSelectModalShow(true);
                              }
                            }}
                          >
                            {importLoading ? (
                              <Spinner size="sm"></Spinner>
                            ) : (
                              "Import Candidates"
                            )}
                          </Button>
                        </>
                      )}
                      {tab === 3 && (
                        <>
                          <Button
                            type="button"
                            className="btn btn-custom-primary"
                            onClick={() => setTab(prevTab.current ?? 1)}
                          >
                            Back to Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>

          <Modal
            isOpen={showModalSchema}
            closeModal={() => {
              setFormBuilderType(null);
              setFormBuilderUpdateData(null);
              setShowModalSchema(false);
            }}
            centered
            scrollable
            size="xl"
          >
            <ModalHeader
              className="bg-primary pb-3"
              toggle={() => setShowModalSchema(!showModalSchema)}
            >
              <div className="d-flex flex-column text-dark">
                <span className="h5 fw-bold">Parse Data JSON Preview</span>
              </div>
            </ModalHeader>
            <ModalBody className="bg-light" style={{ minHeight: "500px" }}>
              <div>
                <pre style={{ fontSize: "1.1rem" }}>
                  {JSON.stringify(parseData, null, 2)}
                </pre>
              </div>
            </ModalBody>
          </Modal>

          <Modal
            isOpen={importSelectModalShow}
            closeModal={() => {
              setImportSelectModalShow(false);
            }}
            centered
            scrollable
            size="xl"
          >
            <ModalHeader
              className="bg-primary pb-3"
              toggle={() => setImportSelectModalShow(!importSelectModalShow)}
            >
              <div className="d-flex flex-column text-dark">
                <span className="h5 fw-bold">Select candidate to import</span>
              </div>
            </ModalHeader>
            <ModalBody className="bg-light" style={{ minHeight: "500px" }}>
              <div>
                <Table>
                  <thead>
                    <tr>
                      <th>Resume</th>
                      <th>
                        <input
                          type="checkbox"
                          name="import"
                          checked={selectAll}
                          onChange={handleSelectAll}
                        />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {parseData.map((item, index) => (
                      <tr key={index}>
                        <td>
                          {item?.firstName} {item?.lastName}
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            name="import"
                            value={item?.fileName}
                            checked={checkedItems[index]}
                            onChange={(e) =>
                              handleSingleCheck(e.target.checked, index)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="d-flex justify-content-end">
                  <Button
                    className="btn btn-custom-primary"
                    onClick={() => {
                      if (filteredData.length === 0) {
                        toast.error("No data to import");
                        return;
                      }
                      importCandidate(filteredData, fileObjects);
                    }}
                  >
                    {importLoading || importMultiLoading ? (
                      <Spinner size="sm"></Spinner>
                    ) : (
                      "Import Candidates"
                    )}
                  </Button>
                </div>
              </div>
            </ModalBody>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CandidateResumeParse;
