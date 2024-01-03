import React, { useState } from "react";
import {
  Table,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Input,
} from "reactstrap";

const DynamicTableAccordion = ({ data, config, pageInfo, pageRequestSet }) => {
  // Modules
  const categories = [
    ...new Set(data?.map((item) => item.formCategory || "No Category")),
  ];

  const [open, setOpen] = useState(false);
  const toggle = (module) => {
    setOpen(open === module ? null : module);
  };

  // Generate Header
  const generateHeaderJsx = (config) => (
    <>
      {config?.map((option) => {
        if (option.sort === true) {
          return (
            <th
              key={option.name}
              scope="col"
              className="cursor-pointer"
              onClick={() => pageRequestSet.setSortAndDirection(option)}
              style={{ color: "#00000099" }}
            >
              {option.header} <i className="mdi mdi-sort-descending"></i>
            </th>
          );
        } else {
          return (
            <th key={option.name} scope="col" style={{ color: "#00000099" }}>
              {option.header}
            </th>
          );
        }
      })}
    </>
  );

  // Generate Body
  const generateBodyJsx = (config, data, categories, openModule) => {
    return categories?.map((category) => {
      const categoryData = data.filter(
        (rowData) => (rowData.formCategory || "No Category") === category
      );

      return (
        <React.Fragment key={category}>
          <tr style={{ cursor: "pointer" }} onClick={() => toggle(category)}>
            <td colSpan={config.length + 1}>
              <div className="d-flex flex-row align-items-middle gap-3">
                {openModule === module ? (
                  <i className="ri-arrow-up-s-line"></i>
                ) : (
                  <i className="ri-arrow-down-s-line"></i>
                )}
                <span>{category}</span>
              </div>
            </td>
          </tr>
          {openModule === category && (
            <>
              {categoryData && categoryData.length > 0 ? (
                categoryData?.map((rowData) => (
                  <tr key={rowData.formId}>
                    {config.map((option) => (
                      <td key={option.name} style={{ verticalAlign: "middle" }}>
                        {option.render(rowData)}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={config.length + 1}>No form templates found.</td>
                </tr>
              )}
            </>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <div>
      <Row>
        <Col>
          <div className="table-responsive">
            <Table className="table table-hover table-striped table-bordered border-secondary align-start">
              <thead>
                <tr>{data && generateHeaderJsx(config)}</tr>
              </thead>
              <tbody>
                {data && generateBodyJsx(config, data, categories, open)}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="d-flex flex-row justify-content-between align-items-baseline">
            <div>
              <Input
                onChange={(e) =>
                  pageRequestSet.setPageSize(parseInt(e.target.value))
                }
                type="select"
                className="form-select form-select-sm border-secondary"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </Input>
            </div>
            <div>
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
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default DynamicTableAccordion;
