import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Table,
  Toast,
  ToastBody,
  ToastHeader,
} from "reactstrap";
import { roleData, roleGroupData } from "../dataSample";
import Role from "./Role";
import UpdateRole from "./UpdateRole";
import { Link, useNavigate } from "react-router-dom";

function RolesTab() {
  const navigate = useNavigate();
  const [createRole, setCreateRole] = useState(false);
  const [viewRoleModal, setViewRoleModal] = useState(false);
  const [selectedRoleData, setSelectedRoleData] = useState(null);
  const [updateRoleModal, setUpdateRoleModal] = useState(false);
  const [selectedRoleToDelete, setSelectedRoleToDelete] = useState(null);
  const [toggleDelete, setToggleDelete] = useState(false);

  const handleUpdateView = (role) => {
    const selectedRole = roleData.find((item) => item.roleName === role);
    setSelectedRoleData(selectedRole);
    setUpdateRoleModal(!updateRoleModal);
  };

  // Modal View *To change to page viewing only
  const handleView = (role) => {
    const selectedRole = roleData.find((item) => item.roleName === role);
    setSelectedRoleData(selectedRole);
    setViewRoleModal(!viewRoleModal);
    console.log("Selected Role:", selectedRole);
  };

  // Page View for Role **To pass props
  const handleViewRole = (role) => {
    const selectedRole = roleData.find((item) => item.roleName === role);
    setSelectedRoleData(selectedRole);
    navigate("/settings/access/role/view-role", {
      state: { selectedRoleData },
    });
  };

  const handleDelete = (role) => {
    setSelectedRoleToDelete(role);
  };

  const confirmDelete = () => {
    // Filter roles from roleData
    const updateRoles = roleData.filter(
      (role) => role.roleName !== selectedRoleToDelete
    );

    // Filter roles from roleGroupData
    const updatedRoleGroupData = roleGroupData.filter(
      (role) => role.roleName !== selectedRoleToDelete
    );

    setSelectedRoleToDelete(null);
  };

  useEffect(() => {}, [selectedRoleData]);

  return (
    <div>
      <h5 className="fw-bolder">Manage Roles and Permission</h5>
      <p className="text-muted">
        Configure roles to define the different groups of authorities.
      </p>
      <div className="d-flex flex-row gap-2 mb-4">
        <Button className="btn btn-primary btn-sm d-flex flex-row align-items-center">
          <Link to="/settings/access/role/role-creation" className="text-dark">
            <i className="ri-contacts-line me-2"></i>
            <span>ADD NEW ROLE</span>
          </Link>
        </Button>
      </div>

      <div className="table-responsive">
        <Table
          className="table table-hover table-bordered table-striped border-light align-middle table-nowrap rounded-3"
          id="rolesTable"
        >
          <thead>
            <tr>
              <th scope="col">
                <Input type="checkbox" />
              </th>
              <th scope="col">Roles</th>
              <th scope="col">Description</th>
              <th scope="col" style={{ width: "40px" }}></th>
            </tr>
          </thead>
          <tbody>
            {roleData.map((role, i) => (
              <tr key={i}>
                <td>
                  <Input type="checkbox" />
                </td>
                <td>{role.roleName}</td>
                <td className="text-truncate" style={{ maxWidth: "450px" }}>
                  {role.roleDescription}
                </td>
                <td className="d-flex flex-start gap-3">
                  <Button
                    className="btn btn-primary"
                    onClick={() => handleView(role.roleName)}
                  >
                      <i className="ri-eye-line"></i>
                    
                  </Button>
                  <Button
                    className="btn btn-primary"
                    onClick={() => handleUpdateView(role.roleName)}
                  >
                    <i className="ri-pencil-line"></i>
                  </Button>
                  <Button
                    className="btn btn-primary"
                    onClick={() => handleDelete(role.roleName)}
                  >
                    <i className="ri-delete-bin-2-line"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          <Role
            show={viewRoleModal}
            cancel={() => setViewRoleModal(!viewRoleModal)}
            roleItemData={selectedRoleData}
          />

          <UpdateRole
            show={updateRoleModal}
            cancel={() => setUpdateRoleModal(!updateRoleModal)}
            roleItemData={selectedRoleData}
          />
          <Modal
            isOpen={selectedRoleToDelete !== null}
            toggle={() => setSelectedRoleToDelete(null)}
            centered
          >
            <ModalHeader className="modal-title">
              Delete Role: {selectedRoleToDelete}
            </ModalHeader>
            <ModalBody>
              <div className="d-flex flex-column gap-4">
                <span>Are you sure you would like to delete this role?</span>
                <div className="d-flex flex-row gap-3">
                  <Button
                    type="button"
                    className="btn btn-danger"
                    onClick={confirmDelete}
                  >
                    Delete
                  </Button>
                  <Button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setSelectedRoleToDelete(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </ModalBody>
          </Modal>
        </Table>
      </div>
    </div>
  );
}

export default RolesTab;
