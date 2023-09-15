import * as yup from "yup";

export const populateCommercialInitialValues = (commercial) => {
  return {
    markUp: commercial.markUp,
    msp: commercial.msp,
  };
};

export const initialValues = {
  markUp: "",
  msp: "",
};

export const schema = yup.object().shape({
  markUp: yup.string().nullable().notRequired(),
  msp: yup.string().nullable().notRequired(),
});
