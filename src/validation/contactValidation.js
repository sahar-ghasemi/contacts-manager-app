import * as Yup from "yup";

export const contactSchema = Yup.object().shape({
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  photo: Yup.string()
    .url("Invalid photo URL")
    .required("Photo URL is required"),
  phone: Yup.string()
    .matches(/^\+?[0-9\s()-]+$/, "Invalid phone number")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  job: Yup.string().nullable(),
  group: Yup.string().required("Group is required"),
});
