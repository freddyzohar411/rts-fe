import React, { useState, useEffect } from "react";
import {
  Table,
  Spinner,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Row,
  Col,
  Label,
} from "reactstrap";
import { getCandidateToJobMatchData } from "../../../../candidate/src/helpers/backend_helper";

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
          console.log("Error in getting match data", error);
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
        <p>
          <strong>Overall Match: </strong>
          <span
            style={{
              color: data.similarityScore > 0.7 ? "#4CAF50" : "#F44336",
            }}
          >
            {(data.similarityScore * 100).toFixed(2)}% 
          </span>
        </p>
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
            <span className="h5 fw-bold">Candidate Job Analysis</span>
          </div>
        </ModalHeader>
        <ModalBody className="bg-light" style={{ minHeight: "500px" }}>
          <div>
            <Row className="align-items-end mb-5">
              <div id="detailedScores" style={{ marginTop: "10px" }}>
                {matchData?.languageScoreDetails &&
                  matchData?.languageScoreDetails.length > 0 && (
                    <>
                      <h4>Language Matching:</h4>
                      <Table>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Job Attribute</th>
                            <th>Candidate Languages</th>
                            <th>Matching Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {matchData?.languageScoreDetails.map(
                            (detail, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{detail.job_attribute.trim()}</td>
                                <td>{detail.candidate_attribute.trim()}</td>
                                <td>{(detail.score * 100).toFixed(2)}%</td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </Table>
                    </>
                  )}
                {matchData?.skillsScoreDetails &&
                  matchData?.skillsScoreDetails.length > 0 && (
                    <>
                      <h4>Skills Matching:</h4>
                      <Table>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Job Attribute</th>
                            <th>Candidate Skills</th>
                            <th>Matching Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {matchData?.skillsScoreDetails.map((skill, index) => (
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
                    </>
                  )}
                {matchData?.jobTitleScoreDetails &&
                  matchData?.jobTitleScoreDetails.length > 0 && (
                    <>
                      <h4>Job Title Matching:</h4>
                      <Table>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Job Attribute</th>
                            <th>Candidate Job Titles</th>
                            <th>Matching Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {matchData?.jobTitleScoreDetails.map(
                            (detail, index) => (
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
                            )
                          )}
                        </tbody>
                      </Table>
                    </>
                  )}
                {matchData?.generalScoreDetails &&
                  matchData?.generalScoreDetails.length > 0 && (
                    <>
                      <h4>General Matching:</h4>
                      <Table>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th
                              style={{
                                overflowWrap: "break-word",
                                wordWrap: "break-word",
                              }}
                            >
                              Job Attribute
                            </th>
                            <th
                              style={{
                                overflowWrap: "break-word",
                                wordWrap: "break-word",
                              }}
                            >
                              Candidate Attribute
                            </th>
                            <th>Matching Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {matchData?.generalScoreDetails.map(
                            (detail, index) => (
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
                            )
                          )}
                        </tbody>
                      </Table>
                    </>
                  )}
                {matchData?.fieldOfStudyScoreDetails &&
                  matchData?.fieldOfStudyScoreDetails.length > 0 && (
                    <>
                      <h4>Field Of Study Matching:</h4>
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
                          {matchData?.fieldOfStudyScoreDetails.map(
                            (detail, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{detail.job_attribute.trim()}</td>
                                <td>{detail.candidate_attribute.trim()}</td>
                                <td>{(detail.score * 100).toFixed(2)}%</td>
                              </tr>
                            )
                          )}
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
