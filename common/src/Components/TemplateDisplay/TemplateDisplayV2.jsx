import React, { useEffect, useState, useRef } from "react";
import ReactDOMServer from "react-dom/server";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";

import ReactHtmlParser from "react-html-parser";
import "./TinyCME.scss";

const TemplateDisplayV2 = ({ content, allData, isView, getNewContent }) => {
  const [mappedVariableData, setMappedVariableData] = useState(allData || null);
  const [parsedContent, setParsedContent] = useState(content || "");
  const [fullHtmlString, setFullHtmlString] = useState("");
  const [templateListCriteria, setTemplateListCriteria] = useState([]);
  const [templateData, setTemplateData] = useState({});
  const displayRef = useRef(null);
  const observer = useRef(null);

  useEffect(() => {
    if (displayRef.current) {
      observer.current = new MutationObserver((mutations) => {
        const htmlString = displayRef.current.innerHTML;
        setFullHtmlString(removeContentEditableAndStyles(htmlString));
        if (getNewContent)
          getNewContent(removeContentEditableAndStyles(htmlString));
      });

      observer.current.observe(displayRef.current, {
        attributes: true,
        childList: true,
        subtree: true,
        characterData: true,
      });
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [displayRef.current, parsedContent]);

  useEffect(() => {
    if (content) {
      setParsedContent(content);
    }
  }, [content]);

  useEffect(() => {
    if (allData) {
      setMappedVariableData(allData);
    }
  }, [allData, content]);

  // Remove contenteditable attribute and style attribute from HTML string
  function removeContentEditableAndStyles(htmlString) {
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

  // =============== ALL REGEX FUNCTIONS =================
  function replaceVariables(html, variableData) {
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

  function extractStringLiteralsDoubleBrackets(htmlString) {
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

  function getTemplateListCriteriaByCategoryAndName(extractedList) {
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

  // // Let find those with {{xxx.yyy:zzz}} and replace them with the content by looping through bas on the zzz key value in trhe data provided
  function replaceTemplateListCriteriaWithData(
    htmlString,
    templateData,
    variableData
  ) {
    // find those with {{xxx.yyy:zzz}} and replace them with the content in templateData[xxx][yyy][zzz]
    // return back the html that has been replaced with the data
    const pattern = /{{(.*?):(.*?)}}/g;
    const matches = htmlString?.match(pattern) || [];
    console.log("Matches", matches);
    let result = htmlString;
    matches.forEach((match) => {
      const key = match.replace("{{", "").replace("}}", "");
      const keys = key.split(":");
      const templateLiteral = keys[0];
      const variableLiteral = keys[1];

      // Get content
      const templateLiteralSplit = templateLiteral.split(".");
      const templateContent =
        templateData?.[templateLiteralSplit[0]]?.[templateLiteralSplit[1]] ||
        "-";
      console.log("templateContent", templateContent);

      // Get array from variable data
      const variableLiteralSplit = variableLiteral.split(".");
      console.log("variableSplit", variableLiteralSplit);
      console.log("variableData", variableData);
      const variableContent =
        variableData?.[variableLiteralSplit[0]]?.[variableLiteralSplit[1]] ||
        [];

      // Loop through array and replace
      let value = "";
      variableContent.forEach((item) => {
        let replacedTemplateContent = templateContent;
        console.log("item", replacedTemplateContent);
        const templateContentMatches =
          replacedTemplateContent.match(/\${(.*?)}/g);
        console.log("templateContentMatches", templateContentMatches);
        templateContentMatches?.forEach((match) => {
          const key = match.replace("${", "").replace("}", "");
          const keys = key.split(".");
          const value = item?.[keys[2]] || "-";
          replacedTemplateContent = replacedTemplateContent.replace(
            match,
            value
          );
        });
        value += replacedTemplateContent;
      });
      console.log("value", value);
      result = result.replace(match, value);
    });
    return result;
  }

  useEffect(() => {
    if (content) {
      const stringLiterals = extractStringLiteralsDoubleBrackets(content);
      const templateCriteriaList =
        getTemplateListCriteriaByCategoryAndName(stringLiterals);
      setTemplateListCriteria(templateCriteriaList);
    }
  }, [content]);

  useEffect(() => {
    if (templateListCriteria.length > 0) {
      axios
        .post(
          "http://localhost:8181/api/template/categories-names",
          templateListCriteria
        )
        .then((res) => {
          const { data } = res;
          const mappedData = {};
          data.forEach((item) => {
            mappedData[item.category] = {
              ...mappedData[item.category],
              [item.name]: item.content,
            };
          });
          setTemplateData(mappedData);
        });
    }
  }, [templateListCriteria]);

  console.log(templateData);

  // Let find those with {{xxx.yyy}} and replace them with the content
  // function replaceTemplateListCriteriaWithoutData(htmlString, templateData) {
  //   // find those with {{xxx.yyy}} not {{xxx.yyy:zzz}} and replace them with the content in templateData[xxx][yyy]
  //   // return back the html that has been replaced with the data
  //   const pattern = /{{([^:]*?)}}/g;
  //   const matches = htmlString?.match(pattern) || [];
  //   let result = htmlString;
  //   matches.forEach((match) => {
  //     const key = match.replace("{{", "").replace("}}", "");
  //     const keys = key.split(".");
  //     const value = templateData?.[keys[0]]?.[keys[1]] || "-";
  //     result = result.replace(match, value);
  //   });
  //   return result;
  // }

  function replaceTemplateListCriteriaWithoutData(htmlString, templateData) {
    // find those with {{xxx.yyy}} not {{xxx.yyy:zzz}} and replace them with the content in templateData[xxx][yyy]
    // return back the html that has been replaced with the data
    const pattern = /{{([^:]*?)}}/g;
    const matches = htmlString?.match(pattern) || [];
    let result = htmlString;
    matches.forEach((match) => {
      const key = match.replace("{{", "").replace("}}", "");
      const keys = key.split(".");
      const value = templateData?.[keys[0]]?.[keys[1]] || "-";
      // In this Value find ${xxx.yyy.zzz} and replace them with the content in variableData[xxx][yyy][zzz]
      const valueMatches = value.match(/\${(.*?)}/g);
      let replacedValue = value;
      valueMatches?.forEach((match) => {
        const key = match.replace("${", "").replace("}", "");
        const keys = key.split(".");
        const value = mappedVariableData?.[keys[0]]?.[keys[1]]?.[keys[2]] || "-";
        replacedValue = replacedValue.replace(match, value);
      });
      result = result.replace(match, replacedValue);
    });
    return result;
  }

  // useEffect(() => {
  //   if (mappedVariableData) {
  //     setParsedContent(replaceVariables(content, mappedVariableData));
  //     getNewContent(
  //       removeContentEditableAndStyles(
  //         replaceVariables(content, mappedVariableData)
  //       )
  //     );
  //     return;
  //   }
  //   // getNewContent(removeContentEditableAndStyles(content));
  // }, [mappedVariableData, content, parsedContent]);

  // useEffect(() => {
  //   if (templateData) {
  //     setParsedContent(
  //       replaceTemplateListCriteriaWithoutData(parsedContent, templateData)
  //     );
  //   }
  // }, [templateData, parsedContent]);

  // useEffect(() => {
  //   if (templateData && mappedVariableData) {
  //     setParsedContent(
  //       replaceTemplateListCriteriaWithData(
  //         parsedContent,
  //         templateData,
  //         mappedVariableData
  //       )
  //     );
  //   }
  // }, [templateData, parsedContent, mappedVariableData]);

  
  useEffect(() => {
    const runEffects = async () => {
      // Effect 1: Replace variables with mappedVariableData
      let updatedContent = content;
      if (mappedVariableData) {
        const replacedContent = replaceVariables(content, mappedVariableData);
        // const newContent = removeContentEditableAndStyles(replacedContent);
        updatedContent = replacedContent;
        setParsedContent(updatedContent);
        getNewContent(updatedContent);
      }
  
      // Effect 2: Replace templateListCriteria without data
      if (templateData) {
        updatedContent = replaceTemplateListCriteriaWithoutData(updatedContent, templateData);
        setParsedContent(updatedContent);
      }
  
      // Effect 3: Replace templateListCriteria with data
      if (templateData && mappedVariableData) {
        updatedContent = replaceTemplateListCriteriaWithData(updatedContent, templateData, mappedVariableData);
        setParsedContent(updatedContent);
      }
    };
  
    runEffects();
  }, [mappedVariableData, content, templateData]);
  

  console.log("parsedContent", parsedContent);

  return (
    <div>
      {isView ? (
        <div className="tinyCME">
          <div ref={displayRef}> {ReactHtmlParser(parsedContent)}</div>
        </div>
      ) : (
        <Editor
          tinymceScriptSrc={process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"}
          value={parsedContent}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "preview",
              "help",
              "wordcount",
              "table",
              "emoticons",
              "codesample",
            ],
            toolbar:
              "undo redo | blocks fontfamily fontsizeinput | " +
              "bold italic underline forecolor backcolor | align lineheight |" +
              "bullist numlist outdent indent | hr |" +
              "removeformat | searchreplace |" +
              "table | code codesample | emoticons charmap | fullscreen | preview | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
          onEditorChange={(value) => {
            setParsedContent(value);
            // if (getNewContent) {
            //   const cleanHTML = removeContentEditableAndStyles(value);
            //   getNewContent(removeContentEditableAndStyles(value));
            // }
          }}
        />
      )}
    </div>
  );
};

export default TemplateDisplayV2;
