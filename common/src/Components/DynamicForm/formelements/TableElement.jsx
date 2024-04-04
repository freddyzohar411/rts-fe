import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Label,
  Col,
  Row,
  Input,
  Button,
  Table,
  FormFeedback,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import FilePreview from "../../FilePreview/FilePreview";
import { toast } from "react-toastify";
import * as FileHelper from "../../../helpers/file_helper";
import * as BackendHelper from "../../../helpers/backend_helper";

const TableElement = ({
  formik,
  field,
  deleteTableData,
  setFormState,
  formFieldsHook,
  formStateHook,
}) => {
  const { formState } = formStateHook;
  const { formFields, setFormFields } = formFieldsHook;
  const [tableConfig, setTableConfig] = useState(
    field?.tableConfig ? field.tableConfig : []
  );
  const [tableSetting, setTableSetting] = useState(
    field?.tableSettings ? field.tableSettings : {}
  );
  const [table, setTable] = useState(field.tableData || []);
  const [filePreview, setFilePreview] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  useEffect(() => {
    setFormFieldTableData(table);
  }, [table]);

  useEffect(() => {
    setTableConfig(field.tableConfig);
    setTableSetting(field.tableSetting);
  }, [
    field.tableConfig,
    field.tableSettings,
    field.tableSetting.tableRerender,
  ]);

  // API Services
  // Get
  const getTableData = () => {
    if (tableSetting.tableGetAPI) {
      axios
        .get(tableSetting.tableGetAPI)
        .then((data) => {
          const formDataList = data.data;
          setTable(mapTableData(formDataList));
        })
        .catch((error) => {});
    }
  };

  const setFormFieldTableData = (data) => {
    const newFormFields = [...formFields];
    newFormFields.forEach((formField) => {
      if (formField.name === field.name) {
        formField.tableData = data;
      }
    });
    setFormFields(newFormFields);
  };

  // Get data on load
  useEffect(() => {
    if (tableSetting) {
      if (
        tableSetting.tableUseAPI === "true" ||
        tableSetting.tableUseAPI === true
      ) {
        getTableData();
      }
      setTableConfig([...field.tableConfig]);
    }
  }, [
    field,
    tableSetting.tableGetAPI,
    tableSetting.tableDeleteAPI,
    field.tableSetting.tableRerender,
  ]);

  const mapTableData = (dataList) => {
    const tableData = dataList?.map((data) => {
      const dataObj = {
        id: data.id,
        data: JSON.parse(data.submissionData),
      };
      if (data.entityType) {
        dataObj.entityType = data.entityType;
      }
      if (data.entityId) {
        dataObj.entityId = data.entityId;
      }
      return dataObj;
    });
    return tableData;
  };

  const handleEdit = (row) => {
    // Set formik values based on row value and config
    // Set all the formik values in this table based on the API
    for (const [key, value] of Object.entries(row.data)) {
      formik?.setFieldValue(key, value);
    }

    // Set the form to untounched and no validation
    formik?.setTouched({});
    formik?.setErrors({});

    // Set tabled edit id in form field
    // const newFormFields = [...formFields];
    const newFormFields = JSON.parse(JSON.stringify(formFields));
    newFormFields.forEach((formField) => {
      if (formField.name === field.name) {
        formField.tableSetting = {
          ...formField.tableSetting,
          tableEditId: row.id,
        };
      }
    });

    // Check for file and set entity info
    newFormFields.forEach((field) => {
      if (field.type === "file") {
        field.entityInfo = {
          entityId: row.id,
          entityType: row.entityType,
        };
      }
    });

    // Set Multi file
    newFormFields.forEach((field) => {
      if (field.type === "multifile") {
        field.multiFileEnity = {
          entityId: row.id,
          entityType: row.entityType,
        };
      }
    });

    setFormFields(newFormFields);
    setFormState("tableUpdate");
  };

  // Delete from formfields
  const handleDelete = (id) => {
    if (
      tableSetting.tableUseAPI === "true" ||
      tableSetting.tableUseAPI === true
    ) {
      // Delete from API
      axios.delete(`${tableSetting.tableDeleteAPI}/${id}`).then((data) => {
        getTableData();
      });
    }
  };

  // Handle File Download
  const handleDownload = async (item, data) => {
    let documentData = null;
    if (item?.entityType && item?.entityId) {
      const res = await BackendHelper.downloadDocumentByEntityAndId({
        entityType: item?.entityType,
        entityId: item?.entityId,
      });
      documentData = res.data;
    } else {
      const res = await BackendHelper.downloadDocumentById(data?.id);
      documentData = res.data;
    }

    if (!documentData?.encodedFile) {
      toast.error("File not found.");
      return;
    }

    FileHelper.downloadBase64File(
      documentData?.encodedFile,
      documentData?.fileName
    );
  };

  // Handle File Preview
  const handlePreview = async (item, data) => {
    let documentData = null;
    if (item?.entityType && item?.entityId) {
      const res = await BackendHelper.downloadDocumentByEntityAndId({
        entityType: item?.entityType,
        entityId: item?.entityId,
      });
      documentData = res.data;
    } else {
      const res = await BackendHelper.downloadDocumentById(data?.id);
      documentData = res.data;
    }
    const ext = documentData?.fileName.split(".").pop();

    if (ext == "docx" || ext == "doc" || ext == "xlsx" || ext == "xls") {
      // Convert to formdata
      const formData = new FormData();
      formData.append(
        "docFile",
        FileHelper.base64ToFile(
          documentData?.encodedFile,
          documentData?.fileName
        )
      );

      const convertedData = await BackendHelper.convertMsDocToPdf(formData);
      const docData = convertedData.data;
      const pdfName = docData?.fileName?.split(".")[0] + ".pdf";
      const file = await FileHelper.base64ToFile(docData?.encodedFile, pdfName);
      setFilePreview(file);
      setShowPreviewModal(true);
      return;
    }

    if (ext == "pdf") {
      const file = FileHelper.base64ToFile(
        documentData?.encodedFile,
        documentData?.fileName
      );
      setFilePreview(file);
      setShowPreviewModal(true);
      return;
    }

    toast.error("File format not supported for preview.");
  };

  return (
    <div className="table-responsive mb-3" style={{ maxHeight: "200px" }}>
      <Modal
        isOpen={showPreviewModal}
        closeModal={() => {
          setShowPreviewModal(false);
        }}
        centered
        scrollable
        size="xl"
      >
        <ModalHeader
          className="bg-primary pb-3"
          toggle={() => setShowPreviewModal(false)}
        >
          <div className="d-flex flex-column text-dark">
            <span className="h5 fw-bold">Document Preview</span>
          </div>
        </ModalHeader>
        <ModalBody className="bg-light" style={{ minHeight: "500px" }}>
          <FilePreview file={filePreview} />
        </ModalBody>
      </Modal>
      <Table className="table-bordered align-middle table-nowrap mb-0">
        <thead className="table-secondary">
          <tr>
            {tableConfig &&
              tableConfig.map((item, index) => (
                <th key={index}>{item.label}</th>
              ))}
            {tableSetting.tableEdit === "true" ||
              (tableSetting.tableEdit === true && formState !== "view" && (
                <th>Edit</th>
              ))}
            {tableSetting.tableDelete === "true" ||
              (tableSetting.tableDelete === true && formState !== "view" && (
                <th>Delete</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {table?.length === 0 ? (
            <tr>
              <td colSpan="5">
                No documents added yet, please add one to view.
              </td>
            </tr>
          ) : (
            table?.map((row, rowIndex) => {
              return (
                <tr key={rowIndex}>
                  {tableConfig.map((item, index) => {
                    console.log("Render: ", item?.render);
                    return (
                      <td key={index}>
                        <div className="d-flex align-items-center gap-3">
                          <span> {row?.data?.[item?.name]}</span>
                          {item?.render === "fileDownloadPreview" && (
                            <Button
                              type="button"
                              className="btn btn-secondary px-2 py-1"
                              title="Preview"
                              onClick={() => handlePreview(item, row)}
                            >
                              <span
                                className=" ri-eye-line"
                                style={{ fontSize: "0.8rem" }}
                              ></span>
                            </Button>
                          )}
                          {(item?.render === "fileDownloadPreview" ||
                            item?.render === "fileDownload") && (
                            <Button
                              type="button"
                              className="btn btn-custom-primary px-2 py-1"
                              onClick={() => handleDownload(item, row)}
                              title="Download"
                            >
                              <span
                                className="ri-file-download-line"
                                style={{ fontSize: "0.8rem" }}
                              ></span>
                            </Button>
                          )}
                        </div>
                      </td>
                    );
                  })}
                  {tableSetting.tableEdit === "true" ||
                    (tableSetting.tableEdit === true &&
                      formState !== "view" && (
                        <td>
                          <button
                            type="button"
                            className="btn btn-custom-primary"
                            onClick={() => handleEdit(row)}
                          >
                            Edit
                          </button>
                        </td>
                      ))}
                  {tableSetting.tableDelete === "true" ||
                    (tableSetting.tableDelete === true &&
                      formState !== "view" && (
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleDelete(row.id)}
                          >
                            Delete
                          </button>
                        </td>
                      ))}
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default TableElement;
