import * as yup from "yup";

export const initialValues = {
  recruiters: "",
  teamLead: "",
  salesName: "",
  recruitmentManager: "",
};

export const schema = yup.object().shape({
  recruiters: yup.string().notRequired().nullable(),
  teamLead: yup.string().notRequired().nullable(),
  salesName: yup.string().notRequired().nullable(),
  recruitmentManager: yup.string().notRequired().nullable(),
});
