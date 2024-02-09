import { useEffect } from "react";
import * as FieldBuilderHelper from "./fieldBuilderValidation_helper";

const useFieldBuilderValidation = (formik, config, setConfig) => {
  // Required validation
  useEffect(() => {
    if (config && formik && formik?.values?.["required"]) {
      setConfig((prev) =>
        FieldBuilderHelper.requiredErrorMessageValidationRadio(formik, prev, {
          fieldNameCheck: "required",
          fieldNameValidation: "requiredErrorMessage",
          errorMessage: "Required error message is required",
        })
      );
    }
  }, [formik.values["required"]]);

  // Email validation
  useEffect(() => {
    if (config && formik && formik?.values?.["emailValidation"]) {
      setConfig((prev) =>
        FieldBuilderHelper.requiredErrorMessageValidationRadio(formik, prev, {
          fieldNameCheck: "emailValidation",
          fieldNameValidation: "emailValidationErrorMessage",
          errorMessage: "Email validation error message is required",
        })
      );
    }
  }, [formik.values["emailValidation"]]);

  // Information validation
  useEffect(() => {
    if (config && formik && formik?.values?.["information"]) {
      setConfig((prev) =>
        FieldBuilderHelper.requiredErrorMessageValidationRadio(formik, prev, {
          fieldNameCheck: "information",
          fieldNameValidation: "informationText",
          errorMessage: "Information text is required",
        })
      );
    }
  }, [formik.values["information"]]);

  // Min length validation
  useEffect(() => {
    if (config && formik) {
      setConfig((prev) =>
        FieldBuilderHelper.requiredErrorMessageValidationInputNum(
          formik,
          prev,
          {
            fieldNameCheck: "minLength",
            fieldNameValidation: "minLengthErrorMessage",
            errorMessage: "Min Length error message is required",
          }
        )
      );
    }
  }, [formik.values["minLength"]]);

  // Max length validation
  useEffect(() => {
    if (config && formik) {
      setConfig((prev) =>
        FieldBuilderHelper.requiredErrorMessageValidationInputNum(
          formik,
          prev,
          {
            fieldNameCheck: "maxLength",
            fieldNameValidation: "maxLengthErrorMessage",
            errorMessage: "Max Length error message is required",
          }
        )
      );
    }
  }, [formik.values["maxLength"]]);

  // Regex
  useEffect(() => {
    if (config && formik) {
      setConfig((prev) =>
        FieldBuilderHelper.requiredErrorMessageValidationInputNum(
          formik,
          prev,
          {
            fieldNameCheck: "pattern",
            fieldNameValidation: "patternValidationErrorMessage",
            errorMessage: "Regex error message is required",
          }
        )
      );
    }
  }, [formik.values["pattern"]]);

  // Min value validation
  useEffect(() => {
    if (config && formik) {
      setConfig((prev) =>
        FieldBuilderHelper.requiredErrorMessageValidationInputNum(
          formik,
          prev,
          {
            fieldNameCheck: "minValue",
            fieldNameValidation: "minValueErrorMessage",
            errorMessage: "Min value error message is required",
          }
        )
      );
    }
  }, [formik.values["minValue"]]);

  // Max value validation
  useEffect(() => {
    if (config && formik) {
      setConfig((prev) =>
        FieldBuilderHelper.requiredErrorMessageValidationInputNum(
          formik,
          prev,
          {
            fieldNameCheck: "maxValue",
            fieldNameValidation: "maxValueErrorMessage",
            errorMessage: "Max value error message is required",
          }
        )
      );
    }
  }, [formik.values["maxValue"]]);

  // File Validation
  useEffect(() => {
    if (config && formik) {
      setConfig((prev) =>
        FieldBuilderHelper.requiredErrorMessageValidationMultiSelect(
          formik,
          prev,
          {
            fieldNameCheck: "fileTypeValidation",
            fieldNameValidation: "fileTypeValidationErrorMessage",
            errorMessage: "File validation error message is required",
          }
        )
      );
    }
  }, [formik.values["fileTypeValidation"]]);

  // File Size Validation
  useEffect(() => {
    if (config && formik) {
      setConfig((prev) =>
        FieldBuilderHelper.requiredErrorMessageValidationInputNum(
          formik,
          prev,
          {
            fieldNameCheck: "fileSizeValidation",
            fieldNameValidation: "fileSizeValidationErrorMessage",
            errorMessage: "File size error message is required",
          }
        )
      );
    }
  }, [formik.values["fileSizeValidation"]]);

  // Show all formik erro
  console.log("formik.errors", formik.errors);
};

export default useFieldBuilderValidation;
