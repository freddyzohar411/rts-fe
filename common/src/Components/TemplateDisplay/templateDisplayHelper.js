import axios from "axios";
import { getTemplateFromCategoryAndName } from "./url_helper";
import { parse, HTMLElement } from "node-html-parser";

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
  var replacedString = htmlString.replace(
    /<!--\s*pagebreak\s*-->/gi,
    '<div style="break-after: page;"></div>'
  );

  return replacedString;
}

export function replacePageBreaks2(htmlString) {
  // Use a global regular expression to find and replace all occurrences
  var replacedString = htmlString.replace(
    /<!--\s*pagebreak\s*-->/gi,
    '<div style="page-break-after: always;"></div>'
  );

  return replacedString;
}

export function convertStyleToAttributesTable(htmlString) {
  let replacedString = convertInlineWidthAndHeightToAttributes(htmlString);
  return convertAlignmentToAttributesTable(replacedString);
}

export function convertInlineStylesToClasses(htmlString) {
  console.log("Before Convert Inline Styles To Classes: ", htmlString);
  let rootTemp = wrapTextWithIns(htmlString);
  console.log("After Convert Inline Styles To Classes: ", rootTemp);
  rootTemp = convertKeywordsToPt(rootTemp);
  const root = parse(rootTemp);
  const styles = {};
  let styleId = 0;

  const processNode = (node) => {
    if (node.nodeType === 1) {
      // Element node
      // Remove 'align' from <p> tags
      if (node.tagName === "P" && node.hasAttribute("align")) {
        node.removeAttribute("align");
      }

      let style = node.getAttribute("style") || "";
      let additionalStyle = "";

      // Combine original and additional styles
      style = additionalStyle + style;

      // Check if the combined style already exists
      let className = styles[style] || `style-${styleId}`;
      if (!styles[style]) {
        styles[style] = className;
        styleId++;
      }

      // Apply the class name and remove the style attribute
      node.setAttribute("class", className);
      node.removeAttribute("style");

      // Recursively process child nodes
      Array.from(node.childNodes).forEach((child) => processNode(child));
    }
  };

  // Start processing from the root
  processNode(root);

  // Generate the CSS string
  const styleString = Object.entries(styles)
    .map(([key, value]) => `.${value} { ${key} }`)
    .join("\n");

  // Return the new HTML and style tag
  return {
    html: root.toString(),
    styleTag: styleString,
  };
}


// ============================== Helper Function ===============================
function wrapTextWithIns(htmlString) {
  let el = "ins";
  const root = parse(htmlString);

  let keywordMapping = {
    small: 10, 
    medium: 12,
    large: 16,
    // Add more keywords and their corresponding sizes here
  };

  function convertPercentageToPt(fontSize, parentFontSize) {
    const percentage = parseFloat(fontSize);
    const ptSize = (percentage / 100) * 12; 
    return `${ptSize}pt`;
  }

  function convertKeywordToPt(keyword, referenceFontSize = "12pt") {
    const fontSizeInPt = keywordMapping[keyword.toLowerCase()] || 12;
    return `${fontSizeInPt}pt`;
  }

  function findFontSize(node, inheritedFontSize = "12pt") {
    while (node && node !== root) {
      const style = node.attributes && node.attributes.style;
      let fontSize = style ? style.match(/font-size:\s*([^;]+);?/i)?.[1] : null;
      if (fontSize) {
        if (fontSize.endsWith("%")) {
          fontSize = convertPercentageToPt(fontSize, inheritedFontSize);
        } else if (fontSize.toLowerCase() in keywordMapping) {
          fontSize = convertKeywordToPt(fontSize.toLowerCase(), inheritedFontSize);
        }
        return fontSize;
      }
      node = node.parentNode;
    }
    return inheritedFontSize;
  }

  function checkParentStyle(node) {
    let fontStyle = "";
    let fontFamily = "";
    while (node && node !== root) {
      if (node.tagName === "EM") {
        fontStyle += "font-style: italic; ";
      } else if (node.tagName === "STRONG") {
        fontStyle += "font-weight: bold; ";
      } else if (node.tagName === "U") {
        fontStyle += "text-decoration: underline; ";
      } else if (node.tagName === "S") {
        fontStyle += "text-decoration: line-through; ";
      } else if (node.tagName === "SUB") {
        fontStyle += "vertical-align: sub; ";
      } else if (node.tagName === "SUP") {
        fontStyle += "vertical-align: super; ";
      }

      const style = node.attributes && node.attributes.style;
      let fontWeight = style ? style.match(/font-weight:\s*([^;]+);?/i)?.[1] : null;
      if (fontWeight) {
        fontStyle += `font-weight: ${fontWeight}; `;
      }

      // Check for font color in style
      let fontColor = style ? style.match(/color:\s*([^;]+);?/i)?.[1] : null;
      if (fontColor) {
        fontStyle += `color: ${fontColor}; `;
      }

      // Check for font family in style
      let foundFontFamily = style ? style.match(/font-family:\s*([^;]+);?/i)?.[1] : null;
      if (foundFontFamily) {
        fontFamily = `font-family: ${foundFontFamily}; `;
      }

      node = node.parentNode;
    }
    return fontStyle + fontFamily;
  }

  function recursiveTraverse(node, inheritedFontSize) {
    if (node instanceof HTMLElement) {
      node.childNodes.forEach((child, index) => {
        if (child.nodeType === 3 && child.text.trim() !== "") {
          if (
            node.tagName !== "P" &&
            !/^H[1-6]$/i.test(node.tagName) &&
            !/^(TABLE|TR|TD|TH|THEAD|TBODY|TFOOT|COL|COLGROUP)$/i.test(node.tagName)
          ) {
            const ins = new HTMLElement(el, {}, "", node);
            ins.set_content(child.text);

            let style = "";
            const fontSize = findFontSize(node, inheritedFontSize);
            if (fontSize) {
              style += `font-size: ${fontSize};`;
            }

            const parentStyle = checkParentStyle(node);
            if (parentStyle) {
              style += parentStyle;
            }

            if (style) {
              ins.setAttribute("style", style);
            }
            node.childNodes[index] = ins;
          }
        } else if (child instanceof HTMLElement) {
          const childFontSize = findFontSize(child, inheritedFontSize);
          recursiveTraverse(child, childFontSize);
        }
      });
    }
  }

  recursiveTraverse(root, "12pt"); 
  return root.toString();
}

