import React, { useRef, useState, useEffect } from "react";
import "./PageSettingView.scss";
import ReactHtmlParser from "react-html-parser";
import * as ExportHelper from "../../../helpers/export_helper";

const PageSettingView = ({
  pageSize = "a4",
  margin = {
    top: 0.25,
    right: 0.25,
    bottom: 0.25,
    left: 0.25,
  },
  content,
}) => {
  const iframeRef = useRef(null);
  const [paginationInfo, setPaginationInfo] = useState({
    numberOfPages: 0,
    breakPoints: [],
  });
  const marginStyle = {
    paddingTop: `${margin.top * 96}px`,
    paddingRight: `${margin.right * 96}px`,
    paddingBottom: `${margin.bottom * 96}px`,
    paddingLeft: `${margin.left * 96}px`,
  };

  useEffect(() => {
    const fetchData = async () => {
      if (iframeRef.current) {
        const pdfBlob = await ExportHelper.convertHtmlToPdfBlob(content, {
          filename: "test.pdf",
        });
        // Assuming you have a Blob object named 'pdfBlob' representing your PDF data
        const blobUrl = URL.createObjectURL(pdfBlob);

        // Set the Blob URL as the source for the iframe
        iframeRef.current.src = blobUrl;
      }
    };

    fetchData();

    return () => {
      // Clean up the Blob URL when the component unmounts
      if (iframeRef.current) {
        URL.revokeObjectURL(iframeRef.current.src);
      }
    };
  }, [content]);

  return (
    <iframe ref={iframeRef} title="PDF Viewer" width="80%" height="620px" />
  );
};

export default PageSettingView;
