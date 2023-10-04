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

/**
 * Generate Form Field based on 1 form field in HTML
 * @param {*} field
 * @param {*} formik
 */
const generateFormField = (field, formik, deleteTableData, setFormState) => {
  const { type } = field;

  if (
    type === "text" ||
    type === "email" ||
    type === "number" ||
    type === "password" ||
    type === "date"
  ) {
    return <InputElement field={field} formik={formik} />;
  }

  if (type === "file") {
    return <FileInputElement field={field} formik={formik} />;
  }

  if (type === "textarea") {
    return <TextAreaElement field={field} formik={formik} />;
  }

  if (type === "select") {
    return <SelectElement field={field} formik={formik} />;
  }

  if (type === "radio") {
    return <RadioElement field={field} formik={formik} />;
  }

  if (type === "checkbox") {
    return <CheckboxElement field={field} formik={formik} />;
  }

  if (type === "selectindustry") {
    return <IndustrySelectElement formik={formik} field={field} />;
  }

  if (type === "selectsubindustry") {
    return <SubIndustrySelectElement formik={formik} field={field} />;
  }

  if (type === "selectcountry") {
    return <CountrySelectElement formik={formik} field={field} />;
  }

  if (type === "selectstate") {
    return <StateSelectElement formik={formik} field={field} />;
  }

  if (type === "table") {
    return (
      <TableElement
        field={field}
        formik={formik}
        deleteTableData={deleteTableData}
        setFormState={setFormState}
      />
    );
  }

  if (type === "button") {
    return <ButtonElement field={field} />;
  }

  if (type === "word") {
    return <TextElement field={field} />;
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
        if (formik.values[condition.field] === condition.value) {
          visble = false;
        }
      }

      if (condition.condition === "notEquals") {
        if (formik.values[condition.field] !== condition.value) {
          visble = false;
        }
      }

      if (condition.condition === "contains") {
        if (formik.values[condition.field]?.includes(condition.value)) {
          visble = false;
        }
      }

      if (condition.condition === "notContains") {
        if (!formik.values[condition.field]?.includes(condition.value)) {
          visble = false;
        }
      }

      if (condition.condition === "greaterThan") {
        if (formik.values[condition.field] > condition.value) {
          visble = false;
        }
      }

      if (condition.condition === "lessThan") {
        if (formik.values[condition.field] < condition.value) {
          visble = false;
        }
      }

      if (condition.condition === "greaterThanEquals") {
        if (formik.values[condition.field] >= condition.value) {
          visble = false;
        }
      }

      if (condition.condition === "lessThanEquals") {
        if (formik.values[condition.field] <= condition.value) {
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
  // Get country field
  // If country field is included in country list, then show field
  if (field.countryOptions?.countryList.includes(country)) {
    return true;
  }
  return false;
};

const checkAccessible = (field, userDetails) => {
  if (!userDetails) return true;
  // Check if field is accessible based on user role
  if (!field?.userGroup) return true;
  if (field?.userGroup.length === 0) return true;
  if (!userDetails?.userGroup) return true;
  const userGroupArray = userDetails?.userGroup.split(",");
  // Check if user is in userGroup. userDetails?.userGroup is an array
  if (userGroupArray.some((r) => field.userGroup.includes(r))) {
    return true;
  }
  return false;
};

export {
  generateFormField,
  checkVisibleConditions,
  checkVisibleOnCountry,
  checkVisibleOnGlobalCountry,
  checkAccessible,
};
