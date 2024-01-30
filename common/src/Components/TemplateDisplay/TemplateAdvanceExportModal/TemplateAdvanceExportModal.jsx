import React, { useState } from "react";
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
import TemplateSettingsSideBar from "./TemplateSettingsSideBar";

const TemplateAdvanceExportModal = ({
  content,
  showInsertModal,
  setShowInsertModal,
  toExport = true,
  callback,
}) => {
  const [templateSettings, setTemplateSettings] = useState({
    unit: "in",
    pageType: "a4",
    pageOrientation: "portrait",
    marginTop: 0.1,
    marginBottom: 0.1,
    marginLeft: 0.1,
    marginRight: 0.1,
    exportType: "pdf",
    fileName: "template",
  });

  const handlePDF = async (fileName) => {
    if (toExport) {
      await ExportHelper.generatePDFCustomMulti(
        content,
        generateOptions({
          filename: fileName,
        })
      );
    } else {
      const file = await ExportHelper.convertHtmlToPdfFile(
        content,
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
      await ExportHelper.generateDocxCustom(content, {
        filename: fileName,
      });
    } else {
      const file = await ExportHelper.convertHtmlToDocxFile(content, {
        filename: fileName,
      });
      if (callback) {
        callback(file);
      }
      closeModal();
    }
  };

  const closeModal = () => {
    setShowInsertModal(false);
  };

  return (
    <Modal
      isOpen={showInsertModal}
      closeModal={() => {
        closeModal();
      }}
      centered
      scrollable
      fullscreen
    >
      <ModalHeader
        className="bg-primary "
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
      <ModalBody scrollable={true} className="bg-light p-0 border">
        <div
          className="d-flex flex-column"
          style={{ minHeight: "91vh", overflowY: "auto" }}
        >
          <Row className="m-0">
            <Col
              className="col-3 pt-3 pb-3 px-4"
              style={{
                borderRight: "1px grey solid",
                overflowY: "auto",
                maxHeight: "620px",
              }}
            >
              <TemplateSettingsSideBar
                setSettings={setTemplateSettings}
                settings={templateSettings}
              />
            </Col>
            <Col className="col-9">
              <div className="d-flex justify-content-center">
                <PageSettingView content={content} settings={templateSettings}/>
              </div>
            </Col>
          </Row>
          {/* <Row className="mb-3 mt-3 center d-flex justify-content-center">
            <div className="w-50 text-center">
              <span
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "500",
                }}
              >
                {toExport ? "Export Template" : "Attach Template"}
              </span>

              <div className="mt-3 w-100 d-flex gap-2">
                <Button
                  className="w-100 btn-custom-primary"
                  onClick={() => {
                    handlePDF(fileName);
                  }}
                >
                  {toExport ? "Export" : "Attach"}
                </Button>
              </div>
            </div>
          </Row> */}
          <hr className="mt-0" />
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

export default TemplateAdvanceExportModal;
