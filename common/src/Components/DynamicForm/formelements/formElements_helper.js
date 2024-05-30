import IndustrySelectElement from "./IndustrySelectElement";
import SubIndustrySelectElement from "./SubIndustrySelectElement";
import InputElement from "./InputElement";
import FileInputElement from "./FileInputElement";
import TextAreaElement from "./TextAreaElement";
import SelectElement from "./SelectElement";
import RadioElement from "./RadioElement";
import CheckboxElement from "./CheckboxElement";
import CountrySelectElement from "./CountrySelectElement";
import StateSelectElement from "./StateSelectElement";
import TableElement from "./TableElement";
import ButtonElement from "./ButtonElement";
import TextElement from "./TextElement";
import CurrencyElement from "./CurrencyElement";
import LandlineElement from "./LandlineElement";
import CitySelectElement from "./CitySelectElement";
import ButtonUpdateElement from "./ButtonUpdateElement";
import DepartmentSelectElement from "./DepartmentSelectElement";
import EditorElement from "./EditorElement";
import AccountParentElement from "./AccountParentElement";
import SearchSelect from "./SearchSelect";
import MultiSelectElement from "./MultiSelectElement";
import SingleSelectElement from "./SingleSelectElement";
import SingleSelectAPIElement from "./SingleSelectAPIElement";
import MultiSelectAPIElement from "./MultiSelectAPIElement";
import MultiFileInputElement from "./MultiFileInputElement";
import AccountNameSelectElement from "./AccountNameSelectElement";
import AccountNameSelectAllElement from "./AccountNameSelectElementAll";
import AccountContactSelectElement from "./AccountContactSelectElement";
import AccountOwnerElement from "./AccountOwnerElement";
import FormTemplateSelectElement from "./FormTemplateSelectElement";
import MultiInputElement from "./MultiInputElement";
import ProfileFeedbackStatusSelectElement from "./ProfileFeedbackStatusSelectElement";
import AccountOwnerSelectElement from "./AccountOwnerSelectElement";
import AccountTypeElement from "./AccountTypeElement";
import DragDropFilesElement from "./DragDropFilesElement";
import EditorElement2 from "./EditorElement2"

/**
 * Generate Form Field based on 1 form field in HTML
 * @param {*} field
 * @param {*} formik
 */
