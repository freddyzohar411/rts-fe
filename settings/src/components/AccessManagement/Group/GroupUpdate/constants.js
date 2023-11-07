import * as yup from "yup";

export const schema = yup.object().shape({
  groupName: yup.string().required("Please enter a group name."),
  groupDescription: yup.string().required("Please enter a group description."),
  members: yup
    .array()
    .of(yup.string().required("Please assign users to this group.")),
});
