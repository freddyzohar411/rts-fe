import * as yup from "yup";

export const populateDocumentForm = (document) => {
  return {
    docType: document.type,
    docTitle: document.title,
    docDesc: document.description,
    uploadDoc: null,
  };
};

export const getUpdateSchema = () =>
  yup.object().shape({
    docType: yup.string().nullable().notRequired(),
    docTitle: yup.string().nullable().notRequired(),
    docDesc: yup.string().nullable().notRequired(),
    uploadDoc: yup.mixed().notRequired(),
  });

export const initialValues = {
  docType: "",
  docTitle: "",
  docDesc: "",
  uploadDoc: "",
};

export const schema = yup.object().shape({
  docType: yup.string().nullable().notRequired(),
  docTitle: yup.string().nullable().notRequired(),
  docDesc: yup.string().nullable().notRequired(),
  uploadDoc: yup.mixed().required("Please upload a document."),
});
