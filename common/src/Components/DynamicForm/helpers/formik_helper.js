import * as Yup from "yup";
import {
  checkVisibleConditions,
  checkVisibleOnCountry,
  checkAccessible,
  checkVisibleOnGlobalCountry,
} from "../formelements/formElements_helper";

// Generate the initial values for Formik
const generateInitialValues = (formFieldData) => {
  const initialValues = formFieldData?.reduce((acc, field) => {
    if (field.type === "checkbox") {
      return { ...acc, [field.name]: [] };
    }
    // if (field.name === "") return acc;

    return { ...acc, [field.name]: "" };
  }, {});

  return initialValues;
};

// Generate validation schema
const generateValidationSchema = (formFieldData) => {
  const validationSchema = Yup.object(
    formFieldData?.reduce((acc, field) => {
      if (!field.validation) return acc;
      let fieldValidation;

      switch (field.type) {
        case "string":
          fieldValidation = Yup.string();
          break;
        case "number":
          fieldValidation = Yup.number();
          break;
        case "file":
          // fieldValidation = Yup.mixed().test(
          //   "fileType",
          //   "Invalid file type",
          //   (value) => {
          //     return value && value.type.startsWith("image/");
          //   }
          // );
          fieldValidation = Yup.mixed();
          break;
        default:
          fieldValidation = Yup.string();
          break;
      }

      for (const rule of field.validation) {
        if (rule.required) {
          fieldValidation = fieldValidation.required(rule.message);
        }
        if (rule.minLength) {
          fieldValidation = fieldValidation.min(rule.minLength, rule.message);
        }
        if (rule.maxLength) {
          fieldValidation = fieldValidation.max(rule.maxLength, rule.message);
        }
        if (rule.email) {
          fieldValidation = fieldValidation.email(rule.message);
        }
      }

      return { ...acc, [field.name]: fieldValidation };
    }, {})
  );

  return validationSchema;
};

// Generate validation schema 2 Using Yup
const generateValidationSchema2 = (formFieldData, formik, userDetails, country) => {
  const validationSchema = Yup.object(
    formFieldData?.reduce((acc, field) => {
      // if (field.name === "") return acc;
      // Check if field is visible and if not, skip
      if (
        (formik &&
          (!checkVisibleConditions(field, formik) ||
            (field.countryOptions?.countryField === ""
              ? !checkVisibleOnGlobalCountry(field, country)
              : !checkVisibleOnCountry(field, formik)))) ||
        !checkAccessible(field, userDetails)
      ) {
        return acc;
      }

      let fieldValidation;

      switch (field.type) {
        case "text":
        case "password":
        case "email":
        case "textarea":
          fieldValidation = Yup.string();
          break;
        case "number":
          fieldValidation = Yup.number();
          break;
        case "file":
        case "checkbox":
        case "radio":
        case "select":
          fieldValidation = Yup.mixed();
          break;
        case "date":
          fieldValidation = Yup.date();
          break;
        default:
          fieldValidation = Yup.string();
          break;
      }

      if (field.required === "true") {
        fieldValidation = fieldValidation.required(field.requiredErrorMessage);
      }

      // String
      if (field.minLength) {
        fieldValidation = fieldValidation.min(
          +field.minLength,
          field.minLengthErrorMessage
        );
      }
      if (field.maxLength) {
        fieldValidation = fieldValidation.max(
          field.maxLength,
          field.maxLengthErrorMessage
        );
      }
      if (field.emailValidation) {
        fieldValidation = fieldValidation.email(
          field.emailValidationErrorMessage
        );
      }
      if (field.pattern) {
        fieldValidation = fieldValidation.matches(
          field.pattern,
          field.patternValidationErrorMessage
        );
      }

      // Number
      if (field.minValue) {
        fieldValidation = fieldValidation.min(
          field.minValue,
          field.minValueErrorMessage
        );
      }
      if (field.maxValue) {
        fieldValidation = fieldValidation.max(
          field.maxValue,
          field.maxValueErrorMessage
        );
      }

      // File
      if (field.fileTypeValidation) {
        fieldValidation = fieldValidation.test(
          "fileType",
          field.fileTypeValidationErrorMessage,
          (value) => {
            if (!value) return true; // allow empty values
            const validExtensions = field.fileTypeValidation; // List of valid extensions
            const extension = value.name.split(".").pop(); // Extract extension
            return validExtensions.includes(extension);
          }
        );
      }

      if (field.fileSizeValidation) {
        fieldValidation = fieldValidation.test(
          "fileSize",
          field.fileSizeValidationErrorMessage,
          (value) => {
            if (!value) return true; // allow empty values
            const maxFileSize =
              parseInt(field.fileSizeValidation) * 1024 * 1024; // Maximum file size (in bytes)
            console.log("Max file size allowable", maxFileSize);
            console.log("File size", value.size);
            return value.size <= maxFileSize;
          }
        );
      }

      return { ...acc, [field.name]: fieldValidation };
    }, {})
  );

  return validationSchema;
};

export {
  generateInitialValues,
  generateValidationSchema,
  generateValidationSchema2,
};
