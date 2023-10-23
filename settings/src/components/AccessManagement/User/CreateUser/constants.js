import * as yup from "yup";

export const populateForm = (value) => {
  return {
    firstName: value.firstName,
    lastName: value.lastName,
    username: value.username,
    email: value.email,
    contactNo: value.contactNo,
    password: value.password,
    confirmPassword: value.confirmPassword,
    employeeId: value.employeeId,
  };
};

export const initialValues = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  contactNo: "",
  password: "",
  confirmPassword: "",
  employeeId: "",
};

export const schema = yup.object().shape({
  firstName: yup.string().required("Please enter a first name."),
  lastName: yup.string().required("Please enter a last name."),
  username: yup.string().required("Please enter a username."),
  email: yup.string().required("Please enter an email address."),
  contactNo: yup.string().required("Please enter a contact number."),
  password: yup
    .string()
    .required("Please enter a password.")
    .min(6, "Password must be at least 6 characters long"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match.")
    .required("Please confirm your password."),
  employeeId: yup.string().required("Please enter the Employee ID."),
});
