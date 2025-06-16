import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(4).required(),
});

export const registerSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(4).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required(),
});
