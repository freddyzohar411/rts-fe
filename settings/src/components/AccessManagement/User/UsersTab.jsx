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
                {users &&
                  users.map((user, index) => (
                    <tr key={index}>
                      {user.isDeleted === false && (
                        <>
                          <td>
                            <Input type="checkbox" />
                          </td>
                          <td>
                            {user.firstName} {user.lastName}
                          </td>
                          <td>{user.employeeId}</td>
                          <td>Not Assigned</td>
                          <td>Not Assigned</td>
                          <td>{user.createdAt}</td>
                          <td>-</td>
                          <td>
                            {user.enabled ? (
                              <Badge color="success">Active</Badge>
                            ) : (
                              <Badge color="danger">Inactive</Badge>
                            )}
                          </td>
                          <td className="d-flex flex-start gap-2">
                            <Link to={`/settings/access/user/${user.id}`}>
                              <Button
                                className="btn btn-custom-primary-hover"
                                style={{ pointerEvents: "none" }}
                              >
                                <i className="ri-eye-line"></i>
                              </Button>
                            </Link>
                            <Link
                              to={`/settings/access/user/update/${user.id}`}
                            >
                              <Button
                                className="btn btn-custom-primary-hover"
                                style={{ pointerEvents: "none" }}
                              >
                                <i className="ri-pencil-line"></i>
                              </Button>
                            </Link>

                            <Button
                              className="btn btn-custom-primary-hover"
                              style={{ cursor: "pointer" }}
                              onClick={() => openDeleteUserModal(user.id)}
                            >
                              <i className="ri-delete-bin-2-line"></i>
                            </Button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
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
            {/* <Pagination className="d-flex flex-row justify-content-end">
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
                disabled={currentPage * itemsPerPage >= userData.length}
              >
                <PaginationLink>Next &nbsp; →</PaginationLink>
              </PaginationItem>
            </Pagination> */}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default UsersTab;
