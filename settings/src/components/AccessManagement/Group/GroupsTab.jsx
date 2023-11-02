import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function GroupsTab() {
  const [showDelete, setShowDelete] = useState(false);
  // PAGINATION
  const groups = useSelector((state) => state?.GroupReducer?.groups) ?? [];

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = groups?.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(groups?.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <Row>
        <Col lg={12}>
          <div className="search-box my-2">
            <Input
              type="text"
              placeholder="Search.."
              className="form-control"
            />
            <i className="ri-search-line search-icon"></i>
          </div>
          <div className="table-responsive"></div>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <Table className="table table-hover table-bordered table-striped border-light align-middle table-nowrap rounded-3">
            <thead>
              <tr>
                <th scope="col" style={{ width: "20px" }}></th>
                <th scope="col">Group Name</th>
                <th scope="col" style={{ width: "600px" }}>
                  Description
                </th>
                <th scope="col" style={{ width: "10px" }}></th>
              </tr>
            </thead>
            <tbody>
              {currentData?.map((item, idx) => (
                <tr key={idx}>
                  <td>
                    <Input
                      type="checkbox"
                      className="form-check-input"
                      name="groupCheckbox"
                    />
                  </td>
                  <td>{item?.userGroupName}</td>
                  <td className="text-wrap">{item?.userGroupDescription}</td>
                  <td className="d-flex flex-row justify-between gap-2">
                    <Link to={`/settings/access/group/${item?.id}`}>
                      <Button
                        className="btn btn-custom-primary-hover"
                        style={{ pointerEvents: "none" }}
                      >
                        <i className="ri-eye-line"></i>
                      </Button>
                    </Link>
                    <Link to={`/settings/access/group/update/${item?.id}`}>
                      <Button
                        className="btn btn-custom-primary-hover"
                        style={{ pointerEvents: "none" }}
                      >
                        <i className="ri-pencil-line"></i>
                      </Button>
                    </Link>

                    <Button
                      className="btn btn-custom-primary-hover"
                      style={{ pointerEvents: "none" }}
                      onClick={() => setShowDelete(!showDelete)}
                    >
                      <i className="ri-delete-bin-line"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex flex-row justify-content-end">
            <Pagination>
              <PaginationItem
                onClick={() => handlePrevPage()}
                disabled={currentPage === 1}
              >
                <PaginationLink>← &nbsp; Previous</PaginationLink>
              </PaginationItem>
              <PaginationItem active>
                <PaginationLink>Page {currentPage}</PaginationLink>
              </PaginationItem>
              <PaginationItem
                onClick={() => handleNextPage()}
                disabled={currentPage * itemsPerPage >= groups?.length}
              >
                <PaginationLink>Next &nbsp; →</PaginationLink>
              </PaginationItem>
            </Pagination>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default GroupsTab;
