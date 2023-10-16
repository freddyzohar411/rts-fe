import React, { useState, useEffect } from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Row,
  Table,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchAccounts } from "../../store/account/action";
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";
import axios from "axios";

const accountInitialConfig = [
  {
    label: "Account Source",
    value: "accountSubmissionData.accountSource",
    sort: true,
    sortValue: "account_submission_data.accountSource",
  },
  {
    label: "Account Number",
    value: "accountNumber",
    sort: true,
    sortValue: "account_submission_data.accountNumber",
  },
  {
    label: "Account Name",
    value: "accountSubmissionData.accountName",
    sort: true,
    sortValue: "account_submission_data.accountName",
  },
  {
    label: "Account Owner",
    value: "accountSubmissionData.secondaryOwner",
    sort: true,
    sortValue: "account_submission_data.secondaryOwner",
  },
  {
    label: "Created By",
    value: "createdByName",
    sort: false,
    sortValue: "createdByName",
  },
  {
    label: "Parent Account",
    value: "accountSubmissionData.parentAccount",
    sort: false,
    sortValue: "account_submission_data.parentAccount",
  },
  {
    label: "Status",
    value: "accountSubmissionData.accountStatus",
    sort: true,
    sortValue: "account_submission_data.accountStatus",
  },
];

// Import the account listing options
import { accountListingOptions } from "./accountListingOptions";

