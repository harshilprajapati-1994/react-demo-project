import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../utils/validationSchemas";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

type RegisterData = yup.InferType<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({ resolver: yupResolver(registerSchema) });

  const onSubmit = (data: RegisterData) => {
    console.log("Registering user:", data);
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Register</h2>
      <input {...register("email")} placeholder="Email" />
      <p>{errors.email?.message}</p>
      <input {...register("password")} type="password" placeholder="Password" />
      <p>{errors.password?.message}</p>
      <input {...register("confirmPassword")} type="password" placeholder="Confirm Password" />
      <p>{errors.confirmPassword?.message}</p>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
