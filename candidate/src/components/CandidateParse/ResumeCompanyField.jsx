import React, { useState, useEffect, useRef } from "react";
import { AiFillEdit } from "react-icons/ai";
import "./ResumeCompanyField.scss";
import { AiFillDelete } from "react-icons/ai";
import { RiAddCircleFill } from "react-icons/ri";
import { AiOutlineDown } from "react-icons/ai";
import { AiOutlineUp } from "react-icons/ai";

const monthTable = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "July",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

const ResumeCompanyField = ({ company, index }) => {
  // Convert date format from  Nov 2023 to 2023-11
  console.log("I Render");
  console.log("Company", company);

  const convertDateFormat = (date) => {
    const dateArray = date.split("/");
    const dateOut = dateArray[1] + "-" + dateArray[0];
    return dateOut;
  };

  // Convert date format from 2023`-11 to 11/2023
  const convertDateFormatForSave = (date) => {
    const dateArray2 = date.split("-");
    const dateOut2 = dateArray2[1] + "/" + dateArray2[0];
    return dateOut2;
  };

  const [editable, setEditable] = useState(false);
  const [addNew, setAddNew] = useState(1);

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
  }, [company]); // Add "company" as a dependency here

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
    setCompanyDetail((prev) => ({ ...prev, noOfYears: Years }));
  };

  const handleEditResponsibility = (e, index) => {
    const value = e.target.value;
    const newResponsibilities = [...companyDetail.responsibilities];
    newResponsibilities[index] = value;
    setCompanyDetail((prev) => ({
      ...prev,
      responsibilities: newResponsibilities,
    }));
  };

  const deleteResponsibility = (index) => {
    const newResponsibilities = companyDetail.responsibilities.filter(
      (res, i) => i !== index
    );
    setCompanyDetail((prev) => ({
      ...prev,
      responsibilities: newResponsibilities,
    }));
  };

  const addResponsibility = () => {
    setCompanyDetail((prev) => ({
      ...prev,
      responsibilities: [...prev.responsibilities, ""],
    }));
    setAddNew(addNew + 1);
  };

  useEffect(() => {
    // Replace 'targetElementId' with the ID of the element you want to scroll to.
    const id = `last-responsibility-${index}`;
    const targetElement = document.getElementById(id);
    console.log(targetElement);
    if (targetElement == null) return;

    // Scroll to the target element.
    targetElement.scrollIntoView({
      behavior: "smooth", // Optional: Add smooth scrolling animation.
    });

    targetElement.focus();
  }, [addNew]);

  function convertMonthsToString(totalMonths) {
    // Calculate the years and remaining months
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    // Create and return the formatted string
    return `${years} Yrs and ${months} months`;
  }

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

        {/* No of Years */}
        {/* <p className="d-flex gap-2 align-items-center">
          <span style={{ marginRight: "10px", fontWeight: "500" }}>
            {" "}
            No of Years:{" "}
          </span>
          <span>{companyDetail?.noOfYears}</span>
        </p> */}

        {/* No of Months */}
        <p className="d-flex gap-2 align-items-center">
          <span style={{ marginRight: "10px", fontWeight: "500" }}>
            No of Months:{" "}
          </span>
          <span>{companyDetail?.noOfMonths}</span>
        </p>

          {/* Period */}
          <p className="d-flex gap-2 align-items-center">
          <span style={{ marginRight: "10px", fontWeight: "500" }}>
            Period:{" "}
          </span>
          <span>{convertMonthsToString(companyDetail?.noOfMonths)}</span>
        </p>

        <div className="d-flex align-items-center gap-2">
          <p className="mt-2 text-decoration-underline mb-2">
            Responsibilities
          </p>
        </div>
        <ul className="px-5" style={{listStyleType:"circle"}}>
          {companyDetail.responsibilities.map((responsibility, i) => (
            <li className="d-flex gap-2 m-1">
              <span class="bullet">&#8226;</span>
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