const generateFormField = (
  field,
  formik,
  deleteTableData,
  buttonNameHook,
  formStateHook,
  formFieldsHook,
  tabIndexData
) => {
  const { type } = field;

  if (
    type === "text" ||
    type === "email" ||
    type === "number" ||
    type === "password" ||
    type === "date"
  ) {
    return (
      <InputElement
        field={field}
        formik={formik}
        formStateHook={formStateHook}
        tabIndexData={tabIndexData}
      />
    );
  }

  if (type === "file") {
    return (
      <FileInputElement
        field={field}
        formik={formik}
        formStateHook={formStateHook}
        tabIndexData={tabIndexData}
      />
    );
  }

  if (type === "textarea") {
    return (
      <TextAreaElement
        field={field}
        formik={formik}
        formStateHook={formStateHook}
        tabIndexData={tabIndexData}
      />
    );
  }

  if (type === "select") {
    return (
      <SelectElement
        field={field}
        formik={formik}
        formStateHook={formStateHook}
        tabIndexData={tabIndexData}
      />
    );
  }

  if (type === "radio") {
    return (
      <RadioElement
        field={field}
        formik={formik}
        formStateHook={formStateHook}
        tabIndexData={tabIndexData}
      />
    );
  }

  if (type === "checkbox") {
    return (
      <CheckboxElement
        field={field}
        formik={formik}
        formStateHook={formStateHook}
        tabIndexData={tabIndexData}
      />
    );
  }

  if (type === "selectindustry") {
    return (
      <IndustrySelectElement
        formik={formik}
        field={field}
        formStateHook={formStateHook}
        tabIndexData={tabIndexData}
      />
    );
  }

  if (type === "selectaccountname") {
    return (
      <AccountNameSelectElement
        formik={formik}
        field={field}
        formStateHook={formStateHook}
        tabIndexData={tabIndexData}
      />
    );
  }

  if (type === "selectaccountnameall") {
    return (
      <AccountNameSelectAllElement
        formik={formik}
        field={field}
        formStateHook={formStateHook}
        tabIndexData={tabIndexData}
      />
    );
  }

  if (type === "selectaccountcontact") {
    return (
      <AccountContactSelectElement
        formik={formik}
        field={field}
        formStateHook={formStateHook}
        tabIndexData={tabIndexData}
      />
    );
  }

  if (type === "selectprofilefeedbackstatus") {
    return (
      <ProfileFeedbackStatusSelectElement
        formik={formik}
        field={field}
        formStateHook={formStateHook}
        tabIndexData={tabIndexData}
      />
    );
  }

  if (type === "accountowner") {
    return (
      <AccountOwnerElement
        formik={formik}
        field={field}
        formStateHook={formStateHook}
        tabIndexData={tabIndexData}
      />
    );
  }

  if (type === "accounttype") {
    return (
      <AccountTypeElement
        formik={formik}
        field={field}
        formStateHook={formStateHook}
        tabIndexData={tabIndexData}
      />
    );
  }

  if (type === "selectsubindustry") {
    return (
      <SubIndustrySelectElement
        formik={formik}
        field={field}
        formStateHook={formStateHook}
        tabIndexData={tabIndexData}
      />
    );
  }

  if (type === "selectaccountowner") {
    return (
      <AccountOwnerSelectElement
        formik={formik}
        field={field}
        formStateHook={formStateHook}
        tabIndexData={tabIndexData}
      />
    );
  }

  if (type === "selectcountry") {
    return (
      <CountrySelectElement
        formik={formik}
        field={field}
        formStateHook={formStateHook}
        tabIndexData={tabIndexData}
      />
    );
  }

  if (type === "selectstate") {
    return (
      <StateSelectElement
        formik={formik}
        field={field}
        formStateHook={formStateHook}
        tabIndexData={tabIndexData}
      />
    );
  }

  if (type === "table") {
    return (
      <TableElement
        field={field}
        formik={formik}
        deleteTableData={deleteTableData}
        setFormState={formStateHook.setFormState}
        formFieldsHook={formFieldsHook}
        formStateHook={formStateHook}
        tabIndexData={tabIndexData}
      />
    );
  }

  if (type === "selectcurrency") {
    return (
      <CurrencyElement
        field={field}
        formik={formik}
        formStateHook={formStateHook}
        tabIndexData={tabIndexData}
      />
    );
  }

  if (type === "selectlandline") {
    return (
      <LandlineElement
        field={field}
        formik={formik}
        formStateHook={formStateHook}
        tabIndexData={tabIndexData}
      />
    );
  }

  if (type === "selectcity") {
    return (
      <CitySelectElement
        field={field}
        formik={formik}
        formStateHook={formStateHook}
        tabIndexData={tabIndexData}
      />
    );
  }

  if (type === "selectdepartment") {
    return (
      <DepartmentSelectElement
        field={field}
        formik={formik}
        formStateHook={formStateHook}
        tabIndexData={tabIndexData}
      />
    );
  }

  if (type === "editor") {
    return (
      <EditorElement
        field={field}
        formik={formik}
        formStateHook={formStateHook}
        tabIndexData={tabIndexData}
      />
    );
  }

  if (type === "editor2") {
    return (
      <EditorElement2
        field={field}
        formik={formik}
        formStateHook={formStateHook}
        tabIndexData={tabIndexData}
      />
    );
  }

  if (type === "parentcompany") {
    return (
      <AccountParentElement
        field={field}
        formik={formik}
        formStateHook={formStateHook}
        tabIndexData={tabIndexData}
      />
    );
  }

  if (type === "searchselect") {
    return (
      <SearchSelect
        field={field}
        formik={formik}
        formStateHook={formStateHook}
        tabIndexData={tabIndexData}
      />
    );
  }

  if (type === "singleselect") {
    return (
      <SingleSelectElement
        field={field}
        formik={formik}
        formStateHook={formStateHook}
        tabIndexData={tabIndexData}
      />
    );
  }

  if (type === "multiselect") {
    return (
      <MultiSelectElement
        field={field}
        formik={formik}
        formStateHook={formStateHook}
        tabIndexData={tabIndexData}
      />
    );
  }

  if (type === "singleselectapi") {
    return (
      <SingleSelectAPIElement
        field={field}
        formik={formik}
        formStateHook={formStateHook}
        tabIndexData={tabIndexData}
      />
    );
  }

  if (type === "multiselectapi") {
    return (
      <MultiSelectAPIElement
        field={field}
        formik={formik}
        formStateHook={formStateHook}
        tabIndexData={tabIndexData}
      />
    );
  }

  if (type === "multifile") {
    return (
      <MultiFileInputElement
        field={field}
        formik={formik}
        formStateHook={formStateHook}
        formFieldsHook={formFieldsHook}
        tabIndexData={tabIndexData}
      />
    );
  }

  if (type === "dragdropfiles") {
    return (
      <DragDropFilesElement
        field={field}
        formik={formik}
        formStateHook={formStateHook}
        formFieldsHook={formFieldsHook}
        tabIndexData={tabIndexData}
      />
    );
  }

  if (type === "selectformtemplate") {
    return (
      <FormTemplateSelectElement
        field={field}
        formik={formik}
        formStateHook={formStateHook}
        tabIndexData={tabIndexData}
      />
    );
  }

  if (type === "multiinput") {
    return (
      <MultiInputElement
        field={field}
        formik={formik}
        formStateHook={formStateHook}
        tabIndexData={tabIndexData}
      />
    );
  }

  // text & button
  if (type === "word") {
    return <TextElement field={field} />;
  }

  if (type === "button") {
    return (
      <ButtonElement
        field={field}
        buttonNameHook={buttonNameHook}
        tabIndexData={tabIndexData}
      />
    );
  }

  if (type === "buttonupdate") {
    return (
      <ButtonUpdateElement
        formik={formik}
        field={field}
        buttonNameHook={buttonNameHook}
        formStateHook={formStateHook}
        tabIndexData={tabIndexData}
      />
    );
  }
};

