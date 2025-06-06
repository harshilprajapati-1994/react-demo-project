import { Children, ReactNode } from "react";
import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom";

const Protected = ({children}: {children: JSX.Element}) => {

    const {user} = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children
}

export default Protected;