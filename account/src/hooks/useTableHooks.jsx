import React, { useState, useEffect } from 'react'

const useTableHooks = () => {
    // Set state for page request
    const [pageRequest, setPageRequest] = useState({
      page: 0,
      pageSize: 5,
      sortBy: null,
      sortDirection: "asc",
      searchTerm: null,
      searchFields: generateSeachFieldArray(accountInitialConfig),
    });

    // Set state for page info
    const [pageInfo, setPageInfo] = useState({
      currentPage: 0,
      totalPages: 0,
      totalElements: 0,
    });

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
      }));
    };

    // Set sort by for page request
    const setSortBy = (sortBy) => {
      setPageRequest((prev) => ({
        ...prev,
        sortBy: sortBy,
      }));
    };

    // Set sort direction for page request
  const handleSort = (option) => {
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

    // Set search term for page request
    const setSearchTerm = (searchTerm) => {
      setPageRequest((prev) => ({
        ...prev,
        searchTerm: searchTerm,
      }));
    };

    // Set search fields for page request
    const setSearchFields = (searchFields) => {
      setPageRequest((prev) => ({
        ...prev,
        searchFields: searchFields,
      }));
    };

    return 
}

export default useTableHooks