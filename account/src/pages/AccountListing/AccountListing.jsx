import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Badge, Input, DropdownItem } from "reactstrap";
import "react-dual-listbox/lib/react-dual-listbox.css";
import {
  useTableHook,
  DeleteCustomModal,
  DynamicTableHelper,
} from "@workspace/common";
import DynamicTableWrapper from "../../components/dynamicTable/DynamicTableWrapper";
import {
  ACCOUNT_INITIAL_OPTIONS,
  ACCOUNT_MANDATORY_OPTIONS,
} from "./accountListingConstants";
import "./AccountListing.scss";
import {
  fetchAccounts,
  fetchAccountsFields,
  fetchAccountCustomView,
  deleteAccount,
} from "../../store/account/action";
import { DateHelper } from "@workspace/common";
import { useUserAuth } from "@workspace/login";
import ActionDropDown from "@workspace/common/src/Components/DynamicTable/Components/ActionDropDown";

const AccountListing = () => {
  const { Permission, checkAllPermission, checkAnyRole, Role } = useUserAuth();
  const dispatch = useDispatch();
  const accountsData = useSelector((state) => state.AccountReducer.accounts);
  const accountsFields = useSelector(
    (state) => state.AccountReducer.accountsFields
  );
  const accountCustomView = useSelector(
    (state) => state?.AccountReducer?.accountCustomViews
  );
  const [customConfigCV, setCustomConfigCV] = useState([]);

  // Table state
  const [tableConfig, setTableConfig] = useState([]);

  // Delete modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Custom renders
  const customRenderList = [
    {
      names: ["updatedAt", "createdAt"],
      render: (data, opt) =>
        DateHelper.formatDateStandard2(
          DynamicTableHelper.getDynamicNestedResult(data, opt.value) || "-"
        ),
    },
    {
      names: ["accountSubmissionData.accountStatus"],
      render: (data, opt) => (
        <Badge
          color={
            DynamicTableHelper.getDynamicNestedResult(
              data,
              opt.value
            )?.toLowerCase() === "active"
              ? "success"
              : "warning"
          }
          className="text-uppercase"
        >
          {DynamicTableHelper.getDynamicNestedResult(data, opt.value) || "-"}
        </Badge>
      ),
    },
    {
      names: ["accountNumber"],
      render: (data) => (
        <Link
          to={`/accounts/${data.id}/edit`}
          className="text-custom-primary text-decoration-underline"
          state={{ view: true }}
        >
          {data.accountNumber}
        </Link>
      ),
    },
    // Same for account name
    {
      names: ["accountSubmissionData.accountName"],
      render: (data) => (
        <Link
          to={`/accounts/${data.id}/edit`}
          className="text-custom-primary text-decoration-underline"
          state={{ view: true }}
        >
          {data.accountSubmissionData.accountName}
        </Link>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchAccountsFields());
    dispatch(fetchAccountCustomView());
  }, []);

  // Table Hooks
  const {
    pageRequest,
    pageRequestSet,
    pageInfo,
    setPageInfoData,
    search,
    setSearch,
    customConfig,
    setCustomConfigData,
    setTableData,
    tableData,
    handleRowCheck,
    selectAllRows,
    activeRow,
    setActiveRow,
  } = useTableHook(
    {
      page: 0,
      pageSize: 20,
      sortBy: null,
      sortDirection: "asc",
      searchTerm: null,
      searchFields: DynamicTableHelper.generateSeachFieldArray([]),
    },
    ACCOUNT_MANDATORY_OPTIONS,
    ACCOUNT_INITIAL_OPTIONS,
    customRenderList
  );

  //========================== User Setup ============================
  // This will vary with the table main page. Each table have it own config with additional columns
  const generateAccountConfig = (customConfig) => {
    return [
      {
        header: "#",
        name: "indexing",
        sort: false,
        // sortValue: "indexing",
        render: (data, index) => (
          <div className="d-flex column-gap-2">
            {pageInfo?.currentPage * pageInfo?.pageSize + (index + 1)}.
          </div>
        ),
      },
      {
        header: (
          <div className="form-check">
            <Input
              className="form-check-input"
              type="checkbox"
              id="checkbox"
              checked={
                activeRow?.length > 0 && activeRow?.length === tableData?.length
              }
              onChange={(e) => selectAllRows(e?.target?.checked)}
            />
          </div>
        ),
        name: "checkbox",
        sort: false,
        // sortValue: "checkbox",
        render: (data) => {
          return (
            <div className="form-check">
              <Input
                className="form-check-input"
                type="checkbox"
                name="chk_child"
                checked={activeRow?.includes(parseInt(data?.id))}
                onChange={(e) => handleRowCheck(data?.id, e.target.checked)}
              />
            </div>
          );
        },
      },
      // {
      //   header: "",
      //   name: "badges",
      //   sort: false,
      //   sortValue: "badges",
      //   render: () => (
      //     <div className="d-flex column-gap-2">
      //       <Badge color="dark">+1</Badge>
      //       <Badge color="dark">+2</Badge>
      //       <Badge color="dark">+10</Badge>
      //     </div>
      //   ),
      // },
      ...customConfig,
      {
        header: "Action",
        name: "action",
        sort: false,
        // sortValue: "action",
        sticky: "right",
        expand: true,
        center: true,
        render: (data) => (
          <ActionDropDown>
            {/* <DropdownItem>
              <Link
                to={`/accounts/${data.id}/edit`}
                style={{ color: "black" }}
                state={{ view: true }}
              >
                <div className="d-flex  align-items-center gap-2">
                  <i className="ri-eye-line"></i>
                  <span>View</span>
                </div>
              </Link>
            </DropdownItem> */}
            {checkAllPermission([Permission.ACCOUNT_EDIT]) && (
              <DropdownItem>
                <Link
                  to={`/accounts/${data.id}/edit`}
                  style={{ color: "black" }}
                  state={{ view: false }}
                >
                  <div className="d-flex  align-items-center gap-2">
                    <i className="mdi mdi-pencil"></i>
                    <span>Edit</span>
                  </div>
                </Link>
              </DropdownItem>
            )}
            {checkAllPermission([Permission.ACCOUNT_DELETE]) && (
              <DropdownItem>
                <span
                  type="button"
                  onClick={() => {
                    setDeleteId(data.id);
                    setIsDeleteModalOpen(true);
                  }}
                >
                  <div className="d-flex align-items-center gap-2">
                    <i className="mdi mdi-delete"></i>
                    <span>Delete</span>
                  </div>
                </span>
              </DropdownItem>
            )}
          </ActionDropDown>
        ),
      },
    ];
  };
  // ==================================================================

  // Modal Delete
  const confirmDelete = () => {
    dispatch(deleteAccount(deleteId));
    setIsDeleteModalOpen(false);
  };

  // Get all the option groups
  useEffect(() => {
    dispatch(fetchAccountsFields());
  }, []);

  // Fetch the account when the pageRequest changes
  useEffect(() => {
    if (pageRequest?.searchFields?.length > 0) {
      setActiveRow([]);
      dispatch(fetchAccounts(DynamicTableHelper.cleanPageRequest(pageRequest)));
    }
  }, [JSON.stringify(pageRequest)]);

  // Update the page info when account Data changes
  useEffect(() => {
    if (accountsData) {
      setPageInfoData(accountsData);
      setTableData(accountsData?.accounts);
    }
  }, [accountsData]);

  useEffect(() => {
    const newConfig = generateAccountConfig(customConfig);
    setTableConfig(newConfig);
  }, [customConfig, pageInfo, activeRow, tableData]);

  return (
    <>
      <DeleteCustomModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        confirmDelete={confirmDelete}
        header="Delete Account"
        deleteText={"Are you sure you would like to delete this account?"}
      />
      <DynamicTableWrapper
        data={accountsData?.accounts}
        config={tableConfig}
        pageInfo={pageInfo}
        pageRequest={pageRequest}
        pageRequestSet={pageRequestSet}
        search={search}
        setSearch={setSearch}
        optGroup={accountsFields}
        setCustomConfigData={setCustomConfigData}
        header="Accounts"
        activeRow={activeRow}
        setActiveRow={setActiveRow}
        setTableConfig={setTableConfig}
      />
    </>
  );
};

export default AccountListing;
