import * as yup from "yup";

export const initialValues = {
    firstName: "",
    lastName:"",
    email:"",
    mobile: "",
    employeeId: "",
    managerId: "",
    groupName: "",
}

export const schema = yup.object().shape({
    id: yup.number().nullable().notRequired(),
    firstName: yup.string().required("Please enter a first name."),
    lastName: yup.string().required("Please enter a last name."),
    email: yup.string().required("Please enter an email address."),
    mobile: yup
        .string()
        .required("Please enter a contact number.")
        .min(10, "Mobile number must be at least 10 digits long."),
    employeeId: yup.string().required("Please enter an employee ID."),
    managerId: yup.string().notRequired().nullable(),
    groupName: yup.string().notRequired().nullable(),
});
