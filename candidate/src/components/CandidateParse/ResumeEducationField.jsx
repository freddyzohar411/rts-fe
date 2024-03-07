import React, { useState, useEffect, useRef } from "react";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlineDown } from "react-icons/ai";
import { AiOutlineUp } from "react-icons/ai";

import "./ResumeEducationField.scss";

const ResumeEducationField = ({
  education,
  index,
}) => {
  const [editable, setEditable] = useState(false);

  const [educationDetail, setEducationDetail] = useState({
    name: education.name,
    startDate: education.startDate,
    endDate: education.endDate,
    noOfYears: parseFloat(education.noOfYears).toFixed(1),
    noOfMonths: education.noOfMonths,
    qualification: education.qualification,
  });

  // Set education detail state when education props changes
  useEffect(() => {
    if (education) {
      setEducationDetail({
        name: education.name,
        startDate: education.startDate,
        endDate: education.endDate,
        noOfYears: parseFloat(education.noOfYears).toFixed(1),
        noOfMonths: education.noOfMonths,
        qualification: education.qualification,
      });
    }
  }, [education]); // Add "company" as a dependency here

  const computeDuration = (startDate, endDate) => {
    if (startDate == null || endDate == null) {
      return 0;
    }
    // Parse the input dates as Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    //if start date is after end date return 0
    if (start > end) {
      return 0;
    }

    // Calculate the difference in years and months
    let yearsDiff = end.getFullYear() - start.getFullYear();
    let monthsDiff = end.getMonth() - start.getMonth();

    // Adjust for negative month difference (end date is earlier in the year than start date)
    if (monthsDiff < 0) {
      yearsDiff--;
      monthsDiff += 12;
    }

    // Return the result as an object
    // return {
    //   years: yearsDiff,
    //   months: monthsDiff,
    // };

    return (yearsDiff + monthsDiff / 12).toFixed(1);
  };

  const computeNoOfYears = (startDate, endDate) => {
    const Years = computeDuration(startDate, endDate);
    setEducationDetail((prev) => ({ ...prev, noOfYears: Years }));
  };

  function convertMonthsToString(totalMonths) {
    // Calculate the years and remaining months
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    // Create and return the formatted string
    return `${years} Yrs and ${months} months`;
  }

  return (
    <div className="companies-details-single">
      <div className="d-flex align-items-center">
        <p className="company-name">
          <span style={{marginRight:"10px"}}>{index + 1}) Institution Name:</span>
          <span>{educationDetail?.name}</span>
        </p>
      </div>

      <div className="companies-details-card-details">
        {/* Designation */}
        <p className="d-flex gap-1">
          <span style={{marginRight:"10px", fontWeight:"500"}}> Qualification:</span>
          <span>{educationDetail?.qualification}</span>
        </p>

        {/* Start Date */}
        <p className="d-flex align-items-center gap-1 mt-1">
          <span style={{marginRight:"10px", fontWeight:"500"}}>Start Date:</span>
          <span>{educationDetail?.startDate}</span>
        </p>

        {/* End Date */}
        <p className="d-flex align-items-center gap-1 mt-1">
          <span style={{marginRight:"10px", fontWeight:"500"}}>End Date:</span>
          <span>{educationDetail?.endDate}</span>
        </p>

        {/* No of Years */}
        {/* <p className="d-flex gap-1 align-items-center">
          <span> No of Years: </span>
          <span>{educationDetail?.noOfYears}</span>
        </p> */}

         {/* No of Months */}
         <p className="d-flex gap-1 align-items-center mt-1">
          <span style={{marginRight:"10px", fontWeight:"500"}}> No of Months: </span>
          <span>{educationDetail?.noOfMonths}</span>
        </p>

          {/* Period */}
          <p className="d-flex gap-1 align-items-center mt-1">
          <span style={{marginRight:"10px", fontWeight:"500"}}> Period: </span>
          <span>{convertMonthsToString(educationDetail?.noOfMonths)}</span>
        </p>
      </div>
    </div>
  );
};

export default ResumeEducationField;
