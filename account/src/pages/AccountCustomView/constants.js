import * as yup from "yup";

export const initialValues = {
    name: "",
    columnName: []
};

export const schema = yup.object().shape({
    name: yup.string().required("Custom view name is required."),
    // columnName: yup.array().required("Please select as least one column.")
    columnName: yup.array().min(1, "Please select at least one column."),
});