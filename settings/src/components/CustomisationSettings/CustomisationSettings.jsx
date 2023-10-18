import React, { useEffect, useState } from "react";
import {
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Actions as formActions } from "@workspace/formbuilder";
import CustomisationTableWrapper from "./CustomisationTableWrapper";
import { useTableHook } from "@workspace/common";
import { DynamicTableHelper } from "@workspace/common";
import axios from "axios";
import { CUSTOMISATION_INITIAL_OPTION } from "./customisationTableInitialOptions";

function CustomisationSettings() {
  //========================== User Setup ============================
  // This will vary with the table main page. Each table have it own config with additional columns
  const generateFormConfig = (customConfig) => {
    return [
      ...customConfig,
      {
        header: "Action",
        name: "action",
        sort: false,
        sortValue: "action",
        render: (data) => (
          <div className="d-flex column-gap-2">
            <Link to={`/form-builder/${data.formId}`}>
              <Button type="button" className="btn btn-primary">
                <i className="ri-edit-2-line"></i>
              </Button>
            </Link>
            <Button
              type="button"
              className="btn btn-danger"
              onClick={() => dispatch(formActions.deleteForm(data.formId))}
            >
              <i className="ri-delete-bin-2-line text-light"></i>
            </Button>
          </div>
        ),
      },
    ];
  };
  // =================================================================
  const dispatch = useDispatch();
  const [formsData, setFormsData] = useState([]);
  const { generateConfig, generateSeachFieldArray, cleanPageRequest } =
    DynamicTableHelper;

  const {
    pageRequest,
    pageRequestSet,
    pageInfo,
    setPageInfoData,
    search,
    setSearch,
    customConfig,
  } = useTableHook(
    {
      page: 0,
      pageSize: 5,
      sortBy: null,
      sortDirection: "asc",
      searchTerm: null,
      searchFields: generateSeachFieldArray(CUSTOMISATION_INITIAL_OPTION),
    },
    generateConfig(CUSTOMISATION_INITIAL_OPTION)
  );

  const fetchForms = (pageRequest) => {
    axios
      .post(
        "http://localhost:9400/forms/listing",
        cleanPageRequest(pageRequest)
      )
      .then((res) => {
        console.log(res.data);
        setFormsData(res.data);
      });
  };

  useEffect(() => {
    fetchForms(pageRequest);
  }, [pageRequest]);

  // Update the page info when account Data changes
  useEffect(() => {
    if (formsData) {
      setPageInfoData(formsData);
    }
  }, [formsData]);

  return (
    <CustomisationTableWrapper
      data={formsData.forms}
      config={generateFormConfig(customConfig)}
      pageInfo={pageInfo}
      pageRequest={pageRequest}
      pageRequestSet={pageRequestSet}
      search={search}
      setSearch={setSearch}
    />
  );
}

export default CustomisationSettings;
