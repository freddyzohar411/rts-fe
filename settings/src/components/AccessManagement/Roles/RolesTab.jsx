import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Table,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
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

      <div className="table-responsive">
        <Table
          className="table table-hover table-bordered table-striped border-secondary align-middle table-nowrap rounded-3"
          id="rolesTable"
        >
          <thead>
            <tr>
              <th scope="col">
                <Input type="checkbox" />
              </th>
              <th scope="col">Roles</th>
              <th scope="col">Description</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {roles &&
              roles.map((role, index) => (
                <tr key={index}>
                  <td>
                    <Input type="checkbox" />
                  </td>
                  <td>{role.roleName}</td>
                  <td className="text-truncate" style={{ maxWidth: "650px" }}>
                    {role.roleDescription}
                  </td>
                  <td className="d-flex flex-row justify-content-between align-items-center">
                    <Link to={`/settings/access/role/${role.id}`}>
                      <Button className="btn btn-custom-primary-hover">
                        <i className="ri-eye-line"></i>
                      </Button>
                    </Link>
                    <Link to={`/settings/access/role/update/${role.id}`}>
                      <Button className="btn btn-custom-primary-hover">
                        <i className="ri-pencil-line"></i>
                      </Button>
                    </Link>
                    <Button
                      className="btn btn-custom-primary-hover"
                      onClick={() => confirmDelete(role.id)}
                    >
                      <i className="ri-delete-bin-2-line"></i>
                    </Button>
                  </td>
                </tr>
              ))}
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
    </div>
  );
}

export default RolesTab;
