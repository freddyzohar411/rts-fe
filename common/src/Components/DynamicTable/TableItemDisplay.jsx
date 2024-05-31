import React from "react";

const TableItemDisplay = ({ pageInfo }) => {
  const page = pageInfo?.currentPage;
  const totalElements = pageInfo?.totalElements;
  const pageSize = pageInfo?.pageSize;
  const endPage = (page + 1) * pageSize;

  return (
    <div>
      <span>
        <span className="fw-bold">
          {`${page * pageSize + 1 || 0} - ${
            endPage < totalElements ? endPage : totalElements || 0
          } `}
        </span>
        <span>of</span>
        <span className="fw-bold"> {`${totalElements || 0} `}</span>
      </span>
    </div>
  );
};

export default TableItemDisplay;
