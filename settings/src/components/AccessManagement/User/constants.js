import * as yup from "yup";

export const populateForm = (value) => {
  return {
    id: value.id,
    firstName: value.firstName,
    lastName: value.lastName,
    username: value.username,
    email: value.email,
    mobile: value.mobile,
    password: value.password,
    employeeId: value.employeeId,
  };
};

export const initialValues = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  mobile: "",
  password: "",
  confirmPassword: "",
  employeeId: "",
  id: "",
};

export const schema = yup.object().shape({
  id: yup.number().nullable().notRequired(),
  firstName: yup.string().required("Please enter a first name."),
  lastName: yup.string().required("Please enter a last name."),
  username: yup.string().required("Please enter a username."),
  email: yup.string().required("Please enter an email address."),
  mobile: yup.string().required("Please enter a contact number."),
  password: yup
    .string()
    .required("Please enter a password.")
    .min(6, "Password must be at least 8 characters long"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password.")
    .oneOf([yup.ref("password")], "Passwords must match."),

  employeeId: yup.string().required("Please enter the Employee ID."),
});
