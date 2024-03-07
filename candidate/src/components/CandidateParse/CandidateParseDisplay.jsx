import React, { useState, useEffect } from "react";
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
} from "reactstrap";
import jsonData from "./data.json";
import ResumeEducationField from "./ResumeEducationField";
import ResumeCompanyField from "./ResumeCompanyField";
import ResumeFieldInput from "./ResumeFieldInput";
import ResumeFieldList from "./ResumeFieldList";

const CandidateParseDisplay = ({ resumeParseDataList }) => {
  const [resumeCount, setResumeCount] = useState(0);
  const [showEducationDetails, setShowEducationDetails] = useState(false);
  const [showCompaniesDetails, setShowCompaniesDetails] = useState(false);
  const [spokenLanguage, setSpokenLanguage] = useState("");
  const [spokenLanguages, setSpokenLanguages] = useState([]);
  //   const [resumeData, setResumeData] = useState(
  //     resumeParseDataList?.[0] ?? null
  //   );
  const [resumeData, setResumeData] = useState(jsonData[1]);

  return (
    <div>
      <Container fluid>
        <Row>
          <Col>
            <Card>
              {/* <CardHeader>
              <h3>Resume Parse</h3>
            </CardHeader> */}
              <CardBody>
                <Row>
                  <Col>
                    <div className="resume-main-section">
                      <div class="resume-personal-details-section">
                        {/* About me */}
                        <div class="resume-details-part">
                          <div className="d-flex align-items-center gap-2">
                            <h3>About Me</h3>
                          </div>
                          <p className="textarea-input" type="text">
                            {resumeData?.profile}
                          </p>
                        </div>

                        {/* Firstname and lastname */}
                        <div className="d-flex">
                          <div class="resume-details-part w-100">
                            <div className="d-flex align-items-center gap-2">
                              <h3>First Name</h3>
                            </div>
                            <p>{resumeData?.firstName || "-"}</p>
                          </div>
                          <div class="resume-details-part w-100">
                            <div className="d-flex align-items-center gap-2">
                              <h3>Last Name</h3>
                            </div>
                            <p>{resumeData?.lastName || "-"}</p>
                          </div>
                        </div>

                        {/* //Email and mobile */}
                        <div className="d-flex">
                          <div class="resume-details-part w-100">
                            <div className="d-flex align-items-center gap-2">
                              <h3>Email</h3>
                            </div>
                            <p>{resumeData?.email || "-"}</p>
                          </div>
                          <div class="resume-details-part w-100">
                            <div className="d-flex align-items-center gap-2">
                              <h3>Mobile</h3>
                            </div>
                            <div className="d-flex align-items-center justify-content-between gap-5">
                              <p>{resumeData?.mobile || "-"}</p>
                            </div>
                          </div>
                        </div>

                        {/* Gender and nationality */}
                        <div className="d-flex">
                          <div class="resume-details-part w-100">
                            <div className="d-flex align-items-center gap-2">
                              <h3>Gender</h3>
                            </div>
                            <p>{resumeData?.gender || "-"}</p>
                          </div>

                          <div class="resume-details-part w-100">
                            <div className="d-flex align-items-center gap-2">
                              <h3>Nationality</h3>
                            </div>
                            <div className="d-flex align-items-center justify-content-between gap-5">
                              <p>{resumeData?.nationality || "-"}</p>
                            </div>
                          </div>
                        </div>

                        {/* Current Location and Years of experience */}
                        <div className="d-flex">
                          <div class="resume-details-part w-100">
                            <div className="d-flex align-items-center gap-2">
                              <h3>Current Location</h3>
                            </div>
                            <div className="d-flex align-items-center justify-content-between gap-5">
                              <p>{resumeData?.currentLocation || "-"}</p>
                            </div>
                          </div>

                          <div class="resume-details-part w-100">
                            <div className="d-flex align-items-center gap-2">
                              <h3>Years of Experience</h3>
                            </div>
                            <div className="d-flex align-items-center justify-content-between gap-5">
                              <p>{resumeData?.yearsOfExperience || "-"}</p>
                            </div>
                          </div>
                        </div>

                        {/* Highest Qualification */}
                        <div class="resume-details-part">
                          <div className="d-flex align-items-center gap-2">
                            <h3 className="m-0">Highest Qualification</h3>
                            <button
                              className="btn btn-custom-primary btn-sm d-flex align-items-center gap-2"
                              onClick={() =>
                                setShowEducationDetails(!showEducationDetails)
                              }
                            >
                              <span> Show more</span>
                              {showEducationDetails ? (
                                <i
                                  className="ri-arrow-up-s-fill"
                                  style={{ fontSize: "1rem" }}
                                ></i>
                              ) : (
                                <i
                                  className="ri-arrow-down-s-fill"
                                  style={{ fontSize: "1rem" }}
                                ></i>
                              )}
                            </button>
                          </div>
                          <div className="d-flex align-items-center justify-content-between gap-5">
                            <p>{resumeData?.qualification || "-"}</p>
                          </div>
                        </div>
                        {showEducationDetails && (
                          //   <div className="companies-details-card mb-3">
                          <>
                            {resumeData &&
                              resumeData?.educationDetails?.length > 0 &&
                              resumeData?.educationDetails.map(
                                (education, index) => {
                                  return (
                                    <ResumeEducationField
                                      education={education}
                                      index={index}
                                    />
                                  );
                                }
                              )}
                          </>
                          //   </div>
                        )}

                        {/* Last Job Title */}
                        <div className="flex-form">
                          <div class="resume-details-part w-100">
                            <div className="d-flex align-items-center gap-2">
                              <h3>Last Job Title</h3>
                            </div>
                            <div className="d-flex align-items-center justify-content-between gap-5">
                              <p>{resumeData?.jobTitle || "-"}</p>
                            </div>
                          </div>
                        </div>

                        {/* Spoken Languages */}
                        <div class="resume-skills-section">
                          <div className="d-flex align-items-center gap-2">
                            <h3>Spoken Languages</h3>
                          </div>
                          <ResumeFieldList data={resumeData?.spokenLanguages} />
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {/* Companies */}
                    <div className="resume-main-section mt-4">
                      <div class="resume-companies-section mt-2">
                        <div className="d-flex align-items-center gap-2">
                          <h3 className="m-0">Companies</h3>
                          <button
                            className="btn btn-custom-primary btn-sm d-flex align-items-center gap-2"
                            onClick={() =>
                              setShowCompaniesDetails(!showCompaniesDetails)
                            }
                          >
                            Show more
                            {showCompaniesDetails ? (
                              <i
                                className="ri-arrow-up-s-fill"
                                style={{ fontSize: "1rem" }}
                              ></i>
                            ) : (
                              <i
                                className="ri-arrow-down-s-fill"
                                style={{ fontSize: "1rem" }}
                              ></i>
                            )}
                          </button>
                        </div>

                        {/* <div>
                          <div className="d-flex align-items-center gap-2 mt-2">
                            <span className="list-index">1)</span>
                            <input
                              disabled={!company1.isEditing}
                              className="fileName-input"
                              type="text"
                              value={company1.value}
                              onChange={(e) =>
                                setCompany1((prev) => ({
                                  ...prev,
                                  value: e.target.value,
                                }))
                              }
                            />
                            <AiFillEdit
                              className="edit-icons-md"
                              onClick={() =>
                                setCompany1((prev) => ({
                                  ...prev,
                                  isEditing: !prev.isEditing,
                                }))
                              }
                            />
                          </div>
                          <div className="d-flex align-items-center gap-2 mt-2">
                            <span className="list-index">2)</span>
                            <input
                              disabled={!company2.isEditing}
                              className="fileName-input"
                              type="text"
                              value={company2.value}
                              onChange={(e) =>
                                setCompany2((prev) => ({
                                  ...prev,
                                  value: e.target.value,
                                }))
                              }
                            />
                            <AiFillEdit
                              className="edit-icons-md"
                              onClick={() =>
                                setCompany2((prev) => ({
                                  ...prev,
                                  isEditing: !prev.isEditing,
                                }))
                              }
                            />
                          </div>
                          <div className="d-flex align-items-center gap-2 mt-2">
                            <span className="list-index">3)</span>
                            <input
                              disabled={!company3.isEditing}
                              className="fileName-input"
                              type="text"
                              value={company3.value}
                              onChange={(e) =>
                                setCompany3((prev) => ({
                                  ...prev,
                                  value: e.target.value,
                                }))
                              }
                            />
                            <AiFillEdit
                              className="edit-icons-md"
                              onClick={() =>
                                setCompany3((prev) => ({
                                  ...prev,
                                  isEditing: !prev.isEditing,
                                }))
                              }
                            />
                          </div>
                        </div> */}
                      </div>

                      {showCompaniesDetails && (
                        <div className="companies-details-card">
                          <div className="text-end mb-3">
                            <button
                              onClick={() =>
                                setCompaniesDetails((prev) => {
                                  return [
                                    {
                                      name: "",
                                      startDate: "",
                                      endDate: "",
                                      noOfYears: 0,
                                      jobTitle: "",
                                      responsibilities: [],
                                    },
                                    ...prev,
                                  ];
                                })
                              }
                              className="btn btn-secondary btn-sm"
                            >
                              + Add a company
                            </button>
                          </div>

                          {resumeData?.companiesDetails.length > 0 &&
                            resumeData?.companiesDetails.map((company, index) => {
                              return (
                                <ResumeCompanyField
                                  company={company}
                                  index={index}
                                />
                              );
                            })}
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CandidateParseDisplay;
