import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Badge,
  Row,
  Col,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { userData, userGroupMembersData, roleGroupData } from "../dataSample";
import { Link } from "react-router-dom";

function UsersTab() {
  // PAGINATION
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = userData.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(userData.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div>
      <Row className="d-flex flex-row align-items-center">
        <Col>
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
          <div className="table-responsive mb-1">
            <Table
              className="table table-hover table-bordered table-striped border-light align-middle table-nowrap rounded-3"
              id="customFormTable"
            >
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th scope="col">Employee ID</th>
                  <th scope="col">Roles</th>
                  <th scope="col">Member of Group(s)</th>
                  <th scope="col">Date Joined</th>
                  <th scope="col">Last Login</th>

                  <th scope="col" style={{ width: "30px" }}>
                    Status
                  </th>
                  <th scope="col" style={{ width: "30px" }}></th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((user, idx) => (
                  <tr key={idx}>
                    <td>
                      <Input type="checkbox" />
                    </td>
                    <td>
                      {user.firstName} {user.lastName}
                    </td>
                    <td>{user.employeeId}</td>
                    <td>
                      {userGroupMembersData
                        .filter(
                          (group) =>
                            group.members &&
                            group.members.includes(user.username)
                        )
                        .map((group) => {
                          const groupRoles = roleGroupData
                            .filter(
                              (role) =>
                                role.groups &&
                                role.groups.includes(group.groupName)
                            )
                            .map((role) => role.roleName)
                            .join(", ");

                          return `${groupRoles}`;
                        })
                        .join(", ") || "Not Assigned"}
                    </td>
                    <td>
                      {userGroupMembersData
                        .filter((group) =>
                          group.members.includes(user.username)
                        )
                        .map((group) => group.groupName)
                        .join(", ") || "Not Assigned"}
                    </td>
                    <td>21-08-2022</td>
                    <td>09-10-2023</td>
                    <td>
                      <Badge color="success">Active</Badge>
                    </td>
                    <td className="d-flex flex-start gap-2">
                      <Link to={`/settings/access/user/${user.username}`}>
                        <Button>
                          <i className="ri-eye-line"></i>
                        </Button>
                      </Link>
                      <Link
                        to={`/settings/access/user/update/${user.username}`}
                      >
                        <Button>
                          <i className="ri-pencil-line"></i>
                        </Button>
                      </Link>

                      <Button>
                        <i className="ri-delete-bin-2-line"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Pagination */}
            <Pagination className="d-flex flex-row justify-content-end">
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
                disabled={currentPage * itemsPerPage >= userData.length}
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

export default UsersTab;
