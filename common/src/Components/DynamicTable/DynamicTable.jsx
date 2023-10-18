import React from "react";
import { Input, Table } from "reactstrap";

const DynamicTable = ({ data, config, pageInfo, pageRequestSet }) => {
  // ========================================= Table Configuration ===========================

  // Generate Header
  const generateHeaderJSX = (config) => (
    <>
      {config.map((option) => {
        if (option.sort === true) {
          return (
            <th
              scope="col"
              class="text-uppercase cursor-pointer"
              onClick={() => pageRequestSet.setSortAndDirection(option)}
            >
              {option.header} <i className="mdi mdi-sort-descending"></i>
            </th>
          );
        } else {
          return (
            <th scope="col" class="text-uppercase">
              {option.header}
            </th>
          );
        }
      })}
    </>
  );

  // Generate Body
  const generateBodyJSX = (config, data) => {
    return data.map((rowData) => {
      const rowdata = config.map((option) => {
        return <td>{option.render(rowData)}</td>;
      });
      return <tr>{rowdata}</tr>;
    });
  };

  // ================================================================================================
  return (
    <>
      {/* Table */}
      <div className="table-responsive table-hover table-card mt-3 mb-1">
        <Table
          className="table align-middle table-nowrap"
          id="accountListingTable"
        >
          <thead className="table-light">
            <tr>{data && generateHeaderJSX(config)}</tr>
          </thead>
          <tbody className="list form-check-all">
            {data && generateBodyJSX(config, data)}
          </tbody>
        </Table>
      </div>

      {/* Table Pagination */}
      <div className="d-flex justify-content-end">
        <div className="pagination-wrap hstack gap-2">
          <Input
            onChange={(e) => pageRequestSet.setPageSize(parseInt(e.target.value))}
            type="select"
            className="form-select"
            style={{ height: "34px", marginRight: "10px" }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </Input>
          <btn
            className={`cursor-pointer page-item pagination-prev ${
              pageInfo.currentPage == 0 && "disabled"
            }`}
            onClick={pageRequestSet.setPreviousPage}
          >
            Previous
          </btn>
          <ul className="pagination listjs-pagination mb-0"></ul>
          <btn
            className={`cursor-pointer page-item pagination-next ${
              pageInfo.currentPage == pageInfo.totalPages - 1 && "disabled"
            }`}
            onClick={pageRequestSet.setNextPage}
          >
            Next
          </btn>
        </div>
      </div>
    </>
  );
};

export default DynamicTable;
