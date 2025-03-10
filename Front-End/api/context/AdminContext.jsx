
import { createContext, useContext, useState } from "react"
import LoginApi from "../../service/LoginApi";



export const StateContext = createContext({
    admin: {},
    authenticated:false,
    setAdmin: () => { },
    logout: () => { },
    login: (payload) => { },
    setAuthenticated: () => { },
    
})


export default function AdminContext({ children }) {
    const [admin, setAdmin] = useState({})
    const [authenticated, _setAuthenticated] = useState(
        "true" === window.localStorage.getItem("AUTHENTICATED")
    );

    const login = async(payload) => {
        await LoginApi.getCSRFToken()
        return LoginApi.login(payload)
    }

    const logout = () => {
        setAdmin({});
        setAuthenticated(false)
    }

    const setAuthenticated = (isAuthenticated) => {
        _setAuthenticated(isAuthenticated);
        window.localStorage.setItem('AUTHENTICATED', isAuthenticated)
    }

    return <>
        <StateContext.Provider value={{
            admin,
            setAdmin,
            login,
            logout,
            authenticated,
            setAuthenticated,
        }}>
            {children}
        </StateContext.Provider>
    </>
}


export const useAdminContext = () => useContext(StateContext)

