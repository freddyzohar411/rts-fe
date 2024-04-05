import * as yup from "yup";

export const populateForm = (value) => {
  return {
    firstName: value.firstName,
    lastName: value.lastName,
    username: value.username,
    email: value.email,
    employeeId: value.employeeId,
    managerId: value.managerId,
    groups: value.groups,
  };
};

export const initialValues = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  mobile: "",
  employeeId: "",
  managerId: null,
  groups: null,
};

export const schema = yup.object().shape({
  id: yup.number().nullable().notRequired(),
  firstName: yup.string().required("Please enter a first name."),
  lastName: yup.string().required("Please enter a last name."),
  username: yup.string().required("Please enter a username."),
  email: yup.string().required("Please enter an email address."),
  mobile: yup
    .string()
    .required("Please enter a contact number.")
    .min(10, "Mobile number must be at least 10 digits long."),
  employeeId: yup.string().required("Please enter an employee ID."),
  managerId: yup.number().nullable().notRequired(),
  groups: yup.number().nullable().notRequired(),
});
