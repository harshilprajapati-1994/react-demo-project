import { createContext, useContext, useEffect, useReducer } from "react"

type User = {
    name: string,
    email: string,
    isAdmin: boolean
}

type AuthState = {
    user: User | null,
    isAuthenticated: boolean
}

type Action = 
 | {type: "LOGIN", payload: User}
 | {type: "LOGOUT"}

const initialstate: AuthState = {
    user: null,
    isAuthenticated: false
}

const reducerfunc = (state: AuthState, action:Action): AuthState => {
    switch(action.type) {
        case "LOGIN": 
        return {
            user: action.payload,
            isAuthenticated: true
        }
        case "LOGOUT": 
        return {
            user: null,
            isAuthenticated: false
        } 
        default:
          return state  
    }
}

const AuthContext = createContext<{state: AuthState, authdispatch: React.Dispatch<Action>, login: (user: User) => void, logout: () => void}>({
    state: initialstate,
    authdispatch: () => null,
    login: () => {},
    logout: () => {}
})


export const AuthProvider = ({children}: {children: React.ReactNode}) => {

    const [state, authdispatch] = useReducer(reducerfunc, initialstate, () => {
        const getuser = localStorage.getItem('user');
        return getuser ? {user: JSON.parse(getuser), isAuthenticated: true} : initialstate;
    });

    const login = (user: User) => {
        authdispatch({type: 'LOGIN', payload: user})
    }

    const logout = () => {
        authdispatch({type: 'LOGOUT'})
    }

    useEffect(() => {
        if (state.user) {
            localStorage.setItem("user", JSON.stringify(state.user));
        } else {
            localStorage.removeItem("user");
        }
    }, [state.user])

    return (
        <AuthContext.Provider value={{state, authdispatch, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if(!context){
        throw new Error('Something is wrong');
    }

    return context
}