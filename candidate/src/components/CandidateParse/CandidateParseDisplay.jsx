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
// import jsonData from "./data.json";
import ResumeEducationField from "./ResumeEducationField";
import ResumeCompanyField from "./ResumeCompanyField";
import ResumeFieldInput from "./ResumeFieldInput";
import ResumeFieldList from "./ResumeFieldList";
import * as CandidateParsingHelper from "../../helpers/candidate_parsing_helper";

const CandidateParseDisplay = ({ resumeParseDataList }) => {
  const [resumeCount, setResumeCount] = useState(0);
  const [showEducationDetails, setShowEducationDetails] = useState(false);
  const [showCompaniesDetails, setShowCompaniesDetails] = useState(false);
  const [spokenLanguage, setSpokenLanguage] = useState("");
  const [spokenLanguages, setSpokenLanguages] = useState([]);
  const [sortedCompanies, setSortedCompanies] = useState([]);
  const [resumeData, setResumeData] = useState(
    resumeParseDataList?.[0] ?? null
  );
  // const [resumeData, setResumeData] = useState(jsonData[0]);

  // Sort Companies by endDate
  const sortCompaniesByEndDate = (companies, sort = "asc") => {
    if (sort === "desc") {
      return companies.sort((a, b) => {
        const aArr = a.endDate.split("/");
        const bArr = b.endDate.split("/");
        return new Date(bArr[1], bArr[0] - 1) - new Date(aArr[1], aArr[0] - 1);
      });
    } else {
      return companies.sort((a, b) => {
        const aArr = a.endDate.split("/");
        const bArr = b.endDate.split("/");
        return new Date(aArr[1], aArr[0] - 1) - new Date(bArr[1], bArr[0] - 1);
      });
    }
  };

  useEffect(() => {
    if (resumeData) {
      setSortedCompanies(
        sortCompaniesByEndDate(resumeData.companiesDetails, "desc")
      );
    }
  }, [resumeData]);

  useEffect(() => {
    if (resumeParseDataList) {
      setResumeData(resumeParseDataList?.[resumeCount]);
    }
  }, [resumeCount]);


  return (
    <>
      {resumeParseDataList?.length > 0 ? (
        <div>
          <Container fluid>
            <Row>
              <Col>
                <div className="d-flex align-items-center gap-3 justify-content-center">
                  {resumeCount < 1 ? (
                    <i
                      className=" ri-arrow-left-circle-fill"
                      style={{ fontSize: "40px", opacity: "70%" }}
                    ></i>
                  ) : (
                    <i
                      className="ri-arrow-left-circle-fill"
                      onClick={() => setResumeCount((prev) => prev - 1)}
                      style={{ cursor: "pointer", fontSize: "40px" }}
                    ></i>
                  )}
                  <div className="count" style={{ fontSize: "1rem" }}>
                    {resumeCount + 1}
                  </div>
                  {resumeCount === resumeParseDataList?.length - 1 ? (
                    <i
                      className=" ri-arrow-right-circle-fill"
                      style={{ fontSize: "40px", opacity: "70%" }}
                    ></i>
                  ) : (
                    <i
                      className="ri-arrow-right-circle-fill"
                      onClick={() => setResumeCount((prev) => prev + 1)}
                      style={{ cursor: "pointer", fontSize: "40px" }}
                    ></i>
                  )}
                </div>
                <Card>
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
                                  {/* <p>
                                    {(
                                      CandidateParsingHelper.calculateUniqueWorkMonths(
                                        sortedCompanies
                                      ) / 12
                                    ).toFixed(1) || "-"}
                                    {"  "}
                                    {` (${CandidateParsingHelper.convertMonthsToString(
                                      CandidateParsingHelper.calculateUniqueWorkMonths(
                                        sortedCompanies
                                      )
                                    )})`}
                                  </p> */}
                                   <p>
                                    {`${CandidateParsingHelper.convertMonthsToString(
                                      CandidateParsingHelper.calculateUniqueWorkMonths(
                                        sortedCompanies
                                      )
                                    )}`}
                                  </p>
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
                                    setShowEducationDetails(
                                      !showEducationDetails
                                    )
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
                                <p>{resumeData?.education || "-"}</p>
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
                              <ResumeFieldList
                                data={resumeData?.spokenLanguages}
                              />
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>

                    {/* Companies Experience */}
                    <Row>
                      <Col>
                        {/* Companies */}
                        <div className="resume-main-section mt-4">
                          <div class="resume-companies-section mt-2 mb-3">
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

                            <div className="mt-3">
                              <span>
                                {sortedCompanies
                                  ?.map((company) => company.name)
                                  .join(", ")}
                              </span>
                            </div>
                          </div>

                          {showCompaniesDetails && (
                            <>
                              {resumeData?.companiesDetails.length > 0 &&
                                sortedCompanies?.map((company, index) => {
                                  return (
                                    <ResumeCompanyField
                                      company={company}
                                      index={index}
                                    />
                                  );
                                })}
                            </>
                          )}
                        </div>
                      </Col>
                    </Row>

                    {/* Primary Skills */}
                    <Row>
                      <Col>
                        <div class="resume-skills-section">
                          <div className="d-flex align-items-center gap-2">
                            <h3>Primary Skills</h3>
                          </div>
                          <ResumeFieldList data={resumeData?.primarySkills} />
                        </div>
                      </Col>
                    </Row>

                    {/* Secondary Skills */}
                    <Row>
                      <Col>
                        <div class="resume-skills-section mt-4">
                          <div className="d-flex align-items-center gap-2">
                            <h3>Secondary Skills</h3>
                          </div>
                          <ResumeFieldList data={resumeData?.secondarySkills} />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        <p>No Parsed Data...</p>
      )}
    </>
  );
};

export default CandidateParseDisplay;
