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
    '<div style="page-break-before: always;"></div>'
  );

  return replacedString;
}

export function replacePageBreakPlaceHolder(htmlString) {
  // Use a global regular expression to find and replace all occurrences
  var replacedString = htmlString.replace(
    /<!--\s*pagebreak\s*-->/gi,
    '<p style="page-break-before: always;"></p>'
  );

  return replacedString;
}

export function convertStyleToAttributesTable(htmlString) {
  let replacedString = convertInlineWidthAndHeightToAttributes(htmlString);
  return convertAlignmentToAttributesTable(replacedString);
}

export function convertInlineStylesToClasses(htmlString) {
  let rootTemp = replacePageBreakPlaceHolder(htmlString);
  // Add attributes to the td if there is a style with vertical align
  rootTemp = convertVerticalAlignToValignAttributes(rootTemp);
  // Wrap img with div to center the image
  rootTemp = wrapCenteredImages(rootTemp);
  rootTemp = wrapTextWithIns(rootTemp);
  rootTemp = convertPaddingToMarginAndMerge(rootTemp); // New (14022024)
  console.log("ROOT TEMP: ", rootTemp);
  rootTemp = replacePWithInsInLi(rootTemp);
  rootTemp = replacePWithDiv(rootTemp);
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

      if (
        !style.includes("page-break-before: always;") &&
        !style.includes("page-break-before: always")
      ) {
        // Check if the combined style already exists
        let className = styles[style] || `style-${styleId}`;
        if (!styles[style]) {
          styles[style] = className;
          styleId++;
        }

        // Apply the class name and remove the style attribute
        node.setAttribute("class", className);
        node.removeAttribute("style");
      }

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

export function addCssStyleForAlignAttribute(htmlString) {
  // Parse the HTML string
  const root = parse(htmlString);

  // Find all elements with an 'align' attribute
  const elementsWithAlign = root.querySelectorAll("[align]");

  elementsWithAlign.forEach((element) => {
    const alignValue = element.getAttribute("align");

    // Determine the CSS equivalent and add it
    let cssTextAlign = "";
    switch (alignValue.toLowerCase()) {
      case "left":
      case "right":
      case "center":
      case "justify":
        cssTextAlign = `text-align: ${alignValue};`;
        break;
      // Add cases for other possible values of 'align' if needed
    }

    // Add or update the 'style' attribute with the CSS text-align
    const currentStyle = element.getAttribute("style") || "";
    element.setAttribute("style", `${currentStyle} ${cssTextAlign}`);
  });

  // Serialize the DOM back to a string
  return root.toString();
}

// ============================== Helper Function ===============================

// function wrapTextWithIns(htmlString) {
//   let el = "ins";
//   const root = parse(htmlString); // Assuming parse is defined elsewhere to parse the HTML string.

//   let keywordMapping = {
//     small: 10,
//     medium: 12,
//     large: 16,
//     // Add more keywords and their corresponding sizes here.
//   };

//   function convertPercentageToPt(fontSize, parentFontSize) {
//     const percentage = parseFloat(fontSize);
//     const ptSize = (percentage / 100) * 12;
//     return `${ptSize}pt`;
//   }

//   function convertKeywordToPt(keyword, referenceFontSize = "12pt") {
//     const fontSizeInPt = keywordMapping[keyword.toLowerCase()] || 12;
//     return `${fontSizeInPt}pt`;
//   }

//   function findFontSize(node, inheritedFontSize = "12pt") {
//     while (node && node !== root) {
//       const style = node.attributes && node.attributes.style;
//       let fontSize = style ? style.match(/font-size:\s*([^;]+);?/i)?.[1] : null;
//       if (fontSize) {
//         if (fontSize.endsWith("%")) {
//           fontSize = convertPercentageToPt(fontSize, inheritedFontSize);
//         } else if (fontSize.toLowerCase() in keywordMapping) {
//           fontSize = convertKeywordToPt(
//             fontSize.toLowerCase(),
//             inheritedFontSize
//           );
//         }
//         return fontSize;
//       }
//       node = node.parentNode;
//     }
//     return inheritedFontSize;
//   }

//   function checkParentStyle(node) {
//     let fontStyle = "";
//     let fontFamily = "";
//     let marginStyle = ""; // For accumulating margin styles.
//     let textDecoration = ""; // For accumulating text-decoration styles.
//     let fontItalicStyle = ""; // For accumulating italic font style.
//     while (node && node !== root) {
//       const style = node.attributes && node.attributes.style;

//       // Accumulate font styles.
//       if (node.tagName === "EM") fontStyle += "font-style: italic; ";
//       if (node.tagName === "STRONG") fontStyle += "font-weight: bold; ";
//       if (node.tagName === "U") fontStyle += "text-decoration: underline; ";
//       if (node.tagName === "S") fontStyle += "text-decoration: line-through; ";
//       if (node.tagName === "SUB") fontStyle += "vertical-align: sub; ";
//       if (node.tagName === "SUP") fontStyle += "vertical-align: super; ";

//       // Accumulate specific font and color styles.
//       let fontWeight = style?.match(/font-weight:\s*([^;]+);?/i)?.[1];
//       if (fontWeight) fontStyle += `font-weight: ${fontWeight}; `;

//       // let fontColor = style?.match(/color:\s*([^;]+);?/i)?.[1];
//       // if (fontColor) fontStyle += `color: ${fontColor}; `;

//       let fontColor = style?.match(/(?<!-)color:\s*([^;]+);?/i)?.[1];
//       if (fontColor) fontStyle += `color: ${fontColor}; `;

//       let foundFontFamily = style?.match(/font-family:\s*([^;]+);?/i)?.[1];
//       if (foundFontFamily) {
//         fontFamily = `font-family: ${foundFontFamily}; `;
//         // break;
//       }

//       // Check and accumulate text-decoration and font-style if explicitly defined. (14022024)
//       let textDecorationStyle = style?.match(
//         /text-decoration:\s*([^;]+);?/i
//       )?.[1];
//       if (textDecorationStyle)
//         textDecoration += `text-decoration: ${textDecorationStyle}; `;

//       let fontItalic = style?.match(/font-style:\s*italic;?/i)?.[0];
//       if (fontItalic) fontItalicStyle += `${fontItalic} `;

//       // New: Accumulate margin styles.
//       let margin = style?.match(/margin:\s*([^;]+);?/i)?.[1];
//       if (margin) marginStyle += `margin: ${margin}; `;

//       // Accumulate individual margin sides if they're explicitly defined.
//       ["top", "right", "bottom", "left"].forEach((side) => {
//         let marginSide = style?.match(
//           new RegExp(`margin-${side}:\\s*([^;]+);?`, "i")
//         )?.[1];
//         if (marginSide) marginStyle += `margin-${side}: ${marginSide}; `;
//       });

//       node = node.parentNode;
//     }

//     return (
//       fontStyle + fontFamily + marginStyle + textDecoration + fontItalicStyle
//     ); // Include margin styles in the return.
//   }

//   // function recursiveTraverse(node, inheritedFontSize) {
//   //   if (node.nodeType === 1) {
//   //     // Ensure node is an element.
//   //     node.childNodes.forEach((child, index) => {
//   //       if (child.nodeType === 3 && child.textContent.trim() !== "") {
//   //         // Node is text and not empty.
//   //         // Your existing conditions to decide whether to wrap text with <ins>.
//   //         const ins = document.createElement(el);
//   //         ins.textContent = child.textContent;

//   //         let style = findFontSize(node, inheritedFontSize);
//   //         if (style) {
//   //           style = `font-size: ${style};` + checkParentStyle(node);
//   //           ins.setAttribute("style", style);
//   //         }
//   //         node.replaceChild(ins, child);
//   //       } else if (child.nodeType === 1) {
//   //         // Recurse into child elements.
//   //         recursiveTraverse(child, inheritedFontSize);
//   //       }
//   //     });
//   //   }
//   // }

//   function recursiveTraverse(node, inheritedFontSize) {
//     if (node instanceof HTMLElement) {
//       // Assuming HTMLElement is a custom or simplified DOM node.
//       let childNodes = Array.from(node.childNodes);
//       childNodes.forEach((child, index) => {
//         if (child.nodeType === 3 && child.text.trim() !== "") {
//           // Text node with non-empty content.
//           const ins = new HTMLElement(el, {}, "", node);
//           ins.set_content(child.text);

//           let style = "";
//           const fontSize = findFontSize(node, inheritedFontSize);
//           if (fontSize) {
//             style += `font-size: ${fontSize};`;
//           }

//           const parentStyle = checkParentStyle(node);
//           if (parentStyle) {
//             style += parentStyle;
//           }

//           if (style) {
//             ins.setAttribute("style", style);
//           }

//           // Assuming a method to replace or insert the new element in place of the old text node.
//           node.childNodes[index] = ins; // This line assumes you can directly manipulate childNodes like this.
//         } else if (child instanceof HTMLElement) {
//           const childFontSize = findFontSize(child, inheritedFontSize);
//           recursiveTraverse(child, childFontSize);
//         }
//       });
//     }
//   }

//   recursiveTraverse(root, "12pt");
//   return root.outerHTML;
// }

function wrapTextWithIns(htmlString) {
  let el = "ins";
  const root = parse(htmlString); // Assuming parse is defined elsewhere to parse the HTML string.

  let keywordMapping = {
    small: 10,
    medium: 12,
    large: 16,
    // Add more keywords and their corresponding sizes here.
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
          fontSize = convertKeywordToPt(
            fontSize.toLowerCase(),
            inheritedFontSize
          );
        }
        return fontSize;
      }
      node = node.parentNode;
    }
    return inheritedFontSize;
  }

  function checkParentStyle(node) {
    let fontStyle = null;
    let fontWeight = null;
    let textDecoration = null;
    let fontItalicStyle = null;
    let fontColor = null;
    let fontFamily = null;
    let marginStyle = null;
  
    while (node && node !== root) {
      const style = node.attributes && node.attributes.style;
  
      if (!fontStyle && node.tagName === "EM") fontStyle = "italic";
      if (!fontWeight && node.tagName === "STRONG") fontWeight = "bold";
      if (!textDecoration) {
        if (node.tagName === "U") textDecoration = "underline";
        if (node.tagName === "S") textDecoration = "line-through";
      }
      if (!fontItalicStyle && style?.includes("font-style: italic;")) fontItalicStyle = "italic";
  
      if (!fontColor) {
        let foundColor = style?.match(/(?<!-)color:\s*([^;]+);?/i)?.[1];
        if (foundColor) fontColor = foundColor;
      }
  
      if (!fontFamily) {
        let foundFamily = style?.match(/font-family:\s*([^;]+);?/i)?.[1];
        if (foundFamily) fontFamily = foundFamily;
      }
  
      if (!marginStyle) {
        let foundMargin = style?.match(/margin:\s*([^;]+);?/i)?.[1];
        if (foundMargin) {
          marginStyle = foundMargin;
        } else {
          // Only search for individual margins if the shorthand hasn't been found.
          ["top", "right", "bottom", "left"].forEach((side) => {
            let marginSide = style?.match(new RegExp(`margin-${side}:\\s*([^;]+);?`, "i"))?.[1];
            if (marginSide) {
              marginStyle = marginStyle ? `${marginStyle}; margin-${side}: ${marginSide}` : `margin-${side}: ${marginSide}`;
            }
          });
        }
      }
  
      node = node.parentNode; // Continue with the next parent.
    }
  
    // Construct the final style string from the collected values.
    let finalStyle = "";
    if (fontStyle) finalStyle += `font-style: ${fontStyle}; `;
    if (fontWeight) finalStyle += `font-weight: ${fontWeight}; `;
    if (textDecoration) finalStyle += `text-decoration: ${textDecoration}; `;
    if (fontItalicStyle) finalStyle += `font-style: ${fontItalicStyle}; `;
    if (fontColor) finalStyle += `color: ${fontColor}; `;
    if (fontFamily) finalStyle += `font-family: ${fontFamily}; `;
    if (marginStyle) finalStyle += `margin: ${marginStyle}; `;
  
    return finalStyle;
  }
  

  // function recursiveTraverse(node, inheritedFontSize) {
  //   if (node.nodeType === 1) {
  //     // Ensure node is an element.
  //     node.childNodes.forEach((child, index) => {
  //       if (child.nodeType === 3 && child.textContent.trim() !== "") {
  //         // Node is text and not empty.
  //         // Your existing conditions to decide whether to wrap text with <ins>.
  //         const ins = document.createElement(el);
  //         ins.textContent = child.textContent;

  //         let style = findFontSize(node, inheritedFontSize);
  //         if (style) {
  //           style = `font-size: ${style};` + checkParentStyle(node);
  //           ins.setAttribute("style", style);
  //         }
  //         node.replaceChild(ins, child);
  //       } else if (child.nodeType === 1) {
  //         // Recurse into child elements.
  //         recursiveTraverse(child, inheritedFontSize);
  //       }
  //     });
  //   }
  // }

  function recursiveTraverse(node, inheritedFontSize) {
    if (node instanceof HTMLElement) {
      // Assuming HTMLElement is a custom or simplified DOM node.
      let childNodes = Array.from(node.childNodes);
      childNodes.forEach((child, index) => {
        if (child.nodeType === 3 && child.text.trim() !== "") {
          // Text node with non-empty content.
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

          // Assuming a method to replace or insert the new element in place of the old text node.
          node.childNodes[index] = ins; // This line assumes you can directly manipulate childNodes like this.
        } else if (child instanceof HTMLElement) {
          const childFontSize = findFontSize(child, inheritedFontSize);
          recursiveTraverse(child, childFontSize);
        }
      });
    }
  }

  recursiveTraverse(root, "12pt");
  return root.outerHTML;
}


