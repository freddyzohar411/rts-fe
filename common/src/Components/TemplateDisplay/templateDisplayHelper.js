import axios from "axios";
import { getTemplateFromCategoryAndName } from "./url_helper";

/**
 * Replace variables placeholders( ${xxx.yyy.zzz} in html with variabledata
 * @param {*} html
 * @param {*} variableData
 * @returns
 */
export function replaceVariables(html, variableData) {
  return html?.replace(/\${(.*?)}/g, (match, variableName) => {
    const keys = variableName.split(".");
    let value = variableData;
    for (let key of keys) {
      value = value?.[key];
      if (value === undefined) {
        value = "-";
        break;
      }
    }
    return value;
  });
}

/**
 * Replace template placeholders {{xxx.yyy}} in html with templateData
 * Within template data, if there is a variable placeholder ${xxx.yyy.zzz} then replace it with variableData
 * @param {*} htmlString
 * @param {*} templateData
 * @returns
 */
export async function replaceTemplate(htmlString, mappedVariableData) {
  if (!htmlString) return;
  const templateData = await getTemplateData(htmlString);
  const pattern = /{{([^:]*?)}}/g;
  const matches = htmlString?.match(pattern) || [];
  let result = htmlString;
  matches.forEach((match) => {
    const key = match.replace("{{", "").replace("}}", "");
    const keys = key.split(".");
    const value = templateData?.[keys[0]]?.[keys[1]] || "-";
    const replacedValue = replaceVariables(value, mappedVariableData);
    result = result.replace(match, replacedValue);
  });
  return result;
}

/**
 * Replace template placeholders {{xxx.yyy:zzz}} in html with templateData
 * Get zzz array data from variableData and generate html for each item in the array (loop)
 * Within each html, if there is a variable placeholder ${xxx.yyy.zzz} then replace it with variableData
 * @param {*} htmlString
 * @param {*} templateData
 * @param {*} variableData
 * @returns
 */
export async function replaceTemplateArray(htmlString, variableData) {
  if (!htmlString) return;
  const templateData = await getTemplateData(htmlString);
  const pattern = /{{(.*?):(.*?)}}/g;
  const matches = htmlString?.match(pattern) || [];
  let result = htmlString;
  matches.forEach((match) => {
    const key = match.replace("{{", "").replace("}}", "");
    const keys = key.split(":");
    const templateLiteral = keys[0];
    const variableLiteral = keys[1];

    // Get content
    const templateLiteralSplit = templateLiteral.split(".");
    const templateContent =
      templateData?.[templateLiteralSplit[0]]?.[templateLiteralSplit[1]] || "-";

    // Get array from variable data
    const variableLiteralSplit = variableLiteral.split(".");
    const variableContent =
      variableData?.[variableLiteralSplit[0]]?.[variableLiteralSplit[1]] || [];

    // Loop through array and replace
    let value = "";
    variableContent.forEach((item) => {
      value += replaceVariablesArray(templateContent, item);
    });
    result = result.replace(match, value);
  });
  return result;
}

/**
 * Get all the templates to render from the html string ({{xxx.yyy}} and {{xxx.yyy:zzz}})
 * @param {*} htmlString
 * @returns
 */
export function getAllTemplatesToRenderFromHTML(htmlString) {
  return getTemplateListCriteriaByCategoryAndNameToList(
    extractStringLiteralsDoubleBracketsToList(htmlString)
  );
}

/**
 * Remove contenteditable attribute and style attribute from html string for output
 * @param {*} htmlString
 * @returns
 */
export function removeContentEditableAndStyles(htmlString) {
  if (!htmlString) return;
  // Identify elements with contenteditable attribute
  const contentEditableRegex =
    /<([a-z][a-z0-9]*)([^>]*contenteditable="[^"]*"[^>]*)>/gi;
  let match;
  if (!htmlString) return;
  while ((match = contentEditableRegex.exec(htmlString)) !== null) {
    // For each matched element, remove the style attribute
    const styleRegex = new RegExp(` style="[^"]*"`, "g");
    const elementWithoutStyle = match[0].replace(styleRegex, "");
    // Replace the original element with the element without style in the HTML string
    const elementRegex = new RegExp(
      match[0].replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      "g"
    );
    htmlString = htmlString?.replace(elementRegex, elementWithoutStyle);
  }

  // Remove contenteditable attribute
  const withoutContentEditable = htmlString?.replace(
    / contenteditable="true"| contenteditable="false"/g,
    ""
  );

  return withoutContentEditable;
}

