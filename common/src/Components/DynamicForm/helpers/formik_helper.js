import * as Yup from "yup";
import {
  checkVisibleConditions,
  checkVisibleOnCountry,
  checkAccessible,
  checkVisibleOnGlobalCountry,
} from "../formelements/formElements_helper";

// Generate the initial values for Formik
const generateInitialValues = (formFieldData, formik) => {
  const initialValues = formFieldData?.reduce((acc, field) => {
    if (field.type === "checkbox") {
      return { ...acc, [field.name]: [] };
    }

    // if (field.type === "multifile") {
    //   return { ...acc, [field.name]: [] };
    // }

    // If there is a subname, then add it to the initial values
    if (field.subName && field.subName !== "") {
      return {
        ...acc,
        [field.name]: "",
        [field.subName]: "",
      };
    }

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
          fieldValidation = Yup.mixed();
          break;
        case "multifile":
          fieldValidation = Yup.array();
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
const generateValidationSchema2 = (
  formFieldData,
  formik,
  userDetails,
  country
) => {
  const validationSchema = Yup.object(
    formFieldData?.reduce((acc, field) => {
      if (
        (formik &&
          (!checkVisibleConditions(field, formik) ||
            (field.countryOptions?.countryField === ""
              ? !checkVisibleOnGlobalCountry(field, country)
              : !checkVisibleOnCountry(field, formik)))) ||
        !checkAccessible(field, userDetails) ||
        !field.isUsed
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
        case "multifile":
          fieldValidation = Yup.mixed();
          break;
        // case "multifile":
        //   fieldValidation = Yup.array();
        //   break;
        case "date":
          fieldValidation = Yup.date();
          break;
        default:
          fieldValidation = Yup.string();
          break;
      }

      if (
        (field.required === "true" || field.required === true) &&
        field.type !== "multifile"
      ) {
        fieldValidation = fieldValidation.required(field.requiredErrorMessage);
      }

      if (
        (field.required === "true" || field.required === true) &&
        field.type === "multifile"
      ) {
        fieldValidation = fieldValidation.test(
          "fileRequired",
          field.requiredErrorMessage,
          (value) => {
            if (value?.length === 0 || value === "") return false;
            return true;
          }
        );
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

      if (field.type === "file") {
        if (field.fileTypeValidation) {
          fieldValidation = fieldValidation.test(
            "fileType",
            field.fileTypeValidationErrorMessage,
            (value) => {
              if (!value) return true; // allow empty values
              const validExtensions = field.fileTypeValidation; // List of valid extensions
              let extension = null;
              if (value?.name) {
                extension = value.name.split(".").pop(); // Extract extension
              } else {
                extension = value.split(".").pop(); // Extract extension
              }
              return validExtensions.includes(extension);
            }
          );
        }

        if (field.fileSizeValidation) {
          fieldValidation = fieldValidation.test(
            "fileSize",
            field.fileSizeValidationErrorMessage,
            (value) => {
              if (!value || value === undefined) return true; // allow empty values
              if (typeof value === "string") return true; // allow empty values
              const maxFileSize =
                parseInt(field.fileSizeValidation) * 1024 * 1024; // Maximum file size (in bytes)
              return value.size <= maxFileSize;
            }
          );
        }
      }

      if (field.type === "multifile") {
        if (field.fileTypeValidation) {
          fieldValidation = fieldValidation.test(
            "fileType",
            field.fileTypeValidationErrorMessage,
            (value) => {
              if (value?.length === 0 || typeof value === "string") return true; // allow empty values
              if (!value) return true; // allow empty values
              if (value?.length > 0) {
                let isValid = true;
                value?.forEach((file) => {
                  const validExtensions = field.fileTypeValidation; // List of valid extensions
                  let extension = null;
                  if (file?.name) {
                    extension = file.name.split(".").pop(); // Extract extension
                  } else {
                    extension = file.split(".").pop(); // Extract extension
                  }
                  if (!validExtensions.includes(extension)) {
                    isValid = false;
                  }
                });
                return isValid;
              }
            }
          );
        }

        if (field.fileSizeValidation) {
          fieldValidation = fieldValidation.test(
            "fileSize",
            field.fileSizeValidationErrorMessage,
            (value) => {
              if (value?.length === 0 || typeof value === "string") return true;
              if (!value || value === undefined) return true; // allow empty values
              if (value?.length > 0) {
                let isValid = true;
                value?.forEach((file) => {
                  const maxFileSize =
                    parseInt(field.fileSizeValidation) * 1024 * 1024; // Maximum file size (in bytes)
                  if (file.size > maxFileSize) {
                    isValid = false;
                  }
                });
                return isValid;
              }
            }
          );
        }
      }

      // Perform custom condition validation
      if (field?.conditionValidation?.length > 0) {
        fieldValidation = fieldValidation.test(
          "conditionValidation",
          field.conditionValidationErrorMessage,
          (value) => {
            if (!value) return true; // allow empty values
            let isValid = true;
            field?.conditionValidation.forEach((condition) => {
              if (condition.field === "" && condition.value === "") return true;
              const valueToCompare =
                condition?.value || formik?.values[condition?.field];
              if (valueToCompare === undefined) return true;

              if (condition?.condition === "equals") {
                if (value === valueToCompare) {
                  isValid = false;
                }
              }
              if (condition?.condition === "notEqual") {
                if (value !== valueToCompare) {
                  isValid = false;
                }
              }
              if (condition?.condition === "greaterThan") {
                if (value > valueToCompare) {
                  isValid = false;
                }
              }
              if (condition?.condition === "lessThan") {
                if (value < valueToCompare) {
                  isValid = false;
                }
              }
              if (condition?.condition === "greaterThanOrEqual") {
                if (value >= valueToCompare) {
                  isValid = false;
                }
              }
              if (condition?.condition === "lessThanOrEqual") {
                if (value <= valueToCompare) {
                  isValid = false;
                }
              }
              if (condition?.condition === "before") {
                // Compare dates
                if (new Date(value) < new Date(valueToCompare)) {
                  isValid = false;
                }
              }
              if (condition?.condition === "after") {
                // Compare dates
                if (new Date(value) > new Date(valueToCompare)) {
                  isValid = false;
                }
              }
              if (condition?.condition === "beforeOrEqual") {
                // Compare dates
                if (new Date(value) <= new Date(valueToCompare)) {
                  isValid = false;
                }
              }
              if (condition?.condition === "afterOrEqual") {
                // Compare dates
                if (new Date(value) >= new Date(valueToCompare)) {
                  isValid = false;
                }
              }
            });
            return isValid;
          }
        );
      }

      return { ...acc, [field.name]: fieldValidation };
    }, {})
  );

  return validationSchema;
};

// Generate validation schema for field Builder
const generateValidationSchemaForFieldBuilder = (schema, type) => {
  const validationSchema = Yup.object(
    schema?.reduce((acc, field) => {
      if (!field.apply.includes(type)) return acc;

      let fieldValidation = null;
      switch (field?.type) {
        case "text":
          fieldValidation = Yup.string();
          break;
      }

      field?.validation?.forEach((validation) => {
        if (validation.required) {
          fieldValidation = fieldValidation.required(validation.message);
        }
        if (validation.minLength) {
          fieldValidation = fieldValidation.min(
            validation.minLength,
            validation.message
          );
        }
        if (validation.maxLength) {
          fieldValidation = fieldValidation.max(
            validation.maxLength,
            validation.message
          );
        }
        if (validation.email) {
          fieldValidation = fieldValidation.email(validation.message);
        }
      });

      return { ...acc, [field.name]: fieldValidation };
    }, {})
  );
  return validationSchema;
};

export {
  generateInitialValues,
  generateValidationSchema,
  generateValidationSchema2,
  generateValidationSchemaForFieldBuilder,
};
