import React, { useState, useEffect } from "react";
import { JsonHelper } from "@workspace/common";
import axios from "axios";

const BaseFormSelectElement = ({
  setBaseFormTemplate,
  setFormOptions,
  initialBaseFormId,
}) => {
  const [baseFormList, setBaseFormList] = useState(null);
  const [baseFormId, setBaseFormId] = useState(initialBaseFormId);
  //   const [baseFormTemplate, setBaseFormTemplate] = useState(null);

  useEffect(() => {
    if (initialBaseFormId) {
      setBaseFormId(initialBaseFormId);
    }
  }, [initialBaseFormId]);

  console.log("BaseFormId:", baseFormId);

  useEffect(() => {
    axios(`http://localhost:9400/forms/base`)
      .then((data) => {
        console.log("BASE FORMS: ", data);
        setBaseFormList(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log("Base Form List: ", baseFormList);

  useEffect(() => {
    console.log("Base form Id: ", baseFormId);
    if (baseFormId && baseFormId !== 0) {
      axios(`http://localhost:9400/forms/${baseFormId}`).then((data) => {
        console.log(data);
        const newTemplate = {
          formName: data.data?.formName,
          formType: data.data?.formType,
          baseFormId: data.data?.baseFormId || 0,
          entityType: data.data?.entityType,
          formStepperNumber: data.data?.formStepperNumber,
          formSchema: JsonHelper.parseArrayObjectValues(
            data?.data?.formFieldsList
          ),
          formLayoutSchema: data.data.formSchemaList,
        };
        setBaseFormTemplate(newTemplate);
        setFormOptions((prev) => ({
          ...prev,
          baseFormId: baseFormId,
        }));
      });
    } else {
      setBaseFormTemplate(null);
    }
  }, [baseFormId]);

  console.log("base form List: ", baseFormList);

  return (
    <>
      {baseFormList && (
        <div>
          <label className="form-label">Base Form</label>
          <select
            onChange={(e) => {
              setBaseFormId(parseInt(e.target.value));
            }}
            value={baseFormId}
            className="form-select"
          >
            <option value={0}>Select Base Form</option>
            {baseFormList.map((baseForm) => (
              <option key={baseForm.formId} value={baseForm.formId}>
                {baseForm.formName}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
};

export default BaseFormSelectElement;
