import React, { useState } from "react";
import { Button, ButtonGroup, Col, Input, Row, Table } from "reactstrap";
import { userGroupData, userGroupMembersData } from "../dataSample";
import Group from "./Group";
import UpdateGroup from "./UpdateGroup";

function GroupsTab() {
  // PAGINATION
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = userGroupData.slice(startIndex, endIndex);
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(userGroupData.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // MODALS
  const [groupModal, setGroupModal] = useState(false);
  const [selectedGroupData, setSelectedGroupData] = useState(null);
  const handleView = (group) => {
    const selectedGroup = userGroupData.find(
      (item) => item.groupName === group
    );
    setSelectedGroupData(selectedGroup);
    setGroupModal(!groupModal);
  };
  const [updateGroupModal, setUpdateGroupModal] = useState(false);
  const handleUpdateView = (group) => {
    const selectedGroup = userGroupData.find(
      (item) => item.groupName === group
    );
    setSelectedGroupData(selectedGroup);
    setUpdateGroupModal(!updateGroupModal);
  };

  return (
    <div>
      <Row>
        <Col lg={12}>
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
          <Table className="table table-hover table-bordered table-striped border-light align-middle table-nowrap rounded-3">
            <thead>
              <tr>
                <th scope="col" style={{ width: "20px" }}></th>
                <th scope="col">Group Name</th>
                <th scope="col" style={{ width: "600px" }}>
                  Description
                </th>
                <th scope="col" style={{ width: "10px" }}></th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, idx) => (
                <tr key={idx}>
                  <td>
                    <Input
                      type="checkbox"
                      className="form-check-input"
                      name="groupCheckbox"
                    />
                  </td>
                  <td>{item.groupName}</td>
                  <td className="text-wrap">{item.groupDescription}</td>
                  <td className="d-flex flex-row justify-between gap-2">
                    <Button
                      className="btn btn-dark"
                      onClick={() => handleView(item.groupName)}
                    >
                      <i className="ri-eye-line"></i>
                    </Button>
                    <Button
                      className="btn btn-dark"
                      onClick={() => handleUpdateView(item.groupName)}
                    >
                      <i className="ri-pencil-line"></i>
                    </Button>
                    <Button className="btn btn-dark">
                      <i className="ri-delete-bin-line"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Group
            show={groupModal}
            cancel={() => setGroupModal(!groupModal)}
            groupData={selectedGroupData}
          />
          <UpdateGroup
            show={updateGroupModal}
            cancel={() => setUpdateGroupModal(!updateGroupModal)}
            groupData={selectedGroupData}
          />
          <div className="d-flex flex-row justify-content-end">
            <ButtonGroup>
              <Button
                className="btn btn-dark"
                onClick={() => handlePrevPage()}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button className="btn btn-dark">
                <span>Page {currentPage}</span>
              </Button>
              <Button
                className="btn btn-dark"
                onClick={() => handleNextPage()}
                disabled={currentPage * itemsPerPage >= userGroupData.length}
              >
                Next
              </Button>
            </ButtonGroup>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default GroupsTab;
