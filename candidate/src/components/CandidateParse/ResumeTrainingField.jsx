import React, { useState, useEffect, useRef } from "react";
import "./ResumeCompanyField.scss";
import * as CandidateParsingHelper from "../../helpers/candidate_parsing_helper";

const ResumeCertificationField = ({ section, index }) => {
  const [addNew, setAddNew] = useState(1);

  const [sectionDetail, setSectionDetail] = useState({
    name: section?.name,
    from: section?.from,
    date: section?.date,
  });

  // Set company detail state when company props changes
  useEffect(() => {
    if (section) {
      setSectionDetail({
        name: section?.name,
        from: section?.from,
        date: section?.date,
      });
    }
  }, [section]); // Add "company" as a dependency here

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

    return (yearsDiff + monthsDiff / 12).toFixed(1);
  };

  useEffect(() => {
    // Replace 'targetElementId' with the ID of the element you want to scroll to.
    const id = `last-responsibility-${index}`;
    const targetElement = document.getElementById(id);
    if (targetElement == null) return;

    // Scroll to the target element.
    targetElement.scrollIntoView({
      behavior: "smooth", // Optional: Add smooth scrolling animation.
    });

    targetElement.focus();
  }, [addNew]);

  return (
    <div className="companies-details-single">
      <div className="d-flex justify-content-between align-items-center">
        <p className="company-name">
          <span>{index + 1}) Certification: </span>
          <span>{sectionDetail?.name}</span>
        </p>
      </div>

      <div className="companies-details-card-details">
        {/* Designation */}
        <p className="d-flex gap-1">
          <span style={{ marginRight: "10px", fontWeight: "500" }}>From:</span>
          <span>{sectionDetail?.from}</span>
        </p>

        {/* Start Date */}
        <p className="d-flex align-items-center gap-2">
          <span style={{ marginRight: "10px", fontWeight: "500" }}>Date:</span>
          <span>{sectionDetail?.date}</span>
        </p>
      </div>
    </div>
  );
};

export default ResumeCertificationField;

// export default React.memo(ResumeCompanyField);
