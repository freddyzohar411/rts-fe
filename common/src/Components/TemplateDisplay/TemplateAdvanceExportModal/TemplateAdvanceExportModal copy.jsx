import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Container,
} from "reactstrap";
import PageSettingView from "../components/PageSettingView";
import PageSettingViewBackend from "../components/PageSettingViewBackend";
import TemplateSettingsSideBar from "./TemplateSettingsSideBar";
import SelectElement from "../components/SelectElement";
import { ExportHelper } from "../../..";
import { useDispatch, useSelector } from "react-redux";
import * as TemplateActions from "../../../../../template/src/store/template/action";
import * as TemplateHelper from "../templateDisplayHelper";
import "./TemplateAdvanceExportModal.scss";

const TemplateAdvanceExportModal = ({
  content,
  showInsertModal,
  setShowInsertModal,
  toExport = true,
  attachmentCallback,
  allData,
}) => {
  const dispatch = useDispatch();
  const [templateSettings, setTemplateSettings] = useState({
    unit: "in",
    pageType: "a4",
    pageOrientation: "portrait",
    marginTop: 0.25,
    marginBottom: 0.25,
    marginLeft: 0.25,
    marginRight: 0.25,
    exportType: "pdf",
    fileName: "template",
  });
  const [typeData, setTypeData] = useState("");
  const [categorySelected, setCategorySelected] = useState("");
  const [templateSelected, setTemplateSelected] = useState("");
  const [templateContent, setTemplateContent] = useState("");
  const [templateList, setTemplateList] = useState([]);
  const [showContent, setShowContent] = useState(content ?? "");

  const templateCategories = useSelector(
    (state) => state.TemplateReducer.templateCategories
  );

  const templatesByCategory = useSelector(
    (state) => state.TemplateReducer.templatesByCategory
  );

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
    setShowContent("");
  };

  const handleExport = async () => {
    if (templateSettings.exportType === "pdf") {
      if (toExport) {
        // await ExportHelper.generatePDFCustomMulti(showContent, {
        await ExportHelper.exportBackendHtml2Pdf(showContent, {
          ...templateSettings,
        });
      } else {
        // const file = await ExportHelper.convertHtmlToPdfFile(showContent, {
          const file = await ExportHelper.exportBackendHtml2PdfFile(showContent, {
          ...templateSettings,
        });
        if (attachmentCallback) {
          attachmentCallback(file);
        }
        closeModal();
      }
    }
    if (templateSettings.exportType === "docx") {
      if (toExport) {
        // await ExportHelper.generateDocxCustom(showContent, {
        await ExportHelper.exportBackendHtml2Docx(showContent, {
          ...templateSettings,
        });
      } else {
        // const file = await ExportHelper.convertHtmlToDocxFile(showContent, {
          const file = await ExportHelper.exportBackendHtml2DocxFile(showContent, {
          ...templateSettings,
        });
        if (attachmentCallback) {
          attachmentCallback(file);
        }
        closeModal();
      }
    }
    if (templateSettings.exportType === "html") {
      await ExportHelper.generateHtml(showContent, {
        ...templateSettings,
      });
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
      const removeEditableContent = TemplateHelper.removeContentEditableAndStyles(
        processedContent
      )
      setShowContent(removeEditableContent);
    };

    if (templateContent && allData) {
      setSelectedContentAndProcessed();
      return;
    }

    setShowContent(content);
  }, [templateContent, allData, content]);

  

  return (
    // <div style={{ zIndex: 9999999999999 }}>
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
          // style={{ border:"1px solid #e0e0e0" }}
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
              <Col>
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
              </Col>
            </Row>
          )}
        </ModalHeader>
        <ModalBody
          scrollable={true}
          className="bg-light p-0 border"
        >
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
            <Row className="mx-3">
              <Col className="d-flex justify-content-end">
                <Button className="btn-danger" onClick={() => closeModal()}>
                  Cancel
                </Button>
              </Col>
            </Row>
          </div>
        </ModalBody>
      </Modal>
    // </div>
  );
};

export default TemplateAdvanceExportModal;
