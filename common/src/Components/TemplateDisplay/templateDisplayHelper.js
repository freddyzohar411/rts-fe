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

// /**
//  * Replace template placeholders {{xxx.yyy}} in html with templateData
//  * Within template data, if there is a variable placeholder ${xxx.yyy.zzz} then replace it with variableData
//  * @param {*} htmlString
//  * @param {*} templateData
//  * @returns
//  */
// export function replaceTemplate(htmlString, templateData, mappedVariableData) {
//   // find those with {{xxx.yyy}} not {{xxx.yyy:zzz}} and replace them with the content in templateData[xxx][yyy]
//   // return back the html that has been replaced with the data
//   const pattern = /{{([^:]*?)}}/g;
//   const matches = htmlString?.match(pattern) || [];
//   let result = htmlString;
//   matches.forEach((match) => {
//     const key = match.replace("{{", "").replace("}}", "");
//     const keys = key.split(".");
//     const value = templateData?.[keys[0]]?.[keys[1]] || "-";
//     // In this Value find ${xxx.yyy.zzz} and replace them with the content in variableData[xxx][yyy][zzz]
//     const valueMatches = value.match(/\${(.*?)}/g);
//     let replacedValue = value;
//     valueMatches?.forEach((match) => {
//       const key = match.replace("${", "").replace("}", "");
//       const keys = key.split(".");
//       const value = mappedVariableData?.[keys[0]]?.[keys[1]]?.[keys[2]] || "-";
//       replacedValue = replacedValue.replace(match, value);
//     });
//     result = result.replace(match, replacedValue);
//   });
//   return result;
// }

/**
 * Replace template placeholders {{xxx.yyy}} in html with templateData
 * Within template data, if there is a variable placeholder ${xxx.yyy.zzz} then replace it with variableData
 * @param {*} htmlString
 * @param {*} templateData
 * @returns
 */
export function replaceTemplate(htmlString, templateData, mappedVariableData) {
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
export function replaceTemplateArray(htmlString, templateData, variableData) {
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
    htmlString = htmlString.replace(elementRegex, elementWithoutStyle);
  }

  // Remove contenteditable attribute
  const withoutContentEditable = htmlString.replace(
    / contenteditable="true"| contenteditable="false"/g,
    ""
  );

  return withoutContentEditable;
}

// Private function helpers ===============================================

function extractStringLiteralsDoubleBracketsToList(htmlString) {
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
