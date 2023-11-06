import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";


import { FormBuilder } from "@workspace/common";
import { useDispatch, useSelector } from "react-redux";
import { createForm, updateForm, fetchForm } from "../../store/forms/action";
import { JsonHelper } from "@workspace/common";

const FormbuilderMain = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [unusedFields, setUnusedFields] = useState(null);
  const { templateId } = useParams();

  const form = useSelector((state) => state.FormReducer.form);

  /**
   * This useEffect is to call api to get the template json file
   */
  useEffect(() => {
    if (templateId) {
      dispatch(fetchForm(templateId));
    }
  }, [templateId]);

  /**
   * This useEffect is to load the unused fields json file
   */
  useEffect(() => {
    import(
      `../../../../common/src/Components/DynamicForm/unusedfields/accountUnsedField.json`
    ).then((data) => {
      const newData = JSON.parse(JSON.stringify(data.default));
      setUnusedFields(newData);
      console.log("UnusedFields ASYNC", data.default);
    });
  }, [form]);

  /**
   * This method is to save create or update form
   * @param {*} formName
   * @param {*} formOptions
   * @param {*} formFields
   * @param {*} formLayoutSchema
   * @param {*} formState
   */
  const handleSave = (
    formName,
    formOptions,
    formFields,
    formLayoutSchema,
    formState
  ) => {
    const JSONData = {
      formName: formName,
      formType: formOptions.formType,
      formCategory: formOptions.formCategory,
      baseFormId: formOptions.baseFormId,
      entityType: formOptions.entityType,
      stepperNumber: formOptions.stepperNumber,
      formFieldsList: JsonHelper.stringifyArrayObjectValues(formFields),
      formSchemaList: formLayoutSchema,
    };

    if (formState === "create") {
      console.log("Create a new Form");
      dispatch(
        createForm({
          newForm: JSONData,
          navigate,
          path: "/settings/customisation",
        })
      );
    } else {
      console.log("Update existing form: " + templateId);
      dispatch(
        updateForm({
          formId: templateId,
          updatedForm: JSONData,
          navigate,
          path: "/settings/customisation",
        })
      );
    }
  };

  return (
    <div className="" style={{marginTop:"60px",marginBottom:"60px"}}>
      <FormBuilder
        initialFormState={form ? "update" : "create"}
        template={form}
        userDetails={null}
        onSubmit={(values, formFields, formState) => {
          if (formState === "create") {
            console.log("Create a new Form");
          } else {
            console.log("Update existing form: " + templateId);
          }
        }}
        onSave={handleSave}
      />
    </div>
  );
};

export default FormbuilderMain;
