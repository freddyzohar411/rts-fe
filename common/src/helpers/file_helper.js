/**
 * Method to check file format is valid or not
 * @param {*} file - file object
 * @param {*} validFormats  - array of valid formats
 * @returns {boolean} - true if file format is valid, false otherwise
 */
const checkFileFormatValid = (file, validFormats) => {
    const fileFormat = file.name.split('.').pop();
    return validFormats.includes(fileFormat);
}

/**
 * Method to check file size limit
 * @param {*} file - file object
 * @param {*} sizeLimit - size limit in bytes 
 * @returns 
 */
const checkFileSizeLimit = (file, sizeLimit) => {
    return file.size <= sizeLimit;
}

export {
    checkFileFormatValid,
    checkFileSizeLimit
}