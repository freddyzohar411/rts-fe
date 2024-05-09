import React, { useState, useEffect, useRef } from "react";
import "./ResumeCompanyField.scss";
import * as CandidateParsingHelper from "../../helpers/candidate_parsing_helper";

const ResumeCompanyField = ({ company, index }) => {
  const [companyDetail, setCompanyDetail] = useState({
    name: company.name,
    startDate: company.startDate,
    endDate: company.endDate,
    noOfYears: parseFloat(company.noOfYears).toFixed(1),
    noOfMonths: company.noOfMonths,
    jobTitle: company.jobTitle,
    responsibilities: company.responsibilities,
  });

  // Set company detail state when company props changes
  useEffect(() => {
    if (company) {
      setCompanyDetail({
        name: company.name,
        startDate: company.startDate,
        endDate: company.endDate,
        noOfYears: parseFloat(company.noOfYears).toFixed(1),
        noOfMonths: company.noOfMonths,
        jobTitle: company.jobTitle,
        responsibilities: company.responsibilities,
      });
    }
  }, [company]);

  return (
    <div className="companies-details-single">
      <div className="d-flex justify-content-between align-items-center">
        <p className="company-name">
          <span>{index + 1}) Company Name: </span>
          <span>{companyDetail?.name}</span>
        </p>
      </div>

      <div className="companies-details-card-details">
        {/* Designation */}
        <p className="d-flex gap-1">
          <span style={{ marginRight: "10px", fontWeight: "500" }}>
            Designation:
          </span>
          <span>{companyDetail?.jobTitle}</span>
        </p>

        {/* Start Date */}
        <p className="d-flex align-items-center gap-2">
          <span style={{ marginRight: "10px", fontWeight: "500" }}>
            Start Date:
          </span>
          <span>{companyDetail?.startDate}</span>
        </p>

        {/* End Date */}
        <p className="d-flex align-items-center gap-2">
          <span style={{ marginRight: "10px", fontWeight: "500" }}>
            End Date:
          </span>
          <span>{companyDetail?.endDate}</span>
        </p>

        {/* No of Months */}
        <p className="d-flex gap-2 align-items-center">
          <span style={{ marginRight: "10px", fontWeight: "500" }}>
            No of Months:{" "}
          </span>
          <span>{`${CandidateParsingHelper.computeMonthsDiff(
            companyDetail?.startDate,
            companyDetail?.endDate
          )}`}</span>
        </p>

        {/* Period */}
        <p className="d-flex gap-2 align-items-center">
          <span style={{ marginRight: "10px", fontWeight: "500" }}>
            Period:{" "}
          </span>
          <span>
            {CandidateParsingHelper.convertMonthsToString(
              CandidateParsingHelper.computeMonthsDiff(
                companyDetail?.startDate,
                companyDetail?.endDate
              )
            )}
          </span>
        </p>

        <div className="d-flex align-items-center gap-2">
          <p className="mt-2 text-decoration-underline mb-2">
            Responsibilities
          </p>
        </div>
        <ul className="px-5" style={{ listStyleType: "circle" }}>
          {companyDetail.responsibilities.map((responsibility, i) => (
            <li className="d-flex gap-2 m-1">
              <span className="bullet">&#8226;</span>
              <span>{responsibility}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResumeCompanyField;

// export default React.memo(ResumeCompanyField);
