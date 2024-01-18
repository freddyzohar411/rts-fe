import React, { useState} from "react";
import { Row, Col, Button, Container } from "reactstrap";
import { TemplateDisplayV3, UseTemplateModuleDataHook } from "@workspace/common";
import { TemplateHelper } from "@workspace/common";

function CVPreview({ onExitPreview, templateData, candidateId }) {
  // const [templateData, setTemplateData] = useState(null);
  const { allModuleData } = UseTemplateModuleDataHook.useTemplateModuleData({
    candidateId: candidateId,
  });

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
              />
            </Container>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="d-flex flex-row gap-2 justify-content-end">
              <Button
                className="btn btn-custom-primary"
                type="submit"
                onClick={handleExitPreview}
              >
                Save
              </Button>
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
