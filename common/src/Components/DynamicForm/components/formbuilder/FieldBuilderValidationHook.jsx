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
    if (config && formik && formik?.values?.["minLength"]) {
      setConfig((prev) =>
        FieldBuilderHelper.requiredErrorMessageValidationInput(formik, prev, {
          fieldNameCheck: "minLength",
          fieldNameValidation: "minLengthErrorMessage",
          errorMessage: "Min Length error message is required",
        })
      );
    }
  }, [formik.values["minLength"]]);
};

export default useFieldBuilderValidation;
