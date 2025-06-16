import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../utils/validationSchemas";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

type LoginData = yup.InferType<typeof loginSchema>;

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({ resolver: yupResolver(loginSchema) });

  const onSubmit = (data: LoginData) => {
    login(data.email);
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Login</h2>
      <input {...register("email")} placeholder="Email" />
      <p>{errors.email?.message}</p>
      <input {...register("password")} type="password" placeholder="Password" />
      <p>{errors.password?.message}</p>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
