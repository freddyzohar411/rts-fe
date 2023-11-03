import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Table,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles, deleteRole } from "../../../store/roles/action";

function RolesTab() {
  const roles = useSelector((state) => state.RoleReducer.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoles());
  }, []);

  // Pagination
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = roles?.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(roles?.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Search Roles
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRoles = currentData?.filter((role) => {
    if (searchTerm === "") {
      return "No results found";
    } else if (
      role?.roleName.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return role;
    }
  });

  // Delete
  const [modal, setModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState([]);
  const confirmDelete = (role) => {
    setSelectedRole(role);
    setModal(!modal);
  };

  const handleDelete = (role) => {
    dispatch(deleteRole(role));
    setModal(!modal);
  };

  return (
    <div>
      <h5 className="fw-bolder">Manage Roles and Permission</h5>
      <p className="text-muted">
        Configure roles to define the different groups of authorities.
      </p>
      <div className="d-flex flex-row gap-2 mb-4">
        <Link to="/settings/access/role/role-creation">
          <Button className="btn btn-custom-primary btn-sm d-flex flex-row align-items-center">
            <i className="ri-contacts-line me-2"></i>
            <span>ADD NEW ROLE</span>
          </Button>
        </Link>
      </div>
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
      <div className="table-responsive">
        <Table
          className="table table-hover table-bordered table-striped border-secondary align-middle table-nowrap rounded-3"
          id="rolesTable"
        >
          <thead>
            <tr>
              <th scope="col">Roles</th>
              <th scope="col">Description</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRoles?.length > 0 ? (
              filteredRoles?.map((role, index) => (
                <tr key={index}>
                  <td>{role?.roleName}</td>
                  <td className="text-truncate">{role.roleDescription}</td>
                  <td className="d-flex align-items-center justify-content-center">
                    <div className="d-flex flex-start gap-2">
                      <Link to={`/settings/access/role/${role?.id}`}>
                        <Button className="btn btn-custom-primary">
                          <i className="ri-eye-line"></i>
                        </Button>
                      </Link>
                      <Link to={`/settings/access/role/update/${role?.id}`}>
                        <Button className="btn btn-custom-primary">
                          <i className="ri-pencil-line"></i>
                        </Button>
                      </Link>
                      <Button
                        className="btn btn-custom-primary"
                        onClick={() => confirmDelete(role?.id)}
                      >
                        <i className="ri-delete-bin-2-line"></i>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>No roles found!</td>
              </tr>
            )}
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
              disabled={currentPage * itemsPerPage >= currentData?.length}
            >
              <PaginationLink>Next &nbsp; →</PaginationLink>
            </PaginationItem>
          </Pagination>
        </div>
        <Modal isOpen={modal} toggle={() => setModal(!modal)} centered>
          <ModalHeader>Are you sure?</ModalHeader>
          <ModalBody>You are deleting this role.</ModalBody>
          <ModalFooter>
            <Button
              className="btn btn-custom-primary"
              onClick={() => handleDelete(selectedRole)}
            >
              Delete
            </Button>
            <Button
              className="btn btn-custom-primary"
              onClick={() => setModal(!modal)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}

export default RolesTab;
