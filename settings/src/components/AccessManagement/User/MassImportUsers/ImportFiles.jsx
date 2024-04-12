import React, { useEffect, useState } from "react";
import { Col, Row, Alert } from "reactstrap";
import { toast } from "react-toastify";
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";

function ImportFiles({ onImportFiles }) {
  const [files, setFiles] = useState([]);
  const [fileError, setFileError] = useState(false);

  const handleUpdatedFiles = (fileItems) => {
    // For each file, check if the file is a valid type
    const invalidFiles = fileItems.filter(
      (fileItem) => !isValidFileType(fileItem.file)
    );
    if (invalidFiles.length > 0) {
      setFileError(true);
      return;
    } else {
      setFileError(false);
      const validFiles = fileItems.filter((fileItem) =>
        isValidFileType(fileItem.file)
      );
      // setFiles(fileItems.map((fileItem) => fileItem.file));
      setFiles(validFiles.map((fileItem) => fileItem.file));
    }
  };

  const isValidFileType = (file) => {
    const acceptedFiles = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    return acceptedFiles.includes(file.type);
  };

  useEffect(() => {
    onImportFiles(files);
  }, [files, onImportFiles]);

  return (
    <React.Fragment>
      <hr />
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
      <Row>
        <Col>
        {fileError && (<Alert color="danger">Invalid file type. Please upload a CSV or Excel file.</Alert>)}
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default ImportFiles;
