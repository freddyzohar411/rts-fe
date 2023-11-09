import * as yup from "yup";

// Define populateForm for editing role
export const populateForm = (values, permissionData, moduleData) => {
  if (permissionData) {
    // For modules with permissions
    values?.modules?.forEach((module) => {
      const newPermissions = module?.permissions?.map((permission) => {
        const permissionId = permissionData?.find(
          (p) => p?.permissionName === permission
        )?.id;
        return permissionId;
      });
      module.permissions = newPermissions;
    });

    moduleData.forEach((module) => {
      // if values does now have the module then add it in
      const moduleFound = values?.modules?.find((m) => m?.id === module?.id);
      if (!moduleFound) {
        values?.modules?.push({
          id: module.id,
          moduleName: module.moduleName,
          permissions: [],
        });
      }
    });
  }
  return {
    id: values.id,
    roleName: values.roleName,
    roleDescription: values.roleDescription,
    modules: values.modules,
  };
};

// Generate initial values
export const generateInitialValues = (role, permissionData, moduleData) => {
  const newModule = moduleData?.map((module) => {
    return {
      id: module.id,
      permissions: [],
    };
  });

  return {
    id: "",
    roleName: "",
    roleDescription: "",
    modules: newModule,
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
      permissions: [],
    },
    {
      id: 2,
      permissions: [],
    },
    {
      id: 3,
      permissions: [],
    },
    {
      id: 4,
      permissions: [],
    },
  ],
};

// Define schema for permission object
export const moduleSchema = yup.object().shape({
  id: yup.number().notRequired(),
  permissions: yup.array().of(yup.string()),
});

// Define schema for main object
export const schema = yup.object().shape({
  id: yup.number().nullable().notRequired(),
  roleName: yup.string().required("Please enter a role name."),
  roleDescription: yup.string().required("Please enter a role description."),
  modules: yup.array().of(moduleSchema),
});
