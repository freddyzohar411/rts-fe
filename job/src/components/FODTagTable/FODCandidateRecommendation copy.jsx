import React, { useState } from "react";
import { Table } from "reactstrap";

const FODCandidateRecommendation = ({ data }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="candidate-score-details">
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
          className="btn btn-sm btn-custom-primary px-3 py-0"
          // style={{ marginTop: "10px" }}
        >
          {showDetails ? "Hide" : "View More"}
        </button>
      </div>

      {showDetails && (
        <div id="detailedScores" style={{ marginTop: "10px" }}>
          {/* {data.languageScoreDetails &&
            data.languageScoreDetails.length > 0 && (
              <>
                <h4>Language Matching:</h4>
                <ul>
                  {data.languageScoreDetails.map((detail, index) => (
                    <li key={index}>
                      {detail.job_attribute.trim()} vs{" "}
                      {detail.candidate_attribute.trim()}:{" "}
                      {(detail.score * 100).toFixed(2)}%
                    </li>
                  ))}
                </ul>
              </>
            )} */}
          {data.languageScoreDetails &&
            data.languageScoreDetails.length > 0 && (
              <>
                <h4>Language Matching:</h4>
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Job Attribute</th>
                      <th>Candidate Attribute</th>
                      <th>Matching Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.languageScoreDetails.map((detail, index) => (
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

          {/* {data.skillsScoreDetails && data.skillsScoreDetails.length > 0 && (
            <>
              <h4>Skills Matching:</h4>
              <ul>
                {data.skillsScoreDetails.map((skill, index) => (
                  <li key={index}>
                    {skill.job_attribute.trim()} vs{" "}
                    {skill.candidate_attribute.trim()}:{" "}
                    {(skill.score * 100).toFixed(2)}%
                  </li>
                ))}
              </ul>
            </>
          )} */}
          {data.skillsScoreDetails && data.skillsScoreDetails.length > 0 && (
            <>
              <h4>Skills Matching:</h4>
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Job Attribute</th>
                    <th>Candidate Attribute</th>
                    <th>Matching Score</th>
                  </tr>
                </thead>
                <tbody>
                  {data.skillsScoreDetails.map((skill, index) => (
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
          {/* {data.jobTitleScoreDetails &&
            data.jobTitleScoreDetails.length > 0 && (
              <>
                <h4>Job Title Matching:</h4>
                <div>
                  {data.jobTitleScoreDetails.map((detail, index) => (
                    <div key={index}>
                      {detail.job_attribute.trim()} vs{" "}
                      {detail.candidate_attribute.trim()}:{" "}
                      {(detail.score * 100).toFixed(2)}%
                    </div>
                  ))}
                </div>
              </>
            )} */}

          {data.jobTitleScoreDetails &&
            data.jobTitleScoreDetails.length > 0 && (
              <>
                <h4>Job Title Matching:</h4>
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Job Attribute</th>
                      <th>Candidate Attribute</th>
                      <th>Matching Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.jobTitleScoreDetails.map((detail, index) => (
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
              </>
            )}
          {/* {data.generalScoreDetails && data.generalScoreDetails.length > 0 && (
            <>
              <h4>General Matching:</h4>
              <div>
                {data.generalScoreDetails.map((detail, index) => (
                  <div key={index}> {`${index+1}) `}
                    {detail.job_attribute.trim()} vs{" "}
                    {detail.candidate_attribute.trim()}:{" "}
                    {(detail.score * 100).toFixed(2)}%
                  </div>
                ))}
              </div>
            </>
          )} */}
          {data.generalScoreDetails && data.generalScoreDetails.length > 0 && (
            <>
              <h4>General Matching:</h4>
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th
                      style={{
                        // maxWidth: "150px",
                        overflowWrap: "break-word",
                        wordWrap: "break-word",
                      }}
                    >
                      Job Attribute
                    </th>
                    <th
                      style={{
                        // maxWidth: "150px",
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
                  {data.generalScoreDetails.map((detail, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td
                        style={{
                          // maxWidth: "150px",
                          overflowWrap: "break-word",
                          wordWrap: "break-word",
                        }}
                      >
                        {detail.job_attribute.trim()}
                      </td>
                      <td
                        style={{
                          // maxWidth: "150px",
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
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FODCandidateRecommendation;
