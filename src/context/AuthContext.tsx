import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AuthContextType {
    user: userTypedata | null,
    login: (para: string) => void,
    logout: () => void,
    loading: boolean
}

interface userTypedata {
    username: string
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({children}: {children: ReactNode}) => {
    const [user, setuser] = useState<userTypedata | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedata = localStorage.getItem("user");
        if(storedata) {
            setuser(JSON.parse(storedata));
        }
        setLoading(false)
    }, [])

    const login = (username: string) => {
        const userdata = {username}
        setuser(userdata);
        localStorage.setItem("user", JSON.stringify(userdata))
    }

    const logout = () => {
        setuser(null);
        localStorage.removeItem("user")
    }

    return (
        <AuthContext.Provider value={{user, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) throw new Error('AuthContext is not available');
    return context;
}