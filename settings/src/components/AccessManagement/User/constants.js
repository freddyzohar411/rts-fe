import * as yup from "yup";

export const populateForm = (value) => {
  return {
    id: value.id,
    keycloackId: value.keycloackId,
    firstName: value.firstName,
    lastName: value.lastName,
    username: value.username,
    email: value.email,
    mobile: value.mobile,
    designation: value.designation,
    country: value.country,
    location: value.location,
    password: value.password,
    confirmPassword: value.confirmPassword,
    employeeId: value.employeeId,
    managerId: value.managerId,
    status: value.status,
    // groups: value.groups,
  };
};

export const initialValues = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  mobile: "",
  designation: "",
  location: "",
  country: "",
  password: "",
  confirmPassword: "",
  employeeId: "",
  managerId: null,
  status: null,
  groups: [],
};

export const schema = yup.object().shape({
  id: yup.number().nullable().notRequired(),
  keycloackId: yup.string().nullable().notRequired(),
  firstName: yup.string().required("Please enter a first name."),
  lastName: yup.string().required("Please enter a last name."),
  username: yup.string().required("Please enter a username."),
  email: yup.string().required("Please enter an email address."),
  mobile: yup
    .string()
    .required("Please enter a contact number.")
    .min(10, "Mobile number must be at least 10 digits long."),
  designation: yup.string().nullable().notRequired(),
  location: yup.string().nullable().notRequired(),
  country: yup.string().nullable().notRequired(),
  password: yup
    .string()
    .required("Please enter a password.")
    .min(8, "Password must be at least 8 characters long."),
  confirmPassword: yup
    .string()
    .required("Please confirm your password.")
    .oneOf([yup.ref("password")], "Passwords must match."),
  employeeId: yup.string().required("Please enter the Employee ID."),
  // Id is a number
  managerId: yup.number().nullable().notRequired(),
  status: yup.bool().required("Please select a status."),
  groups: yup.array().nullable().notRequired(),
});

export const updateSchema = yup.object().shape({
  id: yup.number().nullable().notRequired(),
  keycloackId: yup.string().nullable().notRequired(),
  firstName: yup.string().required("Please enter a first name."),
  lastName: yup.string().required("Please enter a last name."),
  username: yup.string().required("Please enter a username."),
  email: yup.string().required("Please enter an email address."),
  mobile: yup
    .string()
    .required("Please enter a contact number.")
    .min(10, "Mobile number must be at least 10 digits long."),
  designation: yup.string().nullable().notRequired(),
  location: yup.string().nullable().notRequired(),
  country: yup.string().nullable().notRequired(),
  password: yup
    .string()
    .required("Please enter a password.")
    .min(8, "Password must be at least 8 characters long."),
  confirmPassword: yup
    .string()
    .required("Please confirm your password.")
    .oneOf([yup.ref("password")], "Passwords must match."),
  employeeId: yup.string().required("Please enter the Employee ID."),
  // Id is a number
  managerId: yup.number().nullable().notRequired(),
});
