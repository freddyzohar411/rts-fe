import React, { useEffect, useState } from "react";
import {
  Input,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./DynamicTable.scss";

const DynamicTable = ({ data, config, pageInfo, pageRequestSet }) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (data && data.length === 0) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } else {
      setIsLoading(true);
    }
  }, [data]);

  // ========================================= Table Configuration ===========================
  // Generate Header
  const generateHeaderJSX = (config) => (
    <>
      {config.map((option) => {
        if (option.sort === true) {
          return (
            <th
              key={option.name}
              scope="col"
              className="cursor-pointer"
              onClick={() => pageRequestSet.setSortAndDirection(option)}
            >
              {option.header} <i className="mdi mdi-sort-descending"></i>
            </th>
          );
        } else {
          return (
            <th key={option.name} scope="col">
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
        return (
          <td
            key={option.name}
            style={option?.name === "action" ? { overflow: "visible" } : {}}
          >
            {option.render(rowData)}
          </td>
        );
      });
      return <tr key={rowData.id}>{rowdata}</tr>;
    });
  };

  // ================================================================================================
  return (
    <>
      {/* Table */}
      <div
        className="table-responsive table-hover table-card mt-3 mb-1"
        style={{ height: "400px" }}
      >
        <Table
          className="table align-middle table-nowrap border-secondary align-middle"
          id="accountListingTable"
        >
          <thead style={{ backgroundColor: "#B8DAF3", color: "#000000" }}>
            <tr className="text-dark">{data && generateHeaderJSX(config)}</tr>
          </thead>
          <tbody className="list form-check-all">
            {data && data.length > 0 ? (
              generateBodyJSX(config, data)
            ) : isLoading ? (
              <tr>
                <td colSpan={config.length}>
                  <Skeleton className="pb-3" count={2} />
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan={config.length}>No data available.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Table Pagination */}
      <div className="d-flex flex-row justify-content-end my-3">
        <Input
          onChange={(e) => pageRequestSet.setPageSize(parseInt(e.target.value))}
          type="select"
          className="form-select border-secondary"
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
            <PaginationLink
              className={`${
                pageInfo.currentPage === 0
                  ? "bg-secondary border-primary text-muted disabled"
                  : "bg-secondary border-primary text-dark"
              }`}
            >
              Previous
            </PaginationLink>
          </PaginationItem>
          <PaginationItem
            disabled={pageInfo.currentPage === pageInfo.totalPages - 1}
            onClick={pageRequestSet.setNextPage}
          >
            <PaginationLink
              className={`${
                pageInfo.currentPage === pageInfo.totalPages - 1
                  ? "bg-secondary border-primary text-muted disabled"
                  : "bg-secondary border-primary text-dark"
              }`}
            >
              Next
            </PaginationLink>
          </PaginationItem>
        </Pagination>
      </div>
    </>
  );
};

export default DynamicTable;
