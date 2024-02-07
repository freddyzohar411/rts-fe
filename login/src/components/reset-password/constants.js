import * as yup from "yup";

export const initialValues = {
  password: "",
  confirmPassword: "",
};

export const schema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Please enter your password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .min(8, "Confirm password must be at least 8 characters")
    .required("Please enter confirm password"),
});