function replacePWithDiv(htmlString) {
  const root = parse(htmlString);
  const pTags = root.querySelectorAll("p");

  pTags.forEach((p) => {
    const style = p.getAttribute("style");
    // Skip <p> tags with "page-break-before: always;"
    if (
      style &&
      (style.includes("page-break-before: always;") ||
        style.includes("page-break-before: always"))
    ) {
      return; // Do not change these <p> tags
    }

    // Proceed with replacing <p> tags having "margin-bottom: 0in"
    if (style && /margin-bottom:\s*0in;?/.test(style)) {
      // Create a new <div> element, assuming parse() returns a DOM-like object
      const div = parse(`<div>${p.innerHTML}</div>`).firstChild;

      // Copy attributes from <p> to <div>, without modifying the style
      Object.keys(p.attributes).forEach((name) => {
        const value = p.attributes[name];
        div.setAttribute(name, value);
      });

      // Replace <p> with <div>
      p.replaceWith(div);
    }
  });

  // Serialize the modified DOM back into a string
  return root.toString();
}

function replacePWithInsInLi(htmlString) {
  const root = parse(htmlString);
  const pTags = root.querySelectorAll("p");

  pTags.forEach((p) => {
    // Check for <p> tags with "page-break-before: always;" and skip them
    const style = p.getAttribute("style");
    if (style && style.includes("page-break-before: always;")) {
      // Do nothing and move to the next <p> tag
      return;
    }

    // Check all ancestors for an <li> tag
    let parent = p.parentNode;
    let isInLiTag = false;
    while (parent && parent.tagName !== "HTML") {
      if (parent.tagName === "LI") {
        isInLiTag = true;
        break;
      }
      parent = parent.parentNode;
    }

    if (isInLiTag) {
      if (
        style &&
        (style.includes("margin-top") || style.includes("margin-bottom"))
      ) {
        // Create a new <ins> element with the contents of <p>
        const ins = parse(`<ins>${p.innerHTML}</ins>`).firstChild;

        // Copy attributes from <p> to <ins>, modifying the style to remove margin-top and margin-bottom
        Object.keys(p.attributes).forEach((name) => {
          let value = p.attributes[name];
          if (name === "style") {
            // Remove margin-top and margin-bottom from the style
            value = value.replace(/margin-(top|bottom):\s*[^;]+;?/g, "").trim();
          }
          ins.setAttribute(name, value);
        });

        // Replace <p> with <ins>
        p.replaceWith(ins);
      }
    }
  });

  // Serialize the modified DOM back into a string
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

// function convertPaddingToMargin(htmlString) {
//   const root = parse(htmlString); // Assuming parse is defined elsewhere to parse the HTML string.

//   function recursiveTraverse(node) {
//     if (node instanceof HTMLElement) {
//       const style = node.attributes && node.attributes.style;
//       if (style) {
//         // This regex matches padding properties and captures the entire declaration for replacement.
//         const paddingRegex = /padding(-top|-right|-bottom|-left)?\s*:\s*([^;]+);?/gi;
//         let modifiedStyle = style.replace(paddingRegex, (match, p1, p2) => {
//           // p1 captures the specific padding side (-top, -right, etc.), if any, and p2 captures the value.
//           // If p1 is undefined (meaning the shorthand 'padding' was used), it's replaced with an empty string.
//           const marginProperty = `margin${p1 || ''}`;
//           return `${marginProperty}: ${p2};`;
//         });
//         node.setAttribute("style", modifiedStyle);
//       }
//       node.childNodes.forEach((child) => {
//         recursiveTraverse(child);
//       });
//     }
//   }

//   recursiveTraverse(root);
//   return root.toString(); // Assuming root.toString() serializes the modified DOM back to an HTML string.
// }

function convertPaddingToMarginAndMerge(htmlString) {
  const root = parse(htmlString); // Assuming parse is defined elsewhere to parse the HTML string.

  function mergeStyles(existingStyle, newStyle) {
    const styleObject = existingStyle.split(";").reduce((acc, cur) => {
      const [key, value] = cur.split(":").map((part) => part.trim());
      if (key && value) {
        acc[key.toLowerCase()] = value;
      }
      return acc;
    }, {});

    newStyle.split(";").forEach((style) => {
      const [key, value] = style.split(":").map((part) => part.trim());
      if (key && value) {
        // Merge logic: if it's a margin property, and we already have it, we need to decide how to merge.
        // For simplicity, we'll just add the new value next to the old one, separated by a space.
        // More sophisticated merging logic might be needed for real-world applications.
        if (
          key.toLowerCase().startsWith("margin") &&
          styleObject[key.toLowerCase()]
        ) {
          styleObject[key.toLowerCase()] = `${
            styleObject[key.toLowerCase()]
          } ${value}`;
        } else {
          styleObject[key.toLowerCase()] = value;
        }
      }
    });

    return Object.entries(styleObject)
      .map(([key, value]) => `${key}: ${value}`)
      .join("; ");
  }

  function recursiveTraverse(node) {
    if (node instanceof HTMLElement) {
      const style = node.attributes && node.attributes.style;
      if (style) {
        // Convert padding to margin
        const paddingToMargin = style.replace(
          /padding(-top|-right|-bottom|-left)?\s*:\s*([^;]+);?/gi,
          (match, p1, p2) => {
            return `margin${p1 || ""}: ${p2};`;
          }
        );
        // Merge existing styles with the new margin styles
        const mergedStyle = mergeStyles(style, paddingToMargin);
        node.setAttribute("style", mergedStyle);
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

function convertAlignmentStylesToAttributes(htmlString) {
  return htmlString.replace(
    /<(\w+)([^>]*)style="([^"]*)"/gi, // Match any tag with a style attribute
    function (match, tagName, preStyle, style) {
      let align = "";
      let modifiedStyle = style;

      // Handling for text-align in block elements
      if (style.includes("text-align: center")) {
        align = 'align="center"';
      } else if (style.includes("text-align: left")) {
        align = 'align="left"';
      } else if (style.includes("text-align: right")) {
        align = 'align="right"';
      }

      // Special handling for images
      if (tagName.toLowerCase() === "img") {
        if (
          style.includes("margin-left: auto") &&
          style.includes("margin-right: auto")
        ) {
          // Remove margin styles for auto margins
          modifiedStyle = style.replace(/margin-(left|right): auto;?\s?/g, "");
          // Wrap the img tag in a div with text-align:center and apply any remaining styles
          return `<div style="text-align:center;"><img ${preStyle}style="${modifiedStyle}" /></div>`;
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
      }

      // Reconstruct the tag with alignment attributes if applicable
      // For img tags, ensure self-closing syntax is respected
      return align || tagName.toLowerCase() === "img"
        ? `<${tagName} ${preStyle}style="${modifiedStyle}" ${align} />`
        : `<${tagName} ${preStyle}style="${modifiedStyle}" ${align}>`;
    }
  );
}

// Function to transverse and wrap the images with div
function traverseAndWrap(node) {
  node.childNodes.forEach((child) => {
    // Check if the child is an <img> with the specific style
    if (child.tagName === "IMG") {
      const style = child.getAttribute("style");
      if (
        style &&
        style.includes("margin-left: auto") &&
        style.includes("margin-right: auto")
      ) {
        // Create a new <div> wrapper for the <img>
        const wrapper = new HTMLElement(
          "div",
          { style: "text-align: center;" },
          'style="text-align:center;"',
          null,
          child.parentNode
        );
        // Replace the <img> with the wrapper <div> and reinsert the <img> into the wrapper
        child.replaceWith(wrapper);
        wrapper.appendChild(child);
      }
    } else if (child.childNodes.length > 0) {
      // Recurse into child nodes
      traverseAndWrap(child);
    }
  });
}

function wrapCenteredImages(htmlString) {
  const root = parse(htmlString);
  traverseAndWrap(root);
  return root.toString();
}

// Add attributes to the td if there is a style with vertical align
function convertVerticalAlignToValignAttributes(htmlString) {
  return htmlString.replace(
    /<td([^>]*)style="([^"]*vertical-align: (top|middle|bottom)[^"]*)"/gi,
    function (match, preStyle, style, align) {
      // Determine the valign attribute based on the vertical-align value
      let valign = `valign="${align}"`;

      // Return the modified td start tag with the valign attribute added
      // and keep the original style attribute unchanged
      return `<td${preStyle}style="${style}" ${valign}`;
    }
  );
}
