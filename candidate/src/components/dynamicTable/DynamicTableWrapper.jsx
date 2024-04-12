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
} from "../../store/candidate/action";
import { DeleteCustomModal } from "@workspace/common";
import { all } from "redux-saga/effects";

const DynamicTableWrapper = ({
  data,
  pageInfo,
  pageRequestSet,
  config,
  search,
  setSearch,
  optGroup,
  setCustomConfigData,
  confirmDelete,
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

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card className="m-3">
                <CardBody>
                  <div className="listjs-table">
                    <Row className="d-flex column-gap-1 mb-3">
                      {setSearch && (
                        <Col>
                          <div className="search-box">
                            <form onSubmit={pageRequestSet.setSearchTerm}>
                              <Input
                                type="text"
                                placeholder="Search"
                                className="form-control search bg-light border-light"
                                value={search}
                                style={{ width: "350px" }}
                                onChange={(e) => setSearch(e.target.value)}
                              />
                            </form>
                            <i className="ri-search-line search-icon"></i>
                          </div>
                        </Col>
                      )}
                      <Col>
                        <div className="d-flex column-gap-2 justify-content-end">
                          <Button
                            type="button"
                            className="btn btn-custom-primary d-flex align-items-center header-btn"
                            onClick={() =>
                              DynamicTableHelper.handleExportExcel(
                                "Candidates",
                                data,
                                config.slice(2, -1),
                                customRenderList,
                                true
                              )
                            }
                          >
                            <span>
                              <i className="mdi mdi-download me-1"></i>
                            </span>
                            Export
                          </Button>
                          <Dropdown
                            isOpen={customViewDropdownOpen}
                            toggle={() =>
                              setCustomViewDropdownOpen(!customViewDropdownOpen)
                            }
                          >
                            <DropdownToggle
                              caret
                              className="btn btn-custom-primary py-2"
                            >
                              <i className="ri-settings-3-fill me-2"></i>
                              <span>Custom View</span>
                            </DropdownToggle>
                            <DropdownMenu>
                              <Link to="/candidates/custom-view">
                                <DropdownItem>Create Custom View</DropdownItem>
                              </Link>
                              <DropdownItem divider />
                              <DropdownItem header>
                                My Custom Views
                              </DropdownItem>
                              {allCandidateCustomViews &&
                              allCandidateCustomViews.length > 0 ? (
                                allCandidateCustomViews.map(
                                  (customView, index) => (
                                    <div className="d-flex flex-row gap-1 me-2 mb-1 ">
                                      <DropdownItem
                                        key={index}
                                        onClick={() => {
                                          handleSelectCustomView(
                                            customView?.id
                                          );
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
                                          handleDeleteButtonClick(
                                            customView?.id
                                          )
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
                            <Button
                              type="button"
                              className="btn btn-custom-primary"
                            >
                              <Link
                                to="/candidates/create"
                                style={{ color: "white" }}
                              >
                                Create New Candidate
                              </Link>
                            </Button>
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
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DynamicTableWrapper;
