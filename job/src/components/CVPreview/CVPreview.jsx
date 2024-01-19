import React from "react";
import { Row, Col, Button } from "reactstrap";

function CVPreview({ onExitPreview }) {
  const handleExitPreview = () => {
    onExitPreview();
  };
  return (
    <React.Fragment>
      <div>
        <Row>
          <Col>
            <span className="display-6">CV Preview</span>
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
