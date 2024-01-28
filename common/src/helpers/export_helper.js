import generatePDF from "react-to-pdf";
import htmlDocx from "html-docx-js/dist/html-docx";
import FileSaver from "file-saver";
import React from "react";
import html2pdf from "html2pdf.js";
import * as TemplateDisplayHelper from "../Components/TemplateDisplay/templateDisplayHelper";
import axios from "axios";

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

  const {
    unit,
    pageType,
    pageOrientation,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    fileName: filename,
  } = options;

  const pageTypeMap = {
    a4: "A4",
    a3: "A3",
    letter: "letter",
  };

  const fileName = filename ? filename + ".pdf" : "test.pdf";

  const opt = {
    margin: [marginTop, marginRight, marginBottom, marginLeft],
    filename: fileName,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true }, // Use CORS for images
    jsPDF: {
      unit: unit,
      format: pageTypeMap[pageType],
      orientation: pageOrientation,
    },
  };

  if (type === "save") {
    html2pdf().set(opt).from(element).save();
  }

  if (type === "file") {
    const blob = await html2pdf().set(opt).from(element).output("blob");
    const file = new File([blob], fileName, {
      type: "application/pdf",
    });

    return file;
  }
  if (type === "blob") {
    const blob = await html2pdf().set(opt).from(element).output("blob");
    return blob;
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
  options = { fileName: "document" }
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

  // Marin conversion
  const convertToTwips = (value) => {
    if (!value) return null;
    if (options.unit === "in") {
      return Math.round(value * 1440);
    }
    if (options.unit === "mm") {
      return Math.round(value * 56.7);
    }
    if (options.unit === "cm") {
      return Math.round(value * 567);
    }
  };

  // Options
  const inputOptions = {
    orientation: options?.pageOrientation || "portrait",
    margins: {
      top: convertToTwips(options?.marginTop) || 1440,
      bottom: convertToTwips(options?.marginBottom) || 1440,
      left: convertToTwips(options?.marginLeft) || 1440,
      right: convertToTwips(options?.marginRight) || 1440,
    },
  };

  const buffer = htmlDocx.asBlob(sourceHTML, inputOptions);
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
  const filename = options.fileName + ".docx";
  FileSaver.saveAs(blob, filename);
}

/**
 * Export HTML string to HTML file
 * @param {*} htmlString
 * @param {*} fileName
 */