// Check if field is visible based on conditions
const checkVisibleConditions = (field, formik) => {
  if (!field?.visible) return true;

  const conditions = field?.visible;
  let visble = true;
  if (conditions.length > 0) {
    conditions.forEach((condition) => {
      if (condition.condition === "equals") {
        if (formik.values?.[condition.field] === condition.value) {
          visble = false;
        }
      }

      if (condition.condition === "notEquals") {
        if (formik.values?.[condition.field] !== condition.value) {
          visble = false;
        }
      }

      if (condition.condition === "contains") {
        if (formik?.values?.[condition.field] && condition.value) {
          if (formik?.values?.[condition.field]?.includes(condition.value)) {
            visble = false;
          }
        }
      }

      if (condition.condition === "notContains") {
        if (!formik.values?.[condition.field]?.includes(condition.value)) {
          visble = false;
        }
      }

      if (condition.condition === "greaterThan") {
        if (formik.values?.[condition.field] > condition.value) {
          visble = false;
        }
      }

      if (condition.condition === "lessThan") {
        if (formik.values?.[condition.field] < condition.value) {
          visble = false;
        }
      }

      if (condition.condition === "greaterThanEquals") {
        if (formik.values?.[condition.field] >= condition.value) {
          visble = false;
        }
      }

      if (condition.condition === "lessThanEquals") {
        if (formik.values?.[condition.field] <= condition.value) {
          visble = false;
        }
      }
    });
  }

  return visble;
};

const checkVisibleOnCountry = (field, formik) => {
  if (!field?.countryOptions) return true;
  if (!field?.countryOptions.countryField) return true;
  if (!field?.countryOptions.countryList.length === 0) return true;
  // Get country field
  const countryField = formik.values[field.countryOptions.countryField];
  // If country field is included in country list, then show field
  if (field.countryOptions.countryList.includes(countryField)) {
    return true;
  }
  return false;
};

const checkVisibleOnGlobalCountry = (field, country) => {
  if (field?.countryOptions?.countryList.length === 0) return true;
  if (field.countryOptions?.countryList.includes(country)) {
    return true;
  }
  return false;
};

// const checkAccessible = (field, userDetails) => {
//   if (!userDetails) return true;
//   // Check if field is accessible based on user role
//   if (!field?.userGroup) return true;
//   if (field?.userGroup.length === 0) return true;
//   if (!userDetails?.userGroup) return true;
//   const userGroupArray = userDetails?.userGroup.split(",");
//   // Check if user is in userGroup. userDetails?.userGroup is an array
//   if (userGroupArray.some((r) => field.userGroup.includes(r))) {
//     return true;
//   }
//   return false;
// };

const checkAccessible = (field, userDetails) => {
  if (!field?.userGroup) return true;
  if (field?.userGroup.length === 0) return true;

  // As userGroup is an array, check if any of the userGroup is in userDetails

  const userDetailsLowerCase = userDetails?.map((user) => user.toLowerCase());
  for (const userGroup of field.userGroup) {
    if (userDetailsLowerCase?.includes(userGroup.toLowerCase())) {
      return true;
    }
  }
  return false;

  // return true;
};

const checkCopyFieldConditions = (field, formik) => {
  if (!field.copyFields.copyField) return false;
  let conditionMet = true;
  for (const copyField of field.copyFields.conditionList) {
    if (copyField.condition === "equals") {
      if (formik.values[copyField.field] !== copyField.value) {
        conditionMet = false;
      }
    }

    if (copyField.condition === "notEquals") {
      if (formik.values[copyField.field] === copyField.value) {
        conditionMet = false;
      }
    }

    if (copyField.condition === "contains") {
      if (!formik.values[copyField.field]?.includes(copyField.value)) {
        conditionMet = false;
      }
    }

    if (copyField.condition === "notContains") {
      if (formik.values[copyField.field]?.includes(copyField.value)) {
        conditionMet = false;
      }
    }
  }
  return conditionMet;
};

export {
  generateFormField,
  checkVisibleConditions,
  checkVisibleOnCountry,
  checkVisibleOnGlobalCountry,
  checkAccessible,
  checkCopyFieldConditions,
};
