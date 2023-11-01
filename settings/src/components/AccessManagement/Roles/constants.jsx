import * as yup from "yup";

// Define populateForm for editing role
export const populateForm = (values) => {
  return {
    id: values.id,
    roleName: values.roleName,
    roleDescription: values.roleDescription,
    modules: values.modules,
  };
};

// Define initial values
export const initialValues = {
  id: "",
  roleName: "",
  roleDescription: "",
  modules: [
    {
      id: 1,
      permissions: []
    },
    {
      id: 2,
      permissions: []
    },
    {
      id: 3,
      permissions: []
    },
    {
      id: 4,
      permissions: []
    },
  ],
};

// Define schema for permission object
export const moduleSchema = yup.object().shape({
  id: yup.number().notRequired(),
  permissions: yup
    .array()
    .of(yup.string())
});

// Define schema for main object
export const schema = yup.object().shape({
  id: yup.number().nullable().notRequired(),
  roleName: yup.string().required("Please enter a role name."),
  roleDescription: yup.string().required("Please enter a role description."),
  modules: yup
    .array()
    .of(moduleSchema)
});
