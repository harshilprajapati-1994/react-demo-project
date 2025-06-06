import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextType {
    user: string | null,
    login: (para: string) => void,
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({children}: {children: ReactNode}) => {
    const [user, setuser] = useState<string | null>(null);

    const login = (username: string) => {
        setuser(username);
    }

    const logout = () => {
        setuser(null);
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) throw new Error('AuthContext is not available');
    return context;
}