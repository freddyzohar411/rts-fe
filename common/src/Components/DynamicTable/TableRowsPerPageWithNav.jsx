import React from "react";
import { Input } from "reactstrap";

const TableRowsPerPageWithNav = ({ pageRequestSet, pageInfo, defaultValue=20 }) => {
  const currentPage = pageInfo?.currentPage + 1;
  const totalPages = pageInfo?.totalPages;
  return (
    <div className="d-flex align-items-center ">
      <i
        className={`ri-arrow-left-s-fill fs-2 cursor-pointer px-0 ${
          currentPage === 1 ? "text-muted" : ""
        }`}
        onClick={() => {
          if (currentPage > 1) {
            pageRequestSet.setPage(currentPage - 2);
          }
        }}
      ></i>
      <div>
        <Input
          onChange={(e) => pageRequestSet.setPageSize(parseInt(e.target.value))}
          type="select"
          className={`form-select border-secondary bg-white fs-6`}
          style={{
            width: "60px",
            paddingLeft: "5px",
            paddingRight: "0",
            marginRight: "0",
            paddingTop: "2px",
            paddingBottom: "2px",
          }}
          defaultValue={defaultValue}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </Input>
      </div>
      <i
        className={`ri-arrow-right-s-fill fs-2 cursor-pointer px-0 ${
          currentPage === totalPages ? "text-muted" : ""
        }`}
        onClick={() => {
          if (currentPage < totalPages) {
            pageRequestSet.setPage(currentPage);
          }
        }}
      ></i>
    </div>
  );
};

export default TableRowsPerPageWithNav;
