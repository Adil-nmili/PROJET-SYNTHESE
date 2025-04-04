
import { createContext, useContext, useEffect, useState } from "react"
import LoginApi from "../../service/LoginApi";



export const StateContext = createContext({
    admin: null,
    authenticated:false,
    setAdmin: () => { },
    logout: () => { },
    login: (payload) => { },
    setAuthenticated: () => { },
    
})


export default function AdminContext({ children }) {
    const [admin, _setAdmin] = useState(null)
    const [authenticated, _setAuthenticated] = useState(
       JSON.parse(window.localStorage.getItem('AUTHENTICATED'))
    );

    const login = async(payload) => {
        await LoginApi.getCSRFToken()
        return LoginApi.login(payload)
    }

    useEffect(() => {
        if (window.localStorage.getItem("ADMIN") === null) {
            setAuthenticated(false)
        }
        
    }, [ admin])

    const setAdmin = (admin) => {
        _setAdmin(admin);
        window.localStorage.setItem('ADMIN', JSON.stringify(admin))
    }
    const logout = () => {
        setAdmin(null);
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

