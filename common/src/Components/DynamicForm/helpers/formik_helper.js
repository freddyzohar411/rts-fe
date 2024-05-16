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

const populateInitialValues = (formFieldData, editData) => {
  const initialValues = formFieldData?.reduce((acc, field) => {
    if (field.type === "checkbox") {
      return { ...acc, [field?.name]: editData?.[field.name] ?? [] };
    }

    // if (field.type === "multifile") {
    //   return { ...acc, [field.name]: [] };
    // }

    // If there is a subname, then add it to the initial values
    if (field?.subName && field?.subName !== "") {
      return {
        ...acc,
        [field?.name]: editData?.[field.name] ?? "",
        [field?.subName]: editData?.[field.subName] ?? "",
      };
    }

    return { ...acc, [field?.name]: editData?.[field.name] ?? "" };
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

      // Data type checks
      const isString = () => {
        if (
          field.type === "text" ||
          field.type === "password" ||
          field.type === "email" ||
          field.type === "textarea"
        )
          return true;
      };

      const isNumber = () => {
        if (field.type === "number") return true;
      };

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
        case "dragdropfiles":
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
        (field.required === "false" || field.required === false) &&
        field.type === "file"
      ) {
        // Make it nullable
        fieldValidation = fieldValidation.nullable();
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

      if (
        (field.required === "false" || field.required === false) &&
        field.type === "multifile"
      ) {
        // Make it nullable
        fieldValidation = fieldValidation.nullable();
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

      if (field.type === "email") {
        if (field.emailValidation) {
          fieldValidation = fieldValidation.email(
            field.emailValidationErrorMessage
          );
        }
      }

      if (field.pattern && isString()) {
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

      if (field.type === "multifile" || field.type === "dragdropfiles") {
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

      if (field?.conditionValidation?.length > 0) {
        field?.conditionValidation?.forEach((validation, index) => {
          fieldValidation = fieldValidation.test(
            `conditionValidation-${index}`,
            validation?.conditionValidationMessage,
            (value) => {
              if (value === undefined) {
                value = "";
              }
              let isValidCombined = null;
              validation?.validationList?.forEach((condition, index) => {
                let isValid = false;
                if (condition?.type === 1) {
                  // Get value to compare
                  let valueToCompare =
                    condition?.value || formik?.values[condition?.field] || "";

                  // Ensure data is not undefined
                  if (valueToCompare === undefined) {
                    valueToCompare = "";
                  }

                  if (condition?.condition === "equals") {
                    if (value === valueToCompare) {
                      isValid = true;
                    }
                  }
                  if (condition?.condition === "notEqual") {
                    if (value !== valueToCompare) {
                      isValid = true;
                    }
                  }
                  if (condition?.condition === "greaterThan") {
                    if (value > valueToCompare) {
                      isValid = true;
                    }
                  }
                  if (condition?.condition === "lessThan") {
                    if (value < valueToCompare) {
                      isValid = true;
                    }
                  }
                  if (condition?.condition === "greaterThanOrEqual") {
                    if (value >= valueToCompare) {
                      isValid = true;
                    }
                  }
                  if (condition?.condition === "lessThanOrEqual") {
                    if (value <= valueToCompare) {
                      isValid = true;
                    }
                  }
                  if (condition?.condition === "before") {
                    // Compare dates
                    if (new Date(value) < new Date(valueToCompare)) {
                      isValid = true;
                    }
                  }
                  if (condition?.condition === "after") {
                    // Compare dates
                    if (new Date(value) > new Date(valueToCompare)) {
                      isValid = true;
                    }
                  }
                  if (condition?.condition === "beforeOrEqual") {
                    // Compare dates
                    if (new Date(value) <= new Date(valueToCompare)) {
                      isValid = true;
                    }
                  }
                  if (condition?.condition === "afterOrEqual") {
                    // Compare dates
                    if (new Date(value) >= new Date(valueToCompare)) {
                      isValid = true;
                    }
                  }
                  if (condition?.condition === "isNotEmpty") {
                    if (value != "" && valueToCompare === "") {
                      isValid = true;
                    }
                  }
                  if (condition?.condition === "isEmpty") {
                    if (value === "") {
                      isValid = true;
                    }
                  }
                } else {
                  // Get value to compare
                  let valueToCompare = formik?.values[condition?.field] || "";
                  if (valueToCompare === undefined) {
                    valueToCompare = "";
                  }

                  if (condition?.condition === "equals") {
                    if (condition?.value === valueToCompare) {
                      isValid = true;
                    }
                  }

                  if (condition?.condition === "notEqual") {
                    if (condition?.value !== valueToCompare) {
                      isValid = true;
                    }
                  }
                  if (condition?.condition === "greaterThan") {
                    if (condition?.value < valueToCompare) {
                      isValid = true;
                    }
                  }
                  if (condition?.condition === "lessThan") {
                    if (condition?.value > valueToCompare) {
                      isValid = true;
                    }
                  }
                  if (condition?.condition === "greaterThanOrEqual") {
                    if (condition?.value <= valueToCompare) {
                      isValid = true;
                    }
                  }
                  if (condition?.condition === "lessThanOrEqual") {
                    if (condition?.value >= valueToCompare) {
                      isValid = true;
                    }
                  }
                  if (condition?.condition === "before") {
                    // Compare dates
                    if (new Date(condition?.value) > new Date(valueToCompare)) {
                      isValid = true;
                    }
                  }
                  if (condition?.condition === "after") {
                    // Compare dates
                    if (new Date(condition?.value) < new Date(valueToCompare)) {
                      isValid = true;
                    }
                  }
                  if (condition?.condition === "beforeOrEqual") {
                    // Compare dates
                    if (
                      new Date(condition?.value) >= new Date(valueToCompare)
                    ) {
                      isValid = true;
                    }
                  }
                  if (condition?.condition === "afterOrEqual") {
                    // Compare dates
                    if (
                      new Date(condition?.value) <= new Date(valueToCompare)
                    ) {
                      isValid = true;
                    }
                  }
                  if (condition?.condition === "isNotEmpty") {
                    if (valueToCompare != "") {
                      isValid = true;
                    }
                  }
                  if (condition?.condition === "isEmpty") {
                    if (valueToCompare === "") {
                      isValid = true;
                    }
                  }
                }

                if (condition?.logicalCondition === "AND") {
                  isValidCombined = isValidCombined && isValid;
                } else if (condition?.logicalCondition === "OR") {
                  isValidCombined = isValidCombined || isValid;
                } else {
                  isValidCombined = isValid;
                }
              });
              return !isValidCombined;
            }
          );
        });
      }

      return { ...acc, [field.name]: fieldValidation };
    }, {})
  );

  return validationSchema;
};

// Generate validation schema for field Builder
const generateValidationSchemaForFieldBuilder = (
  schema,
  type,
  formFields,
  formBuilderUpdateData
) => {
  const validationSchema = Yup.object(
    schema?.reduce((acc, field) => {
      if (!field.apply.includes(type)) return acc;

      let fieldValidation = null;
      switch (field?.type) {
        case "text":
          fieldValidation = Yup.string();
          break;
        // case "number":
        //   fieldValidation = Yup.number();
        //   break;
        // default:
        //   fieldValidation = Yup.string();
        //   break;
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

        // Check for key duplication in main key and sub key for the entire form, only
        // if field id is not the same as the field being updated (formBuilderUpdateData)
        if (validation.keyDuplication) {
          fieldValidation = fieldValidation.test(
            "keyDuplication",
            validation.message,
            (value) => {
              if (value === "") return true;
              if (formFields.length === 0) return true;
              const isDuplicate = formFields.filter(
                (field) =>
                  (field.name === value || field?.subName === value) &&
                  formBuilderUpdateData?.fieldId !== field?.fieldId
              );
              return isDuplicate?.length > 0 ? false : true;
            }
          );
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
  populateInitialValues,
};
