import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Badge, Button, Input } from "reactstrap";
import "react-dual-listbox/lib/react-dual-listbox.css";
import { useTableHook } from "@workspace/common";
import DynamicTableWrapper from "../../components/dynamicTable/DynamicTableWrapper";
import { DynamicTableHelper, DateHelper } from "@workspace/common";
import { CANDIDATE_INITIAL_OPTIONS } from "./candidateListingConstants";
import { DeleteCustomModal } from "@workspace/common";
import "./CandidateListing.scss";
import {
  deleteCandidate,
  fetchCandidates,
  fetchCandidatesFields,
  fetchCandidatesAdmin,
} from "../../store/candidate/action";
import { useUserAuth } from "@workspace/login";

function CandidateListing() {
  const { Permission, checkAllPermission, checkAnyRole, Role } = useUserAuth();
  const dispatch = useDispatch();
  const candidatesData = useSelector(
    (state) => state.CandidateReducer.candidates
  );

  const candidatesFields = useSelector(
    (state) => state.CandidateReducer.candidatesFields
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
      pageSize: 20,
      sortBy: null,
      sortDirection: "asc",
      searchTerm: null,
      searchFields: DynamicTableHelper.generateSeachFieldArray(
        CANDIDATE_INITIAL_OPTIONS
      ),
    },
    CANDIDATE_INITIAL_OPTIONS,
    customRenderList
  );

  //========================== User Setup ============================
  // This will vary with the table main page. Each table have it own config with additional columns
  const generateCandidateConfig = (customConfig) => {
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
        render: (data) => (
          <div className="d-flex column-gap-2">
            <Link
              to={`/candidates/${data.id}/snapshot`}
              style={{ color: "black" }}
              state={{ view: true }}
            >
              <Button
                type="button"
                className="btn btn-custom-primary table-btn"
              >
                <i className="ri-eye-line"></i>
              </Button>
            </Link>
            {/* {checkAllPermission([Permission.CANDIDATE_EDIT]) && data.createdByName === getName() && ( */}
            {checkAllPermission([Permission.CANDIDATE_EDIT]) && (
              <Link
                to={`/candidates/${data.id}/snapshot`}
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
            {checkAllPermission([Permission.CANDIDATE_DELETE]) && (
              <Button
                type="button"
                className="btn btn-danger table-btn"
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
    dispatch(deleteCandidate(deleteId));
    setIsDeleteModalOpen(false);
  };

  // Get all the option groups
  useEffect(() => {
    dispatch(fetchCandidatesFields());
  }, []);

  // Fetch the candidate when the pageRequest changes
  useEffect(() => {
    if (checkAnyRole([Role.ADMIN])) {
      dispatch(
        fetchCandidatesAdmin(DynamicTableHelper.cleanPageRequest(pageRequest))
      );
      return;
    }
    dispatch(fetchCandidates(DynamicTableHelper.cleanPageRequest(pageRequest)));
  }, [pageRequest]);

  // Update the page info when candidate Data changes
  useEffect(() => {
    if (candidatesData) {
      setPageInfoData(candidatesData);
    }
  }, [candidatesData]);

  return (
    <>
      <DeleteCustomModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        confirmDelete={confirmDelete}
        header="Delete Candidate"
        deleteText={"Are you sure you would like to delete this candidate?"}
      />
      <DynamicTableWrapper
        data={candidatesData.candidates}
        config={generateCandidateConfig(customConfig)}
        pageInfo={pageInfo}
        pageRequest={pageRequest}
        pageRequestSet={pageRequestSet}
        search={search}
        setSearch={setSearch}
        optGroup={candidatesFields}
        setCustomConfigData={setCustomConfigData}
      />
    </>
  );
}

export default CandidateListing;
