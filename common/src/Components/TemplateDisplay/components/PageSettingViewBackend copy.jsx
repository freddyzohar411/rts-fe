import React, { useRef, useState, useEffect } from "react";
import "./PageSettingView.scss";
import * as ExportHelper from "../../../helpers/export_helper";
import juice from "juice";
import { parse } from "node-html-parser";

const PageSettingViewBackend = ({ settings, content }) => {
  const iframeRef = useRef(null);

  // const convertInlineStylesToClasses = (htmlString) => {
  //   const root = parse(htmlString);
  //   const styles = {};
  //   let styleId = 0;

  //   root.querySelectorAll("*").forEach((node) => {
  //     if (node.getAttribute("style")) {
  //       const style = node.getAttribute("style");
  //       let className = `style${styleId}`;

  //       // Check if the style already exists to avoid duplicates
  //       if (!styles[style]) {
  //         styles[style] = className;
  //         styleId++;
  //       } else {
  //         className = styles[style];
  //       }

  //       node.removeAttribute("style");
  //       node.classList.add(className);
  //     }
  //   });

  //   // Construct the style tag content
  //   const styleContent = Object.entries(styles)
  //     .map(([style, className]) => {
  //       return `.${className} { ${style} }`;
  //     })
  //     .join("\n");

  //   return {
  //     newHtml: root.toString(),
  //     // styleTag: `<style>${styleContent}</style>`,
  //     styleTag: `${styleContent}`,
  //   };
  // };

  const convertSpansToParagraphs = (htmlString) => {
    // Replace opening <span> tags with <p>
    let newHtml = htmlString.replace(/<span(.*?)>/gi, "<p$1>");

    // Replace closing </span> tags with </p>
    newHtml = newHtml.replace(/<\/span>/gi, "</p>");

    return newHtml;
  };

  // Working
  // const convertInlineStylesToClasses = (htmlString) => {
  //   const root = parse(htmlString);
  //   const styles = {};
  //   let styleId = 0;

  //   root.querySelectorAll("*").forEach((node) => {
  //     // Remove align from P. Causing issue
  //     if (node.tagName === "P" && node.hasAttribute("align")) {
  //       node.removeAttribute("align");
  //     }

  //     if (node.getAttribute("style")) {
  //       const style = node.getAttribute("style");
  //       let className = `style-${styleId}`;

  //       // Check if the style already exists to avoid duplicates
  //       if (!styles[style]) {
  //         styles[style] = className;
  //         styleId++;
  //       } else {
  //         className = styles[style];
  //       }

  //       // Remove all existing classes and set the new class
  //       node.setAttribute("class", className);

  //       node.removeAttribute("style");
  //     }
  //   });

  //   // Construct the style tag content
  //   const styleContent = Object.entries(styles)
  //     .map(([style, className]) => {
  //       return `.${className} { ${style} }`;
  //     })
  //     .join("\n");

  //   return { newHtml: root.toString(), styleTag: `${styleContent}` };
  // };

  // Working Final v1
  //   const convertInlineStylesToClasses = (htmlString) => {
  //     const root = parse(htmlString);
  //     const styles = {};
  //     let styleId = 0;

  //     root.querySelectorAll("*").forEach((node) => {
  //         if (node.tagName === "P" && node.hasAttribute("align")) {
  //             node.removeAttribute("align");
  //         }

  //         const style = node.getAttribute("style");
  //         if (style) {
  //             let className = `style-${styleId}`;

  //             // Check if the style already exists to avoid duplicates
  //             if (!styles[style]) {
  //                 styles[style] = className;
  //                 styleId++;
  //             } else {
  //                 className = styles[style];
  //             }

  //             // Apply the class name and remove the style attribute
  //             node.setAttribute("class", className);
  //             node.removeAttribute("style");

  //             // Convert to <p> tag if necessary
  //             if (style.includes("font-size") && !["P", "H1", "H2", "H3", "H4", "H5", "H6"].includes(node.tagName)) {
  //                 const newNode = parse(`<p class="${className}">${node.innerHTML}</p>`);
  //                 node.replaceWith(newNode);
  //             }
  //         }
  //     });

  //     // Generate the CSS string
  //     const styleString = Object.entries(styles).map(([key, value]) => `.${value} { ${key} }`).join("\n");

  //     // Return the new HTML and style tag
  //     return {
  //         newHtml: root.toString(),
  //         styleTag: `${styleString}`
  //     };
  // };

  //   const convertInlineStylesToClasses = (htmlString) => {
  //     const root = parse(htmlString);
  //     const styles = {};
  //     let styleId = 0;

  //     const processNode = (node) => {
  //         if (node.nodeType === 1) { // Element node
  //             // Remove 'align' from <p> tags
  //             if (node.tagName === "P" && node.hasAttribute("align")) {
  //                 node.removeAttribute("align");
  //             }

  //             let style = node.getAttribute("style") || "";
  //             let additionalStyle = "";

  //             // Check if the node has a font-size style and is not one of the specified tags
  //             if (style.includes("font-size") && !["P", "H1", "H2", "H3", "H4", "H5", "H6"].includes(node.tagName)) {
  //                 // If it's a span, add 'display: inline' to its style
  //                 if (node.tagName === "SPAN") {
  //                     additionalStyle = "display: inline; ";
  //                 }

  //                 // Convert to <p> tag
  //                 const newNode = parse(`<p class="style-${styleId}">${node.innerHTML}</p>`).firstChild;
  //                 node.replaceWith(newNode);
  //                 node = newNode; // Update reference to the new node
  //             }

  //             // Combine original and additional styles
  //             style = additionalStyle + style;

  //             // Check if the combined style already exists
  //             let className = styles[style] || `style-${styleId}`;
  //             if (!styles[style]) {
  //                 styles[style] = className;
  //                 styleId++;
  //             }

  //             // Apply the class name and remove the style attribute
  //             node.setAttribute("class", className);
  //             node.removeAttribute("style");

  //             // Recursively process child nodes
  //             Array.from(node.childNodes).forEach(child => processNode(child));
  //         }
  //     };

  //     // Start processing from the root
  //     processNode(root);

  //     // Generate the CSS string
  //     const styleString = Object.entries(styles).map(([key, value]) => `.${value} { ${key} }`).join("\n");

  //     // Return the new HTML and style tag
  //     return {
  //         newHtml: root.toString(),
  //         styleTag: styleString
  //     };
  // };

  // Working Final v2
  // const convertInlineStylesToClasses = (htmlString) => {
  //   const root = parse(htmlString);
  //   const styles = {};
  //   let styleId = 0;

  //   const processNode = (node) => {
  //     if (node.nodeType === 1) {
  //       // Element node
  //       // Remove 'align' from <p> tags
  //       if (node.tagName === "P" && node.hasAttribute("align")) {
  //         node.removeAttribute("align");
  //       }

  //       let style = node.getAttribute("style") || "";
  //       let additionalStyle = "";

  //       // Check if the node has a font-size style and is not one of the specified tags
  //       if (
  //         style.includes("font-size") &&
  //         !["P", "H1", "H2", "H3", "H4", "H5", "H6"].includes(node.tagName)
  //       ) {
  //         // If it's a span, add 'display: inline' to its style
  //         if (node.tagName === "SPAN") {
  //           additionalStyle = "display: inline-block; ";
  //         }

  //         // Convert to <p> tag
  //         const newNode = parse(
  //           `<ins class="style-${styleId}">${node.innerHTML}</ins>`
  //         ).firstChild;
  //         node.replaceWith(newNode);
  //         node = newNode; // Update reference to the new node
  //       }

  //       // Combine original and additional styles
  //       style = additionalStyle + style;

  //       // Check if the combined style already exists
  //       let className = styles[style] || `style-${styleId}`;
  //       if (!styles[style]) {
  //         styles[style] = className;
  //         styleId++;
  //       }

  //       // Apply the class name and remove the style attribute
  //       node.setAttribute("class", className);
  //       node.removeAttribute("style");

  //       // Recursively process child nodes
  //       Array.from(node.childNodes).forEach((child) => processNode(child));
  //     }
  //   };

  //   // Start processing from the root
  //   processNode(root);

  //   // Generate the CSS string
  //   const styleString = Object.entries(styles)
  //     .map(([key, value]) => `.${value} { ${key} }`)
  //     .join("\n");

  //   // Return the new HTML and style tag
  //   return {
  //     newHtml: root.toString(),
  //     styleTag: styleString,
  //   };
  // };

  const convertInlineStylesToClasses = (htmlString) => {
    const root = parse(htmlString);
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

        // Check if the node has a font-size style and is not one of the specified tags
        if (
          style.includes("font-size") &&
          !["P", "H1", "H2", "H3", "H4", "H5", "H6"].includes(node.tagName)
        ) {
          // If it's a span, add 'display: inline' to its style
          if (node.tagName === "SPAN") {
            additionalStyle = "display: inline-block; ";
          }

          // Convert to <p> tag
          const newNode = parse(
            `<ins class="style-${styleId}">${node.innerHTML}</ins>`
          ).firstChild;
          node.replaceWith(newNode);
          node = newNode; // Update reference to the new node
        } 
        // else if (node.tagName === "STRONG") {
        //   additionalStyle = "font-weight: bold; ";
        //   // Convert to <p> tag
        //   const newNode = parse(
        //     `<ins class="style-${styleId}">${node.innerHTML}</ins>`
        //   ).firstChild;
        //   node.replaceWith(newNode);
        //   node = newNode; // Update reference to the new node
        // }

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
      newHtml: root.toString(),
      styleTag: styleString,
    };
  };

  // working v2
  // const convertInlineStylesToClasses = (htmlString) => {
  //   const root = parse(htmlString);
  //   const styles = {};
  //   let styleId = 0;

  //   const processNode = (node) => {
  //     if (node.nodeType === 1) {
  //       // Element node
  //       if (node.tagName === "P" && node.hasAttribute("align")) {
  //         node.removeAttribute("align");
  //       }

  //       const style = node.getAttribute("style") || "";
  //       let className;
  //       let newStyle = style;

  //       // Handling <strong> tags
  //       if (node.tagName === "STRONG") {
  //         newStyle += "; font-weight: bold"; // Add bold style
  //       }

  //       // Check if converting to <p> tag is necessary, style that describes that tag to be converted should be added to the new style in the new p
  //       // Forexample span tag should not be displat block and Strng tag should have font weight bold etc
  //       if (
  //         style.includes("font-size") &&
  //         !["P", "H1", "H2", "H3", "H4", "H5", "H6"].includes(node.tagName)
  //       )
  //       // remove the display block
  //       {
  //         newStyle += "; display: inline";
  //       }

  //       // Generate or get the existing class name for the style
  //       if (styles[newStyle]) {
  //         className = styles[newStyle];
  //       } else {
  //         className = `style-${styleId++}`;
  //         styles[newStyle] = className;
  //       }

  //       // Convert <strong> (or other specified tags) to <p>, or assign class to existing tags
  //       const convertToP =
  //         node.tagName === "STRONG" ||
  //         (style.includes("font-size") &&
  //           !["P", "H1", "H2", "H3", "H4", "H5", "H6"].includes(node.tagName));

  //       if (convertToP) {
  //         const newNode = parse(
  //           `<p class="${className}">${node.innerHTML}</p>`
  //         ).firstChild;
  //         node.replaceWith(newNode);
  //       } else {
  //         node.setAttribute("class", className);
  //         node.removeAttribute("style");
  //       }

  //       node.childNodes.forEach((child) => processNode(child));
  //     }
  //   };

  //   processNode(root);

  //   // Generate the CSS string from the styles object
  //   const styleString = Object.entries(styles)
  //     .map(([key, value]) => `.${value} { ${key} }`)
  //     .join(" ");

  //   // Return the new HTML and style string
  //   return {
  //     newHtml: root.toString(),
  //     styleTag: styleString,
  //   };
  // };

  //     const root = parse(htmlString);

  //     const processNode = (node) => {
  //         if (node.nodeType === 1) { // Element node
  //             if (node.tagName === "STRONG") {
  //                 // Replace <strong> node with its content as HTML string
  //                 return node.innerHTML;
  //             } else {
  //                 // Recursively process child nodes and rebuild the HTML
  //                 const childHtml = node.childNodes.map(child => processNode(child)).join('');
  //                 return `<${node.tagName.toLowerCase()}${node.rawAttrs ? ' ' + node.rawAttrs : ''}>${childHtml}</${node.tagName.toLowerCase()}>`;
  //             }
  //         } else if (node.nodeType === 3) { // Text node
  //             return node.rawText;
  //         }
  //     };

  //     // Process each child of the root and reconstruct the HTML
  //     const newHtml = root.childNodes.map(child => processNode(child)).join('');

  //     return newHtml;
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (iframeRef.current && content) {
  //       console.log("Content HTML: ", content);
  //       const pdfBlob = await ExportHelper.exportBackendHtml2PdfBlob(
  //         juice(content),
  //         {
  //           ...settings,
  //         }
  //       );
  //       // Assuming you have a Blob object named 'pdfBlob' representing your PDF data
  //       const blobUrl = URL.createObjectURL(pdfBlob);

  //       // Set the Blob URL as the source for the iframe
  //       iframeRef.current.src = blobUrl;
  //     }
  //   };

  //   fetchData();

  //   return () => {
  //     // Clean up the Blob URL when the component unmounts
  //     if (iframeRef.current) {
  //       URL.revokeObjectURL(iframeRef.current.src);
  //     }
  //   };
  // }, [
  //   content,
  //   settings.marginBottom,
  //   settings.marginLeft,
  //   settings.marginRight,
  //   settings.marginTop,
  //   settings.pageOrientation,
  //   settings.pageType,
  //   settings.unit,
  // ]);

  useEffect(() => {
    const fetchData = async () => {
      if (iframeRef.current && content) {
        console.log("Content HTML: ", content);
        let { newHtml, styleTag } = convertInlineStylesToClasses(content);
        console.log("newHtml", newHtml);
        // newHtml = removeStrongTags(newHtml);
        // newHtml = convertSpansToParagraphs(newHtml);
        const pdfBlob = await ExportHelper.exportBackendHtml2PdfBlobExtCss(
          newHtml,
          {
            ...settings,
          },
          styleTag
        );
        // Assuming you have a Blob object named 'pdfBlob' representing your PDF data
        const blobUrl = URL.createObjectURL(pdfBlob);

        // Set the Blob URL as the source for the iframe
        iframeRef.current.src = blobUrl;
      }
    };

    fetchData();

    return () => {
      // Clean up the Blob URL when the component unmounts
      if (iframeRef.current) {
        URL.revokeObjectURL(iframeRef.current.src);
      }
    };
  }, [
    content,
    settings.marginBottom,
    settings.marginLeft,
    settings.marginRight,
    settings.marginTop,
    settings.pageOrientation,
    settings.pageType,
    settings.unit,
  ]);

  // const [exCssHtml, setExCssHtml] = useState("");
  // useEffect(() => {
  //   const convertInlineStylesToClasses = (htmlString) => {
  //     const root = parse(htmlString);
  //     const styles = {};
  //     let styleId = 0;

  //     root.querySelectorAll("*").forEach((node) => {
  //       if (node.getAttribute("style")) {
  //         const style = node.getAttribute("style");
  //         let className = `style-${styleId}`;

  //         // Check if the style already exists to avoid duplicates
  //         if (!styles[style]) {
  //           styles[style] = className;
  //           styleId++;
  //         } else {
  //           className = styles[style];
  //         }

  //         node.removeAttribute("style");
  //         node.classList.add(className);
  //       }
  //     });

  //     // Construct the style tag content
  //     const styleContent = Object.entries(styles)
  //       .map(([style, className]) => {
  //         return `.${className} { ${style} }`;
  //       })
  //       .join("\n");

  //     return {
  //       newHtml: root.toString(),
  //       // styleTag: `<style>${styleContent}</style>`,
  //       styleTag: `${styleContent}`,
  //     };
  //   };
  //   setExCssHtml(convertInlineStylesToClasses(content).styleTag);
  // }, [content]);
  // console.log("exCssHtml", exCssHtml);

  return (
    <>
      {content ? (
        <iframe ref={iframeRef} title="PDF Viewer" width="80%" height="635px" />
      ) : (
        <div
          style={{ height: "635px" }}
          className="d-flex justify-content-center align-items-center"
        >
          <h2>Please select template to load</h2>
        </div>
      )}
    </>
  );
};

export default PageSettingViewBackend;
