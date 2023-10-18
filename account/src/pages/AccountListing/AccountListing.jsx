import React, { useState, useEffect } from "react";
import {
  Badge,
  Button,
  Input,
} from "reactstrap";
import "react-dual-listbox/lib/react-dual-listbox.css";
import axios from "axios";
import { DateHelper } from "@workspace/common";
import useTableHook from "../../hooks/useTableHook";
import DynamicTableWrapper from "../../components/dynamicTable/DynamicTableWrapper";
import {
  generateConfig,
  generateSeachFieldArray,
  cleanPageRequest
} from "../../components/dynamicTable/dynamicTable_helper";
import { ACCOUNT_INITIAL_OPTIONS } from "./accountListingConstants"

function AccountListing() {

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
        render: () => (
          <div className="d-flex column-gap-2">
            <Button
              type="button"
              className="btn btn-primary d-flex align-items-center column-gap-2"
            >
              <span>
                <i className="mdi mdi-pencil"></i>
              </span>{" "}
              Edit
            </Button>
            <Button
              type="button"
              className="btn btn-danger d-flex align-items-center column-gap-2"
            >
              <span>
                <i className="mdi mdi-delete"></i>
              </span>{" "}
              Delete
            </Button>
          </div>
        ),
      },
    ];
  };
  // =================================================================

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
      searchFields: generateSeachFieldArray(ACCOUNT_INITIAL_OPTIONS),
    },
    generateConfig(ACCOUNT_INITIAL_OPTIONS)
  );

  const [accountsData, setAccountsData] = useState({});
  const [optGroup, setOptGroup] = useState([]);

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
        cleanPageRequest(pageRequest)
      )
      .then((res) => {
        console.log(res.data);
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
  );
}

export default AccountListing;
