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
  selectedOptions: [{
    label: "Hello",
    value: "Hello",
  }, {
    label: "World",
    value: "World",
  }],
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
  selectedOptions: yup.array()
    .of(
      yup.object().shape({
        label: yup.string().required("Label is required"),
        value: yup.string().required("Value is required"),
      })
    )
    .min(1, "At least one option is required"),
});
