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

const DynamicTable = ({
  data,
  config,
  pageInfo,
  pageRequestSet,
  isLoading = false,
  setPage,
}) => {
  const page = pageInfo?.currentPage;
  const totalElements = pageInfo?.totalElements;
  const totalPages = pageInfo?.totalPages;
  const pageSize = pageInfo?.pageSize;
  const endPage = (page + 1) * pageSize;

  console.log("Page Info", pageInfo);

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
                className="cursor-pointer"
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
        style={{ height: "470px" }}
      >
        <Table className="m-0 align-middle" id="accountListingTable">
          <thead>
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
        <div className="d-flex flex-row justify-content-between align-items-baseline">
          <div
            dangerouslySetInnerHTML={{
              __html: `Showing <b>${page * pageSize + 1}</b> - <b>${
                endPage < totalElements ? endPage : totalElements
              }</b> of <b>${totalElements}</b> results`,
            }}
          ></div>
          <div className="d-flex flex-row justify-content-end align-items-baseline">
            <div style={{ marginRight: 10 }}>Rows per page:</div>
            <div style={{ marginRight: 10 }}>
              <Input
                onChange={(e) =>
                  pageRequestSet.setPageSize(parseInt(e.target.value))
                }
                type="select"
                className="form-select border-secondary"
                style={{ height: "34px", marginRight: "10px", width: "70px" }}
                defaultValue="20"
              >
                <option value="2">2</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </Input>
            </div>
            <div
              style={{ marginRight: 10 }}
              dangerouslySetInnerHTML={{
                __html: `Page <b>${page + 1}</b> of <b>${totalPages}</b>`,
              }}
            ></div>
            <div>
              <Pagination>
                <PaginationItem
                  disabled={pageInfo.currentPage === 0}
                  onClick={pageRequestSet.setPreviousPage}
                >
                  <PaginationLink className={`${page === 0 ? "disabled" : ""}`}>
                    Previous
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem
                  disabled={pageInfo.currentPage === pageInfo.totalPages - 1}
                  onClick={pageRequestSet.setNextPage}
                >
                  <PaginationLink
                    className={`${page + 1 === totalPages ? "disabled" : ""}`}
                  >
                    Next
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            </div>
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
