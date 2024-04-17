import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Badge, Button, Input } from "reactstrap";
import "react-dual-listbox/lib/react-dual-listbox.css";
import {
  useTableHook,
  DeleteCustomModal,
  DynamicTableHelper,
} from "@workspace/common";
import DynamicTableWrapper from "../../components/dynamicTable/DynamicTableWrapper";
import { ACCOUNT_INITIAL_OPTIONS } from "./accountListingConstants";
import "./AccountListing.scss";
import {
  deleteAccount,
  fetchAccounts,
  fetchAccountsFields,
  fetchAccountsAdmin,
  fetchAccountCustomView,
} from "../../store/account/action";
import { DateHelper } from "@workspace/common";
import { useUserAuth } from "@workspace/login";

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

  useEffect(() => {
    dispatch(fetchAccountsFields());
    dispatch(fetchAccountCustomView());
  }, []);

  // useEffect(() => {
  //   if (accountCustomView && accountCustomView.length > 0) {
  //     // Find the selected custom view
  //     const selectedCustomView = accountCustomView?.find(
  //       (customView) => customView?.selected
  //     );
  //     if (
  //       selectedCustomView &&
  //       Array.isArray(accountsFields) &&
  //       accountsFields.length > 0
  //     ) {
  //       const selectedGroup = selectedCustomView?.columnName?.split(",");
  //       const selectedObjects = selectedGroup?.map((value) => {
  //         return accountsFields?.find((option) => option?.value === value);
  //       });
  //       if (selectedObjects.length > 0) {
  //         setCustomConfigCV(selectedObjects);
  //       }
  //     } else {
  //       setCustomConfigCV(ACCOUNT_INITIAL_OPTIONS);
  //     }
  //   }
  // }, [accountCustomView, accountsFields]);

  // console.log("Custom Config Cv", customConfigCV);
  // console.log("Account Initial Options", ACCOUNT_INITIAL_OPTIONS);
  // console.log("Search Fields, Dynamic Table Helper", DynamicTableHelper.generateSeachFieldArray(customConfigCV))
  // console.log("Search Fields, Dynamic Table Helper", DynamicTableHelper.generateSeachFieldArray(ACCOUNT_INITIAL_OPTIONS))

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
      pageSize: 20,
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
        header: "#",
        name: "indexing",
        sort: false,
        sortValue: "indexing",
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
        sortValue: "action",
        sticky:true,
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
                className="btn btn-custom-primary table-btn"
              >
                <i className="ri-eye-line"></i>
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
                  className="btn btn-custom-primary table-btn"
                >
                  <i className="mdi mdi-pencil"></i>
                </Button>
              </Link>
            )}
            {checkAllPermission([Permission.ACCOUNT_DELETE]) && (
              <Button
                type="button"
                className="btn btn-danger table-btn d-flex "
                onClick={() => {
                  setDeleteId(data.id);
                  setIsDeleteModalOpen(true);
                }}
              >
                <span>
                  <i className="mdi mdi-delete"></i>
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
    if (pageRequest?.searchFields?.length > 0) {
      dispatch(fetchAccounts(DynamicTableHelper.cleanPageRequest(pageRequest)));
    }
  }, [JSON.stringify(pageRequest)]);

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
        data={accountsData?.accounts}
        config={generateAccountConfig(customConfig)}
        pageInfo={pageInfo}
        pageRequest={pageRequest}
        pageRequestSet={pageRequestSet}
        search={search}
        setSearch={setSearch}
        optGroup={accountsFields}
        setCustomConfigData={setCustomConfigData}
        header="Accounts"
      />
    </>
  );
};

export default AccountListing;
