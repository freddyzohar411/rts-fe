import React, { useState } from "react";
import ReactHtmlParser from "react-html-parser";
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
import SelectElement from "../components/SelectElement";
import "./pagePreview.scss";
import "../TinyCME.scss"

const TemplatePagePreviewModal = ({ content }) => {
  const [pageSize, setPageSize] = useState({
    label: "A4",
    value: "a4",
  }); // Initial page size
  const [showInsertModal, setShowInsertModal] = useState(false);
  const closeModal = () => {
    setShowInsertModal(false);
  };

  const categoryArray = [
    { label: "A4", value: "a4" },
    { label: "A3", value: "a3" },
    { label: "Letter", value: "letter" },
  ];

  return (
    <>
      <Button onClick={() => setShowInsertModal(true)}>Preview</Button>
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
            <span className="h5 fw-bold">Export Page Preview</span>
          </div>
        </ModalHeader>
        <ModalBody className="bg-light" style={{ minHeight: "500px" }}>
          <Row className="align-items-end mb-5">
            <Col>
              <Label>Category</Label>
              <SelectElement
                optionsData={categoryArray}
                setSelectedOptionData={setPageSize}
                placeholder="Select a page size"
                value={pageSize}
              />
            </Col>
          </Row>
          <Row>
            {/* <div className={`tinyCME ${pageSize}`}>
              <div> {ReactHtmlParser(content)}</div>
            </div>{" "} */}
            {/* Preview content */}
            <div className={`tinyCME preview-content ${pageSize.value}`}>
              <div
                className={`${pageSize.value}`}
                // style={{ display: pageSize === "a4" ? "block" : "none" }}
              >
                <div> {ReactHtmlParser(content)}</div>
              </div>
            </div>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};

export default TemplatePagePreviewModal;