function AccountListing() {
  // const dispatch = useDispatch();
  // const accountsData = useSelector((state) => state.AccountReducer.accounts);
  // const accountListing = accountsData.accounts;
  const [customViewShow, setCustomViewShow] = useState(false);
  const [accountsData, setAccountsData] = useState({});
  const [optGroup, setOptGroup] = useState([]);
  const [selectedOptGroup, setSelectedOptGroup] = useState([]);

  const accountListing = accountsData.accounts;

  console.log("ACCOUNTS DATA", accountsData);
  console.log("ACCOUNT LISTING", accountListing);

  //==============================================================================

  useEffect(() => {
    axios.get("http://localhost:8100/accounts/fields").then((res) => {
      console.log(res.data);
      setOptGroup(res.data);
    });
  }, []);

  console.log("OPT GROUP", optGroup);

  const handleChange = (selected) => {
    const selectedObjects = selected.map((value) => {
      return optGroup.find((option) => option.value === value);
    });
    setSelectedOptGroup(selectedObjects);
  };

  const getDynamicNestedResult = (data, value) => {
    const result = value.split(".").reduce((acc, part) => {
      return acc ? acc[part] : undefined;
    }, data);
    return result;
  };

  const generateConfig = (selectedOptGroup) => {
    const config = [];
    selectedOptGroup.forEach((opt) => {
      config.push({
        header: opt.label,
        name: opt.value,
        sort: opt.sort,
        sortValue: opt.sortValue,
        render: (data) => getDynamicNestedResult(data, opt.value) || "-",
      });
    });
    return config;
  };

  const generateSeachFieldArray = (selectedOptGroup) => {
    const searchFields = [];
    selectedOptGroup.forEach((opt) => {
      if (opt.sort === true) {
        searchFields.push(opt.sortValue);
      }
    });
    return searchFields;
  };

  const [customConfig, setCustomConfig] = useState(
    generateConfig(accountInitialConfig)
  );

  // console.log("CONFIG", config);

  console.log("Selected OPS Grp", selectedOptGroup);

  // ===============================================================

  const [searchInput, setSearchInput] = useState("");
  const [pageRequest, setPageRequest] = useState({
    page: 0,
    pageSize: 5,
    sortBy: null,
    sortDirection: "asc",
    searchTerm: null,
    searchFields: generateSeachFieldArray(accountInitialConfig),
  });

  console.log(
    "Inital Search array",
    generateSeachFieldArray(accountInitialConfig)
  );

  console.log("Page Request", pageRequest);

  const [pageInfo, setPageInfo] = useState({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
  });

  useEffect(() => {
    fetchAccounts(pageRequest);
  }, [pageRequest]);

  const fetchAccounts = (pageRequest) => {
    console.log("Fetching...");
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

  // Clean Page Request, remove null values
  function cleanPageRequest(pageRequest) {
    const cleanPage = { ...pageRequest };
    Object.keys(cleanPage).forEach((key) => {
      if (cleanPage[key] === null) {
        delete cleanPage[key];
      }
    });
    return cleanPage;
  }

  // Update the page info
  useEffect(() => {
    setPageInfo({
      currentPage: accountsData.page,
      totalPages: accountsData.totalPages,
      totalElements: accountsData.totalElements,
    });
  }, [accountsData]);

  // Handle Next Page
  const handleNextPage = () => {
    if (pageInfo.currentPage < pageInfo.totalPages - 1) {
      setPageRequest({
        ...pageRequest,
        page: pageInfo.currentPage + 1,
      });
    }
  };

  // Handle Previous Page
  const handlePreviousPage = () => {
    if (pageInfo.currentPage > 0) {
      setPageRequest({
        ...pageRequest,
        page: pageInfo.currentPage - 1,
      });
    }
  };

  // Handle Sort
  const handleSort = (option) => {
    let sortDir = "asc";
    console.log("Page Request SortBy", pageRequest);
    if (pageRequest.sortBy === option.sortValue) {
      sortDir = pageRequest.sortDirection === "asc" ? "desc" : "asc";
    }
    setPageRequest((prev) => ({
      ...prev,
      sortBy: option.sortValue,
      sortDirection: sortDir,
    }));
  };

  // Handle Search
  const handleSearch = (e) => {
    e.preventDefault();
    const search = e.target.value;
    setPageRequest((prev) => ({
      ...prev,
      searchTerm: searchInput === "" ? null : searchInput,
    }));
  };

  //Handle Page size change
  const handlePageSizeChange = (e) => {
    const pageSize = e.target.value;
    setPageRequest((prev) => ({
      ...prev,
      pageSize: pageSize,
    }));
  };

  document.title = "Accounts | RTS";

  // ========================================= Table Configuration ===========================

  // Generate Header
  const generateHeaderJSX = (
    <>
      <th scope="col" style={{ width: "50px" }}>
        <div className="form-check">
          <Input
            className="form-check-input"
            type="checkbox"
            id="checkbox"
            value="option"
          />
        </div>
      </th>
      <th scope="col" class="text-uppercase"></th>
      {customConfig.map((option) => {
        if (option.sort === true) {
          return (
            <th
              scope="col"
              class="text-uppercase cursor-pointer"
              onClick={() => handleSort(option)}
            >
              {option.header} <i className="mdi mdi-sort-descending"></i>
            </th>
          );
        } else {
          return (
            <th scope="col" class="text-uppercase">
              {option.header}
            </th>
          );
        }
      })}
      <th scope="col" class="text-uppercase">
        Action
      </th>
    </>
  );

  // Generate Body
  const generateBodyJSX = (accountListing) => {
    return accountListing.map((account) => {
      const rowdata = customConfig.map((option) => {
        return <td>{option.render(account)}</td>;
      });
      return (
        <tr>
          <th scope="row">
            <div className="form-check">
              <Input
                className="form-check-input"
                type="checkbox"
                name="chk_child"
                value="option1"
              />
            </div>
          </th>
          <td>
            <div className="d-flex column-gap-2">
              <Badge color="dark">+1</Badge>
              <Badge color="dark">+2</Badge>
              <Badge color="dark">+10</Badge>
            </div>
          </td>
          {rowdata}
          <td>
            <div className="d-flex gap-2">
              <div className="edit">
                <Button className="custom-button btn-sm" type="button">
                  Edit
                </Button>
              </div>
            </div>
          </td>
        </tr>
      );
    });
  };

  // ================================================================================================
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* My dual listbox */}
          {optGroup && optGroup.length > 0 && customViewShow && (
            <div>
              <Row>
                <Col lg={6}>
                  <div className="mt-4 mt-lg-0">
                    <h5 className="fs-14 mb-1">Headers</h5>
                    <p className="text-muted">
                      Example of Dual Listbox Headers{" "}
                    </p>
                    <DualListBox
                      canFilter
                      filterCallback={(optGroup, filterInput) => {
                        if (filterInput === "") {
                          return true;
                        }
                        return new RegExp(filterInput, "i").test(
                          optGroup.label
                        );
                      }}
                      filterPlaceholder="Search..."
                      options={optGroup}
                      selected={selectedOptGroup.map((option) => option?.value)}
                      onChange={handleChange}
                      icons={{
                        moveLeft: (
                          <span className="mdi mdi-chevron-left" key="key" />
                        ),
                        moveAllLeft: [
                          <span
                            className="mdi mdi-chevron-double-left"
                            key="key"
                          />,
                        ],
                        moveRight: (
                          <span className="mdi mdi-chevron-right" key="key" />
                        ),
                        moveAllRight: [
                          <span
                            className="mdi mdi-chevron-double-right"
                            key="key"
                          />,
                        ],
                        moveDown: (
                          <span className="mdi mdi-chevron-down" key="key" />
                        ),
                        moveUp: (
                          <span className="mdi mdi-chevron-up" key="key" />
                        ),
                        moveTop: (
                          <span
                            className="mdi mdi-chevron-double-up"
                            key="key"
                          />
                        ),
                        moveBottom: (
                          <span
                            className="mdi mdi-chevron-double-down"
                            key="key"
                          />
                        ),
                      }}
                    />
                  </div>
                </Col>
              </Row>
              <button
                className="btn btn-primary mt-3"
                onClick={() => {
                  setCustomConfig(generateConfig(selectedOptGroup));
                  setPageRequest((prev) => ({
                    ...prev,
                    searchFields: generateSeachFieldArray(selectedOptGroup),
                  }));
                }}
              >
                Set
              </button>
            </div>
          )}
          <Row>
            <Col lg={12}>
              <Card className="m-3">
                <CardBody>
                  <div className="listjs-table">
                    <Row className="d-flex column-gap-1 mb-3">
                      <Col>
                        <div className="search-box">
                          <form onSubmit={handleSearch}>
                            <Input
                              type="text"
                              placeholder="Search"
                              className="form-control search bg-light border-light"
                              value={searchInput}
                              style={{ width: "350px" }}
                              onChange={(e) => setSearchInput(e.target.value)}
                            />
                          </form>
                          <i className="ri-search-line search-icon"></i>
                        </div>
                      </Col>
                      <Col>
                        <div className="d-flex column-gap-2 justify-content-end">
                          <Button
                            type="button"
                            className="btn btn-primary d-flex align-items-center column-gap-2"
                          >
                            <span>
                              <i className="mdi mdi-download"></i>
                            </span>{" "}
                            Imports
                          </Button>
                          <Button
                            type="button"
                            onClick={() => setCustomViewShow(!customViewShow)}
                            className="btn btn-primary d-flex align-items-center column-gap-2"
                          >
                            <span>
                              <i className="ri-settings-3-fill"></i>
                            </span>
                            Custom View
                          </Button>
                          <Button type="button" className="btn btn-primary">
                            Create New Account
                          </Button>
                          <Button type="button" className="btn btn-primary">
                            <i className="ri-filter-line"></i>
                          </Button>
                        </div>
                      </Col>
                    </Row>

                    <div className="table-responsive table-hover table-card mt-3 mb-1">
                      <Table
                        className="table align-middle table-nowrap"
                        id="accountListingTable"
                      >
                        <thead className="table-light">
                          <tr>{accountListing && generateHeaderJSX}</tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {accountListing && generateBodyJSX(accountListing)}
                        </tbody>
                      </Table>
                    </div>

                    <div className="d-flex justify-content-end">
                      <div className="pagination-wrap hstack gap-2">
                        <Input
                          onChange={handlePageSizeChange}
                          type="select"
                          className="form-select"
                          style={{ height: "34px", marginRight: "10px" }}
                        >
                          <option value="5">5</option>
                          <option value="10">10</option>
                          <option value="20">20</option>
                          <option value="30">30</option>
                        </Input>
                        <btn
                          className={`cursor-pointer page-item pagination-prev ${
                            pageInfo.currentPage == 0 && "disabled"
                          }`}
                          onClick={handlePreviousPage}
                        >
                          Previous
                        </btn>
                        <ul className="pagination listjs-pagination mb-0"></ul>
                        <btn
                          className={`cursor-pointer page-item pagination-next ${
                            pageInfo.currentPage == pageInfo.totalPages - 1 &&
                            "disabled"
                          }`}
                          onClick={handleNextPage}
                        >
                          Next
                        </btn>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default AccountListing;