export function generateHtml(htmlString, options = { fileName: "index.html" }) {
  let htmlStringWithPageBreak =
    TemplateDisplayHelper.replacePageBreaks2(htmlString);

  const header = `<head>
  <style>
    @page {
      size: A4;
      margin: 0.1in;
    }
  </style>
</head>`;

  htmlStringWithPageBreak = header + htmlString;

  // Create a Blob object with the HTML string
  const blob = new Blob([htmlStringWithPageBreak], { type: "text/html" });

  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create an anchor element to trigger the download
  const a = document.createElement("a");
  a.href = url;
  a.download = options?.fileName + ".html";

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

// Convert html to pdf blob url
export async function convertHtmlToPdfBlob(htmlString, options = {}) {
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
  const blob = await generatePDFMulti(targetRef.current, "blob", options);

  // Last thing to do
  document.body.removeChild(outerDiv);

  return blob;
}

// ================== Backend Export ===================
function createStyleTag(options) {
  const {
    unit,
    pageType,
    pageOrientation,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
  } = options;

  return `
      <style>
          @page {
              size: ${pageType} ${pageOrientation};
              margin: ${marginTop}${unit} ${marginRight}${unit} ${marginBottom}${unit} ${marginLeft}${unit};
          }
      </style>
  `;
}

export async function exportBackendHtml2Pdf(htmlString, options = {}) {
  let content = TemplateDisplayHelper.replacePageBreaks(htmlString);
  content =
    TemplateDisplayHelper.convertInlineWidthAndHeightToAttributes(content);

  const styleTag = createStyleTag(options);

  const html = `
      <html>
          <head>
              ${styleTag}
          </head>
          <body>
              ${content}
          </body>
      </html>
  `;

  console.log("html", html);

  let fileName = options?.fileName || "document.pdf";

  const response = await axios
    .post(
      "http://localhost:8181/api/document-conversion/convert/htmlString-to-pdf",
      { htmlString: html }
    )
    .then((res) => {
      console.log(res);
      // Byte array to download as pdf
      const pdfBase64 = res.data;

      // Convert base64 to binary
      const binaryString = window.atob(pdfBase64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: "application/pdf" });
      console.log("blob", blob);
      FileSaver.saveAs(blob, fileName);
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function exportBackendHtml2PdfBlob(htmlString, options = {}) {
  let content = TemplateDisplayHelper.replacePageBreaks(htmlString);
  content =
    TemplateDisplayHelper.convertInlineWidthAndHeightToAttributes(content);

  const styleTag = createStyleTag(options);

  const html = `
      <html>
          <head>
              ${styleTag}
          </head>
          <body>
              ${content}
          </body>
      </html>
  `;

  let fileName = options?.fileName || "document.pdf";

  try {
    const response = await axios.post(
      "http://localhost:8181/api/document-conversion/convert/htmlString-to-pdf",
      { htmlString: html }
    );
    const pdfBase64 = response.data;
    // Convert base64 to binary
    const binaryString = window.atob(pdfBase64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: "application/pdf" });
    return blob;
  } catch (error) {
    console.log(error);
  }
}

export async function exportBackendHtml2PdfFile(htmlString, options = {}) {
  let content = TemplateDisplayHelper.replacePageBreaks(htmlString);
  content =
    TemplateDisplayHelper.convertInlineWidthAndHeightToAttributes(content);

  const styleTag = createStyleTag(options);

  const html = `
      <html>
          <head>
              ${styleTag}
          </head>
          <body>
              ${content}
          </body>
      </html>
  `;

  let fileName = options?.fileName + ".pdf" || "document.pdf";

  try {
    const response = await axios.post(
      "http://localhost:8181/api/document-conversion/convert/htmlString-to-pdf",
      { htmlString: html }
    );
    const pdfBase64 = response.data;
    // Convert base64 to binary
    const binaryString = window.atob(pdfBase64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: "application/pdf" });
    const file = new File([blob], fileName, {
      type: "application/pdf",
    });

    return file;
  } catch (error) {
    console.log(error);
  }
}

export async function exportBackendHtml2Docx(htmlString, options = {}) {
  let content = TemplateDisplayHelper.replacePageBreaks(htmlString);
  content =
    TemplateDisplayHelper.convertInlineWidthAndHeightToAttributes(content);

  const styleTag = createStyleTag(options);

  const html = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
      <head>
      <meta charset='utf-8'>
              ${styleTag}
          </head>
          <body>
              ${content}
          </body>
      </html>
  `;

  let fileName = options?.fileName + ".docx" || "document.docx";

  const response = await axios
    .post(
      "http://localhost:8181/api/document-conversion/convert/htmlString-to-docx",
      { htmlString: html }
    )
    .then((res) => {
      console.log(res);
      // Byte array to download as pdf
      // const byteArray = res.data.pdfOutputStream;
      const pdfBase64 = res.data;

      // Convert base64 to binary
      const binaryString = window.atob(pdfBase64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      console.log("blob", blob);
      FileSaver.saveAs(blob, fileName);
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function exportBackendHtml2DocxFile(htmlString, options = {}) {
  let content = TemplateDisplayHelper.replacePageBreaks(htmlString);
  content =
    TemplateDisplayHelper.convertInlineWidthAndHeightToAttributes(content);

  const styleTag = createStyleTag(options);

  const html = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
      <head>
      <meta charset='utf-8'>
              ${styleTag}
          </head>
          <body>
              ${content}
          </body>
      </html>
  `;

  let fileName = options?.fileName || "document";

  try {
    const response = await axios.post(
      "http://localhost:8181/api/document-conversion/convert/htmlString-to-docx",
      { htmlString: html }
    );
    const pdfBase64 = response.data;
    // Convert base64 to binary
    const binaryString = window.atob(pdfBase64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    const file = new File([blob], fileName + ".docx", {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    return file;
  } catch (error) {
    console.log(error);
  }
}
