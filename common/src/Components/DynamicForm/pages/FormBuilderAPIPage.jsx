import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import FormBuilder from "./FormBuilder2";

const FormBuilderAPIPage = () => {
  const [unusedFields, setUnusedFields] = useState(null);
  const [template, setTemplate] = useState(null);
  const { templateId } = useParams();
  const { userDetails } = useContext(UserContext);

  /**
   * This useEffect is to call api to get the template json file
   */
  useEffect(() => {
    if (templateId) {
      console.log("templateId", templateId);
      fetch(`http://localhost:9400/forms/${templateId}`)
        .then((data) => data.json())
        .then((data) => {
          console.log("data", data.data);
          const newTemplate = {
            formName: data.data?.formName,
            formType: data.data?.formType,
            baseFormId: data.data?.baseFormId || 0,
            entityType: data.data?.entityType,
            stepperNumber: parseInt(data.data?.stepperNumber),
            formSchema: data.data.formFieldsList,
            formLayoutSchema: data.data.formSchemaList,
          };
          setTemplate(newTemplate);
        });
    } else {
      setTemplate(null);
    }
  }, [templateId]);

  /**
   * This useEffect is to load the unused fields json file
   */
  useEffect(() => {
    import(`../unusedfields/accountUnsedField.json`).then((data) => {
      const newData = JSON.parse(JSON.stringify(data.default));
      setUnusedFields(newData);
      console.log("UnusedFields ASYNC", data.default);
    });
  }, [template]);

  // Stringify all object values if they are objects in an array
  const stringifyObj = (array) => {
    // loop through array and stringify all object values if they are objects
    const newArray = array.map((item) => {
      const newItem = { ...item };
      for (const key in newItem) {
        if (typeof newItem[key] === "object") {
          newItem[key] = JSON.stringify(newItem[key]);
        }
      }
      return newItem;
    });
    return newArray;
  };

  console.log("template", template);

  return (
    <div>
      {/* {template && ( */}
        <FormBuilder
          initialFormState={template ? "update" : "create"}
          template={template}
          fields={unusedFields}
          userDetails={userDetails}
          onSubmit={(values, formFields, formState) => {
            if (formState === "create") {
              console.log("Create a new Form");
            } else {
              console.log("Update existing form: " + templateId);
            }
          }}
          onSave={(
            formName,
            formOptions,
            formFields,
            formLayoutSchema,
            formState
          ) => {
            if (formState === "create") {
              console.log("Create a new Form");
              const JSONData = {
                formName: formName,
                formType: formOptions.formType,
                baseFormId: formOptions.baseFormId,
                entityType: formOptions.entityType,
                stepperNumber: formOptions.stepperNumber,
                formFieldsList: stringifyObj(formFields),
                formSchemaList: formLayoutSchema,
              };

              // Post using fetch
              fetch("http://localhost:9400/forms", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(JSONData),
              })
                .then((res) => res.json())
                .then((data) => {
                  console.log("Success:", data);
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            } else {
              console.log("Update existing form: " + templateId);
              // Update form with put
              fetch(`http://localhost:9400/forms/${templateId}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  formName: formName,
                  formType: formOptions.formType,
                  baseFormId: formOptions.baseFormId,
                  entityType: formOptions.entityType,
                  stepperNumber: formOptions.stepperNumber,
                  formFieldsList: stringifyObj(formFields),
                  formSchemaList: formLayoutSchema,
                }),
              })
                .then((res) => {
                  console.log("Success:", res);
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            }
          }}
        />
      {/* )} */}
    </div>
  );
};

export default FormBuilderAPIPage;
