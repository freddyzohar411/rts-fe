import React, { useState } from "react";
import { DateHelper } from "@workspace/common";
import {
  generateSeachFieldArray,
  generateConfig,
} from "../../helpers/dynamicTable_helper";

const useTableHook = (initialPageRequest = {}, initialConfig = [], customConfigList) => {
  // Set state for page request
  const [pageRequest, setPageRequest] = useState({
    page: initialPageRequest?.page || 0,
    pageSize: initialPageRequest?.pageSize || 5,
    sortBy: initialPageRequest?.sortBy || null,
    sortDirection: initialPageRequest?.sortDirection || "asc",
    searchTerm: initialPageRequest?.searchTerm || null,
    searchFields: initialPageRequest?.searchFields,
  });

  const [pageInfo, setPageInfo] = useState({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
  });

  const [search, setSearch] = useState("");

  const [customConfig, setCustomConfig] = useState(initialConfig);

  const [customConfigListState, setCustomConfigListState] = useState(customConfigList ||[]);

  // const [customRenderList, setCustomRenderList] = useState([]);



  const setCustomConfigData = (selectedOptGroup) => {
    console.log("selectedOptGroup", selectedOptGroup);
    console.log("customConfigListState", customConfigListState);
    setCustomConfig(generateConfig(selectedOptGroup, customConfigListState));
    setPageRequest((prev) => ({
      ...prev,
      searchFields: generateSeachFieldArray(selectedOptGroup),
    }));
  };

  const setPageInfoData = (data) => {
    setPageInfo((prev) => ({
      currentPage: data.page,
      totalPages: data.totalPages,
      totalElements: data.totalElements,
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
  };
};

export default useTableHook;
