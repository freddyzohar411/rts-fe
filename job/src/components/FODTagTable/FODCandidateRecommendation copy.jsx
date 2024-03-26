import React, { useState } from "react";

const FODCandidateRecommendation = ({ data }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="candidate-score-details">
      <div className="summary-scores">
        <p>
          <strong>Overall Match: </strong>
          <span
            style={{ color: data.computedScore > 0.8 ? "#4CAF50" : "#F44336" }}
          >
            {(data.computedScore * 100).toFixed(2)}%
          </span>
        </p>
        {/* <p>
          <strong>Similarity: </strong>
          {(data.similarityScore * 100).toFixed(2)}%
        </p>
        <p>
          <strong>Qualification: </strong>
          {(data.qualificationScore * 100).toFixed(2)}%
        </p>
        <p>
          <strong>Language Fit: </strong>
          {(data.languageScore * 100).toFixed(2)}%
        </p> */}
        {/* <p>
          <strong>Skills Match: </strong>
          {(data.skillsScore * 100).toFixed(2)}%
        </p> */}
        {/* <p>
          <strong>Job Title Relevance: </strong>
          {(data.jobTitleScore * 100).toFixed(2)}%
        </p> */}
      </div>
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="btn btn-sm btn-custom-primary px-3 py-0"
        // style={{ marginTop: "10px" }}
      >
        {showDetails ? "Hide Details" : "View Detailed Scores"}
      </button>
      {showDetails && (
        <div id="detailedScores" style={{ marginTop: "10px" }}>
          {data.languageScoreDetails &&
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
            )}
          {data.skillsScoreDetails && data.skillsScoreDetails.length > 0 && (
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
          )}
          { data.jobTitleScoreDetails && data.jobTitleScoreDetails.length > 0 &&
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
          }
        </div>
      )}
    </div>
  );
};

export default FODCandidateRecommendation;
