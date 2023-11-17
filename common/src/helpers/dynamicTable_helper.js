import { formatDateStandard } from "./date_helper";
import { Badge } from "reactstrap";

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
    let render = null;
    if (customRender.length > 0) {
      console.log("OPT Value", opt.value)
      render = customRender.find((item) => item.names.includes(opt.value))?.render || null;
    }

    config.push({
      header: opt.label,
      name: opt.value,
      sort: opt.sort,
      sortValue: opt.sortValue,
      render: (data) => {
            // if (opt.value === "createdAt" || opt.value === "updatedAt") {
            //   return formatDateStandard(
            //     getDynamicNestedResult(data, opt.value) || "-"
            //   );
            // }
            // if (opt.label?.toLowerCase().includes("status")) {
            //   return (
            //     <Badge
            //       color={
            //         getDynamicNestedResult(data, opt.value)?.toLowerCase() ===
            //         "active"
            //           ? "success"
            //           : "warning"
            //       }
            //       className="text-uppercase"
            //     >
            //       {getDynamicNestedResult(data, opt.value) || "-"}
            //     </Badge>
            //   );
            // }
            if (render) {
              return render(data, opt);
            }
            return getDynamicNestedResult(data, opt.value) || "-";
          },
    });
  });
  return config;
}

export { cleanPageRequest, generateSeachFieldArray, generateConfig, getDynamicNestedResult };
