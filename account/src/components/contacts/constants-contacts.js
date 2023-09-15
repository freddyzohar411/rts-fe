import * as yup from "yup";

export const populateContactForm = (contact) => {
  return {
    // required values
    title: contact.title,
    firstName: contact.firstName,
    lastName: contact.lastName,

    // non-required values
    designation: contact.designation,
    department: contact.department,
    industry: contact.industry,
    subIndustry: contact.subIndustry,
    mobile: contact.mobile,
    landline: contact.landline,
    email: contact.email,
    line1: contact.line1,
    line2: contact.line2,
    line3: contact.line3,
    city: contact.city,
    country: contact.country,
    postalCode: contact.postalCode,
    remarks: contact.remarks,
  };
};

export const initialValues = {
  // required values
  title: "",
  firstName: "",
  lastName: "",

  // non-required values
  designation: "",
  department: "",
  industry: "",
  subIndustry: "",
  mobile: "",
  landline: "",
  email: "",
  line1: "",
  line2: "",
  line3: "",
  city: "",
  country: "",
  postalCode: "",
  remarks: "",
};

export const schema = yup.object().shape({
  title: yup.string().required("Please select a title."),
  firstName: yup.string().required("Please enter a first name."),
  lastName: yup.string().required("Please enter a last name."),

  designation: yup.string().notRequired().nullable(),
  department: yup.string().notRequired().nullable(),
  industry: yup.string().notRequired().nullable(),
  subIndustry: yup.string().notRequired().nullable(),
  mobile: yup.string().notRequired().nullable(),
  landline: yup.string().notRequired().nullable(),
  email: yup.string().notRequired().nullable(),
  line1: yup.string().notRequired().nullable(),
  line2: yup.string().notRequired().nullable(),
  line3: yup.string().notRequired().nullable(),
  city: yup.string().notRequired().nullable(),
  country: yup.string().notRequired().nullable(),
  postalCode: yup.string().notRequired().nullable(),
  remarks: yup.string().notRequired().nullable(),
});
