import React from "react";
import { Button, Input, Table } from "reactstrap";
import { roleData } from "../dataSample";
import { Link } from "react-router-dom";

function RolesTab() {
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
                  <Link to={`/settings/access/role/${role.roleName}`}>
                    <Button className="btn btn-primary">
                      <i className="ri-eye-line"></i>
                    </Button>
                  </Link>
                  <Link to={`/settings/access/role/update/${role.roleName}`}>
                    <Button className="btn btn-primary">
                      <i className="ri-pencil-line"></i>
                    </Button>
                  </Link>
                  <Button className="btn btn-primary">
                    <i className="ri-delete-bin-2-line"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>

          {/* <UpdateRole
            show={updateRoleModal}
            cancel={() => setUpdateRoleModal(!updateRoleModal)}
            roleItemData={selectedRoleData}
          /> */}

          {/* Delete Modal */}
          {/* <Modal
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
          </Modal> */}
        </Table>
      </div>
    </div>
  );
}

export default RolesTab;
