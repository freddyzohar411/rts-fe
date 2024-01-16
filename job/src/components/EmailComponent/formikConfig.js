import * as yup from "yup";

export const populateForm = (value) => {
  return {
    id: value.id,
    to: value.to,
    cc: value.cc,
    bcc: value.bcc,
    subject: value.subject,
    content: value.content,
  };
};

export const initialValues = {
  id: null,
  to: "",
  cc: "",
  bcc: "",
  subject: "",
  content: "",
};

export const generateSchema = () => {
  return yup.object().shape({
    id: yup.number().nullable().notRequired(),
    to: yup.string().required("Please enter a to."),
    cc: yup.string().nullable().notRequired(),
    bcc: yup.string().nullable().notRequired(),
    subject: yup.string().required("Please enter a subject."),
    // content: yup.string().required("Please enter a content."),
    content: yup.string().nullable().notRequired(),
  });
};

export const schema = yup.object().shape({
  id: yup.number().nullable().notRequired(),
  to: yup.string().required("Please enter a to."),
  cc: yup.string().nullable().notRequired(),
  bcc: yup.string().nullable().notRequired(),
  subject: yup.string().required("Please enter a subject."),
  // content: yup.string().required("Please enter a content."),
  content: yup.string().nullable().notRequired(),
});
