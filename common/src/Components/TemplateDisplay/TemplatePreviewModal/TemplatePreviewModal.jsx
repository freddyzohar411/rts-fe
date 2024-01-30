import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TemplateDisplayV3 from "../TemplateDisplayV3";
import SelectElement from "../components/SelectElement";
import * as TemplateActions from "../../../../../template/src/store/template/action";
import * as ExportHelper from "../../../helpers/export_helper";
import { generateOptions } from "../pdfOption";

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

const TemplatePreviewModal = ({
  showInsertModal,
  setShowInsertModal,
  toExport = true,
  callback,
  allModuleData,
}) => {
  const dispatch = useDispatch();
  const [typeData, setTypeData] = useState("");
  const [categorySelected, setCategorySelected] = useState("");
  const [templateSelected, setTemplateSelected] = useState("");
  const [templateContentPreview, setTemplateContentPreview] = useState("");
  const [templateList, setTemplateList] = useState([]);
  const templateCategories = useSelector(
    (state) => state.TemplateReducer.templateCategories
  );

  console.log("templateCategories", templateCategories);
  const [fileName, setFileName] = useState("");

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

  const handlePDF = async (fileName) => {
    if (toExport) {
      await ExportHelper.generatePDFCustomMulti(
        templateContentPreview,
        generateOptions({
          filename: fileName,
        })
      );
    } else {
      const file = await ExportHelper.convertHtmlToPdfFile(
        templateContentPreview,
        generateOptions({
          filename: fileName,
        })
      );
      if (callback) {
        callback(file);
      }
      closeModal();
    }
  };

  const handleDocx = async (fileName) => {
    if (toExport) {
      await ExportHelper.generateDocxCustom(templateContentPreview, {
        filename: fileName,
      });
    } else {
      const file = await ExportHelper.convertHtmlToDocxFile(
        templateContentPreview,
        {
          filename: fileName,
        }
      );
      if (callback) {
        callback(file);
      }
      closeModal();
    }
  };

  const closeModal = () => {
    setShowInsertModal(false);
    setTemplateContentPreview("");
    setFileName("");
  };

  return (
    <Modal
      isOpen={showInsertModal}
      closeModal={() => {
        closeModal();
      }}
      centered
      scrollable
      size="xl"
    >
      <ModalHeader
        className="bg-primary pb-3"
        toggle={() => {
          closeModal();
        }}
      >
        <div className="d-flex flex-column text-dark">
          <span className="h5 fw-bold">
            {toExport ? "Export Template" : "Attach Template"}
          </span>
        </div>
      </ModalHeader>
      <ModalBody className="bg-light" style={{ minHeight: "500px" }}>
        <div>
          <Row className="align-items-end mb-5">
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
                className="self-end btn-custom-primary"
                disabled={!templateSelected || !categorySelected}
                onClick={async () => {
                  const template = templatesByCategory.filter(
                    (template) =>
                      template.name == templateSelected.value &&
                      template.category === categorySelected.value
                  )[0];
                  setTemplateContentPreview(template.content);
                  setTemplateSelected("");
                  setCategorySelected("");
                }}
              >
                Preview
              </Button>
            </Col>
          </Row>
          <Container
            className="border pt-3 rounded"
            style={{
              width: "850px",
              height: "800px",
              borderColor: "#8AAED6",
              overflow: "auto",
            }}
          >
            <TemplateDisplayV3
              content={templateContentPreview}
              isView={true}
              processContent={true}
              allData={allModuleData ?? null}
            />
          </Container>
          <Row className="mb-3 mt-3 center d-flex justify-content-center">
            <div className="w-50 text-center">
              <span
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "500",
                }}
              >
                {toExport ? "Export Template" : "Attach Template"}
              </span>
              <Input
                type="text"
                className="mt-2"
                placeholder="Enter file name"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
              />
              <div className="mt-3 w-100 d-flex gap-2">
                <Button
                  className="w-100 btn-custom-primary"
                  onClick={() => {
                    handlePDF(fileName);
                  }}
                  disabled={!templateContentPreview || !fileName}
                >
                  {toExport ? "Download as PDF" : "Attach as PDF"}
                </Button>
                <Button
                  className="w-100 btn-custom-primary"
                  onClick={() => {
                    handleDocx(fileName);
                  }}
                  disabled={!templateContentPreview || !fileName}
                >
                  {toExport ? "Download as Docx" : "Attach as Docx"}
                </Button>
              </div>
            </div>
          </Row>
          <hr />
          <div className="d-flex justify-content-end gap-3">
            <Button className="btn-danger" onClick={() => closeModal()}>
              Cancel
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default TemplatePreviewModal;
