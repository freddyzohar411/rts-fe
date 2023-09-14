// import React, { useState, useEffect } from "react";
// import {
//   Badge,
//   Button,
//   Card,
//   CardBody,
//   Col,
//   Container,
//   Input,
//   Row,
//   Table,
// } from "reactstrap";
// import { Link } from "react-router-dom";
// import { Axios } from "@workspace/common";
// const { APIClient } = Axios;

// // Import the account listing options
// import { accountListingOptions } from "./accountListingOptions";

// function AccountListing() {
//   const api = new APIClient();
  
//   const [accountListing, setAccountListing] = useState([]);
//   const [searchInput, setSearchInput] = useState("");
//   const [pageRequest, setPageRequest] = useState({
//     page: 0,
//     pageSize: 10,
//     sortBy: null,
//     sortDirection: "asc",
//     searchTerm: null,
//   });

//   const [pageInfo, setPageInfo] = useState({
//     currentPage: 0,
//     totalPages: 0,
//     totalElements: 0,
//   });

//   console.log("pageRequest", pageRequest);
//   console.log("Account Listing", accountListing);

//   // Clean Page Request, remove null values
//   function cleanPageRequest(pageRequest) {
//     const cleanPage = { ...pageRequest };
//     Object.keys(cleanPage).forEach((key) => {
//       if (cleanPage[key] === null) {
//         delete cleanPage[key];
//       }
//     });
//     return cleanPage;
//   }

//   // Get all data on first render
//   useEffect(() => {
//     api
//       .get("http://localhost:8100/accounts", cleanPageRequest(pageRequest))
//       .then((response) => {
//         setAccountListing(response.data.accounts);
//         setPageInfo({
//           currentPage: response.data.page,
//           totalPages: response.data.totalPages,
//           totalElements: response.data.totalElements,
//         });
//       });
//   }, [pageRequest]);

//   // Handle Next Page
//   const handleNextPage = () => {
//     if (pageInfo.currentPage < pageInfo.totalPages - 1) {
//       setPageRequest({
//         ...pageRequest,
//         page: pageInfo.currentPage + 1,
//       });
//     }
//   };

//   // Handle Previous Page
//   const handlePreviousPage = () => {
//     if (pageInfo.currentPage > 0) {
//       setPageRequest({
//         ...pageRequest,
//         page: pageInfo.currentPage - 1,
//       });
//     }
//   };

//   // Handle Sort
//   const handleSort = (option) => {
//     let sortDir = "asc";
//     if (pageRequest.sortBy === option.name) {
//       sortDir = pageRequest.sortDirection === "asc" ? "desc" : "asc";
//     }
//     setPageRequest((prev) => ({
//       ...prev,
//       sortBy: option.name,
//       sortDirection: sortDir,
//     }));
//   };

//   // Handle Search
//   const handleSearch = (e) => {
//     e.preventDefault();
//     const search = e.target.value;
//     console.log("search", search);
//     setPageRequest((prev) => ({
//       ...prev,
//       searchTerm: searchInput === "" ? null : searchInput,
//     }));
//   };

//   //Handle Page size change
//     const handlePageSizeChange = (e) => {
//     const pageSize = e.target.value;
//     setPageRequest((prev) => ({
//       ...prev,
//       pageSize: pageSize,
//     }));
//     }

//   document.title = "Accounts | RTS";

//   // ========================================= Table Configuration ===========================
//   // Set Custom view
//   const customView =
//     "Service,Account Number,Account Name,Account Owner,Created By,Parent Account,Status";
//   //   const customView = "Account Name,Account Number";
//   // Get the custom config
//   const getCustomConfig = (customView) => {
//     const customViewArray = customView.split(",");
//     console.log("customViewArray", customViewArray);
//     // Get the array of options from the accountListingOptions based on the custom view array
//     const customConfig = [];
//     customViewArray.forEach((element) => {
//       customConfig.push(accountListingOptions[element]);
//     });
//     return customConfig;
//   };

//   const customConfig = getCustomConfig(customView);
//   console.log("customConfig", customConfig);

