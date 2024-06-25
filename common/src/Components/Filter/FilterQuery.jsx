import React from "react";
import { conditionObject } from "./filterConstant";

const FilterQuery = ({ filters }) => {
  function buildFilterString(filters) {
    if (!filters || filters.length === 0) return "";

    let currentGroup = "";

    for (let i = 0; i < filters.length; i++) {
      const filter = filters[i];
      const conditionString = ` ${
        filter?.label ? `'${filter?.label}'` : ""
      } <span class="fw-semibold">${getConditionOperator(
        filter?.condition
      )}</span> ${filter?.value ? `'<span>${filter?.value}</span>'` : ""}`;

      if (i === 0) {
        currentGroup = conditionString;
      } else {
        currentGroup = `<span class="fw-bold">(</span>${currentGroup} <span class="fw-semibold">${filters[i].operator}</span> ${conditionString}<span class="fw-bold">)</span>`;
      }
    }

    return `<span class="fw-bold">Query</span> = ${currentGroup}`;
  }

  function getConditionOperator(condition) {
    switch (condition) {
      case conditionObject.CONTAINS:
        return "CONTAINS";
      case conditionObject.DOES_NOT_CONTAIN:
        return "DOES NOT CONTAINS";
      case conditionObject.EQUAL:
        return "=";
      case conditionObject.NOT_EQUAL:
        return "!=";
      case conditionObject.IS_EMPTY:
        return "IS EMPTY";
      case conditionObject.IS_NOT_EMPTY:
        return "IS NOT EMPTY";
      case conditionObject.IS_NULL:
        return "IS NULL";
      case conditionObject.IS_NOT_NULL:
        return "IS NOT NULL";
      case conditionObject.GREATER_THAN:
        return ">";
      case conditionObject.GREATER_THAN_OR_EQUAL:
        return ">=";
      case conditionObject.LESS_THAN:
        return "<";
      case conditionObject.LESS_THAN_OR_EQUAL:
        return "<=";
      case conditionObject.ON:
        return "=";
      case conditionObject.BEFORE:
        return "<";
      case conditionObject.BEFORE_OR_EQUAL:
        return "<=";
      case conditionObject.AFTER:
        return ">";
      case conditionObject.AFTER_OR_EQUAL:
        return ">=";
      case conditionObject.IN:
        return "IN";
      case conditionObject.NOT_IN:
        return "NOT IN";
      case conditionObject.STARTS_WITH:
        return "STARTS WITH";
      case conditionObject.ENDS_WITH:
        return "ENDS WITH";
      case conditionObject.IS_TRUE:
        return "IS TRUE";
      case conditionObject.IS_FALSE:
        return "IS FALSE";
      default:
        return "";
    }
  }
  // Display dangerous HTML
  return (
    <div dangerouslySetInnerHTML={{ __html: buildFilterString(filters) }} />
  );
};

export default FilterQuery;
