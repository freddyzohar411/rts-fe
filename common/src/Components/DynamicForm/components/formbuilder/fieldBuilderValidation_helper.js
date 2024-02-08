export function requiredErrorMessageValidation(formik, config) {
  if (config && formik && formik?.values?.["required"]) {
    if (
      formik?.values?.["required"] === true ||
      formik?.values?.["required"] === "true"
    ) {
      return addValidation(
        config,
        "requiredErrorMessage",
        [
          {
            required: true,
            message: "Required error message is required",
          },
        ],
        {
          isDisabled: false,
        }
      );
    }

    if (
      formik?.values?.["required"] === false ||
      formik?.values?.["required"] === "false"
    ) {
      formik?.setValues({ ...formik.values, requiredErrorMessage: "" });
      return addValidation(config, "requiredErrorMessage", [], {
        isDisabled: true,
      });
    }
  }
}

// ====================== Helper Functions ======================
function addValidation(config, fieldName, validation, options) {
  return config.map((field) => {
    if (field.name === fieldName) {
      return {
        ...field,
        ...options,
        validation: validation,
      };
    }
    return field;
  });
}
