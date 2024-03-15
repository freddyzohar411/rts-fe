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
import { deleteGroup, listGroups } from "../../../store/group/action";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function GroupsTab() {
  const [isLoading, setIsLoading] = useState(false);
  const deleteMeta = useSelector((state) => state.GroupReducer.deleteMeta);
  const groupListing =
    useSelector((state) => state?.GroupReducer.groupListing) ?? [];
  const groups = groupListing?.userGroups ?? [];
  const dispatch = useDispatch();

  // Pagination
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const totalPages = groupListing.totalPages;

  useEffect(() => {
    _getData();
  }, [page, pageSize, sortBy, sortDirection, search]);

  useEffect(() => {
    if (deleteMeta?.isSuccess) {
      _getData();
    }
  }, [deleteMeta]);

  const _getData = () => {
    const pageRequest = {
      page,
      pageSize,
      sortBy,
      sortDirection,
      searchTerm: search,
    };
    dispatch(listGroups(pageRequest));
  };

  const handleSortAndDirection = (column) => {
    // Get the name of the column
    setSortBy(column);
    // If the sort direction is ascending, set it to descending and vice versa
    if (sortDirection === "asc") {
      setSortDirection("desc");
    } else {
      setSortDirection("asc");
    }
  };

  // Handle Page Size
  const handleChangePageSize = (e) => {
    setPageSize(e.target.value);
    setPage(0);
  };

  // Handle Delete
  const [modal, setModal] = useState(false);
  const [deletedId, setDeletedId] = useState();

  const handleDelete = () => {
    setModal(false);
    dispatch(deleteGroup(deletedId));
  };

  useEffect(() => {
    if (groups && groups.length === 0) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } else {
      setIsLoading(true);
    }
  }, [groups]);

  return (
    <div>
      <Row>
        <Col lg={12}>
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

      <Row>
        <Col lg={12}>
          <Table className="table table-hover table-striped border-secondary align-middle table-nowrap rounded-3">
            <thead style={{ backgroundColor: "#B8DAF3", color: "#000000" }}>
              <tr>
                <th scope="col">
                  <span className="me-1">Group Name</span>
                  <i
                    className="mdi mdi-sort"
                    onClick={() => handleSortAndDirection("userGroupName")}
                    style={{ cursor: "pointer" }}
                  ></i>
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
              {groups && groups?.length > 0 ? (
                groups?.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item?.userGroupName}</td>
                    <td className="text-wrap">{item?.userGroupDescription}</td>
                    <td className="d-flex flex-row justify-between gap-2">
                      <Link to={`/settings/access/group/${item?.id}`}>
                        <Button
                          className="btn btn-custom-primary px-2 py-1"
                          style={{ pointerEvents: "none" }}
                        >
                          <i
                            className="ri-eye-line"
                            style={{ fontSize: "0.65rem" }}
                          ></i>
                        </Button>
                      </Link>
                      <Link to={`/settings/access/group/update/${item?.id}`}>
                        <Button
                          className="btn btn-custom-primary px-2 py-1"
                          style={{ pointerEvents: "none" }}
                        >
                          <i
                            className="ri-pencil-line"
                            style={{ fontSize: "0.65rem" }}
                          ></i>
                        </Button>
                      </Link>
                      <Button
                        className="btn btn-danger px-2 py-0"
                        onClick={() => {
                          setModal(true);
                          setDeletedId(item?.id);
                        }}
                      >
                        <i
                          className="ri-delete-bin-line"
                          style={{ fontSize: "0.65rem" }}
                        ></i>
                      </Button>
                    </td>
                  </tr>
                ))
              ) : isLoading ? (
                <tr>
                  <td colSpan={3}>
                    <Skeleton count={5} />
                  </td>
                </tr>
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
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="d-flex flex-row justify-content-between align-items-baseline">
            <div>
              <Input
                type="select"
                className="form-select form-select-md"
                onChange={handleChangePageSize}
                value={pageSize}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
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

export default GroupsTab;
