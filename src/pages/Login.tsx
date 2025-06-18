import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// 1. Define form input types
type LoginFormInputs = {
  email: string;
  name: string;
};

// 2. Define validation schema using Yup
const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  name: yup.string().required("Name is required"),
});

const Login = () => {
  const { login } = useAuth();              // 3. Get login function from context
  const navigate = useNavigate();           // 4. For redirecting after login

  // 5. Initialize useForm with validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),          // 6. Connect Yup schema
  });

  // 7. Handle form submit
  const onSubmit = (data: LoginFormInputs) => {
    login({ name: data.name, email: data.email });  // 8. Call login function
    navigate("/");                                  // 9. Redirect to home
  };

  // 10. JSX for login form
  return (
    <div className="container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-field'>
            <input placeholder="Name" {...register("name")} />
            <p className="error-message">{errors.name?.message}</p>
          </div>
          <div className='form-field'>
            <input placeholder="Email" {...register("email")} />
            <p className="error-message">{errors.email?.message}</p>
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
