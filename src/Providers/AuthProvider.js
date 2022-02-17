import {useState, useContext, createContext, useEffect} from "react";


const AuthPrividerContext = createContext();
const AuthProviderContextDispatcher = createContext();

const LOCAL_STORAGE_AUTH_KEY ="authState";

function AuthProvider({ children }) {
    const [state, setState] = useState(false);
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)) || false;
        setState(userData )
    }, []);

    useEffect(() => {
        const data = JSON.stringify(state);
        localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, data);
    }, [state])
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