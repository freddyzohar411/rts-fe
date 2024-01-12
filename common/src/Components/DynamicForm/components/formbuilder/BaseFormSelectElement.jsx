import React, { useState, useEffect } from "react";
import { JsonHelper } from "@workspace/common";
import axios from "axios";
import { FORM_URL } from "../../../../config";

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

  useEffect(() => {
    axios(`${FORM_URL}/api/forms/base`)
      .then((data) => {
        setBaseFormList(data.data);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    if (baseFormId && baseFormId !== 0) {
      axios(`${FORM_URL}/api/forms/${baseFormId}`).then((data) => {
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
      }).catch((err) => {
        // Check error is 404
        if (err.code === 404) {
          setFormOptions((prev) => ({
            ...prev,
            baseFormId: null,
          }));
        }
      });
    } else {
      setBaseFormTemplate(null);
    }
  }, [baseFormId]);

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
