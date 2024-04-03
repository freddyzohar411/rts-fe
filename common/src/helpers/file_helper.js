import { toast } from "react-toastify";

/**
 * Method to check file format is valid or not
 * @param {*} file - file object
 * @param {*} validFormats  - array of valid formats
 * @returns {boolean} - true if file format is valid, false otherwise
 */
const checkFileFormatValid = (file, validFormats) => {
  const fileFormat = file.name.split(".").pop();
  return validFormats.includes(fileFormat);
};

/**
 * Method to check file size limit
 * @param {*} file - file object
 * @param {*} sizeLimit - size limit in bytes
 * @returns
 */
const checkFileSizeLimit = (file, sizeLimit) => {
  return file.size <= sizeLimit;
};

/**
 * Convert JSON File to JSON Object
 */
const convertJSONFileToJSONObject = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };

    // Explicitly create a Blob object from the file
    const blob = new Blob([file], { type: "application/json" });
    reader.readAsText(blob);
  });
};

const checkFileWithMimeType = (file, mimeTypes, toastMessage = null) => {
  if (!mimeTypes.some((type) => file.type === type)) {
    if (toastMessage) {
      toast.error(toastMessage);
    }
    return false;
  }
  return true;
};

const displayFileSize = (size) => {
  if (size < 1000000) {
    return `${(size / 1000).toFixed(2)} KB`;
  }
  return `${(size / 1000000).toFixed(2)} MB`;
};

const getFilenameNoExtension = (file) => {
  return file.name.split(".").slice(0, -1).join(".");
};

const getFileExtension = (file) => {
  return file.name.split(".").pop();
};

function base64ToFile(base64String, filename) {
  // Basic mapping of extensions to MIME types
  const extensionToMimeTypeMap = {
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'pdf': 'application/pdf',
      // Add more mappings as needed
  };

  // Extract the file extension from the filename
  const extension = filename.split('.').pop().toLowerCase();

  // Attempt to get the MIME type from the mapping, defaulting to 'application/octet-stream'
  const mimeType = extensionToMimeTypeMap[extension] || 'application/octet-stream';

  // Decode the Base64 string to a binary string.
  const binaryString = window.atob(base64String);

  // Convert the binary string to a typed array.
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
  }

  // Create a Blob from the typed array.
  const blob = new Blob([bytes], { type: mimeType });

  // Convert the Blob into a File.
  const file = new File([blob], filename, { type: mimeType });

  return file;
}

function downloadBase64File(base64String, fileName) {
  const link = document.createElement("a");
  link.href = `data:application/octet-stream;base64,${base64String}`;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export {
  checkFileFormatValid,
  checkFileSizeLimit,
  convertJSONFileToJSONObject,
  checkFileWithMimeType,
  displayFileSize,
  getFilenameNoExtension,
  getFileExtension,
  base64ToFile,
  downloadBase64File
};
