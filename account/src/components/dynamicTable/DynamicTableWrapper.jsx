import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Input,
  Row,
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
  resetAccountCustomView,
  resetAccounts,
} from "../../store/account/action";
import { DeleteCustomModal } from "@workspace/common";
import { useDispatch, useSelector } from "react-redux";
import TableRowsPerPageWithNav from "@workspace/common/src/Components/DynamicTable/TableRowsPerPageWithNav";
import TableItemDisplay from "@workspace/common/src/Components/DynamicTable/TableItemDisplay";
import {
  fetchAccounts,
  deleteAccounts,
  deleteAccountsReset,
} from "../../store/account/action";
import { TooltipWrapper } from "@workspace/common";
import { getAccounts } from "../../helpers/backend_helper";

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

  const deleteAccountsMeta = useSelector(
    (state) => state.AccountReducer.deleteAccountsMeta
  );

  // Delete modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAccountCustomView());
    return () => {
      dispatch(resetAccountCustomView());
    };
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
    if (allAccountCustomViews != null && allAccountCustomViews.length > 0) {
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
        pageRequestSet.setFilterData(selectedCustomView?.filters);
      }
    }
    if (allAccountCustomViews != null && allAccountCustomViews.length === 0) {
      enableDefaultView();
    }
    return () => {
      dispatch(resetAccounts());
    }
  }, [allAccountCustomViews, optGroup]);

  const enableDefaultView = () => {
    setCustomConfigData(ACCOUNT_INITIAL_OPTIONS);
    pageRequestSet.setFilterData(null);
  };

  const handleEportExcel = async () => {
    let exportData = null;
    try {
      const payload = { ...pageRequest, isDownload: true };
      const resp = await getAccounts(payload);
      exportData = resp?.data?.accounts;
      if (activeRow?.length > 0) {
        exportData = exportData.filter((item) => activeRow.includes(item?.id));
      }
    } catch (e) {}

    DynamicTableHelper.handleExportExcel(
      "Accounts",
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
    dispatch(deleteAccounts(activeRow));
  };

  useEffect(() => {
    if (deleteAccountsMeta?.isSuccess) {
      dispatch(deleteAccountsReset());
      toast.success("Account deleted successfully");
      setIsDeleteModalOpen(false);
      if (pageRequest?.searchFields?.length > 0) {
        setActiveRow([]);
        dispatch(
          fetchAccounts(DynamicTableHelper.cleanPageRequest(pageRequest))
        );
      }
    }
  }, [deleteAccountsMeta?.isSuccess]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <div
                className="listjs-table d-flex flex-column"
                style={{
                  height: "calc(100vh - 160px)",
                }}
              >
                <Row className="d-flex mb-3">
                  <Col className="d-flex align-items-center gap-3">
                    <span className="fw-semibold fs-3 d-flex gap-1">
                      <span>{header}</span>
                      <span> {` (${pageInfo?.totalElements || 0})`}</span>
                    </span>
                    {setSearch && (
                      <div className="search-box">
                        <form onSubmit={pageRequestSet.setSearchTerm}>
                          <Input
                            type="text"
                            placeholder="Search"
                            className="form-control search"
                            value={search}
                            style={{ width: "250px", height: "40px" }}
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
                      <ButtonGroup className="mx-1">
                        <TooltipWrapper tooltipText="Custom View">
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
                              <DropdownItem
                                onClick={() => {
                                  enableDefaultView();
                                }}
                              >
                                Enable Default View
                              </DropdownItem>
                              <DropdownItem divider />
                              <DropdownItem header>
                                My Custom Views
                              </DropdownItem>
                              {allAccountCustomViews &&
                              allAccountCustomViews.length > 0 ? (
                                allAccountCustomViews?.map(
                                  (customView, index) => (
                                    <div className="d-flex flex-row gap-1 me-2">
                                      <DropdownItem
                                        onClick={() => {
                                          handleSelectCustomView(
                                            customView?.id
                                          );
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
                                      <Link
                                        to={`/accounts/custom-view/${customView?.id}`}
                                      >
                                        <Button
                                          className="btn btn-sm btn-secondary"
                                          style={{ height: "29px" }}
                                        >
                                          <i className="ri-pencil-line"></i>
                                        </Button>
                                      </Link>
                                      <Button
                                        className="btn btn-sm btn-danger"
                                        style={{ height: "29px" }}
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
                                <>
                                  <DropdownItem text>
                                    No custom view created yet!
                                  </DropdownItem>
                                </>
                              )}
                            </DropdownMenu>
                          </Dropdown>
                        </TooltipWrapper>
                        <TooltipWrapper tooltipText="Export to Excel">
                          <Button
                            color="light"
                            className="btn-white bg-gradient border-2 border-light-grey fw-bold d-flex flex-row align-items-center"
                            onClick={handleEportExcel}
                            style={{
                              height: "40px",
                              borderTopLeftRadius:
                                checkAllPermission([
                                  Permission.ACCOUNT_DELETE,
                                ]) && "4px",
                              borderBottomLeftRadius:
                                checkAllPermission([
                                  Permission.ACCOUNT_DELETE,
                                ]) && "4px",
                            }}
                          >
                            <i className="ri-download-fill align-bottom fs-5"></i>
                          </Button>
                        </TooltipWrapper>
                        {checkAllPermission([Permission.ACCOUNT_DELETE]) && (
                          <TooltipWrapper tooltipText="Delete multiple">
                            <Button
                              color="light"
                              className="btn-white bg-gradient border-2 border-light-grey fw-bold d-flex flex-row align-items-center"
                              onClick={handleDelete}
                              style={{
                                height: "40px",
                                borderTopRightRadius: "4px",
                                borderBottomRightRadius: "4px",
                              }}
                            >
                              <i className="mdi mdi-delete align-bottom fs-5"></i>
                            </Button>
                          </TooltipWrapper>
                        )}
                      </ButtonGroup>
                      {checkAllPermission([Permission.ACCOUNT_WRITE]) && (
                        <Link to="/accounts/create" style={{ color: "black" }}>
                          <TooltipWrapper tooltipText="Add Acount">
                            <Button
                              type="button"
                              className="btn btn-custom-primary header-btn d-flex align-items-center"
                              style={{
                                height: "40px",
                                backgroundColor: "#0A65CC",
                              }}
                            >
                              <span className="fs-3 align-bottom">+</span>
                            </Button>
                          </TooltipWrapper>
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
                  isLoading={accountsMeta?.isLoading ?? true}
                  freezeHeader={true}
                  activeRow={activeRow}
                  setTableConfig={setTableConfig}
                  pageRequest={pageRequest}
                  tableHeight="100%"
                />
              </div>
            </Col>
          </Row>
          <DeleteCustomModal
            isOpen={deleteModalOpen}
            setIsOpen={setDeleteModalOpen}
            confirmDelete={() => handleDeleteCustomView(deletingCustomViewId)}
            header="Delete Custom View Confirmation"
            deleteText={`Are you sure you want to delete this custom view?`}
            confirmButtonText="Delete"
            isLoading={false}
          />
          <DeleteCustomModal
            isOpen={isDeleteModalOpen}
            setIsOpen={setIsDeleteModalOpen}
            confirmDelete={confirmDelete}
            header="Delete Account"
            deleteText={"Are you sure you would like to delete this account?"}
            isLoading={deleteAccountsMeta?.isLoading}
          />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DynamicTableWrapper;
