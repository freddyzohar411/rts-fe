import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonGroup,
} from "reactstrap";
import { Link } from "react-router-dom";
import { DynamicTable } from "@workspace/common";
import DualListBox from "react-dual-listbox";
import { CANDIDATE_INITIAL_OPTIONS } from "../../pages/CandidateListing/candidateListingConstants";
import "./DynamicTableWrapper.scss";
import { useUserAuth } from "@workspace/login";
import { toast } from "react-toastify";
import { DateHelper, DynamicTableHelper } from "@workspace/common";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCandidateCustomView,
  selectCandidateCustomView,
  deleteCandidateCustomView,
  deleteCandidates,
  deleteCandidatesReset,
  fetchCandidates,
} from "../../store/candidate/action";
import { DeleteCustomModal } from "@workspace/common";
import TableRowsPerPageWithNav from "@workspace/common/src/Components/DynamicTable/TableRowsPerPageWithNav";
import TableItemDisplay from "@workspace/common/src/Components/DynamicTable/TableItemDisplay";

const DynamicTableWrapper = ({
  data,
  pageInfo,
  pageRequest,
  pageRequestSet,
  config,
  search,
  setSearch,
  optGroup,
  setCustomConfigData,
  header,
  activeRow,
  setActiveRow,
  setTableConfig,
}) => {
  // ================== Custom Render ==================
  const customRenderList = [
    {
      names: ["updatedAt", "createdAt"],
      render: (data, opt) =>
        DateHelper.formatDateStandard2(
          DynamicTableHelper.getDynamicNestedResultForExport(data, opt?.name) ||
            ""
        ),
    },
  ];
  // ==================================================
  const { Permission, checkAllPermission } = useUserAuth();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingCustomViewId, setDeletingCustomViewId] = useState(null);
  const dispatch = useDispatch();
  const [customViewDropdownOpen, setCustomViewDropdownOpen] = useState(false);

  const candidateMeta = useSelector(
    (state) => state.CandidateReducer.candidateMeta
  );
  const allCandidateCustomViews = useSelector(
    (state) => state?.CandidateReducer?.candidateCustomViews
  );

  const deleteCandidatesMeta = useSelector(
    (state) => state.CandidateReducer?.deleteCandidatesMeta
  );

  // Delete modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCandidateCustomView());
  }, []);

  const handleSelectCustomView = (id) => {
    dispatch(selectCandidateCustomView({ id: id }));
  };

  const handleDeleteButtonClick = (id) => {
    setDeletingCustomViewId(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteCustomView = (id) => {
    dispatch(deleteCandidateCustomView({ id: id }));
    setDeleteModalOpen(false);
    setDeletingCustomViewId(null);
  };

  useEffect(() => {
    if (allCandidateCustomViews && allCandidateCustomViews.length > 0) {
      const selectedCustomView = allCandidateCustomViews?.find(
        (customView) => customView?.selected
      );
      if (
        selectedCustomView &&
        Array.isArray(optGroup) &&
        optGroup.length > 0
      ) {
        const selectedGroup = selectedCustomView?.columnName?.split(",");
        const selectedObjects = selectedGroup?.map((value) => {
          return optGroup?.find((option) => option?.value === value);
        });
        if (selectedObjects.length > 0) {
          setCustomConfigData(selectedObjects);
        }
      }
    } else {
      setCustomConfigData(CANDIDATE_INITIAL_OPTIONS);
    }
  }, [allCandidateCustomViews, optGroup]);

  const handleEportExcel = () => {
    let exportData = null;
    if (!activeRow) {
      exportData = data;
    } else if (activeRow?.length === 0) {
      exportData = data;
    } else {
      exportData = data.filter((item) => activeRow.includes(item?.id));
    }

    DynamicTableHelper.handleExportExcel(
      "Candidates",
      exportData,
      config.slice(2, -1),
      customRenderList,
      true
    );
  };

  const handleDelete = () => {
    if (activeRow?.length === 0) {
      toast.error("Please select at least one record to delete.");
      return;
    }
    setIsDeleteModalOpen(true);
  };

  // Modal Delete accounts
  const confirmDelete = () => {
    dispatch(deleteCandidates(activeRow));
  };

  useEffect(() => {
    if (deleteCandidatesMeta?.isSuccess) {
      dispatch(deleteCandidatesReset());
      toast.success("Candidate deleted successfully");
      setIsDeleteModalOpen(false);
      setActiveRow([]);
      dispatch(
        fetchCandidates(DynamicTableHelper.cleanPageRequest(pageRequest))
      );
    }
  }, [deleteCandidatesMeta?.isSuccess]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <div className="listjs-table">
                <Row className="d-flex mb-3">
                  <Col className="d-flex align-items-center gap-3">
                    <span className="fw-semibold fs-3">
                      {header}
                      {` (${pageInfo?.totalElements || 0})`}
                    </span>
                    {setSearch && (
                      <div className="search-box">
                        <form onSubmit={pageRequestSet.setSearchTerm}>
                          <Input
                            type="text"
                            placeholder="Search"
                            className="form-control search"
                            value={search}
                            style={{ width: "300px", height: "40px" }}
                            onChange={(e) => setSearch(e.target.value)}
                          />
                        </form>
                        <i className="ri-search-line search-icon"></i>
                      </div>
                    )}
                  </Col>
                  <Col>
                    <div className="d-flex column-gap  gap-1 justify-content-end align-items-center">
                      <TableItemDisplay pageInfo={pageInfo} />
                      <div
                        style={{
                          width: "2px",
                          height: "20px",
                          backgroundColor: "#adb5bd",
                          marginLeft: "12px",
                        }}
                      ></div>
                      <TableRowsPerPageWithNav
                        pageInfo={pageInfo}
                        pageRequestSet={pageRequestSet}
                      />
                      <ButtonGroup>
                        <Dropdown
                          isOpen={customViewDropdownOpen}
                          toggle={() =>
                            setCustomViewDropdownOpen(!customViewDropdownOpen)
                          }
                        >
                          <DropdownToggle
                            color="light"
                            className="btn-white bg-gradient border-2 border-light-grey fw-bold d-flex flex-row align-items-center"
                            style={{
                              borderTopRightRadius: "0px",
                              borderBottomRightRadius: "0px",
                              height: "40px",
                            }}
                          >
                            <i className="ri-settings-3-fill fs-5"></i>
                          </DropdownToggle>
                          <DropdownMenu className="mt-1">
                            <Link to="/candidates/custom-view">
                              <DropdownItem>Create Custom View</DropdownItem>
                            </Link>
                            <DropdownItem divider />
                            <DropdownItem header>My Custom Views</DropdownItem>
                            {allCandidateCustomViews &&
                            allCandidateCustomViews.length > 0 ? (
                              allCandidateCustomViews.map(
                                (customView, index) => (
                                  <div className="d-flex flex-row gap-1 me-2 mb-1 ">
                                    <DropdownItem
                                      key={index}
                                      onClick={() => {
                                        handleSelectCustomView(customView?.id);
                                      }}
                                    >
                                      <div className="d-flex flex-row justify-content-between">
                                        <span className="me-2">
                                          {customView?.name}
                                        </span>
                                        {customView?.selected && (
                                          <span>
                                            <i className="ri-check-fill"></i>
                                          </span>
                                        )}
                                      </div>
                                    </DropdownItem>

                                    <Button
                                      className="btn btn-sm btn-danger"
                                      onClick={() =>
                                        handleDeleteButtonClick(customView?.id)
                                      }
                                    >
                                      <i className="mdi mdi-delete"></i>
                                    </Button>
                                  </div>
                                )
                              )
                            ) : (
                              <DropdownItem text>
                                No custom view created yet.
                              </DropdownItem>
                            )}
                          </DropdownMenu>
                        </Dropdown>
                        <Button
                          color="light"
                          className="btn-white bg-gradient border-2 border-light-grey fw-bold d-flex flex-row align-items-center"
                          onClick={handleEportExcel}
                          style={{ height: "40px" }}
                        >
                          <i className="ri-download-fill align-bottom fs-5"></i>
                        </Button>
                        <Button
                          color="light"
                          className="btn-white bg-gradient border-2 border-light-grey fw-bold d-flex flex-row align-items-center"
                          onClick={handleDelete}
                          style={{ height: "40px" }}
                        >
                          <i className="mdi mdi-delete align-bottom fs-5"></i>
                        </Button>
                      </ButtonGroup>
                      <DeleteCustomModal
                        isOpen={deleteModalOpen}
                        setIsOpen={setDeleteModalOpen}
                        confirmDelete={() =>
                          handleDeleteCustomView(deletingCustomViewId)
                        }
                        header="Delete Custom View Confirmation"
                        deleteText={`Are you sure you want to delete this custom view?`}
                        confirmButtonText="Delete"
                        isLoading={false}
                      />
                      {checkAllPermission([Permission.CANDIDATE_WRITE]) && (
                        <Link
                          to="/candidates/create"
                          style={{ color: "black" }}
                        >
                          <Button
                            type="button"
                            className="btn btn-custom-primary header-btn d-flex align-items-center"
                            style={{ height: "40px" }}
                          >
                            <span className="fs-3 align-bottom">+</span>
                          </Button>
                        </Link>
                      )}
                    </div>
                  </Col>
                </Row>
                <DynamicTable
                  config={config}
                  data={data}
                  pageRequestSet={pageRequestSet}
                  pageInfo={pageInfo}
                  isLoading={candidateMeta?.isLoading}
                  freezeHeader={true}
                  activeRow={activeRow}
                  setTableConfig={setTableConfig}
                />
              </div>
            </Col>
          </Row>
          <DeleteCustomModal
            isOpen={isDeleteModalOpen}
            setIsOpen={setIsDeleteModalOpen}
            confirmDelete={confirmDelete}
            header="Delete Candidate"
            deleteText={"Are you sure you would like to delete this candidate?"}
            isLoading={deleteCandidatesMeta?.isLoading}
          />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DynamicTableWrapper;
