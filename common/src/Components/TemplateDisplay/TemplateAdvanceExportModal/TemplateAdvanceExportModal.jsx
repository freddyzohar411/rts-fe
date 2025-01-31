import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import PageSettingViewBackend from "../components/PageSettingViewBackend";
import TemplateSettingsSideBar from "./TemplateSettingsSideBar";
import SelectElement from "../components/SelectElement";
import { ExportHelper } from "../../..";
import { useDispatch, useSelector } from "react-redux";
import * as TemplateActions from "../../../../../template/src/store/template/action";
import * as TemplateHelper from "../templateDisplayHelper";
import "./TemplateAdvanceExportModal.scss";
import { toHaveStyle } from "@testing-library/jest-dom/matchers";
import { toast } from "react-toastify";

const TemplateAdvanceExportModal = ({
  content,
  showInsertModal,
  setShowInsertModal,
  toExport = true,
  attachmentCallback,
  allData,
  closeModalCallback = null,
}) => {
  const dispatch = useDispatch();
  const [templateSettings, setTemplateSettings] = useState({
    unit: "in",
    pageType: "A4",
    pageOrientation: "portrait",
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    exportType: "pdf",
    fileName: "template",
  });

  const [typeData, setTypeData] = useState("");
  const [categorySelected, setCategorySelected] = useState("");
  const [templateSelected, setTemplateSelected] = useState("");
  const [templateContent, setTemplateContent] = useState("");
  const [templateList, setTemplateList] = useState([]);
  const [showContent, setShowContent] = useState({
    oldHtml: content,
    html: "",
    styleTag: "",
  });

  const templateCategories = useSelector(
    (state) => state.TemplateReducer.templateCategories
  );

  const templatesByCategory = useSelector(
    (state) => state.TemplateReducer.templatesByCategory
  );

  useEffect(() => {
    setTemplateContent(content);
  }, [content]);

  useEffect(() => {
    if (templateContent == null) {
      setShowContent({
        oldHtml: content,
        html: "",
        styleTag: "",
      });
    }
  }, [templateContent]);

  useEffect(() => {
    if (showInsertModal) {
      dispatch(TemplateActions.fetchTemplateCategories());
    }
  }, [showInsertModal]);

  useEffect(() => {
    if (categorySelected == null || categorySelected == "") {
      setTemplateList([]);
      setTemplateSelected("");
    }
    if (categorySelected) {
      setTemplateSelected("");
      dispatch(TemplateActions.fetchTemplateByCategory(categorySelected.value));
    }
  }, [categorySelected]);

  useEffect(() => {
    if (templatesByCategory) {
      setTemplateList(
        templatesByCategory.map((template) => ({
          label: template.name,
          value: template.name,
        }))
      );
    }
  }, [templatesByCategory]);

  const closeModal = () => {
    setShowInsertModal(false);
    setTemplateSelected("");
    setCategorySelected("");
    if (!toExport) {
      setTemplateContent("");
      setShowContent({
        oldHtml: content,
        html: "",
        styleTag: "",
      });
    }

    if (closeModalCallback) {
      closeModalCallback();
    }
  };

  const handleExport = async () => {
    if (!showContent.html) {
      toast.error("Please select a template first");
      return;
    }
    if (templateSettings.exportType === "pdf") {
      if (toExport) {
        await ExportHelper.exportBackendHtml2Pdf(
          showContent.html,
          {
            ...templateSettings,
          },
          showContent.styleTag
        );
      } else {
        const file = await ExportHelper.exportBackendHtml2PdfFile(
          showContent.html,
          {
            ...templateSettings,
          },
          showContent.styleTag
        );
        if (attachmentCallback) {
          attachmentCallback(file);
        }
        closeModal();
      }
    }
    if (templateSettings.exportType === "docx") {
      if (toExport) {
        await ExportHelper.exportBackendHtml2Docx(
          showContent.html,
          {
            ...templateSettings,
          },
          showContent.styleTag
        );
      } else {
        const file = await ExportHelper.exportBackendHtml2DocxFile(
          showContent.html,
          {
            ...templateSettings,
          },
          showContent.styleTag
        );
        if (attachmentCallback) {
          attachmentCallback(file);
        }
        closeModal();
      }
    }
    if (templateSettings.exportType === "html") {
      await ExportHelper.generateHtml(showContent.oldHtml, {
        ...templateSettings,
      });
    }

    if (templateSettings.exportType === "pdfClient") {
      if (toExport) {
        await ExportHelper.generatePDFCustomMulti(showContent.oldHtml, {
          ...templateSettings,
        });
      } else {
        const file = await ExportHelper.convertHtmlToPdfFile(showContent.html, {
          ...templateSettings,
        });
        if (attachmentCallback) {
          attachmentCallback(file);
        }
        closeModal();
      }
    }

    if (templateSettings.exportType === "docxClient") {
      if (toExport) {
        await ExportHelper.generateDocxCustom(showContent.oldHtml, {
          ...templateSettings,
        });
      } else {
        const file = await ExportHelper.convertHtmlToDocxFile(
          showContent.oldHtml,
          {
            ...templateSettings,
          }
        );
        if (attachmentCallback) {
          attachmentCallback(file);
        }
        closeModal();
      }
    }

    if (templateSettings.exportType === "jpeg") {
      if (toExport) {
        await ExportHelper.exportBackendHtml2Jpeg(
          showContent.html,
          {
            ...templateSettings,
          },
          showContent.styleTag
        );
      } else {
        const file = await ExportHelper.exportBackendHtml2JpegFile(
          showContent.html,
          {
            ...templateSettings,
          },
          showContent.styleTag
        );
        if (attachmentCallback) {
          attachmentCallback(file);
        }
        closeModal();
      }
    }

    if (templateSettings.exportType === "png") {
      if (toExport) {
        await ExportHelper.exportBackendHtml2Png(
          showContent.html,
          {
            ...templateSettings,
          },
          showContent.styleTag
        );
      } else {
        const file = await ExportHelper.exportBackendHtml2PngFile(
          showContent.html,
          {
            ...templateSettings,
          },
          showContent.styleTag
        );
        if (attachmentCallback) {
          attachmentCallback(file);
        }
        closeModal();
      }
    }
  };

  useEffect(() => {
    const setSelectedContentAndProcessed = async () => {
      const processedContent = await TemplateHelper.runEffects(
        templateContent,
        null,
        allData,
        true
      );
      const removeEditableContent =
        TemplateHelper.removeContentEditableAndStyles(processedContent);

      const convertTableAttributesContent =
        TemplateHelper.convertStyleToAttributesTable(removeEditableContent);

      const convertInlineStylesContent =
        TemplateHelper.convertInlineStylesToClasses(
          convertTableAttributesContent
        );

      setShowContent((prev) => ({
        ...prev,
        oldHtml: content,
        ...convertInlineStylesContent,
      }));
    };

    if (templateContent && allData) {
      setSelectedContentAndProcessed();
      return;
    }
    // if (content || templateContent) {
    if (templateContent && templateContent !== "") {
      const removeEditableContent =
        TemplateHelper.removeContentEditableAndStyles(templateContent);

      const convertTableAttributesContent =
        TemplateHelper.convertStyleToAttributesTable(removeEditableContent);

      const convertInlineStylesContent =
        TemplateHelper.convertInlineStylesToClasses(
          convertTableAttributesContent
        );
      setShowContent((prev) => ({
        ...prev,
        oldHtml: content,
        ...convertInlineStylesContent,
      }));
    }
  }, [templateContent, allData, content]);

  // Template selected will show the preview
  useEffect(() => {
    if (toExport) {
      return;
    }
    if (
      !templateSelected ||
      templateSelected === "" ||
      templateSelected === null
    ) {
      setTemplateContent("");
      return;
    }
    const template = templatesByCategory.filter(
      (template) =>
        template.name == templateSelected.value &&
        template.category === categorySelected.value
    )[0];
    if (template) {
      setTemplateContent(template?.content);
    }
  }, [templateSelected]);

  return (
    <Modal
      isOpen={showInsertModal}
      closeModal={() => {
        closeModal();
      }}
      centered
      scrollable
      fullscreen
      className="custom-modal"
    >
      <ModalHeader
        className="bg-custom-primary "
        toggle={() => {
          closeModal();
        }}
      >
        <div className="d-flex flex-column text-dark">
          <span className="h4 fw-bold">
            {toExport ? "Export Template" : "Attach Template"}
          </span>
        </div>
        {!toExport && (
          <Row className="align-items-end mb-1" style={{ minWidth: "800px" }}>
            <Col>
              <Label>Category</Label>
              <SelectElement
                optionsData={templateCategories.map((category) => ({
                  label: category,
                  value: category,
                }))}
                setSelectedOptionData={setCategorySelected}
                placeholder="Select a category"
                value={categorySelected}
              />
            </Col>
            <Col>
              <Label>Template</Label>
              <SelectElement
                optionsData={templateList}
                value={templateSelected}
                placeholder="Select a field"
                setSelectedOptionData={setTemplateSelected}
                module={typeData}
              />
            </Col>
            {/* // Preview Button Do not delete*/}
            {/* <Col>
              <Button
                type="button"
                className="self-end btn-primary"
                disabled={!templateSelected || !categorySelected}
                onClick={async () => {
                  const template = templatesByCategory.filter(
                    (template) =>
                      template.name == templateSelected.value &&
                      template.category === categorySelected.value
                  )[0];
                  setTemplateContent(template.content);
                  setTemplateSelected("");
                  setCategorySelected("");
                }}
              >
                Preview
              </Button>
            </Col> */}
          </Row>
        )}
      </ModalHeader>
      <ModalBody scrollable={true} className="bg-light p-0 border">
        <div className="d-flex flex-column">
          <Row className="m-0">
            <Col
              className="col-3 pt-3 pb-3 px-4"
              style={{
                borderRight: "1px grey solid",
                overflowY: "auto",
                maxHeight: "635px",
              }}
            >
              <TemplateSettingsSideBar
                setSettings={setTemplateSettings}
                settings={templateSettings}
                callback={handleExport}
                toExport={toExport}
              />
            </Col>
            <Col className="col-9">
              <div className="d-flex justify-content-center">
                <PageSettingViewBackend
                  content={showContent}
                  settings={templateSettings}
                  toExport={toExport}
                />
              </div>
            </Col>
          </Row>
          <hr className="mt-0" />
          <Row className="mx-3" style={{ zIndex: "0" }}>
            <Col className="d-flex justify-content-end">
              <Button className="btn-danger" onClick={() => closeModal()}>
                Cancel
              </Button>
            </Col>
          </Row>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default TemplateAdvanceExportModal;
