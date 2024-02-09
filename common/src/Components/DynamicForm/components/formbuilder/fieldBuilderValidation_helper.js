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

export function requiredErrorMessageValidationInput(
  formik,
  config,
  fieldOptions = {}
) {
  return handleValidationInput(
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

function handleValidationInput(
  formik,
  config,
  fieldNameCheck,
  fieldNameValidation,
  validation,
  options
) {
  if (config && formik && formik?.values?.[fieldNameCheck]) {
    console.log(
      "formik?.values?.[fieldNameCheck]",
      formik?.values?.[fieldNameCheck]
    );
    if (
      // formik?.values?.[fieldNameCheck] !== "" ||
      // formik?.values?.[fieldNameCheck] !== null ||
      formik?.values?.[fieldNameCheck] !== undefined 
      // formik?.values?.[fieldNameCheck] !== 0
    ) {
      return addValidation(config, fieldNameValidation, validation, {
        isDisabled: false,
        ...options,
      });
    } else {
      formik?.setFieldValue(fieldNameValidation, 0);
      formik?.setFieldTouched(fieldNameValidation, false);
      return addValidation(config, fieldNameValidation, [], {
        isDisabled: true,
        ...options,
      });
    }
  }
}
