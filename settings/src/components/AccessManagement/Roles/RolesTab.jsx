import React, { useEffect, useState } from "react";
import { Button, Input, Table } from "reactstrap";
import { roleData } from "../dataSample";
import NewRole from "./NewRole";
import Role from "./Role";
import UpdateRole from "./UpdateRole";
function RolesTab() {
  const [createRole, setCreateRole] = useState(false);
  const [viewRoleModal, setViewRoleModal] = useState(false);
  const [selectedRoleData, setSelectedRoleData] = useState(null);
  const [updateRoleModal, setUpdateRoleModal] = useState(false);

  const handleUpdateView = (role) => {
    const selectedRole = roleData.find((item) => item.roleName === role);
    setSelectedRoleData(selectedRole);
    setUpdateRoleModal(!updateRoleModal);
  };

  const handleView = (role) => {
    const selectedRole = roleData.find((item) => item.roleName === role);
    setSelectedRoleData(selectedRole);
    setViewRoleModal(!viewRoleModal);
    console.log("Selected Role:", selectedRole);
  };

  useEffect(() => {
    // This code will run after the state update is processed
    console.log("Selected Role Data:", selectedRoleData);
  }, [selectedRoleData]); // Use selectedRoleData as a dependency

  return (
    <div>
      <h5 className="fw-bolder">Manage Roles and Permission</h5>
      <p className="text-muted">
        Configure roles to define the different groups of authorities.
      </p>
      <div className="d-flex flex-row gap-2 mb-4">
        <Button
          className="btn btn-dark btn-sm d-flex flex-row align-items-center"
          onClick={() => {
            setCreateRole(true);
          }}
        >
          <i className="ri-contacts-line me-2"></i>
          <span>ADD NEW ROLE</span>
        </Button>
        <Button className="btn btn-dark btn-sm d-flex flex-row align-items-center">
          <i className="ri-lock-2-line me-2"></i>
          <span>ADD NEW PERMISSIONS</span>
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
                <td>{role.roleDescription}</td>
                <td className="d-flex flex-start gap-3">
                  <Button
                    className="btn btn-dark"
                    onClick={() => handleView(role.roleName)}
                  >
                    <i className="ri-eye-line"></i>
                  </Button>
                  <Button
                    className="btn btn-dark"
                    onClick={() => handleUpdateView(role.roleName)}
                  >
                    <i className="ri-pencil-line"></i>
                  </Button>
                  <Button className="btn btn-dark">
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
          <NewRole
            show={createRole}
            cancel={() => setCreateRole(!createRole)}
          />
          <UpdateRole
            show={updateRoleModal}
            cancel={() => setUpdateRoleModal(!updateRoleModal)}
            roleItemData={selectedRoleData}
          />
        </Table>
      </div>
    </div>
  );
}

export default RolesTab;
