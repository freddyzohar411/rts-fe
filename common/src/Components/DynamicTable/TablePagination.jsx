import React from "react";
import { Button } from "reactstrap";

const TablePagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
  pageWindow,
}) => {
  const renderPageNumbers = () => {
    const pages = [];

    // Always add page 1
    pages.push(
      <Button
        color="light"
        key={1}
        onClick={() => setCurrentPage(0)}
        className={`fs-6 rounded-custom-1
          ${
            currentPage === 1
              ? " btn btn-custom-primary border-none "
              : " btn-white bg-gradient border-2 border-light-grey fw-bold"
          }`}
      >
        1
      </Button>
    );
    if (currentPage > pageWindow + 2) {
      pages.push(
        <span
          key="left-ellipsis"
          className={`fs-6 rounded-custom-1 btn btn-white bg-gradient border-2 border-light-grey fw-bold`}
          style={{
            cursor: "none",
          }}
        >
          ...
        </span>
      );
    }

    // Define the range of pages to display
    let lowerLimit = Math.max(2, currentPage - pageWindow);
    let upperLimit = Math.min(totalPages - 1, currentPage + pageWindow);

    // Adjust the range to ensure we are showing as many pages as needed
    if (currentPage - lowerLimit < pageWindow) {
      upperLimit = Math.min(
        upperLimit + (pageWindow - (currentPage - lowerLimit)),
        totalPages - 1
      );
    }

    if (upperLimit - currentPage < pageWindow) {
      lowerLimit = Math.max(
        lowerLimit - (pageWindow - (upperLimit - currentPage)),
        2
      );
    }

    // Generate page numbers in the defined range
    for (let i = lowerLimit; i <= upperLimit; i++) {
      pages.push(
        <Button
          key={i}
          onClick={() => setCurrentPage(i - 1)}
          className={`fs-6 rounded-custom-1
          ${
            currentPage === i
              ? " btn btn-custom-primary border-none "
              : " btn-white bg-gradient border-2 border-light-grey fw-bold"
          }`}
        >
          {i}
        </Button>
      );
    }

    // Add the last page and ellipsis if needed
    if (
      currentPage < totalPages - (pageWindow + 1) &&
      upperLimit != totalPages - 1
    ) {
      pages.push(
        <span
          key="right-ellipsis"
          className={`fs-6 rounded-custom-1 btn btn-white bg-gradient border-2 border-light-grey fw-bold`}
          style={{
            cursor: "none",
          }}
        >
          ...
        </span>
      );
    }

    if (totalPages !== 1) {
      pages.push(
        <Button
          key={totalPages}
          onClick={() => setCurrentPage(totalPages - 1)}
          className={`fs-6 rounded-custom-1
          ${
            currentPage === totalPages
              ? " btn btn-custom-primary border-none "
              : " btn-white bg-gradient border-2 border-light-grey fw-bold"
          }`}
        >
          {totalPages}
        </Button>
      );
    }

    return pages;
  };

  return (
    <div className="d-flex gap-1">
      <Button
        onClick={() => {
          setCurrentPage(currentPage - 2);
        }}
        disabled={currentPage === 1}
        color="light"
        className={`btn btn-white bg-gradient border-2 border-light-grey fw-bold ${
          currentPage === 1 ? "text-muted" : ""
        }`}
        style={{ borderRadius: "12px", paddingInline: "10px" }}
      >
        Prev
      </Button>
      {renderPageNumbers()}
      <Button
        onClick={() => {
          setCurrentPage(currentPage);
        }}
        disabled={currentPage === totalPages}
        className={`btn btn-white bg-gradient border-2 border-light-grey fw-bold ${
          currentPage === totalPages ? "text-muted" : ""
        }`}
        style={{ borderRadius: "12px", paddingInline: "10px" }}
      >
        Next
      </Button>
    </div>
  );
};

export default TablePagination;