//   // Generate Header
//   const generateHeaderJSX = (
//     <>
//       <th scope="col" style={{ width: "50px" }}>
//         <div className="form-check">
//           <Input
//             className="form-check-input"
//             type="checkbox"
//             id="checkbox"
//             value="option"
//           />
//         </div>
//       </th>
//       <th scope="col" class="text-uppercase"></th>
//       {customConfig.map((option) => {
//         if (option.sort === true) {
//           return (
//             <th
//               scope="col"
//               class="text-uppercase cursor-pointer"
//               onClick={() => handleSort(option)}
//             >
//               {option.header} <i className="mdi mdi-sort-descending"></i>
//             </th>
//           );
//         } else {
//           return (
//             <th scope="col" class="text-uppercase">
//               {option.header}
//             </th>
//           );
//         }
//       })}
//       <th scope="col" class="text-uppercase">
//         Action
//       </th>
//     </>
//   );

//   // Generate Body
//   const generateBodyJSX = (accountListing) => {
//     return accountListing.map((account) => {
//       const rowdata = customConfig.map((option) => {
//         return <td>{option.render(account)}</td>;
//       });
//       return (
//         <tr>
//           <th scope="row">
//             <div className="form-check">
//               <Input
//                 className="form-check-input"
//                 type="checkbox"
//                 name="chk_child"
//                 value="option1"
//               />
//             </div>
//           </th>
//           <td>
//             <div className="d-flex column-gap-2">
//               <Badge color="dark">+1</Badge>
//               <Badge color="dark">+2</Badge>
//               <Badge color="dark">+10</Badge>
//             </div>
//           </td>
//           {rowdata}
//           <td>
//             <div className="d-flex gap-2">
//               <div className="edit">
//                 <Button className="custom-button btn-sm" type="button">
//                   Edit
//                 </Button>
//               </div>
//             </div>
//           </td>
//         </tr>
//       );
//     });
//   };

//   // ================================================================================================
//   return (
//     <React.Fragment>
//       <div className="page-content">
//         <Container fluid>
//           <Row>
//             <Col lg={12}>
//               <Card className="m-3">
//                 <CardBody>
//                   <div className="listjs-table">
//                     <Row className="d-flex column-gap-1 mb-3">
//                       <Col>
//                         <div className="search-box">
//                           <form onSubmit={handleSearch}>
//                             <Input
//                               type="text"
//                               placeholder="Search"
//                               className="form-control search bg-light border-light"
//                               value={searchInput}
//                               style={{width:"350px"}}
//                               onChange={(e) => setSearchInput(e.target.value)}
//                             />
//                           </form>

//                           <i className="ri-search-line search-icon"></i>
//                         </div>
//                       </Col>
//                       <Col>
//                         <div className="d-flex column-gap-2 justify-content-end">
//                           <Button
//                             type="button"
//                             className="btn btn-primary d-flex align-items-center column-gap-2"
//                           >
//                             <span>
//                               <i className="mdi mdi-download"></i>
//                             </span>{" "}
//                             Imports
//                           </Button>
//                           <Button
//                             type="button"
//                             className="btn btn-primary d-flex align-items-center column-gap-2"
//                           >
//                             <span>
//                               <i className="ri-settings-3-fill"></i>
//                             </span>
//                             Custom View
//                           </Button>
//                           <Button type="button" className="btn btn-primary">
//                             Create New Account
//                           </Button>
//                         </div>
//                       </Col>
//                     </Row>

//                     <div className="table-responsive table-hover table-card mt-3 mb-1">
//                       <Table
//                         className="table align-middle table-nowrap"
//                         id="accountListingTable"
//                       >
//                         <thead className="table-light">
//                           <tr>{generateHeaderJSX}</tr>
//                         </thead>
//                         <tbody className="list form-check-all">
//                           {generateBodyJSX(accountListing)}
//                         </tbody>
//                       </Table>
//                     </div>

//                     <div className="d-flex justify-content-end">
//                       <div className="pagination-wrap hstack gap-2">
//                         <Input onChange={handlePageSizeChange} type="select" className="form-select" style={{height:"34px", marginRight:"10px"}}>
//                           <option value="10">10</option>
//                           <option value="20">20</option>
//                           <option value="30">30</option>
//                         </Input>
//                         <btn
//                           className={`cursor-pointer page-item pagination-prev ${pageInfo.currentPage == 0 && "disabled"}`}
//                           onClick={handlePreviousPage}
//                         >
//                           Previous
//                         </btn>
//                         <ul className="pagination listjs-pagination mb-0"></ul>
//                         <btn
//                           className={`cursor-pointer page-item pagination-next ${pageInfo.currentPage == pageInfo.totalPages - 1 && "disabled"}`}
//                           onClick={handleNextPage}
//                         >
//                           Next
//                         </btn>
//                       </div>
//                     </div>
//                   </div>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </React.Fragment>
//   );
// }

// export default AccountListing;
