import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Card, CardBody, FormFeedback } from "reactstrap";
import {
  generateInitialValues,
  generateValidationSchemaForFieldBuilder,
} from "../../helpers/formik_helper";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuid } from "uuid";
import CountrySelectField from "../../fieldbuilders/CountrySelectField";
import UserGroupSelectField from "../../fieldbuilders/UserGroupSelectField";
import FormCategorySelectField from "../../fieldbuilders/FormCategorySelectField";
import useFieldBuilderValidationHook from "./FieldBuilderValidationHook";

const FieldBuilder = ({
  type,
  addFormField,
  setFormBuilderType,
  formBuilderUpdateData,
  updateFormField,
  setFormBuilderUpdateData,
  setFormFieldId,
  formFields,
  setShowModalSchema,
  formOptions,
}) => {
  const [validationSchema, setValidationSchema] = useState(null);
  const [initialValues, setInitialValues] = useState({});
  const [uuidKey, setUuidKey] = useState(
    !formBuilderUpdateData?.label ? formBuilderUpdateData?.name : uuid()
  );

  useEffect(() => {
    if (!uuidKey) {
      setUuidKey(uuid());
    }
  }, [uuidKey]);

  //========================= States ================================
  // Condition validation state
  const [validationConditionList, setValidationConditionList] = useState(
    formBuilderUpdateData?.conditionValidation
      ? formBuilderUpdateData.conditionValidation
      : []
  );
  // ========================= Field Setting =========================
  const generateList = (type) => {
    if (type === "singleselectapi" || type === "multiselectapi") {
      return [
        {
          label: "Industry",
          value: "industry",
        },
        {
          label: "Country",
          value: "country",
        },
        {
          label: "Department",
          value: "department",
        },
        {
          label: "Sub Industry",
          value: "subIndustry",
        },
        {
          label: "City",
          value: "city",
        },
        {
          label: "Form",
          value: "form",
        },
      ];
    }
    return [
      {
        label: "Primary Skills",
        value: "primarySkills",
      },
      {
        label: "Secondary Skills",
        value: "secondarySkills",
      },
      {
        label: "Spoken languages",
        value: "spokenLanguages",
      },
      {
        label: "Employment Type",
        value: "employmentType",
      },
      {
        label: "Location Type",
        value: "locationType",
      },
      {
        label: "Qualifications",
        value: "qualifications",
      },
      {
        label: "Visa Status",
        value: "visaStatus",
      },
    ];
  };

  const [config, setConfig] = useState([
    {
      label: "Label",
      type: "text",
      name: "label",
      apply: [
        "text",
        "email",
        "number",
        "textarea",
        "file",
        "select",
        "radio",
        "checkbox",
        "password",
        "date",
        "selectindustry",
        "selectsubindustry",
        "selectaccountowner",
        "selectcountry",
        "selectstate",
        "selectcity",
        "selectcurrency",
        "selectlandline",
        "selectaccountname",
        "selectaccountnameall",
        "selectaccountcontact",
        "selectcandidatestatus",
        "selectprofilefeedbackstatus",
        "selectfirstintrvfdbkstatus",
        "selectsecondintrvfdbkstatus",
        "accountowner",
        "submit",
        "table",
        "selectdepartment",
        "editor",
        "parentcompany",
        "searchselect",
        "multiselect",
        "singleselect",
        "singleselectapi",
        "multiselectapi",
        "multifile",
        "selectformtemplate",
        "multiinput",
      ],
    },
    {
      label: "Sub Name/Key",
      type: "text",
      name: "subName",
      apply: ["selectcurrency", "selectlandline"],
      validation: [
        {
          required: true,
          message: "Sub key is required",
        },
        {
          keyDuplication: true,
          message: "Key already exists",
        },
      ],
    },
    {
      label: "Name/Key",
      type: "text",
      name: "name",
      apply: [
        "text",
        "email",
        "number",
        "textarea",
        "file",
        "select",
        "radio",
        "checkbox",
        "password",
        "date",
        "selectindustry",
        "selectsubindustry",
        "selectaccountowner",
        "selectcountry",
        "selectcity",
        "selectcurrency",
        "selectstate",
        "selectlandline",
        "selectdepartment",
        "selectaccountname",
        "selectaccountnameall",
        "selectaccountcontact",
        "selectcandidatestatus",
        "selectprofilefeedbackstatus",
        "selectfirstintrvfdbkstatus",
        "selectsecondintrvfdbkstatus",
        "accountowner",
        "editor",
        "table",
        "parentcompany",
        "searchselect",
        "multiselect",
        "singleselect",
        "singleselectapi",
        "multiselectapi",
        "multifile",
        "selectformtemplate",
        "multiinput",
      ],
      validation: [
        {
          required: true,
          message: "Key is required",
        },
        {
          keyDuplication: true,
          message: "Key already exists",
        },
      ],
      events: {
        disabled: false,
      },
    },
    {
      label: "Placeholder",
      type: "text",
      name: "placeholder",
      apply: [
        "text",
        "email",
        "number",
        "textarea",
        "file",
        "select",
        "radio",
        "checkbox",
        "password",
        "selectindustry",
        "selectsubindustry",
        "selectaccountowner",
        "selectcountry",
        "selectcity",
        "selectcurrency",
        "selectstate",
        "selectlandline",
        "selectdepartment",
        "selectaccountname",
        "selectaccountnameall",
        "selectaccountcontact",
        "selectcandidatestatus",
        "selectprofilefeedbackstatus",
        "selectfirstintrvfdbkstatus",
        "selectsecondintrvfdbkstatus",
        "accountowner",
        "editor",
        "parentcompany",
        "searchselect",
        "multiselect",
        "singleselect",
        "singleselectapi",
        "multiselectapi",
        "multifile",
        "selectformtemplate",
        "multiinput",
      ],
    },
    {
      label: "Field Location",
      type: "radio",
      name: "fieldLocation",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
      defaultValue: formBuilderUpdateData?.fieldLocation || "left",
      apply: [
        "text",
        "email",
        "number",
        "textarea",
        "file",
        "select",
        "radio",
        "checkbox",
        "password",
        "date",
        "selectindustry",
        "selectsubindustry",
        "selectaccountowner",
        "selectcountry",
        "selectcity",
        "selectcurrency",
        "selectstate",
        "selectlandline",
        "selectdepartment",
        "selectaccountname",
        "selectaccountnameall",
        "selectaccountcontact",
        "selectcandidatestatus",
        "selectprofilefeedbackstatus",
        "selectfirstintrvfdbkstatus",
        "selectsecondintrvfdbkstatus",
        "accountowner",
        "editor",
        "button",
        "buttonupdate",
        "parentcompany",
        "searchselect",
        "multiselect",
        "singleselect",
        "singleselectapi",
        "multiselectapi",
        "multifile",
        "selectformtemplate",
        "multiinput",
      ],
    },
    {
      label: "Field Size",
      type: "radio",
      name: "fieldSize",
      options: [
        { label: "Auto", value: "auto" },
        { label: "25%", value: "25%" },
        { label: "50%", value: "50%" },
        { label: "75%", value: "75%" },
        { label: "100%", value: "100%" },
      ],
      defaultValue: formBuilderUpdateData?.fieldSize || "100%",
      apply: [
        "text",
        "email",
        "number",
        "textarea",
        "file",
        "select",
        "radio",
        "checkbox",
        "password",
        "date",
        "selectindustry",
        "selectsubindustry",
        "selectaccountowner",
        "selectcountry",
        "selectcity",
        "selectcurrency",
        "selectstate",
        "selectlandline",
        "selectdepartment",
        "selectaccountname",
        "selectaccountnameall",
        "selectaccountcontact",
        "selectcandidatestatus",
        "selectprofilefeedbackstatus",
        "selectfirstintrvfdbkstatus",
        "selectsecondintrvfdbkstatus",
        "accountowner",
        "editor",
        // "button",
        // "buttonupdate"
        "parentcompany",
        "searchselect",
        "multiselect",
        "singleselect",
        "singleselectapi",
        "multiselectapi",
        "multifile",
        "selectformtemplate",
        "multiinput",
      ],
    },
    {
      label: "Module",
      type: "select",
      name: "module",
      options: [
        {
          label: "Account",
          value: "account",
        },
        {
          label: "Job",
          value: "job",
        },
        {
          label: "Candidate",
          value: "candidate",
        },
      ],
      apply: ["searchselect"],
    },
    {
      label: "Search Query Key",
      type: "text",
      name: "queryKey",
      apply: ["searchselect"],
    },
    {
      label: "Select List",
      type: "select",
      name: "list",
      options: generateList(type),
      apply: [
        "multiselect",
        "singleselect",
        "singleselectapi",
        "multiselectapi",
      ],
    },
    {
      label: "Form Category",
      type: "formcategoryselect",
      name: "formCategorySelect",
      apply: ["selectformtemplate"],
    },
    {
      label: "Options",
      type: "keyvalue",
      name: "options",
      apply: ["radio", "select", "multiselect", "checkbox", "singleselect"],
    },
    {
      label: "Required",
      type: "radio",
      name: "required",
      defaultValue: formBuilderUpdateData?.required?.toString() || "false",
      options: [
        { label: "Yes", value: "true" },
        { label: "No", value: "false" },
      ],
      apply: [
        "text",
        "email",
        "number",
        "textarea",
        "file",
        "select",
        "radio",
        "checkbox",
        "password",
        "date",
        "selectindustry",
        "selectsubindustry",
        "selectaccountowner",
        "selectcountry",
        "selectcity",
        "selectcurrency",
        "selectstate",
        "selectlandline",
        "selectdepartment",
        "selectaccountname",
        "selectaccountnameall",
        "selectaccountcontact",
        "selectcandidatestatus",
        "selectprofilefeedbackstatus",
        "selectfirstintrvfdbkstatus",
        "selectsecondintrvfdbkstatus",
        "accountowner",
        "editor",
        "parentcompany",
        "searchselect",
        "multiselect",
        "singleselect",
        "singleselectapi",
        "multiselectapi",
        "multifile",
        "selectformtemplate",
        "multiinput",
      ],
    },
    {
      label: "Required Error Message",
      type: "text",
      name: "requiredErrorMessage",
      apply: [
        "text",
        "email",
        "number",
        "textarea",
        "file",
        "select",
        "radio",
        "checkbox",
        "password",
        "date",
        "selectindustry",
        "selectsubindustry",
        "selectaccountowner",
        "selectcountry",
        "selectcity",
        "selectcurrency",
        "selectstate",
        "selectlandline",
        "selectdepartment",
        "selectaccountname",
        "selectaccountnameall",
        "selectaccountcontact",
        "selectcandidatestatus",
        "selectprofilefeedbackstatus",
        "selectfirstintrvfdbkstatus",
        "selectsecondintrvfdbkstatus",
        "accountowner",
        "editor",
        "parentcompany",
        "searchselect",
        "multiselect",
        "singleselect",
        "singleselectapi",
        "multiselectapi",
        "multifile",
        "selectformtemplate",
        "multiinput",
      ],
      isDisabled: true,
      validation: [
        {
          required: false,
          message: "Required error message is required",
        },
      ],
    },
    {
      label: "Validation Regex",
      type: "text",
      name: "pattern",
      apply: ["text", "email", "textarea", "password"],
    },
    {
      label: "Pattern Validation Error Message",
      type: "text",
      name: "patternValidationErrorMessage",
      apply: ["text", "email", "textarea", "password"],
    },
    {
      label: "Min Length",
      type: "number",
      name: "minLength",
      apply: ["text", "email", "textarea", "password"],
    },
    {
      label: "Min Length Error Message",
      type: "text",
      name: "minLengthErrorMessage",
      apply: ["text", "email", "textarea", "password"],
    },
    {
      label: "Max Length",
      type: "number",
      name: "maxLength",
      apply: ["text", "email", "textarea", "password"],
    },
    {
      label: "Max Length Error Message",
      type: "text",
      name: "maxLengthErrorMessage",
      apply: ["text", "email", "textarea", "password"],
    },
    {
      label: "Email Validation",
      type: "radio",
      name: "emailValidation",
      defaultValue:
        formBuilderUpdateData?.emailValidation?.toString() || "false",
      options: [
        { label: "Yes", value: "true" },
        { label: "No", value: "false" },
      ],
      apply: ["email"],
    },
    {
      label: "Email Validation Error Message",
      type: "text",
      name: "emailValidationErrorMessage",
      apply: ["email"],
    },
    {
      label: "Max Value",
      type: "number",
      name: "maxValue",
      apply: ["number"],
    },
    {
      label: "Max Value Error Message",
      type: "text",
      name: "maxValueErrorMessage",
      apply: ["number"],
    },
    {
      label: "Min Value",
      type: "number",
      name: "minValue",
      apply: ["number"],
    },
    {
      label: "Min Value Error Message",
      type: "text",
      name: "minValueErrorMessage",
      // events: {
      //   disabled: true,
      // },
      apply: ["number"],
    },
    {
      // Allow multiple types of files
      label: "File Type Validation",
      type: "multiselect",
      name: "fileTypeValidation",
      options: [
        // { label: "All file types", value: "" },
        { label: "pdf", value: "pdf" },
        { label: "doc", value: "doc" },
        { label: "docx", value: "docx" },
        { label: "xls", value: "xls" },
        { label: "jpg", value: "jpg" },
        { label: "jpeg", value: "jpeg" },
        { label: "png", value: "png" },
      ],
      apply: ["file", "multifile"],
    },
    {
      label: "File Type Validation Error Message",
      type: "text",
      name: "fileTypeValidationErrorMessage",
      apply: ["file", "multifile"],
    },
    {
      label: "File Size Validation (MB)",
      type: "number",
      name: "fileSizeValidation",
      apply: ["file", "multifile"],
    },
    {
      label: "File Size Validation Error Message",
      type: "text",
      name: "fileSizeValidationErrorMessage",
      apply: ["file", "multifile"],
    },

    {
      label: "Parent",
      type: "select",
      name: "parent",
      options: formFields.map((field) => ({
        label: field.name,
        value: field.name,
      })),
      apply: [
        "selectsubindustry",
        "selectstate",
        "selectcity",
        "singleselectapi",
      ],
    },
    {
      label: "Visible Off (Conditions)",
      type: "visible",
      name: "visible",
      conditionTypes: [
        "equals",
        "notEquals",
        "contains",
        "notContains",
        "greaterThan",
        "lessThan",
        "greaterThanOrEqual",
        "lessThanOrEqual",
        "startsWith",
        "endsWith",
        "isEmpty",
        "isNotEmpty",
      ],
      apply: [
        "text",
        "email",
        "number",
        "textarea",
        "file",
        "select",
        "radio",
        "checkbox",
        "password",
        "date",
        "selectindustry",
        "selectsubindustry",
        "selectaccountowner",
        "selectcity",
        "selectcountry",
        "selectcurrency",
        "selectlandline",
        "selectstate",
        "selectdepartment",
        "selectaccountname",
        "selectaccountnameall",
        "selectaccountcontact",
        "selectcandidatestatus",
        "selectprofilefeedbackstatus",
        "selectfirstintrvfdbkstatus",
        "selectsecondintrvfdbkstatus",
        "accountowner",
        "editor",
        "parentcompany",
        "searchselect",
        "multiselect",
        "singleselect",
        "singleselectapi",
        "multiselectapi",
        "selectformtemplate",
      ],
    },
    {
      label: "Conditional Validation",
      type: "conditionalValidation",
      name: "conditionalValidation",
      conditionTypes: [
        "equals",
        "notEquals",
        "contains",
        "notContains",
        "greaterThan",
        "lessThan",
        "greaterThanOrEqual",
        "lessThanOrEqual",
        "startsWith",
        "endsWith",
        "isEmpty",
        "isNotEmpty",
        "before",
        "beforeOrEqual",
        "after",
        "afterOrEqual",
      ],
      apply: [
        "text",
        "email",
        "number",
        "textarea",
        "file",
        "select",
        "radio",
        "checkbox",
        "password",
        "date",
        "selectindustry",
        "selectsubindustry",
        "selectaccountowner",
        "selectcity",
        "selectcountry",
        "selectcurrency",
        "selectlandline",
        "selectstate",
        "selectdepartment",
        "editor",
        "parentcompany",
        "searchselect",
        "multiselect",
        "singleselect",
        "singleselectapi",
        "multiselectapi",
        "selectaccountnameall",
        "selectformtemplate",
        "multiinput",
      ],
    },
    {
      label: "Condition Validation Error Message",
      type: "text",
      name: "conditionValidationErrorMessage",
      apply: [
        "text",
        "email",
        "number",
        "textarea",
        "file",
        "select",
        "radio",
        "checkbox",
        "password",
        "date",
        "selectindustry",
        "selectsubindustry",
        "selectaccountowner",
        "selectcountry",
        "selectcity",
        "selectcurrency",
        "selectstate",
        "selectlandline",
        "selectdepartment",
        "editor",
        "parentcompany",
        "searchselect",
        "multiselect",
        "singleselect",
        "singleselectapi",
        "multiselectapi",
        "multifile",
        "selectaccountnameall",
        "selectformtemplate",
        "multiinput",
      ],
      renderCondition: validationConditionList.length > 0,
    },
    {
      label: "Copy Fields",
      type: "copyFields",
      name: "copyFields",
      conditionTypes: [
        "equals",
        "notEquals",
        "contains",
        "notContains",
        "greaterThan",
        "lessThan",
        "greaterThanOrEqual",
        "lessThanOrEqual",
        "startsWith",
        "endsWith",
        "isEmpty",
        "isNotEmpty",
      ],
      apply: [
        "text",
        "email",
        "number",
        "textarea",
        "file",
        "select",
        "radio",
        "checkbox",
        "password",
        "date",
        "selectindustry",
        "selectsubindustry",
        "selectaccountowner",
        "selectcountry",
        "selectcity",
        "selectcurrency",
        "selectlandline",
        "selectaccountname",
        "selectaccountnameall",
        "selectaccountcontact",
        "selectcandidatestatus",
        "selectprofilefeedbackstatus",
        "selectfirstintrvfdbkstatus",
        "selectsecondintrvfdbkstatus",
        "accountowner",
        "selectstate",
        "selectdepartment",
        "editor",
        "multiselect",
        "singleselect",
        "singleselectapi",
        "multiselectapi",
        "selectformtemplate",
        "multiinput",
      ],
    },
    {
      label: "User Group Access",
      type: "usergroupselect",
      name: "userGroup",
      apply: [
        "text",
        "email",
        "number",
        "textarea",
        "file",
        "select",
        "radio",
        "checkbox",
        "password",
        "date",
        "selectindustry",
        "selectsubindustry",
        "selectaccountowner",
        "selectcountry",
        "selectcity",
        "selectcurrency",
        "selectlandline",
        "selectstate",
        "selectdepartment",
        "selectaccountname",
        "selectaccountnameall",
        "selectaccountcontact",
        "selectcandidatestatus",
        "selectprofilefeedbackstatus",
        "selectfirstintrvfdbkstatus",
        "selectsecondintrvfdbkstatus",
        "accountowner",
        "editor",
        "parentcompany",
        "searchselect",
        "multiselect",
        "singleselect",
        "singleselectapi",
        "multiselectapi",
        "multifile",
        "selectformtemplate",
        "multiinput",
      ],
    },
    // Which include key value pair for table
    // Table header for user input and a select for table data
    {
      label: "Table Config",
      type: "tableConfig",
      name: "tableConfig",
      other: {
        tableData: [],
      },
      apply: ["table"],
    },
    {
      label: "Table Setting",
      type: "tableSetting",
      name: "tableSetting",
      apply: ["table"],
    },
    {
      label: "Global Country Condition (Visible On)",
      type: "countryselect",
      name: "countryOptions",
      apply: [
        "text",
        "email",
        "number",
        "textarea",
        "file",
        "select",
        "radio",
        "checkbox",
        "password",
        "date",
        "selectindustry",
        "selectsubindustry",
        "selectaccountowner",
        "selectcurrency",
        "selectlandline",
        "selectcountry",
        "selectstate",
        "selectdepartment",
        "selectaccountname",
        "selectaccountnameall",
        "selectaccountcontact",
        "selectcandidatestatus",
        "selectprofilefeedbackstatus",
        "selectfirstintrvfdbkstatus",
        "selectsecondintrvfdbkstatus",
        "accountowner",
        "parentcompany",
        "multiselect",
        "singleselect",
        "singleselectapi",
        "multiselectapi",
        "multifile",
        "selectformtemplate",
        "multiinput",
      ],
    },
    {
      label: "Field Type",
      type: "radio",
      name: "fieldType",
      options:
        formOptions.formType === "base"
          ? [
              { label: "Static", value: "static" },
              { label: "Predefined", value: "predefined" },
              { label: "Custom", value: "custom" },
            ]
          : [{ label: "Custom", value: "custom" }],
      defaultValue: formBuilderUpdateData?.fieldType || "custom",
      apply: [
        "text",
        "email",
        "number",
        "textarea",
        "file",
        "select",
        "radio",
        "checkbox",
        "password",
        "date",
        "selectindustry",
        "selectsubindustry",
        "selectaccountowner",
        "selectcountry",
        "selectcity",
        "selectcurrency",
        "selectlandline",
        "selectstate",
        "submit",
        "table",
        "selectdepartment",
        "selectaccountname",
        "selectaccountnameall",
        "selectaccountcontact",
        "selectcandidatestatus",
        "selectprofilefeedbackstatus",
        "selectfirstintrvfdbkstatus",
        "selectsecondintrvfdbkstatus",
        "accountowner",
        "editor",
        "parentcompany",
        "searchselect",
        "multiselect",
        "singleselect",
        "singleselectapi",
        "multiselectapi",
        "multifile",
        "selectformtemplate",
        "multiinput",
      ],
    },
    {
      label: "Is Used",
      type: "radio",
      name: "isUsed",
      options: [
        { label: "Yes", value: "true" },
        { label: "No", value: "false" },
      ],
      defaultValue: formBuilderUpdateData?.isUsed.toString() || "true",
      apply: [
        "text",
        "email",
        "number",
        "textarea",
        "file",
        "select",
        "radio",
        "checkbox",
        "password",
        "date",
        "selectindustry",
        "selectsubindustry",
        "selectaccountowner",
        "selectcountry",
        "selectcity",
        "selectcurrency",
        "selectlandline",
        "selectstate",
        "selectaccountname",
        "selectaccountnameall",
        "selectaccountcontact",
        "selectcandidatestatus",
        "selectprofilefeedbackstatus",
        "selectfirstintrvfdbkstatus",
        "selectsecondintrvfdbkstatus",
        "accountowner",
        "submit",
        "table",
        "selectdepartment",
        "editor",
        "parentcompany",
        "searchselect",
        "multiselect",
        "singleselect",
        "singleselectapi",
        "multiselectapi",
        "multifile",
        "selectformtemplate",
        "multiinput",
      ],
    },
    {
      label: "Information",
      type: "radio",
      name: "information",
      defaultValue: formBuilderUpdateData?.information?.toString() || "false",
      options: [
        { label: "Yes", value: "true" },
        { label: "No", value: "false" },
      ],
      apply: [
        "text",
        "email",
        "number",
        "textarea",
        "file",
        "select",
        "radio",
        "checkbox",
        "password",
        "date",
        "selectindustry",
        "selectsubindustry",
        "selectaccountowner",
        "selectcountry",
        "selectcity",
        "selectcurrency",
        "selectstate",
        "selectlandline",
        "selectdepartment",
        "selectaccountname",
        "selectaccountnameall",
        "selectaccountcontact",
        "selectcandidatestatus",
        "selectprofilefeedbackstatus",
        "selectfirstintrvfdbkstatus",
        "selectsecondintrvfdbkstatus",
        "accountowner",
        "editor",
        "parentcompany",
        "searchselect",
        "multiselect",
        "singleselect",
        "singleselectapi",
        "multiselectapi",
        "multifile",
        "selectformtemplate",
        "multiinput",
      ],
    },
    {
      label: "Information Text",
      type: "text",
      name: "informationText",
      apply: [
        "text",
        "email",
        "number",
        "textarea",
        "file",
        "select",
        "radio",
        "checkbox",
        "password",
        "date",
        "selectindustry",
        "selectsubindustry",
        "selectaccountowner",
        "selectcountry",
        "selectcity",
        "selectcurrency",
        "selectstate",
        "selectlandline",
        "selectdepartment",
        "selectaccountname",
        "selectaccountnameall",
        "selectaccountcontact",
        "selectcandidatestatus",
        "selectprofilefeedbackstatus",
        "selectfirstintrvfdbkstatus",
        "selectsecondintrvfdbkstatus",
        "accountowner",
        "editor",
        "parentcompany",
        "searchselect",
        "multiselect",
        "singleselect",
        "singleselectapi",
        "multiselectapi",
        "multifile",
        "selectformtemplate",
        "multiinput",
      ],
    },
    {
      label: "Button Text",
      type: "text",
      name: "buttonText",
      apply: ["button", "buttonupdate"],
    },
    {
      label: "Button name",
      type: "text",
      name: "buttonName",
      apply: ["button", "buttonupdate"],
    },
    {
      label: "Button Type",
      type: "radio",
      name: "buttonType",
      options: [
        { label: "Button", value: "button" },
        { label: "Submit", value: "submit" },
      ],
      defaultValue: formBuilderUpdateData?.buttonType || "button",
      apply: ["button", "buttonupdate"],
    },
    {
      label: "Button Class",
      type: "text",
      name: "buttonClass",
      apply: ["button", "buttonupdate"],
    },
    {
      label: "Text",
      type: "textarea",
      name: "wordText",
      apply: ["word"],
    },
    {
      label: "Text Size",
      type: "text",
      name: "wordSize",
      apply: ["word"],
    },
  ]);

  let schema = config;
  let header = null;
  // Based on type determine which config to use
  switch (type) {
    case "text":
      header = "Text Field";
      break;
    case "email":
      header = "Email Field";
      break;
    case "number":
      header = "Number Field";
      break;
    case "file":
      header = "File Field";
      break;
    case "textarea":
      header = "Textarea Field";
      break;
    case "select":
      header = "Select Field";
      break;
    case "radio":
      header = "Radio Field";
      break;
    case "checkbox":
      header = "Checkbox Field";
      break;
    case "password":
      header = "Password Field";
      break;
    case "selectindustry":
      header = "Select Industry Field";
      break;
    case "selectsubindustry":
      header = "Select Sub Industry Field";
      break;
    case "selectaccountowner":
      header = "Select Account Owner";
      break;
    case "selectaccountname":
      header = "Select Account Name";
      break;
    case "selectaccountnameall":
      header = "Select Account Names All";
      break;
    case "selectaccountcontact":
      header = "Select Account Contact";
      break;
    case "selectcandidatestatus":
      header = "Select Candidate Status";
      break;
    case "selectprofilefeedbackstatus":
      header = "Select Profile Feedback Status";
      break;
    case "selectfirstintrvfdbkstatus":
      header = "Select First Interview Feedback Status";
      break;
    case "selectsecondintrvfdbkstatus":
      header = "Select Second Interview Feedback Status";
      break;
    case "accountowner":
      header = "Account Owner";
      break;
    case "date":
      header = "Date Field";
      break;
    case "selectcountry":
      header = "Select Country Field";
      break;
    case "selectstate":
      header = "Select State Field";
    case "table":
      header = "Table Field";
      break;
    case "button":
      header = "Button Field";
      break;
    case "buttonupdate":
      header = "Button Update Field";
      break;
    case "word":
      header = "Word Field";
      break;
    case "selectcurrency":
      header = "Select Currency Field";
      break;
    case "selectlandline":
      header = "Select Landline Field";
      break;
    case "selectcity":
      header = "Select City Field";
      break;
    case "selectdepartment":
      header = "Select Department Field";
      break;
    case "selectindustry":
      header = "Select Industry Field";
      break;
    case "selectindustry":
      header = "Select Industry Field";
      break;
    case "editor":
      header = "Editor Field";
      break;
    case "parentcompany":
      header = "Parent Company Field";
      break;
    case "searchselect":
      header = "Search Select Field";
      break;
    case "singleselect":
      header = "Single Select Field";
      break;
    case "multiselect":
      header = "Multi Select Field";
      break;
    case "singleselectapi":
      header = "Single Select API Field";
      break;
    case "multiselectapi":
      header = "Multi Select API Field";
      break;
    case "multifile":
      header = "Multi File Field";
      break;
    case "selectformtemplate":
      header = "Select Form Template Field";
      break;
    default:
  }

  //Additional default key value
  const defaultKeyValue = {
    // isUsed: false,
    type: type,
    fieldId: uuid(),
  };
  //=======================Config UseEffect================================
  useEffect(() => {
    if (validationConditionList?.length > 0) {
      setConfig((prev) => {
        return prev.map((item) => {
          if (item.name === "conditionValidationErrorMessage") {
            item.renderCondition = true;
            item.validation = [
              {
                required: true,
                message: "Condition validation error message is required",
              },
            ];
          }
          return item;
        });
      });
    } else {
      formik?.setFieldValue("conditionValidationErrorMessage", "");
      setConfig((prev) => {
        return prev.map((item) => {
          if (item.name === "conditionValidationErrorMessage") {
            item.renderCondition = false;
            item.validation = [];
          }
          return item;
        });
      });
    }
  }, [validationConditionList?.length]);

  // ================================================================
  // Table setting
  const [tableSetting, setTableSetting] = useState(
    formBuilderUpdateData?.tableSetting
      ? formBuilderUpdateData.tableSetting
      : {
          tableEdit: false,
          tableDelete: false,
          tableUseAPI: false,
          tableGetAPI: "",
          tableDeleteAPI: "",
          tableRenderer: false,
          tableEditId: null,
        }
  );

  // Form Template
  const [formCategory, setFormCategory] = useState(
    formBuilderUpdateData?.formCategorySelect || ""
  );

  // User group List
  const [formCategoryList, setFormCategoryList] = useState(
    formBuilderUpdateData?.formCategory || []
  );

  // User group
  const [userGroup, setUserGroup] = useState("");

  // User group List
  const [userGroupList, setUserGroupList] = useState(
    formBuilderUpdateData?.userGroup || []
  );

  // Country
  const [country, setCountry] = useState("");

  // Country Key value pair
  const [countryList, setCountryList] = useState(
    formBuilderUpdateData?.countryOptions
      ? formBuilderUpdateData.countryOptions
      : {
          countryField: "",
          countryList: [],
        }
  );

  // Table key value pair for table configuration
  const [tableConfig, setTableConfig] = useState(
    formBuilderUpdateData?.tableConfig ? formBuilderUpdateData.tableConfig : []
  );

  // Key visible condition state
  const [conditionList, setConditionList] = useState(
    formBuilderUpdateData?.visible ? formBuilderUpdateData.visible : []
  );

  // Key copy condition state
  const [copyConditionList, setCopyConditionList] = useState(
    formBuilderUpdateData?.copyFields
      ? formBuilderUpdateData?.copyFields
      : { copyField: "", conditionList: [] }
  );

  // Key value state
  const [keyValueList, setKeyValueList] = useState(
    formBuilderUpdateData?.options ? formBuilderUpdateData.options : []
  );

  // Check if type contains within apply array
  const ifContainsType = (type, apply) => {
    return apply.includes(type);
  };

  // Generate initial values for formik
  useEffect(() => {
    if (config && !formBuilderUpdateData) {
      setInitialValues(generateInitialValues(config));
      setValidationSchema(
        generateValidationSchemaForFieldBuilder(
          config,
          type,
          formFields,
          formBuilderUpdateData
        )
      );
    }
  }, []);

  const returnUpdateDataWithoutNull = (data) => {
    let newData = {};
    for (let key in data) {
      if (data[key] !== null) {
        newData[key] = data[key];
      } else {
        newData[key] = "";
      }
    }
    return newData;
  };

  useEffect(() => {
    if (formBuilderUpdateData) {
      setInitialValues(returnUpdateDataWithoutNull(formBuilderUpdateData));
    }
  }, [formBuilderUpdateData]);

  // Handle Submit
  const handleFormSchemaSubmit = (values) => {
    let validationSchema = { ...values };
    if (formBuilderUpdateData) {
      validationSchema = { ...formBuilderUpdateData, ...values };
      validationSchema.type = formBuilderUpdateData.type;
      if (
        type === "radio" ||
        type === "select" ||
        type === "multiselect" ||
        type === "checkbox" ||
        type === "singleselect"
      ) {
        validationSchema.options = keyValueList;
      }
      if (type === "table") {
        validationSchema.tableConfig = tableConfig;
        validationSchema.tableData = formBuilderUpdateData.tableData;
        validationSchema.tableRerender = true;
        validationSchema.tableSetting = tableSetting;
      }

      validationSchema.countryOptions = countryList;
      validationSchema.visible = conditionList;
      validationSchema.copyFields = copyConditionList;
      validationSchema.userGroup = userGroupList;
      validationSchema.conditionValidation = validationConditionList;
      validationSchema.formCategorySelect = formCategory;

      updateFormField(validationSchema, formBuilderUpdateData.index);
      setFormBuilderType(null);
      setFormBuilderUpdateData(null);
    } else {
      validationSchema = { ...values, ...defaultKeyValue };
      // If it is a radio or select or multiselect field
      if (
        type === "radio" ||
        type === "select" ||
        type === "multiselect" ||
        type === "checkbox" ||
        type === "singleselect"
      ) {
        validationSchema.options = keyValueList;
      }
      if (type === "table") {
        validationSchema.tableConfig = tableConfig;
        validationSchema.tableData = [];
        validationSchema.tableRerender = true;
        validationSchema.tableSetting = tableSetting;
      }
      validationSchema.countryOptions = countryList;
      validationSchema.visible = conditionList;
      validationSchema.copyFields = copyConditionList;
      validationSchema.userGroup = userGroupList;
      validationSchema.conditionValidation = validationConditionList;
      validationSchema.formCategorySelect = formCategory;

      addFormField(validationSchema);
      // Set Form Schema
      setFormFieldId(validationSchema.fieldId);
      setFormBuilderType(null);
    }
    setShowModalSchema(false);
  };

  // Formik for form field creation
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleFormSchemaSubmit,
  });

  // Field Builder Validation Hook to handle validation in builder form
  useFieldBuilderValidationHook(formik, config, setConfig);

  // Set validation schema on config change (Update validation schema)
  useEffect(() => {
    if (formik) {
      setValidationSchema(
        generateValidationSchemaForFieldBuilder(
          config,
          type,
          formFields,
          formBuilderUpdateData
        )
      );
    }
  }, [config]);

  // Set default radio value
  useEffect(() => {
    if (formik && config) {
      config?.forEach((field) => {
        if (field.type === "radio" && field?.defaultValue) {
          formik?.setFieldValue(field.name, field.defaultValue);
        }
      });
    }
  }, [initialValues]);

  const checkRadioEquality = (value, fieldValue) => {
    // Check if it is boolean than convert into string
    if (typeof value === "boolean") {
      value = value.toString();
    }
    return value === fieldValue;
  };

  function toCamelCase(str) {
    return (
      str
        // Lowercase the string to ensure consistent processing
        .toLowerCase()
        // Split the string into words
        .split(" ")
        // Map each word to either itself (if it's the first word) or the word with its first letter capitalized
        .map((word, index) => {
          if (index === 0) {
            return word; // Return the first word as is (in lowercase)
          }
          // Capitalize the first letter of each subsequent word
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        // Join the words together without spaces
        .join("")
    );
  }

  // Add UUID to key field if no value
  useEffect(() => {
    if (formik?.values["name"] === "") {
      formik.setFieldValue(["name"], uuidKey);
    }
  }, [formik?.values["name"]]);

  useEffect(() => {
    if (
      formBuilderUpdateData &&
      formBuilderUpdateData?.label !== formik?.values["label"]
    ) {
      if (formik?.values["label"] && formik?.values["name"] !== "") {
        formik.setFieldValue(
          ["name"],
          `${toCamelCase(formik?.values["label"])}`
        );
      }
    }

    if (!formBuilderUpdateData) {
      if (formik?.values["label"] && formik?.values["name"] !== "") {
        formik.setFieldValue(
          ["name"],
          `${toCamelCase(formik?.values["label"])}`
        );
      }
    }

    if (formik?.values["label"] === "") {
      formik.setFieldValue(["name"], uuidKey);
    }
  }, [formik?.values["label"]]);

  return (
    <div className="bg-light">
      <form onSubmit={formik.handleSubmit}>
        <Card>
          <CardBody>
            <div className="mb-3">
              <span className="h5">{header}</span>
            </div>
            {schema?.map((field, index) => {
              if (
                field.type === "text" &&
                ifContainsType(type, field.apply) &&
                (field.renderCondition ?? true)
              ) {
                return (
                  // TEXT FIELD
                  <div className="mb-3">
                    <label htmlFor={field.name} className="form-label">
                      {field.label}
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      placeholder={`Enter ${field.label}`}
                      className="form-control"
                      onChange={formik.handleChange}
                      value={formik.values[field.name]}
                      disabled={field.isDisabled ?? false}
                      {...field.events}
                    />
                    {formik.errors[field.name] && formik.touched[field.name] ? (
                      <div className="mt-2 text-danger">
                        {formik.errors[field.name]}
                      </div>
                    ) : null}
                  </div>
                );
              } else if (
                field.type === "textarea" &&
                ifContainsType(type, field.apply)
              ) {
                return (
                  // TEXTAREA FIELD
                  <div className="mb-3">
                    <label htmlFor={field.name} className="form-label">
                      {field.label}
                    </label>
                    <textarea
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      className="form-control"
                      onChange={formik.handleChange}
                      value={formik.values[field.name]}
                      {...field.events}
                    />
                    {formik.errors[field.name] && formik.touched[field.name] ? (
                      <div className="mt-2">{formik.errors[field.name]}</div>
                    ) : null}
                  </div>
                );
              } else if (
                field.type === "select" &&
                ifContainsType(type, field.apply)
              ) {
                return (
                  // SELECT FIELD
                  <div className="mb-3">
                    <label htmlFor={field.name} className="form-label">
                      {field.label}
                    </label>
                    <select
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      className="form-control"
                      onChange={formik.handleChange}
                      value={formik.values[field.name]}
                    >
                      <option value="">{`Select a ${field.name}`}</option>
                      {field.options.map((option) => {
                        return (
                          <option value={option.value}>{option.label}</option>
                        );
                      })}
                    </select>
                    {formik.errors[field.name] && formik.touched[field.name] ? (
                      <div className="mt-2">{formik.errors[field.name]}</div>
                    ) : null}
                  </div>
                );
              } else if (
                field.type === "radio" &&
                ifContainsType(type, field.apply)
              ) {
                return (
                  // RADIO FIELD
                  <div className="mb-3">
                    <label htmlFor={field.name} className="form-label">
                      {field.label}
                    </label>
                    <div className="d-flex gap-3">
                      {field.options.map((option) => {
                        // if (field?.defaultValue === option.value){
                        //   formik.setFieldValue(field.name, option.value);
                        // }
                        return (
                          <div className="form-check" key={option.value}>
                            <input
                              className="form-check-input"
                              type="radio"
                              name={field.name}
                              id={option.label}
                              // checked={formik.values[field.name] === option.value || field.defaultValue === option.value}
                              value={option.value} // Use option.value here
                              onChange={formik.handleChange}
                              checked={
                                checkRadioEquality(
                                  formik.values[field.name],
                                  option.value
                                )
                                //  formik?.values[field.name] === option.value
                              }
                              {...field.events}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={option.label}
                              id={option.label}
                            >
                              {option.label}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                    {formik.errors[field.name] && formik.touched[field.name] ? (
                      <div className="mt-2">{formik.errors[field.name]}</div>
                    ) : null}
                  </div>
                );
              } else if (
                field.type === "number" &&
                ifContainsType(type, field.apply)
              ) {
                return (
                  // NUMBER FIELD
                  <div className="mb-3">
                    <label htmlFor={field.name} className="form-label">
                      {field.label}
                    </label>

                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      className="form-control"
                      onChange={formik.handleChange}
                      value={formik.values[field.name]}
                      {...field.events}
                    />
                    {formik.errors[field.name] && formik.touched[field.name] ? (
                      <div className="mt-2">{formik.errors[field.name]}</div>
                    ) : null}
                  </div>
                );
              } else if (
                field.type === "multiselect" &&
                ifContainsType(type, field.apply)
              ) {
                return (
                  // MULTISELECT FIELD
                  <div className="mb-3">
                    <label htmlFor={field.name} className="form-label">
                      {field.label}
                    </label>
                    <select
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      className="form-control"
                      onChange={formik.handleChange}
                      value={formik.values[field.name]}
                      multiple
                      {...field.events}
                    >
                      {field.options.map((option) => {
                        return (
                          <option value={option.value}>{option.label}</option>
                        );
                      })}
                    </select>
                    {formik.errors[field.name] && formik.touched[field.name] ? (
                      <div className="mt-2">{formik.errors[field.name]}</div>
                    ) : null}
                  </div>
                );
              } else if (
                field.type === "keyvalue" &&
                ifContainsType(type, field.apply)
              ) {
                // KEY VALUE FIELD
                return (
                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <label htmlFor={field.name} className="form-label">
                        {field.label}
                      </label>
                      <button
                        type="button"
                        className="btn btn-custom-primary"
                        onClick={() => {
                          setKeyValueList([
                            ...keyValueList,
                            { label: "", value: "" },
                          ]);
                        }}
                      >
                        Add
                      </button>
                    </div>

                    {keyValueList.map((keyValue, index) => {
                      return (
                        <div className="d-flex gap-2 mb-3 align-items-center">
                          <span>{index + 1}) </span>
                          <input
                            id="optionLabel"
                            name="optionLabel"
                            type="text"
                            className="form-control"
                            onChange={(e) => {
                              setKeyValueList(
                                keyValueList.map((item, i) =>
                                  i === index
                                    ? { ...item, label: e.target.value }
                                    : item
                                )
                              );
                            }}
                            value={keyValue.label}
                            placeholder="label"
                          />
                          <input
                            id="optionValue"
                            name="optionValue"
                            type="text"
                            className="form-control"
                            onChange={(e) =>
                              setKeyValueList(
                                keyValueList.map((item, i) =>
                                  i === index
                                    ? { ...item, value: e.target.value }
                                    : item
                                )
                              )
                            }
                            value={keyValue.value}
                            placeholder="Value"
                          />
                          <span>
                            <AiFillDelete
                              className="cursor-pointer"
                              onClick={() => {
                                setKeyValueList(
                                  keyValueList.filter((item, i) => i !== index)
                                );
                              }}
                            />
                          </span>
                        </div>
                      );
                    })}
                  </div>
                );
              } else if (
                field.type === "visible" &&
                ifContainsType(type, field.apply)
              ) {
                return (
                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <label htmlFor={field.name} className="form-label">
                        {field.label}
                      </label>
                      <button
                        type="button"
                        className="btn btn-custom-primary"
                        onClick={() => {
                          setConditionList([
                            ...conditionList,
                            { field: "", condition: "", value: "" },
                          ]);
                        }}
                      >
                        Add
                      </button>
                    </div>
                    {conditionList.map((condition, index) => {
                      return (
                        <div className="d-flex gap-2 mb-2 align-items-center">
                          <span>{index + 1}) </span>
                          <select
                            className="form-select"
                            value={condition.field}
                            onChange={(e) =>
                              setConditionList((prev) =>
                                prev.map((item, i) =>
                                  i === index
                                    ? { ...item, field: e.target.value }
                                    : item
                                )
                              )
                            }
                          >
                            <option value="">Select a field</option>
                            {formFields.map((field) => {
                              return (
                                <option value={field.name}>{field.name}</option>
                              );
                            })}
                          </select>
                          <select
                            className="form-select"
                            value={condition.condition}
                            onChange={(e) =>
                              setConditionList((prev) =>
                                prev.map((item, i) =>
                                  i === index
                                    ? { ...item, condition: e.target.value }
                                    : item
                                )
                              )
                            }
                          >
                            <option value="">Select a condition</option>
                            {field.conditionTypes.map((conditionType) => (
                              <option value={conditionType}>
                                {conditionType}
                              </option>
                            ))}
                          </select>
                          <input
                            id="conditionValue"
                            name="conditionValue"
                            type="text"
                            className="form-control"
                            onChange={(e) =>
                              setConditionList((prev) =>
                                prev.map((item, i) =>
                                  i === index
                                    ? { ...item, value: e.target.value }
                                    : item
                                )
                              )
                            }
                            value={condition.value}
                            placeholder="Value"
                          />
                          <span>
                            <AiFillDelete
                              className="cursor-pointer text-custom-primary"
                              onClick={() => {
                                setConditionList(
                                  conditionList.filter((item, i) => i !== index)
                                );
                              }}
                            />
                          </span>
                        </div>
                      );
                    })}
                  </div>
                );
              } else if (
                field.type === "conditionalValidation" &&
                ifContainsType(type, field.apply)
              ) {
                return (
                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <label htmlFor={field.name} className="form-label">
                        {field.label}
                      </label>
                      <button
                        type="button"
                        className="btn btn-custom-primary"
                        onClick={() => {
                          setValidationConditionList([
                            ...validationConditionList,
                            { field: "", condition: "", value: "" },
                          ]);
                        }}
                      >
                        Add
                      </button>
                    </div>
                    {validationConditionList.map((condition, index) => {
                      return (
                        <div className="d-flex gap-2 mb-2 align-items-center">
                          <span>{index + 1}) </span>
                          <select
                            className="form-select"
                            value={condition.condition}
                            onChange={(e) =>
                              setValidationConditionList((prev) =>
                                prev.map((item, i) =>
                                  i === index
                                    ? { ...item, condition: e.target.value }
                                    : item
                                )
                              )
                            }
                          >
                            <option value="">Select a condition</option>
                            {field.conditionTypes.map((conditionType) => (
                              <option value={conditionType}>
                                {conditionType}
                              </option>
                            ))}
                          </select>
                          <select
                            className="form-select"
                            value={condition.field}
                            onChange={(e) => {
                              setValidationConditionList((prev) =>
                                prev.map((item, i) =>
                                  i === index
                                    ? {
                                        ...item,
                                        field: e.target.value,
                                        value: e.target.value ? "" : item.value,
                                      }
                                    : item
                                )
                              );
                            }}
                          >
                            <option value="">Select a field</option>
                            {formFields.map((field) => {
                              return (
                                <option value={field.name}>{field.name}</option>
                              );
                            })}
                          </select>
                          <span>OR</span>
                          <input
                            id="conditionValue"
                            name="conditionValue"
                            type="text"
                            className="form-control"
                            onChange={(e) =>
                              setValidationConditionList((prev) =>
                                prev.map((item, i) =>
                                  i === index
                                    ? {
                                        ...item,
                                        value: e.target.value,
                                        field: e.target.value ? "" : item.field,
                                      }
                                    : item
                                )
                              )
                            }
                            value={condition.value}
                            placeholder="Value"
                          />
                          <span>
                            <AiFillDelete
                              className="cursor-pointer text-custom-primary"
                              onClick={() => {
                                setValidationConditionList(
                                  validationConditionList.filter(
                                    (item, i) => i !== index
                                  )
                                );
                              }}
                            />
                          </span>
                        </div>
                      );
                    })}
                  </div>
                );
              } else if (
                field.type === "copyFields" &&
                ifContainsType(type, field.apply)
              ) {
                return (
                  <div className="mb-3">
                    <label htmlFor={field.name} className="form-label">
                      {field.label}
                    </label>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <select
                        className="form-select w-50"
                        value={copyConditionList.copyField}
                        onChange={(e) =>
                          setCopyConditionList((prev) => ({
                            ...prev,
                            copyField: e.target.value,
                          }))
                        }
                      >
                        <option value="">Select a field</option>
                        {formFields.map((field) => {
                          return (
                            <option value={field.name}>{field.name}</option>
                          );
                        })}
                      </select>
                      <button
                        type="button"
                        className="btn btn-custom-primary"
                        disabled={!copyConditionList.copyField}
                        onClick={() => {
                          setCopyConditionList({
                            ...copyConditionList,
                            conditionList: [
                              ...copyConditionList.conditionList,
                              { field: "", condition: "", value: "" },
                            ],
                          });
                        }}
                      >
                        Add
                      </button>
                    </div>
                    {copyConditionList.conditionList.map((condition, index) => {
                      return (
                        <div className="d-flex gap-2 mb-2 align-items-center">
                          <span>{index + 1}) </span>
                          <select
                            className="form-select"
                            value={condition.field}
                            onChange={(e) =>
                              setCopyConditionList((prev) => ({
                                ...prev,
                                conditionList: prev.conditionList.map(
                                  (item, i) =>
                                    i === index
                                      ? { ...item, field: e.target.value }
                                      : item
                                ),
                              }))
                            }
                          >
                            <option value="">Select a field</option>
                            {formFields.map((field) => {
                              return (
                                <option value={field.name}>{field.name}</option>
                              );
                            })}
                          </select>
                          <select
                            className="form-select"
                            value={condition.condition}
                            onChange={(e) =>
                              setCopyConditionList((prev) => ({
                                ...prev,
                                conditionList: prev.conditionList.map(
                                  (item, i) =>
                                    i === index
                                      ? { ...item, condition: e.target.value }
                                      : item
                                ),
                              }))
                            }
                          >
                            <option value="">Select a condition</option>
                            {field.conditionTypes.map((conditionType) => (
                              <option value={conditionType}>
                                {conditionType}
                              </option>
                            ))}
                          </select>
                          <input
                            id="conditionValue"
                            name="conditionValue"
                            type="text"
                            className="form-control"
                            onChange={(e) =>
                              setCopyConditionList((prev) => ({
                                ...prev,
                                conditionList: prev.conditionList.map(
                                  (item, i) =>
                                    i === index
                                      ? { ...item, value: e.target.value }
                                      : item
                                ),
                              }))
                            }
                            value={condition.value}
                            placeholder="Value"
                          />
                          <span>
                            <AiFillDelete
                              className="cursor-pointer text-custom-primary"
                              onClick={() => {
                                setCopyConditionList((prev) => ({
                                  ...prev,
                                  conditionList: prev.conditionList.filter(
                                    (item, i) => i !== index
                                  ),
                                }));
                              }}
                            />
                          </span>
                        </div>
                      );
                    })}
                  </div>
                );
              } else if (
                field.type === "checkbox" &&
                ifContainsType(type, field.apply)
              ) {
                return (
                  <div className="mb-3">
                    <label htmlFor={field.name} className="form-label">
                      {field.label}
                    </label>
                    <div className="d-flex gap-3">
                      {field.options.map((option) => {
                        return (
                          <div className="form-check" key={option.value}>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name={field.name}
                              id={option.value}
                              value={option.value} // Use option.value here
                              checked={formik.values[field.name]?.includes(
                                option.value
                              )}
                              onChange={(e) => {
                                // Write method in here
                                const isChecked = formik.values[
                                  field.name
                                ]?.includes(option.value);
                                if (isChecked) {
                                  formik.setFieldValue(
                                    field.name,
                                    formik.values[field.name]?.filter(
                                      (item) => item !== option.value
                                    )
                                  );
                                } else {
                                  formik.setFieldValue(field.name, [
                                    ...formik.values[field.name],
                                    option.value,
                                  ]);
                                }
                              }}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={option.label}
                              id={option.label}
                            >
                              {option.label}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                    {formik.errors[field.name] && formik.touched[field.name] ? (
                      <div className="mt-2">{formik.errors[field.name]}</div>
                    ) : null}
                  </div>
                );
              } else if (
                field.type === "tableConfig" &&
                ifContainsType(type, field.apply)
              ) {
                return (
                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <label htmlFor={field.name} className="form-label">
                        {field.label}
                      </label>
                      <button
                        type="button"
                        className="btn btn-custom-primary"
                        onClick={() => {
                          setTableConfig([
                            ...tableConfig,
                            { label: "", name: "", render: "" },
                          ]);
                        }}
                      >
                        Add
                      </button>
                    </div>
                    {tableConfig.map((config, index) => {
                      return (
                        <div className="d-flex gap-2 mb-2 align-items-center">
                          <span>{index + 1}) </span>
                          <input
                            id="configLabel"
                            name="configLabel"
                            type="text"
                            className="form-control"
                            onChange={(e) =>
                              setTableConfig((prev) =>
                                prev.map((config, i) =>
                                  i === index
                                    ? { ...config, label: e.target.value }
                                    : config
                                )
                              )
                            }
                            value={config.label}
                            placeholder="Label"
                          />
                          <select
                            className="form-select"
                            value={config.name}
                            onChange={(e) =>
                              setTableConfig((prev) =>
                                prev.map((config, i) =>
                                  i === index
                                    ? { ...config, name: e.target.value }
                                    : config
                                )
                              )
                            }
                          >
                            <option value="">Select a field</option>
                            {formFields.map((field) => {
                              return (
                                <option value={field.name}>{field.name}</option>
                              );
                            })}
                          </select>
                          <input
                            id="configRender"
                            name="configRender"
                            type="text"
                            className="form-control"
                            onChange={(e) =>
                              setTableConfig((prev) =>
                                prev.map((config, i) =>
                                  i === index
                                    ? { ...config, render: e.target.value }
                                    : config
                                )
                              )
                            }
                            value={config.render}
                            placeholder="Render"
                          />
                          <span>
                            <AiFillDelete
                              className="cursor-pointer text-custom-primary"
                              onClick={() => {
                                setTableConfig(
                                  tableConfig.filter((config, i) => i !== index)
                                );
                              }}
                            />
                          </span>
                        </div>
                      );
                    })}
                  </div>
                );
              } else if (
                field.type === "tableSetting" &&
                ifContainsType(type, field.apply)
              ) {
                return (
                  <div className="mb-3">
                    <div className="d-flex gap-3">
                      <div className="form-check mb-3">
                        <label className="form-check-label" htmlFor="tableEdit">
                          Table Edit
                        </label>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="tableEdit"
                          id="tableEdit"
                          checked={tableSetting.tableEdit}
                          onChange={(e) => {
                            setTableSetting((prev) => ({
                              ...prev,
                              tableEdit: !prev.tableEdit,
                            }));
                          }}
                        />
                      </div>
                      <div className="form-check mb-3">
                        <label
                          className="form-check-label"
                          htmlFor="tableDelete"
                        >
                          Table Delete
                        </label>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="tableDelete"
                          id="tableDelete"
                          checked={tableSetting.tableDelete}
                          onChange={(e) => {
                            setTableSetting((prev) => ({
                              ...prev,
                              tableDelete: !prev.tableDelete,
                            }));
                          }}
                        />
                      </div>
                      <div className="form-check mb-3">
                        <label
                          className="form-check-label"
                          htmlFor="tableUseAPI"
                        >
                          Table Use API
                        </label>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="tableUseAPI"
                          id="tableUseAPI"
                          checked={tableSetting.tableUseAPI}
                          onChange={(e) => {
                            setTableSetting((prev) => ({
                              ...prev,
                              tableUseAPI: !prev.tableUseAPI,
                            }));
                          }}
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="tableGetAPI" className="form-label">
                        Table Get API
                      </label>
                      <input
                        id="tableGetAPI"
                        name="tableGetAPI"
                        type="text"
                        className="form-control"
                        onChange={(e) =>
                          setTableSetting((prev) => ({
                            ...prev,
                            tableGetAPI: e.target.value,
                          }))
                        }
                        value={tableSetting.tableGetAPI}
                        placeholder="Table Get API"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="tableDeleteAPI" className="form-label">
                        Table Delete API
                      </label>
                      <input
                        id="tableDeleteAPI"
                        name="tableDeleteAPI"
                        type="text"
                        className="form-control"
                        onChange={(e) =>
                          setTableSetting((prev) => ({
                            ...prev,
                            tableDeleteAPI: e.target.value,
                          }))
                        }
                        value={tableSetting.tableDeleteAPI}
                        placeholder="Table Delete API"
                      />
                    </div>
                  </div>
                );
              } else if (
                field.type === "countryselect" &&
                ifContainsType(type, field.apply)
              ) {
                return (
                  <div className="mb-3">
                    <label htmlFor={field.name} className="form-label">
                      {field.label}
                    </label>
                    <div className="d-flex justify-content-between gap-5">
                      <div className="d-flex gap-4">
                        <CountrySelectField
                          setData={setCountry}
                          field={{
                            name: "countrySelect",
                            placeholder: "Select a country",
                          }}
                        />
                        <button
                          type="button"
                          className="btn btn-custom-primary"
                          disabled={!country}
                          onClick={() => {
                            // Check if country is already added
                            if (countryList.countryList.includes(country)) {
                              return;
                            }
                            setCountryList((prev) => {
                              return {
                                ...prev,
                                countryList: [...prev.countryList, country],
                              };
                            });
                          }}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                    <div className="d-flex gap-2 mt-2 flex-wrap">
                      {countryList?.countryList?.length > 0 &&
                        countryList.countryList.map((country) => (
                          <div
                            className="d-flex gap-3"
                            style={{
                              padding: "5px 10px",
                              backgroundColor: "grey",
                              color: "white",
                              borderRadius: "100vh",
                            }}
                          >
                            <span>{country}</span>
                            <span>
                              <AiFillDelete
                                className="cursor-pointer text-custom-primary"
                                onClick={() => {
                                  setCountryList((prev) => {
                                    const newCountryList =
                                      prev.countryList.filter(
                                        (item) => item !== country
                                      );
                                    return {
                                      ...prev,
                                      countryList: newCountryList,
                                    };
                                  });
                                }}
                              />
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                );
              } else if (
                field.type === "usergroupselect" &&
                ifContainsType(type, field.apply)
              ) {
                return (
                  <div className="mb-3">
                    <label htmlFor={field.name} className="form-label">
                      {field.label}
                    </label>
                    <div className="d-flex justify-content-between gap-5">
                      <div className="d-flex gap-4">
                        <UserGroupSelectField
                          setData={setUserGroup}
                          field={{
                            name: "usergroupselect",
                            placeholder: "Select a usergroup",
                          }}
                        />
                        <button
                          type="button"
                          className="btn btn-custom-primary btn-sm px-3"
                          disabled={!userGroup}
                          onClick={() => {
                            // Check usergroup is already added
                            if (userGroupList?.includes(userGroup)) {
                              return;
                            }
                            setUserGroupList((prev) => [...prev, userGroup]);
                          }}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                    <div className="d-flex gap-2 mt-2 flex-wrap">
                      {userGroupList?.length > 0 &&
                        userGroupList?.map((usergroup) => (
                          <div
                            className="d-flex gap-3"
                            style={{
                              padding: "5px 10px",
                              backgroundColor: "grey",
                              color: "white",
                              borderRadius: "100vh",
                            }}
                          >
                            <span>{usergroup}</span>
                            <span>
                              <AiFillDelete
                                className="cursor-pointer text-custom-primary"
                                onClick={() => {
                                  setUserGroupList((prev) => {
                                    const newUserGroupList = prev.filter(
                                      (item) => item !== usergroup
                                    );
                                    return [...newUserGroupList];
                                  });
                                }}
                              />
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                );
              } else if (
                field.type === "formcategoryselect" &&
                ifContainsType(type, field.apply)
              ) {
                return (
                  <div className="mb-3">
                    <label htmlFor={field.name} className="form-label">
                      {field.label}
                    </label>
                    <div className="d-flex justify-content-between gap-5">
                      <div className="d-flex gap-4">
                        <FormCategorySelectField
                          setData={setFormCategory}
                          value={formCategory}
                          field={{
                            name: "formcategoryselect",
                            placeholder: "Select a form category",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </CardBody>
        </Card>

        <div className="d-flex justify-content-end gap-3 mt-4">
          {formBuilderUpdateData ? (
            <button type="submit" className="btn btn-custom-primary">
              Update Field
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-custom-primary"
              // onClick={firstHandleFormSubmit}
            >
              Create Field
            </button>
          )}

          <button
            type="button"
            className="btn btn-custom-primary"
            onClick={() => {
              setFormBuilderUpdateData(null);
              setFormBuilderType(null);
              setShowModalSchema(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default FieldBuilder;
