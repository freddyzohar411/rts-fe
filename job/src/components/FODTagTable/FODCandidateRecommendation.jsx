import React, { useState, useEffect } from "react";
import { Table, Spinner, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { getCandidateToJobMatchData } from "../../../../candidate/src/helpers/backend_helper";
import { toast } from "react-toastify";

const FODCandidateRecommendation = ({ candidateId, jobId, data }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showDetails && candidateId && jobId && !matchData) {
      setLoading(true);
      getCandidateToJobMatchData(candidateId, jobId)
        .then((response) => {
          setMatchData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          toast.error("Failed to fetch candidate matching data.");
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [showDetails]);

  return (
    <div>
      <div className="d-flex flex-column">
        <div className="mb-1">
          <strong>Overall Match: </strong>
          <span
            style={{
              color: data.similarityScore > 0.7 ? "#4CAF50" : "#F44336",
            }}
          >
            {(data.similarityScore * 100).toFixed(2)}%
          </span>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="btn btn-sm btn-custom-primary px-3 py-1"
        >
          {loading ? <Spinner size="sm" /> : "View Details"}
        </button>
      </div>
      <Modal
        isOpen={showDetails && !loading}
        closeModal={() => {
          setShowDetails(false);
        }}
        centered
        scrollable
        size="xl"
      >
        <ModalHeader
          className="bg-primary pb-3"
          toggle={() => setShowDetails(false)}
        >
          <div className="d-flex flex-column text-dark">
            <span className="h5 fw-bold">
              Candidate Job Analysis ({` ${data?.firstName} ${data?.lastName} `}
              )
            </span>
          </div>
        </ModalHeader>
        <ModalBody className="bg-light" style={{ minHeight: "500px" }}>
          <div>
            <Row className="align-items-end mb-5">
              <div id="detailedScores" style={{ marginTop: "10px" }}>
                {matchData?.generalScoreDetails &&
                  matchData?.generalScoreDetails.length > 0 && (
                    <div className="mb-4">
                      <h4 className="fw-bold">
                        Candidate-Job Compatibility Highlights:
                      </h4>
                      <Table>
                        <thead>
                          <tr>
                            <th
                              style={{
                                width: "5%",
                              }}
                            >
                              #
                            </th>
                            <th
                              style={{
                                overflowWrap: "break-word",
                                wordWrap: "break-word",
                                width: "40%",
                              }}
                            >
                              Job Attribute
                            </th>
                            <th
                              style={{
                                overflowWrap: "break-word",
                                wordWrap: "break-word",
                                width: "40%",
                              }}
                            >
                              Candidate Attribute
                            </th>
                            <th
                              style={{
                                whiteSpace:
                                  "nowrap" /* Prevents text from wrapping */,
                                overflow:
                                  "hidden" /* Keeps the content within the cell */,
                                width: "15%",
                              }}
                            >
                              Matching Score
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {matchData?.generalScoreDetails
                            .sort((a, b) => b.score - a.score)
                            .map((detail, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td
                                  style={{
                                    overflowWrap: "break-word",
                                    wordWrap: "break-word",
                                  }}
                                >
                                  {detail.job_attribute.trim()}
                                </td>
                                <td
                                  style={{
                                    overflowWrap: "break-word",
                                    wordWrap: "break-word",
                                  }}
                                >
                                  {detail.candidate_attribute.trim()}
                                </td>
                                <td>{(detail.score * 100).toFixed(2)}%</td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    </div>
                  )}
                {matchData?.skillsScoreDetails &&
                  matchData?.skillsScoreDetails.length > 0 && (
                    <div className="mb-4">
                      <h4 className="fw-bold">Skills Matching:</h4>
                      <Table>
                        <thead>
                          <tr>
                            <th style={{ width: "5%" }}>#</th>
                            <th style={{ width: "40%" }}>Job Attribute</th>
                            <th style={{ width: "40%" }}>Candidate Skills</th>
                            <th style={{ width: "15%" }}>Matching Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {matchData?.skillsScoreDetails
                            .sort((a, b) => b.score - a.score)
                            .map((skill, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td
                                  style={{
                                    overflowWrap: "break-word",
                                    wordWrap: "break-word",
                                  }}
                                >
                                  {skill.job_attribute.trim()}
                                </td>
                                <td
                                  style={{
                                    overflowWrap: "break-word",
                                    wordWrap: "break-word",
                                  }}
                                >
                                  {skill.candidate_attribute.trim()}
                                </td>
                                <td>{(skill.score * 100).toFixed(2)}%</td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    </div>
                  )}
                {matchData?.jobTitleScoreDetails &&
                  matchData?.jobTitleScoreDetails.length > 0 && (
                    <div className="mb-4">
                      <h4 className="fw-bold">Job Title Matching:</h4>
                      <Table>
                        <thead>
                          <tr>
                            <th style={{ width: "5%" }}>#</th>
                            <th style={{ width: "40%" }}>Job Attribute</th>
                            <th style={{ width: "40%" }}>
                              Candidate Job Titles
                            </th>
                            <th style={{ width: "15%" }}>Matching Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {matchData?.jobTitleScoreDetails
                            .sort((a, b) => b.score - a.score)
                            .map((detail, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td
                                  style={{
                                    overflowWrap: "break-word",
                                    wordWrap: "break-word",
                                  }}
                                >
                                  {detail.job_attribute.trim()}
                                </td>
                                <td
                                  style={{
                                    overflowWrap: "break-word",
                                    wordWrap: "break-word",
                                  }}
                                >
                                  {detail.candidate_attribute.trim()}
                                </td>
                                <td>{(detail.score * 100).toFixed(2)}%</td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    </div>
                  )}
                {matchData?.fieldOfStudyScoreDetails &&
                  matchData?.fieldOfStudyScoreDetails.length > 0 && (
                    <div className="mb-4">
                      <h4 className="fw-bold">Field Of Study Matching:</h4>
                      <Table>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Job Attribute</th>
                            <th>Candidate Field of Study</th>
                            <th>Matching Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {matchData?.fieldOfStudyScoreDetails
                            .sort((a, b) => b.score - a.score)
                            .map((detail, index) => (
                              <tr key={index}>
                                <td style={{ width: "5%" }}>{index + 1}</td>
                                <td style={{ width: "40%" }}>
                                  {detail.job_attribute.trim()}
                                </td>
                                <td style={{ width: "40%" }}>
                                  {detail.candidate_attribute.trim()}
                                </td>
                                <td style={{ width: "15%" }}>
                                  {(detail.score * 100).toFixed(2)}%
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    </div>
                  )}
                {matchData?.languageScoreDetails &&
                  matchData?.languageScoreDetails.length > 0 && (
                    <>
                      <h4 className="fw-bold">Language Matching:</h4>
                      <Table>
                        <thead>
                          <tr>
                            <th style={{ width: "5%" }}>#</th>
                            <th style={{ width: "40%" }}>Job Attribute</th>
                            <th style={{ width: "40%" }}>
                              Candidate Languages
                            </th>
                            <th style={{ width: "15%" }}>Matching Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {matchData?.languageScoreDetails
                            .sort((a, b) => b.score - a.score)
                            .map((detail, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{detail.job_attribute.trim()}</td>
                                <td>{detail.candidate_attribute.trim()}</td>
                                <td>{(detail.score * 100).toFixed(2)}%</td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    </>
                  )}
              </div>
            </Row>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default FODCandidateRecommendation;
