import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";

function ImportFiles({ onImportFiles }) {
  const [files, setFiles] = useState([]);

  const handleUpdatedFiles = (fileItems) => {
    setFiles(fileItems.map((fileItem) => fileItem.file));
  };

  useEffect(() => {
    onImportFiles(files);
  }, [files, onImportFiles]);

  return (
    <React.Fragment>
      <hr/>
      <Row>
        <Col>
          <FilePond
            files={files}
            onupdatefiles={handleUpdatedFiles}
            allowMultiple={true}
            name="files"
            className="filepond filepond-input-multiple"
          />
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default ImportFiles;