function convertKeywordsToPt(htmlString) {
  const root = parse(htmlString);

  function convertKeywordToPt(keyword) {
    const keywordMapping = {
      small: 10, // You can adjust this mapping as needed
      medium: 12,
      large: 16,
      // Add more keywords and their corresponding sizes here
    };
    return `${keywordMapping[keyword.toLowerCase()]}pt` || keyword;
  }

  function recursiveTraverse(node) {
    if (node instanceof HTMLElement) {
      const style = node.attributes && node.attributes.style;
      if (style) {
        let modifiedStyle = style.replace(
          /font-size:\s*(small|medium|large);?/gi,
          (match, p1) => {
            return `font-size: ${convertKeywordToPt(p1)};`;
          }
        );
        node.setAttribute("style", modifiedStyle);
      }
      node.childNodes.forEach((child) => {
        recursiveTraverse(child);
      });
    }
  }

  recursiveTraverse(root);
  return root.toString();
}

//   const root = parse(htmlString);

//   function findFontWeight(node) {
//       while (node && node !== root) {
//           const style = node.attributes && node.attributes.style;
//           const fontWeight = style ? style.match(/font-weight:\s*([^;]+);?/i)?.[1] : null;
//           if (fontWeight) {
//               return fontWeight;
//           }
//           node = node.parentNode;
//       }
//       return null; // No font weight found up the tree
//   }

//   function recursiveApplyFontWeight(node) {
//       if (node instanceof HTMLElement) {
//           const fontWeight = findFontWeight(node);
//           if (fontWeight) {
//               node.setAttribute('style', `font-weight: ${fontWeight};`);
//           }
//           node.childNodes.forEach((child) => {
//               recursiveApplyFontWeight(child);
//           });
//       }
//   }

//   recursiveApplyFontWeight(root);
//   return root.toString();
// }

// Private function helpers ===============================================
function convertInlineWidthAndHeightToAttributes(htmlString) {
  return htmlString.replace(
    /<(table|tr|td|th)\s+([^>]*)style="([^"]*)"/gi,
    function (match, tag, otherAttributes, style) {
      let newAttributes = otherAttributes;

      let widthMatch = /width:\s*([\d.%]+);?/.exec(style);
      if (widthMatch) {
        newAttributes += ` width="${widthMatch[1]}"`;
      }

      let heightMatch = /height:\s*([\d.%]+);?/.exec(style);
      if (heightMatch) {
        newAttributes += ` height="${heightMatch[1]}"`;
      }

      return `<${tag} ${newAttributes} style="${style}"`;
    }
  );
}

function convertAlignmentToAttributesTable(htmlString) {
  return htmlString.replace(
    /<table([^>]*)style="([^"]*)"/gi,
    function (match, preStyle, style) {
      let align = "";
      if (
        style.includes("margin-left: auto") &&
        style.includes("margin-right: auto")
      ) {
        align = 'align="center"';
      } else if (
        style.includes("margin-left: 0") &&
        style.includes("margin-right: auto")
      ) {
        align = 'align="left"';
      } else if (
        style.includes("margin-left: auto") &&
        style.includes("margin-right: 0")
      ) {
        align = 'align="right"';
      }

      return `<table${preStyle}style="${style}" ${align}`;
    }
  );
}

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
