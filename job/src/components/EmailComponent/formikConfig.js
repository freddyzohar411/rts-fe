import * as yup from "yup";

export const populateForm = (value) => {
  return {
    id: value.id,
    to: value.to,
    cc: value.cc,
    bcc: value.bcc,
    subject: value.subject,
    content: value.content,
    attachments: [],
  };
};

export const initialValues = {
  id: null,
  to: [],
  cc: [],
  bcc: [],
  subject: "",
  content: "",
  attachments: [],
};

export const generateSchema = () => {
  return yup.object().shape({
    id: yup.number().nullable().notRequired(),
    to: yup.array().min(1, "Input at least one email"),
    cc: yup.array().nullable().notRequired(),
    bcc: yup.array().nullable().notRequired(),
    subject: yup.string().required("Please enter a subject."),
    content: yup.string().nullable().notRequired(),
    attachments: yup.array().nullable().notRequired(),
  });
};

export const schema = yup.object().shape({
  id: yup.number().nullable().notRequired(),
  to: yup.array().min(1, "Input at least one email"),
  cc: yup.array().nullable().notRequired(),
  bcc: yup.array().nullable().notRequired(),
  subject: yup.string().required("Please enter a subject."),
  content: yup.string().nullable().notRequired(),
  attachments: yup.array().nullable().notRequired(),
});
