export function requiredErrorMessageValidationRadio(
  formik,
  config,
  fieldOptions = {}
) {
  return handleValidationRadio(
    formik,
    config,
    fieldOptions.fieldNameCheck,
    fieldOptions.fieldNameValidation,
    [
      {
        required: true,
        message: fieldOptions.errorMessage || "This field is required",
      },
    ]
  );
}

export function requiredErrorMessageValidationInputNum(
  formik,
  config,
  fieldOptions = {}
) {
  return handleValidationInputNum(
    formik,
    config,
    fieldOptions.fieldNameCheck,
    fieldOptions.fieldNameValidation,
    [
      {
        required: true,
        message: fieldOptions.errorMessage || "This field is required",
      },
    ]
  );
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

function handleValidationRadio(
  formik,
  config,
  fieldNameCheck,
  fieldNameValidation,
  validation,
  options
) {
  if (config && formik && formik?.values?.[fieldNameCheck]) {
    if (
      formik?.values?.[fieldNameCheck] === true ||
      formik?.values?.[fieldNameCheck] === "true"
    ) {
      return addValidation(config, fieldNameValidation, validation, {
        isDisabled: false,
        ...options,
      });
    }

    if (
      formik?.values?.[fieldNameCheck] === false ||
      formik?.values?.[fieldNameCheck] === "false"
    ) {
      formik?.setFieldValue(fieldNameValidation, "");
      formik?.setFieldTouched(fieldNameValidation, false);
      return addValidation(config, fieldNameValidation, [], {
        isDisabled: true,
        ...options,
      });
    }
  }
}

function handleValidationInputNum(
  formik,
  config,
  fieldNameCheck,
  fieldNameValidation,
  validation,
  options
) {
  if (config && formik) {
    if (formik?.values?.[fieldNameCheck] !== "") {
      return addValidation(config, fieldNameValidation, validation, {
        isDisabled: false,
        ...options,
      });
    } else {
      // formik?.setFieldValue(fieldNameValidation, 0);
      formik?.setFieldTouched(fieldNameValidation, false);
      return addValidation(config, fieldNameValidation, [], {
        isDisabled: true,
        ...options,
      });
    }
  }
}
