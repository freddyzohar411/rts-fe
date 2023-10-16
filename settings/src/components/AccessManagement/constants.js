import * as yup from "yup";

export const initialValues = {
  firstName: "",
  lastName: "",
  username: "",
  emailAddress: "",
  contactNo: "",
  password: "",
  confirmPassword: "",
  employeeId: "",
};

export const schema = yup.object().shape({
  firstName: yup.string().required("Please enter a first name."),
  lastName: yup.string().required("Please enter a last name."),
  username: yup.string().required("Please enter a username."),
  emailAddress: yup.string().required("Please enter an email address."),
  contactNo: yup.string().required("Please enter a contact number."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match."),
  password: yup.string().required("Please enter a password."),
  employeeId: yup.string().required("Please enter the Employee ID."),
});
