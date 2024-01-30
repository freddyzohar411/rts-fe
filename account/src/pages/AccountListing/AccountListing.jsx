import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Badge, Button, Input } from "reactstrap";
import "react-dual-listbox/lib/react-dual-listbox.css";
import { useTableHook } from "@workspace/common";
import DynamicTableWrapper from "../../components/dynamicTable/DynamicTableWrapper";
import { DynamicTableHelper } from "@workspace/common";
import { ACCOUNT_INITIAL_OPTIONS } from "./accountListingConstants";
import { DeleteCustomModal } from "@workspace/common";
import {
  deleteAccount,
  fetchAccounts,
  fetchAccountsFields,
  fetchAccountsAdmin,
} from "../../store/account/action";
import { DateHelper } from "@workspace/common";
import { useUserAuth } from "@workspace/login";

const AccountListing = () => {
  const { Permission, checkAllPermission, checkAnyRole } = useUserAuth();
  const dispatch = useDispatch();
  const accountsData = useSelector((state) => state.AccountReducer.accounts);
  const accountsFields = useSelector(
    (state) => state.AccountReducer.accountsFields
  );

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
  ];

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
    ACCOUNT_INITIAL_OPTIONS,
    customRenderList
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
              // state={{ form: 3 }}
              state={{ view: true }}
            >
              <Button
                type="button"
                className="btn btn-custom-primary d-flex align-items-center column-gap-2 px-2 py-1"
              >
                <i className="ri-eye-line" style={{ fontSize: "0.75rem" }}></i>
              </Button>
            </Link>
            {checkAllPermission([Permission.ACCOUNT_EDIT]) && (
              <Link
                to={`/accounts/${data.id}/edit`}
                style={{ color: "black" }}
                state={{ view: false }}
              >
                <Button
                  type="button"
                  className="btn btn-custom-primary d-flex align-items-center column-gap-2 px-2 py-1"
                >
                  <i
                    className="mdi mdi-pencil"
                    style={{ fontSize: "0.65rem" }}
                  ></i>
                </Button>
              </Link>
            )}
            {checkAllPermission([Permission.ACCOUNT_DELETE]) && (
              <Button
                type="button"
                className="btn btn-danger d-flex align-items-center column-gap-2 px-2 py-0"
                onClick={() => {
                  setDeleteId(data.id);
                  setIsDeleteModalOpen(true);
                }}
              >
                <span>
                  <i
                    className="mdi mdi-delete"
                    style={{ fontSize: "0.65rem" }}
                  ></i>
                </span>
              </Button>
            )}
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
    if (checkAnyRole(["Admin"])) {
      dispatch(
        fetchAccountsAdmin(DynamicTableHelper.cleanPageRequest(pageRequest))
      );
      return
    }
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
};

export default AccountListing;