/**
 * Make a call to get the template data from the server
 * @param {*} htmlString
 * @returns
 */
export function getTemplateData(htmlString) {
  if (!htmlString) return;
  return new Promise((resolve, reject) => {
    const templateCriteriaList = getAllTemplatesToRenderFromHTML(htmlString);
    if (templateCriteriaList.length > 0) {
      const templateData = {};
      axios
        .post(getTemplateFromCategoryAndName(), templateCriteriaList)
        .then((res) => {
          const { data } = res;
          const mappedData = {};
          data.forEach((item) => {
            mappedData[item.category] = {
              ...mappedData[item.category],
              [item.name]: item.content,
            };
          });
          resolve(mappedData);
        })
        .catch((err) => {
          reject([]);
        });
    } else {
      resolve([]);
    }
  });
}

/**
 * Recursive function to run all the effects to process the content
 * @param {*} htmlString
 * @param {*} currentContent
 * @param {*} mappedVariableData
 * @param {*} recursive
 * @returns
 */
export async function runEffects(
  htmlString,
  currentContent = null,
  mappedVariableData,
  recursive
) {
  if (!htmlString) {
    return currentContent;
  }

  const templateListCriteria = getAllTemplatesToRenderFromHTML(htmlString);

  // Effect 1: Replace variables with mappedVariableData
  let updatedContent = htmlString;
  if (mappedVariableData) {
    updatedContent = replaceVariables(htmlString, mappedVariableData);
  }

  if (templateListCriteria.length > 0) {
    // Effect 2: Replace templateListCriteria without data
    updatedContent = await replaceTemplate(updatedContent, mappedVariableData);

    // Effect 3: Replace templateListCriteria with data
    if (mappedVariableData) {
      updatedContent = await replaceTemplateArray(
        updatedContent,
        mappedVariableData
      );
    }
  }

  // Check if the content has been updated and if recursive is true
  if (currentContent !== updatedContent && recursive) {
    // Recursive call for nested templates
    const nestedTemplates = getAllTemplatesToRenderFromHTML(updatedContent);
    if (nestedTemplates.length > 0) {
      // Pass the updatedContent as an argument for the recursive call
      return runEffects(
        updatedContent,
        updatedContent,
        mappedVariableData,
        recursive
      );
    }
  }

  return updatedContent;
}

/**
 * Replace page breaks in html string with page break divs
 * @param {*} htmlString 
 * @returns 
 */
export function replacePageBreaks(htmlString) {
  // Use a global regular expression to find and replace all occurrences
  // var replacedString = htmlString.replace(/<p><!--\s*pagebreak\s*--><\/p>/gi, '<div style="break-after: page;"></div>');
  var replacedString = htmlString.replace(/<!--\s*pagebreak\s*-->/gi, '<div style="break-after: page;"></div>');

  return replacedString;
}

export function replacePageBreaks2(htmlString) {
  // Use a global regular expression to find and replace all occurrences
  var replacedString = htmlString.replace(/<!--\s*pagebreak\s*-->/gi, '<div style="page-break-after: always;"></div>');

  return replacedString;
}
// Private function helpers ===============================================

function extractStringLiteralsDoubleBracketsToList(htmlString) {
  if (!htmlString) return;
  var pattern = /{{(.*?)(?:\..*?)?}}/g;
  var matches = htmlString.match(pattern) || [];

  // Remove the {{ and }} from the matches
  var result = matches.map(function (match) {
    return match.replace("{{", "").replace("}}", "");
  });

  // Filter out null values (cases where the regex didn't match)
  result = result.filter(Boolean);

  return result;
}

function getTemplateListCriteriaByCategoryAndNameToList(extractedList) {
  if (!extractedList) return;
  // Split by :
  const splitList = extractedList
    .map((item) => {
      if (item.includes(":")) {
        return item.split(":")[0];
      } else {
        return item;
      }
    })
    .map((item) => ({
      category: item.split(".")[0],
      name: item.split(".")[1],
    }));
  return splitList;
}

function replaceVariablesArray(htmlString, variableData) {
  if (!htmlString) return;
  let replacedTemplateContent = htmlString;
  const templateContentMatches = replacedTemplateContent.match(/\${(.*?)}/g);
  templateContentMatches?.forEach((match) => {
    const key = match.replace("${", "").replace("}", "");
    const keys = key.split(".");
    const value = variableData?.[keys[2]] || "-";
    replacedTemplateContent = replacedTemplateContent.replace(match, value);
  });
  return replacedTemplateContent;
}
