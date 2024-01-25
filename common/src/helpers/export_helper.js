import generatePDF from "react-to-pdf";
import htmlDocx from "html-docx-js/dist/html-docx";
import FileSaver from "file-saver";
import React from "react";
import html2pdf from "html2pdf.js";
import * as TemplateDisplayHelper from "../Components/TemplateDisplay/templateDisplayHelper";

/*
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

const generatePDFMulti = async (element, type = "save", options) => {
  // Wait for images to load
  const images = element.getElementsByTagName("img");
  await Promise.all(
    Array.from(images).map(
      (img) =>
        new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        })
    )
  );

  const opt = {
    margin: [0.25, 0.25, 0.25, 0.25],
    filename: options.filename || "test.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 3, useCORS: true }, // Use CORS for images
    jsPDF: { unit: "in", format: "A4", orientation: "portrait" },
  };

  if (type === "save") {
    html2pdf().set(opt).from(element).save();
  }

  if (type === "file") {
    // Return a file
    // const blob = await html2pdf().set(opt).from(element).outputPdf();
    const blob = await html2pdf().set(opt).from(element).output("blob");
    const file = new File([blob], options.filename || "test.pdf", {
      type: "application/pdf",
    });

    return file; // Return the File object
  }
};

export function generatePDFCustomMulti(htmlString, options = {}) {
  const content = TemplateDisplayHelper.replacePageBreaks(htmlString);

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
  generatePDFMulti(targetRef.current, "save", options);

  // Last thing to do
  document.body.removeChild(outerDiv);
}

/**
 * Helper function to generate Word doc from HTML
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
 * Helper Function to generate Word docx from HTML
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
  // Replace page breaks with divs
  const htmlContentWithPageBreaks =
    TemplateDisplayHelper.replacePageBreaks2(htmlContent);
  console.log("htmlContentWithPageBreaks", htmlContentWithPageBreaks);
  const sourceHTML = header + htmlContentWithPageBreaks + footer;

  const buffer = htmlDocx.asBlob(sourceHTML);
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
  const filename = options.filename + ".docx";
  FileSaver.saveAs(blob, filename);
}

/**
 * Export HTML string to HTML file
 * @param {*} htmlString
 * @param {*} fileName
 */
export function generateHtml(htmlString, options = { filename: "index.html" }) {
  const htmlStringWithPageBreak =
    TemplateDisplayHelper.replacePageBreaks2(htmlString);

  // Create a Blob object with the HTML string
  const blob = new Blob([htmlStringWithPageBreak], { type: "text/html" });

  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create an anchor element to trigger the download
  const a = document.createElement("a");
  a.href = url;
  a.download = options?.filename + ".html";

  // Trigger a click event to download the file
  a.click();

  // Clean up by removing the anchor element and revoking the URL
  a.remove();
  URL.revokeObjectURL(url);
}

/**
 * Convert to PDF
 * @param {*} htmlString
 * @param {*} options
 * @returns
 */
export async function convertHtmlToPdfFile(htmlString, options = {}) {
  const content = TemplateDisplayHelper.replacePageBreaks(htmlString);
  console.log("content", content);

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
  const file = await generatePDFMulti(targetRef.current, "file", options);

  // Last thing to do
  document.body.removeChild(outerDiv);

  return file;
}

export function convertHtmlToDocxFile(
  htmlString,
  options = { filename: "index.html" }
) {
  const header =
    "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
    "xmlns:w='urn:schemas-microsoft-com:office:word' " +
    "xmlns='http://www.w3.org/TR/REC-html40'>" +
    "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
  const footer = "</body></html>";
  // Replace page breaks with divs
  const htmlContentWithPageBreaks =
    TemplateDisplayHelper.replacePageBreaks2(htmlString);
  console.log("htmlContentWithPageBreaks", htmlContentWithPageBreaks);
  const sourceHTML = header + htmlContentWithPageBreaks + footer;

  const buffer = htmlDocx.asBlob(sourceHTML);
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });

  const file = new File([blob], options.filename + ".docx", { 
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
  
  return file;
}
