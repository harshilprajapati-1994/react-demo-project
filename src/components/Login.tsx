import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setusername] = useState('')
    const {login} = useAuth();
    const navigate = useNavigate();
    const handleLoginForm = (e: React.FormEvent) => {
        e.preventDefault();
        login(username);
        navigate('/dashboard');
    }

    return (
        <form onSubmit={handleLoginForm}>
            <input type="text" value={username} onChange={(e) => setusername(e.target.value)} />
            <button type="submit">Submit</button>
        </form>
    )
}

export default Login;