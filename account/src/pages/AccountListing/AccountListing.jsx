import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Badge, Button, Input } from "reactstrap";
import "react-dual-listbox/lib/react-dual-listbox.css";
import axios from "axios";
import { useTableHook } from "@workspace/common";
import DynamicTableWrapper from "../../components/dynamicTable/DynamicTableWrapper";
import { DynamicTableHelper } from "@workspace/common";
import { ACCOUNT_INITIAL_OPTIONS } from "./accountListingConstants";
import { DeleteCustomModal } from "@Workspace/common";
import { AuthHelper } from "@workspace/common";
import {
  deleteAccount,
  fetchAccounts,
  fetchAccountsFields,
} from "../../store/account/action";
import { useUserPermission } from "@workspace/login";

function AccountListing() {
  const {
    userPermission,
    checkAllPermission,
    checkAnyPermission,
    ModuleConstants,
    PermissionConstants,
  } = useUserPermission();
  const dispatch = useDispatch();
  const accountsData = useSelector((state) => state.AccountReducer.accounts);
  const accountsFields = useSelector(
    (state) => state.AccountReducer.accountsFields
  );

  console.log("User Permission 1: ", userPermission);
  console.log(
    "User Check all permission: ",
    checkAllPermission(ModuleConstants.ACCOUNT, [
      PermissionConstants.WRITE,
      PermissionConstants.DELETE,
    ])
  );
  console.log(
    "User Check any permission: ",
    checkAnyPermission(ModuleConstants.ACCOUNT, [
      PermissionConstants.WRITE,
      PermissionConstants.DELETE,
      PermissionConstants.READ,
      PermissionConstants.EDIT,
    ])
  );

  console.log("Account Fields: ", accountsFields);

  // Check if user is logged in
  useEffect(() => {
    console.log("IsUserLogged in: ", AuthHelper.isUserLoggedIn());
    console.log(
      "Account permission Create in: ",
      AuthHelper.checkPermission("account", ["read", "write", "super"])
    );
  }, []);
  // Delete modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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
  } = useTableHook(
    {
      page: 0,
      pageSize: 5,
      sortBy: null,
      sortDirection: "asc",
      searchTerm: null,
      searchFields: DynamicTableHelper.generateSeachFieldArray(
        ACCOUNT_INITIAL_OPTIONS
      ),
    },
    DynamicTableHelper.generateConfig(ACCOUNT_INITIAL_OPTIONS)
  );

  //========================== User Setup ============================
  // This will vary with the table main page. Each table have it own config with additional columns
  const generateAccountConfig = (customConfig) => {
    return [
      {
        header: (
          <div className="form-check">
            <Input
              className="form-check-input"
              type="checkbox"
              id="checkbox"
              value="option"
            />
          </div>
        ),
        name: "checkbox",
        sort: false,
        sortValue: "checkbox",
        render: () => {
          return (
            <div className="form-check">
              <Input
                className="form-check-input"
                type="checkbox"
                name="chk_child"
                value="option1"
              />
            </div>
          );
        },
      },
      {
        header: "",
        name: "badges",
        sort: false,
        sortValue: "badges",
        render: () => (
          <div className="d-flex column-gap-2">
            <Badge color="dark">+1</Badge>
            <Badge color="dark">+2</Badge>
            <Badge color="dark">+10</Badge>
          </div>
        ),
      },
      ...customConfig,
      {
        header: "Action",
        name: "action",
        sort: false,
        sortValue: "action",
        render: (data) => (
          <div className="d-flex column-gap-2">
            <Link
              to={`/accounts/${data.id}/edit`}
              style={{ color: "black" }}
              // state={{ stepNo: 3 }}
            >
              <Button
                type="button"
                className="btn btn-primary d-flex align-items-center column-gap-2"
              >
                <i className="mdi mdi-pencil"></i>
              </Button>
            </Link>
            <Button
              type="button"
              className="btn btn-danger d-flex align-items-center column-gap-2"
              onClick={() => {
                setDeleteId(data.id);
                setIsDeleteModalOpen(true);
              }}
            >
              <span>
                <i className="mdi mdi-delete"></i>
              </span>
            </Button>
          </div>
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
    dispatch(fetchAccounts(DynamicTableHelper.cleanPageRequest(pageRequest)));
  }, [pageRequest]);

  // Update the page info when account Data changes
  useEffect(() => {
    if (accountsData) {
      setPageInfoData(accountsData);
    }
  }, [accountsData]);

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
        data={accountsData.accounts}
        config={generateAccountConfig(customConfig)}
        pageInfo={pageInfo}
        pageRequest={pageRequest}
        pageRequestSet={pageRequestSet}
        search={search}
        setSearch={setSearch}
        optGroup={accountsFields}
        setCustomConfigData={setCustomConfigData}
      />
    </>
  );
}

export default AccountListing;
