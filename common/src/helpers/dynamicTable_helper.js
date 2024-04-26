import { toast } from "react-toastify";
import * as XLSX from 'xlsx';
import * as FileHelper from "./file_helper";

function cleanPageRequest(pageRequest) {
  const cleanPage = { ...pageRequest };
  Object.keys(cleanPage).forEach((key) => {
    if (cleanPage[key] === null) {
      delete cleanPage[key];
    }
  });
  return cleanPage;
}

function generateSeachFieldArray(selectedOptGroup) {
  const searchFields = [];
  selectedOptGroup.forEach((opt) => {
    if (!opt?.value) {
      // Move to next loop if value is not present
      return;
    }
    if (opt.sort === true) {
      searchFields.push(opt.sortValue);
    }
  });
  return searchFields;
}

function getDynamicNestedResult(data, value) {
  const result = value?.split(".").reduce((acc, part) => {
    return acc ? acc[part] : undefined;
  }, data);
  return result;
}

function generateConfig(selectedOptGroup, customRender = []) {
  const config = [];
  selectedOptGroup.forEach((opt) => {
    if (!opt?.value) {
      // Move to next loop if value is not present
      return;
    }
    let renderMethod = null;
    if (customRender.length > 0) {
      renderMethod =
        customRender?.find((item) => {
          return item?.names?.includes(opt.value);
        })?.render || null;
    }

    config.push({
      header: opt.label,
      name: opt.value,
      sort: opt.sort,
      sortValue: opt.sortValue,
      render: (data) => {
        if (renderMethod) {
          return renderMethod(data, opt);
        }
        return getDynamicNestedResult(data, opt.value) || "-";
      },
      expand: opt?.expand || false,
    });
  });
  return config;
}

// Export data
function getDynamicNestedResultForExport(data, value) {
  const result = value?.split(".").reduce((acc, part) => {
    const value = acc ? acc[part] : "";
    if (value === null || value === undefined) {
      return "";
    }
    return value;
  }, data);
  return result;
}

function convertConfigDataToObject(
  configData,
  allData,
  customRenderList,
  addIndexing = false
) {
  const exportData = allData.map((data) => {
    return configData.reduce((acc, curr) => {
      let renderMethod = null;

      if (customRenderList.length > 0) {
        renderMethod =
          customRenderList.find((item) => {
            return item.names.includes(curr?.name);
          })?.render || null;
      }

      if (renderMethod) {
        acc[curr?.header] = renderMethod(data, curr);
        return acc;
      }

      acc[curr?.header] = getDynamicNestedResultForExport(data, curr?.name);
      return acc;
    }, {});
  });
  if (addIndexing) {
    exportData.forEach((data, index) => {
      exportData[index] = { "#": index + 1, ...data };
    });
  }
  return exportData;
}


function handleExportExcel(
  filename,
  data,
  config,
  customRenderList,
  addIndexing = false
) {
  if (!data || data.length === 0) {
    toast.error("No data to export");
    return;
  }
  if (config.length === 0) {
    toast.error("No fields to export");
    return;
  }

  const exportData = convertConfigDataToObject(
    config,
    data,
    customRenderList,
    addIndexing
  );

  if (exportData.length === 0) {
    toast.error("No data to export");
    return;
  }

  FileHelper.exportToExcel(exportData, filename);
};

export {
  cleanPageRequest,
  generateSeachFieldArray,
  generateConfig,
  getDynamicNestedResult,
  handleExportExcel,
  getDynamicNestedResultForExport
};
