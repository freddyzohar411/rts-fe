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
import { fetchUsers, deleteUser } from "../../../store/users/action";

function UsersTab() {
  const [modal, setModal] = useState(false);
  // Fetch Users
  const users = useSelector((state) => state.UserReducer.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  // Pagination
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = users?.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(users?.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Search User
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = currentData?.filter((user) => {
    if (searchTerm === "") {
      return "No results found";
    } else if (
      user?.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.username.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return user;
    }
  });

  // Open Delete User Modal
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
              value={searchTerm}
              onChange={handleSearchChange}
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
              className="table table-hover table-bordered table-striped border-secondary align-middle table-nowrap rounded-3"
              id="customFormTable"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th scope="col">Employee ID</th>
                  <th scope="col">Roles</th>
                  <th scope="col">Member of Group(s)</th>
                  <th scope="col">Date Joined</th>
                  <th scope="col">Last Login</th>

                  <th scope="col" style={{ width: "30px" }}>
                    Status
                  </th>
                  <th scope="col" style={{ width: "30px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                { filteredUsers?.length > 0 ? ( filteredUsers?.map((user, index) => (
                  <tr key={index}>
                    <td>
                      {user?.firstName} {user?.lastName}
                    </td>
                    <td>{user?.employeeId}</td>
                    <td>
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
                ))) : (<tr><td colSpan="8">No users found!</td></tr>)
               }
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

            {/* Pagination */}
            <Pagination className="d-flex flex-row justify-content-end">
              <PaginationItem
                onClick={() => handlePrevPage()}
                disabled={currentPage === 1}
              >
                <PaginationLink>← &nbsp; Previous</PaginationLink>
              </PaginationItem>
              <PaginationItem active>
                <PaginationLink className="bg-custom-primary">
                  Page {currentPage}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem
                onClick={() => handleNextPage()}
                disabled={currentPage * itemsPerPage >= filteredUsers?.length}
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
