import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteCustomModal,
  DynamicTableHelper,
  useTableHook,
  DateHelper
} from "@workspace/common";
import { CUSTOMISATION_INITIAL_OPTION } from "./customisationTableInitialOptions";
import * as TemplateActions from "../../store/template/action";
import { Link } from "react-router-dom";
import TemplateListingWrapper from "../../components/TemplateListingAccordion/TemplateListingWrapper";

function TemplateListingPage() {
  document.title = "Template Customisation Settings | RTS";

  // Delete Modal States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const dispatch = useDispatch();
  const { templates } = useSelector((state) => state.TemplateReducer);
  const { generateConfig, generateSeachFieldArray, cleanPageRequest } =
    DynamicTableHelper;

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
      pageSize: 99,
      sortBy: null,
      sortDirection: "asc",
      searchTerm: null,
      searchFields: generateSeachFieldArray(CUSTOMISATION_INITIAL_OPTION),
    },
    CUSTOMISATION_INITIAL_OPTION,
    customRenderList
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
            <Link to={`/settings/templates/${data.id}/edit`}>
              <Button type="button" className="btn btn-custom-primary px-2 py-1">
                <i
                  className="ri-edit-2-line"
                  style={{ fontSize: "0.65rem" }}
                ></i>
              </Button>
            </Link>
            <Button
              type="button"
              className="btn btn-danger px-2 py-1"
              onClick={() => {
                setDeleteId(data.id);
                setIsDeleteModalOpen(true);
              }}
            >
              <i
                className="ri-delete-bin-6-line"
                style={{ fontSize: "0.65rem" }}
              ></i>
            </Button>
          </div>
        ),
      },
    ];
  };

  // Fetch Form Data
  useEffect(() => {
    dispatch(
        TemplateActions.fetchTemplates(DynamicTableHelper.cleanPageRequest(pageRequest))
    );
    return () => {
      dispatch(TemplateActions.clearTemplate());
    };
  }, [pageRequest]);

  // Update Page Information
  useEffect(() => {
    if (templates) {
      setPageInfoData(templates);
    }
  }, [templates]);

  const confirmDelete = () => {
    dispatch(TemplateActions.deleteTemplate(deleteId));
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <DeleteCustomModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        confirmDelete={confirmDelete}
        deleteId={deleteId}
        header="Delete Template"
        message="Are you sure you want to delete this template?"
      />
      <TemplateListingWrapper
        data={templates.templates}
        config={generateFormConfig(customConfig)}
        pageInfo={pageInfo}
        pageRequestSet={pageRequestSet}
        search={search}
        setSearch={setSearch}
      />
    </>
  );
}

export default TemplateListingPage;
