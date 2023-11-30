/**
 * Set table API method
 * @param {*} form
 * @param {*} tableName
 * @param {*} getAPI
 * @param {*} deleteAPI
 * @returns
 */
export const setTableAPI = (form, tableName, getAPI, deleteAPI) => {
  const newForm = JSON.parse(JSON.stringify(form));
  newForm.formSchema.forEach((field) => {
    if (field.type === "table" && field.name === tableName) {
      field.tableSetting.tableGetAPI = getAPI;
      field.tableSetting.tableDeleteAPI = deleteAPI;
    }
  });
  return newForm;
};
