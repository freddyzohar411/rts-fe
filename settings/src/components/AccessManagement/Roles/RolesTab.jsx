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
import { fetchRoles, deleteRole, listRoles } from "../../../store/roles/action";
import { fetchModules } from "../../../store/module/action";
import { fetchPermissions } from "../../../store/permissions/action";

function RolesTab() {
  const rolesListing = useSelector((state) => state.RoleReducer.rolesListing);
  const roles = rolesListing.roles;
  const totalPages = rolesListing.totalPages;
  const modulesData = useSelector((state) => state.ModuleReducer.modules);
  const permissionData = useSelector(
    (state) => state.PermissionReducer.permissions
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch modules if not available
    if (!modulesData) {
      dispatch(fetchModules());
    }
    if (!permissionData) {
      dispatch(fetchPermissions());
    }
  }, []);

  // Pagination
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSortAndDirection = (column) => {
    setSortBy(column);
    if (sortDirection === "asc") {
      setSortDirection("desc");
    } else {
      setSortDirection("asc");
    }
  };

  const handlePageSize = (e) => {
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
    dispatch(listRoles(pageRequest));
  }, [page, pageSize, sortBy, sortDirection, search]);

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
      <Row>
        <Col>
          <div className="d-flex flex-column gap-2">
            <h5 className="fw-bolder">Manage Roles and Permission</h5>
            <p className="text-muted">
              Configure roles to define the different groups of authorities.
            </p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="d-flex flex-row gap-2 mb-4">
            <Link to="/settings/access/role/role-creation">
              <Button className="btn btn-custom-primary btn-sm d-flex flex-row align-items-center">
                <i className="ri-contacts-line me-2"></i>
                <span>Add New Role</span>
              </Button>
            </Link>
          </div>
        </Col>
      </Row>

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
        <Col>
          <div className="table-responsive">
            <Table
              className="table table-hover table-bordered table-striped border-secondary align-middle table-nowrap rounded-3"
              id="rolesTable"
            >
              <thead>
                <tr>
                  <th scope="col">
                    <span className="me-1" style={{ color: "#00000099" }}>
                      Roles
                    </span>
                    <i
                      className="mdi mdi-sort"
                      onClick={() => {
                        handleSortAndDirection("roleName");
                      }}
                      style={{ cursor: "pointer" }}
                    ></i>
                  </th>
                  <th scope="col" style={{ color: "#00000099" }}>
                    Description
                  </th>
                  <th scope="col" style={{ width: "30px", color: "#00000099" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {roles?.length > 0 ? (
                  roles?.map((role, index) => (
                    <tr key={index}>
                      <td>{role?.roleName}</td>
                      <td className="text-truncate">
                        {role.roleDescription.length > 100
                          ? `${role.roleDescription.substring(0, 100)}...`
                          : role.roleDescription}
                      </td>
                      <td className="d-flex align-items-center justify-content-center">
                        <div className="d-flex flex-start gap-2">
                          <Link
                            to={role ? `/settings/access/role/${role.id}` : "#"}
                          >
                            <Button className="btn btn-custom-primary px-2 py-1">
                              <i
                                className="ri-eye-line"
                                style={{ fontSize: "0.65rem" }}
                              ></i>
                            </Button>
                          </Link>
                          <Link
                            to={
                              role
                                ? `/settings/access/role/update/${role.id}`
                                : "#"
                            }
                          >
                            <Button className="btn btn-custom-primary px-2 py-1">
                              <i
                                className="ri-pencil-line"
                                style={{ fontSize: "0.65rem" }}
                              ></i>
                            </Button>
                          </Link>
                          <Button
                            className="btn btn-danger px-2 py-0"
                            onClick={() => confirmDelete(role?.id)}
                          >
                            <i
                              className="ri-delete-bin-2-line"
                              style={{ fontSize: "0.65rem" }}
                            ></i>
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
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="d-flex flex-row justify-content-between align-items-baseline">
            <div>
              <Input
                type="select"
                className="form-select form-select-md"
                onChange={handlePageSize}
                value={pageSize}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="20">30</option>
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

export default RolesTab;
