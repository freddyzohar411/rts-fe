import React, { Fragment, useEffect, useState } from "react";
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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser, listUsers } from "../../../store/users/action";

function UsersTab() {
  const [modal, setModal] = useState(false);
  const usersListing = useSelector((state) => state.UserReducer.usersListing);
  console.log(usersListing)
  const users = usersListing.users;
  const totalPages = usersListing.totalPages;
  const dispatch = useDispatch();

  // Pagination
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSortAndDirection = (column) => {
    // Get the name of the column
    setSortBy(column);
    // If the sort direction is ascending, set it to descending and vice versa
    if (sortDirection === "asc") {
      setSortDirection("desc");
    } else {
      setSortDirection("asc");
    }
  };

  // Handle Page Size
  const handleChangePageSize = (e) => {
    setPageSize(e.target.value);
    setPage(0);
  };

  useEffect(() => {
    const pageRequest = {
      page,
      pageSize,
      sortBy,
      sortDirection,
      searchTerm: search,
    };
    dispatch(listUsers(pageRequest));
  }, [page, pageSize, sortBy, sortDirection, search]);

  // Handle Delete
  const [selectedUser, setSelectedUser] = useState(null);
  const openDeleteUserModal = (userId) => {
    setSelectedUser(userId);
    setModal(!modal);
  };

  // Delete User
  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
    setModal(!modal);
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <i className="ri-search-line search-icon"></i>
          </div>
          <div className="table-responsive"></div>
        </Col>
      </Row>
      <Row className="mb-1">
        <Col lg={12}>
          <div className="table-responsive mb-1">
            <Table
              className="table table-hover table-bordered table-striped border-secondary align-middle table-nowrap rounded-3"
              id="customFormTable"
            >
              <thead>
                <tr>
                  <th>
                    <span className="me-1">Name</span>
                    <i
                      className="mdi mdi-sort"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        handleSortAndDirection("firstName");
                      }}
                    ></i>
                  </th>
                  <th scope="col">
                    <span className="me-1">Employee ID</span>
                    <i
                      className="mdi mdi-sort"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        handleSortAndDirection("employeeId");
                      }}
                    ></i>
                  </th>
                  <th scope="col" hidden>
                    Roles
                  </th>
                  <th scope="col">Member of Group(s)</th>
                  <th scope="col">Date Joined</th>
                  <th scope="col">Last Login</th>

                  <th scope="col" style={{ width: "30px" }}>
                    Status
                  </th>
                  <th scope="col" style={{ width: "30px" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users?.length > 0 ? (
                  users?.map((user, index) => (
                    <tr key={index}>
                      <td>
                        {user?.firstName} {user?.lastName}
                      </td>
                      <td>{user?.employeeId}</td>
                      <td hidden>
                        {user?.userGroup.length > 0 ? (
                          <>
                            {user.userGroup.map((group, groupIndex) => (
                              <Fragment key={groupIndex}>
                                {group.roles.map((role, roleIndex) => (
                                  <span key={roleIndex}>{role?.roleName}</span>
                                ))}
                              </Fragment>
                            ))}
                          </>
                        ) : (
                          <span>Not Assigned</span>
                        )}
                      </td>
                      <td>
                        {user?.userGroup.length > 0 ? (
                          user?.userGroup
                            .map((group, index) => (
                              <span key={index}>{group?.groupName}</span>
                            ))
                            .reduce((prev, curr) => [prev, ", ", curr])
                        ) : (
                          <span>Not Assigned</span>
                        )}
                      </td>

                      <td>23/09/2023</td>
                      <td>11/01/2023</td>
                      <td>
                        {user?.enabled ? (
                          <Badge color="success">Active</Badge>
                        ) : (
                          <Badge color="danger">Inactive</Badge>
                        )}
                      </td>
                      <td>
                        <div className="d-flex flex-start gap-2">
                          <Link to={`/settings/access/user/${user.id}`}>
                            <Button className="btn btn-custom-primary">
                              <i className="ri-eye-line"></i>
                            </Button>
                          </Link>
                          <Link to={`/settings/access/user/update/${user.id}`}>
                            <Button className="btn btn-custom-primary">
                              {" "}
                              <i className="ri-pencil-line"></i>
                            </Button>
                          </Link>
                          <Button
                            className="btn btn-custom-primary"
                            onClick={() => openDeleteUserModal(user.id)}
                          >
                            <i className="ri-delete-bin-2-line"></i>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">No users found!</td>
                  </tr>
                )}
              </tbody>
            </Table>

            <Modal isOpen={modal} toggle={() => setModal(!modal)} centered>
              <ModalHeader>Are you sure?</ModalHeader>
              <ModalBody>
                You are trying to delete the following user.
              </ModalBody>
              <ModalFooter>
                <div className="d-flex flex-row gap-3">
                  <Button
                    className="btn btn-custom-primary"
                    onClick={() => setModal(!modal)}
                  >
                    Cancel
                  </Button>
                  {selectedUser && (
                    <Button
                      className="btn btn-custom-primary"
                      onClick={() => handleDelete(selectedUser)}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </ModalFooter>
            </Modal>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="d-flex flex-row justify-content-between align-items-baseline">
            <div>
              <Input
                type="select"
                className="form-select form-select-md"
                onChange={handleChangePageSize}
                value={pageSize}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </Input>
            </div>
            <div>
              <Pagination>
                <PaginationItem>
                  <PaginationLink
                    disabled={page === 0}
                    onClick={() => setPage(page - 1)}
                  >
                    Previous
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    disabled={page + 1 === totalPages}
                    onClick={() => setPage(page + 1)}
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
}

export default UsersTab;
