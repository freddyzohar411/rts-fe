import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Actions as formActions } from "@workspace/formbuilder";
import CustomisationTableWrapper from "./CustomisationTableWrapper";
import { useTableHook } from "@workspace/common";
import { DynamicTableHelper } from "@workspace/common";
import { CUSTOMISATION_INITIAL_OPTION } from "./customisationTableInitialOptions";
import { DeleteCustomModal } from "@Workspace/common";

function CustomisationSettings() {
  // Delete modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const dispatch = useDispatch();
  const { forms } = useSelector((state) => state.FormReducer);
  const { generateConfig, generateSeachFieldArray, cleanPageRequest } =
    DynamicTableHelper;

  // Use Use table hook
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
              onClick={() => {
                console.log("Delete id: ", data.formId);
                setDeleteId(data.formId);
                setIsDeleteModalOpen(true);
              }}
            >
              <i className="ri-delete-bin-2-line text-light"></i>
            </Button>
          </div>
        ),
      },
    ];
  };
  // =================================================================

  // Fetch the forms data
  useEffect(() => {
    dispatch(formActions.fetchForms(cleanPageRequest(pageRequest)));

    return () => {
      dispatch(formActions.clearForm());
    };
  }, [pageRequest]);

  // Update the page info when account Data changes
  useEffect(() => {
    if (forms) {
      setPageInfoData(forms);
    }
  }, [forms]);

  // Modal Delete
  const confirmDelete = () => {
    dispatch(formActions.deleteForm(deleteId));
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <DeleteCustomModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        confirmDelete={confirmDelete}
        header="Delete Form Template"
        deleteText={"Are you sure you would like to delete this form template?"}
      />
      <CustomisationTableWrapper
        data={forms.forms}
        config={generateFormConfig(customConfig)}
        pageInfo={pageInfo}
        pageRequest={pageRequest}
        pageRequestSet={pageRequestSet}
        search={search}
        setSearch={setSearch}
      />
    </>
  );
}

export default CustomisationSettings;
