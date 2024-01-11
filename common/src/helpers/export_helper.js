import generatePDF from "react-to-pdf";
import htmlDocx from "html-docx-js/dist/html-docx";
import FileSaver from 'file-saver';
import React from "react";

/**
 * Helper function to generate PDF from HTML
 * @param {*} content
 * @param {*} options
 */
export function generatePDFCustom(content, options = {}) {
  // Create a ref for the target element
  const targetRef = React.createRef();

  // Create the outer div with inline styles
  const outerDiv = document.createElement("div");
  outerDiv.style.opacity = "0";

  // Create the inner div
  const innerDiv = document.createElement("div");

  // Set the inner HTML using dangerouslySetInnerHTML
  innerDiv.innerHTML = content;

  // Append the inner div to the outer div
  outerDiv.appendChild(innerDiv);

  // Append the entire structure to the document body
  document.body.appendChild(outerDiv);

  // Set the targetRef to the innerDiv reference
  targetRef.current = innerDiv;

  // Generate PDF using the updated targetRef
  generatePDF(targetRef, options);

  // Last thing to do
  document.body.removeChild(outerDiv);
}

/**
 * Helper function to generate Word docx from HTML
 * @param {*} content
 * @param {*} options
 */
export function generateDocCustom(
  content,
  options = {
    filename: "document.doc",
  }
) {
  const header =
    "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
    "xmlns:w='urn:schemas-microsoft-com:office:word' " +
    "xmlns='http://www.w3.org/TR/REC-html40'>" +
    "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
  const footer = "</body></html>";
  const sourceHTML = header + content + footer;

  const source =
    "data:application/vnd.ms-word;charset=utf-8," +
    encodeURIComponent(sourceHTML);
  var fileDownload = document.createElement("a");
  document.body.appendChild(fileDownload);
  fileDownload.href = source;
  fileDownload.download = options.filename + ".doc";
  fileDownload.click();
  document.body.removeChild(fileDownload);
}

/**
 * Helper Function to generate Docx from PDF
 * @param {*} htmlContent
 * @param {*} options
 */
export function generateDocxCustom(
  htmlContent,
  options = { filename: "document" }
) {
  const header =
    "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
    "xmlns:w='urn:schemas-microsoft-com:office:word' " +
    "xmlns='http://www.w3.org/TR/REC-html40'>" +
    "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
  const footer = "</body></html>";
  const sourceHTML = header + htmlContent + footer;

  const buffer = htmlDocx.asBlob(sourceHTML);
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
  const filename = options.filename + ".docx";
  FileSaver.saveAs(blob, filename);
}


