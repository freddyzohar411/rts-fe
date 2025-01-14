import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteCustomModal,
  DynamicTableHelper,
  useTableHook,
} from "@workspace/common";
import { CUSTOMISATION_INITIAL_OPTION } from "./customisationTableInitialOptions";
import { Actions as formActions } from "@workspace/formbuilder";
import { Link } from "react-router-dom";
import { formatDate } from "@workspace/common/src/helpers/date_helper";
import CustomisationNewWrapper from "./CustomisationNewWrapper";

function CustomisationNew() {
  document.title = "Form Customisation Settings | RTS";

  // Delete Modal States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const dispatch = useDispatch();
  const { forms } = useSelector((state) => state.FormReducer);
  const { generateConfig, generateSeachFieldArray, cleanPageRequest } =
    DynamicTableHelper;

  // Use Table Hook
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
      pageSize: 30,
      sortBy: null,
      sortDirection: "asc",
      searchTerm: null,
      searchFields: generateSeachFieldArray(CUSTOMISATION_INITIAL_OPTION),
    },
    CUSTOMISATION_INITIAL_OPTION
  );

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
              <Button type="button" className="btn btn-custom-primary">
                <i className="ri-edit-2-line"></i>
              </Button>
            </Link>
            <Button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                setDeleteId(data.formId);
                setIsDeleteModalOpen(true);
              }}
            >
              <i className="ri-delete-bin-6-line"></i>
            </Button>
          </div>
        ),
      },
    ];
  };

  // Fetch Form Data
  useEffect(() => {
    dispatch(
      formActions.fetchForms(DynamicTableHelper.cleanPageRequest(pageRequest))
    );
    return () => {
      dispatch(formActions.clearForm());
    };
  }, [pageRequest]);

  // Update Page Information
  useEffect(() => {
    if (forms) {
      setPageInfoData(forms);
    }
  }, [forms]);

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
        deleteId={deleteId}
        header="Delete Form Template"
        message="Are you sure you want to delete this form template?"
      />
      <CustomisationNewWrapper
        data={forms.forms}
        config={generateFormConfig(customConfig)}
        pageInfo={pageInfo}
        pageRequestSet={pageRequestSet}
        search={search}
        setSearch={setSearch}
      />
    </>
  );
}

export default CustomisationNew;
