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
    if (opt.sort === true) {
      searchFields.push(opt.sortValue);
    }
  });
  return searchFields;
}

function getDynamicNestedResult(data, value) {
  const result = value.split(".").reduce((acc, part) => {
    return acc ? acc[part] : undefined;
  }, data);
  return result;
}

function generateConfig(selectedOptGroup, customRender = []) {
  const config = [];
  selectedOptGroup.forEach((opt) => {
    let renderMethod = null;
    if (customRender.length > 0) {
      renderMethod =
        customRender.find((item) => {
          return item.names.includes(opt.value);
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
    });
  });
  return config;
}

export {
  cleanPageRequest,
  generateSeachFieldArray,
  generateConfig,
  getDynamicNestedResult,
};
