import {useState, useContext, createContext} from "react";


export const AuthPrividerContext = createContext();
export const AuthProviderContextDispatcher = createContext();

function AuthProvider({ children }) {
    const [state, setState] = useState(false);

    return(
        <AuthPrividerContext.Provider value={state}>
            <AuthProviderContextDispatcher.Provider value={setState}>
                {children}
            </AuthProviderContextDispatcher.Provider>
        </AuthPrividerContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = () => useContext(AuthPrividerContext);
export const useAuthActions = () => useContext(AuthProviderContextDispatcher);