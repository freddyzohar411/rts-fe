import React from "react";
import {
  Input,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

const DynamicTable = ({ data, config, pageInfo, pageRequestSet }) => {
  // ========================================= Table Configuration ===========================
  console.log("pageInfo PAGE: ", pageInfo);
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
      <div className="d-flex flex-row justify-content-end my-3">
        <Input
          onChange={(e) => pageRequestSet.setPageSize(parseInt(e.target.value))}
          type="select"
          className="form-select"
          style={{ height: "34px", marginRight: "10px", width: "70px" }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </Input>

        <Pagination>
          <PaginationItem
            
            disabled={pageInfo.currentPage === 0}
            onClick={pageRequestSet.setPreviousPage}
          >
            <PaginationLink className={`${pageInfo.currentPage === 0 ? "bg-secondary border-primary text-muted disabled" : "bg-secondary border-primary text-dark" }`}>Previous</PaginationLink>
          </PaginationItem>
          <PaginationItem
            
            disabled={pageInfo.currentPage === pageInfo.totalPages - 1}
            onClick={pageRequestSet.setNextPage}
          >
            <PaginationLink className={`${pageInfo.currentPage === pageInfo.totalPages - 1 ? "bg-secondary border-primary text-muted disabled" : "bg-secondary border-primary text-dark" }`}>Next</PaginationLink>
          </PaginationItem>
        </Pagination>
      </div>
    </>
  );
};

export default DynamicTable;
