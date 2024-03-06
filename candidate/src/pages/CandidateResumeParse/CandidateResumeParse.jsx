import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
} from "reactstrap";
import { DeleteCustomModal } from "@workspace/common";
import { useDropzone } from "react-dropzone";
// import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill } from "react-icons/bs";
// import { BsFillArrowRightSquareFill, BsFillArrowLeftSquareFill } from "react-icons/bs";

const CandidateResumeParse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModalSchema, setShowModalSchema] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [fileObjects, setFileObjects] = useState([]);
  const [totalUploadCount, setTotalUploadCount] = useState(0);
  const [currentUploadCount, setCurrentUploadCount] = useState(0);
  const [isValidAttachment, setIsValidAttachment] = useState(false);
  const [fileUrl, setFileUrl] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    console.log("Accedpted Files: ", acceptedFiles);
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

    // PDF
    if (files) {
      setFileUrlFunc(0, 1, files);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // Confirm Reset Template
  const confirmResetTemplate = () => {
    setFileObjects([]);
    setCurrentUploadCount(0);
    setTotalUploadCount(0);
    setFileUrl("");
    s;
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
    console.log("fileObjects", fileObjects);
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

  const nextCount = () => {
    if (currentUploadCount < totalUploadCount) {
      setCurrentUploadCount((prev) => prev + 1);
      setFileUrlFunc(currentUploadCount + 1, 2);
    }
  };

  const prevCount = () => {
    if (currentUploadCount > 0) {
      setCurrentUploadCount((prev) => prev - 1);
      setFileUrlFunc(currentUploadCount - 1, 2);
    }
  };

  const checkFileExtension = (file) => {
    // Check if file extension is correct
    const fileType = file.name.split(".").pop().toLowerCase();
    // console.log(fileType)
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

  const deleteFile = (index) => {
    setFileObjects(fileObjects.filter((file, i) => i !== index));
    setCurrentUploadCount(0);

    if (fileObjects.length === 1) {
      setFileUrl("");
      setTotalUploadCount(0);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <DeleteCustomModal
          isOpen={isResetModalOpen}
          setIsOpen={setIsResetModalOpen}
          confirmDelete={confirmResetTemplate}
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
                  <div className="d-flex flex-column">
                    <span className="fw-bold fs-5 text-dark">
                      Resume Parser
                    </span>
                    <span className="fw-medium fs-6 text-dark">
                      Begin by parsing resumes
                    </span>
                  </div>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col
                      md={6}
                      className="p-5"
                      style={{ borderRight: "1px solid #B8B8B8" }}
                    >
                      <div
                        {...getRootProps()}
                        className="d-flex flex-column justify-content-center align-items-center cursor-pointer"
                        style={{ border: "2px dashed grey", height: "375px" }}
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
                                here, or <strong>click</strong> to select resumes.
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
                    <Col md={6} className="px-5">
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
                            style={{ fontSize: "1rem", marginTop: "50%" }}
                          >
                            File cannot be displayed
                          </div>
                        ))}
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <div className="d-flex flex-row justify-content-between">
                    <Link to="/settings/templates">
                      <Button type="button" className="btn btn-custom-primary">
                        Back
                      </Button>
                    </Link>
                    <div className="d-flex flex-row gap-2">
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
                        onClick={() => setIsResetModalOpen(true)}
                      >
                        Reset
                      </Button>
                      <Button
                        type="submit"
                        className="btn btn-custom-primary"
                        disabled={
                          !isValidAttachment || fileObjects.length === 0
                        }
                        // onClick={() => formikRef.current.formik.submitForm()}
                      >
                        Parse Resumes
                      </Button>
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
                <span className="h5 fw-bold">Template Preview</span>
              </div>
            </ModalHeader>
            <ModalBody className="bg-light" style={{ minHeight: "500px" }}>
              <div>
                <h1>World</h1>
              </div>
            </ModalBody>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CandidateResumeParse;
