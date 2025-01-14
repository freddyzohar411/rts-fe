// DynamicTable.js
import React, { useRef, useEffect } from "react";
import { Table } from "reactstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./DynamicTable.scss";
import useEllipsisTooltip from "./EllipsisToolTip";

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
  pageRequest = null,
  headerCenter = false,
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

  const HeaderCell = ({
    option,
    configIndex,
    pageRequest,
    pageRequestSet,
    toggleColumnExpand,
  }) => {
    const { textRef, isEllipsisActive } = useEllipsisTooltip(option.header);
    const combinedStyle = {
      ...(option?.expand === true
        ? { overflow: "visible", maxWidth: "100%" }
        : { maxWidth: "320px", minWidth: "100px" }),
    };

    if (option.sort === true) {
      return (
        <th
          key={option.name}
          scope="col"
          className={`${
            (option?.sticky === "left" &&
              "sticky-left sticky-color sticky-head-border") ||
            (option?.sticky === "right" &&
              "sticky-right sticky-color sticky-head-border") ||
            "non-sticky-head-border"
          }`}
          onDoubleClick={() => {
            toggleColumnExpand(configIndex);
          }}
          style={combinedStyle}
        >
          <div
            className={`d-flex gap-2 cursor-pointer ${
              option?.center && "justify-content-center"
            } ${headerCenter && "justify-content-center"}`}
            onClick={() => pageRequestSet.setSortAndDirection(option)}
          >
            <span
              ref={textRef}
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              title={isEllipsisActive ? option.header : ""}
            >
              {" "}
              {option.header}
            </span>
            <div className="d-flex flex-column">
              {pageRequest?.sortBy === option.sortValue &&
                pageRequest?.sortDirection === "asc" && (
                  <i
                    className={`ri-sort-asc cursor-pointer`}
                    onClick={() => pageRequestSet.setSortAndDirection(option)}
                  ></i>
                )}
              {pageRequest?.sortBy === option.sortValue &&
                pageRequest?.sortDirection === "desc" && (
                  <i
                    className={`ri-sort-desc cursor-pointer`}
                    onClick={() => pageRequestSet.setSortAndDirection(option)}
                  ></i>
                )}
            </div>
          </div>
        </th>
      );
    } else {
      return (
        <th
          key={option.name}
          scope="col"
          className={`${
            (option?.sticky === "left" &&
              "sticky-left sticky-color sticky-head-border") ||
            (option?.sticky === "right" &&
              "sticky-right sticky-color sticky-head-border") ||
            "non-sticky-head-border"
          } `}
          onDoubleClick={() => {
            toggleColumnExpand(configIndex);
          }}
          style={{
            border: "2px solid black !important",
            ...combinedStyle,
          }}
        >
          <div
            className={`d-flex gap-2 ${
              option?.center && "justify-content-center"
            }`}
          >
            <span ref={textRef} title={isEllipsisActive ? option.header : ""}>
              {" "}
              {option.header}
            </span>
          </div>
        </th>
      );
    }
  };

  // ========================================= Table Configuration ===========================
  // Generate Header
  const generateHeaderJSX = (config) => {
    return (
      <>
        {config?.map((option, configIndex) => (
          <HeaderCell
            key={option.name}
            option={option}
            configIndex={configIndex}
            pageRequest={pageRequest}
            pageRequestSet={pageRequestSet}
            toggleColumnExpand={toggleColumnExpand}
          />
        ))}
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
            : { maxWidth: "320px", minWidth: "100px" }),
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
        style={{
          maxHeight: tableHeight,
        }}
      >
        <Table
          className="m-0 align-middle dynamic-table-main"
          id="accountListingTable"
          style={{
            tableLayout: "auto",
            position: "sticky !important",
            zIndex: 1,
            top: 0,
          }}
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
