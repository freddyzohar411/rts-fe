import * as yup from "yup";

export const populateForm = (value) => {
  return {
    firstName: value.firstName,
    lastName: value.lastName,
    username: value.username,
    email: value.email,
    mobile: value.contactNo,
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
  employeeId: "",
};

export const schema = yup.object().shape({
  firstName: yup.string().required("Please enter a first name."),
  lastName: yup.string().required("Please enter a last name."),
  username: yup.string().required("Please enter a username."),
  email: yup.string().required("Please enter an email address."),
  mobile: yup.string().required("Please enter a contact number."),
  password: yup
    .string()
    .required("Please enter a password.")
    .min(6, "Password must be at least 6 characters long"),
  employeeId: yup.string().required("Please enter the Employee ID."),
});
