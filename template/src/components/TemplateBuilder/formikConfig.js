import * as yup from "yup";

export const populateForm = (value) => {
  return {
    id: value.id,
    name: value.name,
    description: value.description,
    category: value.category,
    subCategory: value.subCategory,
    content: value.content,
  };
};

export const initialValues = {
  id: null,
  name: "",
  description: "",
  category: "",
  subCategory: "",
  content: "",
};

export const generateSchema = () => {
  return yup.object().shape({
    id: yup.number().nullable().notRequired(),
    name: yup.string().required("Please enter a name."),
    category: yup.string().required("Please enter a category."),
    subCategory: yup.string().nullable().notRequired(),
    description: yup.string().nullable().notRequired(),
    content: yup.string().required("Please enter a content."),
  });
};

export const schema = yup.object().shape({
  id: yup.number().nullable().notRequired(),
  name: yup.string().required("Please enter a name."),
  category: yup.string().required("Please enter a category."),
  subCategory: yup.string().nullable().notRequired(),
  description: yup.string().nullable().notRequired(),
  content: yup.string().required("Please enter a content."),
});
