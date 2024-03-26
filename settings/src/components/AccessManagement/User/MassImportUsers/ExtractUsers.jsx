import React, { useEffect, useState } from "react";
import { Input } from "reactstrap";
import * as XLSX from "xlsx";

function ExtractUsers({ selectedFiles, onExtractedUserData }) {
  const [extractedUserData, setExtractedUserData] = useState({});

  const handleFileChange = (e) => {
    const files = e.target.files;
    const promises = Array.from(files).map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const data = event.target.result;
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);
          resolve({ [file.name]: json });
        };
        reader.readAsBinaryString(file);
      });
    });

    Promise.all(promises).then((results) => {
      const newData = results.reduce((acc, result) => {
        return { ...acc, ...result };
      }, {});
      setExtractedUserData(newData);
      onExtractedUserData(newData);
    });
  };

  useEffect(() => {
    if (selectedFiles && selectedFiles.length > 0) {
      handleFileChange({ target: { files: selectedFiles } });
    }
  }, [selectedFiles]);

  return (
    <Input
      hidden
      type="file"
      accept=".xls, .xlsx"
      onChange={handleFileChange}
      multiple
    />
  );
}

export default ExtractUsers;
