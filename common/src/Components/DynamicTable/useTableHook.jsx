import React, { useState } from "react";
import { DateHelper } from "@workspace/common";

const useTableHook = (initialPageRequest = {}, initialConfig = []) => {
  // Set state for page request
  const [pageRequest, setPageRequest] = useState({
    page: initialPageRequest?.page || 0,
    pageSize: initialPageRequest?.pageSize || 5,
    sortBy: initialPageRequest?.sortBy || null,
    sortDirection: initialPageRequest?.sortDirection || "asc",
    searchTerm: initialPageRequest?.searchTerm || null,
    searchFields: initialPageRequest?.searchFields,
  });

  console.log("Page request", pageRequest);

  const [pageInfo, setPageInfo] = useState({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
  });

  const [search, setSearch] = useState("");

  const [customConfig, setCustomConfig] = useState(initialConfig);

  function generateSeachFieldArray(selectedOptGroup) {
    const searchFields = [];
    selectedOptGroup.forEach((opt) => {
      if (opt.sort === true) {
        searchFields.push(opt.sortValue);
      }
    });
    return searchFields;
  }

  function getDynamicNestedResult(data, value) {
    const result = value.split(".").reduce((acc, part) => {
      return acc ? acc[part] : undefined;
    }, data);
    return result;
  }

  function generateConfig(selectedOptGroup) {
    const config = [];
    selectedOptGroup.forEach((opt) => {
      config.push({
        header: opt.label,
        name: opt.value,
        sort: opt.sort,
        sortValue: opt.sortValue,
        render: (data) => {
          if (opt.value === "createdAt" || opt.value === "updatedAt") {
            return DateHelper.formatDateStandard(
              getDynamicNestedResult(data, opt.value) || "-"
            );
          }
          return getDynamicNestedResult(data, opt.value) || "-";
        },
      });
    });
    return config;
  }

  const setCustomConfigData = (selectedOptGroup) => {
    setCustomConfig(generateConfig(selectedOptGroup));
    setPageRequest((prev) => ({
      ...prev,
      searchFields: generateSeachFieldArray(selectedOptGroup),
    }));
  };

  const setPageInfoData = (data) => {
    setPageInfo((prev) => ({
      currentPage: data.currentPage,
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
