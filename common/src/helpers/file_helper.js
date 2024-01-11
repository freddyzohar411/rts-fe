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

export {
  checkFileFormatValid,
  checkFileSizeLimit,
  convertJSONFileToJSONObject,
};
