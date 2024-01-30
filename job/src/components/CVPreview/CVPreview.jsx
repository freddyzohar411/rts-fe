import React, { useState } from "react";
import { Row, Col, Button, Container } from "reactstrap";
import {
  TemplateDisplayV3,
  UseTemplateModuleDataHook,
} from "@workspace/common";
import { TemplateHelper } from "@workspace/common";
import { TemplateExportButtons } from "@workspace/common";

function CVPreview({ onExitPreview, templateData, candidateId }) {
  const { allModuleData } = UseTemplateModuleDataHook.useTemplateModuleData();
  const [exportContent, setExportContent] = useState("");

  const handleExitPreview = () => {
    onExitPreview();
  };
  return (
    <React.Fragment>
      <div>
        <Row>
          <Col>
            <Container
              className="p-3 mt-3 border border-1 border-dark"
              style={{ height: "100%", minWidth: "80%" }}
            >
              <TemplateDisplayV3
                content={templateData?.content ?? null}
                allData={allModuleData}
                isView={true}
                initialValues
                handleOutputContent={setExportContent}
              />
            </Container>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <div className="d-flex flex-row gap-2 justify-content-end">
              <TemplateExportButtons content={exportContent} />
              <Button
                className="btn btn-danger"
                type="button"
                onClick={handleExitPreview}
              >
                Cancel
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default CVPreview;
