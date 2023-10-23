import React, { useState, useEffect } from "react";
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

function AccountListing() {
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

  const [accountsData, setAccountsData] = useState({});
  const [optGroup, setOptGroup] = useState([]);

  console.log("Account DatA: ", accountsData);

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
            <Button
              type="button"
              className="btn btn-primary d-flex align-items-center column-gap-2"
            >
              <Link to={`/accounts/${data.id}/edit`} style={{ color: "black" }}>
                <i className="mdi mdi-pencil"></i>
              </Link>
            </Button>
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
    console.log("Delete confirmed id: ", deleteId);
    // Logic to delete the account

    setIsDeleteModalOpen(false);
  };

  // Get all the option groups
  useEffect(() => {
    axios.get("http://localhost:8100/accounts/fields").then((res) => {
      console.log(res.data);
      setOptGroup(res.data);
    });
  }, []);

  // Fetch account using axios
  const fetchAccounts = (pageRequest) => {
    axios
      .post(
        "http://localhost:8100/accounts/listing",
        DynamicTableHelper.cleanPageRequest(pageRequest)
      )
      .then((res) => {
        console.log("ACCOUNT LISTING:", res.data);
        setAccountsData(res.data);
      });
  };

  // Fetch the account when the pageRequest changes
  useEffect(() => {
    fetchAccounts(pageRequest);
  }, [pageRequest]);

  // Update the page info when account Data changes
  useEffect(() => {
    if (accountsData) {
      setPageInfoData(accountsData);
    }
  }, [accountsData]);

  document.title = "Accounts | RTS";

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
        optGroup={optGroup}
        setCustomConfigData={setCustomConfigData}
      />
    </>
  );
}

export default AccountListing;
