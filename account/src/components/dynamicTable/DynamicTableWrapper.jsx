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
import { ACCOUNT_INITIAL_OPTIONS } from "../../pages/AccountListing/accountListingConstants";
import "./DynamicTableWrapper.scss";
import { useUserAuth } from "@workspace/login";
import { toast } from "react-toastify";
import { DateHelper, DynamicTableHelper } from "@workspace/common";
import {
  fetchAccountCustomView,
  selectAccountCustomView,
  deleteAccountCustomView,
} from "../../store/account/action";
import { DeleteCustomModal } from "@workspace/common";
import { useDispatch, useSelector } from "react-redux";

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
  header,
  activeRow,
  setTableConfig
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
  const [customViewShow, setCustomViewShow] = useState(false);
  const [selectedOptGroup, setSelectedOptGroup] = useState(
    ACCOUNT_INITIAL_OPTIONS
  );
  const [isCustomViewModalOpen, setIsCustomModalView] = useState(false);
  const dispatch = useDispatch();
  const [customViewDropdownOpen, setCustomViewDropdownOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingCustomViewId, setDeletingCustomViewId] = useState(null);

  const accountsMeta = useSelector(
    (state) => state.AccountReducer.accountsMeta
  );
  const allAccountCustomViews = useSelector(
    (state) => state?.AccountReducer?.accountCustomViews
  );

  useEffect(() => {
    dispatch(fetchAccountCustomView());
  }, []);

  const handleSelectCustomView = (id) => {
    dispatch(selectAccountCustomView({ id: id }));
  };

  const handleDeleteButtonClick = (id) => {
    setDeleteModalOpen(true);
    setDeletingCustomViewId(id);
  };
  const handleDeleteCustomView = (id) => {
    dispatch(deleteAccountCustomView({ id: id }));
    setDeleteModalOpen(false);
    setDeletingCustomViewId(null);
  };

  useEffect(() => {
    if (allAccountCustomViews && allAccountCustomViews.length > 0) {
      const selectedCustomView = allAccountCustomViews?.find(
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
      setCustomConfigData(ACCOUNT_INITIAL_OPTIONS);
    }
  }, [allAccountCustomViews, optGroup]);

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
      "Accounts",
      exportData,
      config.slice(2, -1),
      customRenderList,
      true
    );
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <div className="listjs-table">
                <Row className="mb-2">
                  <Col>
                    <span className="fw-semibold fs-3">{header}</span>
                  </Col>
                </Row>
                <Row className="d-flex column-gap-1 mb-3">
                  {setSearch && (
                    <Col>
                      <div className="search-box">
                        <form onSubmit={pageRequestSet.setSearchTerm}>
                          <Input
                            type="text"
                            placeholder="Search"
                            className="form-control search"
                            value={search}
                            style={{ width: "350px", height: "40px" }}
                            onChange={(e) => setSearch(e.target.value)}
                          />
                        </form>
                        <i className="ri-search-line search-icon"></i>
                      </div>
                    </Col>
                  )}
                  <Col>
                    <div className="d-flex column-gap-2 justify-content-end">
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
                            <Link to="/accounts/custom-view">
                              <DropdownItem>Create Custom View</DropdownItem>
                            </Link>
                            <DropdownItem divider />
                            <DropdownItem header>My Custom Views</DropdownItem>
                            {allAccountCustomViews &&
                            allAccountCustomViews.length > 0 ? (
                              allAccountCustomViews?.map(
                                (customView, index) => (
                                  <div className="d-flex flex-row gap-1 me-2">
                                    <DropdownItem
                                      onClick={() => {
                                        handleSelectCustomView(customView?.id);
                                      }}
                                      key={index}
                                    >
                                      <div className="d-flex flex-row align-items-center justify-content-between">
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
                                      style={{ height: "29px" }}
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
                              <>
                                <DropdownItem text>
                                  No custom view created yet!
                                </DropdownItem>
                              </>
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
                      {checkAllPermission([Permission.ACCOUNT_WRITE]) && (
                        <Link to="/accounts/create" style={{ color: "black" }}>
                          <Button
                            type="button"
                            className="btn btn-custom-primary header-btn px-4"
                            style={{ height: "40px" }}
                          >
                            <span className="fs-5 align-bottom">
                              + ADD ACCOUNT
                            </span>
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
                  isLoading={accountsMeta?.isLoading}
                  freezeHeader={true}
                  activeRow={activeRow}
                  setTableConfig={setTableConfig}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DynamicTableWrapper;
