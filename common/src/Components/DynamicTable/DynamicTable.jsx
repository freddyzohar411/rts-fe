import React from "react";
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
import TablePagination from "./TablePagination";
import TableRowsPerPage from "./TableRowsPerPage";
import TableItemDisplay from "./TableItemDisplay";

const DynamicTable = ({
  data,
  config,
  pageInfo,
  pageRequestSet,
  isLoading = false,
  freezeHeader = false,
}) => {
  const page = pageInfo?.currentPage;
  const totalElements = pageInfo?.totalElements;
  const totalPages = pageInfo?.totalPages;
  const pageSize = pageInfo?.pageSize;
  const endPage = (page + 1) * pageSize;

  // ========================================= Table Configuration ===========================
  // Generate Header
  const generateHeaderJSX = (config) => {
    return (
      <>
        {config.map((option) => {
          if (option.sort === true) {
            return (
              <th
                key={option.name}
                scope="col"
                className={`cursor-pointer`}
                onClick={() => pageRequestSet.setSortAndDirection(option)}
              >
                {option.header} <i className="mdi mdi-sort-descending"></i>
              </th>
            );
          } else {
            return (
              <th
                key={option.name}
                scope="col"
                className={`${
                  (option?.sticky === "left" && "sticky-left") ||
                  (option?.sticky === "right" && "sticky-right") ||
                  ""
                }`}
              >
                {option.header}
              </th>
            );
          }
        })}
      </>
    );
  };

  // Generate Body
  const generateBodyJSX = (config, data) => {
    return data.map((rowData, i) => {
      const rowdata = config.map((option) => {
        const combinedStyle = {
          ...(option?.name === "action"
            ? { overflow: "visible", maxWidth: "100%" }
            : { maxWidth: "150px" }),
        };
        return (
          <td
            key={option.name}
            style={combinedStyle}
            className={`${
              (option?.sticky === "left" && "sticky-left") ||
              (option?.sticky === "right" && "sticky-right") ||
              ""
            }`}
          >
            {option.render(rowData, i)}
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
        className="table-responsive table-hover table-card mt-3 mb-1 table-custom"
        style={{ maxHeight: "470px" }}
      >
        <Table className="m-0 align-middle" id="accountListingTable">
          <thead className={`${freezeHeader ? "sticky-head" : ""}`}>
            <tr className="text-dark">{data && generateHeaderJSX(config)}</tr>
          </thead>
          <tbody className="list form-check-all">
            {isLoading ? (
              <tr>
                <td colSpan={config.length}>
                  <Skeleton className="pb-3" count={2} />
                </td>
              </tr>
            ) : data?.length > 0 ? (
              generateBodyJSX(config, data)
            ) : (
              <tr>
                <td colSpan={config.length}>No data available.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Table Pagination */}
      {data?.length > 0 && (
        <div className="d-flex flex-row justify-content-between align-items-baseline mt-2">
          <div className="d-flex align-items-center fs-6">
            <TableRowsPerPage pageRequestSet={pageRequestSet} />
            <div
              style={{
                width: "2px",
                height: "20px",
                backgroundColor: "#adb5bd",
                marginRight: "15px",
              }}
            ></div>
            <TableItemDisplay pageInfo={pageInfo} />
          </div>
          <div className="d-flex flex-row justify-content-end align-items-baseline">
            <TablePagination
              currentPage={page + 1}
              totalPages={pageInfo.totalPages}
              pageWindow={1}
              setCurrentPage={pageRequestSet?.setPage}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DynamicTable;
