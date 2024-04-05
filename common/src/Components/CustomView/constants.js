import * as yup from "yup";

export const initialValues = {
  name: "",
  type: "",
  columnName: [],
};

export const schema = yup
  .object()
  .shape({
    name: yup.string().required("Please enter name of custom view."),
    type : yup.string().required("Please enter the type of custom view."),
    columnName: yup.array().required("Please select at least one column."),
  });
