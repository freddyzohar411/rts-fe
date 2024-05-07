import React from "react";
import {
  Table,
} from "reactstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./DynamicTable.scss";

const DynamicTable = ({
  data,
  config,
  pageInfo,
  pageRequestSet,
  isLoading = false,
  freezeHeader = false,
  activeRow,
  setTableConfig,
  tableHeight = "565px",
}) => {
  const page = pageInfo?.currentPage;
  const totalElements = pageInfo?.totalElements;
  const totalPages = pageInfo?.totalPages;
  const pageSize = pageInfo?.pageSize;
  const endPage = (page + 1) * pageSize;

  const toggleColumnExpand = (configIndex) => {
    setTableConfig((prev) => {
      return prev.map((item, prevIndex) => {
        if (prevIndex === configIndex) {
          if (item?.expand === true) {
            return { ...item, expand: false };
          } else if (item?.expand === false || item?.expand === undefined) {
            return { ...item, expand: true };
          }
          return item;
        }
        return item;
      });
    });
  };

  // ========================================= Table Configuration ===========================
  // Generate Header
  const generateHeaderJSX = (config) => {
    return (
      <>
        {config?.map((option, configIndex) => {
          if (option.sort === true) {
            return (
              <th
                key={option.name}
                scope="col"
                className={`sticky-head-border`}
                onDoubleClick={() => {
                  toggleColumnExpand(configIndex);
                }}
              >
                <div
                  className={`d-flex gap-2 ${
                    option?.center && "justify-content-center"
                  }`}
                >
                  <span> {option.header}</span>
                  <i
                    className="mdi mdi-sort-descending align-self-end cursor-pointer"
                    onClick={() => pageRequestSet.setSortAndDirection(option)}
                  ></i>
                </div>
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
                } sticky-color sticky-head-border`}
                onDoubleClick={() => {
                  toggleColumnExpand(configIndex);
                }}
                style={{
                  border: "2px solid black !important",
                }}
              >
                <div
                  className={`d-flex gap-2 ${
                    option?.center && "justify-content-center"
                  }`}
                >
                  <span> {option.header}</span>
                </div>
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
      const isRowChecked = activeRow?.includes(rowData?.id);
      const returnClass = (isSticky, isRowChecked) => {
        if (isSticky && isRowChecked) {
          return "sticky-color-checked";
        } else if (isSticky) {
          return "sticky-color";
        } else {
          return "";
        }
      };
      const rowdata = config?.map((option, configIndex) => {
        const combinedStyle = {
          ...(option?.expand === true
            ? { overflow: "visible", maxWidth: "100%" }
            : { maxWidth: "100px" }),
        };
        return (
          <td
            key={option.name}
            style={combinedStyle}
            className={`${
              (option?.sticky === "left" && "sticky-left") ||
              (option?.sticky === "right" && "sticky-right") ||
              ""
            } ${returnClass(option?.sticky, isRowChecked)}`}
            onDoubleClick={() => {
              toggleColumnExpand(configIndex);
            }}
          >
            {option.render(rowData, i)}
          </td>
        );
      });

      return (
        <tr
          className={`${
            activeRow?.includes(rowData?.id) ? "row-selected" : ""
          }`}
          key={rowData.id}
        >
          {rowdata}
        </tr>
      );
    });
  };

  // ================================================================================================
  return (
    <>
      {/* Table */}
      <div
        className="table-responsive table-hover table-card mt-3 mb-1 table-custom"
        style={{ maxHeight: tableHeight }}
      >
        <Table
          className="m-0 align-middle dynamic-table-main"
          id="accountListingTable"
          style={{ tableLayout: "auto" }}
        >
          <thead
            className={`${freezeHeader ? "sticky-head" : "non-sticky-head"}`}
          >
            <tr className="text-dark">{data && generateHeaderJSX(config)}</tr>
          </thead>
          <tbody className="list form-check-all">
            {isLoading ? (
              <tr>
                <td colSpan={config?.length}>
                  <Skeleton className="pb-3" count={2} />
                </td>
              </tr>
            ) : data?.length > 0 ? (
              generateBodyJSX(config, data)
            ) : (
              <tr>
                <td colSpan={config?.length}>No data available.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default DynamicTable;
