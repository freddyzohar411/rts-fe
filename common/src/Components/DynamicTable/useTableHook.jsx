import React, { useEffect, useState } from "react";
import { DateHelper } from "@workspace/common";
import {
  generateSeachFieldArray,
  generateConfig,
} from "../../helpers/dynamicTable_helper";

const useTableHook = (
  initialPageRequest = {},
  mandatoryConfig = [],
  initialConfig = [],
  customConfigList = [],
  generateConfigFunc
) => {
  // Set state for page request
  const [pageRequest, setPageRequest] = useState({
    page: initialPageRequest?.page || 0,
    pageSize: initialPageRequest?.pageSize || 20,
    sortBy: initialPageRequest?.sortBy || null,
    sortDirection: initialPageRequest?.sortDirection || "asc",
    searchTerm: initialPageRequest?.searchTerm || null,
    searchFields: initialPageRequest?.searchFields,
  });

  const [pageInfo, setPageInfo] = useState({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    pageSize: 0,
  });

  const [search, setSearch] = useState("");
  const [activeRow, setActiveRow] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [customConfig, setCustomConfig] = useState(
    generateConfig([...mandatoryConfig,...initialConfig], customConfigList)
  );

  const [tableConfig, setTableConfig] = useState();

  // useEffect(() => {
  //   setTableConfig(generateConfigFunc(customConfig));
  // }, [customConfig, pageInfo, activeRow, tableData]);

  // Active Row Logic
  useEffect(() => {
    setActiveRow([]);
  }, [pageRequest]);

  const handleRowCheck = (id, checked) => {
    if (checked) {
      setActiveRow([...activeRow, id]);
    } else {
      const updatedVal = activeRow?.filter((sid) => sid !== id);
      setActiveRow(updatedVal);
    }
  };

  const selectAllRows = (isChecked) => {
    if (isChecked) {
      if (tableData?.length > 0) {
        const ids = [];
        tableData.forEach((item) => {
          ids.push(item?.id);
        });
        setActiveRow(ids);
      }
    } else {
      setActiveRow([]);
    }
  };

  // const setCustomConfigData = (selectedOptGroup) => {
  //   setCustomConfig(generateConfig(selectedOptGroup, customConfigList));
  //   const newSearchFields = generateSeachFieldArray(selectedOptGroup);
  //   //Add in searchfields from tableConfig
  //   setPageRequest((prev) => ({
  //     ...prev,
  //     searchFields: newSearchFields,
  //   }));
  // };

  const setCustomConfigData = (selectedOptGroup) => {
    const newFields = selectedOptGroup.filter((item) => {
      if (!mandatoryConfig.find((opt) => opt.value === item.value)) {
        return item;
      }
    });
    const newOptGroup = [...mandatoryConfig, ...newFields];
    setCustomConfig(generateConfig(newOptGroup, customConfigList));
    const newSearchFields = generateSeachFieldArray(newOptGroup);
    setPageRequest((prev) => ({
      ...prev,
      searchFields: newSearchFields,
    }));
  };


  const setPageInfoData = (data) => {
    setPageInfo((prev) => ({
      currentPage: data.page,
      totalPages: data.totalPages,
      totalElements: data.totalElements,
      pageSize: data?.pageSize,
    }));
  };

  // Set page for page request
  const setPage = (page) => {
    setPageRequest((prev) => ({
      ...prev,
      page: page,
    }));
  };

  // Set page size for page request
  const setPageSize = (pageSize) => {
    setPageRequest((prev) => ({
      ...prev,
      pageSize: pageSize,
      page: 0,
    }));
  };

  // Set sort direction for page request
  const setSortAndDirection = (option) => {
    let sortDir = "asc";
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
  const setSearchTerm = (e) => {
    e.preventDefault();
    setPageRequest((prev) => ({
      ...prev,
      page: 0,
      searchTerm: search,
    }));
  };

  // Set search fields for page request
  const setSearchFields = (searchFields) => {
    setPageRequest((prev) => ({
      ...prev,
      searchFields: searchFields,
    }));
  };

  // SetNextPage
  const setNextPage = () => {
    if (pageRequest.page === pageInfo.totalPages - 1) {
      return;
    }
    setPageRequest((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  // SetPreviousPage
  const setPreviousPage = () => {
    if (pageRequest.page === 0) {
      return;
    }
    setPageRequest((prev) => ({
      ...prev,
      page: prev.page - 1,
    }));
  };

  return {
    pageRequest,
    pageRequestSet: {
      setNextPage,
      setPreviousPage,
      setPageRequest,
      setPage,
      setPageSize,
      setSortAndDirection,
      setSearchTerm,
      setSearchFields,
    },
    pageInfo,
    setPageInfoData,
    search,
    setSearch,
    customConfig,
    setCustomConfigData,
    setTableData,
    handleRowCheck,
    selectAllRows,
    activeRow,
    setActiveRow,
    tableData,
    tableConfig,
    setTableConfig,
  };
};

export default useTableHook;
