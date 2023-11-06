import React, { useState } from "react";
import {
  Button,
  Col,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteGroup, fetchGroups } from "../../../store/group/action";
import { useEffect } from "react";

function GroupsTab() {
  const [modal, setModal] = useState(false);
  const [deletedId, setDeletedId] = useState();

  const dispatch = useDispatch();
  // PAGINATION
  const groups = useSelector((state) => state?.GroupReducer?.groups) ?? [];

  useEffect(() => {
    dispatch(fetchGroups());
  }, []);

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = groups?.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(groups?.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Search Group
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredGroups = currentData?.filter((group) => {
    if (searchTerm === "") {
      return "No results found";
    } else if (
      group?.userGroupName?.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return group;
    }
  });

  const handleDelete = () => {
    setModal(false);
    dispatch(deleteGroup(deletedId));
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
          <Table className="table table-hover table-bordered table-striped border-secondary align-middle table-nowrap rounded-3">
            <thead>
              <tr>
                <th scope="col">
                  <span className="me-1">Group Name</span>
                  <i className="mdi mdi-sort" style={{ cursor: "pointer" }}></i>
                  
                </th>
                <th scope="col" style={{ width: "600px" }}>
                  Description
                </th>
                <th scope="col" style={{ width: "10px" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredGroups?.length > 0 ? (
                filteredGroups?.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item?.userGroupName}</td>
                    <td className="text-wrap">{item?.userGroupDescription}</td>
                    <td className="d-flex flex-row justify-between gap-2">
                      <Link to={`/settings/access/group/${item?.id}`}>
                        <Button
                          className="btn btn-custom-primary"
                          style={{ pointerEvents: "none" }}
                        >
                          <i className="ri-eye-line"></i>
                        </Button>
                      </Link>
                      <Link to={`/settings/access/group/update/${item?.id}`}>
                        <Button
                          className="btn btn-custom-primary"
                          style={{ pointerEvents: "none" }}
                        >
                          <i className="ri-pencil-line"></i>
                        </Button>
                      </Link>
                      <Button
                        className="btn btn-custom-primary"
                        onClick={() => {
                          setModal(true);
                          setDeletedId(item?.id);
                        }}
                      >
                        <i className="ri-delete-bin-line"></i>
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No groups found!</td>
                </tr>
              )}
            </tbody>
          </Table>
          <Modal isOpen={modal} toggle={() => setModal(false)} centered>
            <ModalHeader>Are you sure?</ModalHeader>
            <ModalBody>You are deleting this group.</ModalBody>
            <ModalFooter>
              <Button
                className="btn btn-custom-primary"
                onClick={() => handleDelete()}
              >
                Delete
              </Button>
              <Button
                className="btn btn-custom-primary"
                onClick={() => setModal(false)}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
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
                disabled={currentPage * itemsPerPage >= filteredGroups?.length}
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

export default GroupsTab;
