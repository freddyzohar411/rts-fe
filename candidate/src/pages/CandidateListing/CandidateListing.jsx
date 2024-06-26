import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Input, DropdownItem } from "reactstrap";
import "react-dual-listbox/lib/react-dual-listbox.css";
import { useTableHook } from "@workspace/common";
import DynamicTableWrapper from "../../components/dynamicTable/DynamicTableWrapper";
import { DynamicTableHelper, DateHelper } from "@workspace/common";
import {
  CANDIDATE_INITIAL_OPTIONS,
  CANDIDATE_MANDATORY_OPTIONS,
} from "./candidateListingConstants";
import { DeleteCustomModal } from "@workspace/common";
import "./CandidateListing.scss";
import {
  deleteCandidate,
  fetchCandidates,
  fetchCandidatesFields,
  resetCandidates
} from "../../store/candidate/action";
import { useUserAuth } from "@workspace/login";
import ActionDropDown from "@workspace/common/src/Components/DynamicTable/Components/ActionDropDown";

function CandidateListing() {
  const { Permission, checkAllPermission } = useUserAuth();
  const dispatch = useDispatch();
  const candidatesData = useSelector(
    (state) => state.CandidateReducer.candidates
  );

  const candidatesFields = useSelector(
    (state) => state.CandidateReducer.candidatesFields
  );

  // Table state
  const [tableConfig, setTableConfig] = useState(null);

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
      names: ["candidateSubmissionData.firstName"],
      render: (data) => (
        <Link
          to={`/candidates/${data.id}/snapshot`}
          className="text-custom-primary text-decoration-underline"
        >
          {data.candidateSubmissionData.firstName}
        </Link>
      ),
    },
  ];

  //========================== User Setup ============================
  // This will vary with the table main page. Each table have it own config with additional columns
  const generateCandidateConfig = (customConfig) => {
    return [
      {
        header: "#",
        name: "indexing",
        sort: false,
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
        sortValue: "action",
        sticky: "right",
        expand: true,
        center: true,
        render: (data) => (
          <ActionDropDown>
            {checkAllPermission([Permission.CANDIDATE_EDIT]) && (
              <DropdownItem>
                <Link
                  to={`/candidates/${data.id}/snapshot`}
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
            {checkAllPermission([Permission.CANDIDATE_DELETE]) && (
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
      allActive: true,
    },
    CANDIDATE_MANDATORY_OPTIONS,
    CANDIDATE_INITIAL_OPTIONS,
    customRenderList,
    generateCandidateConfig
  );

  // Modal Delete
  const confirmDelete = () => {
    dispatch(deleteCandidate(deleteId));
    setIsDeleteModalOpen(false);
  };

  // Get all the option groups
  useEffect(() => {
    dispatch(fetchCandidatesFields());
    return () => {
      dispatch(resetCandidates());
    };
  }, []);

  // Fetch the candidate when the pageRequest changes
  useEffect(() => {
    if (pageRequest?.searchFields?.length > 0) {
      setActiveRow([]);
      dispatch(
        fetchCandidates(DynamicTableHelper.cleanPageRequest(pageRequest))
      );
    }
  }, [JSON.stringify(pageRequest)]);

  // Update the page info when candidate Data changes
  useEffect(() => {
    if (candidatesData) {
      setPageInfoData(candidatesData);
      setTableData(candidatesData?.candidates);
    }
  }, [candidatesData]);

  useEffect(() => {
    if (tableConfig) {
      const newConfig = generateCandidateConfig(customConfig);
      newConfig.forEach((item, index) => {
        const oldConfig = tableConfig?.find(
          (oldItem) => oldItem?.name === item?.name
        );
        // If cannot find then continue
        if (!oldConfig) return;
        if (oldConfig?.expand) {
          newConfig[index].expand = true;
        } else {
          newConfig[index].expand = false;
        }
      });
      setTableConfig(newConfig);
    } else {
      setTableConfig(generateCandidateConfig(customConfig));
    }
    // setTableConfig(generateCandidateConfig(customConfig));
  }, [customConfig, pageInfo, activeRow, tableData]);

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
        config={tableConfig}
        pageInfo={pageInfo}
        pageRequest={pageRequest}
        pageRequestSet={pageRequestSet}
        search={search}
        setSearch={setSearch}
        optGroup={candidatesFields}
        setCustomConfigData={setCustomConfigData}
        header="Candidates"
        activeRow={activeRow}
        setActiveRow={setActiveRow}
        setTableConfig={setTableConfig}
      />
    </>
  );
}

export default CandidateListing;
