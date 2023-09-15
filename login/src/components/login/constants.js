import * as yup from "yup";

export const initialValues = {
  username: "",
  password: "",
};

export const schema = yup.object().shape({
  username: yup
    .string()
    .email("Please enter a valid email address")
    .required("Please enter your email"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Please enter your password"),
});
