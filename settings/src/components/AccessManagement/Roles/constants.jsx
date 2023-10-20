import * as yup from "yup";

export const initialValues = {
    roleName: "",
    roleDescription: "",
    groups: []
}

export const schema = yup.object().shape({
    roleName: yup.string().required("Please enter a role name."),
    roleDescription: yup.string().required("Please enter a role description."),
    groups: yup.array().of(yup.string().required("Please assign groups to this role."))
})